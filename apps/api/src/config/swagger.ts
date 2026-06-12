import { env } from "./env";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Book Store API",
    version: "1.0.0",
    description:
      "REST API for user authentication and book management in the Book Store application.",
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: "Development server",
    },
  ],
  tags: [
    { name: "Health", description: "API health check" },
    { name: "Auth", description: "User registration and login" },
    { name: "Books", description: "Book CRUD operations" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token returned from register or login",
      },
    },
    schemas: {
      RegisterInput: {
        type: "object",
        required: ["email", "name", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          name: {
            type: "string",
            minLength: 2,
            example: "Jane Doe",
          },
          password: {
            type: "string",
            minLength: 8,
            format: "password",
            example: "password123",
          },
        },
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
        },
      },
      AuthData: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            format: "uuid",
            example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          },
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
      CreateBookInput: {
        type: "object",
        required: ["title", "caption", "rating", "imageUrl"],
        properties: {
          title: {
            type: "string",
            example: "The Great Gatsby",
          },
          caption: {
            type: "string",
            example: "A classic American novel set in the Jazz Age.",
          },
          rating: {
            type: "integer",
            minimum: 1,
            maximum: 5,
            example: 5,
          },
          imageUrl: {
            type: "string",
            format: "uri",
            description: "URL of the book cover image (uploaded to Cloudinary)",
            example: "https://example.com/cover.jpg",
          },
        },
      },
      BookAuthor: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", example: "Jane Doe" },
          profileImageUrl: {
            type: "string",
            format: "uri",
            example: "https://api.dicebear.com/10.x/avataaars/svg?seed=user%40example.com",
          },
        },
      },
      Book: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string", example: "The Great Gatsby" },
          caption: {
            type: "string",
            example: "A classic American novel set in the Jazz Age.",
          },
          imageUrl: {
            type: "string",
            format: "uri",
            example: "https://res.cloudinary.com/example/image/upload/v1/cover.jpg",
          },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      BookWithAuthor: {
        allOf: [
          { $ref: "#/components/schemas/Book" },
          {
            type: "object",
            properties: {
              user: { $ref: "#/components/schemas/BookAuthor" },
            },
          },
        ],
      },
      PaginatedBooksData: {
        type: "object",
        properties: {
          books: {
            type: "array",
            items: { $ref: "#/components/schemas/BookWithAuthor" },
          },
          currentPage: { type: "integer", example: 1 },
          totalBooks: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 5 },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 200 },
          success: { type: "boolean", example: true },
          message: { type: "string", example: "operation successful" },
          data: { type: "object" },
        },
      },
      ApiError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          success: { type: "boolean", example: false },
          message: { type: "string", example: "validation failed" },
          errors: { type: "object" },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Missing or invalid authentication token",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiError" },
            example: {
              statusCode: 401,
              success: false,
              message: "unauthorized",
              errors: {},
            },
          },
        },
      },
      ValidationError: {
        description: "Request body or query parameters failed validation",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiError" },
          },
        },
      },
      InternalServerError: {
        description: "Unexpected server error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiError" },
          },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        description: "Returns the current health status of the API.",
        responses: {
          "200": {
            description: "API is running",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: {
                  statusCode: 200,
                  success: true,
                  message: "api is working",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        description:
          "Creates a new user account and returns a JWT token for authentication.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/AuthData" },
                      },
                    },
                  ],
                },
                example: {
                  statusCode: 201,
                  success: true,
                  message: "user created successfully",
                  data: {
                    userId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
          "409": {
            description: "User with this email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  statusCode: 409,
                  success: false,
                  message: "user already exists",
                  errors: {},
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in an existing user",
        description:
          "Authenticates a user with email and password and returns a JWT token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Logged in successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/AuthData" },
                      },
                    },
                  ],
                },
                example: {
                  statusCode: 200,
                  success: true,
                  message: "logged in successfully",
                  data: {
                    userId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  statusCode: 401,
                  success: false,
                  message: "invalid credentials",
                  errors: {},
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/book/create": {
      post: {
        tags: ["Books"],
        summary: "Create a new book",
        description:
          "Creates a book for the authenticated user. The cover image is uploaded to Cloudinary.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateBookInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Book created successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Book" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "400": { $ref: "#/components/responses/ValidationError" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/book/get": {
      get: {
        tags: ["Books"],
        summary: "Get paginated books",
        description:
          "Returns a paginated list of all books, including author details.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page number (defaults to 1)",
            schema: { type: "integer", minimum: 1, default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Number of books per page (defaults to 2)",
            schema: { type: "integer", minimum: 1, default: 2 },
          },
        ],
        responses: {
          "200": {
            description: "Books fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/PaginatedBooksData" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/book/user": {
      get: {
        tags: ["Books"],
        summary: "Get books for the authenticated user",
        description: "Returns all books created by the currently logged-in user.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User books fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Book" },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/book/{id}": {
      delete: {
        tags: ["Books"],
        summary: "Delete a book",
        description:
          "Deletes a book by ID. Only the book owner can delete their book. The cover image is removed from Cloudinary.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Book deleted successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/Book" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": {
            description: "Book not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  statusCode: 404,
                  success: false,
                  message: "book not found",
                  errors: {},
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
  },
} as const;

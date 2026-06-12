import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import logger from "../config/logger";
import { ApiError } from "../utils/error";
import { BookService } from "../services/book";
import { ApiResponse } from "../utils/response";

const Book = new BookService();

export const createBook = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        false,
        "user id is not present",
        {},
      );
    }
    const result = await Book.createBook(req.user.userId, req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          true,
          "book created successfully",
          result,
        ),
      );
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          false,
          "failed to create book",
          error,
        ),
      );
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 2);
    const result = await Book.getBooks(page, limit);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          true,
          "fetched books successfully",
          result,
        ),
      );
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          false,
          "failed to fetch books",
          error,
        ),
      );
  }
};

export const getUserBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, false, "unauthorized", {});
    }
    const result = await Book.getUserBooks(req.user.userId);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          true,
          "fetched books for the given user successfully",
          result,
        ),
      );
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          false,
          "failed to fetch books for the given user",
          error,
        ),
      );
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, false, "unauthorized", {});
    }
    const result = await Book.deleteBook(req.user.userId, req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          true,
          "book deleted successfully",
          result,
        ),
      );
  } catch (error) {
    logger.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          false,
          "failed to delete book",
          error,
        ),
      );
  }
};

import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run the seed script");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SEED_USER_EMAIL = "dev@bookstore.local";

const programmingBooks = [
  {
    title: "Clean Code",
    caption:
      "Robert C. Martin's guide to writing readable, maintainable software. Covers naming, functions, comments, and the habits of a professional developer.",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
    rating: 5,
  },
  {
    title: "The Pragmatic Programmer",
    caption:
      "Timeless advice on craft, automation, and continuous learning from Hunt and Thomas. A practical roadmap for growing as a software engineer.",
    imageUrl:
      "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/tpp20.jpg",
    rating: 5,
  },
  {
    title: "Design Patterns",
    caption:
      "The Gang of Four catalog of reusable object-oriented solutions. Learn patterns like Observer, Strategy, and Factory for structuring complex systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop",
    rating: 4,
  },
  {
    title: "JavaScript: The Good Parts",
    caption:
      "Douglas Crockford distills the best ideas from JavaScript while steering clear of its pitfalls. A concise reference for writing better JS.",
    imageUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=600&fit=crop",
    rating: 4,
  },
  {
    title: "You Don't Know JS Yet",
    caption:
      "Kyle Simpson's deep dive into JavaScript mechanics—scope, closures, prototypes, and async. Builds real understanding beyond syntax.",
    imageUrl: "https://pictures.abebooks.com/isbn/9781491904152-us.jpg",
    rating: 5,
  },
  {
    title: "Refactoring",
    caption:
      "Martin Fowler's handbook for improving code structure without changing behavior. Essential techniques for keeping legacy code healthy.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    rating: 5,
  },
  {
    title: "Introduction to Algorithms",
    caption:
      "CLRS is the definitive reference for algorithms and data structures. Covers sorting, graphs, dynamic programming, and complexity analysis.",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=600&fit=crop",
    rating: 4,
  },
  {
    title: "Eloquent JavaScript",
    caption:
      "Marijn Haverbeke's free classic on JavaScript and programming fundamentals. Clear explanations with exercises from basics to Node and the DOM.",
    imageUrl: "https://m.media-amazon.com/images/I/81HqVRRwp3L.jpg",
    rating: 4,
  },
  {
    title: "Head First Design Patterns",
    caption:
      "A visual, brain-friendly tour of common design patterns in Java. Makes abstract OOP concepts approachable with puzzles and real-world examples.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=600&fit=crop",
    rating: 4,
  },
] as const;

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: SEED_USER_EMAIL },
    update: {},
    create: {
      name: "Dev Reader",
      email: SEED_USER_EMAIL,
      password: hashedPassword,
      profileImageUrl: `https://api.dicebear.com/10.x/avataaars/svg?seed=${encodeURIComponent(SEED_USER_EMAIL)}`,
    },
  });

  await prisma.book.deleteMany({ where: { userId: user.id } });

  await prisma.book.createMany({
    data: programmingBooks.map((book) => ({
      ...book,
      userId: user.id,
    })),
  });

  console.log(
    `Seeded ${programmingBooks.length} programming books for ${SEED_USER_EMAIL}`,
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

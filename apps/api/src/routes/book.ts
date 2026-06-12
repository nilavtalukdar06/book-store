import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import { createBookSchema } from "../validators/book";
import {
  createBook,
  deleteBook,
  getBooks,
  getUserBooks,
} from "../controllers/book";

const router: Router = Router();

router.post("/create", authenticate, validate(createBookSchema), createBook);

router.get("/get", authenticate, getBooks);

router.get("/user", authenticate, getUserBooks);

router.delete("/:id", authenticate, deleteBook);

export default router;

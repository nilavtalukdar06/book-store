import { Router } from "express";
import { validate } from "../middlewares/validation";
import { loginSchema, registerSchema } from "../validators/auth";
import { login, register, fetchUser } from "../controllers/user";
import { authenticate } from "../middlewares/auth";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/user", authenticate, fetchUser);

export default router;

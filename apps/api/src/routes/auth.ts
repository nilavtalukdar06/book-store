import { Router } from "express";
import { validate } from "../middlewares/validation";
import { loginSchema, registerSchema } from "../validators/auth";
import { login, register } from "../controllers/user";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

export default router;

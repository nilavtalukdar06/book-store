import { Request, Response } from "express";
import logger from "../config/logger";
import { UserService } from "../services/user";
import StatusCodes from "http-status-codes";
import { ApiResponse } from "../utils/response";
import { ApiError } from "../utils/error";

const User = new UserService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const data = await User.register({
      email,
      password,
      name,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          true,
          "user created successfully",
          data,
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
          "failed to create user",
          {},
        ),
      );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await User.login({
      email,
      password,
    });
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, true, "logged in successfully", data),
      );
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          false,
          "failed to login",
          {},
        ),
      );
  }
};

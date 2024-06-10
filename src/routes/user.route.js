import { Router } from "express";
import { userLogin, userOtpVerify, userRegister } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post('/user/register', userRegister);
userRouter.post('/user/verify', userOtpVerify);
userRouter.post('/user/login', userLogin);


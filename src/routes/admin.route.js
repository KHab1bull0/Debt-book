import { Router } from "express";
import { getUsers } from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.get('/admin/users', getUsers);
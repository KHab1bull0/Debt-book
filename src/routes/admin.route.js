import { Router } from "express";
import { deleteUser, getUsers, putUser } from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.get('/admin/users', getUsers);
adminRouter.put('/admin/users/:id', putUser);
adminRouter.delete('/admin/users/:id', deleteUser);
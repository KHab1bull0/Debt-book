import { Router } from "express";
import { getdepts, postDepts, putOneDepts } from "../controllers/dept.controller.js";

export const deptRouter = Router();

deptRouter.post('/debts', postDepts);
deptRouter.get('/debts', getdepts);
deptRouter.put('/debts/:id', putOneDepts);
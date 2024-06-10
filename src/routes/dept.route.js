import { Router } from "express";
import { deletedebt, getdepts, postDepts, putOneDepts } from "../controllers/dept.controller.js";

export const deptRouter = Router();

deptRouter.post('/debts', postDepts);
deptRouter.get('/debts', getdepts);
deptRouter.put('/debts/:id', putOneDepts);
deptRouter.delete('/debts/:id', deletedebt);
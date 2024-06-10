import { Router } from "express";
import { getdepts, postDepts } from "../controllers/dept.controller.js";

export const deptRouter = Router();

deptRouter.post('/depts', postDepts);
deptRouter.get('/depts', getdepts);
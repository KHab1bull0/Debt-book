import { Router } from "express";
import { userRouter } from "./user.route.js";
import { setUp } from "./setup.route.js";
import { deptRouter } from "./dept.route.js";
import { adminRouter } from "./admin.route.js";


export const router = Router();

router.use(userRouter);
router.use(deptRouter);
router.use(adminRouter);
router.get('/setUp', setUp);

import express from "express";
import { router } from "./routes/index.js";
// import { logMiddleware } from "./middlewares/log.middleware.js";




export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logMiddleware);

app.use('/api', router);




import express from "express";
import cors from "cors";
import movementRouter from "./routers/movementRouter.js";
const app = express();
app.use(express.json());
app.use('/movements',movementRouter);
app.use(
  cors({
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  }),
);

export default app;

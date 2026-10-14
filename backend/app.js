import express from "express";
import cors from "cors";

import movementRouter from "./routers/movementRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();

app.use(
  cors({
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  }),
);

app.use(express.json());

app.use("/movements", movementRouter);
app.use("/products", productRouter);

export default app;

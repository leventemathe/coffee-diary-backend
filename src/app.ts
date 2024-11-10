import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { coffeeRouter } from "./routes/coffee.routes";
import { coffeemakerRouter } from "./routes/coffeemaker.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/coffee", coffeeRouter);
app.use("/api/v1/coffeemaker", coffeemakerRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

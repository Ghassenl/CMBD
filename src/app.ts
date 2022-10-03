import { routes } from "./routes";
import express from "express";
import { errorHandlingMiddleware } from "./middlewares";

const app = express();
app.use(express.json());

app.use(routes);
app.use(errorHandlingMiddleware);

export { app };

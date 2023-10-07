import "express-async-errors";
import express, { Application, json } from "express";
import "dotenv/config";
import { developersRouter, projectsRouter } from "./routers";
import { handleErrors } from "./middlewares";

const app: Application = express();

app.use(json())

app.use("/developers", developersRouter)
app.use("/projects", projectsRouter)

app.use(handleErrors)

export default app;

import cors from "cors";
import express from "express";
import "express-async-errors";

import router from "./Routes/index";
import { handleError } from "./Middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleError);

export default app;
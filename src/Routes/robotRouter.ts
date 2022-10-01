import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidation";
import { validateToken } from "../Middlewares/authMiddleware";

const robotRouter = Router();

export default robotRouter;
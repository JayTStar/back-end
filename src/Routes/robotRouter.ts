import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidation.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const robotRouter = Router();

export default robotRouter;
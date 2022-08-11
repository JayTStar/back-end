import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidation.js";
import * as userSchema from "../Schemas/UserSchemas.js"
import * as userController from "../Controllers/userControllers.js"

const userRouter = Router();

userRouter.post("/sign-up",validateSchema(userSchema.signupSchema), userController.signup);
userRouter.post("/sign-in", validateSchema(userSchema.signinSchema), userController.signin);

export default userRouter;
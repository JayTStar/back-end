import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidation.js";
import * as userSchema from "../Schemas/UserSchemas.js";
import * as userController from "../Controllers/userControllers.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up",validateToken, validateSchema(userSchema.signupSchema), userController.signup);
userRouter.post("/sign-in", validateSchema(userSchema.signinSchema), userController.signin);
userRouter.get("/info", validateToken, userController.getUserInfo);
userRouter.get("/membro/:id", userController.getUserInfo);
userRouter.get("/membros", userController.getMembros);
userRouter.get("/cargos", userController.getCargos);
userRouter.get("/categorias", userController.getCategorias);
userRouter.post("/membro/:id/edit", validateToken, userController.editUser);
userRouter.delete("/membro/:id/delete",  userController.deleteUser);

export default userRouter;
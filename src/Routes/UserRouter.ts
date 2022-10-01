import { Router } from "express";

import validateSchema from "../Middlewares/schemaValidation";
import * as userSchema from "../Schemas/UserSchemas";
import * as userController from "../Controllers/userControllers";
import { validateToken } from "../Middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/sign-up", validateToken, validateSchema(userSchema.signupSchema), userController.signup);
userRouter.post("/sign-in", validateSchema(userSchema.signinSchema), userController.signin);
userRouter.get("/info", validateToken, userController.getUserInfo);
userRouter.get("/membro/:id", userController.getUserInfo);
userRouter.get("/membros", userController.getMembros);
userRouter.get("/cargos", userController.getCargos);
userRouter.get("/categorias", userController.getCategorias);
userRouter.post("/membro/:id/edit", validateToken, userController.editUser);
userRouter.delete("/membro/:id/delete",  userController.deleteUser);

export default userRouter;
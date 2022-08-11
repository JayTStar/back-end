import { Router } from "express";

import userRouter from "./UserRouter.js";

const router = Router();

router.use(userRouter);

export default router;
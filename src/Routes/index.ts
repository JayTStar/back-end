import { Router } from "express";

import userRouter from "./UserRouter";

const router = Router();

router.use(userRouter);

export default router;
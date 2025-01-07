import express from 'express';

import userRouter from './user';
import healthRouter from './health';


const router = express.Router();

router.use("/user", userRouter);
router.use('/health', healthRouter);

export default router;
import express from 'express'

import { health } from '../../controller/health';

const router = express.Router();


router.get('/check',
    health
);

export default router;

import express from 'express';
import { config } from "dotenv";
import * as path from 'path';

import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';

config();

export const createApp = (): express.Application => {
    const app: express.Application = express();
    const FRONTEND_BUILD_DIRECTORY = '../frontend/build';

    app.use(express.json());
    app.use(express.static(path.join(__dirname, FRONTEND_BUILD_DIRECTORY)));
    app.use('/api', appRouter);
    // Catch-all for frontend routes
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, FRONTEND_BUILD_DIRECTORY, 'index.html'));
        } else {
            
            res.status(404).json({ error: 'API route not found' });
        }
    });
    
    app.use(errorHandler);

    return app;
};
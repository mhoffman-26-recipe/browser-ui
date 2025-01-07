import request from 'supertest';
import { createApp } from '../../../app';

describe('E2E Tests', () => {
    let app;

    beforeAll(() => {
        app = createApp();
    });

    it('should return 200 health check', async () => {
        const res = await request(app).get('/api/health/check');
        expect(res.status).toBe(200);
    });
});

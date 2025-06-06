import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
router.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes);
export default router;

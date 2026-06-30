import { Router } from 'express';
import { getAllServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Public route
router.get('/', getAllServices);

// Protected Admin routes
router.post('/', authenticateAdmin, createService);
router.put('/:id', authenticateAdmin, updateService);
router.delete('/:id', authenticateAdmin, deleteService);

export default router;

import { Router } from 'express';
import { getAll, create, update, remove } from '../controllers/blogController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();
router.get('/', getAll);
router.post('/', authenticateAdmin, create);
router.put('/:id', authenticateAdmin, update);
router.delete('/:id', authenticateAdmin, remove);
export default router;

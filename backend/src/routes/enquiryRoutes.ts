import { Router } from 'express';
import { getAll, create, update, remove } from '../controllers/enquiryController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();
// Public: submit contact form
router.post('/', create);
// Admin only: view and manage
router.get('/', authenticateAdmin, getAll);
router.put('/:id', authenticateAdmin, update);
router.delete('/:id', authenticateAdmin, remove);
export default router;

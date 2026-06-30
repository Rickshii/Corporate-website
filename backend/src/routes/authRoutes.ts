import { Router } from 'express';
import { loginAdmin, registerAdmin, forgotPassword, changePassword } from '../controllers/authController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', authenticateAdmin, changePassword);

export default router;

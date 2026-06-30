import { Router } from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController';

const router = Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

export default router;

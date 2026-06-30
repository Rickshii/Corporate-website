import { Router } from 'express';
import { getAllGallery, createGallery, updateGallery, deleteGallery } from '../controllers/galleryController';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// Public route
router.get('/', getAllGallery);

// Protected Admin routes
router.post('/', authenticateAdmin, upload.single('image'), createGallery);
router.put('/:id', authenticateAdmin, upload.single('image'), updateGallery);
router.delete('/:id', authenticateAdmin, deleteGallery);

export default router;


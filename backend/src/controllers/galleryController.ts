import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { Gallery } from '../models/models';

// Helper to delete physical file from disk
const deleteDiskFile = (imageUrl: string) => {
  try {
    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      const fileName = imageUrl.replace('/uploads/', '');
      const filePath = path.join(__dirname, '../../uploads', fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted local image file: ${filePath}`);
      }
    }
  } catch (error) {
    console.error('Error deleting file from disk:', error);
  }
};

export const getAllGallery = async (_req: Request, res: Response): Promise<void> => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Error fetching gallery items' });
  }
};

export const createGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category } = req.body;
    
    if (!req.file) {
      res.status(400).json({ message: 'Image file is required' });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newItem = new Gallery({
      title: title || null,
      imageUrl,
      category: category || null,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: 'Error creating gallery item' });
  }
};

export const updateGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;
    
    const item = await Gallery.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Gallery item not found' });
      return;
    }

    let imageUrl = item.imageUrl;

    // If new file is uploaded, update URL and delete old file
    if (req.file) {
      deleteDiskFile(item.imageUrl);
      imageUrl = `/uploads/${req.file.filename}`;
    }

    item.title = title !== undefined ? title : item.title;
    item.category = category !== undefined ? category : item.category;
    item.imageUrl = imageUrl;

    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ message: 'Error updating gallery item' });
  }
};

export const deleteGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);
    
    if (!item) {
      res.status(404).json({ message: 'Gallery item not found' });
      return;
    }

    // Delete file from disk
    deleteDiskFile(item.imageUrl);

    // Delete document from MongoDB
    await Gallery.findByIdAndDelete(id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};


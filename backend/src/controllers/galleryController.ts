import { Request, Response } from 'express';
import { Gallery } from '../models/models';

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

    // Convert uploaded buffer to Base64 data URL and store in MongoDB.
    // This approach is cloud-agnostic — no external storage service needed.
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const newItem = new Gallery({
      title: title || null,
      imageUrl: base64Image,
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

    // If a new file is uploaded, replace the stored Base64 image
    if (req.file) {
      imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
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

    // Image is stored in MongoDB as Base64 — deleting the document removes it completely
    await Gallery.findByIdAndDelete(id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};

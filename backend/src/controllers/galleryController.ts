import { Request, Response } from 'express';
import { Gallery } from '../models/models';
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary';

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

    // Upload buffer directly to Cloudinary and get secure URL
    const cloudinaryUrl = await uploadToCloudinary(req.file.buffer);

    const newItem = new Gallery({
      title: title || null,
      imageUrl: cloudinaryUrl,
      category: category || null,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error creating gallery item' });
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

    // If a new file is uploaded, upload it to Cloudinary and delete the old one
    if (req.file) {
      // Delete old image from Cloudinary (ignored if it was a base64 / local upload)
      if (item.imageUrl) {
        await deleteFromCloudinary(item.imageUrl);
      }
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    item.title = title !== undefined ? title : item.title;
    item.category = category !== undefined ? category : item.category;
    item.imageUrl = imageUrl;

    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error updating gallery item' });
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

    // Delete image from Cloudinary
    if (item.imageUrl) {
      await deleteFromCloudinary(item.imageUrl);
    }

    await Gallery.findByIdAndDelete(id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};


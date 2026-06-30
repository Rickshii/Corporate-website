import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const galleryItems = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery items' });
  }
};

export const createGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, imageUrl, category } = req.body;
    
    if (!imageUrl) {
      res.status(400).json({ message: 'Image URL is required' });
      return;
    }

    const newItem = await prisma.gallery.create({
      data: {
        title: title || null,
        imageUrl,
        category: category || null,
      }
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: 'Error creating gallery item' });
  }
};

export const updateGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, imageUrl, category } = req.body;
    
    const updatedItem = await prisma.gallery.update({
      where: { id: Number(id) },
      data: {
        title,
        imageUrl,
        category
      }
    });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ message: 'Error updating gallery item' });
  }
};

export const deleteGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.gallery.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};

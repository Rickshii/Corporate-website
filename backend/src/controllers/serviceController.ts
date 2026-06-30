import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, icon, features, isActive } = req.body;
    const newService = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        features: JSON.stringify(features || []),
        isActive: isActive ?? true,
      }
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, icon, features, isActive } = req.body;
    
    const updatedService = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        icon,
        ...(features && { features: JSON.stringify(features) }),
        isActive
      }
    });
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.service.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};

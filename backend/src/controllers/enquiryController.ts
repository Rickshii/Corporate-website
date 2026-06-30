import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(enquiries);
};
export const create = async (req: Request, res: Response): Promise<void> => {
  const data = await prisma.enquiry.create({ data: req.body });
  res.status(201).json(data);
};
export const update = async (req: Request, res: Response): Promise<void> => {
  const data = await prisma.enquiry.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(data);
};
export const remove = async (req: Request, res: Response): Promise<void> => {
  await prisma.enquiry.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Deleted' });
};

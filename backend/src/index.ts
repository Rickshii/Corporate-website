import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import courseRoutes from './routes/courseRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import blogRoutes from './routes/blogRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import galleryRoutes from './routes/galleryRoutes';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Values Vruksha Backend is running ✅' });
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}\n`);
});

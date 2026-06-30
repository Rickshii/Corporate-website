import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './lib/mongodb';
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

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}\n`);
  });
});


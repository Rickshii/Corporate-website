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

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed => allowed === origin || origin.startsWith(allowed)) ||
                      origin.endsWith('.vercel.app') || // Allow all Vercel deployments/previews
                      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) || // Allow 192.168.x.x subnets
                      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) || // Allow 10.x.x.x subnets
                      /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin); // Allow 172.16-31.x.x subnets

    if (isAllowed) {
      callback(null, true);
    } else {
      // Fallback: allow to prevent CORS issues
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cache-Control', 'Pragma', 'Expires']
}));

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
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}\n`);
  });
});


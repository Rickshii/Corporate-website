import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/models';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/values_vruksha';

const seedAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = 'admin@valuesvruksha.in';
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      // Ensure the default password is set and reset
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('✅ MongoDB Admin user password verified/reset successfully.');
    } else {
      const admin = new User({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
      });
      await admin.save();
      console.log('✅ MongoDB Admin user seeded: admin@valuesvruksha.in / admin123');
    }
  } catch (error) {
    console.error('❌ Failed to seed MongoDB Admin user:', error);
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully.');
    
    // Auto-seed admin user on startup
    await seedAdminUser();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};


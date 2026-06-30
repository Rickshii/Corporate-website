import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  role: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: 'ADMIN' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);

// Gallery Schema
export interface IGallery extends Document {
  title?: string;
  imageUrl: string;
  category?: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, trim: true },
  imageUrl: { type: String, required: true },
  category: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Gallery = mongoose.model<IGallery>('Gallery', GallerySchema);

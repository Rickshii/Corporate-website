import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-1234';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const parts = authHeader.split(' ');
    const token = parts[1];
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // Verify local JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


import jwt from 'jsonwebtoken';
import Admin from '../../models/admin.js';
import connectDB from '../../lib/DBconnection.js';

export const protect = async (req) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await connectDB();
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        throw new Error('Not authorized, admin not found');
      }
      return admin;
    } catch (error) {
      throw new Error('Not authorized, token failed');
    }
  } else {
    throw new Error('Not authorized, no token');
  }
};
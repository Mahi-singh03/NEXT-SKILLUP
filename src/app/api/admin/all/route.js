import Admin from '../../../../models/admin.js';
import connectDB from '../../../../lib/DBconnection.js';
import { protect } from '../../../middleware/adminMiddleware.js';

export async function GET(req) {
  try {
    const adminResult = await protect(req);
    
    // Check if the middleware returned an error response
    if (adminResult instanceof Response) {
      return adminResult;
    }
    
    await connectDB();
    const admins = await Admin.find({}).select('-password');
    return new Response(JSON.stringify(admins), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
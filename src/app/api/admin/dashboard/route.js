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

    const totalAdmins = await Admin.countDocuments({});
    const recentAdmins = await Admin.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    const stats = {
      totalAdmins,
      lastLogin: adminResult.updatedAt,
      adminName: adminResult.name,
      recentAdmins,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
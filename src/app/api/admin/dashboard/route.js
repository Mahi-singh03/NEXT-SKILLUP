import Admin from '../../../../models/admin.js';
import connectDB from '../../../../lib/DBconnection.js';
import { protect } from '../../../middleware/adminMiddleware.js';   

export async function GET(req) {
  try {
    const admin = await protect(req);
    await connectDB();

    const totalAdmins = await Admin.countDocuments({});
    const recentAdmins = await Admin.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    const stats = {
      totalAdmins,
      lastLogin: admin.updatedAt,
      adminName: admin.name,
      recentAdmins,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
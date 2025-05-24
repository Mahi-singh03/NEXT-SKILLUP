import { protect } from '../../../middleware/adminMiddleware.js';

export async function GET(req) {
  try {
    const admin = await protect(req);
    return new Response(
      JSON.stringify({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
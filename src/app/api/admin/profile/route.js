import { protect } from '../../../middleware/adminMiddleware.js';

export async function GET(req) {
  try {
    const adminResult = await protect(req);
    
    // Check if the middleware returned an error response
    if (adminResult instanceof Response) {
      return adminResult;
    }
    
    return new Response(
      JSON.stringify({
        _id: adminResult._id,
        name: adminResult.name,
        email: adminResult.email,
        role: adminResult.role,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
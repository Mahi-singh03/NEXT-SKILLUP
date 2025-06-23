import Admin from '../../../../../models/admin.js';
import connectDB from '../../../../../lib/DBconnection.js';
import { protect } from '../../../../middleware/adminMiddleware.js';

export async function PUT(req, { params }) {
  try {
    const adminResult = await protect(req);
    
    // Check if the middleware returned an error response
    if (adminResult instanceof Response) {
      return adminResult;
    }
    
    await connectDB();
    const { id } = params;
    const { name, email, password } = await req.json();

    const admin = await Admin.findById(id);

    if (admin) {
      admin.name = name || admin.name;
      admin.email = email || admin.email;
      if (password) {
        admin.password = password;
      }

      const updatedAdmin = await admin.save();
      return new Response(
        JSON.stringify({
          _id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          role: updatedAdmin.role,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Admin not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const adminResult = await protect(req);
    
    // Check if the middleware returned an error response
    if (adminResult instanceof Response) {
      return adminResult;
    }
    
    await connectDB();
    const { id } = params;

    const admin = await Admin.findById(id);

    if (admin) {
      await admin.deleteOne();
      return new Response(JSON.stringify({ message: 'Admin removed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Admin not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}












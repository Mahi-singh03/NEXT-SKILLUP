// /src/app/api/cloudinary/route.js

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET method export for Next.js App Router
export async function GET() {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:gallery/*') // Adjust if your folder name is different
      .sort_by('public_id', 'desc')
      .with_field('context') // Ensure context metadata (alt, order, etc.) is included
      .max_results(100)
      .execute();

    const images = resources.map(file => ({
      url: file.secure_url,
      publicId: file.public_id,
      context: file.context || null,
    }));

    return Response.json({ images });
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images from Cloudinary' }), {
      status: 500,
    });
  }
}

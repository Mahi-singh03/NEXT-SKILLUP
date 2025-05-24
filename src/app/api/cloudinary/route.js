import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    console.log('Fetching images from Cloudinary...');

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Home/gallery/',
      max_results: 50,
    });

    console.log('Raw Cloudinary result:', JSON.stringify(result, null, 2));

    if (!result.resources || result.resources.length === 0) {
      console.warn('No images returned from Cloudinary with prefix "gallery/".');
      return new Response(
        JSON.stringify({ message: 'No images found', resources: result.resources }),
        { status: 404 }
      );
    }

    const images = result.resources.map((resource) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
    }));

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch images',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

export async function GET(request, { params }) {
  const { filename } = params;
  const allowed = ['MARKS.jpeg', 'Cerificate.jpeg'];
  if (!allowed.includes(filename)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const filePath = join(process.cwd(), 'src/app/api/admin/certificate/image', filename);
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 
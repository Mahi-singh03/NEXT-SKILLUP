import { NextResponse } from 'next/server';
import registered_students from '../../../../models/students';
import connectDB from '../../../../lib/DBconnection';
import puppeteer from 'puppeteer';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const rollNo = searchParams.get('rollNo');

  if (!rollNo) {
    return NextResponse.json({ error: 'Roll number is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching student with rollNo: ${rollNo}`);
    const student = await registered_students.findOne({ rollNo }) || {};

    if (!student.rollNo) {
      console.log(`Student with rollNo ${rollNo} not found`);
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Generate HTML content with Tailwind CSS classes
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @page { size: landscape; margin: 0; }
          body { margin: 0; }
          .certificate-page { width: 297mm; height: 210mm; position: relative; overflow: hidden; }
          .background-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; object-fit: cover; }
          .content { position: relative; z-index: 1; color: #000; }
        </style>
      </head>
      <body>
        <!-- STATEMENT OF MARKS PAGE -->
        <div class="certificate-page" id="marks-page">
          <img src="/MARKS.jpeg" alt="Marks Background" class="background-image">
          <div class="content p-6">
            <h1 class="text-4xl font-bold text-center mb-2">SKILL UP INSTITUTE OF LEARNING</h1>
            <p class="text-center text-sm mb-2">Assessed by RAPL and found to comply with the requirements of</p>
            <p class="text-center text-sm mb-4">ISO 9001: 2015 Quality Management Systems</p>
            <h2 class="text-2xl font-bold text-center mb-4">STATEMENT OF MARKS</h2>
            <div class="grid grid-cols-2 gap-2 mb-4">
              <div><span class="font-bold">Roll No:</span> ${student.rollNo}</div>
              <div><span class="font-bold">Name:</span> ${student.fullName || '-'}</div>
              <div><span class="font-bold">Course:</span> ${student.selectedCourse || '-'}</div>
              <div><span class="font-bold">Duration:</span> ${student.courseDuration || '-'}</div>
              <div><span class="font-bold">Session:</span> ${student.joiningDate ? new Date(student.joiningDate).getFullYear().toString() : '-'}</div>
            </div>
            <table class="w-full mb-4">
              <thead>
                <tr class="border-b">
                  <th class="text-left font-bold p-2">Subject Code</th>
                  <th class="text-left font-bold p-2">Subject Name</th>
                  <th class="text-right font-bold p-2">Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                ${((student.examResults || []).map(result => `
                  <tr class="border-b">
                    <td class="p-2">${result.subjectCode || '-'}</td>
                    <td class="p-2">${result.subjectName || '-'}</td>
                    <td class="p-2 text-right">${result.totalMarks?.toString() || '-'}</td>
                  </tr>
                `)).join('')}
              </tbody>
            </table>
            <div class="mb-4">
              <p><span class="font-bold">Total:</span> ${((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0)).toString()}</p>
              <p><span class="font-bold">Total Marks Obtained in Words:</span> ${((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0))} (Rs.)</p>
              <p><span class="font-bold">Percentage:</span> ${(((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0) / ((student.examResults || []).length * 100)) * 100).toFixed(2)}%</p>
              <p><span class="font-bold">Grade:</span> ${student.finalGrade || '-'}</p>
            </div>
            <p class="text-center text-sm italic">This is a computer generated document and does not require signature.</p>
            <p class="text-center text-sm italic">You may also visit to verify your result www.skillupinstitute.co.in</p>
          </div>
        </div>

        <!-- CERTIFICATE OF COMPLETION PAGE -->
        <div class="certificate-page" id="certificate-page" style="page-break-before: always;">
          <img src="/Cerificate.jpeg" alt="Certificate Background" class="background-image">
          <div class="content p-6">
            <h1 class="text-4xl font-bold text-center mb-2">SKILL UP INSTITUTE OF LEARNING</h1>
            <p class="text-center text-sm mb-2">Assessed by RAPL and found to comply with the requirements of</p>
            <p class="text-center text-sm mb-4">ISO 9001: 2015 Quality Management Systems</p>
            <h2 class="text-2xl font-bold text-center mb-4">CERTIFICATE OF COMPLETION</h2>
            <p class="text-center text-lg mb-2">This is to certify that</p>
            <h3 class="text-3xl font-bold text-center mb-2">${(student.fullName || '-').toUpperCase()}</h3>
            <p class="text-center text-lg mb-2">has successfully completed the</p>
            <h4 class="text-xl font-bold text-center mb-2">${student.selectedCourse || '-'}</h4>
            <p class="text-center text-sm"><span class="font-bold">Course Duration:</span> ${student.courseDuration || '-'}</p>
            <p class="text-center text-sm"><span class="font-bold">Session:</span> ${student.joiningDate && student.farewellDate
              ? `${new Date(student.joiningDate).getFullYear()} - ${new Date(student.farewellDate).getFullYear()}`
              : '-'}</p>
            <div class="flex justify-between mt-8">
              <div class="text-center">
                <p class="border-t">_________________________</p>
                <p class="text-sm">Director</p>
              </div>
              <div class="text-center">
                <p class="border-t">_________________________</p>
                <p class="text-sm">01:53 PM IST, July 11, 2025</p>
              </div>
            </div>
            <p class="text-center text-sm italic mt-4">Certificate ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Use puppeteer to generate PDF from HTML
    console.log('Launching Puppeteer');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    // Set the content and wait for network idle to ensure Tailwind loads
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    // Wait for images to load
    await page.evaluate(async () => {
      const selectors = Array.from(document.images).map(img => {
        if (img.complete) return null;
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      });
      await Promise.all(selectors);
    });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    await browser.close();

    const response = new NextResponse(pdfBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', `attachment; filename=${student.rollNo}_certificates.pdf`);
    return response;

  } catch (error) {
    console.error('Error generating certificate:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
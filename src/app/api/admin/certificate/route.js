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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // Generate HTML content with Tailwind CSS classes
    const htmlContent = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate</title>
        <link href="/styles/certificates.css" rel="stylesheet">
        <style>
          @page { size: landscape; margin: 0; }
          body { margin: 0; }
          .certificate-page { width: 297mm; height: 210mm; position: relative; overflow: hidden; }
          .background-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; object-fit: cover; }
          .content { position: relative; z-index: 1; color: #000; }
          /* General Styles */
          .content {
            padding: 1.5rem;
          }
          
          .text-center {
            text-align: center;
          }
          
          .text-right {
            text-align: right;
          }
          
          .text-sm {
            font-size: 0.875rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .text-3xl {
            font-size: 1.875rem;
          }
          
          .text-4xl {
            font-size: 2.25rem;
          }
          
          .font-bold {
            font-weight: 700;
          }
          
          .italic {
            font-style: italic;
          }
          
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          
          .mb-4 {
            margin-bottom: 1rem;
          }
          
          .mt-4 {
            margin-top: 1rem;
          }
          
          .mt-8 {
            margin-top: 2rem;
          }
          
          /* Marks Page Styles */




        .marks-content {
            padding: 1.5rem;
        }
        .date{
              padding-left: 75px;
              padding-top: 10px;
        }
          
          .student-info-grid {
            display: grid;
            grid-template-columns: 0.85fr 1fr;
            gap: 0.3rem;
            padding-top: 232px;
            margin-bottom: 1rem;
            padding-left: 270px;
          }
          
          .info-label {
            font-weight: 700;
          }
          
          .Marks-header-grid {
            width: 100%;
            margin-bottom: 1rem;
            border-collapse: collapse;
          }
          
          .Marks-header {
            display: grid;
            grid-template-columns: 0.85fr 1fr;
            gap: 0.3rem;
          }
          
          .table-header {
            font-weight: 700;
            padding: 0.5rem;
            text-align: left;
          }
          
          .table-row {
            border-bottom: 1px solid #000;
          }
          
          .table-cell {
            padding: 0.5rem;
          }
          
          .marks-summary {
            margin-bottom: 1rem;
          }
          
          .disclaimer-text {
            text-align: center;
            font-size: 0.875rem;
            font-style: italic;
          }
          
          /* Certificate Page Styles */
          .certificate-content {
            padding: 1.5rem;
          }
          
          .certificate-text {
            text-align: center;
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
          }
          
          .student-name {
            font-size: 1.875rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          
          .course-name {
            font-size: 1.25rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          
          .course-info {
            text-align: center;
            font-size: 0.875rem;
          }
          
          .signature-container {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
          }
          
          .signature-box {
            text-align: center;
          }
          
          .signature-line {
            border-top: 1px solid #000;
            width: 150px;
            margin: 0 auto;
          }
          
          .signature-label {
            font-size: 0.875rem;
          }
          
          .certificate-id {
            text-align: center;
            font-size: 0.875rem;
            font-style: italic;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <!-- STATEMENT OF MARKS PAGE -->
        <div class="certificate-page" id="marks-page">
          <img src="${baseUrl}/MARKSHEET.jpg" alt="Marks Background" class="background-image">
          <div class="content marks-content">
            <div class="student-info-grid">
              <div><span class="info-label"></span> ${student.fullName || '-'}</div>
              <div><span class="info-label"></span> ${student.fatherName || '-'}</div>
              <div><span class="info-label"></span> ${student.motherName || '-'}</div>
              <div><span class="info-label"></span> ${student.rollNo || '-'}</div>
              <div><span class="info-label">Roll No:</span> ${student.rollNo}</div>
              <div><span class="info-label">Course:</span> ${student.selectedCourse || '-'}</div>
              <div><span class="info-label">Duration:</span> ${student.courseDuration || '-'}</div>
              <div><span class="info-label">Session:</span> ${student.joiningDate ? new Date(student.joiningDate).getFullYear().toString() : '-'}</div>
            </div>
            <table class="marks-table">
              <thead>
                <tr class="table-header-row">
                  <th class="table-header">Subject Code</th>
                  <th class="table-header">Subject Name</th>
                  <th class="table-header text-right">Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                ${((student.examResults || []).map(result => `
                  <tr class="table-row">
                    <td class="table-cell">${result.subjectCode || '-'}</td>
                    <td class="table-cell">${result.subjectName || '-'}</td>
                    <td class="table-cell text-right">${result.totalMarks?.toString() || '-'}</td>
                  </tr>
                `)).join('')}
              </tbody>
            </table>
            <div class="marks-summary">
              <p><span class="info-label">Total:</span> ${((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0)).toString()}</p>
              <p><span class="info-label">Total Marks Obtained in Words:</span> ${((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0))} (Rs.)</p>
              <p><span class="info-label">Percentage:</span> ${(((student.examResults || []).reduce((sum, r) => sum + (r.totalMarks || 0), 0) / ((student.examResults || []).length * 100)) * 100).toFixed(2)}%</p>
              <p><span class="info-label">Grade:</span> ${student.finalGrade || '-'}</p>
            </div>
            <p class="disclaimer-text">This is a computer generated document and does not require signature.</p>
            <p class="disclaimer-text">You may also visit to verify your result www.skillupinstitute.co.in</p>
          </div>
        </div>

        <!-- CERTIFICATE OF COMPLETION PAGE -->
        <div class="certificate-page" id="certificate-page" style="page-break-before: always;">
          <img src="${baseUrl}/CERTIFICATE.jpg" alt="Certificate Background" class="background-image">
          <div class="content certificate-content">
            <h1 class="institute-name">SKILL UP INSTITUTE OF LEARNING</h1>
            <p class="iso-text">Assessed by RAPL and found to comply with the requirements of</p>
            <p class="iso-text">ISO 9001: 2015 Quality Management Systems</p>
            <h2 class="document-title">CERTIFICATE OF COMPLETION</h2>
            <p class="certificate-text">This is to certify that</p>
            <h3 class="student-name">${(student.fullName || '-').toUpperCase()}</h3>
            <p class="certificate-text">has successfully completed the</p>
            <h4 class="course-name">${student.selectedCourse || '-'}</h4>
            <p class="course-info"><span class="info-label">Course Duration:</span> ${student.courseDuration || '-'}</p>
            <p class="course-info"><span class="info-label">Session:</span> ${student.joiningDate && student.farewellDate
              ? `${new Date(student.joiningDate).getFullYear()} - ${new Date(student.farewellDate).getFullYear()}`
              : '-'}</p>
            <div class="signature-container">
              <div class="signature-box">
                <div class="signature-line"></div>
                <p class="signature-label">Director</p>
              </div>
              <div class="signature-box">
                <div class="signature-line"></div>
                <p class="signature-label">01:53 PM IST, July 11, 2025</p>
              </div>
            </div>
            <p class="certificate-id">Certificate ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>
        </div>
      </body>
</html>`;

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
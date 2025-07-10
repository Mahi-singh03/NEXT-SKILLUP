import { NextResponse } from 'next/server';
import registered_students from '../../../../models/students';
import { jsPDF } from 'jspdf';
import connectDB from '../../../../lib/DBconnection';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const rollNo = searchParams.get('rollNo');

  if (!rollNo) {
    return NextResponse.json({ error: 'Roll number is required' }, { status: 400 });
  }

  try {
    const student = await registered_students.findOne({ rollNo });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Initialize jsPDF with portrait orientation (each certificate gets its own page)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add border to all pages
    const addBorder = () => {
      doc.setDrawColor(200, 200, 200);
      doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);
    };

    // ===== FIRST PAGE: STATEMENT OF MARKS =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('SKILL UP INSTITUTE OF LEARNING', 105, 30, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('ISO 9001:2015 Certified Institution', 105, 40, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('STATEMENT OF MARKS', 105, 50, { align: 'center' });
    
    // Student details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Roll No:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(student.rollNo, 50, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(student.fullName, 50, 80);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Course:', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(student.selectedCourse, 50, 90);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Duration:', 120, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(student.courseDuration, 150, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Session:', 120, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(student.joiningDate).getFullYear().toString(), 150, 80);

    // Marks table header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Subject Code', 20, 110);
    doc.text('Subject Name', 60, 110);
    doc.text('Marks Obtained', 160, 110, { align: 'right' });
    
    // Marks table content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let yPos = 120;
    student.examResults.forEach(result => {
      doc.text(result.subjectCode || '-', 20, yPos);
      doc.text(result.subjectName || '-', 60, yPos);
      doc.text(result.totalMarks?.toString() || '-', 160, yPos, { align: 'right' });
      yPos += 8;
    });

    // Summary
    const totalMarks = student.examResults.reduce((sum, r) => sum + (r.totalMarks || 0), 0);
    const percentage = (totalMarks / (student.examResults.length * 100)) * 100;
    
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Marks: ${totalMarks}`, 20, yPos + 15);
    doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, yPos + 25);
    doc.text(`Grade: ${student.finalGrade}`, 20, yPos + 35);
    
    doc.setFont('helvetica', 'italic');
    doc.text('This is a computer generated document and does not require signature.', 105, 270, { align: 'center' });
    
    addBorder();

    // ===== SECOND PAGE: CERTIFICATE OF COMPLETION =====
    doc.addPage();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('SKILL UP INSTITUTE OF LEARNING', 105, 30, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('ISO 9001:2015 Certified Institution', 105, 40, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CERTIFICATE OF COMPLETION', 105, 60, { align: 'center' });
    
    // Certificate body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('This is to certify that', 105, 90, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(student.fullName.toUpperCase(), 105, 110, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('has successfully completed the', 105, 130, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(student.selectedCourse, 105, 150, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Course Duration: ${student.courseDuration}`, 105, 170, { align: 'center' });
    doc.text(`Session: ${new Date(student.joiningDate).getFullYear()} - ${new Date(student.farewellDate).getFullYear()}`, 105, 180, { align: 'center' });
    
    // Signature lines
    doc.setFontSize(10);
    doc.text('_________________________', 50, 220);
    doc.text('Director', 50, 230);
    
    doc.text('_________________________', 140, 220);
    doc.text('Date', 140, 230);
    
    doc.setFont('helvetica', 'italic');
    doc.text('Certificate ID: ' + Math.random().toString(36).substring(2, 10).toUpperCase(), 105, 250, { align: 'center' });
    
    addBorder();

    // Generate PDF and return
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    const response = new NextResponse(pdfBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', `attachment; filename=${student.rollNo}_certificates.pdf`);
    return response;

  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import mongoose from 'mongoose';
import registered_students from '@/models/students'; 
import connectDB from '@/lib/DBconnection';

// GET - Fetch individual student details
export async function GET(request, { params }) {
  await connectDB();

  try {
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: 'Invalid student ID'
      }, { status: 400 });
    }

    const student = await registered_students.findById(id)
      .select('fullName photo rollNo phoneNumber emailAddress feeDetails farewellDate joiningDate')
      .lean();

    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Format response with fee status
    const { totalFees = 0, remainingFees = 0, installmentDetails = [] } = student.feeDetails || {};
    const paidFees = totalFees - remainingFees;
    
    let feeStatus = 'unpaid';
    if (remainingFees === 0 && totalFees > 0) feeStatus = 'paid';
    else if (paidFees > 0 && remainingFees > 0) feeStatus = 'partial';
    
    const currentDate = new Date();
    const isCourseCompleted = student.farewellDate && new Date(student.farewellDate) < currentDate;
    
    const formattedStudent = {
      _id: student._id,
      fullName: student.fullName,
      photo: student.photo || null,
      rollNo: student.rollNo,
      phoneNumber: student.phoneNumber,
      emailAddress: student.emailAddress,
      feeDetails: {
        totalFees,
        paidFees,
        remainingFees,
        status: feeStatus,
        installmentDetails: installmentDetails.map(installment => {
          const sub = installment?.submissionDate ? new Date(installment.submissionDate) : null;
          const safeSubmission = sub && !isNaN(sub) ? sub.toISOString() : new Date().toISOString();
          return {
            amount: installment.amount,
            originalAmount: installment.originalAmount,
            submissionDate: safeSubmission,
            paid: installment.paid,
            payments: installment.payments || []
          };
        })
      },
      isCourseCompleted,
      farewellDate: student.farewellDate,
      joiningDate: student.joiningDate
    };

    return Response.json({
      success: true,
      data: formattedStudent
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

// PUT - Update student details including fee structure
export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const updateData = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: 'Invalid student ID'
      }, { status: 400 });
    }

    const student = await registered_students.findById(id);
    
    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Handle fee details update
    if (updateData.feeDetails) {
      const details = updateData.feeDetails;

      if (details.totalFees !== undefined) {
        student.feeDetails.totalFees = details.totalFees;
        // If remainingFees is not provided, default to totalFees
        if (details.remainingFees === undefined) {
          student.feeDetails.remainingFees = details.totalFees;
        }
      }

      if (details.remainingFees !== undefined) {
        student.feeDetails.remainingFees = details.remainingFees;
      }

      const hasInstallmentsNumber = details.installments !== undefined && details.installments !== null;
      const hasInstallmentAmounts = Array.isArray(details.installmentAmounts) && details.installmentAmounts.length > 0;

      // Regenerate installment details if installments or custom amounts provided
      if (hasInstallmentsNumber || hasInstallmentAmounts) {
        const count = hasInstallmentAmounts
          ? details.installmentAmounts.length
          : (hasInstallmentsNumber ? parseInt(details.installments) : (student.feeDetails.installmentDetails?.length || 0));

        student.feeDetails.installments = count;

        const joining = student.joiningDate ? new Date(student.joiningDate) : new Date();
        const endDate = student.farewellDate ? new Date(student.farewellDate) : new Date(new Date(joining).setMonth(joining.getMonth() + Math.max(0, count - 1)));
        const startMs = joining.getTime();
        const endMs = endDate.getTime();
        const spanMs = Math.max(0, endMs - startMs);

        let amounts = [];
        if (hasInstallmentAmounts) {
          amounts = details.installmentAmounts.map(a => parseFloat(a));
        } else {
          const total = Number(student.feeDetails.totalFees || 0);
          const base = count > 0 ? Math.floor(total / count) : 0;
          const remainder = count > 0 ? total % count : 0;
          amounts = Array.from({ length: count }, (_, i) => (i === 0 ? base + remainder : base));
        }

        student.feeDetails.installmentDetails = Array.from({ length: count }, (_, index) => {
          const ratio = count === 1 ? 0 : index / (count - 1);
          const submissionDate = new Date(startMs + Math.round(spanMs * ratio));
          const amount = amounts[index] ?? 0;
          return {
            amount,
            originalAmount: amount,
            submissionDate,
            paid: false,
            payments: []
          };
        });
      }

      // Update specific installments if provided (supports array or index-mapped object)
      if (details.installmentDetails) {
        const updates = details.installmentDetails;
        if (Array.isArray(updates)) {
          updates.forEach((updatedInstallment, index) => {
            if (student.feeDetails.installmentDetails[index]) {
              if (updatedInstallment.amount !== undefined) {
                student.feeDetails.installmentDetails[index].amount = updatedInstallment.amount;
              }
              if (updatedInstallment.submissionDate !== undefined) {
                student.feeDetails.installmentDetails[index].submissionDate = updatedInstallment.submissionDate;
              }
              if (updatedInstallment.paid !== undefined) {
                student.feeDetails.installmentDetails[index].paid = updatedInstallment.paid;
              }
            }
          });
        } else if (typeof updates === 'object') {
          Object.keys(updates).forEach(key => {
            const index = parseInt(key);
            const updatedInstallment = updates[key];
            if (Number.isInteger(index) && student.feeDetails.installmentDetails[index]) {
              if (updatedInstallment.amount !== undefined) {
                student.feeDetails.installmentDetails[index].amount = updatedInstallment.amount;
              }
              if (updatedInstallment.submissionDate !== undefined) {
                student.feeDetails.installmentDetails[index].submissionDate = updatedInstallment.submissionDate;
              }
              if (updatedInstallment.paid !== undefined) {
                student.feeDetails.installmentDetails[index].paid = updatedInstallment.paid;
              }
            }
          });
        }
      }
    }

    // Update other student details
    if (updateData.fullName) student.fullName = updateData.fullName;
    if (updateData.phoneNumber) student.phoneNumber = updateData.phoneNumber;
    if (updateData.emailAddress) student.emailAddress = updateData.emailAddress;
    if (updateData.photo) student.photo = updateData.photo;

    await student.save();

    return Response.json({
      success: true,
      message: 'Student details updated successfully',
      data: student
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
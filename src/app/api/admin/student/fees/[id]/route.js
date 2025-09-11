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
    const { totalFees = 0, remainingFees = 0, installmentDetails = [], payments = [] } = student.feeDetails || {};
    const paidFees = payments.reduce((sum, payment) => sum + payment.amount, 0);
    
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
        installmentDetails: installmentDetails.map(installment => ({
          amount: installment.amount,
          submissionDate: installment.submissionDate,
          paid: installment.paid,
          payments: installment.payments || []
        }))
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
      if (updateData.feeDetails.totalFees !== undefined) {
        // Validate total fees
        if (updateData.feeDetails.totalFees < 0) {
          return Response.json({
            success: false,
            message: 'Total fees cannot be negative'
          }, { status: 400 });
        }
        
        student.feeDetails.totalFees = updateData.feeDetails.totalFees;
        
        // If remainingFees is not provided, set it to totalFees
        if (updateData.feeDetails.remainingFees === undefined) {
          student.feeDetails.remainingFees = updateData.feeDetails.totalFees;
        }
      }

      if (updateData.feeDetails.remainingFees !== undefined) {
        // Validate remaining fees
        if (updateData.feeDetails.remainingFees < 0) {
          return Response.json({
            success: false,
            message: 'Remaining fees cannot be negative'
          }, { status: 400 });
        }
        
        if (updateData.feeDetails.remainingFees > student.feeDetails.totalFees) {
          return Response.json({
            success: false,
            message: 'Remaining fees cannot be greater than total fees'
          }, { status: 400 });
        }
        
        student.feeDetails.remainingFees = updateData.feeDetails.remainingFees;
      }

      if (updateData.feeDetails.installments !== undefined) {
        student.feeDetails.installments = updateData.feeDetails.installments;
        
        // Regenerate installment details if installments changed
        if (student.feeDetails.totalFees && updateData.feeDetails.installments) {
          const amountPerInstallment = Math.floor(student.feeDetails.totalFees / updateData.feeDetails.installments);
          const remainingAmount = student.feeDetails.totalFees % updateData.feeDetails.installments;
          const joining = new Date(student.joiningDate);
          
          student.feeDetails.installmentDetails = Array.from({ length: updateData.feeDetails.installments }, (_, index) => {
            const submissionDate = new Date(joining);
            submissionDate.setMonth(joining.getMonth() + index);
            
            // Distribute remaining amount to first installment
            const installmentAmount = index === 0 ? amountPerInstallment + remainingAmount : amountPerInstallment;
            
            return {
              amount: installmentAmount,
              submissionDate,
              paid: false
            };
          });
        }
      }

      // Update specific installment if provided
      if (updateData.feeDetails.installmentDetails) {
        // Handle single installment update
        if (typeof updateData.feeDetails.installmentDetails === 'object' && !Array.isArray(updateData.feeDetails.installmentDetails)) {
          const installmentIndex = updateData.feeDetails.installmentDetails.index;
          const updates = updateData.feeDetails.installmentDetails;
          
          if (installmentIndex !== undefined && student.feeDetails.installmentDetails[installmentIndex]) {
            if (updates.amount !== undefined) {
              student.feeDetails.installmentDetails[installmentIndex].amount = updates.amount;
            }
            if (updates.submissionDate !== undefined) {
              student.feeDetails.installmentDetails[installmentIndex].submissionDate = new Date(updates.submissionDate);
            }
            if (updates.paid !== undefined) {
              student.feeDetails.installmentDetails[installmentIndex].paid = updates.paid;
            }
          }
        } else if (Array.isArray(updateData.feeDetails.installmentDetails)) {
          // Handle array of installment updates
          updateData.feeDetails.installmentDetails.forEach((updatedInstallment, index) => {
            if (student.feeDetails.installmentDetails[index]) {
              if (updatedInstallment.amount !== undefined) {
                student.feeDetails.installmentDetails[index].amount = updatedInstallment.amount;
              }
              if (updatedInstallment.submissionDate !== undefined) {
                student.feeDetails.installmentDetails[index].submissionDate = new Date(updatedInstallment.submissionDate);
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
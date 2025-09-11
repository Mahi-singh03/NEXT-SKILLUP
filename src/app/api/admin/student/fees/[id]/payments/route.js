import mongoose from 'mongoose';
import registered_students from '@/models/students'; 
import connectDB from '@/lib/DBconnection';

// POST - Process fee payment
export async function POST(request, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const { amount, installmentIndex, paymentMethod, paymentDate } = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: 'Invalid student ID'
      }, { status: 400 });
    }

    if (!amount || amount <= 0) {
      return Response.json({
        success: false,
        message: 'Invalid payment amount'
      }, { status: 400 });
    }

    const student = await registered_students.findById(id);
    
    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Initialize feeDetails if it doesn't exist
    if (!student.feeDetails) {
      student.feeDetails = {
        totalFees: 0,
        remainingFees: 0,
        installments: 0,
        installmentDetails: [],
        payments: []
      };
    }

    // Initialize payments array if it doesn't exist
    if (!student.feeDetails.payments) {
      student.feeDetails.payments = [];
    }

    // Add payment record
    const payment = {
      amount: parseFloat(amount),
      date: paymentDate ? new Date(paymentDate) : new Date(),
      method: paymentMethod || 'online',
      installmentIndex: installmentIndex !== null ? installmentIndex : null
    };

    student.feeDetails.payments.push(payment);
    
    // Update remaining fees based on all payments vs total fees
    const totalPaidFees = student.feeDetails.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalFees = student.feeDetails.totalFees || 0;
    student.feeDetails.remainingFees = Math.max(0, totalFees - totalPaidFees);

    // Update installment if specified
    if (installmentIndex !== null && student.feeDetails.installmentDetails) {
      if (student.feeDetails.installmentDetails[installmentIndex]) {
        const installment = student.feeDetails.installmentDetails[installmentIndex];
        
        // Initialize payments array if it doesn't exist
        if (!installment.payments) {
          installment.payments = [];
        }
        
        // Store original amount if not already stored
        if (!installment.originalAmount) {
          installment.originalAmount = installment.amount;
        }
        
        installment.payments.push(payment);
        
        // Calculate total paid for this installment
        const totalPaid = installment.payments.reduce((sum, p) => sum + p.amount, 0);
        
        // NEW LOGIC: When any payment is made towards this installment,
        // reduce this installment's amount to totalPaid so due becomes 0,
        // then move the shortage to the next installment.
        if (totalPaid > 0 && !installment.paid) {
          const shortage = Math.max(installment.originalAmount - totalPaid, 0);

          // Make this installment show no due in UI (amount - payments = 0)
          installment.amount = totalPaid;
          installment.paid = true;

          if (shortage > 0) {
            // Add shortage to the next unpaid installment
            for (let i = installmentIndex + 1; i < student.feeDetails.installmentDetails.length; i++) {
              const nextInstallment = student.feeDetails.installmentDetails[i];
              // Store original amount if not already stored
              if (!nextInstallment.originalAmount) {
                nextInstallment.originalAmount = nextInstallment.amount;
              }
              nextInstallment.amount += shortage;
              // Don't mark it paid here; UI will compute due based on payments
              break; // Only add to the immediate next installment
            }
          }
        }
      }
    }

    await student.save();

    return Response.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        remainingFees: student.feeDetails.remainingFees,
        totalFees: student.feeDetails.totalFees,
        installmentDetails: student.feeDetails.installmentDetails
      }
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

// GET - Get payment history for a student
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
      .select('feeDetails.payments')
      .lean();

    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    const payments = student.feeDetails?.payments || [];

    return Response.json({
      success: true,
      data: payments
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
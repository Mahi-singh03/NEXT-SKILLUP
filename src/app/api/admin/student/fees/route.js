import mongoose from 'mongoose';
import registered_students from '@/models/students'; 
import connectDB from '@/lib/DBconnection';

// GET - Fetch students with filtering options
export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const phoneNumber = searchParams.get('phoneNumber');
    const rollNo = searchParams.get('rollNo');
    const name = searchParams.get('name');
    const feeStatus = searchParams.get('feeStatus'); // 'paid', 'unpaid', or 'partial'
    const courseCompleted = searchParams.get('courseCompleted'); // 'true'/'false' or 'completed'/'active'
    const page = parseInt(searchParams.get('page')) || 1;
    const limitParam = searchParams.get('limit');
    const all = String(searchParams.get('all')) === 'true';
    const limit = all ? null : (parseInt(limitParam) || 15);
    const skip = all ? 0 : (page - 1) * (limit || 0);

    // Build base match
    let baseMatch = {};

    if (search) {
      baseMatch.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { emailAddress: { $regex: search, $options: 'i' } }
      ];
    }
    if (phoneNumber) baseMatch.phoneNumber = phoneNumber;
    if (rollNo) baseMatch.rollNo = rollNo;
    if (name) baseMatch.fullName = { $regex: name, $options: 'i' };

    const now = new Date();

    // Aggregation to compute fee status and filter server-side before pagination
    const pipeline = [
      { $match: baseMatch },
      {
        $project: {
          fullName: 1,
          photo: 1,
          rollNo: 1,
          phoneNumber: 1,
          emailAddress: 1,
          farewellDate: 1,
          'feeDetails.totalFees': { $ifNull: ['$feeDetails.totalFees', 0] },
          'feeDetails.remainingFees': { $ifNull: ['$feeDetails.remainingFees', 0] },
          'feeDetails.installmentDetails': { $ifNull: ['$feeDetails.installmentDetails', []] }
        }
      },
      {
        $addFields: {
          paidFees: { $subtract: ['$feeDetails.totalFees', '$feeDetails.remainingFees'] },
          computedFeeStatus: {
            $switch: {
              branches: [
                {
                  case: { $and: [ { $gt: ['$feeDetails.totalFees', 0] }, { $eq: ['$feeDetails.remainingFees', 0] } ] },
                  then: 'paid'
                },
                {
                  case: { $eq: ['$feeDetails.remainingFees', '$feeDetails.totalFees'] },
                  then: 'unpaid'
                },
                {
                  case: { $and: [ { $gt: ['$feeDetails.remainingFees', 0] }, { $lt: ['$feeDetails.remainingFees', '$feeDetails.totalFees'] } ] },
                  then: 'partial'
                }
              ],
              default: 'unpaid'
            }
          },
          isCourseCompletedComputed: { $cond: [ { $lt: ['$farewellDate', now] }, true, false ] }
        }
      }
    ];

    // Apply feeStatus filter if provided
    if (feeStatus) {
      pipeline.push({ $match: { computedFeeStatus: feeStatus } });
    }

    // Apply courseCompleted filter if provided
    if (courseCompleted) {
      const normalized = String(courseCompleted).toLowerCase();
      const wantCompleted = normalized === 'true' || normalized === 'completed';
      pipeline.push({ $match: { isCourseCompletedComputed: wantCompleted } });
    }

    // Facet for total count and (optionally) pagination after filters
    if (all) {
      pipeline.push({
        $facet: {
          data: [ ],
          meta: [ { $count: 'total' } ]
        }
      });
    } else {
      pipeline.push({
        $facet: {
          data: [ { $skip: skip }, { $limit: limit } ],
          meta: [ { $count: 'total' } ]
        }
      });
    }

    const aggResult = await registered_students.aggregate(pipeline);
    let dataDocs = [];
    let filteredTotal = 0;
    if (all) {
      // When using facet without data pipeline, we need to fetch data separately
      // Re-run the same pipeline but without the $facet to get all docs efficiently
      const pipelineWithoutFacet = pipeline.slice(0, -1);
      const metaResult = aggResult[0]?.meta || [];
      filteredTotal = metaResult[0]?.total || 0;
      dataDocs = await registered_students.aggregate(pipelineWithoutFacet);
    } else {
      dataDocs = (aggResult[0]?.data || []);
      filteredTotal = aggResult[0]?.meta?.[0]?.total || 0;
    }
    const totalPages = all ? 1 : (Math.ceil(filteredTotal / (limit || 1)) || 1);

    // Map to response shape
    const formattedStudents = dataDocs.map(student => {
      const totalFees = student.feeDetails?.totalFees || 0;
      const remainingFees = student.feeDetails?.remainingFees || 0;
      const paidFees = totalFees - remainingFees;
      const installmentDetails = Array.isArray(student.feeDetails?.installmentDetails) ? student.feeDetails.installmentDetails : [];
      const isCourseCompleted = !!student.isCourseCompletedComputed;

      return {
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
          status: student.computedFeeStatus,
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
        isCourseCompleted
      };
    });

    return Response.json({
      success: true,
      count: formattedStudents.length,
      totalStudents: filteredTotal,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      data: formattedStudents
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

// POST - Add a new student
export async function POST(request) {
  await connectDB();

  try {
    const studentData = await request.json();
    
    // Check if student already exists
    const existingStudent = await registered_students.findOne({
      $or: [
        { emailAddress: studentData.emailAddress },
        { aadharNumber: studentData.aadharNumber }
      ]
    });
    
    if (existingStudent) {
      return Response.json({
        success: false,
        message: 'Student with this email or Aadhar number already exists'
      }, { status: 400 });
    }
    
    const student = await registered_students.create(studentData);
    return Response.json({
      success: true,
      data: student
    }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

// PUT - Update fee structure for a student
export async function PUT(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('id');
    const feeData = await request.json();

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return Response.json({
        success: false,
        message: 'Invalid student ID'
      }, { status: 400 });
    }

    const student = await registered_students.findById(studentId);
    
    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Update fee details
    if (feeData.totalFees !== undefined) {
      student.feeDetails.totalFees = feeData.totalFees;
      
      // If remainingFees is not provided, set it to totalFees
      if (feeData.remainingFees === undefined) {
        student.feeDetails.remainingFees = feeData.totalFees;
      }
    }

    if (feeData.remainingFees !== undefined) {
      student.feeDetails.remainingFees = feeData.remainingFees;
    }

    if (feeData.installments !== undefined) {
      student.feeDetails.installments = feeData.installments;
      
      // Regenerate installment details if installments changed
      if (student.feeDetails.totalFees && feeData.installments) {
        const amountPerInstallment = Math.floor(student.feeDetails.totalFees / feeData.installments);
        const remainingAmount = student.feeDetails.totalFees % feeData.installments;

        const joining = student.joiningDate ? new Date(student.joiningDate) : new Date();
        const endDate = student.farewellDate ? new Date(student.farewellDate) : new Date(new Date(joining).setMonth(joining.getMonth() + feeData.installments - 1));

        const count = feeData.installments;
        const startMs = joining.getTime();
        const endMs = endDate.getTime();
        const spanMs = Math.max(0, endMs - startMs);

        student.feeDetails.installmentDetails = Array.from({ length: count }, (_, index) => {
          // First installment exactly on joining date; others evenly spaced to endDate
          const ratio = count === 1 ? 0 : index / (count - 1);
          const submissionDate = new Date(startMs + Math.round(spanMs * ratio));

          const installmentAmount = index === 0 ? amountPerInstallment + remainingAmount : amountPerInstallment;

          return {
            amount: installmentAmount,
            originalAmount: installmentAmount,
            submissionDate,
            paid: false,
            payments: []
          };
        });
      }
    }

    await student.save();

    return Response.json({
      success: true,
      message: 'Fee details updated successfully',
      data: student.feeDetails
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
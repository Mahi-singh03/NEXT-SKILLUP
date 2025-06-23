import dbConnect from '../../../lib/DBconnection.js';
import Staff from '../../../models/staff.js';


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { staffId, dob } = req.query;

    if (!staffId || !dob) {
      return res.status(400).json({ message: 'StaffID and DOB are required' });
    }

    const staffIdNum = parseInt(staffId, 10);
    if (isNaN(staffIdNum)) {
      return res.status(400).json({ message: 'Invalid StaffID format' });
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return res.status(400).json({ message: 'Invalid DOB format' });
    }

    const staff = await Staff.findOne({
      StaffID: staffIdNum,
      DOB: dobDate
    }).lean();

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Remove MongoDB internal fields
    const { _id, __v, ...staffData } = staff;
    
    res.json(staffData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
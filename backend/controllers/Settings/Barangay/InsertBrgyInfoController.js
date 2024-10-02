const db = require('../../../config/dbconnections');
const multer = require('multer');

const InsertBrgy = (req, res) => {
  const { brgyName, contactNumber, lguType, province, region, email, website } = req.body;
  const logo1 = req.files.logo1 ? req.files.logo1[0].buffer : null; // Access the buffer
  const logo2 = req.files.logo2 ? req.files.logo2[0].buffer : null;

  const insertUserQuery = `
    INSERT INTO brgy_setup 
    (brgyName, Contact_Number, type, Province, Region, Logo_1, Logo_2, Email_Address, Website) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertUserQuery, [brgyName, contactNumber, lguType, province, region, logo1, logo2, email, website], (error, result) => {
    if (error) throw error;

    res.status(200).json({ message: 'LGU account registered successfully', redirect: '/home' });
  });
};

module.exports = { InsertBrgy };

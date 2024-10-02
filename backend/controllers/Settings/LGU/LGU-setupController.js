const db = require('../../../config/dbconnections');
const multer = require('multer');

const InsertLGU = (req, res) => {
  const { username, number, type, province, region, email, website } = req.body;
  const logo1 = req.files.logo1 ? req.files.logo1[0].buffer : null; // Access the buffer
  const logo2 = req.files.logo2 ? req.files.logo2[0].buffer : null;

  const insertUserQuery = `
    INSERT INTO lgu_setup 
    (LGU_Name, Type, Province, Region, Logo_1, Logo_2, Contact_Number, Email_Address, Website) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertUserQuery, [username, type, province, region, logo1, logo2, number, email, website], (error, result) => {
    if (error) throw error;

    res.status(200).json({ message: 'LGU account registered successfully', redirect: '/home' });
  });
};

module.exports = { InsertLGU };

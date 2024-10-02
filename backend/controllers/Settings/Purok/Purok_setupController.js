const db = require('../../../config/dbconnections');
const multer = require('multer');

const InsertPurok = (req, res) => {
  const { purokName, barangay, type, province, region, purokPresident } = req.body;

  const insertUserQuery = `
    INSERT INTO purok_setup 
    (purok_name, barangay, type, province, region, purok_president	) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(insertUserQuery, [purokName, barangay, type, province, region, purokPresident], (error, result) => {
    if (error) throw error;

    res.status(200).json({ message: 'LGU account registered successfully', redirect: '/home' });
  });
};

module.exports = {InsertPurok };

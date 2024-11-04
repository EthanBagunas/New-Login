//! move some stuff from map to here

var con = require('../config/dbconnections');

const insertFamilyInfo= (req, res) =>{
  const {occupant_id, name, gender, birthdate, type,status} = req.body
  const convbirthdate = new Date(Date.parse(birthdate));
  const sql = 'INSERT INTO FamilyInfo (occupant_id, name, gender, birthdate, type, status) VALUES (?, ?, ?, ?, ?, ?)';

  con.query(sql, [occupant_id, name, gender, convbirthdate, type, status], (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.status(201).json({ message: 'Family Head member added successfully' });
  });
}

const getFamilyInfo= (req, res) => {
  const sql = 'SELECT * FROM FamilyInfo';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}

module.exports = {insertFamilyInfo, getFamilyInfo};
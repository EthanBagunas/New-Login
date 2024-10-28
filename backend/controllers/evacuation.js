//! move some stuff from map to here

var con = require('../config/dbconnections');

const insertFamilyInfo= (req, res) =>{
  const {occupant_id, firstname, lastname, gender, birthdate} = req.body.head
  const convbirthdate = new Date(Date.parse(birthdate)).toISOString().slice(0, 10);
  
  const sql = 'INSERT INTO FamilyInfo (occupant_id, firstname,lastname, gender, birthdate) VALUES (?, ?, ?, ?,?)';

  con.query(sql, [occupant_id, firstname,lastname, gender, convbirthdate], (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    insertFamilyInfoDetails(results.insertId, req.body.members, res)
    
    return res.status(201).json({ message: 'Family Head member added successfully' });
  });
}
const insertFamilyInfoDetails= (familyId, TableData)=>{
  TableData.forEach((member) => {
    const { firstname, lastname, gender, birthdate, relationship_head} = member;
    const convbirthdate = new Date(Date.parse(birthdate));

    const sql = 'INSERT INTO FamilyInfo_Details (fam_id, firstname, lastname, gender, birthdate, relationship_head) VALUES (?, ?, ?, ?, ?, ?)';

    con.query(sql, [familyId, firstname, lastname, gender, convbirthdate, relationship_head], (err, results) => {
      if (err) {
        console.error('error running query:', err);
      }
    });
  });
}


const getAllOccupantIds= (req, res) => {  
  const sql = 'SELECT occupant_id FROM Occupants';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    const occupantIds = results.map(result => result.occupant_id);
    return res.json(occupantIds);
  });
}

const getAllEvac= (req, res) => {
  const sql = 'SELECT LOCATION FROM EvacuationCenter';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    const location = results.map(result => result.LOCATION);
    return res.json(location);
  });
}

const getFamilyInfo= (req,res) => {
  const {location} = req.params;
  const sql = 'SELECT FamilyInfo.* FROM Occupants JOIN FamilyInfo ON Occupants.occupant_id = FamilyInfo.occupant_id WHERE Occupants.occupant_location = ? ;';
  const memsql = 'SELECT * FROM FamilyInfo WHERE fam_id =?'
  
  con.query(sql, [location],(err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}
const getFamilyInfoDetails= (req,res) => {
  const {famid} = req.params;
  const sql = 'SELECT * FROM FamilyInfo_Details WHERE fam_id =?'

  con.query(sql, [famid],(err, results) => {
    if (err) {
      console.error('error running query:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(results);
  });
}

module.exports = {insertFamilyInfo,insertFamilyInfoDetails, getAllOccupantIds, getAllEvac, getFamilyInfo, getFamilyInfoDetails};


/*
const memsql = 'SELECT * FROM FamilyInfo WHERE fam_id =?'
    const memresults= results.map(result => (
    con.query(memsql, [result.id], (err, memresults) => {
      if (err) {
        console.error('error running query:', err);
      }
      console.log(memresults);
    })
*/
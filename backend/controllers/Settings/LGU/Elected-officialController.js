const db = require('../../../config/dbconnections');

const InsertElect = (req, res) => {
    const { 
      periodFrom, 
      periodTo, 
      mayor, 
      viceMayor, 
      councilor1, 
      councilor2, 
      councilor3, 
      councilor4, 
      councilor5, 
      councilor6, 
      councilor7, 
      abcPresident, 
      skPresident 
    } = req.body;
  
    const insertUserQuery = `
      INSERT INTO elected_official 
      (period_from, period_to, mayor, vice_mayor, councilor_1, councilor_2, councilor_3, councilor_4, councilor_5, councilor_6, councilor_7, abc_president, sk_president) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(insertUserQuery, [periodFrom, periodTo, mayor, viceMayor, councilor1, councilor2, councilor3, councilor4, councilor5, councilor6, councilor7, abcPresident, skPresident], (error, result) => {
      if (error) throw error;
  
      res.status(200).json({ message: 'LGU account registered successfully', redirect: '/home' });
    });
  };
  
  module.exports = { InsertElect };
  
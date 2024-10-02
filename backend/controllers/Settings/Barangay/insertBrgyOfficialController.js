

const db = require('../../../config/dbconnections');

const InsertOfficial = (req, res) => {
    const { 
        periodFrom,
        periodTo,
        barangayChairman,
        barangaySecretary,
        barangayTreasurer,
        councilor1,
        councilor2,
        councilor3,
        councilor4,
        councilor5,
        councilor6,
        councilor7,
        skChairperson1,
        skChairperson2,
        skMember1,
        skMember2,
        skMember3,
        skMember4,
        skMember5,
        skMember6,
        skMember7,
    } = req.body;
  
    const insertUserQuery = `
      INSERT INTO brgy_official 
      (period_from, period_to, brgy_chair, brgy_sec, bryg_Treas, brgy_councilor1, brgy_councilor2, 
      brgy_councilor3, brgy_councilor4, brgy_councilor5, brgy_councilor6, brgy_councilor7, sk_chair1,	
      sk_chair2, sk_mem1, sk_mem2, sk_mem3, sk_mem4, sk_mem5, sk_mem6, sk_mem7) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
    db.query(insertUserQuery, [periodFrom, periodTo, barangayChairman, barangaySecretary, barangayTreasurer, councilor1, councilor2, councilor3, councilor4, councilor5, councilor6, councilor7, skChairperson1, skChairperson2, skMember1, skMember2, skMember3, skMember4, skMember5, skMember6, skMember7], (error, result) => {
      if (error) throw error;
  
      res.status(200).json({ message: 'LGU account registered successfully', redirect: '/home' });
    });
  };
  
  module.exports = { InsertOfficial };
  
const db = require('../../../config/dbconnections');

const GetDateLgu = (req, res) => {

  const query = 'SELECT period_from, period_to FROM elected_official'; // Include period_to
  db.query(query,(error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching Date of official' });
    }
    res.json(results);
  });
};

module.exports = { GetDateLgu };

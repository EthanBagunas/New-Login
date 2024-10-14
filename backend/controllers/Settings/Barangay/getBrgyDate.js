const db = require('../../../config/dbconnections');

const GetDateOfficial = (req, res) => {
    const { name } = req.params;
  const query = 'SELECT period_from, period_to FROM brgy_official where brgyName =?'; // Include period_to
  db.query(query, [name],(error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching Date of official' });
    }
    res.json(results);
  });
};

module.exports = { GetDateOfficial };

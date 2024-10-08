const db = require('../../../config/dbconnections');

const GetBrgyNames = (req, res) => {
  const query = 'SELECT brgyName FROM brgy_setup'; // Adjust query as needed
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching barangay names' });
    }
    res.json(results);
  });
};

module.exports = { GetBrgyNames };

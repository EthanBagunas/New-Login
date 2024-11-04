const db = require('../../../config/dbconnections');

const GetBrgyPurok = (req, res) => {
  const query = 'SELECT barangay FROM purok_setup'; // Adjust query as needed
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching barangay names' });
    }
    res.json(results);
  });
};

module.exports = { GetBrgyPurok };

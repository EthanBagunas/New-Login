const db = require('../../../config/dbconnections');

const GetPurok = (req, res) => {
  const { name } = req.params;

  // Adjust query to fetch purok based on the provided barangay
  const query = 'SELECT purok_name FROM purok_setup WHERE barangay = ?'; // Assuming you have a 'barangay' column in 'purok_setup'

  db.query(query, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching Purok names' });
    }
    res.json(results);
  });
};

module.exports = { GetPurok };

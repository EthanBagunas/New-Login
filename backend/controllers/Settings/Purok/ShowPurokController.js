const db = require('../../../config/dbconnections');

const ShowPurok = (req, res) => {
    const { brgy } = req.params; 
    const query = 'SELECT * FROM purok_setup WHERE barangay = ?';

    db.query(query, [brgy], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching Purok Info' });
        }

        if (results.length > 0) {
            res.json(results); // Send all matching results as an array
        } else {
            res.status(404).json({ message: 'No Purok Info found for this Barangay' });
        }
    });
};

module.exports = { ShowPurok };

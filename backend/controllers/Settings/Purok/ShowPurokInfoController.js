const db = require('../../../config/dbconnections');

const ShowPurokInfo = (req, res) => {
    const { purok } = req.params; // Ensure the route captures this parameter
    const query = 'SELECT * FROM purok_setup WHERE purok_name = ?';

    db.query(query, [purok], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching Purok Info' });
        }

        if (results.length > 0) {
            const PurokInfo = results[0];
            res.json(PurokInfo);
        } else {-
            res.status(404).json({ message: 'Information not found' }); // Fixed typo here
        }
    });
};

module.exports = { ShowPurokInfo };

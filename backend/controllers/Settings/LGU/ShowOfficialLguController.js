const db = require('../../../config/dbconnections');

const ShowElectedOfficial = (req, res) => {
    const { period_from } = req.params; // Ensure the route captures this parameter
    const query = 'SELECT * FROM elected_official WHERE period_from = ?';

    db.query(query, [period_from], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching barangay Official data' });
        }

        if (results.length > 0) {
            const ElectedOfficial = results[0];
            res.json(ElectedOfficial);
        } else {
            res.status(404).json({ message: 'Official data not found' }); // Fixed typo here
        }
    });
};

module.exports = { ShowElectedOfficial };

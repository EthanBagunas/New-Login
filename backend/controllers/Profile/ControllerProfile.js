var db = require('../../config/dbconnections');

const Profile = async (req, res) => {
    const userId = req.params.id;

    const sql = 'SELECT firstname, lastname, description, profile_pic, position FROM login WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `ID ${userId} not found` }); // Use userId here
        }

        const user = results[0];

        // Convert BLOB to base64 if profile_pic is a BLOB
        if (user.profile_pic) {
            const base64Image = user.profile_pic.toString('base64');
            user.profile_pic = `data:image/jpeg;base64,${base64Image}`;
        }

        res.json({
            firstName: user.firstname,
            lastName: user.lastname,
            description: user.description,
            profilePic: user.profile_pic,
            position: user.position
        });
    });
};

module.exports = { Profile };

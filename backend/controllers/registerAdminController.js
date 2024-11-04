const db = require('../config/dbconnections');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const InsertAdmin = (req, res) => {
    console.log('InsertAdmin called with body:', req.body);
  const { firstName, lastName, email, password } = req.body;
  



  const checkUsernameQuery = 'SELECT * FROM login WHERE username = ?';
  db.query(checkUsernameQuery, [email], (error, usernameResults) => {
    if (error) return res.status(500).json({ message: 'Database query error', error });

    if (usernameResults.length > 0) {
      // Username already exists, return an error
      return res.status(400).json({ message: 'Email already exists. Please choose a different email.' });
    }

    // Email and username are unique, proceed with hashing the password and registration
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

      const insertUserQuery = 'INSERT INTO login (firstname,lastname, username, role, password, password_changed) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(insertUserQuery, [firstName, lastName, email, 1994, hashedPassword, 0], (error, result) => {
        if (error) return res.status(500).json({ message: 'Database insert error', error });

        // Send success response
        res.status(200).json({ message: 'Admin registered successfully'});
      });
    });
  });
};

module.exports = { InsertAdmin };

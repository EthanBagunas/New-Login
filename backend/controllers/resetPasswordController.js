const bcrypt = require('bcrypt');
var db = require('../config/dbconnections');

const resetPassword = async (req, res) => {
    console.log('Request body:', req.body);

    const { email, password, mobile } = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Step 1: Retrieve the user's role based on email
        const roleQuery = 'SELECT role, password_changed FROM login WHERE username = ?';
        db.query(roleQuery, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            const userRole = results[0].role;
            const passwordChanged = results[0].password_changed;

            // Step 2: Validate mobile number if role is '1994'
            if (userRole === '1994') {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!mobile || !phoneRegex.test(mobile)) {
                    console.log('Invalid or missing mobile number for role 1994');
                    return res.status(400).json({ message: 'Valid mobile number is required for this role' });
                }
            }

            // Step 3: Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Step 4: Update the password (and mobile number if applicable)
            let updateQuery = 'UPDATE login SET password = ?, password_changed = ?';
            const queryParams = [hashedPassword, 1, email]; // Set password_changed to 1

            if (userRole === '1994') {
                updateQuery += ', number = ? WHERE username = ?';
                queryParams.splice(2, 0, mobile); // Insert mobile in the third position
            } else {
                updateQuery += ' WHERE username = ?';
            }

            db.query(updateQuery, queryParams, (err, result) => {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).json({ message: 'Error updating password' });
                }

                if (result.affectedRows === 0) {
                    console.log('User not found');
                    return res.status(404).json({ message: 'User not found' });
                }

                // Return success message for password reset
                return res.status(200).json({
                    message: userRole === '1994'
                        ? 'Password and mobile number reset successfully'
                        : 'Password reset successfully',
                });
            });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { resetPassword };

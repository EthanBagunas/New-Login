const bcrypt = require('bcrypt');
const db = require('../../config/dbconnections');

const ChangePasswordController = async (req, res) => {
    console.log('Request body:', req.body);
    const { currentPassword, newPassword, id } = req.body;

    // Check for required fields
    if (!id || !currentPassword || !newPassword) {
        console.log('Missing username, current password, or new password');
        return res.status(400).json({ message: 'Username, current password, and new password are required' });
    }

    try {
        // Find the user by username with a promise wrapper
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM login WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        console.log('Database Query Result:', result);

        // Check if user exists
        if (!result || result.length === 0) {
            console.warn('User not found for id:', id);
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];
        console.log('Found User:', user);

        // Compare the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log('Current Password Match:', isMatch);

        if (!isMatch) {
            console.warn('Incorrect current password for id:', id);
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await new Promise((resolve, reject) => {
            db.query('UPDATE login SET password = ? WHERE id = ?', [hashedNewPassword, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        console.log('Password updated successfully for id:', id);
        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'An error occurred while changing the password' });
    }
};
module.exports = { ChangePasswordController };

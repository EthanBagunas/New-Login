const db = require('../../config/dbconnections');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadProfilePicture = upload.single('profilePic');

// Update profile function
const UpdateProf = async (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming request body

    // Destructure the request body
    const { firstName, lastName, position, description, username } = req.body; 
    const profilePic = req.file; // Get the uploaded file as a buffer

    // Validate required fields
    if (!firstName || !lastName || !username) {
        return res.status(400).json({ message: 'First name, last name, and username are required' });
    }

    // SQL update statement to update user details
    const sql = `
        UPDATE login SET 
        firstname = ?, 
        lastname = ?, 
        position = ?, 
        description = ?, 
        profile_pic = ?
        WHERE username = ?
    `;

    // Handle the image buffer
    const profilePicBuffer = profilePic ? profilePic.buffer : null;

    // Execute the SQL query
    db.query(sql, [firstName, lastName, position, description, profilePicBuffer, username], (err, result) => {
        if (err) {
            console.error('Error updating user details:', err);
            return res.status(500).json({ message: 'Error updating user details' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Profile updated successfully' });
    });
};

// Export the controller and middleware
module.exports = { UpdateProf, uploadProfilePicture };

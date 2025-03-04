const db = require('../config/db');

const updateResidentDetails = async (req, res) => {
    const userID = req.params.id;
    const { name, surname, email, phone, address } = req.body;

    if (!name || !surname || !email || !phone || !address) {
        return res.status(400).json({ message: 'Some details are missing' });
    }

    try {
        const [results] = await db.query(
            'UPDATE users SET name = ?, surname = ?, email = ?, contact = ?, address = ? WHERE id = ?',
            [name, surname, email, phone, address, userID]
        );

        if (results.affectedRows === 0) {
            return res.status(200).json({ message: 'No changes were made.' });
        }

        // Get the updated user details from the database after the update
        const [updatedUser] = await db.query('SELECT * FROM users WHERE id = ?', [userID]);

        res.status(200).json({ message: 'Details were updated successfully', updatedUser: updatedUser[0] });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProfilePicture = async (req, res) => {
    const id = req.params.id;
    const profilePicture = req.file;

    if (!profilePicture) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const profilePic = `/uploads/profilePictures/${profilePicture.filename}`;

    try {
        await db.query('UPDATE users SET profilePic = ? WHERE id = ?', [profilePic, id]);
        res.status(200).json({ message: 'Profile picture updated successfully', profilePic });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUsersByRole = async (req, res) => {
    try {
        // Fetch all users with roleID 1, 2, or 4
        const [users] = await db.query('SELECT * FROM users WHERE roleID IN (1, 2, 4)');

        // Group users by role
        const groupedUsers = users.reduce((acc, user) => {
            if (user.roleID === 1) acc.admins.push(user);
            if (user.roleID === 2) acc.managers.push(user);
            if (user.roleID === 4) acc.supervisors.push(user);
            return acc;
        }, { admins: [], managers: [], supervisors: [] });

        // Send grouped users to the frontend
        res.status(200).json(groupedUsers);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// const deleteUsers = async (req, res) => {
//     const { email } = req.params;
  
//     try {
//       // Step 1: Fetch user ID based on email
//       const [user] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       const userId = user.id;
  
//       // Step 2: Delete or update data from related tables
//       // Delete feedback associated with the user
//       await db.query('DELETE FROM feedback WHERE residentID = ?', [userId]);
  
//       // Delete assignments related to the user (if they are a technician or manager)
//       await db.query('DELETE FROM assignment WHERE technicianID = ? OR managerID = ?', [userId, userId]);
  
//       // Update issues that were reported or supervised by the user
//       await db.query('UPDATE issue SET residentID = NULL, assignedSupervisorID = NULL WHERE residentID = ? OR assignedSupervisorID = ?', [userId, userId]);
  
//       // Delete notifications related to the user
//       await db.query('DELETE FROM notification WHERE userID = ?', [userId]);
  
//       // Step 3: Delete the user
//       await db.query('DELETE FROM users WHERE email = ?', [email]);
  
//       res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
//   };
  

const fetchDepartments = async (req, res) => {
    try {
        const [departments] = await db.query('SELECT * FROM department');  // Corrected 'department'
        return res.status(200).json(departments);
    } catch (error) {
        throw error;
    }
}

module.exports = {fetchDepartments, getUsersByRole, updateResidentDetails, updateProfilePicture };

const db = require('../config/db');

const assignSupervisor = async (req, res) => {
    const managerID = req.user.id;
    const { issueID, supervisorID } = req.body;
    console.log(issueID);
    try {
        // Update the issue with the assigned supervisor
        await db.query('UPDATE issue SET assignedSupervisorID = ? WHERE issueID = ?',
            [supervisorID, issueID]
        );

        // Insert a new record into the assignment table
        await db.query('INSERT INTO assignment (issueID, technicianID, managerID, dateAssigned) VALUES (?, ?, ?, NOW())',
            [issueID, supervisorID, managerID]
        );

        res.status(200).json({ message: 'Supervisor assigned successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to assign supervisor, try again later' });
    }
}

module.exports = { assignSupervisor };

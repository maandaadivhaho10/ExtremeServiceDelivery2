const db = require('../config/db');

const getAssignedSupervisors = async (req, res) => {
    const managerID = req.user.id;

    try {
        const [supervisors] = await db.query(
            'SELECT DISTINCT u.* FROM users u JOIN assignment a ON a.technicianID = u.id WHERE a.managerID = ?',
            [managerID]
        );

        if (supervisors.length === 0) {
            return res.status(404).json({ message: 'No supervisors found for this manager.' });
        }

        return res.status(200).json(supervisors);
    } catch (error) {
        console.error('Error fetching assigned supervisors:', error.message);
        return res.status(500).json({ message: 'Error fetching assigned supervisors' });
    }
};

const getIssuesAssignedToSupervisors = async (req, res) => {
    const supervisorID = req.params.id;

    try {
        const [issues] = await db.query(
            'SELECT * FROM issue WHERE assignedSupervisorID = ?',
            [supervisorID]
        );

        if (issues.length === 0) {
            return res.status(404).json({ message: 'No issues found for this supervisor.' });
        }

        return res.status(200).json(issues);
    } catch (error) {
        console.error('Error fetching issues assigned to supervisor:', error.message);
        return res.status(500).json({ message: 'Error fetching issues assigned to supervisor' });
    }
};

module.exports = { getAssignedSupervisors, getIssuesAssignedToSupervisors };
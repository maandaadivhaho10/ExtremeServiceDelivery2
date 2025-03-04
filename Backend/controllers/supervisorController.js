const db = require("../config/db");

const getSupervisors = async (req, res) => {
  const departmentID = req.user.departmentID;
  console.log(departmentID);
  const query = "SELECT * FROM users WHERE roleID = 4 AND departmentID = ?";

  try {
    const [results] = await db.query(query, [departmentID]);

    res.json(results);
  } catch (err) {
    console.error("Error fetching supervisors:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving supervisors." });
  }
};
const resolveIssue = async (req, res) => {
  const { issueID, dateResolved } = req.body;
  const supervisorID = req.user.empID;

  try {
    const issue = await Issue.findByPk(issueID);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    console.log(`Assigned Supervisor ID: ${issue.assignedSupervisorID}`);
    console.log(`Supervisor ID: ${supervisorID}`);

    if (issue.assignedSupervisorID !== supervisorID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to resolve this issue" });
    }

    await db.query(
      "UPDATE issue SET status = ?, dateResolved = ? WHERE issueID = ?",
      ["Resolved", dateResolved, issueID]
    );

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResolvedIssues = async (req, res) => {
  try {
    const issues = await Issue.getResolvedIssues();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignedIssues = async (req, res) => {
  const empID = req.user.id;

  try {
    // Fetching all assignments for the technician
    const [assignments] = await db.query(
      "SELECT * FROM assignment WHERE TechnicianID = ?",
      [empID]
    );
    
    if (!assignments.length) {
      return res.status(404).json({ message: "No issue has been assigned yet" });
    }

    // Fetching issues assigned to the supervisor/technician
    const [issues] = await db.query(
      'SELECT i.*, CONCAT(u.name, " ", u.surname) AS reporter FROM issue i LEFT JOIN users u ON i.residentID = u.id WHERE assignedSupervisorID = ?',
      [empID]
    );
    
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateIssueStatus = async (req, res) => {
  const issueID = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const query = 'UPDATE issue SET status = ? WHERE issueID = ?';
    const result = await db.query(query, [status, issueID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue status updated successfully' });
  } catch (error) {
    console.error('Error updating issue status:', error);
    res.status(500).json({ message: 'An error occurred while updating the issue status' });
  }
};


module.exports = {
  resolveIssue,
  getResolvedIssues,
  getAssignedIssues,
  getSupervisors,
  updateIssueStatus
};

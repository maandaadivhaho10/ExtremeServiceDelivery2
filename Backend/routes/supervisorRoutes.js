const router = require('express').Router();
const supervisorController = require('../controllers/supervisorController');
const auth = require('../middleware/auth');
const roles = require('../middleware/role');

router.get('/supervisors', auth, roles('MANAGER'), supervisorController.getSupervisors);
router.get('/assigned-issues', auth, roles('SUPERVISOR'), supervisorController.getAssignedIssues);
router.put('/update-issue-status/:id', auth, roles('SUPERVISOR'), supervisorController.updateIssueStatus);

module.exports = router;
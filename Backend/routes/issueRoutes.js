const router = require('express').Router();
const issueController = require('../controllers/issueController');
const auth = require('../middleware/auth');
const roles = require('../middleware/role');
const assignmentController = require('../controllers/assignmentController');
const managerController = require('../controllers/managerController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage});

router.post('/report-issue',auth, roles('RESIDENT'), upload.single('photo'), issueController.reportIssue);
router.get('/my-issues', auth, roles('RESIDENT'), issueController.getIssuesByResidentID);
router.get('/dept-issues', auth, roles('MANAGER'), issueController.getIssuesByDeptID);
router.post('/assign-supervisor', auth, roles('MANAGER'), assignmentController.assignSupervisor);
router.get('/getAssignedSupervisors', auth, roles('MANAGER'), managerController.getAssignedSupervisors);
router.get('/getIssuesAssignedToSupervisors/:id', auth, roles('MANAGER'), managerController.getIssuesAssignedToSupervisors);
router.get('/getAllIssues', auth, roles('RESIDENT'), issueController.getAllIssues);
router.get('/get-issue-reporter/:id', auth, roles('RESIDENT'), issueController.getIssueReporter);
router.get('/issue-counts', auth, roles('ADMIN'), issueController.getIssueCountPerMonth);
router.get('/admin/issue-report', auth, roles('ADMIN'), issueController.getIssuesForReport);
module.exports = router;
const router = require('express').Router();
const updateDetailsController = require('../controllers/updateDetailsController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/profilePictures',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.put('/update-details/:id', auth, role('RESIDENT'), updateDetailsController.updateResidentDetails);
router.put('/update-profile-picture/:id', auth, role('RESIDENT'), upload.single('photo'), updateDetailsController.updateProfilePicture);
router.get('/municipal-emps', auth, role('ADMIN'), updateDetailsController.getUsersByRole);
router.get('/departments', updateDetailsController.fetchDepartments);

module.exports = router;
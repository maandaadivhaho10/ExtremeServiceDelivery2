const router = require('express').Router();
const registerController = require('../controllers/registerController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');


// Allow only users with 'ADMIN' role to register a manager or supervisor
router.post('/resident', registerController.registerResident);
router.post('/admin', registerController.registerAdmin);
router.post('/municipal-employer', authMiddleware, roleMiddleware('ADMIN'), registerController.reqgisterMunicipalEmp);

module.exports = router;

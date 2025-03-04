const router = require('express').Router();
const { login, verifyOTP, resendOTP } = require('../controllers/loginController'); // Make sure resendOTP is imported
const rateLimit = require('express-rate-limit');
const {forgotPassword, resetPassword } = require('../controllers/registerController');
// Rate limiter to avoid abuse of OTP resend
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `window`
    message: {
        error: "Too many attempts, please try again later."
    }
});

// Route for login (email and password validation)
router.post('/login', login);

// Route for OTP verification
router.post('/verify-otp/:email', verifyOTP);

// Route for resending OTP with rate limiting
router.post('/resend-otp/:email', limiter, resendOTP); // Add rate limiter for this route
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

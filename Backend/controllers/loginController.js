const db = require('../config/db');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');

const emailer = require('../utils/emailer');

const generateOTP = async (secret) => {
    try {
        const token = speakeasy.totp({
            secret: secret,
            encoding: "base32",
            step: 90 // OTP will be valid for 90 seconds
        });

        const remaining = 90 - Math.floor(new Date().getTime() / 1000.0 % 90); // Adjust to 90 seconds

        return ({
            "token": token,
            "remaining": remaining,
            "secret": secret
        });
    } catch (error) {
        console.log(error.message);
    }
};




const validateOTP = (secret, token) => {
    const isValid = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: token,
        window: 1, // Allows for slight time drift
        step: 90 // OTP valid for 90 seconds
    });
    return isValid;
};


// 1. Login function for email and password validation
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Enter login credentials' });

    try {
        // Query to get the user by email
        const [rows] = await db.query(
            `SELECT u.*, r.roleName, d.dept_name 
            FROM users u 
            LEFT JOIN roles r ON u.roleID = r.roleID 
            LEFT JOIN department d ON u.departmentID = d.deptID
            WHERE u.email = ?`, 
            [email]
        );

        if (rows.length === 0) return res.status(404).json({ message: 'User does not exist' });

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

        // If email and password are correct, generate OTP
        const otp = await generateOTP(user.otp_secret);

        // Send OTP to user's email
        emailer.sendEmail(
            email,
            'Your OTP for Login',
            `Your OTP code is: ${otp.token}`,
            `<p>Hi ${user.name},</p><p>Your OTP code is: <strong>${otp.token}</strong>. This code is valid for 90 seconds.</p>`
        );

        // Query to mask the email
        const [maskedEmailResult] = await db.query(
            `SELECT 
                CONCAT(
                    LEFT(email, FLOOR(LENGTH(SUBSTRING_INDEX(email, '@', 1)) / 2)), 
                    REPEAT('*', LENGTH(SUBSTRING_INDEX(email, '@', 1)) - FLOOR(LENGTH(SUBSTRING_INDEX(email, '@', 1)) / 2)), 
                    '@',
                    SUBSTRING_INDEX(email, '@', -1)
                ) AS masked_email
            FROM users 
            WHERE email = ?`, 
            [email]
        );

        const maskedEmail = maskedEmailResult[0].masked_email;
console.log(maskedEmail)
        // Return response indicating that OTP has been sent
        res.status(200).json({ message: 'OTP sent to your email', emailSent: true, email: email, maskedEmail: maskedEmail });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// 2. OTP verification endpoint
const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    const email = req.params.email;
    
    if (!email || !otp) return res.status(400).json({ message: 'OTP and email are required' });

    try {
        // Get the user from the database
        const [rows] = await db.query(
            `SELECT u.*, r.roleName, d.dept_name 
            FROM users u 
            LEFT JOIN roles r ON u.roleID = r.roleID 
            LEFT JOIN department d ON u.departmentID = d.deptID
            WHERE u.email = ?`, 
            [email]
        );

        if (rows.length === 0) return res.status(404).json({ message: 'User does not exist' });

        const user = rows[0];

        // Validate the OTP
        const isValid = validateOTP(user.otp_secret, otp);

        if (!isValid) return res.status(401).json({ message: 'Invalid OTP' });

        // OTP is valid, proceed to generate JWT token
        const token = jwt.sign(
            {
                user: {
                    ...user // Include all user details in the JWT
                }
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Respond with token and user details
        console.log(user);
        res.status(200).json({ user, token, isLoggedIn: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const resendOTP = async (req, res) => {
    const email = req.params.email;

    if(!email) return res.status(400).json({message: 'Email is required'});

    try{
        const [rows] = await db.query(
            `SELECT u.*, r.roleName, d.dept_name 
            FROM users u 
            LEFT JOIN roles r ON u.roleID = r.roleID 
            LEFT JOIN department d ON u.departmentID = d.deptID
            WHERE u.email = ?`, 
            [email]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'User does not exist' });

        const user = rows[0];

        // Generate a new OTP
        const otp = await generateOTP(user.otp_secret);

        // Resend the OTP to the user's email
        emailer.sendEmail(
            email,
            'Resend OTP for Login',
            `Your new OTP code is: ${otp.token}`,
            `<p>Hi ${user.name},</p><p>Your new OTP code is: <strong>${otp.token}</strong>. This code is valid for 90 seconds.</p>`
        );

        res.status(200).json({ message: 'New OTP sent to your email', emailSent: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = { resendOTP, login, verifyOTP };

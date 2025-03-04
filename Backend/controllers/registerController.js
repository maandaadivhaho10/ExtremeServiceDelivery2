const bcrypt = require('bcryptjs');
const db = require('../config/db');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const emailer = require('../utils/emailer');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists in the database
        const [userResult] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userResult.length === 0) {
            return res.status(200).json({ message: 'If the email exists, you will receive a password reset link.' });
        }

        const user = userResult[0];

        // Create a reset token (JWT)
        const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send reset email
        const resetLink = `http://localhost:3000/resetPassword?token=${resetToken}`;
        emailer.sendEmail(
            email,
            'Password Reset',
            'Reset your password',
            `<p>Hi ${user.name},</p><p>Please reset your password by clicking <a href="${resetLink}">here</a>. This link will expire in 1 hour.</p>`
        );

        res.status(200).json({ message: 'If the email exists, you will receive a password reset link.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password: Handle New Password Submission
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { id, email } = decoded;

        // Check if user exists
        const [userResult] = await db.query('SELECT * FROM users WHERE id = ? AND email = ?', [id, email]);
        if (userResult.length === 0) {
            return res.status(400).json({ message: 'Invalid token or user does not exist' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password. Please try again.' });
    }
};

// Function to generate OTP secret
const generateSecret = () => {
    return new Promise((resolve, reject) => {
        const secret = speakeasy.generateSecret({ length: 20 });
        qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
            if (err) return reject(err);
            resolve({
                secret: secret.base32,  // This will be stored in the database
                otpauth_url: secret.otpauth_url,
                qr_code: dataUrl
            });
        });
    });
};

// Register Municipal Employee with OTP secret and email notification
exports.reqgisterMunicipalEmp = async (req, res) => {
    const { empID, name, surname, email, contact, deptID, roleCategory, password } = req.body;

    if (!empID || !name || !surname || !email || !contact || !deptID || !roleCategory || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [empExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (empExist.length > 0) {
            return res.status(409).json({ message: 'Employee already exists.' });
        }

        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleCategory]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID;

        // Generate the OTP secret
        const { secret } = await generateSecret();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (empID, name, surname, email, contact, departmentID, password, roleID, otp_secret) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [empID, name, surname, email, contact, deptID, hashedPassword, roleID, secret]
        );

        // Send email notification
        emailer.sendEmail(
            email,
            'Municipal Employee Registration Successful',
            'Your registration as a municipal employee was successful!',
            `<p>Hi ${name},</p><p>Your registration as a municipal employee has been successfully completed.</p>`
        );

        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Register Admin with OTP secret and email notification
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userExist.length > 0) {
            return res.status(409).json({ message: 'Admin already exists, Login instead' });
        }

        const roleName = 'ADMIN';
        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID;

        // Generate the OTP secret
        const { secret } = await generateSecret();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (name, email, password, roleID, otp_secret) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, roleID, secret]
        );

        // Send email notification
        emailer.sendEmail(
            email,
            'Admin Registration Successful',
            'Your registration as an Admin was successful!',
            `<p>Hi ${name},</p><p>Your registration as an Admin has been successfully completed.</p>`
        );

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Register Resident with OTP secret and email notification
exports.registerResident = async (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;

    if (!name || !surname || !address || !email || !contact || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userExist.length > 0) {
            return res.status(409).json({ message: 'Resident already exists, Login instead' });
        }

        const roleName = 'RESIDENT';
        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID;

        // Generate the OTP secret
        const { secret } = await generateSecret();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (name, surname, address, email, contact, password, roleID, otp_secret) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, surname, address, email, contact, hashedPassword, roleID, secret]
        );

        // Send email notification
        emailer.sendEmail(
            email,
            'Resident Registration Successful',
            'Your registration as a Resident was successful!',
            `<p>Hi ${name},</p><p>Your registration as a Resident has been successfully completed.</p>`
        );

        res.status(201).json({ message: 'Resident registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

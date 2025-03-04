const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(403).json({ message: 'Access Denied!' });
    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified.user; // Now req.user contains all the user's details
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = (requiredRole) => {
    return (req, res, next) => {
        
        if(req.user.roleName !== requiredRole) {
            return res.status(403).json({message: 'Access Denied'})
        }
        next();
    } 
}
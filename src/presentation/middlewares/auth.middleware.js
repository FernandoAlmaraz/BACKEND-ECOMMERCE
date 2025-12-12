const jwt = require('jsonwebtoken');

// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user;
        next();
    });
}

// Middleware para autorizar segn roles permitidos
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (!req.user.roles || !Array.isArray(req.user.roles)) {
            return res.status(403).json({ message: 'Access denied: No roles assigned' });
        }

        const hasRole = req.user.roles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({
                message: `Access denied: Requires one of the following roles: ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
}

module.exports = { authenticateToken, authorizeRoles };

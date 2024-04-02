// auth.js

const jwt1 = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   const {jwt} = (req.cookies)
   console.log(jwt);
    const token = req.headers.authorization.split('jwt ')[1]
    

    if (!token) {
        return res.status(403).json({ message: 'Token is required!' });
    }

    jwt1.verify(token, 'crud', (err, decoded) => {
        if (err) { 
            return res.status(401).json({ message: 'Invalid token!' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };

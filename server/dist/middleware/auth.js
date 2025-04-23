import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    console.log('authenticateToken middleware executed');
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token || 'no token');
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach the decoded user to the request object
        return next(); // Explicitly return after calling next()
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

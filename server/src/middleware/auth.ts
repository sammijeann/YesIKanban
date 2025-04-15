import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = user; // Attach the decoded user to the request object
    return next(); // Explicitly return after calling next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
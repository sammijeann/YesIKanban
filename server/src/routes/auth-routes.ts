import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  console.log('Sending login request to:', '/api/auth/login');
  try {
    // Check if the user exists
    console.log('Login attempt:', { username, password });
    const user = await User.findOne({ where: {username} });
    if (!user) {
      console.error('User not found:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      console.error('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token
    console.log('Token generated for user:', username);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;

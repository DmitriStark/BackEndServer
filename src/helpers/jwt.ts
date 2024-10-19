// src/helpers/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Use a strong secret key in production

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

// src/helpers/jwt.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWTSECRET; // Use a strong secret key in production

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' }); // Specify the algorithm
  console.log('Generated Token:', token); // Log the generated token
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }); // Verify using the same algorithm
};

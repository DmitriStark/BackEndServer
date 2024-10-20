import express from "express";
import { getUserByEmail, createUser } from "../db/models/users";
import { authentication, random } from "../helpers";
import { generateToken ,verifyToken} from "../helpers/jwt"; // Import the token utility
import { Request, Response } from 'express';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());
    console.log("@@",verifyToken(token))
    user.authentication.sessionToken = token;
    await user.save();
    // Send token as a cookie (optional)
    // res.cookie('BACKEND-AUTH', token, { httpOnly: true, path: '/' });
console.log(token)
    return res.status(200).json({ token, user }); // Include the user information
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });



    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("BACKEND-AUTH", { path: "/" }); // Clear the token cookie
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};


// src/controllers/auth.ts

export const checkAuth = (req: Request, res: Response) => {
    if (req.body.user) {
        // User is authenticated
        res.json({
            email: req.body.user.email,
            roles: req.body.user.roles,
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

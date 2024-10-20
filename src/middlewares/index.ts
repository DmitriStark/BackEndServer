import express from "express";
import { get } from "lodash";
import { getUserById } from "../db/models/users";
import dotenv from "dotenv";
import { verifyToken } from "../helpers/jwt";

dotenv.config();

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     try {
//       const authHeader = req.headers['authorization'];
//       const sessionToken = authHeader && authHeader.split(' ')[1];
//       console.log("@@",sessionToken)
//       if (!sessionToken) {
//         return res.sendStatus(403);
//       }

//       const existingUser = await getUserBySessionToken(sessionToken);

//       if (!existingUser) {
//         return res.sendStatus(403);
//       }

//       merge(req, { identity: existingUser });

//       return next();
//     } catch (error) {
//       console.log(error);
//       return res.sendStatus(400);
//     }
//   }

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1]; // Expected format: "Bearer <token>"
    if (!token) {
      return res.status(401).send("No token provided");
    }

    console.log("JWT Secret:", process.env.JWTSECRET); // Log secret for debugging
    console.log("Token:", token); // Log token for debugging

    const decoded: any = verifyToken(token);
    console.log("Decoded JWT:", decoded); // Log decoded JWT for debugging

    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.body.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error); // Log error details
    return res.status(403).send("Invalid or expired token");
  }
};

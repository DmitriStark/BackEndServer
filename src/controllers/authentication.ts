// import express from 'express';

// import { getUserByEmail, createUser } from '../db/models/users';
// import { authentication, random } from '../helpers';

// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.sendStatus(400);
//     }

//     const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

//     if (!user) {
//       return res.sendStatus(400);
//     }

//     const expectedHash = authentication(user.authentication.salt, password);
    
//     if (user.authentication.password != expectedHash) {
//       return res.sendStatus(403);
//     }

//     const salt = random();
//     user.authentication.sessionToken = authentication(salt, user._id.toString());

//     await user.save();
// // how we do it still dont know
//     res.cookie('BACKEND-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

//     return res.status(200).json(user).end();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };

// export const register = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password, username } = req.body;

//     if (!email || !password || !username) {
//       return res.sendStatus(400);
//     }

//     const existingUser = await getUserByEmail(email);
  
//     if (existingUser) {
//       return res.sendStatus(400);
//     }

//     const salt = random();
//     const user = await createUser({
//       email,
//       username,
//       authentication: {
//         salt,
//         password: authentication(salt, password),
//       },
//     });

//     return res.status(200).json(user).end();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// }

// src/controllers/auth.ts
import express from 'express';
import { getUserByEmail, createUser } from '../db/models/users';
import { authentication, random } from '../helpers';
import { generateToken } from '../helpers/jwt'; // Import the token utility

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);
    
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Send token as a cookie (optional)
    res.cookie('BACKEND-AUTH', token, { httpOnly: true, path: '/' });

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

    // Generate JWT token upon registration
    const token = generateToken(user._id.toString());

    res.cookie('BACKEND-AUTH', token, { httpOnly: true, path: '/' });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie('BACKEND-AUTH', { path: '/' }); // Clear the token cookie
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

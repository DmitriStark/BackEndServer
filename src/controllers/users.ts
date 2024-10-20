import express from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/models/users';

export const  getAllUsers = async (req:express.Request,res:express.Response)=>{
    try{

        const users =await getUsers();

        return res.status(200).json(users)

    }catch(error){
        console.log(error)
        return res.sendStatus(400)

    }
}

export const deleteUser =async (req:express.Request , res:express.Response) => {

    try{

        const {id} =req.params;

        const deleteUser = await deleteUserById(id)

        return res.json(deleteUser)

    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
    
}


export const updateUser =async (reg:express.Request,res:express.Response) => {

    try{
        const {id} = reg.params
        const {username} = reg.body

        if(!username){
            res.sendStatus(400)
        }

        const user = await getUserById(id)

        user.username =username;
        await user.save()

        return res.status(200).json(user).end()


    }catch(error){
        console.log(error)

        return res.sendStatus(400)
    }
    
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id; // Extract ID from request parameters
        console.log(userId)
        const user = await getUserById(userId); // Fetch user from the database

        if (!user) {
            return res.sendStatus(404); // User not found
        }

        return res.status(200).json(user); // Return the found user
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error for debugging
        return res.sendStatus(500); // Respond with a 500 Internal Server Error status
    }
};



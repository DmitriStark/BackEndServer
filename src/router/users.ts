import express from 'express';
import { isAuthenticated,isOwner } from '../middlewares';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users';

export default (router:express.Router)=>{
    router.get('/users',isAuthenticated,getAllUsers)
    router.delete('/users/:id',isAuthenticated,isOwner,deleteUser)
    router.patch("/users/:id",isAuthenticated,isOwner,updateUser)
    router.get('/users/:id', isAuthenticated, getUser); // Get user by ID

}

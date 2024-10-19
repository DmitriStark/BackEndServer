import express from 'express';
import users from './users';
import authentication from './authentication';
import productRoutes from './product';

const router = express.Router();

export default (): express.Router =>{
    authentication(router);
    users(router);
    productRoutes(router); 
   return router ; 
}
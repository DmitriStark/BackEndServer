import express from 'express';
import { getAllProducts, getProductById, addProduct, deleteProduct } from '../controllers/product';

export default (router: express.Router) => {
    router.get('/product/', getAllProducts); // Get all products
    router.get('/product/:id', getProductById); // Get a product by ID
    router.post('/product/', addProduct); // Add a new product
    router.delete('/product/:id', deleteProduct); // Delete a product by ID
};

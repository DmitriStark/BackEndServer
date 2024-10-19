import Product from '../db/models/products';
import { Request, Response } from 'express';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
};

// Add a new product
export const addProduct = async (req: Request, res: Response) => {
    try {
        const productToAdd = await Product.create(req.body);
        res.status(201).send(`${productToAdd.name} was added`);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while adding the product.' });
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productToDelete = await Product.findByIdAndDelete(req.params.id);
        if (!productToDelete) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.send(`${productToDelete.name} was deleted`);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
};

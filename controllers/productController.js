const Product = require('../models/product');
const mongoose = require('mongoose');

const createProduct = async (req, res) => {
    try {
        const {name, category, price, availability} = req.body;

        // Check if required fields are provided
        if (!name || !category || !price || availability === undefined) {
            return res.status(400).json({error: 'All fields are required'});
        }

        // Check if price is a valid number
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({error: 'Price must be a valid positive number'});
        }

        // Create a new product document
        const newProduct = new Product({
            name,
            category,
            price,
            availability,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({error: 'Could not create product'});
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Extract query parameters from the request
        const {page = 1, limit = 10, name, category, price} = req.query;

        // Build the query based on the provided parameters
        const query = {};
        if (name) {
            query.name = {$regex: new RegExp(name, 'i')}; // Case-insensitive name search
        }
        if (category) {
            query.category = category;
        }
        if (price) {
            query.price = {$lte: parseFloat(price)}; // Filter products with price less than or equal to the specified value
        }

        // Paginate the results
        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: parseInt(page),
            products,
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({error: 'Could not retrieve products'});
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Check if the product ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({error: 'Invalid product ID'});
        }

        // Retrieve a product by its ID from the database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({error: 'Could not retrieve product'});
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updates = req.body;

        // Check if the product ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({error: 'Invalid product ID'});
        }

        // Check if the request body is empty or does not contain valid update data
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({error: 'Invalid update data'});
        }

        // Find the product by ID and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updates,
            {
                new: true, // Return the updated document
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({error: 'Could not update product'});
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Check if the product ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({error: 'Invalid product ID'});
        }

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.status(204).send(); // No content (successful deletion)
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({error: 'Could not delete product'});
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};

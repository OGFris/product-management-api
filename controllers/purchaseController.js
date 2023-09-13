const Purchase = require('../models/purchase');
const Product = require('../models/product');
const mongoose = require('mongoose');

const createPurchase = async (req, res) => {
    try {
        const {productId} = req.body;

        // Check if the product ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({error: 'Invalid product ID'});
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        // Create a new purchase
        const purchase = new Purchase({
            productId
        });

        // Save the purchase to the database
        await purchase.save();

        res.status(201).json(purchase);
    } catch (error) {
        console.error('Error creating purchase:', error);
        res.status(500).json({error: 'Could not create purchase'});
    }
};

const getPurchaseStats = async (req, res) => {
    try {
        const totalPurchases = await Purchase.countDocuments();

        const topSellingProducts = await Purchase.aggregate([{
            $group: {
                _id: '$productId', totalPurchases: {$sum: 1},
            },
        }, {
            $sort: {totalPurchases: -1},
        }, {
            $limit: 5, // Limit to the top 5 products
        },]);

        const purchaseTrends = await Purchase.aggregate([{
            $group: {
                _id: {
                    $dateToString: {format: '%Y-%m-%d', date: '$purchaseDate'},
                }, totalPurchases: {$sum: 1},
            },
        },]);

        res.status(200).json({
            totalPurchases, topSellingProducts, purchaseTrends,
        });
    } catch (error) {
        console.error('Error fetching purchase stats:', error);
        res.status(500).json({error: 'Could not fetch purchase stats'});
    }
};

module.exports = {
    createPurchase,
    getPurchaseStats
};
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for CRUD operations
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
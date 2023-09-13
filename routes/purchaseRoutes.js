const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Define routes for purchase operations
router.post('/', purchaseController.createPurchase);
router.get('/stats', purchaseController.getPurchaseStats);

module.exports = router;
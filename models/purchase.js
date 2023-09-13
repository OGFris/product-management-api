const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
        type: String,
        default: "fake-id",
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

module.exports = mongoose.model('Purchase', purchaseSchema);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3001;

// Connect to the database using the environment variable
const mongoURI = process.env.MONGO_URI;
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Routes setup
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('hola!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./route');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect('mongodb+srv://otgonbaatar092406:secure123@cluster0.qlaku.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/products', productRoutes); // Mounts product routes


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

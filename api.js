const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/booksdb', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

// Books Model
const Product = mongoose.model('Books', {
    title: String,
    author: String,
    price: Number,
});

// Routes
app.get('/books', async (req, res) => {
try {
    const products = await Product.find();
    res.json(products);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.post('/books', async (req, res) => {
try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.get('/books/:id', async (req, res) => {
try {
    const product = await Product.findById(req.params.id);
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.put('/books/:id', async (req, res) => {
try {
    const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.delete('/books/:id', async (req, res) => {
try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});


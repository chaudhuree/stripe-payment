const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const stripe = require('stripe');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Sample products data
const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300'
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health tracking features',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300'
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    description: 'Compact wireless earbuds with premium sound quality',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=300'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with 20-hour battery life',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300'
  }
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, items } = req.body;
    
    // Create a Checkout Session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
    });

    res.status(200).json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
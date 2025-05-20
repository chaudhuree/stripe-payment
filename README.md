# Stripe Payment Integration

A full-stack e-commerce application with Stripe payment integration. This project demonstrates how to implement a product purchase system with Stripe checkout and manual card input.

## Features

- Product listing and details
- Shopping cart functionality
- Stripe payment integration with manual card input
- Responsive design

## Tech Stack

- **Frontend**: React with Vite, React Router, Axios
- **Backend**: Express.js
- **Payment Processing**: Stripe with Elements

## Project Structure

```
stripe-payment/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── PaymentForm.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Success.jsx
│   │   ├── context/       # React context for state management
│   │   │   └── CartContext.jsx
│   │   └── App.jsx        # Main application component
│   └── ...
├── server/                # Express backend
│   └── index.js           # Server entry point with API routes
├── .env                   # Environment variables
└── package.json           # Project configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe account with API keys

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with your Stripe API keys:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Running the Application

To run both the backend and frontend concurrently:

```
npm run dev
```

To run only the backend:

```
npm run server
```

To run only the frontend:

```
npm run client
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/create-payment-intent` - Create a payment intent for Stripe

## Testing Stripe Payments

Use these test card numbers for testing:

- Successful payment: 4242 4242 4242 4242
- Failed payment: 4000 0000 0000 0002

Use any future expiration date, any 3-digit CVC, and any postal code.

## License

ISC
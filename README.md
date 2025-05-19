# Stripe Payment Integration

A full-stack e-commerce application with Stripe payment integration. This project demonstrates how to implement a product purchase system with Stripe checkout.

## Features

- Product listing and details
- Shopping cart functionality
- Stripe payment integration
- Responsive design

## Tech Stack

- **Frontend**: React with Vite, React Router, Axios
- **Backend**: Express.js
- **Payment Processing**: Stripe

## Project Structure

```
stripe-payment/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── App.jsx        # Main application component
│   └── ...
├── server/                # Express backend
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
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

## License

ISC

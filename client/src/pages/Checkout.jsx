import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import PaymentForm from '../components/PaymentForm';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51Qp5LOPs8mVJ1TARXPGnFhtXqSGxyInN2qfw2Suc8Uc9UT4iDcYC90XHcCWjViiqsIidXKA1sSoHEE68SdBXvR8000d6SXeuJa');

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to products page if cart is empty
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleProceedToPayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      // Create a payment intent on the server
      const { data } = await axios.post('/api/create-payment-intent', {
        amount: getTotalPrice(),
      });

      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
      setIsProcessing(false);
    } catch (err) {
      console.error('Payment intent error:', err);
      setPaymentError('An error occurred while preparing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate('/success');
  };

  const handlePaymentError = (errorMessage) => {
    setPaymentError(errorMessage);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button 
                className="remove-item-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        
        {paymentError && (
          <div className="payment-error">
            {paymentError}
          </div>
        )}
        
        {!showPaymentForm ? (
          <button 
            className="checkout-btn"
            onClick={handleProceedToPayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        ) : (
          <div className="payment-section">
            <h3>Enter Payment Details</h3>
            <Elements stripe={stripePromise}>
              <PaymentForm 
                clientSecret={clientSecret}
                amount={getTotalPrice()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;

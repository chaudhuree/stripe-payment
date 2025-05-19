import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Success() {
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Ensure cart is cleared when reaching success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. Your order has been processed successfully.</p>
        <p>A confirmation email will be sent to you shortly.</p>
        <Link to="/" className="back-to-shop-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;

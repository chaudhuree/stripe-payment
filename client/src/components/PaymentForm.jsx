import { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

function PaymentForm({ sessionId, amount, onSuccess, onError }) {
  const stripe = useStripe();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!stripe) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        setError(error.message);
        onError(error.message);
        setProcessing(false);
      }
    } catch (err) {
      setError(err.message);
      onError(err.message);
      setProcessing(false);
    }
  };

  return (
    <div className="payment-form">
      {error && (
        <div className="payment-error">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={!stripe || processing}
        className="payment-button"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)} with Stripe`}
      </button>
      
      <div className="payment-info">
        <p>You will be redirected to Stripe's secure payment page.</p>
        <p>For testing, use card number: 4242 4242 4242 4242</p>
        <p>Any future expiration date, any 3-digit CVC, and any postal code.</p>
      </div>
    </div>
  );
}

export default PaymentForm;
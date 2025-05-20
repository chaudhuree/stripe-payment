import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function PaymentForm({ clientSecret, amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [stripe, elements]);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setProcessing(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name', // In a real app, you would collect this from the user
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        onError(payload.error.message);
      } else {
        if (payload.paymentIntent.status === 'succeeded') {
          onSuccess();
        }
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      onError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <div className="card-element-container">
          <CardElement
            id="card-element"
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={processing || disabled}
        className="payment-button"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default PaymentForm;
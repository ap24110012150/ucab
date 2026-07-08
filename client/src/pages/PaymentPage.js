import { useState } from 'react';
import api from '../services/api';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {Banknote, CreditCard, CheckCircle2 } from 'lucide-react';

function PaymentPage() {
  const { rideId: rideIdFromUrl } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [rideId, setRideId] = useState(rideIdFromUrl || '');
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [method, setMethod] = useState('card');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const payWithCard = async () => {
    setLoading(true);
    try {
      const orderRes = await api.post('/payments/create-order', { amount: +amount });
      const { orderId, amount: orderAmount, currency, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount: orderAmount,
        currency,
        name: 'Ucab',
        description: 'Ride payment',
        order_id: orderId,
        
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              rideId,
              amount: +amount
            });
            setReceipt(verifyRes.data);
          } catch (err) {
            alert('Payment verification failed. Please contact support.');
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false)
        },
        theme: { color: '#10b981' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Could not start payment. Please try again.');
      setLoading(false);
    }
  };

  const payWithSimulated = async () => {
    setLoading(true);
    const res = await api.post('/payments', { rideId, amount: +amount, method });
    setReceipt(res.data);
    setLoading(false);
  };

  const pay = () => {
    if (method === 'card') {
      payWithCard();
    } else {
      payWithSimulated();
    }
  };

 const paymentOptions = [
    { key: 'card', label: 'Card', icon: CreditCard },
    { key: 'cash', label: 'Cash / Offline', icon: Banknote }
  ];

  return (
    <div className="container mt-5" style={{ maxWidth: 460 }}>
      <h2 className="mb-4">Make Payment</h2>

      <div className="mb-3">
        <label className="mb-2 d-block fw-semibold" style={{ fontSize: '0.9rem', color: '#6b6d76' }}>
          RIDE ID
        </label>
        <input
          className="form-control"
          value={rideId}
          onChange={e => setRideId(e.target.value)}
          readOnly={!!rideIdFromUrl}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 d-block fw-semibold" style={{ fontSize: '0.9rem', color: '#6b6d76' }}>
          AMOUNT
        </label>
        <input
          className="form-control"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 d-block fw-semibold" style={{ fontSize: '0.9rem', color: '#6b6d76' }}>
          PAYMENT METHOD
        </label>
        <div className="row g-3">
          {paymentOptions.map(opt => {
            const Icon = opt.icon;
            const selected = method === opt.key;
            return (
              <div className="col-4" key={opt.key}>
                <div
                  onClick={() => setMethod(opt.key)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: selected ? '2px solid #ffcc00' : '1.5px solid #eceef1',
                    background: selected ? '#fff8dc' : '#ffffff',
                    borderRadius: 16,
                    padding: '20px 12px',
                    textAlign: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {selected && (
                    <CheckCircle2
                      size={20}
                      color="#14151a"
                      fill="#ffcc00"
                      style={{ position: 'absolute', top: 10, right: 10 }}
                    />
                  )}
                  <Icon size={26} color="#14151a" style={{ marginBottom: 10 }} />
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{opt.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={pay}
        disabled={loading}
        style={{ padding: '14px' }}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {receipt && (
        <div className="alert alert-success mt-4">
          <div className="mb-2 fw-semibold">Payment successful!</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            Transaction ID: {receipt.transactionId}
          </div>
          <button className="btn btn-warning w-100 mt-3" onClick={() => navigate('/nearby')}>
            Find Nearby Cabs
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
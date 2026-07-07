import { useState } from 'react';
import api from '../services/api';

function PaymentPage() {
  const [rideId, setRideId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('upi');
  const [receipt, setReceipt] = useState(null);

  const pay = async () => {
    const res = await api.post('/payments', { rideId, amount: +amount, method });
    setReceipt(res.data);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2>Make Payment</h2>
      <input className="form-control mb-2" placeholder="Ride ID" onChange={e => setRideId(e.target.value)} />
      <input className="form-control mb-2" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <select className="form-control mb-2" onChange={e => setMethod(e.target.value)}>
        <option value="upi">UPI</option>
        <option value="card">Card</option>
        <option value="wallet">Wallet</option>
        <option value="cash">Cash</option>
      </select>
      <button className="btn btn-primary" onClick={pay}>Pay Now</button>

      {receipt && (
        <div className="alert alert-success mt-3">
          Payment successful! Transaction ID: {receipt.transactionId}
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
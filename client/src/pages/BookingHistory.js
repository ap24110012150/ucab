import { useEffect, useState } from 'react';
import api from '../services/api';

function BookingHistory() {
  const [rides, setRides] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get('/rides/my-rides').then(res => setRides(res.data));
    api.get('/payments/history').then(res => setPayments(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Rides</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ride ID</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Tracking</th> 
          </tr>
        </thead>
        <tbody>
          {rides.map(ride => (
            <tr key={ride._id}>
              <td style={{ fontSize: '0.8em' }}>{ride._id}</td>
              <td>{ride.pickup?.address}</td>
              <td>{ride.dropoff?.address}</td>
              <td>₹{ride.fareEstimate}</td>
              <td>{ride.status}</td>
              <td><a href={`/track/${ride._id}`}>Track</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-5">My Payments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id}>
              <td style={{ fontSize: '0.8em' }}>{p.transactionId}</td>
              <td>₹{p.amount}</td>
              <td>{p.method}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingHistory;
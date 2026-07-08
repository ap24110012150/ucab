import { useEffect, useState } from 'react';
import api from '../services/api';

function BookingHistory() {
  const [rides, setRides] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get('/rides/my-rides').then(res => setRides(res.data));
    api.get('/payments/history').then(res => setPayments(res.data));
  }, []);

  const thStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#8b93a1',
    background: '#0f1319',
    borderBottom: '1px solid #1f242e'
  };

  const tdStyle = {
    padding: '12px 16px',
    color: '#e6e8eb',
    borderBottom: '1px solid #1f242e'
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 900 }}>
      <h2>My Rides</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Ride ID</th>
              <th style={thStyle}>Pickup</th>
              <th style={thStyle}>Dropoff</th>
              <th style={thStyle}>Fare</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => {
              const trackUrl = '/track/' + ride._id;
              return (
                <tr key={ride._id}>
                  <td style={tdStyle} title={ride._id}>
                    <span style={{ fontFamily: 'monospace', color: '#8b93a1' }}>
                      #{ride._id.slice(-6)}
                    </span>
                  </td>
                  <td style={tdStyle}>{ride.pickup && ride.pickup.address}</td>
                  <td style={tdStyle}>{ride.dropoff && ride.dropoff.address}</td>
                  <td style={tdStyle}>Rs {ride.fareEstimate}</td>
                  <td style={tdStyle}>{ride.status}</td>
                  <td style={tdStyle}>
                    <a href={trackUrl} style={{ color: '#10b981', fontWeight: 600 }}>Track</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="mt-5">My Payments</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Transaction ID</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td style={tdStyle} title={p.transactionId}>
                  <span style={{ fontFamily: 'monospace', color: '#8b93a1' }}>
                    #{p.transactionId.slice(-6)}
                  </span>
                </td>
                <td style={tdStyle}>Rs {p.amount}</td>
                <td style={tdStyle}>{p.method}</td>
                <td style={tdStyle}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;

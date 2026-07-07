import { useState } from 'react';
import api from '../services/api';

function BookRide() {
  const [pickup, setPickup] = useState({ address: '', lat: '', lng: '' });
  const [dropoff, setDropoff] = useState({ address: '', lat: '', lng: '' });
  const [fare, setFare] = useState(null);

  const estimate = async () => {
    const res = await api.post('/rides/estimate', {
      pickup: { lat: +pickup.lat, lng: +pickup.lng },
      dropoff: { lat: +dropoff.lat, lng: +dropoff.lng }
    });
    setFare(res.data);
  };

  const bookRide = async () => {
    await api.post('/rides', {
      pickup: { address: pickup.address, lat: +pickup.lat, lng: +pickup.lng },
      dropoff: { address: dropoff.address, lat: +dropoff.lat, lng: +dropoff.lng },
      fareEstimate: fare?.fareEstimate
    });
    alert('Ride booked!');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Book a Ride</h2>
      <h5>Pickup</h5>
      <input className="form-control mb-2" placeholder="Address" onChange={e => setPickup({ ...pickup, address: e.target.value })} />
      <input className="form-control mb-2" placeholder="Latitude" onChange={e => setPickup({ ...pickup, lat: e.target.value })} />
      <input className="form-control mb-2" placeholder="Longitude" onChange={e => setPickup({ ...pickup, lng: e.target.value })} />

      <h5>Dropoff</h5>
      <input className="form-control mb-2" placeholder="Address" onChange={e => setDropoff({ ...dropoff, address: e.target.value })} />
      <input className="form-control mb-2" placeholder="Latitude" onChange={e => setDropoff({ ...dropoff, lat: e.target.value })} />
      <input className="form-control mb-2" placeholder="Longitude" onChange={e => setDropoff({ ...dropoff, lng: e.target.value })} />

      <button className="btn btn-secondary me-2" onClick={estimate}>Estimate Fare</button>
      {fare && <p>Distance: {fare.distanceKm} km — Fare: ₹{fare.fareEstimate}</p>}
      <button className="btn btn-primary" onClick={bookRide} disabled={!fare}>Book Ride</button>
    </div>
  );
}

export default BookRide;
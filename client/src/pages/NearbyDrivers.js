import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function NearbyDrivers() {
  const navigate = useNavigate();
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lastPickupLocation');
    if (saved) {
      const location = JSON.parse(saved);
      setLat(location.lat);
      setLng(location.lng);
      setAddress(location.address);
    }
  }, []);

  const search = async () => {
    const res = await api.get('/rides/nearby', { params: { lat, lng, radiusKm: 10 } });
    setDrivers(res.data);
    setSearched(true);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Find Nearby Cabs</h2>

      {address ? (
        <div className="card mb-3 p-3">
          <div style={{ fontSize: '0.85rem', color: '#8b93a1', marginBottom: 4 }}>
            SEARCHING NEAR
          </div>
          <div style={{ fontWeight: 600 }}>{address}</div>
        </div>
      ) : (
        <p style={{ color: '#8b93a1' }}>
          No recent pickup location found. Please book a ride first, or enter coordinates manually below.
        </p>
      )}

      <input className="form-control mb-2" placeholder="Your Latitude" value={lat} onChange={e => setLat(e.target.value)} />
      <input className="form-control mb-2" placeholder="Your Longitude" value={lng} onChange={e => setLng(e.target.value)} />
      <button className="btn btn-primary mb-3" onClick={search}>Search</button>

      {searched && drivers.length === 0 && <p>No available drivers nearby.</p>}

      {drivers.map(d => (
        <div className="card mb-2 p-3" key={d._id}>
          <strong>{d.name}</strong>
          <div>{d.vehicle?.make} {d.vehicle?.model} — {d.vehicle?.plateNumber}</div>
          <div>Phone: {d.phone}</div>
        </div>
      ))}
      <button className="btn btn-secondary w-100 mt-4" onClick={() => navigate('/history')}>
        View Booking History
      </button>
    </div>
  );
}

export default NearbyDrivers;
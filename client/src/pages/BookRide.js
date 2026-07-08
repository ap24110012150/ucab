import { useState,useRef } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddressInput({ label, placeholder, value, onSelect }) {
  const [query, setQuery] = useState(value || '');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&q=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      setResults(data);
    }, 500);
  };

  const handlePick = (place) => {
    setQuery(place.display_name);
    setResults([]);
    onSelect({
      address: place.display_name,
      lat: place.lat,
      lng: place.lon
    });
  };

  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <h5 style={{ marginBottom: 8 }}>{label}</h5>
      <input
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {results.length > 0 && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          background: '#12161d',
          border: '1px solid #1f242e',
          borderRadius: 10,
          width: '100%',
          marginTop: 4
        }}>
          {results.map((place, i) => (
            <div
              key={i}
              onClick={() => handlePick(place)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                color: '#e6e8eb',
                borderBottom: i < results.length - 1 ? '1px solid #1f242e' : 'none'
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BookRide() {
  const [pickup, setPickup] = useState({ address: '', lat: '', lng: '' });
  const [dropoff, setDropoff] = useState({ address: '', lat: '', lng: '' });
  const [fare, setFare] = useState(null);
  const navigate = useNavigate();

  const estimate = async () => {
    const res = await api.post('/rides/estimate', {
      pickup: { lat: +pickup.lat, lng: +pickup.lng },
      dropoff: { lat: +dropoff.lat, lng: +dropoff.lng }
    });
    setFare(res.data);
  };

  const bookRide = async () => {
    const res = await api.post('/rides', {
      pickup: { address: pickup.address, lat: +pickup.lat, lng: +pickup.lng },
      dropoff: { address: dropoff.address, lat: +dropoff.lat, lng: +dropoff.lng },
      fareEstimate: fare?.fareEstimate
    });
    navigate(`/pay/${res.data._id}`, { state: { amount: fare?.fareEstimate } });
  };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 20px' }}>

      <div style={{
        background: 'linear-gradient(135deg, #0d1420, #0a0e14)',
        borderRadius: '16px',
        padding: '48px 40px 90px',
        position: 'relative'
      }}>
        <p style={{ color: '#10b981', fontWeight: 500, marginBottom: 8 }}>
          Travel securely with us
        </p>
        <h1 style={{ color: '#ffffff', fontSize: 32, margin: '0 0 12px', lineHeight: 1.3 }}>
          Book your ride<br />in seconds
        </h1>
        <p style={{ color: '#8b93a1', maxWidth: 380, margin: 0 }}>
          Reliable cabs, transparent fares, real-time tracking. Ucab gets you there.
        </p>
      </div>

      <div className="card" style={{ margin: '-56px 24px 0', position: 'relative' }}>

        <AddressInput
          label="Pickup"
          placeholder="Search pickup location"
          value={pickup.address}
          onSelect={(location) => {
            setPickup(location);
            localStorage.setItem('lastPickupLocation', JSON.stringify(location));
          }}
        />

        <AddressInput
          label="Dropoff"
          placeholder="Search drop location"
          value={dropoff.address}
          onSelect={setDropoff}
        />

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={estimate}>
            Estimate Fare
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={bookRide}
            disabled={!fare}
          >
            Book & Pay
          </button>
        </div>

        {fare && (
          <p style={{ marginTop: 16, textAlign: 'center' }}>
            Distance: {fare.distanceKm} km — Fare: ₹{fare.fareEstimate}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookRide;
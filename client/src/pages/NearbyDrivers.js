import { useState } from 'react';
import api from '../services/api';

function NearbyDrivers() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    const res = await api.get('/rides/nearby', { params: { lat, lng, radiusKm: 10 } });
    setDrivers(res.data);
    setSearched(true);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Find Nearby Cabs</h2>
      <input className="form-control mb-2" placeholder="Your Latitude" onChange={e => setLat(e.target.value)} />
      <input className="form-control mb-2" placeholder="Your Longitude" onChange={e => setLng(e.target.value)} />
      <button className="btn btn-primary mb-3" onClick={search}>Search</button>

      {searched && drivers.length === 0 && <p>No available drivers nearby.</p>}

      {drivers.map(d => (
        <div className="card mb-2 p-3" key={d._id}>
          <strong>{d.name}</strong>
          <div>{d.vehicle?.make} {d.vehicle?.model} — {d.vehicle?.plateNumber}</div>
          <div>Phone: {d.phone}</div>
        </div>
      ))}
    </div>
  );
}

export default NearbyDrivers;
import { useEffect, useState } from 'react';
import api from '../services/api';

function DriverDashboard() {
  const [rides, setRides] = useState([]);

  const loadRides = () => {
    api.get('/rides/available').then(res => setRides(res.data));
  };

  useEffect(() => {
    loadRides();
  }, []);

  const accept = async (id) => {
    await api.put(`/rides/${id}/accept`);
    loadRides();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/driver/login';
  };

  return (
    <div className="container mt-5">
      <h2>Driver Dashboard</h2>
      <button className="btn btn-outline-danger mb-4" onClick={logout}>Logout</button>

      <h4>Available Ride Requests</h4>
      {rides.length === 0 && <p>No pending ride requests right now.</p>}

      {rides.map(ride => (
        <div className="card mb-2 p-3" key={ride._id}>
          <div><strong>Pickup:</strong> {ride.pickup?.address}</div>
          <div><strong>Dropoff:</strong> {ride.dropoff?.address}</div>
          <div><strong>Fare:</strong> ₹{ride.fareEstimate}</div>
          <div><strong>Passenger:</strong> {ride.user?.name} ({ride.user?.phone})</div>
          <button className="btn btn-sm btn-success mt-2" onClick={() => accept(ride._id)}>
            Accept Ride
          </button>
        </div>
      ))}
    </div>
  );
}

export default DriverDashboard;
import { useEffect, useState } from 'react';
import api from '../services/api';

function AdminDashboard() {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = () => {
    api.get('/drivers').then(res => setDrivers(res.data));
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const verify = async (id) => {
    await api.put(`/drivers/${id}/verify`);
    loadDrivers();
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard — Drivers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>License</th>
            <th>Vehicle</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.licenseNumber}</td>
              <td>{d.vehicle?.make} {d.vehicle?.model} ({d.vehicle?.plateNumber})</td>
              <td>{d.isVerified ? '✅ Yes' : '❌ No'}</td>
              <td>
                {!d.isVerified && (
                  <button className="btn btn-sm btn-success" onClick={() => verify(d._id)}>
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
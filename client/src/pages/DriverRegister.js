import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function DriverRegister() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', licenseNumber: '',
    make: '', model: '', plateNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/driver/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        licenseNumber: form.licenseNumber,
        vehicle: { make: form.make, model: form.model, plateNumber: form.plateNumber }
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'driver');
      navigate('/driver/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2>Driver Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input className="form-control mb-2" name="phone" placeholder="Phone" onChange={handleChange} />
        <input className="form-control mb-2" name="licenseNumber" placeholder="License Number" onChange={handleChange} required />
        <input className="form-control mb-2" name="make" placeholder="Vehicle Make (e.g. Toyota)" onChange={handleChange} />
        <input className="form-control mb-2" name="model" placeholder="Vehicle Model (e.g. Etios)" onChange={handleChange} />
        <input className="form-control mb-2" name="plateNumber" placeholder="Plate Number" onChange={handleChange} />
        <button className="btn btn-primary w-100" type="submit">Register as Driver</button>
      </form>
    </div>
  );
}

export default DriverRegister;
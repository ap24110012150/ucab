import { Car, CreditCard, History, MapPin, LogOut } from 'lucide-react';

function UserDashboard() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Welcome to Ucab</h2>
        <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
      <p style={{ color: '#6b6d76' }} className="mb-4">You are logged in.</p>

      <div className="row g-3">
        <div className="col-md-3">
          <a href="/book" className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: '18px' }}>
            <Car size={20} /> Book a Ride
          </a>
        </div>
        <div className="col-md-3">
          <a href="/pay" className="btn btn-info w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: '18px' }}>
            <CreditCard size={20} /> Make Payment
          </a>
        </div>
        <div className="col-md-3">
          <a href="/history" className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: '18px' }}>
            <History size={20} /> Booking History
          </a>
        </div>
        <div className="col-md-3">
          <a href="/nearby" className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: '18px' }}>
            <MapPin size={20} /> Find Nearby Cabs
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
function UserDashboard() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5">
      <h2>Welcome to Ucab</h2>
      <p>You are logged in.</p>
      <a href="/book" className="btn btn-success me-2">Book a Ride</a><a href="/pay" className="btn btn-info me-2">Make Payment</a><a href="/history" className="btn btn-secondary me-2">Booking History</a><a href="/nearby" className="btn btn-warning me-2">Find Nearby Cabs</a>
      <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;

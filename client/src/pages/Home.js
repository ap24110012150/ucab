function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Ucab</h1>
      <p className="mb-5">Choose how you'd like to continue</p>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4>Passenger</h4>
            <a href="/login" className="btn btn-primary w-100 mb-2">Login</a>
            <a href="/register" className="btn btn-outline-primary w-100">Register</a>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4>Driver</h4>
            <a href="/driver/login" className="btn btn-success w-100 mb-2">Login</a>
            <a href="/driver/register" className="btn btn-outline-success w-100">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
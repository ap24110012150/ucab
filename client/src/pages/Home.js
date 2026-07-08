import { Car, User, MapPin, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 72, height: 72, borderRadius: 20, background: '#ffcc00', marginBottom: 20
        }}>
          <Car size={38} color="#14151a" strokeWidth={2.2} />
        </div>
      </div>

      <h1 className="mb-2">Welcome to Ucab</h1>
      <p className="mb-5" style={{ color: '#6b6d76', fontSize: '1.05rem' }}>
        Fast, reliable rides — whenever you need them.
      </p>

      <div className="row justify-content-center g-4">
        <div className="col-md-4 mb-4">
          <div className="card p-4 h-100">
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: '#fff8dc',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <User size={26} color="#14151a" />
            </div>
            <h4 className="mb-3">Passenger</h4>
            <a href="/login" className="btn btn-primary w-100 mb-2">Login</a>
            <a href="/register" className="btn btn-secondary w-100">Register</a>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card p-4 h-100">
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: '#14151a',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <Car size={26} color="#ffcc00" />
            </div>
            <h4 className="mb-3">Driver</h4>
            <a href="/driver/login" className="btn btn-success w-100 mb-2">Login</a>
            <a href="/driver/register" className="btn btn-secondary w-100">Register</a>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5 g-3">
        <div className="col-auto d-flex align-items-center" style={{ color: '#6b6d76', fontSize: '0.9rem' }}>
          <ShieldCheck size={18} style={{ marginRight: 6 }} /> Verified drivers
        </div>
        <div className="col-auto d-flex align-items-center" style={{ color: '#6b6d76', fontSize: '0.9rem' }}>
          <MapPin size={18} style={{ marginRight: 6 }} /> Real-time tracking
        </div>
      </div>
    </div>
  );
}

export default Home;
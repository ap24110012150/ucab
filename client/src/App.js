import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import BookRide from './pages/BookRide';
import PaymentPage from './pages/PaymentPage';
import BookingHistory from './pages/BookingHistory';
import RideTracking from './pages/RideTracking';
import DriverRegister from './pages/DriverRegister';
import DriverLogin from './pages/DriverLogin';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NearbyDrivers from './pages/NearbyDrivers';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<PrivateRoute><BookRide /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        
        <Route path="/nearby" element={<PrivateRoute><NearbyDrivers /></PrivateRoute>} />
        <Route path="/driver/register" element={<DriverRegister />} />
<Route path="/driver/login" element={<DriverLogin />} />
<Route path="/driver/dashboard" element={<PrivateRoute><DriverDashboard /></PrivateRoute>} />
        <Route path="/track/:rideId" element={<PrivateRoute><RideTracking /></PrivateRoute>} />
        <Route path="/pay" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

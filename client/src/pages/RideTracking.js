import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';


function RideTracking() {
  const { rideId } = useParams();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5001');
    socket.emit('joinRide', rideId);
    socket.on('locationUpdate', setCoords);
    return () => socket.disconnect();
  }, [rideId]);

  return (
    <div className="container mt-5">
      <h2>Tracking Ride</h2>
      <p style={{ fontSize: '0.8em', color: 'gray' }}>{rideId}</p>
      <p>{coords ? `Driver location: ${coords.lat}, ${coords.lng}` : 'Waiting for driver location...'}</p>
    </div>
  );
}

export default RideTracking;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rides', require('./routes/rideRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));

app.get('/', (req, res) => res.send('Ucab server is running!'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });

io.on('connection', (socket) => {
  socket.on('joinRide', (rideId) => socket.join(rideId));
  socket.on('driverLocation', ({ rideId, coords }) => {
    io.to(rideId).emit('locationUpdate', coords);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

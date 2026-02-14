const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  // Jab HTML se update aaye
  socket.on('updateBooking', (data) => {
    console.log('📦 Update received:', data);
    
    // Sabhi connected clients ko bhejo (including React Native app)
    io.emit('bookingUpdated', {
      bookingId: data.bookingId,
      status: data.status,
      message: data.message || 'Status updated',
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// API endpoint for testing
app.post('/api/update', (req, res) => {
  const { bookingId, status, message } = req.body;
  
  io.emit('bookingUpdated', {
    bookingId,
    status,
    message: message || 'Updated via API',
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
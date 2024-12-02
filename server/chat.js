const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../ecommerce/src/pages/chat/chat.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stop typing', (data) => {
    socket.broadcast.emit('stop typing', data);
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../ecommerce/src/pages/chat/chat.html'));});

  io.on('connection', (socket) => {
    io.emit('chat message', "New User Connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });
const PORT = 3002
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
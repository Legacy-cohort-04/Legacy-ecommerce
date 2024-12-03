const express = require("express");
const cors = require("cors");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const app = express();
const products =require("./routes/Products.js")

const cartProducts=require("./routes/Cart.js")
const brandsroute = require("./routes/Brands.js")
const AdminRoutes=require("./routes/Admin.js")
const userroute=require('./routes/User.js')
const postRouter=require('./routes/Posts.js')
const commentRouter=require('./routes/Comments.js')
const favouritesRoutes = require('./routes/Favourites.js');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());

require("./database/index.js")

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stop typing', (data) => {
    socket.broadcast.emit('stop typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use("/brands",brandsroute)
app.use("/cartP",cartProducts)
app.use('/products',products)
app.use("/user" , userroute)
app.use("/posts",postRouter);
app.use("/comments", commentRouter);
app.use("/favourites", favouritesRoutes);
app.use("/admin", AdminRoutes);



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
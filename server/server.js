require('dotenv').config();
const jwt = require('jwt-then');
const mongoose = require('mongoose');
const connectDB = require('./config/db.config');

// Connect with Mongo DB.
connectDB();

// Models
require('./models/user.model');
require('./models/chatroom.model');

const app = require('./app');

// Set port and listen. 
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT , () => {
    console.log("Server listening on port", PORT)
});

// Sockets
const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const User = mongoose.model('User');
const Chat = mongoose.model('Chatroom');


io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);        
        socket.userId  = payload.id;
        next();
    } catch (err) {
        console.log(err);
    }
});

io.on('connection', socket => {
    console.log("User connected.");

    socket.on('disconnect', () => {
        console.log("User disconnected.");
    });

    socket.on('joinRoom', ({ chatId }) => {
        socket.join(chatId);
        console.log('A user join chat.');
    });

    socket.on('leaveRoom', ({ chatId }) => {
        socket.leave(chatId);
        console.log('A user leave chat.');
    });

    socket.on('chatMessage', async ({ chatId, message }) => {
        const user = await User.findOne({ _id: socket.userId })
        const newMessage = await Chat.findByIdAndUpdate(chatId, { '$push':{ messages: { user: socket.userId, text: message } }});
        io.to(chatId).emit('newMessage', { 
            message,
            name: user.name,
            userId: socket.userId
        });
    });
});
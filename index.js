const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { START_BOT } = require("./bot.js")
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
 
let messages = [];
let onlineUsers = {};

app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('Новый пользователь подключился:', socket.id);
   
    socket.emit('message history', messages);
    socket.emit('online users', Object.values(onlineUsers));
    socket.on('user login', (username) => {
        onlineUsers[socket.id] = {
            id: socket.id,
            username: username,
            time: new Date().toLocaleTimeString()
        };
        
        console.log(`${username} вошел в чат`);
        io.emit('online users', Object.values(onlineUsers));
        io.emit('user joined', `${username} присоединился к чату`);
        
    });
    
    socket.on('chat message', (data) => {
        console.log('onlineUsers :', onlineUsers)   
        const message = {
            id: Date.now(),
            username: data.username,
            text: data.text,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            isBot: false,
        };
      
        messages.push(message);
        
        if (messages.length > 100) {
            messages = messages.slice(-100);
        }
        io.emit('chat message', message);
        START_BOT(data,io)
        console.log(`Сообщение от ${data.username}: ${data.text}`);
          
     
    });
    
    // Обработка отключения
    socket.on('disconnect', () => {
        const user = onlineUsers[socket.id];
        if (user) {
            delete onlineUsers[socket.id];
            
            // Рассылаем обновленный список пользователей
            io.emit('online users', Object.values(onlineUsers));
            
            // Уведомляем о выходе
            io.emit('user left', `${user.username} покинул чат`);
            console.log(`${user.username} отключился`);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Открой http://localhost:${PORT} в браузере`);
    
});
const express = require('express');
const app = express();
const socketio=require('socket.io');
var path = require ('path');
// app.use(express.static(path.join(__dirname + '../public')));
require('dotenv').config();
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({
    defaultLayout:false
}))
app.use(express.static(path.join(__dirname + '/public')))
console.log((__dirname + '/public'))
app.set('view engine','handlebars')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const server = app.listen(process.env.PORT || 5000)
const io = socketio(server)
app.get('/', function(req, res){
    res.render('home')
})
io.on('connection',(socket)=>{
    console.log('New User was come : ',socket.id)
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)
    })
    socket.on('typing',data=>{
        socket.broadcast.emit('typing',data)
    })
})

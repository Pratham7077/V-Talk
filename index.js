const express = require('express')
const app = express()
const http = require('http').createServer(app)
// import chalk from 'chalk';
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/mains'))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

// Socket 
const io = require('socket.io')(http)
let usern = {}
io.on('connection', (socket) => {
    socket.on('user-joined', (name)=>{
      usern[socket.id] = name;
      socket.broadcast.emit('user-connected', name)
      io.emit('user-list', usern)
    })
    socket.on('disconnect', ()=>{
      socket.broadcast.emit('user-disconnected', user = usern[socket.id])
      delete users[socket.id]
      io.emit('user-list', usern)
    })
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
setInterval(()=>{
  console.log("Coded By Pratham")
  console.log("Jai Shree Ram")
}, 10000)
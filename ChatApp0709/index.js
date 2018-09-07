const express = require('express')
const app = express()

//set the template engine
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res)=>{
	// res.send('Node Chat application trigger point initiated')
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)
console.log('Node started successfully')
const io = require('socket.io')(server)

//listen on every connection
io.on('connection', (socket)=>{
	console.log('New user connected')
	
	//default username
	socket.username = 'Anonymous'
	
	// listen on change_usename
	socket.on('change_username', (data)=>{
		socket.username = data.username
	})
	
	//listen on new message
	socket.on('new_message', (data)=>{
		//broadcast the new message
		io.sockets.emit('new_message', {message:data.message, username:socket.username});
	})
	
	//listen on typing
	socket.on('typing', (data)=>{
		socket.broadcast.emit('typing', {username:socket.username})
	})
})
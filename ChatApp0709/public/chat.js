$(function(){
	//make connection
	var socket = io.connect('http://localhost:3000')
	
	//buttons and inputs
	var message = $('#message')
	var username = $('#username')
	var send_message = $('#send_message')
	var send_username = $('#send_username')
	var chatroom = $('#chatroom')
	var feedback = $("#feedback")
	
	//Emit a message
	send_message.click(function(){
		socket.emit('new_message', {message: message.val()})
	})
	
	//Listen on new message
	socket.on('new_message', (data)=>{
		console.log(data)
		chatroom.append('<p class="message">'+data.username+":"+data.message+"</p>")
	})
	
	//Emit a username
	send_username.click(function(){
		console.log(username.val())
		socket.emit('change_username', {username: username.val()})
	})
	
	//Emit typing
	message.bind("keypress", ()=>{
		socket.emit('typing')
	})
	
	//Listening on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>"+data.username+"is typing a message..."+"</i></p>")
	})
});
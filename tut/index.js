const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) =>{
	console.log('a user is connected!');

	socket.on('chat message', (msg) =>{
		console.log('chat message: ',msg);
	})

	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});

})

http.listen(3000, () =>{
	console.log('http listening on *:3000')
})
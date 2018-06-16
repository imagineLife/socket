const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

let users = 0;

io.on('connection', (socket) =>{
	console.log(socket.id)
	users++;
	console.log(`There are ${users} users!`);

	io.emit('userCountUpdated', users);

	socket.on('userMessageSent', (msg) =>{
		io.emit('userMessageSent', msg);
	})

	socket.on('disconnect', function(){
		users--;
		io.emit('userCountUpdated', users);
	});

})

http.listen(3000, () =>{
	console.log('http listening on *:3000')
})
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

let users = 0;

io.on('connection', (socket) =>{
	let myID = socket.id;
	users++;
	console.log(`There are ${users} users!`);

	io.emit('userCountUpdated', users);

	socket.on('userMessageSent', (msg) =>{
		let msgObj = { msg, myID };
		io.emit('userMessageSent', msgObj);
	})

	socket.on('disconnect', function(){
		users--;
		io.emit('userCountUpdated', users);
	});

})

http.listen(3000, () =>{
	console.log('http listening on *:3000')
})
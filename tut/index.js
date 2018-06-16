const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

let users = 0;

io.on('connection', (socket) =>{
	users++;
	console.log(`There are ${users} users!`);

	socket.on('userMessageSent', (msg) =>{
		io.emit('userMessageSent', msg);
	})

	socket.on('disconnect', function(){
		users--;
		console.log(`There are ${users} users!`);
	});

})

http.listen(3000, () =>{
	console.log('http listening on *:3000')
})
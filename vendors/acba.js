const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

let i = 1;
setInterval(() => io.emit('vendor-message', `ACBA-${i++}`), 1000);

io.on('connection', (socket) => {
  console.log('client connected - id:' + socket.id);
  socket.on('disconnect', () => {
    console.log('client disconnected - id:' + socket.id);
  });
});

server.listen(3003);
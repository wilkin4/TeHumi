import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('Client connected.');

  const message = 'Message from server.';

  //io.emit('FromAPI', (Math.random() * 100).toFixed(0))

  socket.on('disconnect',  () => {
    console.log('Client disconnected.');
  });
});

router.get('/', (request, response) => {
  response.send('Connected to server.');
});

router.post('/', (request, response) => {
  io.emit('FromAPI', request.body.value);

  response.status(200).send();
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


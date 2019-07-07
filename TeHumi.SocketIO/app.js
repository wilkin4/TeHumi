import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import { API_TEMPERATURES_URL, API_HUMIDITIES_URL } from './configurations';
import fetch from 'node-fetch';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(router);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('Client connected.');

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

router.post('/', (request, response) => {
  io.emit('FromAPI', {
    temperature: request.body.temperature,
    humidity: request.body.humidity
  });

  // Temperatures post
  fetch(API_TEMPERATURES_URL, {
    method: 'POST',
    body: JSON.stringify({
      value: request.body.temperature
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(result => console.log(`Tehumi API temperatures: ${result}`))
    .catch(error => console.log(`TeHumi API temperatures: ${error}`));

  // Humidities post
  fetch(API_HUMIDITIES_URL, {
    method: 'POST',
    body: JSON.stringify({
      value: request.body.humidity
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(result => console.log(`Tehumi API humidities: ${result}`))
    .catch(error => console.log(`TeHumi API humidities: ${error}`));

  response.status(200).send({
    status: true
  });
});


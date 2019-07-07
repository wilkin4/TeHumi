import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import Repository from './repository';
import fetch from 'node-fetch';
import { API_TEMPERATURES_URL, API_HUMIDITIES_URL } from './configurations';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(router);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const repository = new Repository();

io.on('connection', socket => {
  console.log('Client connected.');

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });

  let values = {
    temperature: 0,
    humidity: 0
  }

  Promise.all([repository.getLastTemperature(), repository.getLastHumidity()]).then(result => {
    values.temperature = result[0];
    values.humidity = result[1];

    socket.emit('FromAPI', values);
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


import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import Repository from './repository';

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

  Promise.all([repository.getLastTemperature(), repository.getLastHumidity()]).then(result => {
    socket.emit('FromAPI', {
      temperature: result[0],
      humidity: result[1]
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

router.get('/', (request, response) => {
  response.send('<h3>Server socket is running.</h3>');
});

router.post('/', (request, response) => {
  const values = {
    temperature: request.body.temperature,
    humidity: request.body.humidity,
    isMotion: false
  }

  repository.saveTemperatureAndHumidity(values).then(() => {
    io.emit('FromAPI', values);

    response.status(200).send({
      status: true
    });
  });
});

router.post('/motions', (request, response) => {
    const values = {
        motion: request.body.motion,
        isMotion: true
    }

    io.emit('FromAPI', values)

    response.status(200).send({
        status: true
    });
})


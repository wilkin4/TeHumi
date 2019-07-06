import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './configurations';
import temperatureRoute from './routes/temperatureRoute';
import humidityRoute from './routes/humidityRoute';
import dbConnect from './repository/db/dbConnection';

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send("<h3>Server is running.</h3>");
});

app.use('/temperatures', temperatureRoute);
app.use('/humidities', humidityRoute);

dbConnect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});



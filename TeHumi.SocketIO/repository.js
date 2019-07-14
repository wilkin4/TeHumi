import fetch from 'node-fetch';
import { API_TEMPERATURES_URL, API_HUMIDITIES_URL } from './configurations';

class Repository {

  getLastTemperature() {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_TEMPERATURES_URL}/last`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data.result.value);
        })
        .catch(error => console.log(`TeHumi API temperatures: ${error}`));

    });

    return promise;
  }

  getLastHumidity() {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_HUMIDITIES_URL}/last`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data.result.value);
        })
        .catch(error => console.log(`TeHumi API humidities: ${error}`));
    });

    return promise;
  }

  saveTemperatureAndHumidity(values) {
    const temperaturePromise = new Promise((resolve, reject) => {
      fetch(API_TEMPERATURES_URL, {
        method: 'POST',
        body: JSON.stringify({
          value: values.temperature
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(result => {
          console.log(`Tehumi API temperatures: ${result}`);

          resolve();
        })
        .catch(error => console.log(`TeHumi API temperatures: ${error}`));
    });

    const humidityPromise = new Promise((resolve, reject) => {
      fetch(API_HUMIDITIES_URL, {
        method: 'POST',
        body: JSON.stringify({
          value: values.humidity
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(result => {
          console.log(`Tehumi API humidities: ${result}`);

          resolve();
        })
        .catch(error => console.log(`TeHumi API humidities: ${error}`));
    });

    return Promise.all([temperaturePromise, humidityPromise]);
  }

}

export default Repository;
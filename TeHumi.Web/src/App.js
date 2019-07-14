import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import './App.css';
import { runInThisContext } from 'vm';

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: {
        temperature: 0,
        humidity: 0
      },
      temperatureColor: '',
      humidityColor: '',
      endPoint: 'https://tehumi-socket-io.herokuapp.com'
    }
  }

  componentDidMount = () => {
    const endPoint = this.state.endPoint;
    const socket = SocketIOClient(endPoint);

    socket.on('FromAPI', data => {
      this.setTemperatureColor(data.temperature);
      this.setHumidityColor(data.humidity);

      console.log(data);

      this.setState({
        response: data
      });
    });
  }

  setTemperatureColor = (value) => {
    let color = '';

    if (value < 20) {
      color = '#ffffff';
    }
    else if (value < 40) {
      color = '#FFEC33'
    }
    else if (value < 80) {
      color = '#FF8A33'
    }
    else {
      color = '#FC0000';
    }

    this.setState({
      temperatureColor: color
    });
  }

  setHumidityColor = (value) => {
    let color = '';

    if (value < 20) {
      color = '#ffffff';
    }
    else if (value < 40) {
      color = '#D4F1FF';
    }
    else if (value < 80) {
      color = '#73D1FF';
    }
    else {
      color = '#08AEFF';
    }

    this.setState({
      humidityColor: color
    });
  }

  render = () => {
    return (
      <React.Fragment>
        <div id="main-container" >
          <div id="temperature-container" className='section-container' >
            <div className="section-title" >
              Temperatura
            </div>

            <div className="section-value" style={{ color: this.state.temperatureColor }} >
              {this.state.response.temperature} °C
            </div>
          </div>

          <div id="humidity-container" className='section-container' >
            <div className="section-title">
              Humedad
            </div>

            <div className="section-value" style={{ color: this.state.humidityColor }} >
              {this.state.response.humidity} %
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

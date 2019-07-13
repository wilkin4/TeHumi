import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: {
        temperature: 0,
        humidity: 0
      },
      endPoint: 'https://tehumi-socket-io.herokuapp.com'
    }
  }

  componentDidMount() {
    const endPoint = this.state.endPoint;
    const socket = SocketIOClient(endPoint);

    socket.on('FromAPI', data => {
      this.setState({
        response: data
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id="main-container" >
          <div id="temperature-container" className='section-container' >
            <div className="section-title" >
              Temperatura
            </div>

            <div className="section-value" >
              { this.state.response.temperature } °C
            </div>
          </div>

          <div id="humidity-container" className='section-container' >
            <div className="section-title">
              Humedad
            </div>

            <div className="section-value" >
              { this.state.response.humidity } %
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

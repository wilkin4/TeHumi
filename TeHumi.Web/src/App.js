import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import './App.css';
import { runInThisContext } from 'vm';

class App extends Component {
    constructor() {
        super();

        this.state = {
            temperature: 0,
            humidity: 0,
            motion: false,
            distance: 0,
            velocity: 0,
            temperatureColor: '',
            humidityColor: '',
            motionColor: '',
            endPoint: 'http://localhost:3000'
        }
    }

    componentDidMount = () => {
        const endPoint = this.state.endPoint;
        const socket = SocketIOClient(endPoint);

        socket.on('FromAPI', data => {
            if (data.isMotion) {
                this.setMotionColor(data.motion);

                this.setState({
                    motion: data.motion
                });
            }
            else if (data.isVelocity) {
                this.setState({
                    distance: data.distance,
                    velocity: data.velocity
                });
            }
            else {
                this.setTemperatureColor(data.temperature);
                this.setHumidityColor(data.humidity);

                this.setState({
                    temperature: data.temperature,
                    humidity: data.humidity
                });
            }
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

    setMotionColor = (value) => {
        let color = '';

        if (value) {
            color = '#1ac937'
        }
        else {
            color = '#ffffff'
        }

        this.setState({
            motionColor: color
        });
    }

    render = () => {
        return (
            <React.Fragment>
                <div id="main-container" >
                    <div id="temperature-container" className="section-container" >
                        <div className="section-title" >
                            Temperatura
                        </div>

                        <div className="section-value" style={{ color: this.state.temperatureColor }} >
                            {this.state.temperature.toFixed(2)} °C
                    </div>
                    </div>

                    <div id="humidity-container" className="section-container" >
                        <div className="section-title">
                            Humedad
                        </div>

                        <div className="section-value" style={{ color: this.state.humidityColor }} >
                            {this.state.humidity.toFixed(2)} %
                        </div>
                    </div>

                    <div id="motion-container" className="section-container" >
                        <div className="section-title">
                            Movimiento
                        </div>

                        <div className="section-value" style={{ color: this.state.motionColor }} >
                            {this.state.motion ? 'Sí' : 'No'}
                        </div>
                    </div>

                    <div id="distance-container" className="section-container" >
                        <div className="section-title">
                            Distancia
                        </div>

                        <div className="section-value" style={{ color: this.state.motionColor }} >
                            {this.state.distance.toFixed(2)} cm
                        </div>
                    </div>

                    <div id="velocity-container" className="section-container" >
                        <div className="section-title">
                            Velocidad
                        </div>

                        <div className="section-value" style={{ color: this.state.motionColor }} >
                            {this.state.velocity.toFixed(2)} cm/s
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;

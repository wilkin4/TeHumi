import React, { Fragment, Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import socketIOClient from 'socket.io-client';

class App extends Component {
    constructor() {
        super();

        this.state = {
            temperature: 0,
            humidity: 0,
            motion: false,
            distance: 0,
            velocity: 0,
            temperatureColor: '#ffffff',
            humidityColor: '#ffffff',
            motionColor: '#ffffff',
            endPoint: 'http://localhost:3000/'
        }

        console.disableYellowBox = true;
    }

    componentDidMount = () => {
        const endPoint = this.state.endPoint;
        const socket = socketIOClient(endPoint);

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
            <Fragment>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{
                        backgroundColor: '#151B1E',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View
                            style={{ ...styles.titleContainer }}
                        >
                            <Text
                                style={styles.titleText}
                            >
                                Temperatura
                            </Text>
                        </View>

                        <View
                            style={{ ...styles.valueContainer }}
                        >
                            <Text
                                style={{ ...styles.valueText, color: this.state.temperatureColor }}
                            >
                                {this.state.temperature.toFixed(2)}°C
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: '#242F34',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View
                            style={styles.titleContainer}
                        >
                            <Text
                                style={styles.titleText}
                            >
                                Humedad
                            </Text>
                        </View>

                        <View style={styles.valueContainer}>
                            <Text
                                style={{ ...styles.valueText, color: this.state.humidityColor }}
                            >
                                {this.state.humidity.toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignContent: 'center'
                    }}
                >
                    <View style={{
                        backgroundColor: '#242F34',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View
                            style={styles.titleContainer}
                        >
                            <Text
                                style={styles.titleText}
                            >
                                Movimiento
                            </Text>
                        </View>

                        <View style={styles.valueContainer}>
                            <Text
                                style={{ ...styles.valueText, color: this.state.motionColor }}
                            >
                                {this.state.motion ? 'Sí' : 'No'}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#151B1E',
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={styles.titleContainer}
                        >
                            <Text
                                style={styles.titleText}
                            >
                                Distancia
                            </Text>
                        </View>

                        <View style={styles.valueContainer}>
                            <Text
                                style={{ ...styles.valueText, color: this.state.motionColor }}
                            >
                                {this.state.distance.toFixed(2)} cm
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: '#405059',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <View
                        style={styles.titleContainer}
                    >
                        <Text
                            style={styles.titleText}
                        >
                            Velocidad
                            </Text>
                    </View>

                    <View style={styles.valueContainer}>
                        <Text
                            style={{ ...styles.valueText, color: this.state.motionColor }}
                        >
                            {this.state.velocity.toFixed(2)} cm/s
                            </Text>
                    </View>
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    valueContainer: {
        justifyContent: 'center'
    },
    valueText: {
        fontSize: 35,
        textAlign: 'center'
    }
});

export default App;

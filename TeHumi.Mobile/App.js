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
      response: {
        temperature: 0,
        humidity: 0
      },
      temperatureColor: '#ffffff',
      humidityColor: '#ffffff',
      endPoint: 'https://tehumi-socket-io.herokuapp.com',
    }

    console.disableYellowBox = true;
  }

  componentDidMount = () => {
    const endPoint = this.state.endPoint;
    const socket = socketIOClient(endPoint);

    socket.on('FromAPI', data => {
      this.setTemperatureColor(data.temperature);
      this.setHumidityColor(data.humidity);

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
      <Fragment>
        <View
          style={{ 
            flex: 1, 
            backgroundColor: '#242F34' 
          }}
        >
          {/* <View
            style={{
              flex: 2,
              backgroundColor: '#37474F',
              justifyContent: 'center'
            }}
          >
            <Text
              style={styles.titleText}
            >
              TeHumi
            </Text>
          </View> */}

          <View
            style={{...styles.titleContainer, backgroundColor: '#151B1E',}}
          >
            <Text
              style={styles.titleText}
            >
              Temperatura
          </Text>
          </View>

          <View
            style={{...styles.valueContainer, backgroundColor: '#151B1E',}}
          >
            <Text
              style={{...styles.valueText, color: this.state.temperatureColor}}
            >
              { this.state.response.temperature.toFixed(2) }°C
            </Text>
          </View>

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
              style={{...styles.valueText, color: this.state.humidityColor}}
            >
              { this.state.response.temperature.toFixed(2) }%
            </Text>
          </View>

          {/* <View
            style={{ flex: 1 }}
          >
            <Text
              style={styles.titleText}
            >
              
            </Text>
          </View> */}
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    color: '#ffffff'
  },
  valueContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  valueText: {
    fontSize: 80,
    textAlign: 'center'
  }
});

export default App;

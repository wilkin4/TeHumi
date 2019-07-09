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
      endPoint: 'https://tehumi-socket-io.herokuapp.com'
    }

    console.disableYellowBox = true;
  }

  componentDidMount() {
    const { endPoint } = this.state;
    const socket = socketIOClient(endPoint);
    socket.on('FromAPI', data => {
      this.setState({ response: data });
    });
  }

  render() {
    return (
      <Fragment>
        <View
          style={{ 
            flex: 1, 
            backgroundColor: '#607D8B' 
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
            style={{...styles.titleContainer, backgroundColor: '#37474F',}}
          >
            <Text
              style={styles.titleText}
            >
              Temperatura
          </Text>
          </View>

          <View
            style={{...styles.valueContainer, backgroundColor: '#37474F',}}
          >
            <Text
              style={styles.valueText}
            >
              {this.state.response.temperature}°C
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
              style={styles.valueText}
            >
              {this.state.response.humidity}%
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
    textAlign: 'center',
    color: '#ffffff'
  }
});

export default App;

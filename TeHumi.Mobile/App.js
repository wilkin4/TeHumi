/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endPoint: 'http://192.168.1.181:3000'
    }
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
        <View>
          <Text>Client</Text>
          <Text>{this.state.response}</Text>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

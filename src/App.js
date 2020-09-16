import React from 'reactn';
import Router from './Router';
import {YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

YellowBox.ignoreWarnings([
  'componentWillReceiveProps',
  'Encountered two',
  'Functions are not',
  'missing keys for',
  'VirtualizedLists should',
  'componentWillMount',
  'Require cycle:',
  'Failed prop type:',
  `Can't perform a React state`,
  'Failed child context type',
]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setGlobal({isSend: false});
  }

  render() {
    return <Router></Router>;
  }
}

export default App;

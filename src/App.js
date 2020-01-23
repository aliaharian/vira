import React from 'react';
import Router from './Router';
import {Categories, Filter} from './screens';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'componentWillReceiveProps',
  'Encountered two',
  'Functions are not',
  'missing keys for',
  'VirtualizedLists should',
  'componentWillMount',
]);
class App extends React.Component {
  render() {
    return <Router></Router>;
  }
}

export default App;

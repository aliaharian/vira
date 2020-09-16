import React, {Component} from 'reactn';
import {View, ActivityIndicator, StatusBar, SafeAreaView} from 'react-native';
import {colors} from '../globals';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors(this.global.theme).GRAY_ONE,
        }}>
        <StatusBar
          backgroundColor={colors(this.global.theme).GRAY_ONE}
          barStyle="dark-content"></StatusBar>
        <ActivityIndicator
          color={colors(this.global.theme).RED_ONE}
          size={'small'}></ActivityIndicator>
      </SafeAreaView>
    );
  }
}
export {Loading};

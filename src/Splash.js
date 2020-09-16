import React, {Component} from 'reactn';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, fonts, strings} from './globals';

class Splash extends Component {
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
        <View
          style={{
            height: responsiveHeight(10),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}></View>
        <View
          style={{
            flex: 0.5,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}></View>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          <StatusBar hidden={true}></StatusBar>
          <Image
            style={{
              width: responsiveHeight(20),
              height: responsiveHeight(20),
              resizeMode: 'center',
            }}
            source={require('./Image/35.png')}></Image>
          <Text
            style={[
              {
                marginTop: responsiveHeight(2),
                color: colors(this.global.theme).GRAY_SIX,
              },
              fonts(this.global.SizeAndWeight).Third,
            ]}>
            {strings(this.global.locale).BEHEENE}
          </Text>
          <ActivityIndicator
            size={'small'}
            color={colors(this.global.theme).RED_ONE}></ActivityIndicator>
        </View>
        <View
          style={{
            flex: 0.5,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}></View>
        <View
          style={{
            height: responsiveHeight(10),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          <Text
            style={[
              {
                marginTop: responsiveHeight(2),
                color: colors(this.global.theme).GRAY_SIX,
              },
              fonts(this.global.SizeAndWeight).FIRST,
            ]}>
            نسخه 1.0.0
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Splash;

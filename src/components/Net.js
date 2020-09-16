import React, {Component} from 'reactn';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {colors, fonts, strings} from '../globals';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class Net extends Component {
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
        <Text
          style={[
            {
              color: colors(this.global.theme).GRAY_EIGHT,
            },
            fonts(this.global.SizeAndWeight).SECOND,
          ]}>
          {strings(this.global.locale).ConnectionError}
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
          }}
          onPress={this.props.onPress}>
          <Image
            style={{
              width: responsiveWidth(4),
              height: responsiveWidth(4),
              tintColor: colors(this.global.theme).GRAY_SIX,
              resizeMode: 'center',
            }}
            source={require('../Image/38.png')}></Image>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export {Net};

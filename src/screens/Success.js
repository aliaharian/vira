import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors(this.global.theme).WHITE,
        }}>
        <StatusBar
          backgroundColor={colors(this.global.theme).WHITE}
          barStyle="dark-content"></StatusBar>
        {/*--------------------Text Success--------------------*/}
        <View
          style={{
            height: responsiveHeight(40),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: undefined,
              height: undefined,
              flex: 1,
              alignSelf: 'stretch',
              resizeMode: 'cover',
            }}
            source={require('../Image/31.png')}></Image>
        </View>
        {/*--------------------Text Success--------------------*/}
        <View
          style={{
            height: responsiveHeight(6),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
          }}>
          <Text
            style={[
              {
                marginRight: responsiveWidth(4),
                color: colors(this.global.theme).GRAY_EIGHT,
              },
              fonts(this.global.SizeAndWeight).SECOND,
            ]}>
            {strings(this.global.locale).Success}
          </Text>
        </View>
        {/*--------------------Text Your Order Will Be Delivered Soon--------------------*/}
        <View
          style={{
            height: responsiveHeight(6),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                marginRight: responsiveWidth(4),
                color: colors(this.global.theme).GRAY_EIGHT,
              },
              fonts(this.global.SizeAndWeight).SECOND,
            ]}>
            {strings(this.global.locale).YourOrderWillBeDeliveredSoon}
          </Text>
        </View>
        {/*--------------------Continue Shopping--------------------*/}
        <View
          style={[
            {
              height: responsiveHeight(12),
              width: Dimensions.get('window').width,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              position: 'absolute',
              bottom: 0,
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              marginHorizontal: responsiveWidth(4),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
            }}
            //onPress: Empty the cart and go to Landing
          >
            <Text
              style={[
                {
                  marginRight: responsiveWidth(1),
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).ContinueShopping}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export {Success};

import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class OrderDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {isArea: this.props.isArea};
  }

  render() {
    return (
      <View
        style={{
          height: responsiveHeight(18),
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: this.props.index == 0 ? responsiveHeight(1) : 0,
          marginBottom:
            this.props.index == this.props.endIndex ? responsiveHeight(1) : 0,
        }}>
        <View
          style={[
            {
              height: responsiveHeight(16),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(4),
              borderRadius: responsiveWidth(3),
              flexDirection: 'row',
              backgroundColor: colors(this.global.theme).WHITE,
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          {/*--------------------Others---------------------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(4),
            }}>
            {/*--------------------Product Name---------------------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.name.substring(0, 20) + '...'}
              </Text>
            </View>
            {/*--------------------Category---------------------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {this.props.category}
              </Text>
            </View>
            {/*----------Unites-----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {this.state.isArea == true ? (
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).FIRST,
                  ]}>
                  {' '}
                  {strings(this.global.locale).SquareMeters}
                </Text>
              ) : (
                () => {}
              )}
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                1
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.state.isArea == true
                  ? strings(this.global.locale).Area
                  : strings(this.global.locale).Quantity}
                :{' '}
              </Text>
            </View>
            {/*----------Total Amount-----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    marginRight: responsiveWidth(1),
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).Dollar}
              </Text>
              <Text
                style={[
                  {
                    marginRight: responsiveWidth(4),
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {this.props.price}
              </Text>
            </View>
          </View>
          {/*-------------------Image--------------------*/}
          <View
            style={{
              height: responsiveHeight(16),
              width: responsiveHeight(16),
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
                borderTopRightRadius: responsiveWidth(3),
                borderBottomRightRadius: responsiveWidth(3),
              }}
              source={{uri: this.props.uri}}></Image>
          </View>
        </View>
      </View>
    );
  }
}
export {OrderDetailsCard};

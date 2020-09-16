import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class ShippingAddressesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: this.props.isCheck};
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: responsiveHeight(1),
          marginTop: this.props.index == 0 ? responsiveHeight(1) : 0,
          marginBottom:
            this.props.index == this.props.endIndex ? responsiveHeight(1) : 0,
        }}>
        <View
          style={[
            {
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).WHITE,
              marginHorizontal: responsiveWidth(4),
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(2),
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          {/*---------Name And Edit----------*/}
          <View
            style={{
              //height: responsiveHeight(6),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                width: responsiveWidth(15),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
              onPress={() => {
                this.props.navigation.navigate('_AddingShippingAddress');
              }}
              disabled={true}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Edit}
              </Text>
            </TouchableOpacity>
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
                {this.props.addressName}
              </Text>
            </View>
          </View>
          {/*---------Address----------*/}
          <View
            style={{
              //minHeight: responsiveHeight(4),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: responsiveHeight(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  lineHeight: responsiveHeight(4),
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.address}
            </Text>
          </View>
          {/*---------City And Postal Code----------*/}
          <View
            style={{
              //height: responsiveHeight(4),
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: responsiveHeight(1),
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(1),
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.city}، {this.props.code}
            </Text>
          </View>
          {/*---------Check Box Use As The Shipping Address----------*/}
          <View
            style={{
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    marginRight: responsiveWidth(1),
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).UseAsTheShippingAddress}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: responsiveHeight(3),
                height: responsiveHeight(3),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 5,
                borderWidth:
                  this.state.isCheck == false ? responsiveHeight(0.2) : 0,
                borderColor: colors(this.global.theme).GRAY_SIX,
                backgroundColor:
                  this.state.isCheck == false
                    ? colors(this.global.theme).WHITE
                    : colors(this.global.theme).GRAY_EIGHT,
              }}
              onPress={this.props.onPress}>
              <Image
                style={{
                  margin: responsiveHeight(0.3),
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor: colors(this.global.theme).WHITE,
                  resizeMode: 'center',
                }}
                source={require('../Image/33.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export {ShippingAddressesCard};

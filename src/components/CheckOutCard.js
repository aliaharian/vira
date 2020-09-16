import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class CheckOutCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: responsiveHeight(1),
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
                this.props.navigation.navigate('_ShippingAddresses');
              }}
              disabled={true}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Change}
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
        </View>
      </View>
    );
  }
}
export {CheckOutCard};

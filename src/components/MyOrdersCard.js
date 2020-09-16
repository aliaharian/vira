import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class MyOrdersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          height: responsiveHeight(24),
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
              height: responsiveHeight(22),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).WHITE,
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(4),
              marginHorizontal: responsiveWidth(4),
              borderRadius: responsiveWidth(3),
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          {/*--------------------Order Number And Date--------------------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {/*----------Date----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.orderDate}
              </Text>
            </View>
            {/*----------Order Number----------*/}
            <View
              style={{
                flex: 1.5,
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
                {strings(this.global.locale).OrderNo}: {this.props.orderNumber}
              </Text>
            </View>
          </View>
          {/*--------------------Tracking Number--------------------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.orderTracking}
            </Text>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_SIX,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).PaymentStatus}:{' '}
            </Text>
          </View>
          {/*--------------------Quantity And Total Amount--------------------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {/*----------Total Amount----------*/}
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {this.props.orderAmount} {strings(this.global.locale).Dollar}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).TotalAmount}:{' '}
              </Text>
            </View>
            {/*----------Quantity----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {this.props.orderCount}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Quantity}:{' '}
              </Text>
            </View>
          </View>
          {/*--------------------Details And Status--------------------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {/*----------Status----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GREEN,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.status}
              </Text>
            </View>
            {/*----------Details----------*/}
            <View
              style={{
                width: responsiveWidth(25),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  borderWidth: responsiveHeight(0.2),
                }}
                onPress={this.props.onPress}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).FIRST,
                  ]}>
                  {strings(this.global.locale).Details}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export {MyOrdersCard};

import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class CheckOut extends Component {
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
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: colors(this.global.theme).GRAY_ONE,
        }}>
        <StatusBar
          backgroundColor={colors(this.global.theme).GRAY_ONE}
          barStyle="dark-content"></StatusBar>
        {/*--------------------Header--------------------*/}
        <View
          style={[
            {
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).GRAY_ONE,
              zIndex: 1,
              flexDirection: 'row',
            },
            elevations(this.global.shadow).TAB,
          ]}>
          {/*----------Search----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: responsiveWidth(4),
            }}></View>
          {/*----------Header Text----------*/}
          <View
            style={{
              flex: 3,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).Third,
              ]}>
              {strings(this.global.locale).CheckOut}
            </Text>
          </View>
          {/*----------Go Back----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: responsiveWidth(4),
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              style={{
                width: responsiveHeight(4),
                height: responsiveHeight(4),
                tintColor: colors(this.global.theme).GRAY_EIGHT,
                resizeMode: 'center',
              }}
              source={require('../Image/16.png')}></Image>
          </TouchableOpacity>
        </View>
        {/*--------------------Bottom Part--------------------*/}
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          <ScrollView
            style={{
              flex: 1,
              alignSelf: 'stretch',
              marginBottom: responsiveHeight(10),
            }}
            showsVerticalScrollIndicator={false}>
            {/*--------------------Text Shipping Address--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: colors(this.global.theme).GRAY_ONE,
                marginVertical: responsiveHeight(2),
              }}>
              <Text
                style={[
                  {
                    marginRight: responsiveWidth(4),
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).Third,
                ]}>
                {strings(this.global.locale).ShippingAddress}
              </Text>
            </View>
            {/*--------------------Shipping Address--------------------*/}
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
              {/*---------Name And Change----------*/}
              <View
                style={{
                  height: responsiveHeight(6),
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
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).RED_ONE,
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
                    نام آدرس
                  </Text>
                </View>
              </View>
              {/*---------Address----------*/}
              <View
                style={{
                  minHeight: responsiveHeight(4),
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
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
                  آدرس
                </Text>
              </View>
              {/*---------City And Postal Code----------*/}
              <View
                style={{
                  height: responsiveHeight(4),
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
                  کد پستی
                </Text>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).FIRST,
                  ]}>
                  شهر،
                </Text>
              </View>
            </View>
            {/*--------------------Order--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
              }}>
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
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  12000
                </Text>
              </View>
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
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).Order}
                </Text>
              </View>
            </View>
            {/*--------------------Delivery--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
                flexDirection: 'row',
                //marginTop: responsiveHeight(2),
              }}>
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
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  2000
                </Text>
              </View>
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
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).Delivery}
                </Text>
              </View>
            </View>
            {/*--------------------Summary--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
                flexDirection: 'row',
                //marginTop: responsiveHeight(2),
              }}>
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
                      marginRight: responsiveWidth(1),
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  {strings(this.global.locale).Dollar}
                </Text>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  14000
                </Text>
              </View>
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
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  {strings(this.global.locale).Summary}
                </Text>
              </View>
            </View>
            {/*--------------------Check Out--------------------*/}
            <TouchableOpacity
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                marginHorizontal: responsiveWidth(4),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors(this.global.theme).RED_ONE,
                borderRadius: 100,
                marginVertical: responsiveHeight(2),
              }}
              onPress={() => {
                this.props.navigation.navigate('_CheckOut');
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).SubmitOrder}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export {CheckOut};

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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {BagCard} from '../components';

class Bag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagProducts: ['1', '2', '3', '4'],
      promoCode: '',
      isSend: false,
    };
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
          style={{
            height: responsiveHeight(8),
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          {/*----------Search----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: responsiveWidth(4),
            }}>
            <Image
              style={{
                width: responsiveHeight(4),
                height: responsiveHeight(4),
                tintColor: colors(this.global.theme).GRAY_EIGHT,
                resizeMode: 'center',
              }}
              source={require('../Image/17.png')}></Image>
          </View>
          {/*----------Header Text----------*/}
          <View
            style={{
              flex: 3,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
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
            {/*--------------------Text Header Title--------------------*/}
            <View
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: colors(this.global.theme).GRAY_ONE,
                marginRight: responsiveWidth(4),
                marginVertical: responsiveHeight(2),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).Forth,
                ]}>
                {strings(this.global.locale).MyBag}
              </Text>
            </View>
            {/*--------------------Products--------------------*/}
            <FlatList
              style={{flex: 1, alignSelf: 'stretch'}}
              data={this.state.bagProducts}
              renderItem={() => {
                return <BagCard></BagCard>;
              }}
              keyExtractor={item => item}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}></FlatList>
            {/*--------------------Promo Code--------------------*/}
            <View
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(2),
                marginHorizontal: responsiveWidth(4),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: responsiveHeight(8),
                  width: responsiveHeight(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).WHITE,
                  borderBottomLeftRadius:
                    this.state.isSend == false ? 100 : responsiveWidth(3),
                  borderTopLeftRadius:
                    this.state.isSend == false ? 100 : responsiveWidth(3),
                }}>
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveHeight(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      this.state.isSend == false
                        ? colors(this.global.theme).GRAY_EIGHT
                        : colors(this.global.theme).WHITE,
                    borderRadius: 100,
                  }}
                  onPress={() => {
                    {
                      this.state.isSend == true
                        ? this.setState(
                            {promoCode: ''},
                            this.setState({isSend: !this.state.isSend}),
                          )
                        : this.setState({isSend: !this.state.isSend});
                    }
                  }}>
                  <Image
                    style={{
                      width: undefined,
                      height: undefined,
                      flex: 1,
                      alignSelf: 'stretch',
                      margin: responsiveHeight(2.5),
                      tintColor:
                        this.state.isSend == false
                          ? colors(this.global.theme).WHITE
                          : colors(this.global.theme).GRAY_SIX,
                      resizeMode: 'center',
                    }}
                    source={
                      this.state.isSend == false
                        ? require('../Image/29.png')
                        : require('../Image/30.png')
                    }></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).WHITE,
                  borderBottomRightRadius: responsiveWidth(3),
                  borderTopRightRadius: responsiveWidth(3),
                }}>
                <TextInput
                  ref={PromoCodeInput => {
                    this.PromoCodeInput = PromoCodeInput;
                  }}
                  style={[
                    {
                      height: responsiveHeight(8),
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      color: colors(this.global.theme).GRAY_EIGHT,
                      paddingRight: responsiveWidth(4),
                      textAlignVertical: 'center',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}
                  value={this.state.promoCode}
                  onChangeText={newPromoCode => {
                    this.setState({promoCode: newPromoCode});
                  }}
                  placeholder={strings(this.global.locale).EnterYourPromoCode}
                  placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                />
              </View>
            </View>
            {/*--------------------Total Amount--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveWidth(4),
                flexDirection: 'row',
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
                  120000
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
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).TotalAmount}
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
                {strings(this.global.locale).CheckOut}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export {Bag};

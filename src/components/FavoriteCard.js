import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating} from '../components';

class FavoriteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: this.props.isNew,
      isSale: this.props.isSale,
      isSoldOut: this.props.isSoldOut,
    };
  }

  render() {
    return (
      <View
        style={{
          height: responsiveHeight(20),
          alignSelf: 'stretch',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: responsiveHeight(1),
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
              opacity: this.state.isSoldOut == true ? 0.4 : 1,
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
            }}>
            {/*--------------------Others Top---------------------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/*----------Delete-----------*/}
              <TouchableOpacity
                style={{
                  height: responsiveHeight(8),
                  width: responsiveWidth(10),
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                onPress={this.props.onPressDelete}>
                <Image
                  style={{
                    width: responsiveHeight(2.5),
                    height: responsiveHeight(2.5),
                    tintColor: colors(this.global.theme).GRAY_FOUR,
                    resizeMode: 'center',
                    marginTop: responsiveHeight(2),
                    marginLeft: responsiveWidth(4),
                  }}
                  source={require('../Image/32.png')}></Image>
              </TouchableOpacity>
              {/*----------Name And Color----------*/}
              <View
                style={{
                  flex: 4,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_SIX,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    {this.props.nameL > 20
                      ? this.props.name.substring(0, 20) + '...'
                      : this.props.name}
                  </Text>
                </View>
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
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {this.props.category}
                  </Text>
                </View>
              </View>
            </View>
            {/*--------------------Others Bottom---------------------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/*----------Price----------*/}
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
              {/*----------Color And Size----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: responsiveHeight(6) + responsiveWidth(4),
                  paddingRight: responsiveWidth(16),
                }}>
                <Rating
                  disable={true}
                  isNumber={false}
                  numberOfComments={this.props.countRates}
                  rating={this.props.rates}
                />
              </View>
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
          {/*--------------------label: New--------------------*/}
          {this.state.isNew == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(10),
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_EIGHT,
                  borderRadius: 100,
                  position: 'absolute',
                  top: responsiveHeight(1),
                  right: responsiveHeight(1),
                },
              ]}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).New}
              </Text>
            </View>
          ) : (
            () => {}
          )}
          {/*--------------------label: Sale--------------------*/}
          {this.state.isSale == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(10),
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).RED_TWO,
                  borderRadius: 100,
                  position: 'absolute',
                  top: responsiveHeight(1),
                  right: responsiveHeight(1),
                },
              ]}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Discounted}
              </Text>
            </View>
          ) : (
            () => {}
          )}
        </View>
        {/*-------------------Add To Card--------------------*/}
        {this.state.isSoldOut == false ? (
          <TouchableOpacity
            style={[
              {
                width: responsiveHeight(6),
                height: responsiveHeight(6),
                backgroundColor: colors(this.global.theme).RED_ONE,
                borderRadius: 100,
                zIndex: 1,
                position: 'absolute',
                bottom: 0,
                left: responsiveWidth(4),
              },
              elevations(this.global.shadow).FAVORITES,
            ]}
            activeOpacity={0.9}
            onPress={this.props.onPressAddToBag}>
            <Image
              style={{
                width: undefined,
                height: undefined,
                margin: responsiveHeight(1.5),
                flex: 1,
                tintColor: colors(this.global.theme).WHITE,
                resizeMode: 'center',
              }}
              source={require('../Image/05.png')}></Image>
          </TouchableOpacity>
        ) : (
          () => {}
        )}
        {/*-------------------Retaining View--------------------*/}
        <View
          style={{
            height: responsiveHeight(3),
            alignSelf: 'stretch',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          {this.state.isSoldOut == true ? (
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color: colors(this.global.theme).GRAY_SIX,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).ThisItemIsCurrentlySoldOut}
            </Text>
          ) : (
            () => {}
          )}
        </View>
      </View>
    );
  }
}
export {FavoriteCard};

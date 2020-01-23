import React, {Component} from 'reactn';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating} from './Rating';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={() => {
          this.props.navigation.navigate('_SingleCard');
        }}>
        <View
          style={{
            height: responsiveHeight(50),
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight:
              this.props.witchIndex % 2 == 0 ? responsiveWidth(1) : 0,
            marginLeft:
              this.props.witchIndex % 2 !== 0 ? responsiveWidth(1) : 0,
            marginTop: responsiveHeight(2),
            marginBottom:
              this.props.witchIndex == this.props.endIndex - 1
                ? responsiveHeight(12)
                : 0,
            width: Dimensions.get('window').width / 2 - responsiveWidth(4),
          }}>
          {/*--------------------Image--------------------*/}
          <View
            style={{
              alignSelf: 'stretch',
              aspectRatio: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: responsiveWidth(1),
            }}>
            <Image
              style={{
                width: undefined,
                height: undefined,
                flex: 1,
                alignSelf: 'stretch',
                resizeMode: 'cover',
                borderRadius: responsiveWidth(3),
              }}
              source={require('../Image/11.jpg')}></Image>
          </View>
          {/*--------------------Favorites--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              zIndex: 1,
            }}
            activeOpacity={0.9}
            onPress={() => {
              this.setState({isFavorite: !this.state.isFavorite});
            }}>
            <View
              style={[
                {
                  width: responsiveHeight(6),
                  height: responsiveHeight(6),
                  alignSelf: 'flex-end',
                  backgroundColor: colors(this.global.theme).WHITE,
                  borderRadius: 100,
                  marginVertical: -responsiveHeight(3.5),
                  marginLeft: responsiveWidth(1),
                },
                elevations(this.global.shadow).FAVORITES,
              ]}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  margin: responsiveHeight(1.5),
                  flex: 1,
                  tintColor:
                    this.state.isFavorite == true
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.isFavorite == true
                    ? require('../Image/07.png')
                    : require('../Image/08.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(8),
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
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).New}
              </Text>
            </View>
          ) : (
            () => {}
          )}
          {/*--------------------label: Sale--------------------*/}
          {this.props.isSale == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(8),
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).RED_ONE,
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
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                -{this.props.salePercent}%
              </Text>
            </View>
          ) : (
            () => {}
          )}
          {/*--------------------Rating--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: responsiveWidth(1),
              paddingRight: responsiveWidth(15),
            }}>
            <Rating
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}></Rating>
          </View>
          {/*--------------------Name--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: responsiveWidth(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_SIX,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.name}
            </Text>
          </View>
          {/*--------------------Grouping--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: responsiveWidth(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {this.props.grouping}
            </Text>
          </View>
          {/*--------------------Price--------------------*/}

          {this.props.isSale == false ? (
            <View
              style={{
                height: responsiveHeight(3.5),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: responsiveWidth(1),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.price} تومان
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: responsiveHeight(3.5),
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: responsiveWidth(1),
                flexDirection: 'row-reverse',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.price} تومان
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_ONE,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.salePrice} تومان
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
export {Product};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={() => {
          this.props.navigation.navigate('_SingleCard');
        }}>
        <View
          style={{
            height: responsiveHeight(50),
            aspectRatio: 0.55,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: responsiveWidth(3),
            marginLeft:
              this.props.witchIndex == this.props.endIndex - 1
                ? responsiveWidth(3)
                : 0,
          }}>
          {/*--------------------Image--------------------*/}
          <View
            style={{
              alignSelf: 'stretch',
              aspectRatio: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: responsiveWidth(1),
            }}>
            <Image
              style={{
                width: undefined,
                height: undefined,
                flex: 1,
                alignSelf: 'stretch',
                resizeMode: 'cover',
                borderRadius: responsiveWidth(3),
              }}
              source={require('../Image/11.jpg')}></Image>
          </View>
          {/*--------------------Favorites--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              zIndex: 1,
            }}
            activeOpacity={0.9}
            onPress={() => {
              this.setState({isFavorite: !this.state.isFavorite});
            }}>
            <View
              style={[
                {
                  width: responsiveHeight(6),
                  height: responsiveHeight(6),
                  alignSelf: 'flex-end',
                  backgroundColor: colors(this.global.theme).WHITE,
                  borderRadius: 100,
                  marginVertical: -responsiveHeight(3.5),
                  marginLeft: responsiveWidth(1),
                },
                elevations(this.global.shadow).FAVORITES,
              ]}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  margin: responsiveHeight(1.5),
                  flex: 1,
                  tintColor:
                    this.state.isFavorite == true
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.isFavorite == true
                    ? require('../Image/07.png')
                    : require('../Image/08.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(8),
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
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).New}
              </Text>
            </View>
          ) : (
            () => {}
          )}
          {/*--------------------label: Sale--------------------*/}
          {this.props.isSale == true ? (
            <View
              style={[
                {
                  width: responsiveHeight(8),
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).RED_ONE,
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
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                -{this.props.salePercent}%
              </Text>
            </View>
          ) : (
            () => {}
          )}
          {/*--------------------Rating--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: responsiveWidth(1),
              paddingRight: responsiveWidth(15),
            }}>
            <Rating
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}></Rating>
          </View>
          {/*--------------------Name--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: responsiveWidth(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_SIX,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.name}
            </Text>
          </View>
          {/*--------------------Grouping--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: responsiveWidth(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {this.props.grouping}
            </Text>
          </View>
          {/*--------------------Price--------------------*/}

          {this.props.isSale == false ? (
            <View
              style={{
                height: responsiveHeight(3.5),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: responsiveWidth(1),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.price} تومان
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: responsiveHeight(3.5),
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: responsiveWidth(1),
                flexDirection: 'row-reverse',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.price} تومان
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_ONE,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {this.props.salePrice} تومان
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
export {ProductHome};

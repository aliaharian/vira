import React, {Component} from 'reactn';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating} from './Rating';
import {RatingSingleCard} from './Rating';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            //height: responsiveHeight(50),
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            height: responsiveHeight(44),
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
          {/*--------------------Rating--------------------*/}
          <View
            style={{
              height: responsiveHeight(3.5),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: responsiveWidth(1),
              paddingRight: responsiveWidth(10),
            }}>
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ProductViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            //height: responsiveHeight(50),
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight:
              this.props.witchIndex % 2 == 0 ? responsiveWidth(1) : 0,
            marginLeft:
              this.props.witchIndex % 2 !== 0 ? responsiveWidth(1) : 0,
            marginTop: responsiveHeight(2),
            marginBottom:
              this.props.witchIndex == this.props.endIndex - 1
                ? responsiveHeight(2)
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
export {ProductViewAll};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ProductCompareBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            //height: responsiveHeight(50),
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight:
              this.props.witchIndex % 2 == 0 ? responsiveWidth(1) : 0,
            marginLeft:
              this.props.witchIndex % 2 !== 0 ? responsiveWidth(1) : 0,
            marginTop: responsiveHeight(2),
            marginBottom:
              this.props.witchIndex == this.props.endIndex - 1
                ? responsiveHeight(2)
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
export {ProductCompareBy};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ProductRelated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            height: responsiveHeight(44),
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
export {ProductRelated};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ProductViewAllSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{flex: 1, alignSelf: 'stretch'}}
        activeOpacity={0.9}
        onPress={this.props.onPress}>
        <View
          style={{
            //height: responsiveHeight(50),
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight:
              this.props.witchIndex % 2 == 0 ? responsiveWidth(1) : 0,
            marginLeft:
              this.props.witchIndex % 2 !== 0 ? responsiveWidth(1) : 0,
            marginTop: responsiveHeight(2),
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
              source={{uri: this.props.firstImage}}
            />
          </View>
          {/*--------------------label: New--------------------*/}
          {this.props.isNew == true ? (
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
          {this.props.isSale == true ? (
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
            <RatingSingleCard
              disable={true}
              isNumber={true}
              numberOfComments={this.props.numberOfComments}
              rating={this.props.rating}
            />
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
              {this.props.nameL > 20
                ? this.props.name.substring(0, 20) + '...'
                : this.props.name}
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.price}
              </Text>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).RED_TWO,
                    marginRight: responsiveWidth(1),
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
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
export {ProductViewAllSale};

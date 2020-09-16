import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {colors, strings, elevations, fonts} from '../globals';

class BagCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter,
      isArea: this.props.isArea,
    };
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  MenuDeleteOrFavorites() {
    return (
      <Menu
        ref={this.setMenuRef}
        style={{
          width: responsiveWidth(45),
          height: responsiveHeight(16),
          borderRadius: responsiveWidth(3),
          backgroundColor: colors(this.global.theme).WHITE,
          marginLeft: responsiveWidth(10),
          marginTop: -responsiveHeight(2),
        }}>
        <MenuItem
          style={{
            width: responsiveWidth(45),
            height: responsiveHeight(8),
            backgroundColor: colors(this.global.theme).WHITE,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          textStyle={[
            fonts(this.global.locale).FIRST,
            {color: colors(this.global.theme).GRAY_EIGHT, textAlign: 'center'},
          ]}
          onPress={() => {
            this._menu.hide(this.props.onPressF);
          }}>
          {strings(this.global.locale).AddToFavorites}
        </MenuItem>
        <MenuDivider color={colors(this.global.theme).GRAY_SIX} />
        <MenuItem
          style={{
            width: responsiveWidth(45),
            height: responsiveHeight(8),
            backgroundColor: colors(this.global.theme).WHITE,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          textStyle={[
            fonts(this.global.locale).FIRST,
            {color: colors(this.global.theme).GRAY_EIGHT, textAlign: 'center'},
          ]}
          onPress={(this.hideMenu, this.props.onPressD)}>
          {strings(this.global.locale).DeleteFromThisList}
        </MenuItem>
      </Menu>
    );
  }

  render() {
    return (
      <View
        style={{
          height: responsiveHeight(18),
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              height: responsiveHeight(16),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(4),
              borderRadius: 15,
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
              {/*----------Three Point Menu-----------*/}
              <TouchableOpacity
                style={{
                  height: responsiveHeight(8),
                  width: responsiveWidth(10),
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                onPress={this.showMenu}>
                {this.MenuDeleteOrFavorites()}
                <Image
                  style={{
                    width: responsiveHeight(3),
                    height: responsiveHeight(3),
                    tintColor: colors(this.global.theme).GRAY_FOUR,
                    resizeMode: 'center',
                    marginTop: responsiveHeight(2),
                    marginLeft: responsiveWidth(4),
                  }}
                  source={require('../Image/26.png')}></Image>
              </TouchableOpacity>
              {/*----------Name And Color----------*/}
              <View
                style={{
                  flex: 2,
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
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {this.props.name.length > 20
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
                    marginRight: responsiveWidth(4),
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
                    {this.state.counter}
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
              </View>
            </View>
            {/*----------Price-----------*/}
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: responsiveHeight(1),
              }}>
              <Text
                style={[
                  {
                    marginLeft: responsiveWidth(4),
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
        {/*-------------------Retaining View--------------------*/}
        <View
          style={{
            height: responsiveHeight(1),
            alignSelf: 'stretch',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}></View>
      </View>
    );
  }
}
export {BagCard};

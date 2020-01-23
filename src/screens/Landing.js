import React, {Component} from 'reactn';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Home, Shop, Bag, Favorites} from '../screens';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichTab: 'Home',
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors(this.global.theme).GRAY_ONE,
        }}>
        <StatusBar
          backgroundColor={colors(this.global.theme).GRAY_ONE}
          barStyle="dark-content"></StatusBar>
        {/*--------------------Variable part--------------------*/}
        {this.state.whichTab == 'Home' ? (
          <Home navigation={this.props.navigation}></Home>
        ) : this.state.whichTab == 'Shop' ? (
          <Shop navigation={this.props.navigation}></Shop>
        ) : this.state.whichTab == 'Bag' ? (
          <Bag navigation={this.props.navigation}></Bag>
        ) : (
          <Favorites navigation={this.props.navigation}></Favorites>
        )}
        {/*--------------------Tab--------------------*/}
        <View
          style={[
            {
              height: responsiveHeight(10),
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).WHITE,
              borderTopLeftRadius: responsiveWidth(5),
              borderTopRightRadius: responsiveWidth(5),
              position: 'absolute',
              bottom: 0,
              padding: responsiveHeight(0.5),
              paddingVertical: responsiveHeight(1.5),
              flexDirection: 'row-reverse',
            },
            elevations(this.global.shadow).TAB,
          ]}>
          {/*----------Home----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({whichTab: 'Home'});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichTab == 'Home'
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichTab == 'Home'
                    ? require('../Image/01.png')
                    : require('../Image/02.png')
                }></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color:
                      this.state.whichTab == 'Home'
                        ? colors(this.global.theme).RED_ONE
                        : colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Home}
              </Text>
            </View>
          </TouchableOpacity>
          {/*----------Shop----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({whichTab: 'Shop'});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichTab == 'Shop'
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichTab == 'Shop'
                    ? require('../Image/03.png')
                    : require('../Image/04.png')
                }></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color:
                      this.state.whichTab == 'Shop'
                        ? colors(this.global.theme).RED_ONE
                        : colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Shop}
              </Text>
            </View>
          </TouchableOpacity>
          {/*----------Bag----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({whichTab: 'Bag'});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichTab == 'Bag'
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichTab == 'Bag'
                    ? require('../Image/05.png')
                    : require('../Image/06.png')
                }></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color:
                      this.state.whichTab == 'Bag'
                        ? colors(this.global.theme).RED_ONE
                        : colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Bag}
              </Text>
            </View>
          </TouchableOpacity>
          {/*----------Favorites----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({whichTab: 'Favorites'});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichTab == 'Favorites'
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichTab == 'Favorites'
                    ? require('../Image/07.png')
                    : require('../Image/08.png')
                }></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color:
                      this.state.whichTab == 'Favorites'
                        ? colors(this.global.theme).RED_ONE
                        : colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Favorites}
              </Text>
            </View>
          </TouchableOpacity>
          {/*----------Profile----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({whichTab: 'Profile'});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 2,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichTab == 'Profile'
                      ? colors(this.global.theme).RED_ONE
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichTab == 'Profile'
                    ? require('../Image/09.png')
                    : require('../Image/10.png')
                }></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color:
                      this.state.whichTab == 'Profile'
                        ? colors(this.global.theme).RED_ONE
                        : colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Profile}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export {Landing};

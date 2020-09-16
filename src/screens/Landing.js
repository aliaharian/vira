import React, {Component} from 'reactn';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Home, Shop, Bag, Favorites, Profile} from '../screens';
import {Loading, NetSplash} from '../components';
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../Splash';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichTab: 'Home',
      isFocus: false,
      isLoading: true,
      isConnected: undefined,
      bag: [],
      backClickCount: 0,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    // Add navigation listeners
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.AsyncLoad();
        this.setGlobal({isLanding: true});
      },
    );
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
    this.AsyncLoad();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
    this.setGlobal({isLanding: true});
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

  AsyncLoad() {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          this.setGlobal({token: token});
        }
        AsyncStorage.getItem('mobile')
          .then(mobile => {
            if (mobile) {
              this.setGlobal({mobile: mobile}, () => {
                this.bagLoad();
              });
            }
          })
          .catch(() => {})
          .finally(() => {});
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          this.setState({isLoading: false});
        }, 1000);
      });
  }

  bagLoad() {
    const bagApi = 'https://www.beheene.com/api/v1/cart';

    Axios.post(
      bagApi,
      {mobile: `${this.global.mobile}`},
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setGlobal({bagCount: response.data.data.length});
        console.warn(JSON.stringify(this.global.bagCount, null, 2));
      })
      .catch(error => {
        this.setState({bag: []});
      })
      .finally(() => {
        //this.setState({isLoading: false});
      });
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -responsiveHeight(11),
          friction: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });
  }

  handleBackButton = () => {
    if (this.global.isLanding == true) {
      this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Splash></Splash>;
      } else {
        return (
          <SafeAreaView
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
            <Animated.View
              style={[
                styles.animatedView,
                {transform: [{translateY: this.springValue}]},
              ]}>
              <Text style={styles.exitTitleText}>
                {strings(this.global.locale).PressBackAgainToExit}
              </Text>
            </Animated.View>
            {/*--------------------Variable part--------------------*/}
            {this.state.whichTab == 'Home' ? (
              <Home navigation={this.props.navigation}></Home>
            ) : this.state.whichTab == 'Shop' ? (
              <Shop navigation={this.props.navigation}></Shop>
            ) : this.state.whichTab == 'Bag' ? (
              <Bag navigation={this.props.navigation}></Bag>
            ) : this.state.whichTab == 'Favorites' ? (
              <Favorites navigation={this.props.navigation}></Favorites>
            ) : this.state.whichTab == 'Profile' ? (
              <Profile navigation={this.props.navigation}></Profile>
            ) : (
              <Home navigation={this.props.navigation}></Home>
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
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
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
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
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
                  <ImageBackground
                    style={{
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
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
                    }>
                    {this.global.bagCount ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colors(this.global.theme).RED_TWO,
                          marginRight: responsiveHeight(3),
                          marginLeft: -responsiveHeight(1),
                          borderRadius: responsiveWidth(0.5),
                        }}>
                        <Text
                          style={[
                            {
                              color: colors(this.global.theme).WHITE,
                            },
                            fonts(this.global.SizeAndWeight).FIRST,
                          ]}>
                          {this.global.bagCount}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                  </ImageBackground>
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
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
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
                      width: responsiveHeight(5),
                      height: responsiveHeight(5),
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
          </SafeAreaView>
        );
      }
    } else {
      return (
        <NetSplash
          onPress={() => {
            ///////////////////NetInfo
            NetInfo.fetch().then(state => {
              this.setState({
                isConnected: state.isConnected,
                isLoading: true,
              });
            });
            this.AsyncLoad();
          }}></NetSplash>
      );
    }
  }
}
export {Landing};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    height: responsiveHeight(6),
    backgroundColor: 'rgb(34,34,34)',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
  },
  exitTitleText: {
    textAlign: 'center',
    color: 'rgb(255,255,255)',
    fontFamily: 'IRANSansMobile(FaNum)',
    fontWeight: '300',
    fontSize: responsiveFontSize(1.5),
  },
};

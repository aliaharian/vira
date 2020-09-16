import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import AsyncStorage from '@react-native-community/async-storage';
import {Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import RBSheet from 'react-native-raw-bottom-sheet';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagePhoneNumber: '',
      labelPhoneNumber: false,
      placeHolderPhoneNumber: strings(this.global.locale).PhoneNumber,
      messageLoginPassword: '',
      labelLoginPassword: false,
      placeHolderLoginPassword: strings(this.global.locale).Password,
      isLoading: false,
      loginError: false,
      isConnected: undefined,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.setState({loginError: false});
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -responsiveHeight(1),
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

  //--------------------Field Bottom Sheet--------------------
  bottomSheetField() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(20),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheetField = ref;
        }}
        duration={250}
        closeOnDragDown={true}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/*----------Text Sort By----------*/}
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
                  marginHorizontal: responsiveWidth(4),
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).AllFieldsAreRequired}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  //--------------------Phone Number Bottom Sheet--------------------
  bottomSheetPhoneNumber() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(20),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheetPhoneNumber = ref;
        }}
        duration={250}
        closeOnDragDown={true}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/*----------Text Sort By----------*/}
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
                  marginHorizontal: responsiveWidth(4),
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).TheCellNumberEnteredIsNotCorrect}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  render() {
    const url = 'https://beheene.com/api/v1/login';
    if (this.state.isConnected) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          {this.bottomSheetField()}
          {this.bottomSheetPhoneNumber()}
          <StatusBar
            backgroundColor={colors(this.global.theme).GRAY_ONE}
            barStyle="dark-content"></StatusBar>
          <Animated.View
            style={[
              styles.animatedView,
              {transform: [{translateY: this.springValue}]},
            ]}>
            <Text style={styles.exitTitleText}>
              {strings(this.global.locale).ConnectionServerError}
            </Text>
          </Animated.View>
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
              }}></View>
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
                //marginBottom: responsiveHeight(10),
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
                  marginTop: responsiveHeight(2),
                  marginBottom: responsiveHeight(8),
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Forth,
                  ]}>
                  {strings(this.global.locale).Login}
                </Text>
              </View>
              {/*--------------------Phone Number Text Input--------------------*/}
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
                      alignItems: 'flex-end',
                      backgroundColor: colors(this.global.theme).WHITE,
                      marginHorizontal: responsiveWidth(4),
                      paddingHorizontal: responsiveWidth(4),
                      borderRadius: responsiveWidth(1),
                      paddingTop:
                        this.state.labelPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelPhoneNumber == true ? (
                    <View
                      style={{
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        position: 'absolute',
                        top: responsiveHeight(0.5),
                        right: responsiveWidth(5),
                        zIndex: 1,
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_SIX,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}>
                        {strings(this.global.locale).PhoneNumber}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputPhoneNumber => {
                      this.inputPhoneNumber = inputPhoneNumber;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelPhoneNumber == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderPhoneNumber}
                    value={this.state.messagePhoneNumber}
                    onChangeText={messagePhoneNumber =>
                      this.setState({messagePhoneNumber})
                    }
                    onFocus={() => {
                      this.setState({
                        labelPhoneNumber: true,
                        placeHolderPhoneNumber: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messagePhoneNumber == ''
                        ? this.setState({
                            labelPhoneNumber: false,
                            placeHolderPhoneNumber: strings(this.global.locale)
                              .PhoneNumber,
                          })
                        : () => {};
                    }}
                    onSubmitEditing={() => this.inputLoginPassword.focus()}
                    keyboardType={'number-pad'}
                  />
                </View>
              </View>
              {/*--------------------Login Password Text Input--------------------*/}
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
                      alignItems: 'flex-end',
                      backgroundColor: colors(this.global.theme).WHITE,
                      marginRight: responsiveWidth(4),
                      marginLeft: responsiveWidth(8),
                      paddingHorizontal: responsiveWidth(4),
                      borderRadius: responsiveWidth(1),
                      paddingTop:
                        this.state.labelLoginPassword == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelLoginPassword == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelLoginPassword == true ? (
                    <View
                      style={{
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        position: 'absolute',
                        top: responsiveHeight(0.5),
                        right: responsiveWidth(5),
                        zIndex: 1,
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_SIX,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}>
                        {strings(this.global.locale).Password}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputLoginPassword => {
                      this.inputLoginPassword = inputLoginPassword;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelLoginPassword == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderLoginPassword}
                    value={this.state.messageLoginPassword}
                    onChangeText={messageLoginPassword =>
                      this.setState({messageLoginPassword})
                    }
                    onFocus={() => {
                      this.setState({
                        labelLoginPassword: true,
                        placeHolderLoginPassword: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageLoginPassword == ''
                        ? this.setState({
                            labelLoginPassword: false,
                            placeHolderLoginPassword: strings(
                              this.global.locale,
                            ).Password,
                          })
                        : () => {};
                    }}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {/*----------Forgot Password----------*/}
              <TouchableOpacity
                style={{
                  alignSelf: 'stretch',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1),
                  flexDirection: 'row',
                }}
                onPress={() => {
                  this.props.navigation.navigate('_ForgotPassword');
                }}>
                <Image
                  style={{
                    width: responsiveWidth(4),
                    height: responsiveWidth(4),
                    marginRight: responsiveWidth(1),
                    tintColor: colors(this.global.theme).RED_TWO,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/34.png')}></Image>
                <Text
                  style={[
                    {
                      marginRight: responsiveWidth(4),
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).FIRST,
                  ]}>
                  {strings(this.global.locale).ForgotPassword}
                </Text>
              </TouchableOpacity>
              {/*----------Login Error----------*/}
              <View
                style={{
                  height: responsiveHeight(4),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1),
                  flexDirection: 'row',
                }}>
                {this.state.loginError == true ? (
                  <Text
                    style={[
                      {
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).RED_TWO,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    {strings(this.global.locale).LoginError}
                  </Text>
                ) : (
                  () => {}
                )}
              </View>
              {/*----------Login TouchableOpacity----------*/}
              <TouchableOpacity
                style={[
                  {
                    height: responsiveHeight(8),
                    alignSelf: 'stretch',
                    marginHorizontal: responsiveWidth(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).RED_ONE,
                    borderRadius: 100,
                    marginTop: responsiveHeight(4),
                    marginBottom: responsiveHeight(2),
                  },
                  elevations(this.global.shadow).FAVORITES,
                ]}
                disabled={this.state.isLoading == true ? true : false}
                onPress={() => {
                  Keyboard.dismiss();
                  if (
                    this.state.messagePhoneNumber == '' ||
                    this.state.messageLoginPassword == ''
                  ) {
                    this.RBSheetField.open();
                    setTimeout(() => {
                      try {
                        this.RBSheetField.close();
                      } catch {
                        () => {};
                      }
                    }, 2000);
                  } else {
                    if (this.state.messagePhoneNumber.length == 11) {
                      this.setState({isLoading: true});
                      Axios.post(url, {
                        mobile: this.state.messagePhoneNumber,
                        password: this.state.messageLoginPassword,
                      })
                        .then(response => {
                          if (response.data.status == 200) {
                            this.setGlobal(
                              {
                                token: response.data.token,
                                mobile: this.state.messagePhoneNumber,
                              },
                              () => {
                                AsyncStorage.setItem(
                                  'token',
                                  response.data.token,
                                )
                                  .then(r => {
                                    AsyncStorage.setItem(
                                      'mobile',
                                      this.state.messagePhoneNumber,
                                    )
                                      .then(() => {
                                        this.props.navigation.navigate(
                                          '_Landing',
                                        );
                                      })
                                      .catch(error => {});
                                  })
                                  .catch(error => {})
                                  .finally(() => {});
                              },
                            );
                          } else {
                            this.setState({loginError: true});
                          }
                        })
                        .catch(error => {
                          this.setState({loginError: true});
                          this._spring();
                        })
                        .finally(() => {
                          this.setState({isLoading: false});
                        });
                    } else {
                      this.RBSheetPhoneNumber.open();
                      setTimeout(() => {
                        try {
                          this.RBSheetPhoneNumber.close();
                        } catch {
                          () => {};
                        }
                      }, 2000);
                    }
                  }
                }}>
                {this.state.isLoading == true ? (
                  <ActivityIndicator
                    size={'small'}
                    color={colors(this.global.theme).WHITE}></ActivityIndicator>
                ) : (
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).WHITE,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {strings(this.global.locale).Login}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <Net
          onPress={() => {
            ///////////////////NetInfo
            NetInfo.fetch().then(state => {
              this.setState({
                isConnected: state.isConnected,
              });
            });
          }}></Net>
      );
    }
  }
}
export {Login};

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

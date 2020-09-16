import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import Axios from 'axios';
import {Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNewPassword: '',
      labelNewPassword: false,
      placeHolderNewPassword: strings(this.global.locale).NewPassword,
      messageRepeatNewPassword: '',
      labelRepeatNewPassword: false,
      placeHolderRepeatNewPassword: strings(this.global.locale)
        .RepeatNewPassword,
      heightOfTextInput: '',

      isConnected: undefined,
      isLoadingChange: false,
      mobile: this.props.navigation.getParam('mobile'),
      token: this.props.navigation.getParam('token'),
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
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

  //--------------------Password Bottom Sheet--------------------
  bottomSheetPassword() {
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
          this.RBSheetPassword = ref;
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
              {
                strings(this.global.locale)
                  .ThePasswordAndItsRepetitionAreNotTheSame
              }
            </Text>
          </View>
        </View>
      </RBSheet>
    );
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

  //--------------------Password Bottom Sheet--------------------
  bottomSheetPasswordLength() {
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
          this.RBSheetPasswordLength = ref;
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
              {
                strings(this.global.locale)
                  .PasswordMustBeAtLeastEightCharactersLong
              }
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  //--------------------successfully Bottom Sheet--------------------
  bottomSheetSuccessfully() {
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
          this.RBSheetSuccessfully = ref;
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
              {
                strings(this.global.locale)
                  .YourPasswordHasBeenSuccessfullyChanged
              }
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  render() {
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
          <StatusBar
            backgroundColor={colors(this.global.theme).GRAY_ONE}
            barStyle="dark-content"></StatusBar>
          {this.bottomSheetPassword()}
          {this.bottomSheetField()}
          {this.bottomSheetPasswordLength()}
          {this.bottomSheetSuccessfully()}
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
                  {strings(this.global.locale).PasswordChange}
                </Text>
              </View>
              {/*----------Please Enter Your New Password----------*/}
              <View
                style={{
                  alignSelf: 'stretch',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginVertical: responsiveHeight(1),
                  flexDirection: 'row',
                  marginHorizontal: responsiveWidth(4),
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).PleaseEnterYourNewPassword}
                </Text>
              </View>
              {/*--------------------New PassWord Text Input--------------------*/}
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
                        this.state.labelNewPassword == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelNewPassword == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelNewPassword == true ? (
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
                        {strings(this.global.locale).NewPassword}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputNewPassword => {
                      this.inputNewPassword = inputNewPassword;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelNewPassword == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderNewPassword}
                    value={this.state.messageNewPassword}
                    onChangeText={messageNewPassword =>
                      this.setState({messageNewPassword})
                    }
                    onFocus={() => {
                      this.setState({
                        labelNewPassword: true,
                        placeHolderNewPassword: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageNewPassword == ''
                        ? this.setState({
                            labelNewPassword: false,
                            placeHolderNewPassword: strings(this.global.locale)
                              .NewPassword,
                          })
                        : () => {};
                    }}
                    onSubmitEditing={() => this.inputRepeatNewPassword.focus()}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {/*--------------------Repeat New PassWord Text Input--------------------*/}
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
                        this.state.labelRepeatNewPassword == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelRepeatNewPassword == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelRepeatNewPassword == true ? (
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
                        {strings(this.global.locale).RepeatNewPassword}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputRepeatNewPassword => {
                      this.inputRepeatNewPassword = inputRepeatNewPassword;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelRepeatNewPassword == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderRepeatNewPassword}
                    value={this.state.messageRepeatNewPassword}
                    onChangeText={messageRepeatNewPassword =>
                      this.setState({messageRepeatNewPassword})
                    }
                    onFocus={() => {
                      this.setState({
                        labelRepeatNewPassword: true,
                        placeHolderRepeatNewPassword: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageRepeatNewPassword == ''
                        ? this.setState({
                            labelRepeatNewPassword: false,
                            placeHolderRepeatNewPassword: strings(
                              this.global.locale,
                            ).RepeatNewPassword,
                          })
                        : () => {};
                    }}
                    secureTextEntry={true}
                  />
                </View>
              </View>

              {/*----------Verify TouchableOpacity----------*/}
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
                disabled={this.state.isLoadingChange == true ? true : false}
                onPress={() => {
                  if (
                    this.state.messageNewPassword == '' ||
                    this.state.messageRepeatNewPassword == ''
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
                    if (
                      this.state.messageNewPassword.length < 8 ||
                      this.state.messageRepeatNewPassword.length < 8
                    ) {
                      this.RBSheetPasswordLength.open();
                      setTimeout(() => {
                        try {
                          this.RBSheetPasswordLength.close();
                        } catch {
                          () => {};
                        }
                      }, 2000);
                    } else {
                      if (
                        this.state.messageNewPassword ==
                        this.state.messageRepeatNewPassword
                      ) {
                        this.setState({isLoadingChange: true});
                        Axios.post(
                          'https://www.beheene.com/api/v1/userSave',
                          {
                            mobile: this.state.mobile,
                            password: this.state.messageNewPassword,
                            password_confirmation: this.state
                              .messageRepeatNewPassword,
                          },
                          {
                            headers: {
                              Authorization: this.state.token,
                            },
                          },
                        )
                          .then(response => {
                            this.setGlobal(
                              {
                                token: this.state.token,
                                mobile: this.state.mobile,
                              },
                              () => {
                                AsyncStorage.setItem('token', this.state.token)
                                  .then(r => {
                                    AsyncStorage.setItem(
                                      'mobile',
                                      this.state.mobile,
                                    )
                                      .then(() => {})
                                      .catch(error => {});
                                  })
                                  .catch(error => {})
                                  .finally(() => {
                                    this.RBSheetSuccessfully.open();
                                    setTimeout(() => {
                                      try {
                                        this.RBSheetSuccessfully.close();

                                        this.props.navigation.navigate(
                                          '_Landing',
                                        );
                                      } catch {
                                        () => {};
                                      }
                                    }, 2000);
                                  });
                              },
                            );
                          })
                          .catch(error => {
                            this._spring();
                          })
                          .finally(() => {
                            this.setState({isLoadingChange: false});
                          });
                      } else {
                        this.RBSheetPassword.open();
                        setTimeout(() => {
                          try {
                            this.RBSheetPassword.close();
                          } catch {
                            () => {};
                          }
                        }, 2000);
                      }
                    }
                  }
                }}>
                {this.state.isLoadingChange == true ? (
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
                    {strings(this.global.locale).PasswordChange}
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
export {ChangePassword};

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

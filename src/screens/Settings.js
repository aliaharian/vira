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
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, strings, elevations, fonts} from '../globals';
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageUserFullName: this.props.navigation.getParam('name'),
      labelUserFullName: false,
      placeHolderUserFullName: strings(this.global.locale).UserFullName,
      messageDateOfBirth: this.props.navigation.getParam('birthDate'),
      labelDateOfBirth: false,
      placeHolderDateOfBirth: strings(this.global.locale).DateOfBirth,
      messagePassword: '123456789',
      labelPassword: true,
      placeHolderPassword: strings(this.global.locale).Password,
      messageOldPassword: '',
      labelOldPassword: false,
      placeHolderOldPassword: strings(this.global.locale).OldPassword,
      messageNewPassword: '',
      labelNewPassword: false,
      placeHolderNewPassword: strings(this.global.locale).NewPassword,
      messageRepeatNewPassword: '',
      labelRepeatNewPassword: false,
      placeHolderRepeatNewPassword: strings(this.global.locale)
        .RepeatNewPassword,
      heightOfTextInput: '',

      isLoading: false,
      isConnected: undefined,
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

  //-------------------Change Password Bottom Sheet--------------------
  bottomSheet() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(20) + 2 * this.state.heightOfTextInput,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheet = ref;
        }}
        duration={250}
        closeOnDragDown={true}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {/*----------Password Change----------*/}
          <View
            style={{
              height: responsiveHeight(4),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: responsiveHeight(1),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).PasswordChange}
            </Text>
          </View>
          {/*--------------------Old PassWord Text Input--------------------*/}
          {/*
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
                    this.state.labelOldPassword == false
                      ? responsiveHeight(0.5)
                      : responsiveHeight(1),
                  paddingBottom:
                    this.state.labelOldPassword == false
                      ? responsiveHeight(0.5)
                      : 0,
                },
                elevations(this.global.shadow).FAVORITES,
              ]}>
              {this.state.labelOldPassword == true ? (
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
                    {strings(this.global.locale).OldPassword}
                  </Text>
                </View>
              ) : (
                () => {}
              )}
              <TextInput
                ref={inputOldPassword => {
                  this.inputOldPassword = inputOldPassword;
                }}
                style={{
                  alignSelf: 'stretch',
                  textAlign: 'right',
                  fontFamily: 'IRANSansMobile(FaNum)',
                  fontWeight: '300',
                  fontSize:
                    this.state.labelOldPassword == false
                      ? responsiveFontSize(2.1)
                      : responsiveFontSize(1.8),
                }}
                placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                placeholder={this.state.placeHolderOldPassword}
                value={this.state.messageOldPassword}
                onChangeText={messageOldPassword =>
                  this.setState({messageOldPassword})
                }
                onFocus={() => {
                  this.setState({
                    labelOldPassword: true,
                    placeHolderOldPassword: '',
                  });
                }}
                onEndEditing={() => {
                  this.state.messageOldPassword == ''
                    ? this.setState({
                        labelOldPassword: false,
                        placeHolderOldPassword: strings(this.global.locale)
                          .OldPassword,
                      })
                    : () => {};
                }}
                onSubmitEditing={() => this.inputNewPassword.focus()}
                secureTextEntry={true}
              />
            </View>
          </View>
          */}
          {/*----------Forgot Password----------*/}
          {/*         <TouchableOpacity
            style={{
              height: responsiveHeight(4),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginVertical: responsiveHeight(1),
            }}
            onPress={() => {
              this.props.navigation.navigate('_ForgotPassword');
              Keyboard.dismiss();
              this.RBSheet.close();
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color: colors(this.global.theme).GRAY_SIX,
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).ForgotPassword}
            </Text>
          </TouchableOpacity>
*/}
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
          {/*----------Save Password----------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              marginHorizontal: responsiveWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: responsiveHeight(2),
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
              marginTop: responsiveHeight(1),
            }}
            disabled={
              this.state.messageNewPassword == '' ||
              this.state.messageRepeatNewPassword == ''
            }
            onPress={() => {
              Keyboard.dismiss();
              this.RBSheet.close();
              Axios.post(
                'https://www.beheene.com/api/v1/userSave',
                {
                  mobile: `${this.global.mobile}`,
                  password: this.state.messageNewPassword,
                  password_confirmation: this.state.messageRepeatNewPassword,
                },
                {
                  headers: {
                    Authorization: `${this.global.token}`,
                  },
                },
              )
                .then(response => {})
                .catch(error => {
                  this._spring();
                })
                .finally(() => {});
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).SavePassWord}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  render() {
    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Loading></Loading>;
      } else {
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
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}
                onPress={() => {
                  this.props.navigation.navigate('_Search');
                }}>
                <Image
                  style={{
                    width: responsiveHeight(4),
                    height: responsiveHeight(4),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/17.png')}></Image>
              </TouchableOpacity>
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
                    marginVertical: responsiveHeight(2),
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Forth,
                    ]}>
                    {strings(this.global.locale).Settings}
                  </Text>
                </View>
                {/*--------------------Personal Information--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginBottom: responsiveHeight(1),
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {strings(this.global.locale).PersonalInformation}
                  </Text>
                </View>
                {/*--------------------User Full Name Text Input--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                  }}
                  onLayout={e => {
                    this.setState({
                      heightOfTextInput: e.nativeEvent.layout.height,
                    });
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
                          this.state.labelUserFullName == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelUserFullName == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelUserFullName == true ? (
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
                          {strings(this.global.locale).UserFullName}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                    <TextInput
                      ref={inputUserFullName => {
                        this.inputUserFullName = inputUserFullName;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelUserFullName == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderUserFullName}
                      value={this.state.messageUserFullName}
                      onChangeText={messageUserFullName =>
                        this.setState({messageUserFullName})
                      }
                      onFocus={() => {
                        this.setState({
                          labelUserFullName: true,
                          placeHolderUserFullName: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messageUserFullName == ''
                          ? this.setState({
                              labelUserFullName: false,
                              placeHolderUserFullName: strings(
                                this.global.locale,
                              ).UserFullName,
                            })
                          : this.setState({
                              labelUserFullName: false,
                              placeHolderUserFullName: strings(
                                this.global.locale,
                              ).UserFullName,
                            });
                        Axios.post(
                          'https://www.beheene.com/api/v1/userSave',
                          {
                            mobile: `${this.global.mobile}`,
                            name: this.state.messageUserFullName,
                          },
                          {
                            headers: {
                              Authorization: `${this.global.token}`,
                            },
                          },
                        )
                          .then(response => {})
                          .catch(error => {
                            this._spring();
                          })
                          .finally(() => {});
                      }}
                    />
                  </View>
                </View>
                {/*--------------------Date Of Birth Text Input--------------------*/}
                {/*
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
                          this.state.labelDateOfBirth == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelDateOfBirth == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelDateOfBirth == true ? (
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
                          {strings(this.global.locale).DateOfBirth}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                    <TextInput
                      ref={inputDateOfBirth => {
                        this.inputDateOfBirth = inputDateOfBirth;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelDateOfBirth == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderDateOfBirth}
                      value={this.state.messageDateOfBirth}
                      onChangeText={messageDateOfBirth =>
                        this.setState({messageDateOfBirth})
                      }
                      onFocus={() => {
                        this.setState({
                          labelDateOfBirth: true,
                          placeHolderDateOfBirth: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messageDateOfBirth == ''
                          ? this.setState({
                              labelDateOfBirth: false,
                              placeHolderDateOfBirth: strings(
                                this.global.locale,
                              ).DateOfBirth,
                            })
                          : this.setState({
                              labelDateOfBirth: false,
                              placeHolderDateOfBirth: strings(
                                this.global.locale,
                              ).DateOfBirth,
                            });
                        Axios.post(
                          'https://www.beheene.com/api/v1/userSave',
                          {
                            mobile: `${this.global.mobile}`,
                            birthDate: this.state.messageDateOfBirth,
                          },
                          {
                            headers: {
                              Authorization: `${this.global.token}`,
                            },
                          },
                        )
                          .then(response => {})
                          .catch(error => {
                            this._spring();
                          })
                          .finally(() => {});
                      }}
                    />
                  </View>
                </View>
               */}
                {/*--------------------Password And Change--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginBottom: responsiveHeight(1),
                    marginTop: responsiveHeight(3),
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('_ChangePasswordSettings')
                    }>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {strings(this.global.locale).Change}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 4,
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
                      {strings(this.global.locale).Password}
                    </Text>
                  </View>
                </View>
                {/*--------------------Password Text Input--------------------*/}
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
                          this.state.labelPassword == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelPassword == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelPassword == true ? (
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
                      ref={inputPassword => {
                        this.inputPassword = inputPassword;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelPassword == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderPassword}
                      value={this.state.messagePassword}
                      onChangeText={messagePassword =>
                        this.setState({messagePassword})
                      }
                      onFocus={() => {
                        this.setState({
                          labelPassword: true,
                          placeHolderPassword: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messagePassword == ''
                          ? this.setState({
                              labelPassword: false,
                              placeHolderPassword: strings(this.global.locale)
                                .Password,
                            })
                          : () => {};
                      }}
                      secureTextEntry={true}
                      editable={false}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      }
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
export {Settings};

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

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
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSingUpFullName: '',
      labelSingUpFullName: false,
      placeHolderSingUpFullName: strings(this.global.locale).UserFullName,
      messageSingUpPhoneNumber: '',
      labelSingUpPhoneNumber: false,
      placeHolderSingUpPhoneNumber: strings(this.global.locale).PhoneNumber,
      messageSingUpPassword: '',
      labelSingUpPassword: false,
      placeHolderSingUpPassword: strings(this.global.locale).Password,
      messageSingUpRepeatPassword: '',
      labelSingUpRepeatPassword: false,
      placeHolderSingUpRepeatPassword: strings(this.global.locale)
        .RepeatPassword,
      isConnected: undefined,
      isLoadingSend: false,
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

  //--------------------Error Bottom Sheet--------------------
  bottomSheetError() {
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
          this.RBSheetError = ref;
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
              {strings(this.global.locale).SomethingWentWrongPleaseTryAgain}
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

  //--------------------Mobile Bottom Sheet--------------------
  bottomSheetMobile() {
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
          this.RBSheetMobile = ref;
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
                  .ThisMobileNumberIsAlreadySelectedRegisterWithAnotherMobile
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
          {this.bottomSheetPassword()}
          {this.bottomSheetError()}
          {this.bottomSheetField()}
          {this.bottomSheetPhoneNumber()}
          {this.bottomSheetPasswordLength()}
          {this.bottomSheetMobile()}
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
                  {strings(this.global.locale).SignUp}
                </Text>
              </View>
              {/*--------------------Sing Up Full Name Text Input--------------------*/}
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
                        this.state.labelSingUpFullName == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelSingUpFullName == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelSingUpFullName == true ? (
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
                    ref={inputSingUpFullName => {
                      this.inputSingUpFullName = inputSingUpFullName;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelSingUpFullName == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderSingUpFullName}
                    value={this.state.messageSingUpFullName}
                    onChangeText={messageSingUpFullName =>
                      this.setState({messageSingUpFullName})
                    }
                    onFocus={() => {
                      this.setState({
                        labelSingUpFullName: true,
                        placeHolderSingUpFullName: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageSingUpFullName == ''
                        ? this.setState({
                            labelSingUpFullName: false,
                            placeHolderSingUpFullName: strings(
                              this.global.locale,
                            ).UserFullName,
                          })
                        : () => {};
                    }}
                    onSubmitEditing={() => this.inputSingUpPhoneNumber.focus()}
                  />
                </View>
              </View>
              {/*--------------------Sing Up Phone Number Text Input--------------------*/}
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
                        this.state.labelSingUpPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelSingUpPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelSingUpPhoneNumber == true ? (
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
                    ref={inputSingUpPhoneNumber => {
                      this.inputSingUpPhoneNumber = inputSingUpPhoneNumber;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelSingUpPhoneNumber == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderSingUpPhoneNumber}
                    value={this.state.messageSingUpPhoneNumber}
                    onChangeText={messageSingUpPhoneNumber =>
                      this.setState({messageSingUpPhoneNumber})
                    }
                    onFocus={() => {
                      this.setState({
                        labelSingUpPhoneNumber: true,
                        placeHolderSingUpPhoneNumber: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageSingUpPhoneNumber == ''
                        ? this.setState({
                            labelSingUpPhoneNumber: false,
                            placeHolderSingUpPhoneNumber: strings(
                              this.global.locale,
                            ).PhoneNumber,
                          })
                        : () => {};
                    }}
                    onSubmitEditing={() => this.inputSingUpPassword.focus()}
                    keyboardType={'number-pad'}
                  />
                </View>
              </View>
              {/*--------------------Sing Up Password Text Input--------------------*/}
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
                        this.state.labelSingUpPassword == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelSingUpPassword == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelSingUpPassword == true ? (
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
                    ref={inputSingUpPassword => {
                      this.inputSingUpPassword = inputSingUpPassword;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelSingUpPassword == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderSingUpPassword}
                    value={this.state.messageSingUpPassword}
                    onChangeText={messageSingUpPassword =>
                      this.setState({messageSingUpPassword})
                    }
                    onFocus={() => {
                      this.setState({
                        labelSingUpPassword: true,
                        placeHolderSingUpPassword: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageSingUpPassword == ''
                        ? this.setState({
                            labelSingUpPassword: false,
                            placeHolderSingUpPassword: strings(
                              this.global.locale,
                            ).Password,
                          })
                        : () => {};
                    }}
                    onSubmitEditing={() =>
                      this.inputSingUpRepeatPassword.focus()
                    }
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {/*--------------------Sing Up Repeat Password Text Input--------------------*/}
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
                        this.state.labelSingUpRepeatPassword == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelSingUpRepeatPassword == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelSingUpRepeatPassword == true ? (
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
                        {strings(this.global.locale).RepeatPassword}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputSingUpRepeatPassword => {
                      this.inputSingUpRepeatPassword = inputSingUpRepeatPassword;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelSingUpRepeatPassword == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderSingUpRepeatPassword}
                    value={this.state.messageSingUpRepeatPassword}
                    onChangeText={messageSingUpRepeatPassword =>
                      this.setState({messageSingUpRepeatPassword})
                    }
                    onFocus={() => {
                      this.setState({
                        labelSingUpRepeatPassword: true,
                        placeHolderSingUpRepeatPassword: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageSingUpRepeatPassword == ''
                        ? this.setState({
                            labelSingUpRepeatPassword: false,
                            placeHolderSingUpRepeatPassword: strings(
                              this.global.locale,
                            ).RepeatPassword,
                          })
                        : () => {};
                    }}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {/*----------Already Have An Account----------*/}
              <TouchableOpacity
                style={{
                  alignSelf: 'stretch',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: responsiveHeight(1),
                  flexDirection: 'row',
                }}
                onPress={() => {
                  this.props.navigation.navigate('_Login');
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
                  {strings(this.global.locale).AlreadyHaveAnAccount}
                </Text>
              </TouchableOpacity>
              {/*----------Send Verify Code----------*/}
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
                disabled={this.state.isLoadingSend == true ? true : false}
                onPress={() => {
                  if (
                    this.state.messageSingUpFullName == '' ||
                    this.state.messageSingUpPhoneNumber == '' ||
                    this.state.messageSingUpPassword == '' ||
                    this.state.messageSingUpRepeatPassword == ''
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
                    if (this.state.messageSingUpPassword.length < 8) {
                      this.RBSheetPasswordLength.open();
                      setTimeout(() => {
                        try {
                          this.RBSheetPasswordLength.close();
                        } catch {
                          () => {};
                        }
                      }, 2000);
                    } else {
                      if (this.state.messageSingUpPhoneNumber.length == 11) {
                        if (
                          this.state.messageSingUpPassword ==
                          this.state.messageSingUpRepeatPassword
                        ) {
                          this.setState({isLoadingSend: true});
                          Axios.post('https://beheene.com/api/v1/register', {
                            mobile: this.state.messageSingUpPhoneNumber,
                            name: this.state.messageSingUpFullName,
                            password: this.state.messageSingUpPassword,
                            password_confirmation: this.state
                              .messageSingUpRepeatPassword,
                          })
                            .then(response => {
                              console.warn(response.data.name);

                              if (response.data.status == 200) {
                                this.setState({isLoadingSend: false}, () => {
                                  this.props.navigation.navigate(
                                    '_VerifyCode',
                                    {
                                      mobile: this.state
                                        .messageSingUpPhoneNumber,
                                    },
                                  );
                                });
                              } else {
                                this.RBSheetMobile.open();
                                setTimeout(() => {
                                  try {
                                    this.RBSheetMobile.close();
                                  } catch {
                                    () => {};
                                  }
                                }, 2000);
                              }
                            })
                            .catch(error => {
                              this._spring();
                              this.RBSheetError.open();
                              setTimeout(() => {
                                try {
                                  this.RBSheetError.close();
                                } catch {
                                  () => {};
                                }
                              }, 2000);
                            })
                            .finally(() => {
                              this.setState({isLoadingSend: false});
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
                  }
                }}>
                {this.state.isLoadingSend == true ? (
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
                    {strings(this.global.locale).SendVerifyCode}
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
export {SignUp};

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

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
import RBSheet from 'react-native-raw-bottom-sheet';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageForgotPasswordPhoneNumber: '',
      labelForgotPasswordPhoneNumber: false,
      placeHolderForgotPasswordPhoneNumber: strings(this.global.locale)
        .PhoneNumber,
      isConnected: undefined,
      isLoadingForgot: false,
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
          {this.bottomSheetPhoneNumber()}
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
                  {strings(this.global.locale).ForgotPasswordPage}
                </Text>
              </View>
              {/*----------Forgot Password----------*/}
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
                  {
                    strings(this.global.locale)
                      .PleaseEnterYourEmailYouWillReceiveALinkToCreateANewPasswordViaEmail
                  }
                </Text>
              </View>
              {/*--------------------Forgot Password Phone Number Text Input--------------------*/}
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
                        this.state.labelForgotPasswordPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelForgotPasswordPhoneNumber == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelForgotPasswordPhoneNumber == true ? (
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
                    ref={inputForgotPasswordPhoneNumber => {
                      this.inputForgotPasswordPhoneNumber = inputForgotPasswordPhoneNumber;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelForgotPasswordPhoneNumber == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={
                      this.state.placeHolderForgotPasswordPhoneNumber
                    }
                    value={this.state.messageForgotPasswordPhoneNumber}
                    onChangeText={messageForgotPasswordPhoneNumber =>
                      this.setState({messageForgotPasswordPhoneNumber})
                    }
                    onFocus={() => {
                      this.setState({
                        labelForgotPasswordPhoneNumber: true,
                        placeHolderForgotPasswordPhoneNumber: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageForgotPasswordPhoneNumber == ''
                        ? this.setState({
                            labelForgotPasswordPhoneNumber: false,
                            placeHolderForgotPasswordPhoneNumber: strings(
                              this.global.locale,
                            ).PhoneNumber,
                          })
                        : () => {};
                    }}
                    keyboardType={'number-pad'}
                  />
                </View>
              </View>
              {/*----------Save Password----------*/}
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
                disabled={this.state.isLoadingForgot == true ? true : false}
                onPress={() => {
                  if (
                    this.state.messageForgotPasswordPhoneNumber.length == 11
                  ) {
                    this.setState({isLoadingForgot: true});
                    Axios.post('https://beheene.com/api/v1/forgetPassword', {
                      mobile: this.state.messageForgotPasswordPhoneNumber,
                    })
                      .then(response => {
                        console.warn(response);
                        this.props.navigation.navigate('_VerifyCodeForgot', {
                          mobile: this.state.messageForgotPasswordPhoneNumber,
                        });
                      })
                      .catch(error => {
                        this._spring();
                      })
                      .finally(() => {
                        this.setState({isLoadingForgot: false});
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
                }}>
                {this.state.isLoadingForgot == true ? (
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
                    {strings(this.global.locale).Send}
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
export {ForgotPassword};

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

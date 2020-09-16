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
import {Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';

class VerifyCodeForgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVerifyCode: '',
      labelVerifyCode: false,
      placeHolderVerifyCode: strings(this.global.locale).VerifyCode,
      isConnected: undefined,
      isLoadingVerify: false,
      mobile: this.props.navigation.getParam('mobile'),
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
              {strings(this.global.locale).WrongCodeEntered}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  //--------------------Code Bottom Sheet--------------------
  bottomSheetCode() {
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
          this.RBSheetCode = ref;
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
                  .PleaseEnterTheVerificationCodeCorrectly
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
          {this.bottomSheetError()}
          {this.bottomSheetCode()}
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
                  {strings(this.global.locale).SendVerifyCode}
                </Text>
              </View>
              {/*----------Please Enter The Text Code To Your Phone Number----------*/}
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
                      .PleaseEnterTheTextCodeToYourPhoneNumber
                  }
                </Text>
              </View>
              {/*--------------------Verify Code Text Input--------------------*/}
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
                        this.state.labelVerifyCode == false
                          ? responsiveHeight(0.5)
                          : responsiveHeight(1),
                      paddingBottom:
                        this.state.labelVerifyCode == false
                          ? responsiveHeight(0.5)
                          : 0,
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  {this.state.labelVerifyCode == true ? (
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
                        {strings(this.global.locale).VerifyCode}
                      </Text>
                    </View>
                  ) : (
                    () => {}
                  )}
                  <TextInput
                    ref={inputVerifyCode => {
                      this.inputVerifyCode = inputVerifyCode;
                    }}
                    style={{
                      alignSelf: 'stretch',
                      textAlign: 'right',
                      fontFamily: 'IRANSansMobile(FaNum)',
                      fontWeight: '300',
                      fontSize:
                        this.state.labelVerifyCode == false
                          ? responsiveFontSize(2.1)
                          : responsiveFontSize(1.8),
                    }}
                    placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                    placeholder={this.state.placeHolderVerifyCode}
                    value={this.state.messageVerifyCode}
                    onChangeText={messageVerifyCode =>
                      this.setState({messageVerifyCode})
                    }
                    onFocus={() => {
                      this.setState({
                        labelVerifyCode: true,
                        placeHolderVerifyCode: '',
                      });
                    }}
                    onEndEditing={() => {
                      this.state.messageVerifyCode == ''
                        ? this.setState({
                            labelVerifyCode: false,
                            placeHolderVerifyCode: strings(this.global.locale)
                              .VerifyCode,
                          })
                        : () => {};
                    }}
                    keyboardType={'number-pad'}
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
                disabled={this.state.isLoadingVerify == true ? true : false}
                onPress={() => {
                  if (this.state.messageVerifyCode.length == 6) {
                    this.setState({isLoadingVerify: true});
                    Axios.post('https://beheene.com/api/v1/register_active', {
                      mobile: this.state.mobile,
                      active_code: this.state.messageVerifyCode,
                    })
                      .then(response => {
                        console.warn(response);
                        if (response.data.status == 200) {
                          this.props.navigation.navigate('_ChangePassword', {
                            mobile: this.state.mobile,
                            token: response.data.token,
                          });
                        } else {
                          this.RBSheetError.open();
                          setTimeout(() => {
                            try {
                              this.RBSheetError.close();
                            } catch {
                              () => {};
                            }
                          }, 2000);
                        }
                      })
                      .catch(error => {
                        this._spring();
                      })
                      .finally(() => {
                        this.setState({isLoadingVerify: false});
                      });
                  } else {
                    this.RBSheetError.open();
                    setTimeout(() => {
                      try {
                        this.RBSheetError.close();
                      } catch {
                        () => {};
                      }
                    }, 2000);
                  }
                }}>
                {this.state.isLoadingVerify == true ? (
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
                    {strings(this.global.locale).Verify}
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
export {VerifyCodeForgot};

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

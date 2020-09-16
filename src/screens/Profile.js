import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-picker';
import {colors, strings, elevations, fonts} from '../globals';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfOrders: 0,
      avatarSource: null,
      isLoading: true,
      isConnected: undefined,
      isUpLoading: false,
      user: [
        {
          mobile: 'شماره همراه',
          name: 'نام و نام خانوادگی',
          imageProfile: '',
          addresses: [],
          comments: [],
          count_orders: 0,
          imageProfile: 'https://beheene.com/img/Profile.png',
        },
      ],
      filePath: {},
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    // Add navigation listeners
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        if (this.global.token) {
          this.userLoad();
        } else {
          this.setState({isLoading: false});
        }
      },
    );

    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
    if (this.global.token) {
      this.userLoad();
    } else {
      this.setState({isLoading: false});
    }
    ///////////////////Permissions
    if (Platform.OS == 'android') {
      this.AndroidPermiss();
    } else {
      this.IOSPermiss();
    }
  }

  userLoad() {
    const api = 'https://www.beheene.com/api/v1/user';

    Axios.post(
      api,
      {mobile: `${this.global.mobile}`},
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setState({user: response.data.data});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  //--------------------Permissions--------------------
  AndroidPermiss() {
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });

    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  }

  //--------------------Permissions--------------------
  IOSPermiss() {
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
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

  chooseFileCamera = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  chooseFileGallery = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  //--------------------Image Bottom Sheet--------------------
  bottomSheetImage() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(65),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheetImage = ref;
        }}
        duration={250}
        closeOnDragDown={true}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/*----------Image----------*/}
          <View
            style={{
              width: responsiveHeight(28),
              height: responsiveHeight(28),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              style={{
                height: responsiveHeight(28),
                width: responsiveHeight(28),
                resizeMode: 'cover',
                borderRadius: 100,
              }}
              source={require('../Image/39.png')}>
              <Image
                style={{
                  height: responsiveHeight(28),
                  width: responsiveHeight(28),
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                }}
              />
            </ImageBackground>
          </View>
          {/*----------Touchable Camera----------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
              marginHorizontal: responsiveWidth(4),
              marginTop: responsiveHeight(2),
            }}
            onPress={this.chooseFileCamera.bind(this)}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).Camera}
            </Text>
          </TouchableOpacity>
          {/*----------Touchable Chose From Gallery----------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
              marginHorizontal: responsiveWidth(4),
              marginTop: responsiveHeight(2),
            }}
            onPress={this.chooseFileGallery.bind(this)}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).ChooseFromGallery}
            </Text>
          </TouchableOpacity>
          {/*----------Touchable Save----------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
              marginHorizontal: responsiveWidth(4),
              marginVertical: responsiveHeight(2),
            }}
            disabled={this.state.isUpLoading == true ? true : false}
            onPress={() => {
              this.setState({isUpLoading: true});

              const image = new FormData();
              image.append('image', {
                name: `${this.state.filePath.fileName}`,
                type: `${this.state.filePath.type}`,
                uri: `${this.state.filePath.uri}`,
              });
              image.append('mobile', `${this.global.mobile}`);

              Axios.post('https://beheene.com/api/v1/uploadImage', image, {
                headers: {
                  Authorization: `${this.global.token}`,
                  'Content-Type': 'multipart/form-data',
                  Accept: 'application/json',
                },
              })
                .then(response => {
                  console.warn(response);
                  this.setState({isUpLoading: false}, () => {
                    this.RBSheetImage.close();
                    this.userLoad();
                  });
                })
                .catch(error => {
                  this._spring();
                })
                .finally(() => {});
            }}>
            {this.state.isUpLoading == true ? (
              <ActivityIndicator
                size={'small'}
                color={colors(this.global.theme).WHITE}
              />
            ) : (
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).Save}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  //--------------------Sign Out Bottom Sheet--------------------
  bottomSheetSignOut() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(24),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheetSignOut = ref;
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
          <View
            style={{
              height: responsiveHeight(8),
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
              {strings(this.global.locale).DoYouWantToSignOutOfYourAccount}
            </Text>
          </View>
          <View
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: responsiveHeight(2),
            }}>
            {/*----------Touchable No----------*/}
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors(this.global.theme).RED_ONE,
                borderRadius: 100,
                marginHorizontal: responsiveWidth(4),
              }}
              onPress={() => {
                this.RBSheetSignOut.close();
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).No}
              </Text>
            </TouchableOpacity>
            {/*----------Touchable Yes----------*/}
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors(this.global.theme).RED_ONE,
                borderRadius: 100,
                marginHorizontal: responsiveWidth(4),
              }}
              onPress={() => {
                this.RBSheetSignOut.close();
                AsyncStorage.clear();
                this.setGlobal({token: '', mobile: '', bagCount: 0}, () => {
                  this.props.navigation.navigate('_Landing');
                });
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).WHITE,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).Yes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    );
  }

  render() {
    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Loading />;
      } else {
        return (
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).GRAY_ONE,
            }}>
            {this.bottomSheetImage()}
            {this.bottomSheetSignOut()}
            <StatusBar
              backgroundColor={colors(this.global.theme).GRAY_ONE}
              barStyle="dark-content"
            />
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
                  this.setGlobal({isLanding: false}, () => {
                    this.props.navigation.navigate('_Search');
                  });
                }}>
                <Image
                  style={{
                    width: responsiveHeight(4),
                    height: responsiveHeight(4),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/17.png')}
                />
              </TouchableOpacity>
              {/*----------Header Text----------*/}
              <View
                style={{
                  flex: 3,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              {/*----------Go Back----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: responsiveWidth(4),
                }}>
                <Image
                  style={{
                    width: responsiveHeight(6),
                    height: responsiveHeight(6),
                    resizeMode: 'center',
                  }}
                  source={require('../Image/35.png')}
                />
              </View>
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
                  marginBottom: responsiveHeight(10),
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
                    {strings(this.global.locale).MyProfile}
                  </Text>
                </View>
                {/*--------------------Image, Name And Phone Number--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(12),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                    marginBottom: responsiveHeight(2),
                  }}>
                  {/*----------Name And Phone Number---------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          lineHeight: responsiveHeight(4),
                          marginBottom: responsiveHeight(1),
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.global.token ? this.state.user.name : 'کاربر مهمان'}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          lineHeight: responsiveHeight(4),
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.global.token
                        ? this.state.user.mobile
                        : 'شماره همراه'}
                    </Text>
                  </View>
                  {/*----------User Picture---------*/}
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(12),
                      width: responsiveHeight(12),
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      marginLeft: responsiveWidth(4),
                    }}
                    onPress={() => {
                      this.global.token
                        ? this.RBSheetImage.open()
                        : this.setGlobal({isLanding: false}, () => {
                            this.props.navigation.navigate('_SignUp');
                          });
                    }}>
                    <Image
                      source={
                        this.global.token
                          ? {
                              uri:
                                this.state.user.imageProfile ==
                                'https://www.beheene.com'
                                  ? 'https://beheene.com/img/Profile.png'
                                  : this.state.user.imageProfile,
                            }
                          : require('../Image/21.png')
                      }
                      style={{
                        height: responsiveHeight(12),
                        width: responsiveHeight(12),
                        resizeMode: 'cover',
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {/*--------------------Sign Up--------------------*/}
                {this.global.token ? (
                  () => {}
                ) : (
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(10),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: colors(this.global.theme).GRAY_ONE,
                      flexDirection: 'row-reverse',
                      //borderTopWidth: responsiveHeight(0.1),
                      borderBottomWidth: responsiveHeight(0.1),
                      borderColor: colors(this.global.theme).GRAY_SIX,
                      marginBottom: responsiveHeight(0.1),
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('_SignUp');
                    }}>
                    {/*----------Text----------*/}
                    <View
                      style={{
                        flex: 3,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingRight: responsiveWidth(4),
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {strings(this.global.locale).SignUp}
                      </Text>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_SIX,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}>
                        {strings(this.global.locale).SignUpOrLogin}
                      </Text>
                    </View>
                    {/*----------Image----------*/}
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: responsiveWidth(4),
                      }}>
                      <Image
                        style={{
                          width: responsiveHeight(2),
                          height: responsiveHeight(2),
                          tintColor: colors(this.global.theme).GRAY_SIX,
                          resizeMode: 'center',
                        }}
                        source={require('../Image/24.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}

                {/*--------------------My Orders--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    //borderTopWidth: responsiveHeight(0.1),
                    borderBottomWidth: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                    marginBottom: responsiveHeight(0.1),
                  }}
                  onPress={() => {
                    this.global.token
                      ? this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_MyOrders');
                        })
                      : this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_SignUp');
                        });
                  }}>
                  {/*----------Text----------*/}
                  <View
                    style={{
                      flex: 3,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: responsiveWidth(4),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).MyOrders}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.global.token ? this.state.user.count_orders : 0}{' '}
                      {strings(this.global.locale).AlreadyHave12Orders}
                    </Text>
                  </View>
                  {/*----------Image----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: responsiveWidth(4),
                    }}>
                    <Image
                      style={{
                        width: responsiveHeight(2),
                        height: responsiveHeight(2),
                        tintColor: colors(this.global.theme).GRAY_SIX,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
                {/*--------------------Shipping Addresses--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    //borderTopWidth: responsiveHeight(0.1),
                    borderBottomWidth: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                    marginBottom: responsiveHeight(0.1),
                  }}
                  onPress={() => {
                    this.global.token
                      ? this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_ShippingAddresses');
                        })
                      : this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_SignUp');
                        });
                  }}>
                  {/*----------Text----------*/}
                  <View
                    style={{
                      flex: 3,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: responsiveWidth(4),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).ShippingAddresses}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.global.token ? this.state.user.count_addresses : 0}{' '}
                      {strings(this.global.locale).Addresses}
                    </Text>
                  </View>
                  {/*----------Image----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: responsiveWidth(4),
                    }}>
                    <Image
                      style={{
                        width: responsiveHeight(2),
                        height: responsiveHeight(2),
                        tintColor: colors(this.global.theme).GRAY_SIX,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
                {/*--------------------My Reviews--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    //borderTopWidth: responsiveHeight(0.1),
                    borderBottomWidth: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                    marginBottom: responsiveHeight(0.1),
                  }}
                  onPress={() => {
                    this.global.token
                      ? this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_MyComments');
                        })
                      : this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_SignUp');
                        });
                  }}>
                  {/*----------Text----------*/}
                  <View
                    style={{
                      flex: 3,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: responsiveWidth(4),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).MyReviews}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.global.token ? this.state.user.count_comments : 0}{' '}
                      {strings(this.global.locale).ReviewsFor4Items}
                    </Text>
                  </View>
                  {/*----------Image----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: responsiveWidth(4),
                    }}>
                    <Image
                      style={{
                        width: responsiveHeight(2),
                        height: responsiveHeight(2),
                        tintColor: colors(this.global.theme).GRAY_SIX,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
                {/*--------------------Setting--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    //borderTopWidth: responsiveHeight(0.1),
                    //borderBottomWidth: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                    marginBottom: responsiveHeight(0.1),
                  }}
                  onPress={() => {
                    this.global.token
                      ? this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_Settings', {
                            name: this.state.user.name,
                            //birthDate: this.state.user.birthDate,
                          });
                        })
                      : this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_SignUp');
                        });
                  }}>
                  {/*----------Text----------*/}
                  <View
                    style={{
                      flex: 3,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: responsiveWidth(4),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).Settings}
                    </Text>
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
                  {/*----------Image----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: responsiveWidth(4),
                    }}>
                    <Image
                      style={{
                        width: responsiveHeight(2),
                        height: responsiveHeight(2),
                        tintColor: colors(this.global.theme).GRAY_SIX,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
                {/*--------------------Log Out--------------------*/}
                {this.global.token ? (
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(10),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      backgroundColor: colors(this.global.theme).GRAY_ONE,
                      flexDirection: 'row-reverse',
                      borderTopWidth: responsiveHeight(0.1),
                      //borderBottomWidth: responsiveHeight(0.1),
                      borderColor: colors(this.global.theme).GRAY_SIX,
                      marginBottom: responsiveHeight(0.1),
                    }}
                    onPress={() => {
                      this.RBSheetSignOut.open();
                    }}>
                    {/*----------Text----------*/}
                    <View
                      style={{
                        flex: 3,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingRight: responsiveWidth(4),
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {strings(this.global.locale).SignOut}
                      </Text>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_SIX,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}>
                        {strings(this.global.locale).SignOutOfAccount}
                      </Text>
                    </View>
                    {/*----------Image----------*/}
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: responsiveWidth(4),
                      }}>
                      <Image
                        style={{
                          width: responsiveHeight(2),
                          height: responsiveHeight(2),
                          tintColor: colors(this.global.theme).GRAY_SIX,
                          resizeMode: 'center',
                        }}
                        source={require('../Image/24.png')}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  () => {}
                )}
              </ScrollView>
            </View>
          </View>
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
                isLoading: true,
              });
            });
            if (this.global.token) {
              this.userLoad();
            } else {
              this.setState({isLoading: false});
            }
          }}
        />
      );
    }
  }
}
export {Profile};

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

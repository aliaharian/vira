import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  SafeAreaView,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import {Marker, ProviderPropType} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Axios from 'axios';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import RBSheet from 'react-native-raw-bottom-sheet';

class AddingShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFullName: '',
      labelFullName: false,
      placeHolderFullName: strings(this.global.locale).AddressName,
      messageAddress: '',
      labelAddress: false,
      placeHolderAddress: strings(this.global.locale).Address,
      messagePostalCode: '',
      labelPostalCode: false,
      placeHolderPostalCode: strings(this.global.locale).PostalCode,
      isLoading: true,
      isConnected: undefined,
      provinceAddress: '',
      provinces: [],
      provinceId: '',
      cityAddress: '',
      cities: [],
      cityId: '',
      heightOfTextInput: responsiveHeight(8),

      userLocation: {
        latitude: 35.702183,
        longitude: 51.377793,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      newLocation: {
        latitude: 35.702183,
        longitude: 51.377793,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      isValidLocation: false,
      marginBottom: 1,
      locationError: false,
      newLatitude: 35.702183,
      newLongitude: 51.377793,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.locationPermission();
    ///////////////////NetInfo
    NetInfo.fetch().then((state) => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
    this.provinceLoad();
  }

  provinceLoad() {
    const apiProvince = 'https://beheene.com/api/v1/provinces';

    Axios.get(apiProvince)
      .then((response) => {
        this.setState({provinces: response.data.provinces});
        this.cityLoad();
      })
      .catch((error) => {
        this._spring();
      })
      .finally(() => {});
  }

  cityLoad() {
    const apiCity = 'https://beheene.com/api/v1/cities';

    Axios.get(apiCity)
      .then((response) => {
        this.setState({cities: response.data.cities});
      })
      .catch((error) => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  locationPermission() {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(() => {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then((data) => {
              this.getLocation();
            })
            .catch((err) => {
              this.setState({isValidLocation: false, locationError: true});
            });
        })
        .catch((error) => {
          console.warn(error);
          this.setState({isValidLocation: false, locationError: true});
        });
    } else this.getLocation();
  }

  getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('position found: ', position);
        var marker = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        this.setState({
          userLocation: marker,
          isValidLocation: true,
          locationError: false,
          newLatitude: position.coords.latitude,
          newLongitude: position.coords.longitude,
        });
        setTimeout(() => {
          if (this.map) this.map.animateToRegion(marker);
        }, 300);
      },
      (error) => {
        console.log('location error: ', error);
        this.setState({isValidLocation: false, locationError: true});
      },
      {timeout: 20000, maximumAge: 1000},
    );
  };

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

  search() {
    return this.state.cities.filter((item) => {
      return item.province_id == this.state.provinceId;
    });
  }

  MenuProvinces() {
    return (
      <Menu
        ref={(MenuProvince) => {
          this.MenuProvince = MenuProvince;
        }}
        style={{
          width: Dimensions.get('screen').width - responsiveWidth(8),
          height: 3 * this.state.heightOfTextInput,
          borderRadius: responsiveWidth(1),
          backgroundColor: colors(this.global.theme).WHITE,
          marginLeft: responsiveWidth(4.05),
          marginTop: -0.043 * this.state.heightOfTextInput,
        }}
        animationDuration={0}
        children={
          <FlatList
            style={{
              flex: 1,
              alignSelf: 'stretch',
            }}
            data={this.state.provinces}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginVertical: responsiveHeight(1),
                    marginRight: responsiveWidth(4),
                  }}
                  onPress={() => {
                    this.setState(
                      {provinceAddress: item.name, provinceId: item.id},
                      () => {
                        try {
                          this.MenuProvince.hide();
                        } catch {
                          () => {};
                        }
                      },
                    );
                  }}>
                  <Text
                    style={[
                      {
                        marginLeft: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}></FlatList>
        }></Menu>
    );
  }

  MenuCities() {
    return (
      <Menu
        ref={(MenuCity) => {
          this.MenuCity = MenuCity;
        }}
        style={{
          width: Dimensions.get('screen').width - responsiveWidth(8),
          height: 3 * this.state.heightOfTextInput,
          borderRadius: responsiveWidth(1),
          backgroundColor: colors(this.global.theme).WHITE,
          marginLeft: responsiveWidth(4.05),
          marginTop: -0.043 * this.state.heightOfTextInput,
        }}
        animationDuration={0}
        children={
          <FlatList
            style={{
              flex: 1,
              alignSelf: 'stretch',
            }}
            data={this.search()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginVertical: responsiveHeight(1),
                    marginRight: responsiveWidth(4),
                  }}
                  onPress={() => {
                    this.setState(
                      {cityAddress: item.name, cityId: item.id},
                      () => {
                        try {
                          this.MenuCity.hide();
                        } catch {
                          () => {};
                        }
                      },
                    );
                  }}>
                  <Text
                    style={[
                      {
                        marginLeft: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}></FlatList>
        }></Menu>
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
        ref={(ref) => {
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

  //--------------------Field Bottom Sheet--------------------
  bottomSheetCity() {
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
        ref={(ref) => {
          this.RBSheetCity = ref;
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
              {strings(this.global.locale).FirstSelectTheProvince}
            </Text>
          </View>
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
            {this.bottomSheetField()}
            {this.bottomSheetCity()}
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
              style={[
                {
                  height: responsiveHeight(8),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                  zIndex: 1,
                  flexDirection: 'row',
                },
                elevations(this.global.shadow).TAB,
              ]}>
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
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  {strings(this.global.locale).AddingShippingAddress}
                </Text>
              </View>
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
            <ScrollView
              style={{flex: 1, alignSelf: 'stretch'}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                }}>
                {/*--------------------Full Name Text Input--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    marginTop: responsiveHeight(1),
                  }}
                  onLayout={(e) => {
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
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelFullName == true ? (
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
                          {strings(this.global.locale).AddressName}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                    <TextInput
                      ref={(inputFullName) => {
                        this.inputFullName = inputFullName;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelFullName == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderFullName}
                      value={this.state.messageFullName}
                      onChangeText={(messageFullName) =>
                        this.setState({messageFullName})
                      }
                      onFocus={() => {
                        this.setState({
                          labelFullName: true,
                          placeHolderFullName: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messageFullName == ''
                          ? this.setState({
                              labelFullName: false,
                              placeHolderFullName: strings(this.global.locale)
                                .AddressName,
                            })
                          : () => {};
                      }}
                      //onSubmitEditing={() => this.inputAddress.focus()}
                    />
                  </View>
                </View>
                {/*--------------------Province Menu--------------------*/}
                <View
                  style={{
                    height: this.state.heightOfTextInput,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    marginTop: responsiveHeight(1),
                  }}>
                  <TouchableOpacity
                    style={[
                      {
                        height:
                          this.state.heightOfTextInput - responsiveHeight(2),
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors(this.global.theme).WHITE,
                        marginHorizontal: responsiveWidth(4),
                        paddingHorizontal: responsiveWidth(4),
                        borderRadius: responsiveWidth(1),
                        paddingTop:
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : 0,
                        flexDirection: 'row-reverse',
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}
                    onPress={() => {
                      this.MenuProvince.show();
                    }}>
                    <View
                      style={{
                        flex: 0.00001,
                        alignSelf: 'stretch',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                      }}>
                      {this.MenuProvinces()}
                    </View>
                    <View
                      style={{
                        flex: 8,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      {this.state.provinceAddress == '' ? (
                        <Text
                          style={{
                            color: colors(this.global.theme).GRAY_SIX,
                            fontFamily: 'IRANSansMobile(FaNum)',
                            fontWeight: '300',
                            fontSize: responsiveFontSize(2.1),
                          }}>
                          {strings(this.global.locale).Province}
                        </Text>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              position: 'absolute',
                              top: responsiveHeight(-0.5),
                              right: responsiveWidth(1),
                              zIndex: 1,
                            }}>
                            <Text
                              style={[
                                {
                                  color: colors(this.global.theme).GRAY_SIX,
                                },
                                fonts(this.global.SizeAndWeight).FIRST,
                              ]}>
                              {strings(this.global.locale).Province}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              marginRight: responsiveWidth(1),
                            }}>
                            <Text
                              style={{
                                color: colors(this.global.theme).GRAY_EIGHT,
                                fontFamily: 'IRANSansMobile(FaNum)',
                                fontWeight: '300',
                                fontSize: responsiveFontSize(1.8),
                              }}>
                              {this.state.provinceAddress}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: responsiveHeight(2),
                          height: responsiveHeight(2),
                          tintColor: colors(this.global.theme).GRAY_SIX,
                          resizeMode: 'center',
                        }}
                        source={require('../Image/37.png')}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
                {/*--------------------City Menu--------------------*/}
                <View
                  style={{
                    height: this.state.heightOfTextInput,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    marginTop: responsiveHeight(1),
                  }}>
                  <TouchableOpacity
                    style={[
                      {
                        height:
                          this.state.heightOfTextInput - responsiveHeight(2),
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors(this.global.theme).WHITE,
                        marginHorizontal: responsiveWidth(4),
                        paddingHorizontal: responsiveWidth(4),
                        borderRadius: responsiveWidth(1),
                        paddingTop:
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelFullName == false
                            ? responsiveHeight(0.5)
                            : 0,
                        flexDirection: 'row-reverse',
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}
                    onPress={() => {
                      if (this.state.provinceAddress == '') {
                        this.RBSheetCity.open();
                        setTimeout(() => {
                          try {
                            this.RBSheetCity.close();
                          } catch {
                            () => {};
                          }
                        }, 2000);
                      } else {
                        this.MenuCity.show();
                      }
                    }}>
                    <View
                      style={{
                        flex: 0.00001,
                        alignSelf: 'stretch',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                      }}>
                      {this.MenuCities()}
                    </View>
                    <View
                      style={{
                        flex: 8,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      {this.state.cityAddress == '' ? (
                        <Text
                          style={{
                            color: colors(this.global.theme).GRAY_SIX,
                            fontFamily: 'IRANSansMobile(FaNum)',
                            fontWeight: '300',
                            fontSize: responsiveFontSize(2.1),
                          }}>
                          {strings(this.global.locale).City}
                        </Text>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              position: 'absolute',
                              top: responsiveHeight(-0.5),
                              right: responsiveWidth(1),
                              zIndex: 1,
                            }}>
                            <Text
                              style={[
                                {
                                  color: colors(this.global.theme).GRAY_SIX,
                                },
                                fonts(this.global.SizeAndWeight).FIRST,
                              ]}>
                              {strings(this.global.locale).City}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              marginRight: responsiveWidth(1),
                            }}>
                            <Text
                              style={{
                                color: colors(this.global.theme).GRAY_EIGHT,
                                fontFamily: 'IRANSansMobile(FaNum)',
                                fontWeight: '300',
                                fontSize: responsiveFontSize(1.8),
                              }}>
                              {this.state.cityAddress}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: responsiveHeight(2),
                          height: responsiveHeight(2),
                          tintColor: colors(this.global.theme).GRAY_SIX,
                          resizeMode: 'center',
                        }}
                        source={require('../Image/37.png')}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
                {/*--------------------Address Text Input--------------------*/}
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
                          this.state.labelAddress == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelAddress == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelAddress == true ? (
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
                          {strings(this.global.locale).Address}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                    <TextInput
                      ref={(inputAddress) => {
                        this.inputAddress = inputAddress;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelAddress == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderAddress}
                      value={this.state.messageAddress}
                      onChangeText={(messageAddress) =>
                        this.setState({messageAddress})
                      }
                      onFocus={() => {
                        this.setState({
                          labelAddress: true,
                          placeHolderAddress: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messageAddress == ''
                          ? this.setState({
                              labelAddress: false,
                              placeHolderAddress: strings(this.global.locale)
                                .Address,
                            })
                          : () => {};
                      }}
                      onSubmitEditing={() => this.inputCity.focus()}
                    />
                  </View>
                </View>
                {/*--------------------Postal Code Text Input--------------------*/}
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
                          this.state.labelPostalCode == false
                            ? responsiveHeight(0.5)
                            : responsiveHeight(1),
                        paddingBottom:
                          this.state.labelPostalCode == false
                            ? responsiveHeight(0.5)
                            : 0,
                      },
                      elevations(this.global.shadow).FAVORITES,
                    ]}>
                    {this.state.labelPostalCode == true ? (
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
                          {strings(this.global.locale).PostalCode}
                        </Text>
                      </View>
                    ) : (
                      () => {}
                    )}
                    <TextInput
                      ref={(inputPostalCode) => {
                        this.inputPostalCod = inputPostalCode;
                      }}
                      style={{
                        alignSelf: 'stretch',
                        textAlign: 'right',
                        fontFamily: 'IRANSansMobile(FaNum)',
                        fontWeight: '300',
                        fontSize:
                          this.state.labelPostalCode == false
                            ? responsiveFontSize(2.1)
                            : responsiveFontSize(1.8),
                      }}
                      placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                      placeholder={this.state.placeHolderPostalCode}
                      value={this.state.messagePostalCode}
                      onChangeText={(messagePostalCode) =>
                        this.setState({messagePostalCode})
                      }
                      onFocus={() => {
                        this.setState({
                          labelPostalCode: true,
                          placeHolderPostalCode: '',
                        });
                      }}
                      onEndEditing={() => {
                        this.state.messagePostalCode == ''
                          ? this.setState({
                              labelPostalCode: false,
                              placeHolderPostalCode: strings(this.global.locale)
                                .PostalCode,
                            })
                          : () => {};
                      }}
                      keyboardType={'number-pad'}
                    />
                  </View>
                </View>
                {/*--------------------Yarn Add React Native Map--------------------*/}
                <View
                  style={[
                    {
                      height: responsiveHeight(40),
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: responsiveWidth(4),
                      borderRadius: responsiveWidth(1),
                      backgroundColor: colors(this.global.theme).WHITE,
                      marginTop: responsiveHeight(1),
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}>
                  <MapView
                    style={{
                      height: responsiveHeight(40),
                      alignSelf: 'stretch',
                    }}
                    ref={(r) => {
                      this.map = r;
                    }}
                    provider={'google'}
                    initialRegion={this.state.newLocation}
                    region={this.state.newLocation}
                    showsUserLocation
                    showsMyLocationButton
                    rotateEnabled={false}
                    onMapReady={() => {
                      this.setState({marginBottom: 0});
                    }}
                    onRegionChangeComplete={(region) => {
                      this.setState({newLocation: region});
                    }}
                    onLongPress={(e) => {
                      console.warn(e.nativeEvent);
                      console.warn(e.nativeEvent.coordinate.longitude);
                      console.warn(e.nativeEvent.coordinate.latitude);
                      this.setState({
                        newLongitude: e.nativeEvent.coordinate.longitude,
                        newLatitude: e.nativeEvent.coordinate.latitude,
                      });
                    }}>
                    <Marker
                      coordinate={{
                        latitude: this.state.newLatitude,
                        longitude: this.state.newLongitude,
                      }}
                      onDragEnd={(e) => {
                        console.warn(e.nativeEvent);
                        console.warn(e.nativeEvent.coordinate.longitude);
                        console.warn(e.nativeEvent.coordinate.latitude);
                        this.setState({
                          newLongitude: e.nativeEvent.coordinate.longitude,
                          newLatitude: e.nativeEvent.coordinate.latitude,
                        });
                      }}
                      draggable></Marker>
                  </MapView>
                </View>
                {/*--------------------Save Address--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(8),
                    alignSelf: 'stretch',
                    marginHorizontal: responsiveWidth(4),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors(this.global.theme).RED_ONE,
                    borderRadius: 100,
                    marginVertical: responsiveHeight(2),
                  }}
                  onPress={() => {
                    if (
                      this.state.messageFullName == '' ||
                      this.state.messageAddress == '' ||
                      this.state.messagePostalCode == '' ||
                      this.state.cityAddress == '' ||
                      this.state.provinceId == '' ||
                      this.state.cityId == ''
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
                      Axios.post(
                        'https://beheene.com/api/v1/add_address',
                        {
                          mobile: `${this.global.mobile}`,
                          fullName: this.state.messageFullName,
                          address: this.state.messageAddress,
                          postalCode: this.state.messagePostalCode,
                          cityName: this.state.cityAddress,
                          province_id: this.state.provinceId,
                          city_id: this.state.cityId,
                          latitude: this.state.newLatitude,
                          longitude: this.state.newLongitude,
                        },
                        {
                          headers: {
                            Authorization: `${this.global.token}`,
                          },
                        },
                      )
                        .then((response) => {})
                        .catch((error) => {
                          this._spring();
                        })
                        .finally(() => {
                          this.props.navigation.navigate('_ShippingAddresses');
                        });
                    }
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).WHITE,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {strings(this.global.locale).SaveAddress}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <Net
          onPress={() => {
            ///////////////////NetInfo
            NetInfo.fetch().then((state) => {
              this.setState({
                isConnected: state.isConnected,
                isLoading: true,
              });
            });
            this.provinceLoad();
          }}></Net>
      );
    }
  }
}
export {AddingShippingAddress};

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

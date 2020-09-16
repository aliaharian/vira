import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {BagCard, Loading, Net} from '../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import NetInfo from '@react-native-community/netinfo';

class Bag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: '',
      isSend: false,
      isLoading: true,
      isConnected: undefined,
      bag: [],
      ok: false,
      promoCodeIsOk: true,
      promoCodeResponse: '',
      favoriteStatus: '',
      shippingAddresses: [],
      isLoadingCheckOut: false,
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
    if (this.global.token) {
      this.bagLoad();
    } else {
      this.setState({bag: [], isLoading: false});
    }
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
        this.setState({bag: response.data.data});
      })
      .catch(error => {
        this.setState({bag: []});
        //this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
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

  //--------------------Favorite Bottom Sheet--------------------
  bottomSheetFavorite() {
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
          this.RBSheetFavorite = ref;
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
              {this.state.favoriteStatus}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  //--------------------Check Out Bottom Sheet--------------------
  bottomSheetCheckOut() {
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
          this.RBSheetCheckOut = ref;
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
              {strings(this.global.locale).YourShippingAddressesListIsEmpty}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  render() {
    const api = 'https://beheene.com/api/v1/discount';

    let TPrice = 0;
    this.state.bag.forEach(item => {
      if (item.areaOrCount == 'متراژی') {
        TPrice += (item.price * item.quantity) / item.area;
      } else {
        TPrice += item.price * item.quantity;
      }
    });

    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Loading></Loading>;
      } else {
        if (this.state.bag.length == 0) {
          return (
            <View
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
                    source={require('../Image/35.png')}></Image>
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
                      {strings(this.global.locale).MyBag}
                    </Text>
                  </View>
                  {/*--------------------Text There Is Nothing--------------------*/}
                  <View
                    style={{
                      flex: 1,
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
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).YourShoppingCartIsEmpty}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          );
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
              {this.bottomSheetFavorite()}
              {this.bottomSheetCheckOut()}
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
                    source={require('../Image/35.png')}></Image>
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
                      {strings(this.global.locale).MyBag}
                    </Text>
                  </View>
                  {/*--------------------Products--------------------*/}
                  <FlatList
                    style={{flex: 1, alignSelf: 'stretch'}}
                    data={this.state.bag}
                    renderItem={({item, index}) => {
                      return (
                        <BagCard
                          name={item.title}
                          uri={item.thumbnail}
                          isArea={item.areaOrCount == 'متراژی' ? true : false}
                          price={item.price}
                          counter={item.quantity}
                          onPressF={() => {
                            Axios.post(
                              'https://beheene.com/api/v1/add_favorite',
                              {
                                mobile: `${this.global.mobile}`,
                                code: item.code,
                              },
                              {
                                headers: {
                                  Authorization: `${this.global.token}`,
                                },
                              },
                            )
                              .then(response => {
                                this.setState(
                                  {
                                    favoriteStatus: response.data.message,
                                  },
                                  () => {
                                    this.RBSheetFavorite.open();
                                    setTimeout(() => {
                                      try {
                                        this.RBSheetFavorite.close();
                                      } catch {
                                        () => {};
                                      }
                                    }, 2000);
                                  },
                                );
                              })
                              .catch(error => {
                                this._spring();
                              })
                              .finally(() => {});
                          }}
                          onPressD={() => {
                            Axios.post(
                              'https://www.beheene.com/api/v1/cart/delete',
                              {
                                mobile: `${this.global.mobile}`,
                                cart_id: item.cart_id,
                              },
                              {
                                headers: {
                                  Authorization: `${this.global.token}`,
                                },
                              },
                            )
                              .then(response => {
                                this.setGlobal({
                                  bagCount: this.global.bagCount - 1,
                                });
                                this.setState({isLoading: true}, () => {
                                  this.bagLoad();
                                });
                              })
                              .catch(error => {
                                this._spring();
                              })
                              .finally(() => {});
                          }}></BagCard>
                      );
                    }}
                    keyExtractor={item => item}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}></FlatList>
                  {/*--------------------Promo Code--------------------*/}
                  <View
                    style={{
                      height: responsiveHeight(8),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: responsiveHeight(1),
                      marginBottom: responsiveHeight(2),
                      marginHorizontal: responsiveWidth(4),
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: responsiveHeight(8),
                        width: responsiveHeight(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors(this.global.theme).WHITE,
                        borderBottomLeftRadius:
                          this.global.isSend == false
                            ? 100
                            : responsiveWidth(3),
                        borderTopLeftRadius:
                          this.global.isSend == false
                            ? 100
                            : responsiveWidth(3),
                      }}>
                      <TouchableOpacity
                        style={{
                          height: responsiveHeight(8),
                          width: responsiveHeight(8),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            this.global.isSend == false
                              ? colors(this.global.theme).GRAY_EIGHT
                              : colors(this.global.theme).WHITE,
                          borderRadius: 100,
                        }}
                        onPress={() => {
                          this.global.isSend == true
                            ? this.setGlobal({
                                promoCode: '',
                                isSend: !this.global.isSend,
                              })
                            : this.setGlobal({isSend: !this.global.isSend});
                          Axios.post(api, {
                            discount: this.global.promoCode,
                          })
                            .then(response => {
                              this.setGlobal(
                                {
                                  promoCodeResponse: response.data.data,
                                },
                                () => {
                                  this.setState({
                                    promoCodeResponse: response.data.data,
                                  });
                                },
                              );
                              console.warn(response.data.data);
                            })
                            .catch(error => {
                              this._spring();
                            })
                            .finally(() => {});
                        }}>
                        <Image
                          style={{
                            width: undefined,
                            height: undefined,
                            flex: 1,
                            alignSelf: 'stretch',
                            margin: responsiveHeight(2.5),
                            tintColor:
                              this.global.isSend == false
                                ? colors(this.global.theme).WHITE
                                : colors(this.global.theme).GRAY_SIX,
                            resizeMode: 'center',
                          }}
                          source={
                            this.global.isSend == false
                              ? require('../Image/29.png')
                              : require('../Image/30.png')
                          }></Image>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors(this.global.theme).WHITE,
                        borderBottomRightRadius: responsiveWidth(3),
                        borderTopRightRadius: responsiveWidth(3),
                      }}>
                      <TextInput
                        ref={PromoCodeInput => {
                          this.PromoCodeInput = PromoCodeInput;
                        }}
                        style={[
                          {
                            height: responsiveHeight(8),
                            alignSelf: 'stretch',
                            textAlign: 'right',
                            color: colors(this.global.theme).GRAY_EIGHT,
                            paddingRight: responsiveWidth(4),
                            textAlignVertical: 'center',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}
                        value={this.global.promoCode}
                        onChangeText={newPromoCode => {
                          this.setGlobal({promoCode: newPromoCode});
                        }}
                        placeholder={
                          strings(this.global.locale).EnterYourPromoCode
                        }
                        placeholderTextColor={
                          colors(this.global.theme).GRAY_SIX
                        }
                      />
                    </View>
                  </View>
                  {/*----------PromoCode Response----------*/}
                  <View
                    style={{
                      height: responsiveHeight(4),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginTop: responsiveHeight(1),
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        {
                          marginRight: responsiveWidth(4),
                          color: colors(this.global.theme).RED_TWO,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.global.promoCodeResponse
                        ? this.global.promoCodeResponse ==
                          'کد تخفیف نامعتبر است'
                          ? 'کد تخفیف نامعتبر است.'
                          : 'مبلغ ' +
                            this.global.promoCodeResponse +
                            ' تومان از جمع کل سبد خرید شما کم شد.'
                        : () => {}}
                    </Text>
                  </View>
                  {/*--------------------Total Amount--------------------*/}
                  <View
                    style={{
                      height: responsiveHeight(6),
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: responsiveWidth(4),
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 2,
                        alignSelf: 'stretch',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={[
                          {
                            marginRight: responsiveWidth(1),
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {strings(this.global.locale).Dollar}
                      </Text>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {this.global.promoCodeResponse
                          ? this.global.promoCodeResponse ==
                            'کد تخفیف نامعتبر است'
                            ? Number(TPrice.toFixed(0))
                            : Number(TPrice.toFixed(0)) -
                              Number(this.global.promoCodeResponse)
                          : Number(TPrice.toFixed(0))}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
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
                        {strings(this.global.locale).TotalAmount}
                      </Text>
                    </View>
                  </View>
                  {/*--------------------Check Out--------------------*/}
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
                    disabled={
                      this.state.isLoadingCheckOut == true ? true : false
                    }
                    onPress={() => {
                      this.setState({isLoadingCheckOut: true});
                      Axios.post(
                        'https://beheene.com/api/v1/addresses',
                        {mobile: `${this.global.mobile}`},
                        {
                          headers: {
                            Authorization: `${this.global.token}`,
                          },
                        },
                      )
                        .then(response => {
                          this.setState(
                            {shippingAddresses: response.data.data},
                            () => {
                              if (this.state.shippingAddresses.length == 0) {
                                this.RBSheetCheckOut.open();
                                setTimeout(() => {
                                  try {
                                    this.RBSheetCheckOut.close();
                                  } catch {
                                    () => {};
                                  }
                                }, 2000);
                              } else {
                                this.setGlobal({isLanding: false});
                                this.props.navigation.navigate('_CheckOut');
                              }
                            },
                          );
                        })
                        .catch(error => {
                          this._spring();
                        })
                        .finally(() => {
                          this.setState({isLoadingCheckOut: false});
                        });
                    }}>
                    {this.state.isLoadingCheckOut == true ? (
                      <ActivityIndicator
                        size={'small'}
                        color={
                          colors(this.global.theme).WHITE
                        }></ActivityIndicator>
                    ) : (
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).WHITE,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {strings(this.global.locale).CheckOut}
                      </Text>
                    )}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        }
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
              this.bagLoad();
            } else {
              this.setState({
                bag: [],
                isLoading: false,
                isConnected: undefined,
              });
            }
          }}></Net>
      );
    }
  }
}
export {Bag};

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

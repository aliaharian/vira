import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  TextInput,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Share from 'react-native-share';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {colors, strings, elevations, fonts} from '../globals';
import {RatingSingleCard} from '../components';
import {ProductRelated} from '../components/Product';
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import RBSheet from 'react-native-raw-bottom-sheet';

class SingleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      favoriteStatus: '',
      bagStatus: '',
      quantity: '1',
      zeroToEnd: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59',
        '60',
        '61',
        '62',
        '63',
        '64',
        '65',
        '66',
        '67',
        '68',
        '69',
        '70',
        '71',
        '72',
        '73',
        '74',
        '75',
        '76',
        '77',
        '78',
        '79',
        '80',
        '81',
        '82',
        '83',
        '84',
        '85',
        '86',
        '87',
        '88',
        '89',
        '90',
        '91',
        '92',
        '93',
        '94',
        '95',
        '96',
        '97',
        '98',
        '99',
        '100',
      ],
      messageArea: '',
      placeHolderArea: strings(this.global.locale).Area,
      isLoading: true,
      isConnected: undefined,
      ProductCode: this.props.navigation.getParam('code'),
      bag: [],
      favoriteProducts: [],
      images: [],
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
    this.reLoad();
  }

  reLoad() {
    const api = 'https://beheene.com/api/v1/product';

    Axios.post(api, {
      code: this.state.ProductCode,
    })
      .then(response => {
        this.setState({product: response.data.data[0]}, () => {
          if (this.state.product.images.length == 0) {
            let newImage = [];
            newImage.push({src: this.state.product.thumbnail});
            this.setState({images: newImage});
          } else {
            this.setState({images: this.state.product.images});
          }
        });
        if (this.global.token) {
          this.FavoriteLoad();
        } else {
          () => {};
        }
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  FavoriteLoad() {
    const FavoriteApi = 'https://beheene.com/api/v1/favoriteByCode';

    Axios.post(
      FavoriteApi,
      {mobile: `${this.global.mobile}`, code: this.state.ProductCode},
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setState({isFavorite: response.data.message});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
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

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  MenuQuantity() {
    return (
      <Menu
        ref={this.setMenuRef}
        style={{
          width: responsiveWidth(29.4),
          height: responsiveHeight(20),
          borderRadius: responsiveWidth(1),
          backgroundColor: colors(this.global.theme).WHITE,
        }}
        animationDuration={0}
        children={
          <FlatList
            style={{
              flex: 1,
              alignSelf: 'stretch',
            }}
            data={this.state.zeroToEnd}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: responsiveHeight(0.5),
                    //borderBottomWidth: responsiveHeight(0.1),
                    //borderColor: colors(this.global.theme).GRAY_SIX,
                  }}
                  onPress={() => {
                    this.setState({quantity: item}, this.hideMenu);
                  }}>
                  <Text
                    style={[
                      {
                        marginLeft: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item}
          />
        }
      />
    );
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

  //--------------------Bag Bottom Sheet--------------------
  bottomSheetBag() {
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
          this.RBSheetBag = ref;
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
              {this.state.bagStatus}
            </Text>
          </View>
        </View>
      </RBSheet>
    );
  }

  //--------------------Area Bottom Sheet--------------------
  bottomSheetArea() {
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
          this.RBSheetArea = ref;
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
              {strings(this.global.locale).EnterTheArea}
            </Text>
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
          <SafeAreaView
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).GRAY_ONE,
            }}>
            {this.bottomSheetFavorite()}
            {this.bottomSheetBag()}
            {this.bottomSheetArea()}
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
              {/*---------Share----------*/}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}
                onPress={() => {
                  let shareOptions = {
                    //title: 'a',
                    message: this.state.product.url_web,
                  };

                  Share.open(shareOptions)
                    .then(response =>
                      console.warn(JSON.stringify(response, null, 2)),
                    )
                    .catch(error => console.warn(error));
                }}>
                <Image
                  style={{
                    width: responsiveHeight(4),
                    height: responsiveHeight(4),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/23.png')}
                />
              </TouchableOpacity>
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
                  {this.state.product.category.length > 20
                    ? this.state.product.category.substring(0, 20) + '...'
                    : this.state.product.category}
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
                  source={require('../Image/16.png')}
                />
              </TouchableOpacity>
            </View>
            {/*--------------------Add To Card--------------------*/}
            <View
              style={[
                {
                  height: responsiveHeight(12),
                  width: Dimensions.get('window').width,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).WHITE,
                  zIndex: 1,
                  position: 'absolute',
                  bottom: 0,
                },
                elevations(this.global.shadow).FAVORITES,
              ]}>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(8),
                  alignSelf: 'stretch',
                  marginHorizontal: responsiveWidth(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).RED_ONE,
                  borderRadius: 100,
                }}
                onPress={() => {
                  if (this.global.token) {
                    if (this.state.product.areaOrCount == 'متراژی') {
                      if (this.state.messageArea == '') {
                        this.RBSheetArea.open();
                        setTimeout(() => {
                          try {
                            this.RBSheetArea.close();
                          } catch {
                            () => {};
                          }
                        }, 2000);
                      } else {
                        Axios.post(
                          'https://www.beheene.com/api/v1/cart/add',
                          {
                            mobile: `${this.global.mobile}`,
                            product_code: this.props.navigation.getParam(
                              'code',
                            ),
                            area: this.state.messageArea,
                          },
                          {
                            headers: {
                              Authorization: `${this.global.token}`,
                            },
                          },
                        )
                          .then(response => {
                            if (
                              response.data.message ==
                              'محصول موردنظر به سبد خرید اضافه شد'
                            ) {
                              this.setGlobal({
                                bagCount: this.global.bagCount + 1,
                              });
                            }
                            this.setState(
                              {
                                bagStatus: response.data.message,
                              },
                              () => {
                                this.RBSheetBag.open();
                                setTimeout(() => {
                                  try {
                                    this.RBSheetBag.close();
                                  } catch {
                                    () => {};
                                  }
                                }, 2000);
                              },
                            );
                          })
                          .catch(error => {
                            console.warn(error);
                            this._spring();
                          })
                          .finally(() => {});
                      }
                    } else {
                      Axios.post(
                        'https://www.beheene.com/api/v1/cart/add',
                        {
                          mobile: `${this.global.mobile}`,
                          product_code: this.props.navigation.getParam('code'),
                          quantity: this.state.quantity,
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
                              bagStatus: response.data.message,
                            },
                            () => {
                              this.RBSheetBag.open();
                              setTimeout(() => {
                                try {
                                  this.RBSheetBag.close();
                                } catch {
                                  () => {};
                                }
                              }, 2000);
                            },
                          );
                        })
                        .catch(error => {
                          console.warn(error);
                          this._spring();
                        })
                        .finally(() => {});
                    }
                  } else {
                    this.props.navigation.navigate('_SignUp');
                  }
                }}>
                <Text
                  style={[
                    {
                      marginRight: responsiveWidth(1),
                      color: colors(this.global.theme).WHITE,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).AddToCard}
                </Text>
              </TouchableOpacity>
            </View>
            {/*--------------------Bottom Part--------------------*/}
            <ScrollView
              style={{
                flex: 1,
                alignSelf: 'stretch',
                marginBottom: responsiveHeight(2),
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                }}>
                {/*--------------------Product Images--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(50),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FlatList
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      backgroundColor: colors(this.global.theme).GRAY_ONE,
                    }}
                    data={this.state.images}
                    renderItem={({item, index}) => {
                      if (index == 0) {
                        return (
                          <TouchableOpacity
                            style={{
                              height: responsiveHeight(50),
                              width: Dimensions.get('screen').width,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft:
                                index == this.state.images.length - 1
                                  ? 0
                                  : responsiveWidth(1),
                            }}
                            activeOpacity={0.9}
                            onPress={() => {
                              this.props.navigation.navigate('_Zoom', {
                                imageAddress: this.state.images,
                                witchPicture: index,
                              });
                            }}>
                            <Image
                              style={{
                                width: undefined,
                                height: undefined,
                                flex: 1,
                                alignSelf: 'stretch',
                                resizeMode: 'cover',
                              }}
                              source={{uri: item.src}}
                            />
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity
                            style={{
                              height: responsiveHeight(50),
                              aspectRatio: 0.66,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft:
                                index == this.state.images.length - 1
                                  ? 0
                                  : responsiveWidth(1),
                            }}
                            activeOpacity={0.9}
                            onPress={() => {
                              this.props.navigation.navigate('_Zoom', {
                                imageAddress: this.state.images,
                                witchPicture: index,
                              });
                            }}>
                            <Image
                              style={{
                                width: undefined,
                                height: undefined,
                                flex: 1,
                                alignSelf: 'stretch',
                                resizeMode: 'cover',
                              }}
                              source={{uri: item.src}}
                            />
                          </TouchableOpacity>
                        );
                      }
                    }}
                    horizontal
                    inverted
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                {/*--------------------Select Color And Favorites--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  {/*----------Favorites----------*/}
                  <View
                    style={{
                      flex: 1.5,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <TouchableOpacity
                      style={[
                        {
                          width: responsiveHeight(6),
                          height: responsiveHeight(6),
                          backgroundColor: colors(this.global.theme).WHITE,
                          borderRadius: 100,
                          marginLeft: responsiveWidth(4),
                        },
                        elevations(this.global.shadow).FAVORITES,
                      ]}
                      activeOpacity={0.9}
                      onPress={() => {
                        if (this.global.token) {
                          Axios.post(
                            'https://beheene.com/api/v1/add_favorite',
                            {
                              mobile: `${this.global.mobile}`,
                              code: this.props.navigation.getParam('code'),
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
                                  isFavorite: true,
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
                              console.warn(error);
                              this._spring();
                            })
                            .finally(() => {});
                        } else {
                          this.props.navigation.navigate('_SignUp');
                        }
                      }}>
                      <Image
                        style={{
                          width: undefined,
                          height: undefined,
                          margin: responsiveHeight(1.5),
                          flex: 1,
                          tintColor:
                            this.state.isFavorite == false
                              ? colors(this.global.theme).GRAY_SIX
                              : colors(this.global.theme).RED_TWO,
                          resizeMode: 'center',
                        }}
                        source={
                          this.state.isFavorite == false
                            ? require('../Image/08.png')
                            : require('../Image/07.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  {/*----------Area Or Count----------*/}
                  <View
                    style={{
                      height: responsiveHeight(8),
                      width: responsiveWidth(30),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors(this.global.theme).WHITE,
                      borderWidth: responsiveHeight(0.2),
                      borderColor: colors(this.global.theme).GRAY_SIX,
                      borderRadius: responsiveWidth(1),
                      marginRight: responsiveWidth(4),
                    }}>
                    {this.state.product.areaOrCount == 'متراژی' ? (
                      <View
                        style={{
                          flex: 1,
                          alignSelf: 'stretch',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TextInput
                          ref={inputArea => {
                            this.inputArea = inputArea;
                          }}
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            textAlign: 'center',
                            fontFamily: 'IRANSansMobile(FaNum)',
                            fontWeight: '300',
                            fontSize: responsiveFontSize(1.8),
                            textAlignVertical: 'center',
                          }}
                          placeholderTextColor={
                            colors(this.global.theme).GRAY_SIX
                          }
                          placeholder={this.state.placeHolderArea}
                          value={this.state.messageArea}
                          onChangeText={messageArea =>
                            this.setState({messageArea})
                          }
                          onFocus={() => {
                            if (this.state.messageArea == '1') {
                              this.setState({messageArea: ''});
                            }

                            this.setState({
                              placeHolderArea: '',
                            });
                          }}
                          onEndEditing={() => {
                            this.state.messageArea == ''
                              ? this.setState({
                                  placeHolderArea: strings(this.global.locale)
                                    .Area,
                                })
                              : () => {};
                          }}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignSelf: 'stretch',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={this.showMenu}>
                        <View
                          style={{
                            flex: 5,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              {
                                marginLeft: responsiveWidth(4),
                                color: colors(this.global.theme).GRAY_EIGHT,
                              },
                              fonts(this.global.SizeAndWeight).SECOND,
                            ]}>
                            {this.state.quantity}
                          </Text>
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
                            source={require('../Image/37.png')}
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.1,
                            alignSelf: 'stretch',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                          }}>
                          {this.MenuQuantity()}
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/*--------------------Name--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      {
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {this.state.product.title}
                  </Text>
                </View>
                {/*--------------------Price--------------------*/}
                {this.state.product.areaOrCount == 'متراژی' ? (
                  this.state.product.discount == 0 ? (
                    <View
                      style={{
                        height: responsiveHeight(6),
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: responsiveWidth(4),
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        هر {this.state.product.area} متر مربع{' '}
                        {this.state.product.price} تومان
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: responsiveHeight(6),
                        alignSelf: 'stretch',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingRight: responsiveWidth(4),
                        flexDirection: 'row-reverse',
                      }}>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).GRAY_SIX,
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {this.state.product.price}
                      </Text>
                      <Text
                        style={[
                          {
                            color: colors(this.global.theme).RED_TWO,
                            marginRight: responsiveWidth(1),
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        هر {this.state.product.area} متر مربع{' '}
                        {this.state.product.priceAfterDiscount} تومان
                      </Text>
                    </View>
                  )
                ) : this.state.product.discount == 0 ? (
                  <View
                    style={{
                      height: responsiveHeight(6),
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: responsiveWidth(4),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.state.product.price} تومان
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      height: responsiveHeight(6),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingRight: responsiveWidth(4),
                      flexDirection: 'row-reverse',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.state.product.price}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).RED_TWO,
                          marginRight: responsiveWidth(1),
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.state.product.priceAfterDiscount} تومان
                    </Text>
                  </View>
                )}

                {/*--------------------Seller Name--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      {
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {this.state.product.name_shop}
                  </Text>
                </View>
                {/*--------------------Rating--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(3),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingRight: responsiveWidth(55),
                    paddingLeft: responsiveWidth(4),
                  }}>
                  <RatingSingleCard
                    disable={true}
                    isNumber={true}
                    numberOfComments={this.state.product.count_rates}
                    rating={this.state.product.rates}
                  />
                </View>
                {/*--------------------About Product--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingRight: responsiveWidth(4),
                    paddingLeft: responsiveWidth(4),
                  }}>
                  <Text
                    style={[
                      {
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        marginVertical: responsiveHeight(2),
                        lineHeight: responsiveHeight(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {this.state.product.details}
                  </Text>
                </View>
                {/*--------------------Product Properties--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(8),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    borderTopWidth: responsiveHeight(0.1),
                    borderBottomWidth: responsiveHeight(0.1),
                    marginBottom: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('_ProductProperties', {
                      code: this.state.product.code,
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
                      {strings(this.global.locale).ProductProperties}
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
                        tintColor: colors(this.global.theme).GRAY_EIGHT,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
                {/*--------------------Rating And Reviews--------------------*/}
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(8),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    flexDirection: 'row-reverse',
                    //borderTopWidth: responsiveHeight(0.1),
                    borderBottomWidth: responsiveHeight(0.1),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('_Reviews', {
                      code: this.state.product.code,
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
                      {strings(this.global.locale).RatingAndReviews}
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
                        tintColor: colors(this.global.theme).GRAY_EIGHT,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/24.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {/*--------------------You Can Also Like This--------------------*/}
              <View
                style={{
                  height: responsiveHeight(5),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  marginVertical: responsiveHeight(2),
                  paddingRight: responsiveWidth(4),
                }}>
                {/*----------New Text----------*/}
                <View
                  style={{
                    flex: 1,
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
                    {strings(this.global.locale).YouCanAlsoLikeThis}
                  </Text>
                </View>
                {/*----------Number Of Items----------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.state.product.related_product.length} مورد
                    </Text>
                  </View>
                </View>
              </View>
              {/*----------Products List----------*/}
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  marginBottom: responsiveHeight(12),
                }}
                data={this.state.product.related_product}
                renderItem={({item, index}) => {
                  return (
                    <ProductRelated
                      navigation={this.props.navigation}
                      onPress={() => {
                        this.setState(
                          {ProductCode: item.code, isLoading: true},
                          () => {
                            this.reLoad();
                          },
                        );
                      }}
                      firstImage={item.thumbnail}
                      salePercent={item.discount}
                      isNew={false}
                      isSale={item.discount == 0 ? false : true}
                      isFavorite={item.favorite}
                      name={item.title}
                      nameL={item.title.length}
                      grouping={item.category}
                      price={item.price}
                      salePrice={item.priceAfterDiscount}
                      rating={item.rates}
                      numberOfComments={item.count_rates}
                      witchIndex={index}
                      endIndex={this.state.product.related_product.length}
                    />
                  );
                }}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                key={item => item.id}
                ListEmptyComponent={
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
                          marginVertical: responsiveHeight(2),
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).ThereIsNothing}
                    </Text>
                  </View>
                }
              />
            </ScrollView>
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
                isLoading: true,
              });
            });
            this.reLoad();
          }}
        />
      );
    }
  }
}
export {SingleCard};

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

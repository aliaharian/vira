import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
  Animated,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {CheckOutCard, Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isConnected: undefined,
      priceSend: 0,
      shippingAddresses: [],
      bag: [],
      defaultAddress: [],
      isLoadingSubmitOrder: false,
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
    this.AddressLoad();
  }

  AmountLoad() {
    const AmountApi = 'https://beheene.com/api/v1/cart/total';

    Axios.post(
      AmountApi,
      {mobile: `${this.global.mobile}`},
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setState({
          //priceSend: response.data.price_send,
          priceSend: 10000,
        });
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        //this.setState({isLoading: false});
      });
  }

  AddressLoad() {
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
        this.setState({shippingAddresses: response.data.data}, () => {
          this.setState({defaultAddress: this.search(true)}, () => {
            console.warn(this.state.defaultAddress[0].id);
          });
        });
        this.AmountLoad();
        this.bagLoad();
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
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
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
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

  search() {
    return this.state.shippingAddresses.filter(item => {
      return item.default_address == true;
    });
  }

  render() {
    let product_ids = [];
    this.state.bag.forEach(item => {
      product_ids.push(item.product_id);
    });

    let quantity = [];
    this.state.bag.forEach(item => {
      quantity.push(item.quantity);
    });

    let singlePrice = [];
    this.state.bag.forEach(item => {
      singlePrice.push(item.price);
    });

    let TPrice = 0;
    this.state.bag.forEach(item => {
      if (item.areaOrCount == 'متراژی') {
        TPrice += (item.price * item.quantity) / item.area;
      } else {
        TPrice += item.price * item.quantity;
      }
    });

    let TPricePlusSend =
      Number(TPrice.toFixed(0)) + Number(this.state.priceSend);

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
                  {strings(this.global.locale).CheckOut}
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
                {/*--------------------Text Shipping Address--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    backgroundColor: colors(this.global.theme).GRAY_ONE,
                    marginVertical: responsiveHeight(2),
                  }}>
                  <Text
                    style={[
                      {
                        marginRight: responsiveWidth(4),
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {strings(this.global.locale).ShippingAddress}
                  </Text>
                </View>
                {/*--------------------Check Out Card--------------------*/}
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.search(true)}
                  renderItem={({item, index}) => {
                    return (
                      <CheckOutCard
                        navigation={this.props.navigation}
                        addressName={item.fullName}
                        address={item.address}
                        city={item.cityName}
                        code={item.postalCode}></CheckOutCard>
                    );
                  }}
                  scrollEnabled={false}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}></FlatList>
                {/*--------------------Order--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(2),
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
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).Order}
                    </Text>
                  </View>
                </View>
                {/*--------------------Delivery--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                    //marginTop: responsiveHeight(2),
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
                      {this.state.priceSend}
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
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).Delivery}
                    </Text>
                  </View>
                </View>
                {/*--------------------Summary--------------------*/}
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                    //marginTop: responsiveHeight(2),
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
                        fonts(this.global.SizeAndWeight).Third,
                      ]}>
                      {strings(this.global.locale).Dollar}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).Third,
                      ]}>
                      {Number(TPrice.toFixed()) + Number(this.state.priceSend)}
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
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).Third,
                      ]}>
                      {strings(this.global.locale).Summary}
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
                    this.state.isLoadingSubmitOrder == true ? true : false
                  }
                  onPress={() => {
                    //console.warn(String(product_ids));
                    //console.warn(quantity);
                    //console.warn(singlePrice);
                    //console.warn(this.state.defaultAddress[0].id);
                    this.setState({isLoadingSubmitOrder: true});
                    Axios.post(
                      'https://www.beheene.com/api/v1/bank/request',
                      {
                        mobile: `${this.global.mobile}`,
                        product_ids: String(product_ids),
                        quantity: String(quantity),
                        single_price: String(singlePrice),
                        address_id: this.state.defaultAddress[0].id,
                        total_price: String(TPricePlusSend),
                      },
                      {
                        headers: {
                          Authorization: `${this.global.token}`,
                        },
                      },
                    )
                      .then(response => {
                        console.warn(response);
                        Linking.openURL(response.data.message);
                      })
                      .catch(error => {
                        console.warn(error);
                        this._spring();
                      })
                      .finally(() => {
                        this.setState({isLoadingSubmitOrder: false});
                      });
                  }}>
                  {this.state.isLoadingSubmitOrder == true ? (
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
                      {strings(this.global.locale).SubmitOrder}
                    </Text>
                  )}
                </TouchableOpacity>
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
                isLoading: true,
              });
            });
            this.AddressLoad();
          }}></Net>
      );
    }
  }
}
export {CheckOut};

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

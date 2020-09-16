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
import {OrderDetailsCard, Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderTracking: '-',
      message: '',
      isLoading: true,
      isConnected: undefined,
      order: [
        {
          id: 1,
          order_id: 1,
          product: [
            {
              thumbnail:
                'https://www.beheene.com/images/product/thumbnail/product_image.png',
              title: '',
              category: '',
              areaOrCount: '',
              price: '',
              priceAfterDiscount: '',
            },
          ],
          quantity: '',
          single_price: '',
          total_price: '',
          address_id: 1,
          date: '',
        },
      ],
      shippingAddresses: [],
      address: [
        {
          id: 1,
          fullName: '',
          cityName: '',
          address: '',
          postalCode: '',
        },
      ],
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
    this.orderLoad();
  }

  orderLoad() {
    const apiOrderLoad = 'https://beheene.com/api/v1/order_product';

    Axios.post(
      apiOrderLoad,
      {
        mobile: `${this.global.mobile}`,
        order_id: this.props.navigation.getParam('id'),
      },
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setState({order: response.data.data}, () => {
          this.addressLoad();
        });
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
  }

  addressLoad() {
    const api = 'https://beheene.com/api/v1/addresses';

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
        this.setState({shippingAddresses: response.data.data}, () => {
          let newData = this.state.shippingAddresses.filter(item => {
            return item.id == this.state.order[0].address_id;
          });
          this.setState({address: newData});
        });
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  //-------------------Write Review Bottom Sheet--------------------
  bottomSheet() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(40),
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
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/*----------Text  Please Write Your Feedback Abut This Shop----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).PleaseWriteYourFeedbackAbutThisShop}
            </Text>
          </View>
          {/*----------Text Input----------*/}
          <View
            style={{
              flex: 4,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: responsiveHeight(2),
            }}>
            <TextInput
              ref={input => {
                this.input = input;
              }}
              style={[
                {
                  flex: 1,
                  alignSelf: 'stretch',
                  marginHorizontal: responsiveWidth(4),
                  borderRadius: responsiveWidth(3),
                  textAlignVertical: 'bottom',
                  textAlign: 'right',
                  lineHeight: responsiveHeight(6),
                  color: colors(this.global.theme).GRAY_SEVEN,
                  paddingLeft: 10,
                  fontSize: 20,
                  backgroundColor: colors(this.global.theme).WHITE,
                },
                fonts(this.global.locale).Third,
              ]}
              placeholderTextColor={colors(this.global.theme).GRAY_SEVEN}
              value={this.state.message}
              onChangeText={message => this.setState({message})}
              multiline={true}
            />
          </View>
          {/*----------Send Review----------*/}
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
            }}
            disabled={this.state.message == ''}
            onPress={() => {
              this.input.clear();
              Keyboard.dismiss();
              this.RBSheet.close();
              Axios.post(
                'https://beheene.com/api/v1/order_comments',
                {
                  mobile: `${this.global.mobile}`,
                  comment: this.state.message,
                  order_id: this.state.order[0].order_id,
                },
                {
                  headers: {
                    Authorization: `${this.global.token}`,
                  },
                },
              )
                .then(response => {
                  console.warn(response);
                })
                .catch(error => {
                  this._spring();
                })
                .finally(() => {});
            }}>
            <Text
              style={[
                {
                  marginHorizontal: responsiveWidth(4),
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).SendReview}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
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
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}></TouchableOpacity>
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
                  {strings(this.global.locale).OrderDetails}
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
              style={{
                flex: 1,
                alignSelf: 'stretch',
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
                {/*--------------------Order Number And Date--------------------*/}
                <View
                  style={{
                    //height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: responsiveHeight(2),
                    marginHorizontal: responsiveWidth(4),
                  }}>
                  {/*----------Date----------*/}
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
                      {this.state.order[0].date}
                    </Text>
                  </View>
                  {/*----------Order Number----------*/}
                  <View
                    style={{
                      flex: 1.5,
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
                      {strings(this.global.locale).OrderNo}:{' '}
                      {this.state.order[0].order_id}
                    </Text>
                  </View>
                </View>
                {/*--------------------Tracking Number And Status--------------------*/}
                <View
                  style={{
                    //height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginVertical: responsiveHeight(2),
                  }}>
                  {/*----------Status----------*/}
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
                          color: colors(this.global.theme).GREEN,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.props.navigation.getParam('status_send') ==
                      'تحویل داده شده'
                        ? 'تحویل شده'
                        : this.props.navigation.getParam('status_send')}
                    </Text>
                  </View>
                  {/*----------Tracking Number----------*/}
                  <View
                    style={{
                      flex: 2,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.props.navigation.getParam('status')}
                    </Text>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {strings(this.global.locale).PaymentStatus}:{' '}
                    </Text>
                  </View>
                </View>
                {/*--------------------Items--------------------*/}
                <View
                  style={{
                    //height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    {strings(this.global.locale).Items}
                  </Text>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    {' '}
                    {this.state.order[0].product.length}
                  </Text>
                </View>
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.state.order[0].product}
                  renderItem={({item, index}) => {
                    return (
                      <OrderDetailsCard
                        name={item.title}
                        category={item.category}
                        isArea={item.areaOrCount == 'متراژی' ? true : false}
                        price={item.priceAfterDiscount}
                        uri={item.thumbnail}
                        index={index}
                        endIndex={this.state.order[0].product - 1}
                        screenOrderDetails={
                          this.props.screenOrderDetails
                        }></OrderDetailsCard>
                    );
                  }}
                  scrollEnabled={false}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}></FlatList>
                {/*--------------------Order Information--------------------*/}
                <View
                  style={{
                    //height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginBottom: responsiveHeight(2),
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {strings(this.global.locale).OrderInformation}
                  </Text>
                </View>
                {/*--------------------Shipping Address--------------------*/}
                <View
                  style={{
                    //height: responsiveHeight(10),
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
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
                      {this.state.address[0].cityName}،{' '}
                      {this.state.address[0].address}،{' '}
                      {this.state.address[0].postalCode}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: responsiveWidth(30),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).ShippingAddress}:
                    </Text>
                  </View>
                </View>
                {/*--------------------Discount--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
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
                      {this.props.navigation.getParam('discount')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: responsiveWidth(30),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).Discount}:
                    </Text>
                  </View>
                </View>
                {/*--------------------Total Amount--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    marginTop: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
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
                      {this.state.order[0].total_price}{' '}
                      {strings(this.global.locale).Dollar}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: responsiveWidth(30),
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_SIX,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {strings(this.global.locale).TotalAmount}:
                    </Text>
                  </View>
                </View>
                {/*--------------------Leave Feedback--------------------*/}
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
                  onPress={() => this.RBSheet.open()}>
                  {this.bottomSheet()}
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).WHITE,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {strings(this.global.locale).LeaveFeedback}
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
            NetInfo.fetch().then(state => {
              this.setState({
                isConnected: state.isConnected,
                isLoading: true,
              });
            });
          }}></Net>
      );
    }
  }
}
export {OrderDetails};

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

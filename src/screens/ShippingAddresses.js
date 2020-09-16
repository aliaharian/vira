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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {ShippingAddressesCard} from '../components';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';

class ShippingAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddresses: [],
      isLoading: true,
      isConnected: undefined,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    // Add navigation listeners
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({isLoading: true}, () => {
          this.addressLoad();
        });
      },
    );
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
    this.addressLoad();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
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
        this.setState({shippingAddresses: response.data});
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
                  {strings(this.global.locale).ShippingAddresses}
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
            {/*--------------------Fab Add Address--------------------*/}
            <TouchableOpacity
              style={[
                {
                  height: responsiveHeight(6),
                  width: responsiveHeight(6),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_EIGHT,
                  borderRadius: 100,
                  zIndex: 1,
                  position: 'absolute',
                  bottom: responsiveHeight(2),
                  left: responsiveWidth(4),
                },
                elevations(this.global.shadow).FAVORITES,
              ]}
              onPress={() => {
                this.props.navigation.navigate('_AddingShippingAddress');
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  margin: responsiveHeight(1.5),
                  resizeMode: 'cover',
                  tintColor: colors(this.global.theme).WHITE,
                }}
                source={require('../Image/27.png')}></Image>
            </TouchableOpacity>

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
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.state.shippingAddresses.data}
                  renderItem={({item, index}) => {
                    return (
                      <ShippingAddressesCard
                        navigation={this.props.navigation}
                        index={index}
                        endIndex={this.state.shippingAddresses.data.length - 1}
                        addressName={item.fullName}
                        address={item.address}
                        city={item.cityName}
                        code={item.postalCode}
                        isCheck={item.default_address == true ? true : false}
                        onPress={() => {
                          Axios.post(
                            'https://beheene.com/api/v1/changeDefaultAddress',
                            {
                              mobile: `${this.global.mobile}`,
                              id: item.id,
                            },
                            {
                              headers: {
                                Authorization: `${this.global.token}`,
                              },
                            },
                          )
                            .then(response => {
                              this.setState({isLoading: true}, () => {
                                this.addressLoad();
                              });
                            })
                            .catch(error => {
                              this._spring();
                            })
                            .finally(() => {});
                        }}></ShippingAddressesCard>
                    );
                  }}
                  scrollEnabled={false}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}
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
                  }></FlatList>
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
            this.addressLoad();
          }}></Net>
      );
    }
  }
}
export {ShippingAddresses};

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

import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  RefreshControl,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {ProductViewAllSale} from '../components/Product';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import CountDown from 'react-native-countdown-component';

class ViewAllSale extends Component {
  constructor(props) {
    super(props);

    this.state = {products: [], isLoading: true, isConnected: undefined};
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.reLoad();
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  }

  reLoad() {
    const api = 'https://beheene.com/api/v1/special';

    Axios.get(api)
      .then(response => {
        this.setState({products: response.data.data});
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
              {/*----------Search----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}
              />
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
                  {strings(this.global.locale).Sale}
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
            {/*--------------------Products--------------------*/}
            <FlatList
              style={{
                flex: 1,
                alignSelf: 'stretch',
                paddingHorizontal: responsiveWidth(3),
              }}
              data={this.state.products}
              renderItem={({item, index}) => {
                let endDateAndTime = item.end_time.split(' ');
                let endDate = endDateAndTime[0].split('-');
                let endTime = endDateAndTime[1].split(':');
                //----------End Date----------
                let endYear = endDate[0];
                let endMonth = endDate[1];
                let endDay = endDate[2];
                //----------Current Date----------
                let currentYear = new Date().getFullYear();
                let currentMonth = new Date().getMonth() + 1;
                let currentDay = new Date().getDate();
                //----------End Time----------
                let endHour = endTime[0];
                let endMinute = endTime[1];
                let endSecond = endTime[2];
                //----------Current Time----------
                let currentHour = new Date().getHours();
                let currentMinute = new Date().getMinutes();
                let currentSecond = new Date().getSeconds();

                var t1 = new Date(
                  endYear,
                  endMonth,
                  endDay,
                  endHour,
                  endMinute,
                  endSecond,
                  0,
                );
                var t2 = new Date(
                  currentYear,
                  currentMonth,
                  currentDay,
                  currentHour,
                  currentMinute,
                  currentSecond,
                  0,
                );
                var dif = t1.getTime() - t2.getTime();

                var Seconds_from_T1_to_T2 = dif / 1000;
                var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

                return (
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ProductViewAllSale
                      navigation={this.props.navigation}
                      onPress={() => {
                        this.props.navigation.navigate('_SingleCard', {
                          code: item.code,
                        });
                      }}
                      firstImage={item.thumbnail}
                      salePercent={item.discount}
                      isNew={false}
                      isSale={true}
                      isFavorite={item.favorite}
                      name={item.title}
                      nameL={item.title.length}
                      grouping={item.category}
                      price={item.price}
                      salePrice={item.priceAfterDiscount}
                      rating={item.rates}
                      numberOfComments={item.count_rates}
                      witchIndex={index}
                      endIndex={this.state.products.length}
                    />
                    {/*--------------------Timer--------------------*/}
                    <View
                      style={{
                        height: responsiveHeight(3.5),
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom:
                          index == this.state.products.length - 1
                            ? responsiveHeight(2)
                            : 0,
                        marginRight:
                          index == this.state.products.length - 1
                            ? Dimensions.get('window').width / 2 -
                              responsiveWidth(3)
                            : 0,
                      }}>
                      <CountDown
                        until={Seconds_Between_Dates}
                        digitStyle={{
                          height: responsiveHeight(3.5),
                          width: responsiveWidth(7),
                          backgroundColor: colors(this.global.theme).RED_ONE,
                        }}
                        digitTxtStyle={[
                          {
                            color: colors(this.global.theme).WHITE,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}
                        timeLabels={{d: '', h: '', m: '', s: ''}}
                        showSeparator={true}
                        separatorStyle={[
                          {
                            color: colors(this.global.theme).RED_ONE,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}
                      />
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              key={item => item}
              numColumns={2}
              refreshControl={
                <RefreshControl
                  colors={[colors(this.global.theme).RED_ONE]}
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    this.reLoad();
                  }}
                />
              }
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
export {ViewAllSale};

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

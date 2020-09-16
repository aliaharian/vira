import React, {Component} from 'reactn';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Slideshow from 'react-native-image-slider-show';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {ProductHome} from '../components/Product';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import CountDown from 'react-native-countdown-component';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      position: 0,
      interval: null,
      dataSource: [],
      saleProducts: [],
      newProducts: [],
      isConnected: undefined,
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
    this.sliderLoad();
  }

  sliderLoad() {
    const apiSlider = 'https://beheene.com/api/v1/slider';

    Axios.get(apiSlider)
      .then(response => {
        this.setState({dataSource: response.data.data});
        this.saleLoad();
        this.newLoad();
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  saleLoad() {
    const apiSale = 'https://www.beheene.com/api/v1/special';

    Axios.get(apiSale)
      .then(response => {
        this.setState({saleProducts: response.data});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
  }

  newLoad() {
    const apiNew = 'https://beheene.com/api/v1/product';

    Axios.get(apiNew)
      .then(response => {
        this.setState({newProducts: response.data});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  {strings(this.global.locale).Home}
                </Text>
              </View>
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
            {/*--------------------Sale and New--------------------*/}
            <ScrollView
              style={{
                flex: 1,
                alignSelf: 'stretch',
              }}
              showsVerticalScrollIndicator={false}>
              <Slideshow
                dataSource={this.state.dataSource}
                height={responsiveHeight(30)}
                position={this.state.position}
                onPositionChanged={position => this.setState({position})}
                indicatorSize={0}
                scrollEnabled={true}
                arrowSize={0}
              />
              <View
                style={{
                  height: responsiveHeight(5),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  marginTop: responsiveHeight(2),
                  paddingRight: responsiveWidth(4),
                  marginBottom: responsiveHeight(2),
                }}>
                {/*----------Sale Text----------*/}
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
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {strings(this.global.locale).Sale}
                  </Text>
                </View>
                {/*----------View all----------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    //activeOpacity={0.9}
                    onPress={() => {
                      this.setGlobal({isLanding: false}, () => {
                        this.props.navigation.navigate('_ViewAllSale');
                      });
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {strings(this.global.locale).ViewAll}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*----------Products List----------*/}
              <FlatList
                style={{flex: 1, alignSelf: 'stretch'}}
                data={this.state.saleProducts.data}
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

                  //console.warn(currentSecond);
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ProductHome
                        navigation={this.props.navigation}
                        onPress={() => {
                          this.setGlobal({isLanding: false}, () => {
                            this.props.navigation.navigate('_SingleCard', {
                              code: item.code,
                            });
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
                        endIndex={this.state.saleProducts.data.length}
                      />
                      {/*--------------------Timer--------------------*/}
                      <View
                        style={{
                          height: responsiveHeight(3.5),
                          alignSelf: 'stretch',
                          justifyContent: 'center',
                          alignItems: 'center',
                          //paddingLeft: responsiveWidth(1),
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
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                key={item => item}
              />
              {/*--------------------New--------------------*/}
              <View
                style={{
                  height: responsiveHeight(5),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  marginTop: responsiveHeight(2),
                  paddingRight: responsiveWidth(4),
                  marginBottom: responsiveHeight(2),
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
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {strings(this.global.locale).NewProducts}
                  </Text>
                </View>
                {/*----------View all----------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    //activeOpacity={0.9}
                    onPress={() => {
                      this.setGlobal({isLanding: false}, () => {
                        this.props.navigation.navigate('_ViewAllNew');
                      });
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {strings(this.global.locale).ViewAll}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*----------Products List----------*/}
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  marginBottom: responsiveHeight(12),
                }}
                data={this.state.newProducts.data}
                renderItem={({item, index}) => {
                  return (
                    <ProductHome
                      navigation={this.props.navigation}
                      onPress={() => {
                        this.setGlobal({isLanding: false}, () => {
                          this.props.navigation.navigate('_SingleCard', {
                            code: item.code,
                          });
                        });
                      }}
                      firstImage={item.thumbnail}
                      salePercent={0}
                      isNew={true}
                      isSale={false}
                      isFavorite={item.favorite}
                      name={item.title}
                      nameL={item.title.length}
                      grouping={item.category}
                      price={item.price}
                      salePrice={item.priceAfterDiscount}
                      rating={item.rates}
                      numberOfComments={item.count_rates}
                      witchIndex={index}
                      endIndex={this.state.newProducts.data.length}
                    />
                  );
                }}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                key={item => item.id}
              />
            </ScrollView>
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
            this.sliderLoad();
          }}
        />
      );
    }
  }
}
export {Home};

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

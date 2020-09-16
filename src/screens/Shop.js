import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {Product, Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';
import RangeSlider from 'rn-range-slider';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: strings(this.global.locale).Popular,
      sortAPI: 'view',
      products: [],
      categories: [],
      isLoading: true,
      isConnected: undefined,
      isFilter: false,
      witchCategories: [],
      rangeLow: '',
      rangeHigh: '',
      allCategories: [],
      newAllCategories: [],
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
    {
      // Add navigation listeners
      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => this.productLoad(),
      );

      this.productLoad();
    }
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  productLoad() {
    const apiProducts = this.state.isFilter
      ? `https://www.beheene.com/api/v1/product/price/${
          this.global.categories
        }/${this.global.minPrice}/${this.global.maxPrice}`
      : `https://beheene.com/api/v1/product/${this.state.sortAPI}`;

    Axios.get(apiProducts)
      .then(response => {
        this.setState({products: response.data});
        this.categoryLoad();
        this.catsLoad();
        this.downUPPriceLoad();
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  categoryLoad() {
    const apiCategories = 'https://beheene.com/api/v1/categories';

    Axios.get(apiCategories)
      .then(response => {
        this.setState({categories: response.data});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
  }

  catsLoad() {
    const apiCats = 'https://beheene.com/api/v1/cats';

    Axios.get(apiCats)
      .then(response => {
        this.setState({allCategories: response.data});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {});
  }

  downUPPriceLoad() {
    const apiDownUPPrice = 'https://beheene.com/api/v1/product/upDownPrice';
    Axios.get(apiDownUPPrice)
      .then(response => {
        this.setState({
          rangeLow: response.data.downPrice,
          rangeHigh: response.data.upPrice,
        });
        this.setGlobal({
          high: response.data.upPrice,
          low: response.data.downPrice,
        });
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

  //--------------------Sort Bottom Sheet--------------------
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
          {/*----------Text Sort By----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).SortBy}
            </Text>
          </View>
          {/*----------Popular----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor:
                this.state.sort == strings(this.global.locale).Popular
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setState(
                {
                  sort: strings(this.global.locale).Popular,
                  sortAPI: 'view',
                  isFilter: false,
                },
                () => {
                  this.productLoad();
                  this.RBSheet.close();
                },
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.state.sort == strings(this.global.locale).Popular
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.state.sort == strings(this.global.locale).Popular
                  ? fonts(this.global.SizeAndWeight).SECOND
                  : fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).Popular}
            </Text>
          </TouchableOpacity>
          {/*----------Newest----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor:
                this.state.sort == strings(this.global.locale).Newest
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setState(
                {
                  sort: strings(this.global.locale).Newest,
                  sortAPI: 'new',
                  isFilter: false,
                },
                () => {
                  this.productLoad();
                  this.RBSheet.close();
                },
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.state.sort == strings(this.global.locale).Newest
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.state.sort == strings(this.global.locale).Newest
                  ? fonts(this.global.SizeAndWeight).SECOND
                  : fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).Newest}
            </Text>
          </TouchableOpacity>
          {/*----------Customer Review----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor:
                this.state.sort == strings(this.global.locale).CustomerReview
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setState(
                {
                  sort: strings(this.global.locale).CustomerReview,
                  sortAPI: 'rate/5',
                  isFilter: false,
                },
                () => {
                  this.productLoad();
                  this.RBSheet.close();
                },
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.state.sort ==
                    strings(this.global.locale).CustomerReview
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.state.sort == strings(this.global.locale).CustomerReview
                  ? fonts(this.global.SizeAndWeight).SECOND
                  : fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).CustomerReview}
            </Text>
          </TouchableOpacity>
          {/*----------Price: Lowest To High----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor:
                this.state.sort == strings(this.global.locale).PriceLowestToHigh
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setState(
                {
                  sort: strings(this.global.locale).PriceLowestToHigh,
                  sortAPI: 'price/asc',
                  isFilter: false,
                },
                () => {
                  this.productLoad();
                  this.RBSheet.close();
                },
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.state.sort ==
                    strings(this.global.locale).PriceLowestToHigh
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.state.sort == strings(this.global.locale).PriceLowestToHigh
                  ? fonts(this.global.SizeAndWeight).SECOND
                  : fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).PriceLowestToHigh}
            </Text>
          </TouchableOpacity>
          {/*----------Price: Highest To Low----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor:
                this.state.sort == strings(this.global.locale).PriceHighestToLow
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setState(
                {
                  sort: strings(this.global.locale).PriceHighestToLow,
                  sortAPI: 'price/desc',
                  isFilter: false,
                },
                () => {
                  this.productLoad();
                  this.RBSheet.close();
                },
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.state.sort ==
                    strings(this.global.locale).PriceHighestToLow
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.state.sort == strings(this.global.locale).PriceHighestToLow
                  ? fonts(this.global.SizeAndWeight).SECOND
                  : fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {strings(this.global.locale).PriceHighestToLow}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  //--------------------Filter Bottom Sheet--------------------
  bottomSheetFilter() {
    let newMaxValue = this.global.high;
    let newMinValue = this.global.low;
    let maxValue = newMaxValue;
    let minValue = newMinValue;
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(80),
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
            borderTopLeftRadius: responsiveWidth(3),
            borderTopRightRadius: responsiveWidth(3),
          },
        }}
        ref={ref => {
          this.RBSheetFilter = ref;
        }}
        duration={250}
        closeOnDragDown={true}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          {/*----------Text Filter----------*/}
          <View
            style={{
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).Filter}
            </Text>
          </View>
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
              {/*----------Price Range Text----------*/}
              <View
                style={{
                  height: responsiveHeight(8),
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
                  {strings(this.global.locale).PriceRange}
                </Text>
              </View>
              {/*----------Price Range Slider----------*/}
              <View
                style={[
                  {
                    height: responsiveHeight(12),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).WHITE,
                  },
                  elevations(this.global.shadow).FAVORITES,
                ]}>
                <View
                  style={{
                    height: responsiveHeight(6),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                  }}>
                  {/*----------Low Price Limit----------*/}
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
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.state.rangeLow} تومان
                    </Text>
                  </View>
                  {/*----------High Price Limit----------*/}
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
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {this.state.rangeHigh} تومان
                    </Text>
                  </View>
                </View>

                <RangeSlider
                  style={{
                    width: Dimensions.get('window').width - responsiveWidth(8),
                    height: responsiveHeight(6),
                  }}
                  valueType={'number'}
                  gravity={'center'}
                  thumbRadius={responsiveWidth(3)}
                  thumbBorderWidth={0}
                  lineWidth={responsiveHeight(0.6)}
                  labelStyle="none"
                  selectionColor="#1493a4"
                  blankColor="#9b9b9b"
                  thumbColor="#1493a4"
                  min={minValue}
                  max={maxValue}
                  step={10000}
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({rangeLow: low, rangeHigh: high});
                  }}
                />
              </View>
              {/*----------Categories Text----------*/}
              <View
                style={{
                  height: responsiveHeight(8),
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
                  {strings(this.global.locale).Categories}
                </Text>
              </View>
              {/*----------Categories Choose----------*/}
              <View
                style={[
                  {
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).WHITE,
                  },
                  elevations(this.global.shadow).FAVORITES,
                ]}>
                <FlatList
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    marginBottom: responsiveHeight(2),
                  }}
                  data={this.state.categories.data}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          height: responsiveHeight(8),
                          width:
                            Dimensions.get('window').width / 3 -
                            responsiveWidth(5),
                          alignSelf: 'stretch',
                          backgroundColor: this.state.witchCategories.includes(
                            item.title,
                          )
                            ? colors(this.global.theme).RED_ONE
                            : colors(this.global.theme).WHITE,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: responsiveWidth(3),
                          marginLeft: responsiveWidth(4),
                          marginTop: responsiveHeight(2),
                          borderWidth: this.state.witchCategories.includes(
                            item.title,
                          )
                            ? 0
                            : responsiveHeight(0.2),
                          borderColor: colors(this.global.theme).GRAY_SIX,
                        }}
                        onPress={() => {
                          var newWitchCategories = [
                            ...this.state.witchCategories,
                          ];

                          if (this.state.witchCategories.includes(item.title)) {
                            let witchIndex = this.state.witchCategories.indexOf(
                              item.title,
                            );
                            newWitchCategories.splice(witchIndex, 1);
                            this.setState({
                              witchCategories: newWitchCategories,
                            });
                          } else {
                            newWitchCategories.push(item.title);
                            this.setState({
                              witchCategories: newWitchCategories,
                            });
                          }
                        }}>
                        <Text
                          style={[
                            {
                              color: this.state.witchCategories.includes(
                                item.title,
                              )
                                ? colors(this.global.theme).WHITE
                                : colors(this.global.theme).GRAY_EIGHT,
                            },
                            fonts(this.global.SizeAndWeight).FIRST,
                          ]}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
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
              </View>
              <View
                style={{
                  height: responsiveHeight(12),
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </ScrollView>
          {/*---------------------Apply Or Discard--------------------*/}
          <View
            style={[
              {
                height: responsiveHeight(10),
                width: Dimensions.get('window').width,
                backgroundColor: 'red',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                backgroundColor: colors(this.global.theme).GRAY_ONE,
              },
              elevations(this.global.shadow).FAVORITES,
            ]}>
            {/*----------Apply----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={[
                  {
                    height: responsiveHeight(8),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors(this.global.theme).RED_ONE,
                    borderRadius: 100,
                    marginHorizontal: responsiveWidth(4),
                  },
                  elevations(this.global.theme).FAVORITES,
                ]}
                onPress={() => {
                  this.setGlobal(
                    {
                      categories:
                        this.state.witchCategories.length == 0
                          ? this.state.allCategories
                          : this.state.witchCategories,
                      minPrice: this.state.rangeLow,
                      maxPrice: this.state.rangeHigh,
                    },
                    () => {
                      this.setState({isFilter: true, isLoading: true}, () => {
                        () => {
                          this.RBSheetFilter.close();
                        };
                        this.productLoad();
                      });
                    },
                  );
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).WHITE,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).Apply}
                </Text>
              </TouchableOpacity>
            </View>
            {/*----------Discard----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: responsiveHeight(8),
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                  borderRadius: 100,
                  marginHorizontal: responsiveWidth(4),
                  borderWidth: responsiveHeight(0.2),
                  borderColor: colors(this.global.theme).GRAY_EIGHT,
                }}
                onPress={() => {
                  this.RBSheetFilter.close();
                }}>
                <Text
                  style={[
                    {
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).Discard}
                </Text>
              </TouchableOpacity>
            </View>
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
            <Animated.View
              style={[
                styles.animatedView,
                {transform: [{translateY: this.springValue}]},
              ]}>
              <Text style={styles.exitTitleText}>
                {strings(this.global.locale).ConnectionServerError}
              </Text>
            </Animated.View>
            {/*--------------------Header,Categories, Filter and Sort--------------------*/}
            <View
              style={[
                {
                  height: responsiveHeight(24),
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                },
                elevations(this.global.shadow).TAB,
              ]}>
              {/*--------------------Header--------------------*/}
              <View
                style={{
                  height: responsiveHeight(8),
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  zIndex: 1,
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
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Third,
                    ]}>
                    {strings(this.global.locale).Shop}
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
              {/*--------------------Categories, Filter and Sort--------------------*/}
              <View
                style={{
                  height: responsiveHeight(16),
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                }}>
                <LinearGradient
                  colors={[
                    colors(this.global.theme).GRAY_TEN,
                    colors(this.global.theme).WHITE,
                  ]}
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/*----------Categories----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FlatList
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                      }}
                      data={this.state.categories.data}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              alignSelf: 'stretch',
                              marginVertical: responsiveHeight(1),
                              width: responsiveWidth(25),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 100,
                              backgroundColor: colors(this.global.theme)
                                .GRAY_EIGHT,
                              marginRight: responsiveWidth(4),
                              marginLeft:
                                index == this.state.categories.data.length - 1
                                  ? responsiveWidth(4)
                                  : 0,
                            }}
                            onPress={() => {
                              this.setGlobal({isLanding: false}, () => {
                                this.props.navigation.navigate(
                                  '_SpecialCategory',
                                  {
                                    category: item.title,
                                  },
                                );
                              });
                            }}>
                            <Text
                              style={[
                                {
                                  color: colors(this.global.theme).WHITE,
                                },
                                fonts(this.global.SizeAndWeight).SECOND,
                              ]}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      horizontal
                      inverted
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  {/*----------Filter,Sort and Compare----------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors(this.global.theme).GRAY_ONE,
                        marginHorizontal: responsiveWidth(4),
                        marginVertical: responsiveHeight(1),
                        flexDirection: 'row',
                      }}>
                      {/*----------Compare----------*/}
                      <TouchableOpacity
                        style={{
                          flex: 1.2,
                          alignSelf: 'stretch',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          this.setGlobal({isLanding: false}, () => {
                            this.props.navigation.navigate('_Categories');
                          });
                        }}>
                        <Text
                          style={[
                            {
                              color: colors(this.global.theme).GRAY_EIGHT,
                              marginRight: responsiveWidth(2),
                            },
                            fonts(this.global.SizeAndWeight).FIRST,
                          ]}>
                          {strings(this.global.locale).Categories}
                        </Text>
                        <Image
                          style={{
                            width: responsiveHeight(3),
                            height: responsiveHeight(3),
                            tintColor: colors(this.global.theme).GRAY_EIGHT,
                            resizeMode: 'center',
                          }}
                          source={require('../Image/36.png')}
                        />
                      </TouchableOpacity>
                      {/*----------Sort----------*/}
                      <TouchableOpacity
                        style={{
                          flex: 2,
                          alignSelf: 'stretch',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => this.RBSheet.open()}>
                        {this.bottomSheet()}
                        <Text
                          style={[
                            {
                              color: colors(this.global.theme).GRAY_EIGHT,
                              marginRight: responsiveWidth(2),
                            },
                            fonts(this.global.SizeAndWeight).FIRST,
                          ]}>
                          {this.state.sort}
                        </Text>
                        <Image
                          style={{
                            width: responsiveHeight(3),
                            height: responsiveHeight(3),
                            tintColor: colors(this.global.theme).GRAY_EIGHT,
                            resizeMode: 'center',
                          }}
                          source={require('../Image/19.png')}
                        />
                      </TouchableOpacity>
                      {/*----------Filter----------*/}
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignSelf: 'stretch',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          this.RBSheetFilter.open();
                        }}>
                        {this.bottomSheetFilter()}
                        <Text
                          style={[
                            {
                              color: colors(this.global.theme).GRAY_EIGHT,
                              marginRight: responsiveWidth(2),
                            },
                            fonts(this.global.SizeAndWeight).FIRST,
                          ]}>
                          {strings(this.global.locale).Filter}
                        </Text>
                        <Image
                          style={{
                            width: responsiveHeight(3),
                            height: responsiveHeight(3),
                            tintColor: colors(this.global.theme).GRAY_EIGHT,
                            resizeMode: 'center',
                          }}
                          source={require('../Image/18.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
            {/*--------------------Products--------------------*/}
            <FlatList
              style={{
                flex: 1,
                alignSelf: 'stretch',
                paddingHorizontal: responsiveWidth(3),
              }}
              data={this.state.products.data}
              renderItem={({item, index}) => {
                return (
                  <Product
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
                    isSale={item.discount == 0 ? false : true}
                    name={item.title}
                    nameL={item.title.length}
                    grouping={item.category}
                    price={item.price}
                    salePrice={item.priceAfterDiscount}
                    rating={item.rates}
                    numberOfComments={item.count_rates}
                    witchIndex={index}
                    endIndex={this.state.products.data.length}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              key={item => item.id}
              numColumns={2}
              refreshControl={
                <RefreshControl
                  colors={[colors(this.global.theme).RED_ONE]}
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    this.productLoad();
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
            this.productLoad();
          }}
        />
      );
    }
  }
}
export {Shop};

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

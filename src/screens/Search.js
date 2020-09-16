import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
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
import {colors, strings, elevations, fonts} from '../globals';
import {Product} from '../components/Product';
import {Net, Loading} from '../components';
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      messageSearch: '',
      labelSearch: false,
      placeHolderSearch: strings(this.global.locale).Search,
      empty: [],
      isLoading: true,
      isConnected: undefined,
      searchHistory: [],
      productFilter: [],
      isSearch: false,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.AsyncSearchHistory();
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  }

  LoadData() {
    ///////////////////products
    const apiProducts = 'https://beheene.com/api/v1/product/view';

    Axios.get(apiProducts)
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

  AsyncSearchHistory() {
    ///////////////////AsyncStorage
    AsyncStorage.getItem('searchHistory')
      .then(searchHistory => {
        let parsed = JSON.parse(searchHistory);
        if (searchHistory) {
          this.setState({searchHistory: parsed});
        }
      })
      .catch(error => this._spring())
      .finally(() => {
        this.LoadData();
      });
  }

  search(messageSearch) {
    return this.state.products.filter(item => {
      return item.title.includes(messageSearch);
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
            <Animated.View
              style={[
                styles.animatedView,
                {transform: [{translateY: this.springValue}]},
              ]}>
              <Text style={styles.exitTitleText}>
                {strings(this.global.locale).ConnectionServerError}
              </Text>
            </Animated.View>
            <StatusBar
              backgroundColor={colors(this.global.theme).GRAY_ONE}
              barStyle="dark-content"></StatusBar>
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
                disabled={this.state.messageSearch == ''}
                onPress={() => {
                  Keyboard.dismiss();
                  let newData = this.state.products.filter(item => {
                    return item.title.includes(this.state.messageSearch);
                  });
                  this.setState({productFilter: newData, isSearch: true});
                  let newSearchHistory = [...this.state.searchHistory];
                  if (newSearchHistory.includes(this.state.messageSearch)) {
                    () => {};
                  } else {
                    newSearchHistory.unshift(this.state.messageSearch);
                    AsyncStorage.setItem(
                      'searchHistory',
                      JSON.stringify(newSearchHistory),
                    )
                      .then(() => {})
                      .catch(error => console.warn(error))
                      .finally(() => {});
                  }
                }}>
                {this.state.messageSearch == '' ? (
                  () => {}
                ) : (
                  <Image
                    style={{
                      width: responsiveHeight(4),
                      height: responsiveHeight(4),
                      tintColor: colors(this.global.theme).GRAY_EIGHT,
                      resizeMode: 'center',
                    }}
                    source={require('../Image/17.png')}></Image>
                )}
              </TouchableOpacity>
              {/*----------Header Text----------*/}
              <View
                style={{
                  flex: 5,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  ref={inputSearch => {
                    this.inputSearch = inputSearch;
                  }}
                  style={{
                    alignSelf: 'stretch',
                    textAlign: 'right',
                    fontFamily: 'IRANSansMobile(FaNum)',
                    fontWeight: '300',
                    fontSize: responsiveFontSize(2.1),
                  }}
                  placeholderTextColor={colors(this.global.theme).GRAY_SIX}
                  placeholder={this.state.placeHolderSearch}
                  value={this.state.messageSearch}
                  onChangeText={messageSearch => this.setState({messageSearch})}
                  onFocus={() => {
                    this.setState({
                      labelSearch: true,
                      placeHolderSearch: '',
                      productFilter: [],
                      isSearch: false,
                    });
                  }}
                  onEndEditing={() => {
                    this.state.messageSearch == ''
                      ? this.setState({
                          labelSearch: false,
                          placeHolderSearch: strings(this.global.locale).Search,
                        })
                      : () => {};
                  }}
                  returnKeyType={'search'}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    let newData = this.state.products.filter(item => {
                      return item.title.includes(this.state.messageSearch);
                    });
                    this.setState({productFilter: newData, isSearch: true});
                    let newSearchHistory = [...this.state.searchHistory];
                    if (newSearchHistory.includes(this.state.messageSearch)) {
                      () => {};
                    } else {
                      newSearchHistory.unshift(this.state.messageSearch);
                      AsyncStorage.setItem(
                        'searchHistory',
                        JSON.stringify(newSearchHistory),
                      )
                        .then(() => {})
                        .catch(error => console.warn(error))
                        .finally(() => {});
                    }
                  }}
                />
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
            {this.state.messageSearch == '' ? (
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                }}
                data={this.state.searchHistory}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        borderTopWidth: index == 0 ? 0 : responsiveHeight(0.2),
                        marginHorizontal: responsiveWidth(4),
                        borderColor: colors(this.global.theme).GRAY_FOUR,
                      }}
                      onPress={() => {
                        this.setState(
                          {messageSearch: item, isSearch: true},
                          () => {
                            let newData = this.state.products.filter(item => {
                              return item.title.includes(
                                this.state.messageSearch,
                              );
                            });
                            this.setState({productFilter: newData});
                          },
                        );
                      }}>
                      <Text
                        style={[
                          {
                            marginVertical: responsiveHeight(2),
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}></FlatList>
            ) : (
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  paddingHorizontal: responsiveWidth(3),
                }}
                data={this.state.productFilter}
                renderItem={({item, index}) => {
                  return (
                    <Product
                      navigation={this.props.navigation}
                      onPress={() => {
                        this.props.navigation.navigate('_SingleCard', {
                          code: item.code,
                        });
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
                      //endIndex={this.state.productFilter.length - 1}
                    ></Product>
                  );
                }}
                showsVerticalScrollIndicator={false}
                key={item => item.id}
                numColumns={2}
                ListEmptyComponent={
                  this.state.isSearch == true ? (
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
                        نتیجه ای حاصل نشد.
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></View>
                  )
                }></FlatList>
            )}
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
            this.AsyncSearchHistory();
          }}></Net>
      );
    }
  }
}
export {Search};

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

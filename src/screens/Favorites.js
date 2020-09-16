import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {FavoriteCard} from '../components';
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteProducts: [],
      isLoading: true,
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

    if (this.global.token) {
      this.favoriteLoad();
    } else {
      this.setState({favoriteProducts: [], isLoading: false});
    }
  }

  favoriteLoad() {
    const api = 'https://beheene.com/api/v1/favorites';

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
        this.setState({favoriteProducts: response.data});
      })
      .catch(error => {
        //this._spring();
        this.setState({favoriteProducts: []});
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

  render() {
    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Loading></Loading>;
      } else {
        if (this.state.favoriteProducts.length == 0) {
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
                      {strings(this.global.locale).Favorites}
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
                      {strings(this.global.locale).ThereIsNothing}
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
                      {strings(this.global.locale).Favorites}
                    </Text>
                  </View>
                  {/*--------------------Products--------------------*/}
                  <FlatList
                    style={{flex: 1, alignSelf: 'stretch'}}
                    data={this.state.favoriteProducts.data}
                    renderItem={({item, index}) => {
                      return (
                        <FavoriteCard
                          isNew={false}
                          isSale={item.discount == 0 ? false : true}
                          isSoldOut={item.available == 'موجود' ? false : true}
                          name={item.title}
                          nameL={item.title.length}
                          category={item.category}
                          price={item.price}
                          rates={item.rates}
                          countRates={item.count_rates}
                          salePercent={item.discount}
                          uri={item.thumbnail}
                          onPressAddToBag={() => {
                            this.setGlobal({isLanding: false}, () => {
                              this.props.navigation.navigate('_SingleCard', {
                                code: item.code,
                              });
                            });
                          }}
                          onPressDelete={() => {
                            this.state.favoriteProducts.length == 1
                              ? this.setState({favoriteProducts: []})
                              : Axios.post(
                                  'https://www.beheene.com/api/v1/remove_favorite',
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
                                    this.setState({isLoading: true}, () => {
                                      this.favoriteLoad();
                                    });
                                  })
                                  .catch(error => {
                                    this._spring();
                                  })
                                  .finally(() => {});
                          }}
                          index={index}
                          endIndex={
                            this.state.favoriteProducts.length - 1
                          }></FavoriteCard>
                      );
                    }}
                    keyExtractor={item => item}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}></FlatList>
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
              this.favoriteLoad();
            } else {
              this.setState({favoriteProducts: [], isLoading: false});
            }
          }}></Net>
      );
    }
  }
}
export {Favorites};

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

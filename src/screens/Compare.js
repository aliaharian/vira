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
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isConnected: undefined,
      compare: [],
      codeFirst: this.props.navigation.getParam('codeFirst'),
      codeSecond: this.props.navigation.getParam('codeSecond'),
    };
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
    const api = `https://beheene.com/api/v1/compare/${this.state.codeFirst}/${this.state.codeSecond}`;

    Axios.get(api)
      .then(response => {
        this.setState({compare: response.data});
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
              {/*----------Compare----------*/}
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
                  {strings(this.global.locale).Compare}
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
                }}
                showsVerticalScrollIndicator={false}>
                {/*--------------------First And Second Product Name--------------------*/}
                <View
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: responsiveHeight(2),
                    borderBottomWidth: responsiveHeight(0.2),
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(4),
                    borderColor: colors(this.global.theme).GRAY_SIX,
                  }}>
                  {/*--------------------Second Product--------------------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      //backgroundColor: 'yellow',
                      marginVertical: responsiveHeight(1),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                          textAlign: 'center',
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.props.navigation
                        .getParam('nameSecond')
                        .substring(0, 20) + '...'}
                    </Text>
                  </View>
                  {/*--------------------Retaining View--------------------*/}
                  <View
                    style={{
                      width: responsiveHeight(0.2),
                      alignSelf: 'stretch',
                      backgroundColor: colors(this.global.theme).GRAY_SIX,
                    }}></View>
                  {/*--------------------First Product--------------------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      alignItems: 'center',
                      //backgroundColor: 'brown',
                      marginVertical: responsiveHeight(1),
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                        },
                        fonts(this.global.SizeAndWeight).SECOND,
                      ]}>
                      {this.props.navigation
                        .getParam('nameFirst')
                        .substring(0, 20) + '...'}
                    </Text>
                  </View>
                </View>
                {/*--------------------FlatList--------------------*/}
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'pink',
                    flexDirection: 'row',
                  }}>
                  {/*--------------------Product 2--------------------*/}
                  <FlatList
                    style={{flex: 1, alignSelf: 'stretch'}}
                    data={this.state.compare.product2}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopWidth:
                                index == 0 ? 0 : responsiveHeight(0.2),
                              flexDirection: 'row',
                              marginLeft: responsiveWidth(4),
                              borderColor: colors(this.global.theme).GRAY_SIX,
                              //backgroundColor: 'red',
                            }}>
                            {/*--------------------title--------------------*/}
                            <View
                              style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                //backgroundColor: 'blue',
                                borderColor: colors(this.global.theme).GRAY_SIX,
                                marginVertical: responsiveHeight(1),
                              }}>
                              <Text
                                style={[
                                  {
                                    color: colors(this.global.theme).GRAY_SIX,
                                  },
                                  fonts(this.global.SizeAndWeight).SECOND,
                                ]}>
                                {item.title}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopWidth: responsiveHeight(0.2),
                              flexDirection: 'row',
                              marginLeft: responsiveWidth(4),
                              borderColor: colors(this.global.theme).GRAY_SIX,
                              //backgroundColor: 'red',
                            }}>
                            {/*--------------------Value--------------------*/}
                            <View
                              style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                //backgroundColor: 'blue',
                                borderColor: colors(this.global.theme).GRAY_SIX,
                                marginVertical: responsiveHeight(1),
                              }}>
                              <Text
                                style={[
                                  {
                                    color: colors(this.global.theme).GRAY_EIGHT,
                                  },
                                  fonts(this.global.SizeAndWeight).SECOND,
                                ]}>
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                    scrollEnabled={false}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}></FlatList>
                  {/*--------------------Product 1--------------------*/}
                  <FlatList
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      //backgroundColor: 'yellow',
                    }}
                    data={this.state.compare.product1}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopWidth:
                                index == 0 ? 0 : responsiveHeight(0.2),
                              flexDirection: 'row',
                              marginRight: responsiveWidth(4),
                              borderColor: colors(this.global.theme).GRAY_SIX,
                              //backgroundColor: 'red',
                            }}>
                            {/*--------------------Retaining View--------------------*/}
                            <View
                              style={{
                                width: responsiveHeight(0.2),
                                alignSelf: 'stretch',
                                backgroundColor: colors(this.global.theme)
                                  .GRAY_SIX,
                              }}></View>
                            {/*--------------------title--------------------*/}
                            <View
                              style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                //backgroundColor: 'blue',
                                borderColor: colors(this.global.theme).GRAY_SIX,
                                marginVertical: responsiveHeight(1),
                              }}>
                              <Text
                                style={[
                                  {
                                    color: colors(this.global.theme).GRAY_SIX,
                                  },
                                  fonts(this.global.SizeAndWeight).SECOND,
                                ]}>
                                {item.title}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              alignSelf: 'stretch',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopWidth: responsiveHeight(0.2),
                              flexDirection: 'row',
                              marginRight: responsiveWidth(4),
                              borderColor: colors(this.global.theme).GRAY_SIX,
                              //backgroundColor: 'red',
                            }}>
                            {/*--------------------Retaining View--------------------*/}
                            <View
                              style={{
                                width: responsiveHeight(0.2),
                                alignSelf: 'stretch',
                                backgroundColor: colors(this.global.theme)
                                  .GRAY_SIX,
                              }}></View>
                            {/*--------------------Value--------------------*/}
                            <View
                              style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                //backgroundColor: 'blue',
                                borderColor: colors(this.global.theme).GRAY_SIX,
                                marginVertical: responsiveHeight(1),
                              }}>
                              <Text
                                style={[
                                  {
                                    color: colors(this.global.theme).GRAY_EIGHT,
                                  },
                                  fonts(this.global.SizeAndWeight).SECOND,
                                ]}>
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                    scrollEnabled={false}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}></FlatList>
                </View>
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
            this.reLoad();
          }}></Net>
      );
    }
  }
}
export {Compare};

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

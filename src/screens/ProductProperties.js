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

class ProductProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      isLoading: true,
      isConnected: undefined,
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
    const api = 'https://beheene.com/api/v1/product';

    Axios.post(api, {
      code: this.props.navigation.getParam('code'),
    })
      .then(response => {
        this.setState({product: response.data});
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
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}
                onPress={() => {
                  this.props.navigation.navigate('_CompareBy', {
                    category: this.state.product.data[0].category,
                    codeFirstProduct: this.state.product.data[0].code,
                    nameFirstProduct: this.state.product.data[0].title,
                  });
                }}>
                <Image
                  style={{
                    width: responsiveHeight(4),
                    height: responsiveHeight(4),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/20.png')}></Image>
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
                  {strings(this.global.locale).ProductProperties}
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
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.state.product.data[0].options}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          //height: responsiveHeight(10),
                          alignSelf: 'stretch',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop:
                            index == 0
                              ? responsiveHeight(2)
                              : responsiveHeight(0.1),
                          borderTopWidth:
                            index == 0 ? 0 : responsiveHeight(0.2),
                          flexDirection: 'row',
                          marginHorizontal: responsiveWidth(4),
                          borderColor: colors(this.global.theme).GRAY_SIX,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            //backgroundColor: 'yellow',
                            marginRight: responsiveWidth(4),
                            marginVertical: responsiveHeight(1),
                          }}>
                          <Text
                            style={[
                              {
                                color: colors(this.global.theme).GRAY_SIX,
                              },
                              fonts(this.global.SizeAndWeight).SECOND,
                            ]}>
                            {item.value}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: responsiveHeight(0.2),
                            alignSelf: 'stretch',
                            backgroundColor: colors(this.global.theme).GRAY_SIX,
                          }}></View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                            //backgroundColor: 'pink',
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
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
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
                  showsVerticalScrollIndicator={false}></FlatList>
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
export {ProductProperties};

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

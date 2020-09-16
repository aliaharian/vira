import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Categories: [],
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
    this.reLoad();
  }

  reLoad() {
    const apiSale = 'https://beheene.com/api/v1/categories';
    Axios.get(apiSale)
      .then(response => {
        this.setState({Categories: response.data.data});
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
                  {strings(this.global.locale).Categories}
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
                {/*----------Touchable View All Item----------*/}
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
                      marginTop: responsiveHeight(2),
                    },
                    elevations(this.global.theme).FAVORITES,
                  ]}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).WHITE,
                      },
                      fonts(this.global.SizeAndWeight).SECOND,
                    ]}>
                    {strings(this.global.locale).ViewAllItem}
                  </Text>
                </TouchableOpacity>
                {/*----------Choose Category----------*/}
                <View
                  style={{
                    height: responsiveHeight(4),
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginHorizontal: responsiveWidth(4),
                    marginVertical: responsiveHeight(2),
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_SIX,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    {strings(this.global.locale).ChooseCategory}
                  </Text>
                </View>
                {/*----------Categories----------*/}
                {this.state.Categories.map(item => {
                  return (
                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(8),
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        borderBottomWidth: responsiveHeight(0.1),
                        borderColor: colors(this.global.theme).GRAY_THREE,
                      }}
                      key={item.title}
                      onPress={() => {
                        this.props.navigation.navigate('_SpecialCategory', {
                          category: item.title,
                        });
                      }}>
                      <Text
                        style={[
                          {
                            marginRight: responsiveWidth(4),
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
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
            this.reLoad();
          }}></Net>
      );
    }
  }
}
export {Categories};

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

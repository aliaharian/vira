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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {ProductViewAll} from '../components/Product';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class SpecialCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      category: this.props.navigation.getParam('category'),
      isConnected: undefined,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.loadData();
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  }

  loadData() {
    const api = `https://beheene.com/api/v1/category/${this.state.category}`;

    Axios.get(api)
      .then(response => {
        this.setState({products: response.data});
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
                  {this.state.category}
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
                  <ProductViewAll
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
                    endIndex={this.state.products.data.length}></ProductViewAll>
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
                    this.loadData();
                  }}></RefreshControl>
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
              }></FlatList>
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
            this.loadData();
          }}></Net>
      );
    }
  }
}
export {SpecialCategory};

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

import React, {Component} from 'reactn';
import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Slideshow from 'react-native-image-slider-show';
import Axios from 'axios';
import {colors, strings, elevations, fonts} from '../globals';
import {ProductHome} from '../components/Product';
import {Loading} from '../components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      position: 0,
      interval: null,
      dataSource: [
        {
          url:
            'http://pakhsheiranian.com/image/cache/catalog/0%20Kashi/EEFA/service/EEFA-Ceram-Aysoo-abi-800x800.jpg',
        },
        {
          url:
            'http://pakhsheiranian.com/image/cache/catalog/0%20Kashi/EEFA/service/EEFA-Ceram-fiojen-veronica-800x800.jpg',
        },
        {
          url:
            'http://pakhsheiranian.com/image/cache/catalog/0%20Kashi/EEFA/service/EEFA-Ceram-eroos-800x800.jpg',
        },
        {
          url:
            'https://www.irex2world.com/files/260/product/CCkFvveG6WDHeAhaCdhd.jpg',
        },
      ],
    };
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

  render() {
    const saleProducts = [
      {
        id: '1',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: true,
        salePrice: '8000',
        salePercent: 55,
        isNew: false,
        rating: 1,
        numberOfComments: 10,
      },
      {
        id: '2',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: true,
        salePrice: '8000',
        salePercent: 55,
        isNew: false,
        rating: 2,
        numberOfComments: 55,
      },
      {
        id: '3',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: true,
        salePrice: '8000',
        salePercent: 55,
        isNew: false,
        rating: 5,
        numberOfComments: 3,
      },
    ];
    const newProducts = [
      {
        id: '1',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: false,
        salePrice: '8000',
        salePercent: 55,
        isNew: true,
        rating: 1,
        numberOfComments: 10,
      },
      {
        id: '2',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: false,
        salePrice: '8000',
        salePercent: 55,
        isNew: true,
        rating: 2,
        numberOfComments: 55,
      },
      {
        id: '3',
        name: 'سرامیک حمام',
        grouping: 'سرامیک',
        price: '10000',
        isSale: false,
        salePrice: '8000',
        salePercent: 55,
        isNew: true,
        rating: 5,
        numberOfComments: 3,
      },
    ];
    if (this.state.isLoading == true) {
      return <Loading></Loading>;
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
                  activeOpacity={0.9}>
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
            <View
              style={{
                height: responsiveHeight(4),
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: responsiveHeight(2),
                paddingRight: responsiveWidth(4),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).SuperSummerSale}
              </Text>
            </View>
            {/*----------Products List----------*/}
            <FlatList
              style={{flex: 1, alignSelf: 'stretch'}}
              data={saleProducts}
              renderItem={({item, index}) => {
                return (
                  <ProductHome
                    navigation={this.props.navigation}
                    salePercent={item.salePercent}
                    isNew={item.isNew}
                    isSale={item.isSale}
                    name={item.name}
                    grouping={item.grouping}
                    price={item.price}
                    salePrice={item.salePrice}
                    rating={item.rating}
                    numberOfComments={item.numberOfComments}
                    witchIndex={index}
                    endIndex={saleProducts.length}></ProductHome>
                );
              }}
              horizontal
              inverted
              showsHorizontalScrollIndicator={false}
              key={item => item.id}></FlatList>
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
                  activeOpacity={0.9}>
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
            <View
              style={{
                height: responsiveHeight(4),
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: responsiveHeight(2),
                paddingRight: responsiveWidth(4),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).YouHaveNeverSeenItBefore}
              </Text>
            </View>
            {/*----------Products List----------*/}
            <FlatList
              style={{
                flex: 1,
                alignSelf: 'stretch',
                marginBottom: responsiveHeight(12),
              }}
              data={newProducts}
              renderItem={({item, index}) => {
                return (
                  <ProductHome
                    navigation={this.props.navigation}
                    salePercent={item.salePercent}
                    isNew={item.isNew}
                    isSale={item.isSale}
                    name={item.name}
                    grouping={item.grouping}
                    price={item.price}
                    salePrice={item.salePrice}
                    rating={item.rating}
                    numberOfComments={item.numberOfComments}
                    witchIndex={index}
                    endIndex={newProducts.length}></ProductHome>
                );
              }}
              horizontal
              inverted
              showsHorizontalScrollIndicator={false}
              key={item => item.id}></FlatList>
          </ScrollView>
        </View>
      );
    }
  }
}
export {Home};

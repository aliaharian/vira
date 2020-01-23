import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, strings, elevations, fonts} from '../globals';
import {Product} from '../components';

class Shop extends Component {
  constructor(props) {
    super(props);

    this.setGlobal({
      query: 'سرامیک',
      query_one: '5000',
      sort: 'مرتب سازی',
      products: [
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
          salePrice: '5000',
          salePercent: 55,
          isNew: false,
          rating: 5,
          numberOfComments: 3,
        },
        {
          id: '4',
          name: 'سرامیک حمام',
          grouping: 'سرامیک',
          price: '10000',
          isSale: true,
          salePrice: '5000',
          salePercent: 55,
          isNew: false,
          rating: 4,
          numberOfComments: 55,
        },
        {
          id: '5',
          name: 'سرامیک حمام',
          grouping: 'سرامیک',
          price: '10000',
          isSale: true,
          salePrice: '5000',
          salePercent: 55,
          isNew: false,
          rating: 5,
          numberOfComments: 3,
        },
        {
          id: '5',
          name: 'سرامیک حمام',
          grouping: 'کاشی',
          price: '10000',
          isSale: true,
          salePrice: '5000',
          salePercent: 55,
          isNew: false,
          rating: 2,
          numberOfComments: 8,
        },
        {
          id: '5',
          name: 'سرامیک حمام',
          grouping: 'کاشی',
          price: '10000',
          isSale: true,
          salePrice: '5000',
          salePercent: 55,
          isNew: false,
          rating: 3,
          numberOfComments: 23,
        },
      ],
    });
  }

  search(query, query_one) {
    return this.global.products.filter(item => {
      return item.grouping.includes(query), item.salePrice.includes(query_one);
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
                this.global.sort == strings(this.global.locale).Popular
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setGlobal(
                {sort: strings(this.global.locale).Popular},
                this.RBSheet.close(),
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.global.sort == strings(this.global.locale).Popular
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.global.sort == strings(this.global.locale).Popular
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
                this.global.sort == strings(this.global.locale).Newest
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setGlobal(
                {sort: strings(this.global.locale).Newest},
                this.RBSheet.close(),
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.global.sort == strings(this.global.locale).Newest
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.global.sort == strings(this.global.locale).Newest
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
                this.global.sort == strings(this.global.locale).CustomerReview
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setGlobal(
                {sort: strings(this.global.locale).CustomerReview},
                this.RBSheet.close(),
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.global.sort ==
                    strings(this.global.locale).CustomerReview
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.global.sort == strings(this.global.locale).CustomerReview
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
                this.global.sort ==
                strings(this.global.locale).PriceLowestToHigh
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setGlobal(
                {sort: strings(this.global.locale).PriceLowestToHigh},
                this.RBSheet.close(),
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.global.sort ==
                    strings(this.global.locale).PriceLowestToHigh
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.global.sort ==
                strings(this.global.locale).PriceLowestToHigh
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
                this.global.sort ==
                strings(this.global.locale).PriceHighestToLow
                  ? colors(this.global.theme).RED_ONE
                  : colors(this.global.theme).GRAY_ONE,
            }}
            onPress={() => {
              this.setGlobal(
                {sort: strings(this.global.locale).PriceHighestToLow},
                this.RBSheet.close(),
              );
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(4),
                  color:
                    this.global.sort ==
                    strings(this.global.locale).PriceHighestToLow
                      ? colors(this.global.theme).WHITE
                      : colors(this.global.theme).GRAY_EIGHT,
                },
                this.global.sort ==
                strings(this.global.locale).PriceHighestToLow
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

  render() {
    const categories = ['سرامیک', 'کاشی', 'سنگ آنتیک', 'سنگ نما رومی'];
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: colors(this.global.theme).GRAY_ONE,
        }}>
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
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: responsiveWidth(4),
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
                  data={categories}
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
                          backgroundColor: colors(this.global.theme).GRAY_EIGHT,
                          marginRight: responsiveWidth(4),
                          marginLeft:
                            index == categories.length - 1
                              ? responsiveWidth(4)
                              : 0,
                        }}>
                        <Text
                          style={[
                            {
                              color: colors(this.global.theme).WHITE,
                            },
                            fonts(this.global.SizeAndWeight).SECOND,
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  horizontal
                  inverted
                  showsHorizontalScrollIndicator={false}></FlatList>
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
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        {
                          color: colors(this.global.theme).GRAY_EIGHT,
                          marginRight: responsiveWidth(2),
                        },
                        fonts(this.global.SizeAndWeight).FIRST,
                      ]}>
                      {strings(this.global.locale).Compare}
                    </Text>
                    <Image
                      style={{
                        width: responsiveHeight(3),
                        height: responsiveHeight(3),
                        tintColor: colors(this.global.theme).GRAY_EIGHT,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/20.png')}></Image>
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
                      {this.global.sort}
                    </Text>
                    <Image
                      style={{
                        width: responsiveHeight(3),
                        height: responsiveHeight(3),
                        tintColor: colors(this.global.theme).GRAY_EIGHT,
                        resizeMode: 'center',
                      }}
                      source={require('../Image/19.png')}></Image>
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
                      this.props.navigation.navigate('_Filter');
                    }}>
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
                      source={require('../Image/18.png')}></Image>
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
          data={
            this.global.query
              ? this.search(this.global.query, this.global.query_one)
              : this.global.products
          }
          renderItem={({item, index}) => {
            return (
              <Product
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
                endIndex={
                  this.global.query
                    ? this.search(this.global.query, this.global.query_one)
                        .length
                    : this.global.products.length
                }></Product>
            );
          }}
          showsVerticalScrollIndicator={false}
          key={item => item.id}
          numColumns={2}></FlatList>
      </View>
    );
  }
}
export {Shop};

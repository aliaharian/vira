import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  Picker,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Share from 'react-native-share';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating} from '../components';
import {ProductHome} from '../components/Product';

class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setGlobal({
      productName: 'نام محصول',
      productImages: [
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
      colorSelect: '',
    });
  }

  render() {
    const colorSE = [
      {label: 'مشکی', value: 'tehran'},
      {label: 'سفید', value: 'karaj'},
      {label: 'آبی', value: 'shiraz'},
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
          {/*---------Share----------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: responsiveWidth(4),
            }}
            onPress={() => {
              let shareOptions = {
                title: 'a',
                message: 'b',
              };

              Share.open(shareOptions)
                .then(response =>
                  console.warn(JSON.stringify(response, null, 2)),
                )
                .catch(error => console.warn(error));
            }}>
            <Image
              style={{
                width: responsiveHeight(4),
                height: responsiveHeight(4),
                tintColor: colors(this.global.theme).GRAY_EIGHT,
                resizeMode: 'center',
              }}
              source={require('../Image/23.png')}></Image>
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
              {this.global.productName}
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
        {/*--------------------AddToCard--------------------*/}
        <View
          style={[
            {
              height: responsiveHeight(12),
              width: Dimensions.get('window').width,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors(this.global.theme).WHITE,
              zIndex: 1,
              position: 'absolute',
              bottom: 0,
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              marginHorizontal: responsiveWidth(4),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
            }}>
            <Text
              style={[
                {
                  marginRight: responsiveWidth(1),
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).AddToCard}
            </Text>
          </TouchableOpacity>
        </View>
        {/*--------------------Bottom Part--------------------*/}
        <ScrollView
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginBottom: responsiveHeight(2),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: colors(this.global.theme).GRAY_ONE,
            }}>
            {/*--------------------Product Images--------------------*/}
            <View
              style={{
                height: responsiveHeight(50),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                }}
                data={this.global.productImages}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(50),
                        aspectRatio: 0.66,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft:
                          index == this.global.productImages.length - 1
                            ? 0
                            : responsiveWidth(1),
                      }}
                      activeOpacity={0.9}
                      onPress={() => {
                        this.setGlobal({witchPicture: index}, () => {
                          this.props.navigation.navigate('_Zoom');
                        });
                      }}>
                      <Image
                        style={{
                          width: undefined,
                          height: undefined,
                          flex: 1,
                          alignSelf: 'stretch',
                          resizeMode: 'cover',
                        }}
                        source={{uri: item.url}}></Image>
                    </TouchableOpacity>
                  );
                }}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}></FlatList>
            </View>
            {/*--------------------Select Color And Favorites--------------------*/}
            <View
              style={{
                height: responsiveHeight(10),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/*----------Favorites----------*/}
              <View
                style={{
                  flex: 1.5,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <TouchableOpacity
                  style={[
                    {
                      width: responsiveHeight(6),
                      height: responsiveHeight(6),
                      backgroundColor: colors(this.global.theme).WHITE,
                      borderRadius: 100,
                      marginLeft: responsiveWidth(4),
                    },
                    elevations(this.global.shadow).FAVORITES,
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {}}>
                  <Image
                    style={{
                      width: undefined,
                      height: undefined,
                      margin: responsiveHeight(1.5),
                      flex: 1,
                      tintColor: colors(this.global.theme).RED_ONE,
                      resizeMode: 'center',
                    }}
                    source={require('../Image/07.png')}></Image>
                </TouchableOpacity>
              </View>
              {/*----------Select Color----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors(this.global.theme).WHITE,
                  borderWidth: responsiveWidth(0.1),
                  borderColor: colors(this.global.theme).GRAY_SIX,
                  borderRadius: responsiveWidth(3),
                  marginRight: responsiveWidth(4),
                  marginVertical: responsiveHeight(2),
                }}>
                <Picker
                  style={{flex: 1, alignSelf: 'stretch'}}
                  selectedValue={this.global.colorSelect}
                  onValueChange={value => {
                    this.setGlobal({colorSelect: value});
                  }}>
                  {colorSE.map(item => {
                    return (
                      <Picker.Item
                        key={item.label}
                        label={item.label}
                        value={item.value}></Picker.Item>
                    );
                  })}
                </Picker>
              </View>
            </View>
            {/*--------------------Name And Price--------------------*/}
            <View
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/*----------Price----------*/}
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
                      marginLeft: responsiveWidth(4),
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  10000 تومان
                </Text>
              </View>
              {/*----------Name----------*/}
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
                      marginRight: responsiveWidth(4),
                      color: colors(this.global.theme).GRAY_EIGHT,
                    },
                    fonts(this.global.SizeAndWeight).Third,
                  ]}>
                  نام کالا
                </Text>
              </View>
            </View>
            {/*--------------------Seller Name--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    marginRight: responsiveWidth(4),
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                نام فروشنده
              </Text>
            </View>
            {/*--------------------Rating--------------------*/}
            <View
              style={{
                height: responsiveHeight(3),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: responsiveWidth(61),
                paddingLeft: responsiveWidth(4),
              }}>
              <Rating
                disable={true}
                isNumber={true}
                numberOfComments={10}
                rating={4}></Rating>
            </View>
            {/*--------------------About Product--------------------*/}
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: responsiveWidth(4),
                paddingLeft: responsiveWidth(4),
              }}>
              <Text
                style={[
                  {
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    marginVertical: responsiveHeight(2),
                    lineHeight: responsiveHeight(4),
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                به موادی (معمولاً جامد) که بخش عمدهٔ تشکیل‌دهندهٔ آن‌ها غیرفلزی
                و غیرآلی باشد، سرامیک گفته می‌شود. همچنین بر اساس برخی تعاریف،
                از نظر شیمیایی به موادی که از مخلوط خاک رس با ماسه و فلدسپات در
                دمای زیاد تشکیل شده و به صورت توده‌ای شیشه مانند درمی‌آیند و نیز
                تقریباً گداز ناپذیر و غیر حلال و بسیار سخت هستند، سرامیک گفته
                می‌شود.
              </Text>
            </View>
            {/*--------------------Product Properties--------------------*/}
            <TouchableOpacity
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: colors(this.global.theme).GRAY_ONE,
                flexDirection: 'row-reverse',
                borderTopWidth: responsiveHeight(0.1),
                borderBottomWidth: responsiveHeight(0.1),
                borderColor: colors(this.global.theme).GRAY_SIX,
              }}>
              {/*----------Text----------*/}
              <View
                style={{
                  flex: 3,
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
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).ProductProperties}
                </Text>
              </View>
              {/*----------Image----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}>
                <Image
                  style={{
                    width: responsiveHeight(2),
                    height: responsiveHeight(2),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/24.png')}></Image>
              </View>
            </TouchableOpacity>
            {/*--------------------Rating And Reviews--------------------*/}
            <TouchableOpacity
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: colors(this.global.theme).GRAY_ONE,
                flexDirection: 'row-reverse',
                //borderTopWidth: responsiveHeight(0.1),
                borderBottomWidth: responsiveHeight(0.1),
                borderColor: colors(this.global.theme).GRAY_SIX,
              }}
              onPress={() => {
                this.props.navigation.navigate('_Reviews');
              }}>
              {/*----------Text----------*/}
              <View
                style={{
                  flex: 3,
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
                    fonts(this.global.SizeAndWeight).SECOND,
                  ]}>
                  {strings(this.global.locale).RatingAndReviews}
                </Text>
              </View>
              {/*----------Image----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: responsiveWidth(4),
                }}>
                <Image
                  style={{
                    width: responsiveHeight(2),
                    height: responsiveHeight(2),
                    tintColor: colors(this.global.theme).GRAY_EIGHT,
                    resizeMode: 'center',
                  }}
                  source={require('../Image/24.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
          {/*--------------------You Can Also Like This--------------------*/}
          <View
            style={{
              height: responsiveHeight(5),
              alignSelf: 'stretch',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              marginVertical: responsiveHeight(2),
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
                  fonts(this.global.SizeAndWeight).SECOND,
                ]}>
                {strings(this.global.locale).YouCanAlsoLikeThis}
              </Text>
            </View>
            {/*----------Number Of Items----------*/}
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                      color: colors(this.global.theme).GRAY_SIX,
                    },
                    fonts(this.global.SizeAndWeight).FIRST,
                  ]}>
                  12 مورد
                </Text>
              </View>
            </View>
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
export {SingleCard};

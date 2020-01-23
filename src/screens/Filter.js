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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        '#020202',
        '#f6f6f6',
        '#b82222',
        '#bea9a9',
        '#e2bb8d',
        '#151867',
      ],
      witchColors: [],
      categories: ['همه', 'سرامیک', 'کاشی', 'سنگ آنتیک', 'واش بتن'],
      witchCategories: [],
      rangeLow: '',
      rangeHigh: '',
    };
  }

  render() {
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
              {strings(this.global.locale).Filter}
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
            </View>
            {/*----------Colors Text----------*/}
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
                {strings(this.global.locale).Colors}
              </Text>
            </View>
            {/*----------Colors Choose----------*/}
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
                  marginHorizontal: responsiveWidth(4),
                }}
                data={this.state.colors}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width:
                          Dimensions.get('window').width / 6 -
                          responsiveWidth(4),
                        height:
                          Dimensions.get('window').width / 6 -
                          responsiveWidth(4),
                        marginTop: responsiveHeight(2),
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginRight: responsiveWidth(3.2),
                        borderColor: this.state.witchColors.includes(item)
                          ? colors(this.global.theme).RED_ONE
                          : colors(this.global.theme).WHITE,
                        borderWidth: responsiveHeight(0.2),
                      }}
                      onPress={() => {
                        var newWitchColors = [...this.state.witchColors];

                        if (this.state.witchColors.includes(item)) {
                          let witchIndex = this.state.witchColors.indexOf(item);
                          newWitchColors.splice(witchIndex, 1);
                          this.setState({witchColors: newWitchColors});
                        } else {
                          newWitchColors.push(item);
                          this.setState({witchColors: newWitchColors});
                        }
                      }}>
                      <View
                        style={{
                          width:
                            Dimensions.get('window').width / 6 -
                            responsiveWidth(7),
                          height:
                            Dimensions.get('window').width / 6 -
                            responsiveWidth(7),
                          borderRadius: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          backgroundColor: item,
                        }}></View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item}
                numColumns={6}
                showsHorizontalScrollIndicator={false}></FlatList>
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
                data={this.state.categories}
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
                          item,
                        )
                          ? colors(this.global.theme).RED_ONE
                          : colors(this.global.theme).WHITE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: responsiveWidth(3),
                        marginLeft: responsiveWidth(4),
                        marginTop: responsiveHeight(2),
                        borderWidth: this.state.witchCategories.includes(item)
                          ? 0
                          : responsiveHeight(0.2),
                        borderColor: colors(this.global.theme).GRAY_SIX,
                      }}
                      onPress={() => {
                        var newWitchCategories = [
                          ...this.state.witchCategories,
                        ];

                        if (this.state.witchCategories.includes(item)) {
                          let witchIndex = this.state.witchCategories.indexOf(
                            item,
                          );
                          newWitchCategories.splice(witchIndex, 1);
                          this.setState({witchCategories: newWitchCategories});
                        } else {
                          newWitchCategories.push(item);
                          this.setState({witchCategories: newWitchCategories});
                        }
                      }}>
                      <Text
                        style={[
                          {
                            color: this.state.witchCategories.includes(item)
                              ? colors(this.global.theme).WHITE
                              : colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).FIRST,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                numColumns={3}></FlatList>
            </View>
            <View
              style={{
                height: responsiveHeight(12),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
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
                this.props.navigation.navigate('_Landing');
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
                this.props.navigation.goBack();
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
    );
  }
}
export {Filter};

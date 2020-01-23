import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Categories = [
      {title: 'سرامیک', Navigation: 'Landing'},
      {title: 'کاشی', Navigation: 'Landing'},
      {title: 'سنگ آنتیک', Navigation: 'Landing'},
      {title: 'سنگ نما رومی', Navigation: 'Landing'},
      {title: 'سرامیک', Navigation: 'Landing'},
      {title: 'کاشی', Navigation: 'Landing'},
      {title: 'سنگ آنتیک', Navigation: 'Landing'},
      {title: 'سنگ نما رومی', Navigation: 'Landing'},
      {title: 'سرامیک', Navigation: 'Landing'},
      {title: 'کاشی', Navigation: 'Landing'},
      {title: 'سنگ آنتیک', Navigation: 'Landing'},
      {title: 'سنگ نما رومی', Navigation: 'Landing'},
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
              ]}>
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
            {Categories.map(item => {
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
                    this.props.navigation.navigate(item.Navigation);
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
      </View>
    );
  }
}
export {Categories};

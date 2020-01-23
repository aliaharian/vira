import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {FavoriteCard} from '../components';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {favoriteProducts: ['1', '2', '3', '4']};
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
                width: responsiveHeight(4),
                height: responsiveHeight(4),
                tintColor: colors(this.global.theme).GRAY_EIGHT,
                resizeMode: 'center',
              }}
              source={require('../Image/17.png')}></Image>
          </View>
          {/*----------Header Text----------*/}
          <View
            style={{
              flex: 3,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
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
              data={this.state.favoriteProducts}
              renderItem={({item, index}) => {
                return (
                  <FavoriteCard
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
export {Favorites};

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
import ImageZoom from 'react-native-image-pan-zoom';
import {colors, strings, elevations, fonts} from '../globals';

class Zoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isZoom: false,
      witchIndex: this.global.witchPicture,
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
        {
          url:
            'https://www.otag.ir/wp-content/uploads/%DA%A9%D8%A7%D8%B4%DB%8C-13.jpg',
        },
      ],
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
        {this.state.isZoom == false ? (
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
            {/*----------Number Of Pictures----------*/}
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: responsiveWidth(4),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).Third,
                ]}>
                {Number(this.state.witchIndex) + 1} از{' '}
                {this.state.productImages.length}
              </Text>
            </View>
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
                {strings(this.global.locale).Pictures}
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
                source={require('../Image/25.png')}></Image>
            </TouchableOpacity>
          </View>
        ) : (
          () => {}
        )}
        {/*--------------------Bottom Part--------------------*/}
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors(this.global.theme).GRAY_ONE,
          }}>
          {/*----------Large---------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              ref={flatListLarge => {
                this.flatListLarge = flatListLarge;
              }}
              style={{
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: colors(this.global.theme).GRAY_ONE,
              }}
              data={this.state.productImages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('window').width,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    activeOpacity={0.9}>
                    <ImageZoom
                      cropWidth={Dimensions.get('window').width}
                      cropHeight={
                        this.state.Zoom == false
                          ? Dimensions.get('window').height -
                            responsiveHeight(24)
                          : Dimensions.get('window').height
                      }
                      imageWidth={Dimensions.get('window').width}
                      imageHeight={Dimensions.get('window').height}
                      panToMove={false}
                      onClick={() => {
                        this.setState({isZoom: !this.state.isZoom});
                      }}>
                      <Image
                        style={{
                          width: undefined,
                          height: undefined,
                          flex: 1,
                          alignSelf: 'stretch',
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: item.url,
                        }}
                      />
                    </ImageZoom>
                  </TouchableOpacity>
                );
              }}
              initialScrollIndex={this.global.witchPicture}
              horizontal
              inverted
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={e => {
                const contentOffset = e.nativeEvent.contentOffset;
                const viewSize = e.nativeEvent.layoutMeasurement;

                const witchSlide = (contentOffset.x / viewSize.width).toFixed();

                this.setState({witchIndex: witchSlide});
              }}></FlatList>
          </View>
          {/*----------Small---------*/}
          {this.state.isZoom == false ? (
            <View
              style={{
                height: responsiveHeight(12),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}>
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  backgroundColor: colors(this.global.theme).GRAY_ONE,
                }}
                data={this.state.productImages}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(12),
                        aspectRatio: 0.66,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft:
                          index == this.state.productImages.length - 1
                            ? 0
                            : responsiveWidth(1),
                      }}
                      activeOpacity={0.9}>
                      <Image
                        style={{
                          width: undefined,
                          height: undefined,
                          flex: 1,
                          alignSelf: 'stretch',
                          resizeMode: 'cover',
                        }}
                        source={{uri: item.url}}></Image>
                      <View
                        style={{
                          height: responsiveHeight(1),
                          alignSelf: 'stretch',
                          backgroundColor:
                            index == this.state.witchIndex
                              ? colors(this.global.theme).RED_ONE
                              : colors(this.global.theme).GRAY_ONE,
                        }}></View>
                    </TouchableOpacity>
                  );
                }}
                initialScrollIndex={this.props.witchPicture}
                inverted
                horizontal
                showsHorizontalScrollIndicator={false}></FlatList>
            </View>
          ) : (
            () => {}
          )}
        </View>
      </View>
    );
  }
}
export {Zoom};

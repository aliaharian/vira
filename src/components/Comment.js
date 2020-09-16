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
import {Rating} from '../components';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: responsiveWidth(4),
        }}>
        {/*--------------------User Image--------------------*/}
        <View
          style={[
            {
              height: responsiveHeight(8),
              width: responsiveHeight(8),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors(this.global.theme).WHITE,
              borderRadius: 100,
              zIndex: 1,
              position: 'absolute',
              top: 0,
              right: 0,
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          <Image
            style={{
              width: undefined,
              height: undefined,
              flex: 1,
              alignSelf: 'stretch',
              //tintColor: colors(this.global.theme).RED_ONE,
              resizeMode: 'cover',
              borderRadius: 100,
            }}
            source={{uri: this.props.userImage}}></Image>
        </View>
        {/*--------------------Total Part--------------------*/}
        <View
          style={[
            {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'flex-start',
              backgroundColor: colors(this.global.theme).WHITE,
              marginHorizontal: responsiveWidth(6),
              marginTop: responsiveHeight(4),
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(4),
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          {/*----------Name---------*/}
          <View
            style={{
              height: responsiveHeight(4),
              alignSelf: 'stretch',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: responsiveHeight(4),
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {this.props.userName}
            </Text>
          </View>
          {/*----------Rate And Date---------*/}
          <View
            style={{
              height: responsiveHeight(3),
              alignSelf: 'stretch',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingRight: responsiveWidth(10),
              }}>
              <Rating
                disable={true}
                isNumber={false}
                rating={this.props.ratingCo}></Rating>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).NUMBERFIRST,
                ]}>
                {this.props.date}
              </Text>
            </View>
          </View>
          {/*----------Comment---------*/}
          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_SEVEN,
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  lineHeight: responsiveHeight(4),
                  marginBottom: responsiveHeight(2),
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              {this.props.commentText}
            </Text>
          </View>
        </View>
        <View
          style={{height: responsiveHeight(2), alignSelf: 'stretch'}}></View>
      </View>
    );
  }
}
export {Comment};

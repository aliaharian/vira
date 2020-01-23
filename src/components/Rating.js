import React, {Component} from 'reactn';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichStar: this.props.rating,
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {/*--------------------First Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 1});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 1
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 2
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 1
                    ? require('../Image/14.png')
                    : this.state.whichStar == 2
                    ? require('../Image/14.png')
                    : this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Second Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 2});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 2
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 2
                    ? require('../Image/14.png')
                    : this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Third Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 3});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Forth Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 4});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Fifth Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 5});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
        </View>
        {/*--------------------Number of comments--------------------*/}
        <View
          style={{
            flex: 0.4,
            alignSelf: 'stretch',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            marginEnd: responsiveWidth(1),
          }}>
          {this.props.isNumber == true ? (
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_SIX,
                  marginRight: responsiveWidth(0.5),
                },
                fonts(this.global.SizeAndWeight).FIRST,
              ]}>
              ({this.props.numberOfComments})
            </Text>
          ) : (
            () => {}
          )}
        </View>
      </View>
    );
  }
}
export {Rating};

////////////////////////////////////////////////////////////////////////////////////////////////////////
class RatingTouchable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichStar: this.props.rating,
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {/*--------------------First Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 1});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 1
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 2
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 1
                    ? require('../Image/14.png')
                    : this.state.whichStar == 2
                    ? require('../Image/14.png')
                    : this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Second Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 2});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 2
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 2
                    ? require('../Image/14.png')
                    : this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Third Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 3});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 3
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 3
                    ? require('../Image/14.png')
                    : this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Forth Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: this.props.isReViews
                ? responsiveWidth(2)
                : responsiveWidth(0.5),
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 4});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 4
                      ? colors(this.global.theme).YELLOW
                      : this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 4
                    ? require('../Image/14.png')
                    : this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
          {/*--------------------Fifth Star--------------------*/}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={this.props.disable}
            onPress={() => {
              this.setState({whichStar: 5});
            }}
            activeOpacity={0.9}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignSelf: 'stretch',
                  tintColor:
                    this.state.whichStar == 5
                      ? colors(this.global.theme).YELLOW
                      : colors(this.global.theme).GRAY_SIX,
                  resizeMode: 'center',
                }}
                source={
                  this.state.whichStar == 5
                    ? require('../Image/14.png')
                    : require('../Image/15.png')
                }></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export {RatingTouchable};

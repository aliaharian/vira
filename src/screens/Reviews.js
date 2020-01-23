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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating, Comment} from '../components';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichStar: 0,
      message: '',
      comments: [
        {
          userImage: require('../Image/21.png'),
          userName: 'کاربر',
          ratingC: '3',
          date: '1398/10/28',
          commentText: 'سلام سرامیک بسیار زیبایی است.',
        },
        {
          userImage: require('../Image/21.png'),
          userName: 'کاربر',
          ratingC: '5',
          date: '1398/10/28',
          commentText:
            'خرید این سرامیک را به دلایل بسیاری از جمله زیبایی و دوام به شما توصیه می کنم. مطمئنا از خرید خودتون پشیمون نمی شید. ',
        },
        {
          userImage: require('../Image/21.png'),
          userName: 'کاربر',
          ratingC: '2',
          date: '1398/10/28',
          commentText:
            'خرید این سرامیک را به دلایل بسیاری از جمله زیبایی و دوام به شما توصیه می کنم. مطمئنا از خرید خودتون پشیمون نمی شید. ',
        },
        {
          userImage: require('../Image/21.png'),
          userName: 'کاربر',
          ratingC: '1',
          date: '1398/10/28',
          commentText:
            'خرید این سرامیک را به دلایل بسیاری از جمله زیبایی و دوام به شما توصیه می کنم. مطمئنا از خرید خودتون پشیمون نمی شید. ',
        },
      ],
    };
  }

  //-------------------Write Review Bottom Sheet--------------------
  bottomSheet() {
    return (
      <RBSheet
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors(this.global.theme).GRAY_SIX,
          },
          container: {
            height: responsiveHeight(50),
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
          {/*----------Text What Is You Rate----------*/}
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
              {strings(this.global.locale).WhatIsYouRate}
            </Text>
          </View>
          {/*----------//////////----------Star----------//////////----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(15),
            }}>
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
                    marginRight: responsiveWidth(2),
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
                    marginRight: responsiveWidth(2),
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
                    marginRight: responsiveWidth(2),
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
                    marginRight: responsiveWidth(2),
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
          </View>
          {/*----------Text Please Share Your Opinion Abut The Product----------*/}
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).GRAY_EIGHT,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).PleaseShareYourOpinionAbutTheProduct}
            </Text>
          </View>
          {/*----------Text Input----------*/}
          <View
            style={{
              flex: 4,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: responsiveHeight(2),
            }}>
            <TextInput
              ref={input => {
                this.input = input;
              }}
              style={[
                {
                  flex: 1,
                  alignSelf: 'stretch',
                  marginHorizontal: responsiveWidth(4),
                  borderRadius: responsiveWidth(3),
                  textAlignVertical: 'bottom',
                  textAlign: 'right',
                  lineHeight: responsiveHeight(6),
                  color: colors(this.global.theme).GRAY_SEVEN,
                  paddingLeft: 10,
                  fontSize: 20,
                  backgroundColor: colors(this.global.theme).WHITE,
                },
                fonts(this.global.locale).Third,
              ]}
              placeholderTextColor={colors(this.global.theme).GRAY_SEVEN}
              value={this.state.message}
              onChangeText={message => this.setState({message})}
              multiline={true}
            />
          </View>
          {/*----------Send Review----------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              alignSelf: 'stretch',
              marginHorizontal: responsiveWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: responsiveHeight(2),
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
            }}
            onPress={() => {
              this.input.clear();
              Keyboard.dismiss();
              this.RBSheet.close();

              let newComments = this.state.comments;

              newComments.unshift({
                userImage: require('../Image/21.png'),
                userName: 'کاربر',
                ratingC: this.state.WhichStar,
                date: '1398/10/28',
                commentText: this.state.message,
              });

              this.setState({comments: newComments, message: '', whichStar: 0});
            }}>
            <Text
              style={[
                {
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).SendReview}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
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
            }}></View>
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
          {/*--------------------Write A Review--------------------*/}
          <TouchableOpacity
            style={{
              height: responsiveHeight(8),
              width: responsiveWidth(40),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors(this.global.theme).RED_ONE,
              borderRadius: 100,
              zIndex: 1,
              position: 'absolute',
              bottom: responsiveHeight(2),
              left: responsiveWidth(4),
              flexDirection: 'row',
            }}
            onPress={() => this.RBSheet.open()}>
            {this.bottomSheet()}
            <Text
              style={[
                {
                  marginRight: responsiveWidth(1),
                  color: colors(this.global.theme).WHITE,
                },
                fonts(this.global.SizeAndWeight).SECOND,
              ]}>
              {strings(this.global.locale).WriteAReview}
            </Text>
            <Image
              style={{
                width: responsiveWidth(5),
                height: responsiveWidth(5),
                tintColor: colors(this.global.theme).WHITE,
                resizeMode: 'center',
              }}
              source={require('../Image/22.png')}></Image>
          </TouchableOpacity>
          <ScrollView
            style={{flex: 1, alignSelf: 'stretch'}}
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
                  fonts(this.global.SizeAndWeight).Third,
                ]}>
                {strings(this.global.locale).RatingAndReviews}
              </Text>
            </View>
            {/*--------------------Rating--------------------*/}
            <View
              style={{
                height: responsiveHeight(8),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: responsiveWidth(4),
                marginVertical: responsiveHeight(2),
              }}>
              {/*----------Stars----------*/}
              <View
                style={{
                  flex: 2,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Rating
                  rating={4}
                  disable={true}
                  number={false}
                  isReViews={true}></Rating>
              </View>
              {/*----------Retaining View----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              {/*----------Text----------*/}
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 2,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      {
                        color: colors(this.global.theme).GRAY_EIGHT,
                      },
                      fonts(this.global.SizeAndWeight).Forth,
                    ]}>
                    4.3
                  </Text>
                </View>
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
                        color: colors(this.global.theme).GRAY_SIX,
                      },
                      fonts(this.global.SizeAndWeight).FIRST,
                    ]}>
                    23 رای
                  </Text>
                </View>
              </View>
            </View>
            {/*--------------------Reviews--------------------*/}
            <View
              style={{
                height: responsiveHeight(6),
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: responsiveWidth(4),
                marginTop: responsiveHeight(4),
                marginBottom: responsiveHeight(2),
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_EIGHT,
                  },
                  fonts(this.global.SizeAndWeight).Third,
                ]}>
                {this.state.comments.length}
                {strings(this.global.locale).Reviews}
              </Text>
            </View>
            {/*--------------------Comments--------------------*/}
            <FlatList
              style={{flex: 1, alignSelf: 'stretch'}}
              data={this.state.comments}
              renderItem={({item, index}) => {
                return (
                  <Comment
                    userImage={item.userImage}
                    userName={item.userName}
                    ratingCo={item.ratingC}
                    date={item.date}
                    commentText={item.commentText}></Comment>
                );
              }}
              keyExtractor={item => item.userName}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}></FlatList>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export {Reviews};

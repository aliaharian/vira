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
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating, Comment} from '../components';
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichStar: 0,
      message: '',
      comments: [],
      product: [],
      isLoading: true,
      isConnected: undefined,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.reLoad();
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  }

  reLoad() {
    const api = 'https://beheene.com/api/v1/product';

    Axios.post(api, {
      code: this.props.navigation.getParam('code'),
    })
      .then(response => {
        this.setState({product: response.data.data[0]});
      })
      .catch(error => {
        this._spring();
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -responsiveHeight(1),
          friction: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });
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
                  marginHorizontal: responsiveWidth(4),
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

              Axios.post(
                'https://beheene.com/api/v1/add_comment',
                {
                  mobile: `${this.global.mobile}`,
                  code: this.props.navigation.getParam('code'),
                  comment: this.state.message,
                  rate: this.state.WhichStar,
                },
                {
                  headers: {
                    Authorization: `${this.global.token}`,
                  },
                },
              )
                .then(response => {})
                .catch(error => {
                  this._spring();
                })
                .finally(() => {
                  this.reLoad();
                });
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
    if (this.state.isConnected) {
      if (this.state.isLoading == true) {
        return <Loading></Loading>;
      } else {
        return (
          <SafeAreaView
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
            <Animated.View
              style={[
                styles.animatedView,
                {transform: [{translateY: this.springValue}]},
              ]}>
              <Text style={styles.exitTitleText}>
                {strings(this.global.locale).ConnectionServerError}
              </Text>
            </Animated.View>
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
                onPress={() => {
                  this.global.token
                    ? this.RBSheet.open()
                    : this.props.navigation.navigate('_SignUp');
                }}>
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
                      rating={this.state.product.rates}
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
                        {this.state.product.rates}
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
                        {this.state.product.count_rates} {''}
                        {strings(this.global.locale).Reviews}
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
                    {this.state.product.comments.length} {''}
                    {strings(this.global.locale).Reviews}
                  </Text>
                </View>
                {/*--------------------Comments--------------------*/}
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.state.product.comments}
                  renderItem={({item, index}) => {
                    return (
                      <Comment
                        userImage={
                          item.imageProfile == 'https://beheene.com'
                            ? 'https://beheene.com/img/Profile.png'
                            : item.imageProfile
                        }
                        userName={item.name}
                        ratingCo={item.rate == null ? 0 : item.rate.rate}
                        date={item.date}
                        commentText={item.comment}></Comment>
                    );
                  }}
                  keyExtractor={item => item.userName}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  ListEmptyComponent={
                    <View
                      style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          {
                            marginVertical: responsiveHeight(2),
                            color: colors(this.global.theme).GRAY_EIGHT,
                          },
                          fonts(this.global.SizeAndWeight).SECOND,
                        ]}>
                        {strings(this.global.locale).ThereIsNothing}
                      </Text>
                    </View>
                  }></FlatList>
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <Net
          onPress={() => {
            ///////////////////NetInfo
            NetInfo.fetch().then(state => {
              this.setState({
                isConnected: state.isConnected,
                isLoading: true,
              });
            });
            this.reLoad();
          }}></Net>
      );
    }
  }
}
export {Reviews};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    height: responsiveHeight(6),
    backgroundColor: 'rgb(34,34,34)',
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
  },
  exitTitleText: {
    textAlign: 'center',
    color: 'rgb(255,255,255)',
    fontFamily: 'IRANSansMobile(FaNum)',
    fontWeight: '300',
    fontSize: responsiveFontSize(1.5),
  },
};

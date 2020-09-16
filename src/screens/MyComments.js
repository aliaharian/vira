import React, {Component} from 'reactn';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';
import {Rating, Comment} from '../components';
import Axios from 'axios';
import {Loading, Net} from '../components';
import NetInfo from '@react-native-community/netinfo';

class MyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichStar: 0,
      message: '',
      user: [],
      mobile: '',
      token: '',
      isLoading: true,
      isConnected: undefined,
    };
    this.springValue = new Animated.Value(100);
  }

  componentDidMount() {
    ///////////////////NetInfo
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
    this.commentLoad();
  }

  commentLoad() {
    const api = 'https://www.beheene.com/api/v1/user';

    Axios.post(
      api,
      {mobile: `${this.global.mobile}`},
      {
        headers: {
          Authorization: `${this.global.token}`,
        },
      },
    )
      .then(response => {
        this.setState({user: response.data});
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
                    {strings(this.global.locale).MyReviews}
                  </Text>
                </View>
                {/*--------------------Comments--------------------*/}
                <FlatList
                  style={{flex: 1, alignSelf: 'stretch'}}
                  data={this.state.user.data.comments}
                  renderItem={({item, index}) => {
                    return (
                      <Comment
                        userImage={
                          item.imageProfile == 'https://www.beheene.com'
                            ? 'https://beheene.com/img/Profile.png'
                            : item.imageProfile
                        }
                        userName={item.product.substring(0, 20) + '...'}
                        date={item.date}
                        commentText={item.comment}
                        ratingCo={
                          item.rate == null ? 0 : item.rate.rate
                        }></Comment>
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
            this.commentLoad();
          }}></Net>
      );
    }
  }
}
export {MyComments};

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

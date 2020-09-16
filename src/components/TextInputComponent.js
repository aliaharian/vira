import React, {Component} from 'reactn';
import {View, TextInput, Text, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors, strings, elevations, fonts} from '../globals';

class TextInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      label: false,
    };
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: responsiveHeight(1),
          marginTop: this.props.index == 0 ? responsiveHeight(1) : 0,
          marginBottom:
            this.props.index == this.props.endIndex ? responsiveHeight(1) : 0,
        }}>
        <View
          style={[
            {
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor: colors(this.global.theme).WHITE,
              marginHorizontal: responsiveWidth(4),
              paddingHorizontal: responsiveWidth(4),
              borderRadius: responsiveWidth(3),
              paddingTop:
                this.state.label == false
                  ? responsiveHeight(0.5)
                  : responsiveHeight(1),
              paddingBottom:
                this.state.label == false ? responsiveHeight(0.5) : 0,
            },
            elevations(this.global.shadow).FAVORITES,
          ]}>
          {this.state.label == true ? (
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'flex-end',
                position: 'absolute',
                top: responsiveHeight(0.5),
                right: responsiveWidth(4),
                zIndex: 1,
              }}>
              <Text
                style={[
                  {
                    color: colors(this.global.theme).GRAY_SIX,
                  },
                  fonts(this.global.SizeAndWeight).FIRST,
                ]}>
                {strings(this.global.locale).Edit}
              </Text>
            </View>
          ) : (
            () => {}
          )}
          <TextInput
            ref={input => {
              this.input = input;
            }}
            style={{
              alignSelf: 'stretch',
              textAlign: 'right',
              textAlignVertical: 'bottom',
              backgroundColor: colors(this.global.theme).WHITE,
              fontFamily: 'IRANSansMobile(FaNum)',
              fontWeight: '300',
              fontSize:
                this.state.label == false
                  ? responsiveFontSize(2.1)
                  : responsiveFontSize(1.8),
            }}
            placeholderTextColor={colors(this.global.theme).GRAY_SIX}
            placeholder={'نام آدرس'}
            value={this.state.message}
            onChangeText={message => this.setState({message})}
            multiline={true}
            onFocus={() => {
              this.setState({label: true});
            }}
            onEndEditing={() => {
              this.state.message == ''
                ? this.setState({label: false})
                : () => {};
            }}
          />
        </View>
      </View>
    );
  }
}
export {TextInputComponent};

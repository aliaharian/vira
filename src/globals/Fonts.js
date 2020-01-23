import {StyleSheet, Platform} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const fonts = SizeAndWeight => {
  return StyleSheet.create({
    FIRST: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
        ios: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
      }),
    },
    SECOND: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
        ios: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
      }),
    },
    Third: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
        ios: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
      }),
    },
    Forth: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
        ios: {
          fontFamily: 'IRANSansMobile',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
      }),
    },
  });
};

export {fonts};

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
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
      }),
    },
    SECOND: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
      }),
    },
    Third: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
      }),
    },
    Forth: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
      }),
    },
    NUMBERFIRST: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.5),
        },
      }),
    },
    NUMBERSECOND: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '300',
          fontSize: responsiveFontSize(1.8),
        },
      }),
    },
    NUMBERThird: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '800',
          fontSize: responsiveFontSize(2.1),
        },
      }),
    },
    NUMBERForth: {
      ...Platform.select({
        android: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
        ios: {
          fontFamily: 'IRANSansMobile(FaNum)',
          fontWeight: '900',
          fontSize: responsiveFontSize(2.4),
        },
      }),
    },
  });
};

export {fonts};

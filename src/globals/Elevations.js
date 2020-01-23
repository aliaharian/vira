import {StyleSheet, Platform} from 'react-native';

const elevations = shadow => {
  return StyleSheet.create({
    TAB: {
      ...Platform.select({
        android: {elevation: 8},
        ios: {elevation: 8},
      }),
    },
    FAVORITES: {
      ...Platform.select({
        android: {elevation: 2},
        ios: {elevation: 2},
      }),
    },
  });
};

export {elevations};

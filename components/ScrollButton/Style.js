import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
const {height, width} = Dimensions.get('window');

export default styles = StyleSheet.create({
  //Scrolling Styles
  scrollViewContainer: {
    height: height * 0.1,
    width: width * 1,
  },
  btnTextView: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  touchButtonContainer: {
    backgroundColor: '#33ab93',
    height: height * 0.055,
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
  },
});

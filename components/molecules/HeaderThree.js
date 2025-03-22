import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HeaderThree = () => {
  return (
    <AppView style={styles.mainContainer}>
      <AppText></AppText>
    </AppView>
  );
};

export default HeaderThree;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: 'red',
  },
});

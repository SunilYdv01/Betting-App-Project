import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {AppText, AppView, AppTouchable} from '../Atom/atom';
const {height, width} = Dimensions.get('window');

const ScrollButton = ({props, navigation}) => {
  const [color, setColor] = useState('false');
  const [list, setList] = useState([
    {
      name: 'History',
      isOpen: false,
    },
    {
      name: 'Favourite sports',
      isOpen: true,
    },
    {
      name: 'Inbox (5)',
      isOpen: false,
    },
  ]);

  const renderOpt = ({item, index}) => {
    return (
      <AppTouchable style={styles.touchButtonContainer} onPress={() => {}}>
        <AppText style={styles.btnTextView}>{item.name}</AppText>
      </AppTouchable>
    );
  };
  return (
    <AppView style={styles.scrollViewContainer}>
      <FlatList data={list} renderItem={renderOpt} horizontal />
    </AppView>
  );
};

export default ScrollButton;

const styles = StyleSheet.create({
  //Scrolling Styles
  scrollViewContainer: {
    height: height * 0.09,
    width: width * 1,
  },
  btnTextView: {
    color: 'rgb(145,143,143)',
    fontSize: 15,
    fontWeight: '500',
  },
  touchButtonContainer: {
    // backgroundColor: '#33ab93',
    backgroundColor: 'rgb(255,255,255)',
    height: height * 0.055,
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 0.6,
    borderColor: 'rgb(145,143,143)',
  },
});

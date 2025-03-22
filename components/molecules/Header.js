import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppText, AppView, AppImage, AppTouchable} from '../Atom/atom';
const {height, width} = Dimensions.get('screen');


const Header = props => {
  if (props.head) {
    return (
      <AppView style={styles.headerview}>
        <AppView style={styles.imgContainer}>
          <AppTouchable onPress={props.onPress1}>
            <AppImage
              style={styles.imgView}
              resizeMode="contain"
              source={props.image}
            />
          </AppTouchable>
        </AppView>

        <AppView style={styles.TxtHeaderView}>
          <AppText
            style={{color: 'white', fontSize: height / 35, fontWeight: '700'}}>
            {props.headerText}
          </AppText>
        </AppView>
      </AppView>
    );
  } else {
    return (
      <AppView style={styles.headerviewTwo}>
        <AppView style={styles.imgContainer}>
          <AppTouchable onPress={props.onPress2}>
            <AppImage
              style={styles.imgView}
              resizeMode="contain"
              source={props.backImage}
            />
          </AppTouchable>
        </AppView>

        <AppView style={styles.TxtHeaderView}>
          <AppText
            style={{
              color: 'rgb(228,228,228)',
              fontSize: height / 35,
              // fontWeight: '500',
              
            }}>
            {props.headerText2}
          </AppText>
        </AppView>
        {/* <Header head={false} backImage={BackArrowTwo} headerText2="FootBall" /> */}
        <AppView style={styles.imgContainer2}>
          <AppTouchable onPress={props.onPress3}>
            <AppImage
              style={styles.imgView}
              resizeMode="contain"
              source={props.favImage}
            />
          </AppTouchable>
        </AppView>
        <AppView style={styles.imgContainer1}>
          <AppTouchable onPress={props.onPress4}>
            <AppImage
              style={styles.imgView}
              resizeMode="contain"
              source={props.finalImage}
            />
          </AppTouchable>
        </AppView>
      </AppView>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  headerview: {
    height: height / 17,
    width: width / 1,
    flexDirection: 'row',
  },
  headerviewTwo: {
    height: height / 17,
    width: width / 1,
    flexDirection: 'row',
    backgroundColor: '#47087B',
  },
  imgContainer: {
    height: height / 17,
    width: width / 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"yellow"
  },
  imgView: {
    height: height / 45,
    width: width / 23,
    tintColor: 'white',
  },
  TxtHeaderView: {
    height: height / 17,
    width: width / 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
   
  },
  imgContainer1: {
    height: height / 17,
    width: width / 9,
   
    justifyContent: 'center',
    // backgroundColor:"green",
    alignItems:"center"
  },
  imgContainer2: {
    height: height / 17,
    width: width / 10,
   
    justifyContent: 'center',
    // backgroundColor:"orange",
    alignItems:"center"
  },
});

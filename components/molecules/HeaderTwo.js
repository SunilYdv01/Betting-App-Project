import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {AppImage, AppText, AppTouchable, AppView} from '../Atom/atom';
const {height, width} = Dimensions.get('window');
import {
  Menu,
  HomeLogo,
  SearchIcon,
  NotificationIcon,
  MessageIcon,
  walleticon,
  Menu2
} from '../../assets/icon';

const HeaderTwo = (props) => {
  console.log("props==========>",props)
  return (
    <AppView style={styles.mainContainer}>
      <AppView style={styles.iconContainer}>
        <AppTouchable onPress={props.onPress4}>
          <AppImage source={Menu2} style={{height: 19, width: 25,tintColor:"white"}} />
        </AppTouchable>
      </AppView>
      <AppView style={styles.headingContainer}>
        <AppImage source={HomeLogo} />
      </AppView>
      <AppView style={styles.iconTwoContainer}>
        {/* <AppTouchable onPress={() => {}}>
          <AppImage source={SearchIcon} /> */}
        {/* </AppTouchable> */}
      </AppView>
      <AppView style={styles.iconTwoContainer}>
        <AppTouchable onPress={props.onPress6}>
          <AppImage source={NotificationIcon} />
        </AppTouchable>
      </AppView>
      <AppView style={styles.iconTwoContainer}>
        <AppTouchable 
        onPress={props.onPress3}
        // onPress={() => props.navigation.navigate('InboxScreen')}
        >
          <AppImage source={MessageIcon} />
        </AppTouchable>
      </AppView>
    </AppView>
  );
};

export default HeaderTwo;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 0.08,
    width: width * 1,
    backgroundColor: '#7A25CE',
    flexDirection: 'row',
  },
  iconContainer: {
    height: height * 0.08,
    width: width * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    height: height * 0.08,
    width: width * 0.54,
    justifyContent: 'center',
  },
  iconTwoContainer: {
    height: height * 0.08,
    width: width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

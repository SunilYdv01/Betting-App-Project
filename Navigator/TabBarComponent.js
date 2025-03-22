import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  AppImage,
  AppText,
  AppTouchable,
  AppView,
} from '../components/Atom/atom';
const {width, height} = Dimensions.get('window');

export default function TabBarComponent(props) {
  const {state, descriptors, navigation} = props;
  const {routes} = state;
  const tabs = [
    require('../assets/images/HomeIconTwo/HomeIconTwo.png'),
    require('../assets/images/TimerIconOne/TimerIconOne.png'),
    require('../assets/images/AddIconTwo/AddIconTwo.png'),
    require('../assets/images/TrophyIconTwo/TrophyIconTwo.png'),
    require('../assets/images/UserIconTwo/UserIconTwo.png'),
  ];
  const [focused, setfocused] = useState('HomeScreen');
  const [icon, seticon] = useState(tabs[0]);
  const focusedOptions = descriptors[routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    console.warn('focusedOptions.tabBarVisible name', focusedOptions.name);
    return null;
  }
  const handlePress = (name, index) => {
    setfocused(name);
    seticon(tabs[index]);
    navigation.navigate(name);
  };

  // const toggleOpen = () => {};

  return (
    <AppView>
      <ImageBackground
        // source={require('./../assets/Images/union.png')}
        style={styles.backImageView}>
        <AppView style={styles.mainViewContainer}>
          {/* *************** Home Tab Icon *************** */}
          <AppTouchable onPress={() => handlePress('Home', 0)} style={{}}>
            <AppImage
              source={
                focused === 'Home'
                  ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                  : require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                // : require('../assets/images/HomeIcon/HomeIcon.png')
              }
              style={{height: height / 30, width: width / 15}}
            />
            {/* <AppText
              style={{
                color: focused === 'Home' ? 'rgb(255,255,255)' : 'gray',
              }}>
              Home
            </AppText> */}
          </AppTouchable>

          {/* *************** Timer Tab Icon *************** */}
          <AppTouchable onPress={() => handlePress('Timer', 1)} style={{}}>
            <AppImage
              resizeMode="contain"
              source={
                focused === 'Timer'
                  ? require('../assets/images/TimerIconOne/TimerIconOne.png')
                  : require('../assets/images/TimerIconOne/TimerIconOne.png')

                // : require('../assets/images/TimerIconOne/TimerIconOne.png')
              }
              style={{height: height / 30, width: width / 15}}
            />
            {/* <AppText
              style={{
                color: focused === 'Timer' ? 'rgb(255,255,255)' : 'gray',
              }}>
              Timer
            </AppText> */}
          </AppTouchable>

          {/* *************** Add Tab Icon *************** */}
          <AppTouchable onPress={() => handlePress('Add', 2)} style={{}}>
            <AppImage
              resizeMode="contain"
              source={
                focused === 'Add'
                  ? require('../assets/images/AddIconOne/AddIconOne.png')
                  : require('../assets/images/AddIconOne/AddIconOne.png')
              }
              style={{height: height / 8, width: width / 4}}
            />
            {/* <AppText
              style={{
                color: focused === 'Add' ? 'rgb(255,255,255)' : 'gray',
              }}>
              Add
            </AppText> */}
          </AppTouchable>

          {/* *************** Trophy Tab Icon *************** */}
          <AppTouchable onPress={() => handlePress('Trophy', 3)} style={{}}>
            <AppImage
              resizeMode="contain"
              source={
                focused === 'Trophy'
                  ? require('../assets/images/TrophyIconTwo/TrophyIconTwo.png')
                  : require('../assets/images/TrophyIconOne/TrophyIconOne.png')
              }
              style={{height: height / 30, width: width / 15}}
            />
            {/* <AppText
              style={{
                color: focused === 'Trophy' ? 'rgb(255,255,255)' : 'gray',
              }}>
              Trophy
            </AppText> */}
          </AppTouchable>

          {/* *************** Profile Tab Icon *************** */}
          <AppTouchable onPress={() => handlePress('Profile', 4)} style={{}}>
            <AppImage
              resizeMode="contain"
              source={
                focused === 'Profile'
                  ? require('../assets/images/UserIconTwo/UserIconTwo.png')
                  : require('../assets/images/UserIconOne/UserIconOne.png')
              }
              style={{height: height / 30, width: width / 15}}
            />
            {/* <AppText
              style={{
                color: focused === 'Profile' ? 'rgb(255,255,255)' : 'gray',
              }}>
              Profile
            </AppText> */}
          </AppTouchable>
        </AppView>
      </ImageBackground>
      <SafeAreaView style={styles.safeArea} />
    </AppView>
  );
}

const styles = StyleSheet.create({
  backImageView: {
    width,
    height: height / 14,
    backgroundColor: 'rgb(94,28,159)',
  },
  mainViewContainer: {
    height: height / 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:"red"
  },
  safeArea: {
    backgroundColor: 'white',
  },
});

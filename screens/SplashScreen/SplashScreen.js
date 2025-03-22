import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {AppView, AppImage} from '../../components/Atom/atom';
const {height, width} = Dimensions.get('window');

const SplashScreen = props => {
  const [isVisible, setisVisible] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      props.navigation.navigate('Tutorial');
      // props.navigation.navigate('HomeScreen');
      setisVisible(false);
    }, 3000);
  }, []);

  return (
    <AppView style={styles.mainContainer}>
      <AppImage
        source={require('../../assets/images/WinSumIcon.png')}
        resizeMode="contain"
        style={{height:height/1.4, width:width/1.2}}
      />
    </AppView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'rgb(94,28,159)',
    // backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

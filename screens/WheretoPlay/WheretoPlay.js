import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import {LoginLogo} from '../../assets/icon';
const {height, width} = Dimensions.get('screen');

const WheretoPlay = props => {
  return (
    <AppView style={styles.Container}>
      <AppView style={styles.mainView}>
        <AppView style={styles.firstinnerView}>
          <AppImage style={{height: 120}} source={LoginLogo} />
        </AppView>
        <AppView style={styles.secondinnerView}>
          <AppText
            style={{fontSize: height / 35, color: 'white', fontWeight: '700'}}>
            Where Do You Want To Play ?
          </AppText>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>COLORADO</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>FLORIDA</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>INDIANA</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>IOWA</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>MICHIGAN</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.michiganContainer}>
          <AppTouchable onPress={() => props.navigation.navigate('Login')}>
            <AppView style={styles.michiganTouchView}>
              <AppText style={styles.michiganTxtView}>NEVADA</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
      </AppView>
    </AppView>
  );
};

export default WheretoPlay;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  firstinnerView: {
    height: height * 0.2,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoImage: {
    height: height / 8.5,
    width: width / 4.2,
  },
  secondinnerView: {
    height: height / 14,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  michiganTxtView: {
    fontSize: height / 38,
    color: 'white',
    fontWeight: '700',
  },
  michiganTouchView: {
    height: height / 14,
    width: width / 1.13,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  michiganContainer: {
    height: height / 11,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

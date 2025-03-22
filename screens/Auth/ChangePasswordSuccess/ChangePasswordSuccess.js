import React, {useState} from 'react';
import {Alert, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
import {ArrowBackGreen, ChangePasswordSuccess,BackArrow} from '../../../assets/icon';
const {height, width} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ChangePass = props => {
  return (
    <SafeAreaView backgroundColor="#7A25CE">
        <KeyboardAwareScrollView>
      <AppView style={styles.mainContainer}>
    
        <AppView style={styles.blankConatiner}>
          <AppView style={styles.arrowBackView}>
            <AppTouchable
              onPress={() => props.navigation.navigate('ChangePass')}>
           <AppImage resizemode="contain" source={BackArrow} style={{marginLeft: 15,tintColor:"white",height:height/40,width:width/20}} />
            </AppTouchable>
          </AppView>
          <AppView style={styles.headingContainer}>
            <AppText
              style={{
                color: 'rgb(255,255,255)',
                fontSize: 24,
                fontWeight: '700',
              }}>
              Change Password
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.sectionTwoContainer}>
          <AppView style={styles.lockContainer}>
            <AppImage source={ChangePasswordSuccess} />
          </AppView>
          <AppView style={styles.passHeadView}>
            <AppText style={styles.txtForgotHead}>
              Password Reset Successful
            </AppText>
          </AppView>
          <AppView style={styles.paraContainer}>
            <AppText style={styles.paraTxtView}>
              Password reset has been done successfully
            </AppText>
          </AppView>

          <AppView
            style={{height: height * 0.1, justifyContent: 'center'}}></AppView>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnTouchView}
              onPress={() => props.navigation.navigate('Login')}>
              <AppText style={styles.resetTxtView}>Go To Login Page</AppText>
            </AppTouchable>
          </AppView>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnTouchView}
              onPress={() => props.navigation.navigate('Login')}>
              <AppText style={styles.resetTxtView}>Continue To Account</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#7A25CE',
  },
  blankConatiner: {
    height: height * 0.12,
    width: width * 1,
    flexDirection: 'row',
  },
  arrowBackView: {
    height: height * 0.06,
    width: width * 0.3,
    justifyContent: 'center',
    top: 10,
    position: 'relative',
  },
  headingContainer: {
    height: height * 0.06,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 10,
    position: 'relative',
  },
  sectionTwoContainer: {
    height: height * 0.88,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  lockContainer: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterCodeView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
  },
  passHeadView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20,
  },
  paraContainer: {
    height: height * 0.06,
    width: width * 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paraTxtView: {
    color: 'rgb(112,112,112)',
    fontSize: 18,
    marginLeft: 20,
  },
  placeholderContainer: {
    height: height * 0.18,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maininput: {
    height: height * 0.08,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 0.7,
  },
  emailIcon: {
    height: height * 0.04,
    width: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailConatinerView: {
    color: 'rgb(0,0,0)',
    fontSize: 15,
    marginLeft: 15,
    top: 10,
  },
  btnContainer: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouchView: {
    height: height * 0.07,
    width: width * 0.75,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetTxtView: {
    color: 'rgb(255,255,255)',
    fontSize: 22,
    fontWeight: '600',
  },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },
  placeholderContainer: {
    height: height * 0.09,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inptTxtField: {
    height: height * 0.07,
    width: width * 0.75,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },
  eyeIconView: {
    height: height * 0.07,
    width: width * 0.12,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTxtFieldView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 0.5,
  },
});

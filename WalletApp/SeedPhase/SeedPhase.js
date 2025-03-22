import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import {ArrowBackGreen, ChangePassword} from '../../assets/icon';

const SecurityAlert = props => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.backArrow}>
            <Image source={ArrowBackGreen} />
          </View>
          <View style={styles.headerTxt}>
            <Text style={styles.txtView}>Backup Wallet</Text>
          </View>
        </View>

        <View style={styles.walletImageView}>
          <Image source={ChangePassword} style={{}} />
        </View>

        <View style={styles.alertTxt}>
          <View style={styles.securityAlertView}>
            <Text style={styles.alertTxtView}>SECURITY ALERT!</Text>
          </View>
          <View style={styles.tunedView}>
            <Text style={styles.tunedTxt}>Stay tuned!</Text>
          </View>
        </View>

        <View style={styles.txtContainer}>
          <Text style={styles.txtPrivate}>
            Your seed or private key give direct access to your
          </Text>
          <Text style={styles.txtPrivate}>
            account. NEVER give the information to others.
          </Text>
        </View>

        <View style={styles.neverView}>
          <Text style={styles.neverTxtView}>NEVER!</Text>
        </View>

        <View style={styles.switchTxtContainer}>
          <View
            style={{
              height: height * 0.12,
              justifyContent: 'center',
              width: width * 0.9,
            }}>
            <Text style={styles.termsTxt}>
              Wheather, Mansoon, Need, Bright, Yellow, Brown
            </Text>
            <Text style={styles.termsTxt}>
              Mohhabtey, Kallu, Malur, Manhgfg, Populty
            </Text>
            <Text style={styles.termsTxt}>Hanuman, Shankatr</Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnTouch}>
            <Text style={{fontSize: height / 37, fontWeight: '600'}}>
              Okay, I got it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecurityAlert;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: 'rgb(0,0,0)',
  },
  headerContainer: {
    height: height * 0.08,
    width: width * 1,
    flexDirection: 'row',
  },
  backArrow: {
    height: height * 0.1,
    width: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    height: height * 0.1,
    width: width * 0.82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtView: {
    color: 'rgb(255,255,255)',
    fontSize: height / 30,
    fontWeight: '600',
  },
  walletImageView: {
    height: height * 0.25,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTxt: {
    height: height * 0.08,
    width: width * 1,
  },
  securityAlertView: {
    height: height * 0.04,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTxtView: {
    color: 'rgb(255,255,255)',
    fontSize: height / 35,
    fontWeight: '700',
  },
  tunedView: {
    height: height * 0.04,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tunedTxt: {
    color: 'rgb(255,255,255)',
    fontSize: height / 45,
  },
  txtContainer: {
    height: height * 0.09,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPrivate: {
    color: 'rgb(255,255,255)',
    fontSize: height / 55,
  },
  neverView: {
    height: height * 0.08,
    width: width * 1,
    alignItems: 'center',
  },
  neverTxtView: {
    color: 'rgb(255,255,255)',
    fontSize: height / 40,
    fontWeight: '600',
  },
  switchTxtContainer: {
    height: height * 0.12,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchView: {
    height: height * 0.1,
    width: width * 0.2,
    justifyContent: 'center',
  },
  termsView: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: 'center',
  },
  termsTxt: {
    fontSize: height / 55,
    color: '#fff',
    fontWeight: '500',
  },
  btnContainer: {
    height: height * 0.17,
    width: width * 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnTouch: {
    backgroundColor: 'orange',
    height: height * 0.07,
    width: width * 0.8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

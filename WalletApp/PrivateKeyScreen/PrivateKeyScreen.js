import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {ArrowBackGreen} from '../../assets/icon';

const PrivateKeyScreen = props => {
  const [pressed, setPressed] = useState(true);
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

        <View style={styles.blankContainer}></View>

        <View style={styles.sectionTwoView}>
          <View style={styles.sliderView}></View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.privateKeyContainer,
                {backgroundColor: pressed ? 'orange' : 'rgb(255, 255, 255)'},
              ]}>
              <View style={styles.btnTouchView}>
                <Text style={styles.btnTxtView}>PRIVATE KEY</Text>
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.privateKeyContainer,
                {
                  backgroundColor: 'rgb(255, 255, 255)',
                  borderWidth: 0.5,
                },
              ]}>
              <TouchableOpacity>
                <Text style={styles.btnTxtView}>SEED</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardViewContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.headerView}>
                <Text style={styles.backupTxt}>BACKUP ACCOUNT</Text>
              </View>
              <View style={styles.headerView}>
                <Text style={styles.backupTxt2}>BTC Main Account</Text>
              </View>
              <View style={styles.headerView3}>
                <Text style={styles.backupTxt3}>
                  byjhbhfkg....wdADFUVADVJa2300
                </Text>
              </View>
              <View style={styles.copyIcon}>
                <Text>CopyIcon</Text>
              </View>
              <View style={styles.copyCodeTxt}>
                <Text>gaiyfgqugfgighksvihfvbkegfbkfhkvekhvke72yu4</Text>
                <Text>gi7t97efgi4y7tgfiugy974griug</Text>
              </View>
            </View>
          </View>
          <View style={styles.footerTxtView}>
            <Text style={styles.footerTxt}>
              Beware of scams, keep this information safe.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivateKeyScreen;

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
  blankContainer: {
    height: height * 0.035,
    width: width * 1,
  },
  sectionTwoView: {
    height: height * 0.9,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  txtView: {
    color: 'rgb(255,255,255)',
    fontSize: height / 30,
    fontWeight: '600',
  },
  sliderView: {
    height: height * 0.048,
    width: width * 1,
  },
  btnContainer: {
    height: height * 0.11,
    width: width * 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  privateKeyContainer: {
    height: height * 0.055,
    width: width * 0.35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxtView: {
    color: 'rgb(0,0,0)',
    fontWeight: '700',
  },
  cardViewContainer: {
    height: height * 0.32,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: height * 0.28,
    width: width * 0.9,
    backgroundColor: 'grey',
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  headerView: {
    height: height * 0.035,
    width: width * 0.9,
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: 28,
  },
  backupTxt2: {
    fontWeight: '500',
    fontSize: height / 48,
  },
  headerView3: {
    height: height * 0.055,
    width: width * 0.9,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
  },
  backupTxt3: {
    fontSize: height / 57,
    marginTop: 5,
    marginLeft: 15,
  },
  copyIcon: {
    height: height * 0.06,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  copyCodeTxt: {
    height: height * 0.07,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTxtView: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

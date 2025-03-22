import React from 'react';
import {StyleSheet, Text, View, Dimensions,TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../../components/Atom/atom';
import Header from '../../../components/molecules/Header';
import {BackArrowTwo, Star, qrcode, copy, information} from '../../../assets/icon';
import {color} from 'react-native-reanimated';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');

const withdrawcoin = () => {
  return (
    <AppView style={styles.MianContainer}>
      <AppView
        style={{
          height: height / 17,
          width: width / 1,
          backgroundColor: 'yellow',
        }}>
        <Header
          head={false}
          backImage={BackArrowTwo}
          headerText2="Widraw Coin"
          finalImage={qrcode}
        />
      </AppView>
      <ScrollView>
      <AppView style={styles.FirstContainer}>
        <AppView style={styles.BitcoinView}>
          <AppText style={styles.Textbitcoin}>Bitcoin</AppText>
        </AppView>
        <AppView style={styles.Viewnumber}>
          <AppText style={styles.Textnumber}>$ 11,760.93</AppText>
        </AppView>
        <AppView style={styles.viewBtc}>
          <AppText style={styles.Textbtc}>0.8934 BTC</AppText>
        </AppView>
      </AppView>
      <AppView style={styles.SecondContainer}>
        <AppView style={styles.DepositView}>
          <AppText style={styles.textDeposit}>Withdraw Bitcoin</AppText>
        </AppView>
        <AppView style={styles.viewtext}>
          <AppText style={styles.Textline}>
            Enter the Details of the Wallet you would like to receive to
          </AppText>
        </AppView>
      </AppView>
      <AppView style={styles.ThirdContainer}>
        <AppView style={styles.MaxView}>
          <AppText style={styles.MaxText}>Max Withdrawable Amount:</AppText>
          <AppText style={styles.BTCtext}>0.8914 BTC**</AppText>
        </AppView>
        <AppView style={styles.imageview}>
          <TouchableOpacity>
            <AppImage
              style={styles.informationImage}
              resizeMode="contain"
              source={information}></AppImage>
          </TouchableOpacity>
        </AppView>
      </AppView>
      <AppView style={styles.FourthContainer}>
        <AppView style={styles.TextInputView}>
          <TextInput
          keyboardType="number-pad"
            style={styles.inputText}
            placeholderTextColor="black"
            placeholder=""></TextInput>
        </AppView>
      </AppView>
      <AppView style={styles.FifthContainer}>
          <TouchableOpacity>
          <AppView style={styles.buttonView}>
          <AppText style={styles.Continuetext}>
            Continue
          </AppText>
        </AppView>
          </TouchableOpacity>
       
      </AppView>
      </ScrollView>
      
    </AppView>
  );
};

export default withdrawcoin;

const styles = StyleSheet.create({
  MianContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
  },
  FirstContainer: {
    height: height / 4.4,
    width: width / 1,
    backgroundColor: '#rgb(128, 196, 28)',
  },
  BitcoinView: {
    height: height / 14.3,
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Textbitcoin: {
    color: 'white',
    fontSize: height / 40,
  },
  Viewnumber: {
    height: height / 14.3,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textnumber: {
    color: 'white',
    fontSize: height / 25,
    fontWeight: '700',
  },
  viewBtc: {
    height: height / 14.3,
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Textbtc: {
    color: 'white',
    fontSize: height / 45,
  },
  SecondContainer: {
    height: height / 8,
    width: width / 1,
    backgroundColor: '#FEFAEF',
  },
  DepositView: {
    height: height / 20,
    width: width / 1,
    // backgroundColor:"yellow",
    justifyContent: 'flex-end',
  },
  viewtext: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDeposit: {
    fontSize: height / 40,
    fontWeight: '700',
    width: width / 2.35,
    // backgroundColor:"grey",
    // textAlign:"right",
    marginHorizontal: 18,
  },
  Textline: {
    fontSize: height / 53,
    width: width / 1.1,
    // backgroundColor:"cyan",
    textAlign: 'left',
    color: 'grey',
  },
  ThirdContainer: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"yellow",
    flexDirection: 'row',
  },
  MaxView: {
    height: height / 15,
    width: width / 1.14,
    // backgroundColor:"red",
    alignItems: 'center',
    // justifyContent:"center",
    flexDirection: 'row',
  },
  imageview: {
    height: height / 15,
    width: width / 10,
    // backgroundColor:"green",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  FourthContainer: {
    height: height / 8,
    width: width / 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FifthContainer: {
    height: height / 10,
    width: width / 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MaxText: {
    fontSize: height / 50,
    marginHorizontal: 18,
    color: 'grey',
  },
  BTCtext: {
    fontSize: height / 50,
    fontWeight: '700',
    color: 'grey',
  },
  informationImage: {
    height: height / 40,
    width: width / 20,
  },
  TextInputView: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: 'black',
    fontSize: height / 53,
    width: width / 1.2,
    //   backgroundColor: 'green',
  },
  buttonView: {
    height: height / 15,
    width: width / 1.35,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Continuetext:{
      color: 'white',
       fontSize: height / 40
    }
});
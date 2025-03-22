import React, {useEffect, useState, Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import Header from '../../../components/molecules/Header';
import {BackArrow, Star, qrcode, copy} from '../../../assets/icon';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import Toast, {DURATION} from 'react-native-easy-toast';

const DepositCryptoCoin = props => {
  // ************* Copied Functions *************
  const [copiedText, setCopiedText] = useState('');
  const copyToClipboard = () => {
    Clipboard.setString(walletDetailAddress.walletAddress);
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  // ************* Copied *************

  const [walletdata, setWalletdata] = useState(
    props.route.params.walletdata ? props.route.params.walletdata : null,
  );
  const [newData, setNewData] = useState(
    props.route.params.newData ? props.route.params.newData : null,
  );
  const [walletDetailAddress, setWalletDetailsAddress] = useState([]);
  console.log('dataaaaa----->>', walletdata);
  console.log('valuee----->>', newData);

  // const copyToClipboard = (txt) => {
  //   Clipboard.setString(txt);
  //   Toast.show({
  //     text: "Copied",
  //     type: "Success",
  //   })
  // };

  useEffect(() => {
    // globalCheckpersonName();
    // DepositcryptoList();
    Depositcryptoaddress();
  }, []);

  const Depositcryptoaddress = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/wallet/wallet/get-address?coinName=${walletdata.instrument}`,

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('address ------------- >>>>>', res.data.data);
          setWalletDetailsAddress(res.data.data);
          console.log('walletdetailAdreess------>>', walletDetailAddress);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  return (
    <SafeAreaView>
      <AppView style={styles.Maincontainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
            backgroundColor: 'yellow',
          }}>
          <Header
            head={false}
            backImage={BackArrow}
            headerText2="Deposit Token coin"
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <AppView style={styles.FirstContainer}>
          <AppView style={styles.BitcoinView}>
            <AppText style={styles.Textbitcoin}>Your Amount</AppText>
          </AppView>
          <AppView style={styles.Viewnumber}>
            <AppText style={styles.Textnumber}>$ {newData}</AppText>
          </AppView>
          <AppView style={styles.viewBtc}>
            <AppText style={styles.Textbtc}>
              {walletDetailAddress.walletBalance} {walletDetailAddress.coinName}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.SecondContainer}>
          <AppView style={styles.DepositView}>
            <AppText style={styles.textDeposit}>
              Deposit Your Crypto Amount
            </AppText>
          </AppView>
          <AppView style={styles.viewtext}>
            <AppText style={styles.Textline}>
              You can obtain the amount to your Crypto wallet using your unique
              address below or scan the QR. Tap to copy to clipboard.
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.ThirdContainer}>
          <QRCode
            value={
              walletDetailAddress.walletAddress
                ? walletDetailAddress.walletAddress
                : 'Wallet Address Not found'
            }
            size={height / 5}
            logoBackgroundColor="transparent"
          />
          {/* <AppImage   resizeMode="contain" style={{height:height/4,width:width/2.1,tintColor:"black"}} source={qrcode} ></AppImage> */}
        </AppView>
        <AppView style={styles.FourthContainer}>
          <AppView style={styles.Viewcode}>
            <AppView style={styles.placeholderView}>
              <Text style={{fontSize: height / 62, color: 'grey'}}>
                {walletDetailAddress.walletAddress}
              </Text>
              {/* <TextInput placeholderTextColor="grey" style={{fontSize:height/55,color:"black",width:width/1.4,}} placeholder="xhkjdk5425as2d5a2d77c5ad7c5d7cdfgh"></TextInput> */}
            </AppView>

            {/* sgerjh */}
            <View style={{}}>
              {/* <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => fetchCopiedText()}>
          <Text>View copied text</Text>
        </TouchableOpacity> */}

              <Text style={styles.copiedText}>{copiedText}</Text>
            </View>
            {/* sgerjh */}
            <AppView style={styles.copyView}>
              <TouchableOpacity onPress={() => copyToClipboard()}>
                <AppImage
                  style={{height: height / 38, width: width / 21}}
                  source={copy}></AppImage>
              </TouchableOpacity>
            </AppView>
          </AppView>
        </AppView>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({text: text})}
            // value={this.state.text}
          />
        </View>
      </AppView>
    </SafeAreaView>
  );
};

export default DepositCryptoCoin;

const styles = StyleSheet.create({
  Maincontainer: {
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
    height: height / 7,
    width: width / 1,
    // backgroundColor:"blue"
  },
  DepositView: {
    height: height / 20,
    width: width / 1,
    // backgroundColor:"yellow",
    justifyContent: 'center',
  },
  viewtext: {
    height: height / 11,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDeposit: {
    fontSize: height / 43,
    fontWeight: '700',
    // width:width/2.35,
    // backgroundColor:"grey",
    // textAlign:"right",
    marginHorizontal: 18,
  },
  Textline: {
    fontSize: height / 60,
    width: width / 1.1,
    // backgroundColor:"cyan",
    textAlign: 'left',
  },
  ThirdContainer: {
    height: height / 3.5,
    width: width / 1,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  FourthContainer: {
    height: height / 9,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Viewcode: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    flexDirection: 'row',
  },
  placeholderView: {
    height: height / 12,
    width: width / 1.3,
    // backgroundColor:"green",
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyView: {
    height: height / 12,
    width: width / 9,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

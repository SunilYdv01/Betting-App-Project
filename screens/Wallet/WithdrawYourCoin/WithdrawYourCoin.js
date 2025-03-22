import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
  TouchableOpacity,
  Pressable,
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
import Header from '../../../components/molecules/Header';
import {BackArrow, Star, qrcode, copy, information} from '../../../assets/icon';
import {color} from 'react-native-reanimated';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WithdrawYourCoin = (props, {route, navigation}) => {
  const [value, setValue] = useState('1');
  // console.log("helllllooooo",props.route.params);
  const [withdrawData, setWithdrawData] = useState(
    props.route.params.withdrawData ? props.route.params.withdrawData : null,
  );
  const [newAmount, setNewAmount] = useState(
    props.route.params.newAmount ? props.route.params.newAmount : null,
  );
  console.log('Withdraw data---->', withdrawData);
  console.log('data----->>>', newAmount);
  const [modalVisible, setModalVisible] = useState(false);
  const [amountValue, setAmountValue] = useState('');
  const [checkAmountValue, setCheckAmountValue] = useState(true);
  const [errorAmountValue, setErrorAmountValue] = useState(null);

  const [cryptoAddress, setCryptoAddress] = useState('');
  const [CryptoAddress, setCheckCryptoAddress] = useState(true);
  const [errorCryptoAddress, setErrorCryptoAddress] = useState(null);

  const [withdrawTag, setwithdrawTag] = useState('1234');

  const _validateAmountValue = fname => {
    var fnameRegex = /^[0-9,.]{1,10}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorAmountValue('*Please enter an Amount');
    } else if (!fnameRegex.test(fname)) {
      setErrorAmountValue('*Please enter valid Amount');
    } else {
      setErrorAmountValue(null);
    }
  };

  const _validateCryptoAddress = fname => {
    var fnameRegex = /^[a-z A-Z 0-9]{3,60}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorCryptoAddress('*Please enter an Crypto Address');
    } else if (!fnameRegex.test(fname)) {
      setErrorCryptoAddress('*Please enter valid Address');
    } else {
      setErrorCryptoAddress(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (amountValue === '') {
      setErrorAmountValue('*Please enter Some Amount');
      flag = false;
    }
    if (cryptoAddress === '') {
      setErrorCryptoAddress('*Please enter crypto Address');
      flag = false;
    }
    return flag;
  };

  const withdrawcryptocoin = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);
    axios({
      method: 'post',
      url: `https://java-create-token.mobiloitte.org/wallet/wallet/withdraw`,
      data: {
        amount: amountValue,
        coinName: withdrawData.instrument,
        isExternal: true,
        isKycAccepted: true,
        isWithdraw: false,
        toAddress: cryptoAddress,
        tag: withdrawTag,
        url: 'string',
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        // alert("hello")
        if (res.status === 200) {
          console.log('WithdrawCryptoCoin-----details-------- >>>>>', res.data);
          props.navigation.navigate('Mywallet', {
            amount: amountValue,
            coinName: withdrawData.instrument,
            isExternal: true,
            isKycAccepted: true,
            isWithdraw: false,
            toAddress: cryptoAddress,
            tag: withdrawTag,
            url: 'string',
          });
          //  setUserProfile(res.data.data)
          //  console.log("userprofile2222----yash-->>>",userProfile);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  const onSubmit = () => {
    if (validate()) {
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <AppView style={styles.MianContainer}>
          <AppView
            style={{
              height: height / 17,
              width: width / 1,
              // backgroundColor: 'yellow',
            }}>
            <Header
              head={false}
              backImage={BackArrow}
              headerText2="Withdraw Coin"
              finalImage={qrcode}
              onPress2={() => props.navigation.goBack()}
              // onPress2={() => navigation.goBack()}
              onPress4={() => props.navigation.navigate('Qr')}
              // onPress4={() =>props.navigation.navigate("QrcodeScan")}
            />
          </AppView>
          <ScrollView>
            <AppView style={styles.FirstContainer}>
              <AppView style={styles.BitcoinView}>
                <AppText style={styles.Textbitcoin}>
                  {' '}
                  {withdrawData.coinName}
                </AppText>
              </AppView>
              <AppView style={styles.Viewnumber}>
                <AppText style={styles.Textnumber}>$ {newAmount}</AppText>
              </AppView>
              <AppView style={styles.viewBtc}>
                <AppText style={styles.Textbtc}>
                  {withdrawData.availableBalance} {withdrawData.instrument}
                </AppText>
              </AppView>
            </AppView>
            <AppView style={styles.SecondContainer}>
              <AppView style={styles.DepositView}>
                <AppText style={styles.textDeposit}>
                  Withdraw Your Crypto Amount{' '}
                </AppText>
              </AppView>
              <AppView style={styles.viewtext}>
                <AppText style={styles.Textline}>
                  Enter the Details of the Wallet you would like to receive to
                </AppText>
              </AppView>
            </AppView>
            <AppView style={styles.ThirdContainer}>
              <AppView style={styles.MaxView}>
                <AppText style={styles.MaxText}>
                  Destination Address of Your Crypto Wallet{' '}
                </AppText>
                {/* <AppText style={styles.BTCtext}>0.8914 BTC**</AppText> */}
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
                  keyboardType="default"
                  style={styles.inputText}
                  placeholderTextColor="black"
                  placeholder=""
                  onChangeText={txt => {
                    setCryptoAddress(txt), _validateCryptoAddress(txt);
                  }}
                />
              </AppView>

              {errorCryptoAddress != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width / 1.1,
                    // backgroundColor:"green",
                    marginHorizontal: 15,
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 17,
                    }}>
                    {errorCryptoAddress}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
            <AppView style={styles.ThirdContainer1}>
              <AppView style={styles.Max1View}>
                <AppText style={styles.MaxText}>
                  Enter the Amount how much you want to withdraw{' '}
                </AppText>
                {/* <AppText style={styles.BTCtext}>0.8914 BTC**</AppText> */}
              </AppView>
            </AppView>
            <AppView style={styles.FourthContainer}>
              <AppView style={styles.TextInputView}>
                <TextInput
                  maxLength={5}
                  keyboardType="number-pad"
                  style={styles.inputText}
                  placeholderTextColor="black"
                  placeholder=""
                  onChangeText={txt => {
                    setAmountValue(txt), _validateAmountValue(txt);
                  }}
                />
              </AppView>
              {errorAmountValue != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width / 1.1,
                    // backgroundColor:"green",
                    marginHorizontal: 15,
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 17,
                    }}>
                    {errorAmountValue}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>

            <AppView style={styles.FifthContainer}>
              <TouchableOpacity
                //  onPress={() => props.navigation.navigate("WithdrawYourAmount")}
                onPress={() => onSubmit()}>
                <AppView style={styles.buttonView}>
                  <AppText style={styles.Continuetext}>Continue</AppText>
                </AppView>
              </TouchableOpacity>
            </AppView>
          </ScrollView>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.ModalmainView}>
                  <View style={styles.ModalOneView}>
                    <Text
                      style={{
                        fontSize: height / 42,
                        fontWeight: '700',
                        color: 'white',
                        paddingHorizontal: 18,
                      }}>
                      Confirm Your Withdrawl
                    </Text>
                  </View>
                  <View style={styles.ModalTwoView}>
                    <View style={styles.ImageinformationView}>
                      <AppImage
                        style={{
                          height: height / 40,
                          width: width / 20,
                          tintColor: 'black',
                        }}
                        resizeMode="contain"
                        source={information}></AppImage>
                    </View>
                    <View style={styles.Textview}>
                      <Text style={{fontSize: height / 65, color: 'black'}}>
                        Please cross-check the destination address.Withdrawals
                        to Smart Contract Addresses,payments or participation in
                        ICOs / Airdrops are not supported and will be lost
                        forever. Withdrawal requestes cannot be cancelled after
                        submission.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ModalThreeView}>
                    <View style={styles.Modalthirdone}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible), withdrawcryptocoin();
                        }}>
                        <View style={styles.ModalConfirmView}>
                          <Text
                            style={{
                              fontSize: height / 42,
                              fontWeight: '700',
                              color: 'white',
                            }}>
                            Confirm
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.Modalthirdtwo}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.ModalCancelView}>
                          <Text
                            style={{
                              fontSize: height / 42,
                              fontWeight: '700',
                              color: 'black',
                            }}>
                            Cancel
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default WithdrawYourCoin;

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
    // width: width / 2.35,
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
  ThirdContainer1: {
    height: height / 22,
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
  Max1View: {
    height: height / 22,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
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
    fontSize: height / 55,
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
    // backgroundColor: 'green',
  },
  buttonView: {
    height: height / 15,
    width: width / 1.35,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Continuetext: {
    color: 'white',
    fontSize: height / 40,
  },
  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    backgroundColor: '#00000060',
  },
  modalView: {
    height: height / 3,
    width: width / 1,

    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      borderWidth: 1,
      borderColor: 'grey',
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ModalmainView: {
    height: height / 3.3,
    width: width / 1,
    // backgroundColor:"green",
    alignItems: 'center',
  },
  ModalOneView: {
    height: height / 16,
    width: width / 1,
    backgroundColor: '#rgb(48,44,44)',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ModalTwoView: {
    height: height / 7.5,
    width: width / 1.1,
    // backgroundColor:"blue",
    justifyContent: 'center',
    // alignItems:"center",
    // flexDirection:"row"
  },
  ImageinformationView: {
    height: height / 32,
    width: width / 13,
    // backgroundColor:"red",
    justifyContent: 'center',
    // alignItems:"center"
  },
  Textview: {
    height: height / 10,
    width: width / 1.1,
    // backgroundColor:"green"
  },
  ModalThreeView: {
    height: height / 14,
    width: width / 1,
    // backgroundColor:"cyan",
    flexDirection: 'row',
  },
  Modalthirdone: {
    height: height / 14,
    width: width / 1.7,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modalthirdtwo: {
    height: height / 14,
    width: width / 2.3,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalConfirmView: {
    height: height / 20,
    width: width / 2.3,
    backgroundColor: 'green',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalCancelView: {
    height: height / 20,
    width: width / 3.4,
    // backgroundColor:"rgb(182,27,32)",
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

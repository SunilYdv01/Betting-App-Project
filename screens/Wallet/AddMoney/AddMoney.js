import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  View,
  Text,
} from 'react-native';
import {AppView, AppText, AppImage} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import Header from '../../../components/molecules/Header';
import {card} from '../../../assets/icon';
import {BackArrow, Star, qrcode, copy} from '../../../assets/icon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMoney = props => {
  const [cardNumber, setcardNumber] = useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [BalanceToken, setBalanceToken] = useState(
    props.route.params.BalanceToken ? props.route.params.BalanceToken : null,
  );
  const [AVtAMOUNT, setAVtAMOUNT] = useState(
    props.route.params.AVtAMOUNT ? props.route.params.AVtAMOUNT : null,
  );
  const [UsdAMOUNT, setUsdAMOUNT] = useState(
    props.route.params.UsdAMOUNT ? props.route.params.UsdAMOUNT : null,
  );
  //  const[cardExpiry,setcardExpiry]=useState()
  console.log('balanceFound in token ---------->>>>', BalanceToken);
  console.log('balanceFound AVT ---------->>>>', AVtAMOUNT);
  console.log('balanceFound in USD ---------->>>>', UsdAMOUNT);
  const _handlingCardNumber = number => {
    setcardNumber(
      number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };

  const [HolderName, setHolderName] = useState('');
  const [checkHolderName, setCheckHolderName] = useState(true);
  const [errorHolderName, setErrorHolderName] = useState(null);

  const [ExpiryYear, setExpiryYear] = useState('');
  const [checkExpiryYear, setCheckExpiryYear] = useState(true);
  const [errorExpiryYear, setErrorExpiryYear] = useState(null);

  const [ExpiryMonth, setExpiryMonth] = useState('');
  const [checkExpiryMonth, setCheckExpiryMonth] = useState(true);
  const [errorExpiryMonth, setErrorExpiryMonth] = useState(null);

  const [CardNumberEntry, setCardNumberEntry] = useState('');
  const [checkCardNumberEntry, setCheckCardNumberEntry] = useState(true);
  const [errorCardNumberEntry, setErrorCardNumberEntry] = useState(null);

  const [CVVNumber, setCVVNumber] = useState('');
  const [checkCVVNumber, setCheckCVVNumber] = useState(true);
  const [errorCVVNumber, setErrorCVVNumber] = useState(null);

  const [TokenPrice, setTokenPrice] = useState(10);
  const [PaymentMethod, setPaymentMethod] = useState('BANK_WIRE');
  const [TokenName, setTokenName] = useState('AVT');
  const [CurrencyName, setCurrencyName] = useState('USD');

  const _validateHolderName = fname => {
    var fnameRegex = /^[a-z A-Z]{3,32}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorHolderName('* Please enter Holder Name');
    } else if (!fnameRegex.test(fname)) {
      setErrorHolderName('* Please enter valid Holder Name');
    } else {
      setErrorHolderName(null);
    }
  };

  const _validateExpiryMonth = fname => {
    var fnameRegex = /^[0-9]{2}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorExpiryMonth('*Enter Expiry Month');
    } else if (!fnameRegex.test(fname)) {
      setErrorExpiryMonth('*Enter valid Expiry Month');
    } else {
      setErrorExpiryMonth(null);
    }
  };

  const _validateExpiryYear = fname => {
    var fnameRegex = /^[0-9]{4}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorExpiryYear('*Enter Expiry Year');
    } else if (!fnameRegex.test(fname)) {
      setErrorExpiryYear('*Enter valid Expiry Year');
    } else {
      setErrorExpiryYear(null);
    }
  };

  const _validateCVVNumber = fname => {
    var fnameRegex = /^[0-9]{3}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorCVVNumber('*Enter CVC Number');
    } else if (!fnameRegex.test(fname)) {
      setErrorCVVNumber('*Enter valid CVC Number');
    } else {
      setErrorCVVNumber(null);
    }
  };

  const _validateCardNumberEntry = fname => {
    var fnameRegex = /^[0-9]{16}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorCardNumberEntry('* Please enter Card Number');
    } else if (!fnameRegex.test(fname)) {
      setErrorCardNumberEntry('* Please enter valid Card Number');
    } else {
      setErrorCardNumberEntry(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (HolderName === '') {
      setErrorHolderName('* Please enter Holder Name');
      flag = false;
    }
    if (ExpiryYear === '') {
      setErrorExpiryYear('*Enter Expiry Year');
      flag = false;
    }
    if (ExpiryMonth === '') {
      setErrorExpiryMonth('*Enter Expiry Month');
      flag = false;
    }
    if (CVVNumber === '') {
      setErrorCVVNumber('*Enter CVC Number');
      flag = false;
    }

    if (CardNumberEntry === '') {
      setErrorCardNumberEntry('*Please Enter Card Number');
      flag = false;
    }

    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
    }
    AddCardDetails();
  };

  const AddCardDetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'post',
      url: `https://java-create-token.mobiloitte.org/wallet/basic-exchange/buy-token`,
      data: {
        amount: UsdAMOUNT,
        cardNubmer: CardNumberEntry,
        currency: CurrencyName,
        cvc: CVVNumber,
        exp_month: ExpiryMonth,
        exp_year: ExpiryYear,
        paymentMethod: PaymentMethod,
        token: TokenName,
        tokenPrice: TokenPrice,
        tokenQuantity: AVtAMOUNT,

        // active: "true",
        // // cardHolderName: HolderName,
        // cardNumber: CardNumberEntry,
        // exp_month: ExpiryMonth,
        // exp_year: ExpiryYear,
        // tokenPrice: TokenPrice,
        // paymentMethod:PaymentMethod,
        // token:TokenName,
        // currency:CurrencyName,
        // cvc:CVVNumber,
        // tokenQuantity:AVtAMOUNT,
        // amount:UsdAMOUNT
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        // alert("hello")
        if (res.status === 200) {
          console.log('Viewprofile -----details-------- >>>>>', res.data);
          alert(res.data.message);
          props.navigation.navigate('AddAmount', {
            // cardHolderName: HolderName,
            cardNumber: CardNumberEntry,
            exp_month: ExpiryMonth,
            exp_year: ExpiryYear,
            tokenPrice: TokenPrice,
            paymentMethod: PaymentMethod,
            token: TokenName,
            currency: CurrencyName,
            cvc: CVVNumber,
            tokenQuantity: AVtAMOUNT,
            amount: UsdAMOUNT,
          });
          //  setUserProfile(res.data.data)
          //  console.log("userprofile2222----vandoo-->>>",userProfile);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  return (
    <SafeAreaView>
      <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
          }}>
          <Header
            head={false}
            backImage={BackArrow}
            headerText2="Purchase Token"
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <KeyboardAwareScrollView>
          <AppView style={styles.FirstContainer}>
            <AppView style={styles.ImagecardView}>
              <AppImage
                resizeMode="contain"
                style={styles.cardImage}
                source={card}></AppImage>
            </AppView>
            <AppView style={styles.BalanceView}>
              <AppText style={styles.BalanceText}>
                Token Balance : {BalanceToken.walletBalance}
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.SecondContainer}>
            <AppView style={styles.cardView}>
              <AppText style={styles.cardtext}>Enter Card details</AppText>
            </AppView>
            <AppView style={styles.viewtext}>
              <AppText style={styles.Textline}>
                Please enter card information to refill your Balance
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.ThirdContainer}>
            {/* <AppView style={styles.CardNumberView}>
              <AppText style={styles.CardText}>Card Holder Name</AppText>
            </AppView>
            <AppView style={styles.inputmainContainer}>
              <AppView style={styles.Textinput1View}>
                <TextInput
                  style={{
                    fontSize: height / 55,
                    fontWeight: '700',
                    color: 'black',
                  }}
                  keyboardType="default"
                  placeholder="Card Holder Name"
                  placeholderTextColor="grey"
                  maxLength={19}
                  // onChangeText={txt => {
                  //   setHolderName(txt), _validateHolderName(txt);
                  // }}
                />
              </AppView>
              {/* {errorHolderName != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width * 1,
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 17,
                    }}>
                    {errorHolderName}
                  </AppText>
                </AppView>
              ) : null} */}
            {/* </AppView>  */}
            <AppView style={styles.CardNumberView}>
              <AppText style={styles.CardText}>Card Number</AppText>
            </AppView>
            <AppView style={styles.inputmainContainer}>
              <AppView style={styles.Textinput1View}>
                <TextInput
                  style={{
                    fontSize: height / 55,
                    fontWeight: '700',
                    color: 'black',
                  }}
                  keyboardType="number-pad"
                  onChangeText={text => _handlingCardNumber(text)}
                  onChangeText={txt => {
                    setCardNumberEntry(txt), _validateCardNumberEntry(txt);
                  }}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="grey"
                  value={cardNumber}
                  maxLength={19}
                />

                {/* <TextInput
            keyboardType="number-pad"
              style={styles.inputText}
              placeholderTextColor="black"
              placeholder=""></TextInput> */}
              </AppView>
              {errorCardNumberEntry != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width * 1,
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 17,
                    }}>
                    {errorCardNumberEntry}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
            <AppView style={styles.TextView}>
              <AppView style={styles.ExpireView}>
                <AppText style={styles.ExpireText}>Expiry Year</AppText>
              </AppView>
              <AppView style={styles.CvvView}>
                <AppText style={styles.CvvText}>Expiry Month</AppText>
              </AppView>
            </AppView>
            <AppView style={styles.mainInputView}>
              <AppView style={styles.expireView1}>
                <AppView style={styles.expireTextInputView}>
                  {/* <TextInput
             onChangeText={(text) => _handlingCardExpiry(text)}
             style={styles.inputText1}
             placeholderTextColor="black"
    placeholder='MM/YY'
    keyboardType={'numeric'}
    value={cardExpiry}
   /> */}

                  <TextInput
                    keyboardType="number-pad"
                    style={styles.inputText1}
                    placeholderTextColor="grey"
                    maxLength={5}
                    placeholder="XXXX"
                    onChangeText={txt => {
                      setExpiryYear(txt), _validateExpiryYear(txt);
                    }}></TextInput>
                </AppView>
                {errorExpiryYear != null ? (
                  <AppView
                    style={{
                      height: height / 47,
                      width: width / 2.5,
                      // backgroundColor:"green",
                      justifyContent: 'center',
                    }}>
                    <AppText
                      style={{
                        color: 'red',
                        fontSize: height / 60,
                        marginLeft: 4,
                      }}>
                      {errorExpiryYear}
                    </AppText>
                  </AppView>
                ) : null}
              </AppView>
              <AppView style={styles.cvvView1}>
                <AppView style={styles.CvvTextInputView}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.inputText2}
                    placeholderTextColor="grey"
                    placeholder="XX"
                    onChangeText={txt => {
                      setExpiryMonth(txt), _validateExpiryMonth(txt);
                    }}></TextInput>
                </AppView>
                {errorExpiryMonth != null ? (
                  <AppView
                    style={{
                      height: height / 47,
                      width: width / 2.5,
                      // backgroundColor:"green",
                      justifyContent: 'center',
                    }}>
                    <AppText
                      style={{
                        color: 'red',
                        fontSize: height / 60,
                        marginLeft: 4,
                      }}>
                      {errorExpiryMonth}
                    </AppText>
                  </AppView>
                ) : null}
              </AppView>
            </AppView>
            <AppView
              style={{
                height: height / 28,
                width: width / 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText
                style={{
                  fontSize: height / 55,
                  color: 'grey',
                  fontWeight: '700',
                }}>
                CVC Number
              </AppText>
            </AppView>
            <AppView
              style={{
                height: height / 14,
                width: width / 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppView
                style={{
                  height: height / 17,
                  width: width / 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.inputText1}
                  placeholderTextColor="grey"
                  maxLength={5}
                  placeholder="XXX"
                  onChangeText={txt => {
                    setCVVNumber(txt), _validateCVVNumber(txt);
                  }}></TextInput>
              </AppView>
              {errorCVVNumber != null ? (
                <AppView
                  style={{
                    height: height / 47,
                    width: width / 2.2,
                    // backgroundColor:"green",
                    justifyContent: 'center',
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 4,
                    }}>
                    {errorCVVNumber}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
          </AppView>
          <AppView style={styles.FifthContainer}>
            <TouchableOpacity
              //onPress={() => onSubmit()}
              onPress={() => validate()}>
              <AppView style={styles.buttonView}>
                <AppText
                  onPress={() => {
                    setModalVisible(true);
                    // setTimeout(() => {
                    //   setModalVisible(false);
                    // }, 5000);
                  }}
                  style={styles.Confirmtext}>
                  Confirm
                </AppText>
              </AppView>
            </TouchableOpacity>
          </AppView>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalblur}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure you want to Confirm{'\n'} this Bet?
                  </Text>

                  <View style={styles.first}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <View style={styles.noView}>
                        <Text style={styles.no}>No</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onSubmit()}
                      //onPress={() => validate()}

                      // onPress={() => { AddCardDetails
                      //   // navigation.navigate("Login")
                      //   props.navigation.navigate({
                      //     //name: 'PlaceYourBet',

                      //     name: 'PlaceYourBet',

                      //     merge: true,
                      //   });

                      //   // navigation.goBack();
                      //   //navigation.state.params.onSelectUser(selectedUser);
                      // }}
                    >
                      <View style={styles.yesView}>
                        <Text style={styles.yes}>Yes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </AppView>
    </SafeAreaView>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245, 245, 245)',
  },
  FirstContainer: {
    height: height / 4,
    width: width / 1,
    backgroundColor: '#rgb(255,255,255)',
    // backgroundColor:"green"
  },
  SecondContainer: {
    height: height / 9,
    width: width / 1,
    // backgroundColor: '#FEFAEF',
  },
  cardView: {
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
  cardtext: {
    fontSize: height / 40,
    fontWeight: '700',
    // width: width / 2.35,
    // backgroundColor:"grey",
    // textAlign:"right",
    marginHorizontal: 18,
  },
  Textline: {
    fontSize: height / 55,
    width: width / 1.1,
    // backgroundColor:"cyan",
    textAlign: 'left',
    color: 'grey',
  },
  ThirdContainer: {
    height: height / 3,
    width: width / 1,
    // backgroundColor: 'red',
  },
  inputText: {
    color: 'black',
    fontSize: height / 53,
    width: width / 1.2,
    //   backgroundColor: 'green',
  },
  inputText1: {
    color: 'black',
    fontSize: height / 53,

    //   backgroundColor: 'green',
  },
  inputText2: {
    color: 'black',
    fontSize: height / 53,

    //   backgroundColor: 'green',
  },
  CardNumberView: {
    height: height / 32,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  CardText: {
    fontSize: height / 55,
    color: 'grey',
    marginHorizontal: 18,
    fontWeight: '700',
  },
  inputmainContainer: {
    height: height / 15,
    width: width / 1,
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textinput1View: {
    height: height / 18,
    width: width / 1.1,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextView: {
    height: height / 30,
    width: width / 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
  },
  ExpireView: {
    height: height / 25,
    width: width / 2,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  ExpireText: {
    fontSize: height / 55,
    color: 'grey',
    marginHorizontal: 18,
    fontWeight: '700',
  },
  CvvView: {
    height: height / 25,
    width: width / 2,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  CvvText: {
    fontSize: height / 55,
    color: 'grey',
    marginHorizontal: 18,
    fontWeight: '700',
  },
  mainInputView: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"blue",
    flexDirection: 'row',
  },
  expireTextInputView: {
    height: height / 17,
    width: width / 2.28,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expireView1: {
    height: height / 15,
    width: width / 2,
    // backgroundColor:"yellow",
    alignItems: 'center',
    justifyContent: 'center',
  },
  cvvView1: {
    height: height / 15,
    width: width / 2,
    // backgroundColor:"green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  CvvTextInputView: {
    height: height / 17,
    width: width / 2.5,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FifthContainer: {
    height: height / 10,
    width: width / 1,
    //   backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    height: height / 15,
    width: width / 1.35,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Confirmtext: {
    color: 'white',
    fontSize: height / 40,
  },
  ImagecardView: {
    height: height / 5.4,
    width: width / 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: height / 8,
    width: width / 2.3,
    // backgroundColor:"green"
  },
  BalanceText: {
    fontSize: height / 35,
    fontWeight: '700',
    color: '#rgb(48,44,44)',
  },
  BalanceView: {
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'red',
    alignItems: 'center',
  },

  modalView: {
    marginTop: height / 2.7,
    height: height / 3.5,
    width: width / 1.1,

    backgroundColor: 'rgb(94,28,159)',
    // backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    marginLeft: height / 50,
    //borderColor: 'grey',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
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
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: height / 40,
    fontWeight: '400',
    //fontFamily: 'Roboto-Light',
    marginTop: height / 15,
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  add: {
    fontSize: height / 40,
    color: '#005DAC',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  yes: {
    color: 'rgba(202, 202, 202, 1)',
    fontSize: height / 50,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: height / 90,
  },
  yesView: {
    backgroundColor: 'white',
    width: width / 3.5,
    borderColor: 'white',
    borderWidth: 1,
    height: height / 20,
    alignSelf: 'center',
    marginTop: height / 30,
    borderRadius: 50,
    marginLeft: height / 20,
    backgroundColor: 'rgb(94,28,159)',
  },
  noView: {
    backgroundColor: 'white',
    width: width / 3.5,
    borderColor: 'white',
    borderWidth: 1,
    height: height / 20,
    alignSelf: 'center',
    marginTop: height / 30,
    borderRadius: 50,
    justifyContent: 'center',
    marginLeft: height / 90,
    backgroundColor: 'rgb(94,28,159)',
  },
  no: {
    color: 'rgba(202, 202, 202, 1)',
    fontSize: height / 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  first: {
    height: height / 12,
    width: width / 1.5,
    flexDirection: 'row',
    marginLeft: height / 25,
    marginTop: height / 20,
  },
  modalblur: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: height / 1,
    width: width / 1,
  },
});

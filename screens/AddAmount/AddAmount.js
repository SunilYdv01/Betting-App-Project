import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/molecules/Header';
const {height, width} = Dimensions.get('screen');
import {BackArrow, arrow} from '../../assets/icon';
import CardView from 'react-native-cardview';
import {Dropdown} from 'react-native-material-dropdown';
import SwipeButton from 'rn-swipe-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppTouchable} from '../../components/Atom/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let data3 = [
  {
    value: 'USD',
  },
  {
    value: 'BTC',
  },
  {
    value: 'ETH',
  },
  {
    value: 'RIPPLE',
  },
];

const AddAmount = (props, {navigation, route}) => {
  const [USDAmountValue, setUSDAmountValue] = useState();
  const [AVTAmount, setAVTAmount] = useState();
  const [coinListData, setCoinListData] = useState();
  const [actualCurrencyList, setActualCurrencyList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [usdAmount, setUSDAmount] = useState(null);
  const [betAmount, setBetAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [IDType, setIDtype] = useState(null);
  const [AVTBalance, setAVTBalance] = useState([]);
  const [BalanceUSD, setBalanceUSD] = useState([]);
  const [cardReverseStatus, setCardReverseStatus] = useState(true);

  useEffect(() => {
    // walletcoinlist();
    // fetchCurrencies();
    getUSDCurrency();
    walletBalancecoinlist();
    availbalebalancecointousd();
  }, []);

  const walletBalancecoinlist = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/wallet//get-balance?coinName=AVT',

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('wallet111111 ------------- >>>>>', res.data.data); // Total Balance
          setAVTBalance(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };
  console.log('AVT Balance -------->>>>>', AVTBalance);

  // **************************** Conversion WINS *********************

  const getUSDCurrency = async type => {
    // const value = await AsyncStorage.getItem('token');
    // console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=AVT',

      headers: {
        'content-type': 'application/json',
      },
      params: {
        api_key:
          '61e5b7f568ed5e01762d3f99c426b88fa0046caf4a7c62a284102b86c41d25ca',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('GetData ------------- >>>>>', res.data, USDAmountValue); // Total Balance
          let getValue = null;
          // alert(getValue)
          if (type === 'typeTwo') {
            getValue = res.data.AVT / USDAmountValue;
            setUSDAmountValue(getValue);
          } else {
            getValue = res.data.AVT * USDAmountValue;
            setAVTAmount(getValue);
          }
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };
  console.log('Get Avt Data-------->>>>', AVTAmount);

  // const convertToUSD = amount => {
  //   actualCurrencyList.map(item => {
  //     selectedCurrency === item.coinFullName
  //       ? setUSDAmount((Number(amount) * item.usdAmount).toFixed(3))
  //       : null;
  //     });
  // };

  const availbalebalancecointousd = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/wallet/wallet/get-balance-in-usd?coinName=AVT`,

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('balance in usd  ------------- >>>>>', res.data);

          setBalanceUSD(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };
  console.log('balance in usd 11111111-------- >>>>', BalanceUSD);
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <View
          style={{
            height: height / 17,
            //   backgroundColor: 'yellow',
            width: width / 1,
          }}>
          <Header
            head={false}
            headerText2={'Buy Token'}
            backImage={BackArrow}
            onPress2={() => props.navigation.goBack()}
          />
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.FirstView}>
            <View style={styles.FirstOneView}>
              <Text
                style={{
                  fontSize: height / 55,
                  color: 'black',
                  fontWeight: '700',
                }}>
                Available Balance
              </Text>
            </View>
            <View style={styles.FirstTwoView}>
              <Text style={{fontSize: height / 30, color: '#7A25CE'}}>
                {AVTBalance.walletBalance} TOKEN
              </Text>
            </View>
            <View style={styles.FirstThreeView}>
              <Text style={{fontSize: height / 60, color: 'grey'}}>
                Value in USD: $ {BalanceUSD}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.SecondView,
              {flexDirection: cardReverseStatus ? 'column' : 'column-reverse'},
            ]}>
            <CardView
              style={styles.Swap1View}
              cardElevation={7}
              cardMaxElevation={7}
              cornerRadius={5}>
              <View style={styles.firstcardviewmain}>
                <View style={styles.FirstCardMainView}>
                  <View style={styles.FirstCardOneView}>
                    <Text
                      style={{
                        fontSize: height / 55,
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      USD Amount
                    </Text>
                  </View>
                  <View style={styles.FirstcardOneView2}>
                    <Text
                      style={{
                        fontSize: height / 50,
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      Buy For
                    </Text>
                  </View>
                </View>
                <View style={styles.FirstcardTwoView}>
                  <View style={styles.FirstcardTwoView1}>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: 'black',
                        paddingHorizontal: 23,
                      }}>
                      Enter Your Amount {'                 '} 1 Token A=$10
                    </Text>
                  </View>
                  <View style={styles.FirstcardTwoView2}>
                    <View style={styles.FirstcardtwoFirstView}>
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="black"
                        placeholder="0.000"
                        maxLength={4}
                        style={{
                          fontWeight: '700',
                          fontSize: height / 45,
                          color: 'black',
                        }}
                        onBlur={() => getUSDCurrency()}
                        onChangeText={txt => {
                          setUSDAmountValue(txt);
                        }}
                        value={USDAmountValue ? String(USDAmountValue) : ''}
                      />
                    </View>
                    <View style={styles.FirstcardtwoSecondView}>
                      {/* <Text
                        style={{
                          fontSize: height / 60,
                          color: 'black',
                          padding: 10,
                        }}>
                        {usdAmount}
                      </Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </CardView>
            <View
              style={{
                height: height / 28,
                width: width / 1.1,
                alignItems: 'center',
                zIndex: 1,
              }}>
              <TouchableOpacity
                onPress={() => setCardReverseStatus(!cardReverseStatus)}>
                <Image
                  source={arrow}
                  style={{
                    // top: -20,
                    height: height / 20,
                    width: width / 9,
                    marginHorizontal: 10,
                  }}></Image>
              </TouchableOpacity>
            </View>
            <CardView
              style={styles.Swap2View}
              cardElevation={7}
              cardMaxElevation={7}
              cornerRadius={5}>
              <View style={styles.secondcardMainView}>
                <View style={styles.secondcardfirstView}>
                  <View style={styles.secondcardfirstOneView}>
                    <Text
                      style={{
                        fontSize: height / 55,
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      WINS Token
                    </Text>
                  </View>
                  <View style={styles.secondcardsecondView}>
                    <Text
                      style={{
                        fontSize: height / 50,
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      You Get
                    </Text>
                  </View>
                </View>

                <View style={styles.FirstcardTwoView}>
                  <View style={styles.FirstcardTwoView1}>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: 'black',
                        paddingHorizontal: 23,
                      }}>
                      Enter Your Amount {'                 '} 1 Token A=$10
                    </Text>
                  </View>
                  <View style={styles.FirstcardTwoView2}>
                    <View style={styles.FirstcardtwoFirstView}>
                      {/* <Text>{usdAmount}</Text> */}
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="black"
                        placeholder="0.00"
                        style={{
                          fontWeight: '700',
                          fontSize: height / 45,
                          color: 'black',
                        }}
                        onBlur={() => getUSDCurrency('typeTwo')}
                        onChangeText={txt => setAVTAmount(txt)}
                        value={AVTAmount ? AVTAmount.toString() : 0}
                        // value={(Number(amount) * usdAmount).toFixed(3)}
                        // onChange={amount}
                      />
                    </View>
                    <View style={styles.FirstcardtwoSecondView}>
                      {/* <Text style={{fontSize: height / 60, color: 'grey'}}>
                        
                      </Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </CardView>
          </View>

          {/* <Text   onChangeText={txt => {
                      setTokenPrice(txt)
                    }}>{TokenPrice}</Text> */}
          <View style={styles.thirdView}>
            <AppTouchable
              onPress={() => {
                // navigation.navigate("Login")
                props.navigation.navigate({
                  name: 'AddMoney',
                  params: {
                    BalanceToken: AVTBalance,
                    AVtAMOUNT: AVTAmount,
                    UsdAMOUNT: USDAmountValue,
                  },
                  // merge: true,
                });
              }}
              // onPress={()=>navigation.navigate("AddMoney")}
            >
              <View
                style={{
                  height: height / 15,
                  width: width / 1.18,
                  backgroundColor: '#196D5B',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: height / 50,
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Continue
                </Text>
              </View>
            </AppTouchable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddAmount;

const styles = StyleSheet.create({
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#F2F3E6',
  },
  FirstView: {
    height: height / 6,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
  },
  SecondView: {
    height: height / 2.3,
    width: width / 1,
    // backgroundColor:"green",
    alignItems: 'center',
  },
  FirstOneView: {
    height: height / 19,
    width: width / 1.2,
    // backgroundColor:"cyan",
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: 'black',
  },
  FirstTwoView: {
    height: height / 16,
    width: width / 1.2,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: 'black',
  },
  FirstThreeView: {
    height: height / 19,
    width: width / 1,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondOneView: {
    height: height / 4,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  SecondTwoView: {
    height: height / 4,
    width: width / 1,
    // backgroundColor:"cyan",

    alignItems: 'center',
  },
  Swap1View: {
    height: height / 5.3,
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  Swap2View: {
    height: height / 5.3,
    width: width / 1.1,
    backgroundColor: 'white',
    // backgroundColor:"red",
    borderRadius: 20,
    marginVertical: 3,
  },
  FirstCardMainView: {
    height: height / 16,
    // backgroundColor:"red",
    width: width / 1.1,
    flexDirection: 'row',
  },
  FirstCardOneView: {
    height: height / 16,
    // backgroundColor:"blue",
    width: width / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FirstcardOneView2: {
    height: height / 16,
    // backgroundColor:"cyan",
    width: width / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FirstcardTwoView: {
    height: height / 12,
    // backgroundColor:"green",
    width: width / 1.1,
  },
  FirstcardTwoView1: {
    height: height / 26,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  FirstcardTwoView2: {
    height: height / 16,
    width: width / 1.1,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  FirstcardtwoFirstView: {
    height: height / 16,
    width: width / 2.2,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  // FirstcardtwoFirstView:{
  //     height:height/16,
  //     width:width/2.2,
  //     // backgroundColor:"blue"
  //     },
  FirstcardtwoSecondView: {
    height: height / 16,
    width: width / 2.2,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstcardviewmain: {
    height: height / 6,
    width: 1.1,
    // backgroundColor:'green'
  },
  secondcardMainView: {
    height: height / 5.4,
    // backgroundColor:"cyan",
    width: width / 1.1,
  },
  secondcardfirstView: {
    height: height / 18,
    width: width / 1.1,
    // backgroundColor:"green",
    flexDirection: 'row',
  },
  secondcardfirstOneView: {
    height: height / 18,
    width: width / 2.2,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondcardsecondView: {
    height: height / 18,
    width: width / 2.2,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    height: height / 9,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: height / 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

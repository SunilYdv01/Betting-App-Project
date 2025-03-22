import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';

import {Anticlock, next, BackArrowTwo} from '../../assets/icon';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CardView from 'react-native-cardview';
const {height, width} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {Dropdown} from 'react-native-material-dropdown';

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
    value: 'WINS',
  },
];

let data2 = [
  {
    value: 'Choose Bet Amount',
  },
  {
    value: '0.00',
  },
  {
    value: '1.00',
  },
  {
    value: '2.00 ',
  },
  {
    value: '5.00',
  },
  {
    value: '10.00',
  },
  {
    value: '20.00',
  },
  {
    value: '30.00',
  },
  {
    value: '50.00',
  },
  {
    value: '75.00',
  },
  {
    value: '1000.00',
  },
];

const DATA = [
  {
    img: require('../../assets/images/hand/hand.png'),
    create: 'Create a Bet',
    details: 'Challenge your friends on a Bet created by you',
    img2: require('../../assets/images/next/next.png'),
  },
  {
    img: require('../../assets/images/hand/hand.png'),
    create: 'Create a Bet',
    details: 'Challenge your friends on a Bet created by you',
    img2: require('../../assets/images/next/next.png'),
  },
  {
    img: require('../../assets/images/hand/hand.png'),
    create: 'Create a Bet',
    details: 'Challenge your friends on a Bet created by you',
    img2: require('../../assets/images/next/next.png'),
  },
];

const CreateBet = (props, {navigation}) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [btn, setBtn] = useState(null);
  // const [usdAmount, setUSDAmount] = useState(null);

  const [TitleName, setTitleName] = useState('');
  const [checkTitleName, setCheckTitleName] = useState(true);
  const [errorTitleName, setErrorTitleName] = useState(null);

  const [AmountValue, setAmountValue] = useState('');
  const [checkAmountValue, setCheckAmountValue] = useState(true);
  const [errorAmountValue, setErrorAmountValue] = useState(null);

  const [actualCurrencyList, setActualCurrencyList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [usdAmount, setUSDAmount] = useState(null);
  const [betAmount, setBetAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [IDType, setIDtype] = useState(null);

  // const [BetTitle,setBetTitle] =useState ( 'BetTitle');
  // const [CurrencySelect,setCurrencyList]=useState ('CurrencySelect');
  // const [BetAmountvalue,setBetAmountvalue]=useState('BetAmountvalue ');

  const _validateTitleName = fname => {
    var fnameRegex = /^[a-z A-Z 0-9]{3,32}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorTitleName('*Please enter a bet title');
    } else if (!fnameRegex.test(fname)) {
      setErrorTitleName('*Please enter valid a bet title.');
    } else {
      setErrorTitleName(null);
    }
  };
  const _validateAmountValue = fname => {
    var fnameRegex = /^[0-9]{1,7}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorAmountValue('*Please enter Some Amount');
    } else if (!fnameRegex.test(fname)) {
      setErrorAmountValue('*Please enter a valid   Amount');
    } else {
      setErrorAmountValue(null);
    }
  };
  const validate = () => {
    let flag = true;
    if (AmountValue === '') {
      setErrorAmountValue('*Please enter Some Amount');
      flag = false;
    }
    return flag;
  };

  // const onSubmit = () => {
  //   if (validate()) {
  //     props.navigation.navigate('pay', {

  //     });
  //   }
  // };
  useEffect(() => {}, []);

  // const createmybet = async () => {
  //   const value = await AsyncStorage.getItem('token');
  //   console.log('====== my token======>>>>', value);

  //   axios({
  //     method: 'get',
  //     url: `https://java-create-token.mobiloitte.org:4094/account/my-create-bet-api`,
  //     headers: {
  //       Authorization: `Bearer ${value}`,
  //     },
  //     params:{
  //       page:1,
  //       pagesize:22,

  //     }

  //   })
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log('api hello------------- >>>>>', res.data);
  //       } else {
  //         alert('Something went wrong');
  //       }
  //     })
  //     .catch(err => console.log('error catch---->>>>', err));
  // };

  useEffect(() => {
    // walletcoinlist();
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    await axios({
      method: 'GET',
      url: 'https://java-create-token.mobiloitte.org/wallet/coin/get-coin-list',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(async res => {
        console.log('currencies list-->>', res);
        if (res.status === 200) {
          let tempArr = [];
          res.data.data.forEach(element => {
            element.coinType === 'crypto'
              ? tempArr.push({value: element.coinFullName})
              : null;
          });
          setCurrenciesList(tempArr);
          getUSDCurrency(res.data.data);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('err in currencies list ----------', err));
  };

  const getUSDCurrency = async data => {
    let tempArr = [];
    await Promise.all(
      data.map(async element => {
        await axios({
          method: 'GET',
          url: `https://min-api.cryptocompare.com/data/price?fsym=${element.coinShortName}&tsyms=USD`,
          headers: {
            'content-type': 'application/json',
          },
          params: {
            api_key:
              '61e5b7f568ed5e01762d3f99c426b88fa0046caf4a7c62a284102b86c41d25ca',
          },
        })
          .then(async res => {
            console.log('data in usd-->>', element.coinShortName, res.data);
            if (res.status === 200) {
              tempArr.push({...element, usdAmount: res.data.USD});
            } else {
              alert('Something went wrong.');
            }
          })
          .catch(err => console.log('err in currencies list ----------', err));
      }),
    );
    setActualCurrencyList(tempArr);
  };
  console.log('setActualCurrencyList', actualCurrencyList);

  const convertToUSD = amount => {
    actualCurrencyList.map(item => {
      selectedCurrency === item.coinFullName
        ? setUSDAmount((Number(amount) * item.usdAmount).toFixed(3))
        : null;
    });
  };

  return (
    <SafeAreaView>
      <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 13,
            width: width / 1,
            // backgroundColor: 'yellow',
          }}>
          <HeaderTwo
            onPress3={() => props.navigation.navigate('InboxScreen')}
            onPress4={() => props.navigation.navigate('DrawerNavigator')}
          />
        </AppView>
        <AppView style={styles.FirstContainer}>
          <AppText style={styles.createText}>Select One of them to Bet</AppText>
        </AppView>

        <View style={styles.mainSelctorView}>
          <CardView
            style={{
              height: height / 4.8,
              width: width / 1.11,
              backgroundColor: 'white',
              marginVertical: 10,
              borderRadius: 10,
            }}
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}>
            <View
              style={{
                height: height / 20,
                width: width / 1.11,
                backgroundColor: '#7A25CE',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: height / 50,
                  color: 'white',
                  fontWeight: '700',
                }}>
                Sports Bet
              </Text>
            </View>

            <View style={styles.instantbetfirstView}>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  // marginVertical: 7,
                  marginHorizontal: 5,
                  marginTop: 5,
                }}>
                Play has evolved from players simply being able to
              </Text>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                bet on the match odds during play, to wagering on
              </Text>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                the next team or player to score, to cashing out open
              </Text>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 5,
                  // width: width * 0.88,
                }}>
                bets, to the latest iteration .
              </Text>
            </View>
            <View style={styles.instantbetsecondView}>
              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <View style={styles.instantbetButtonView}>
                  <Text
                    style={{
                      fontSize: height / 65,
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    Sports Bet
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </CardView>

          <Text
            style={{fontSize: height / 50, color: 'black', fontWeight: '700'}}>
            OR
          </Text>

          <CardView
            style={{
              height: height / 4.8,
              width: width / 1.11,
              backgroundColor: 'white',
              borderRadius: 10,
              marginVertical: 10,
            }}
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}>
            <View
              style={{
                height: height / 20,
                width: width / 1.11,
                backgroundColor: '#7A25CE',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: height / 50,
                  color: 'white',
                  fontWeight: '700',
                }}>
                {' '}
                Create Your Custom Bet
              </Text>
            </View>
            <View style={styles.createyourbetfirstView}>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 7,
                  marginHorizontal: 5,
                }}>
                Build Your Bet is a feature from Winsum that allows
              </Text>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                you to build your own bet on a number of Games or
              </Text>
              <Text
                style={{
                  fontSize: height / 62,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                Matches markets and then get a price instantly.
              </Text>
            </View>

            <View style={styles.createyourbetsecondView}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.createyourbetButtonView}>
                  <Text
                    style={{
                      fontSize: height / 68,
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    Create Your Bet
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </CardView>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAwareScrollView>
            <View style={styles.centered1View}>
              <View style={styles.modalView}>
                <View style={[styles.createYourBetView]}>
                  <Text
                    style={{
                      fontSize: height / 55,
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Create your own Bet
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 8,
                    width: width / 1.15,
                    top: 5,
                    position: 'relative',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: height / 60,
                      color: 'black',
                    }}>
                    Custom Bet allows punters to combine related or unrelated
                    outcomes into a single bet. Previously, all selections were
                    required to be placed as individual bets. Custom Bet now
                    allows customers to combine all selections into one
                    accumulated ticket
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 17,
                    width: width / 1.15,
                    // backgroundColor: 'green',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible),
                        props.navigation.navigate('pay');
                    }}>
                    <View
                      style={{
                        height: height / 22,
                        width: width / 3,
                        backgroundColor: 'green',
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: 'grey',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: height / 55,
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Continue
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <View
                      style={{
                        height: height / 22,
                        width: width / 3,
                        backgroundColor: 'white',
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: 'grey',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: height / 55,
                          color: 'black',
                          fontWeight: '700',
                        }}>
                        Cancel
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Modal>

        {/* Modal 2  */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible1(!modalVisible1);
          }}>
          <View style={styles.centered1View}>
            <View style={styles.modal1View}>
              <View style={styles.Modal2mainView}>
                <View style={styles.Modal2View1}>
                  <Text
                    style={{
                      fontSize: height / 50,
                      fontWeight: '700',
                      color: 'white',
                    }}>
                    Sports Bet
                  </Text>
                </View>
                <View style={styles.Modal2View2}>
                  <Text style={{fontSize: height / 50, color: 'black'}}>
                    Instant Betting, betting on events to take place during a
                    very short timeframe.
                  </Text>
                </View>
                <View style={styles.Modal2View3}>
                  <View style={styles.modal2ButtonView3}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible1(!modalVisible1),
                          props.navigation.navigate('AllSportsMatches');
                      }}>
                      <View style={styles.modal2instantbetbutton}>
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontWeight: '700',
                            color: 'white',
                          }}>
                          Sports Bet
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modal2ButtonView4}>
                    <TouchableOpacity
                      onPress={() => setModalVisible1(!modalVisible1)}>
                      <View style={styles.modal2Cancelbutton}>
                        <Text
                          style={{
                            fontSize: height / 55,
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
    </SafeAreaView>
  );
};

export default CreateBet;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#F2F3E6',
  },
  FirstContainer: {
    height: height / 14,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  createText: {
    fontSize: height / 42,
    color: '#rgb(58, 58, 58)',
    fontWeight: '700',
    paddingHorizontal: width / 25,
  },
  SecondContainer: {
    height: height / 3,
    width: width / 1,
    // backgroundColor:"yellow",
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    // flex:1,
    width: width / 1.1,
    marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#7A25CE',
    alignItems: 'center',
    height: height / 11,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  ImageView: {
    height: height / 11,
    width: width / 7,
    //   backgroundColor:"green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  BetView: {
    height: height / 11,
    width: width / 1.5,
    //   backgroundColor:"green",

    justifyContent: 'center',
  },
  creatingText: {
    fontSize: height / 50,
    color: 'white',
    paddingVertical: 3,
  },
  detailsText: {
    fontSize: height / 77,
    color: 'white',
  },
  Image2container: {
    height: height / 60,
    width: width / 29,
  },
  Image1View: {
    height: height / 11,
    width: width / 12,
    //   backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
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
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 4,
    width: width / 1.07,
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'grey',
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
  centered1View: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: height / 1,
    backgroundColor: '#00000060',
  },
  modalFirstview: {
    height: height / 16,
    width: width / 1.07,
    flexDirection: 'row',
    // backgroundColor:'yellow'
  },
  InstantBet: {
    height: height / 16,
    width: width / 2.3,
    borderTopLeftRadius: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createYourBetView: {
    height: height / 16,
    width: width / 1.07,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

    backgroundColor: '#rgb(94,28,159)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pridictView: {
    height: height / 19,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  TeamMainView: {
    height: height / 11,
    width: width / 1.07,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  FirstTeamMainView: {
    height: height / 11,
    width: width / 2.3,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondTeamMainView: {
    height: height / 11,
    width: width / 2.3,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  FirstTeamView: {
    height: height / 17,
    width: width / 2.6,
    // backgroundColor:  'white'  ,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SecondTeamView: {
    height: height / 17,
    width: width / 2.6,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChooseCountryView: {
    height: height / 21,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  selectCountryMainView: {
    height: height / 12,
    width: width / 1.24,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor:"grey",
    // borderWidth:1,
    // borderRadius:10
  },
  SelectCountryView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  placeyourbetScreen: {
    height: height / 35,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  SelectCoinMainView: {
    height: height / 12,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectCoinMainView1: {
    height: height / 14,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectCoinView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  SelectCoinView1: {
    height: height / 19,
    width: width / 1.22,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  ChallangeView: {
    height: height / 25,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickcancelMainView: {
    height: height / 11,
    width: width / 1.15,
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'center',
  },
  PickmainView: {
    height: height / 14,
    width: width / 2,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  CancelmainView: {
    height: height / 14,
    width: width / 2.6,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  PredictView: {
    height: height / 20,
    width: width / 2.3,
    backgroundColor: 'green',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelView: {
    height: height / 20,
    width: width / 3.4,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BetinputMainView: {
    height: height / 9,
    width: width / 1.16,
    // backgroundColor:"red"
  },
  BetView: {
    height: height / 24,
    width: width / 1.16,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  InputMainView: {
    height: height / 14,
    width: width / 1.16,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSelctorView: {
    height: height / 2,
    width: width / 1,
    // backgroundColor: 'red',
    // flexDirection:"row"
    alignItems: 'center',
  },
  firsthalfselectoriIew: {
    height: height / 2,
    width: width / 2,
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondhalfselectorView: {
    height: height / 2,
    width: width / 2,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InstantbetheaderView: {
    height: height / 19,
    width: width / 2.3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.9,
  },
  createyourbetheaderView: {
    height: height / 19,
    width: width / 2.3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.9,
  },
  createyourbetmainView: {
    height: height / 2.3,
    width: width / 2.3,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 0.8,
    alignItems: 'center',
  },
  instantbetmainView: {
    height: height / 2.3,
    width: width / 2.3,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 0.8,
    alignItems: 'center',
  },
  instantbetfirstView: {
    height: height / 10,
    width: width / 1.11,
    // backgroundColor: 'red',
  },
  createyourbetfirstView: {
    height: height / 12,
    width: width / 1.11,
    // marginTop:10
    // backgroundColor: 'red',
  },
  instantbetsecondView: {
    height: height / 17,
    width: width / 1.11,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  instantbetButtonView: {
    height: height / 23,
    width: width / 2.4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 1,
  },
  createyourbetsecondView: {
    height: height / 14,
    width: width / 1.11,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  createyourbetButtonView: {
    height: height / 23,
    width: width / 2.2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 1,
  },
  centeredView1: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  modal1View: {
    backgroundColor: '#ffffff',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: height / 5,
    width: width / 1.2,
  },
  Modal2mainView: {
    height: height / 5,
    width: width / 1.2,
    // backgroundColor: 'brown',
    alignItems: 'center',
  },
  Modal2View1: {
    height: height / 20,
    width: width / 1.2,
    backgroundColor: 'rgb(94,28,159)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Modal2View2: {
    height: height / 13,
    width: width / 1.275,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal2View3: {
    height: height / 19,
    width: width / 1.2,
    // backgroundColor:"red"
    flexDirection: 'row',
  },
  modal2ButtonView3: {
    height: height / 15,
    width: width / 2.4,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal2ButtonView4: {
    height: height / 15,
    width: width / 2.4,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal2instantbetbutton: {
    height: height / 22,
    width: width / 3.2,
    backgroundColor: 'green',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal2Cancelbutton: {
    height: height / 22,
    width: width / 3.8,
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

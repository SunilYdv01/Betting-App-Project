import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';

import HeaderTwo from '../../components/molecules/HeaderTwo';
// import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import {
  BackArrow,
  clock1,
  Calendar,
  profileicon,
  close,
} from '../../assets/icon';
import {Dropdown} from 'react-native-material-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CreateBet2 from '../CreateBet2/CreateBet2';

let data3 = [
  {
    value: 'NBA',
  },
  {
    value: 'NFL',
  },
  {
    value: 'MLB ',
  },
  {
    value: 'Soccer',
  },
  {
    value: 'Hockey',
  },
  {
    value: 'Tennis',
  },
  {
    value: 'Boxing',
  },
];

const pay = (props, {route, navigation}) => {
  const [actualCurrencyList, setActualCurrencyList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [usdAmount, setUSDAmount] = useState(null);
  const [betAmount, setBetAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [IDType, setIDtype] = useState(null);

  const [betTitle, setbetTitle] = useState('');
  const [checkbetTitle, setCheckbetTitle] = useState(true);
  const [errorbetTitle, setErrorbetTitle] = useState(null);

  const [GameName, setGameName] = useState('');
  const [checkGameName, setCheckGameName] = useState(true);
  const [errorGameName, setErrorGameName] = useState(null);

  const [MessageOpponent, setMessageOpponent] = useState('');
  const [checkMessageOpponent, setCheckMessageOpponent] = useState(true);
  const [errorMessageOpponent, setErrorMessageOpponent] = useState(null);

  const [DateEnd, setDateEnd] = useState(null);

  const [TimeEnd, setTimeEnd] = useState('');

  const _validateGameName = fname => {
    var fnameRegex = /^[a-z A-Z 0-9@_]{3,40}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorGameName('*Please enter Game Name');
    } else if (!fnameRegex.test(fname)) {
      setErrorGameName('*Please enter a Game Name');
    } else {
      setErrorGameName(null);
    }
  };

  const _validatebetTitle = fname => {
    var fnameRegex = /^[a-zA-Z 0-9@_]{3,256}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorbetTitle('*Please enter bet Title');
    } else if (!fnameRegex.test(fname)) {
      setErrorbetTitle('*Please enter a bet Title');
    } else {
      setErrorbetTitle(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (GameName === '') {
      setErrorGameName('*Please enter Game Name');
      flag = false;
    }
    if (betTitle === '') {
      setErrorbetTitle('*Please enter a bet Title');
      flag = false;
    }

    return flag;
  };

  const [selectedTeam, setSelectedTeam] = useState(null);
  // const [matchInfo, setMatchInfo] = useState(route?.params?.item);
  const [date, setDate] = useState('date:2016-05-15');
  const [time, setTime] = useState('time:12:00');

  const myDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log('Alert', today);
    return today;
  };
  const myTime = () => {
    var today = new Date();
    var hh = String(today.getHours()).padStart(2, '0');
    var mm = String(today.getMinutes() + 1).padStart(2, '0'); //January is 0!
    // var ss = String(today.getSeconds() + 1).padStart(2, '0'); ;

    today = hh + '-' + mm + '-' + ss;
    console.log('Alert', today);
    return today;
  };

  const onSubmit = () => {
    if (validate()) {
      updatekycdetails();
    }
  };

  useEffect(() => {
    //walletcoinlist();
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
      <AppView style={styles.mainContainer}>
        <AppView
          style={{
            height: height / 17,
            //   backgroundColor: 'yellow',
            width: width / 1,
          }}>
          <Header
            head={false}
            headerText2={'Create your Challenge'}
            backImage={BackArrow}
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>

        <ScrollView>
          <AppView style={{marginBottom: 100}}>
            <AppView style={styles.FirstContainer}>
              <AppView style={styles.FirstOneView}>
                <AppView
                  style={{
                    height: height / 15,
                    width: width / 1.1,
                    justifyContent: 'center',
                  }}>
                  <AppText
                    style={{
                      fontSize: height / 54,
                      color: 'grey',
                      fontWeight: '700',
                      marginHorizontal: 10,
                    }}>
                    Bet Title
                  </AppText>
                </AppView>
                <AppView style={{height: height / 11, width: width / 1.1}}>
                  <AppView style={styles.TextInput2View}>
                    <TextInput
                      style={styles.Textinput}
                      placeholder="Virat How many run in 10 over ?"
                      placeholderTextColor="grey"
                      onChangeText={txt => {
                        setbetTitle(txt), _validatebetTitle(txt);
                      }}></TextInput>
                  </AppView>
                  {errorbetTitle != null ? (
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
                        {errorbetTitle}
                      </AppText>
                    </AppView>
                  ) : null}
                </AppView>
              </AppView>
              <View
                style={{
                  height: height / 3.7,
                  width: width / 1.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: height / 3.9,
                    width: width / 1.1,
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.ChooseCountryView}>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: '#rgb(58, 58, 58)',
                        paddingHorizontal: 15,
                      }}>
                      Choose the currency in which you want to bet
                    </Text>
                  </View>
                  <View style={styles.selectCountryMainView}>
                    <View style={styles.SelectCountryView}>
                      <Dropdown
                        inputContainerStyle={{
                          // backgroundColor: 'red',
                          backgroundColor: 'white',
                          height: height / 20,
                          width: width * 0.77,
                          paddingTop: 10,
                          borderBottomColor: 'transparent',
                          // borderColor:"grey",
                          borderBottomWidth: 1,
                          // color:'white',
                          paddingHorizontal: 15,
                        }}
                        containerStyle={{
                          width: width * 0.78,
                          height: height / 20,
                          // justifyContent: "flex-end",
                          // backgroundColor:"red",
                          // color:"black"
                          marginLeft: 5,
                        }}
                        itemTextStyle={{color: 'white'}}
                        selectedItemColor={'black'}
                        placeholder="Select Currency"
                        placeholderTextColor="grey"
                        textColor="black"
                        data={currenciesList}
                        onChangeText={txt => {
                          setIDtype(txt);
                          setSelectedCurrency(txt);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.placeyourbetScreen}>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: '#rgb(58, 58, 58)',
                        paddingHorizontal: 15,
                      }}>
                      Enter Amount for Bet
                    </Text>
                  </View>
                  <View style={styles.SelectCoinMainView}>
                    <View style={styles.SelectCoinView}>
                      <TextInput
                        keyboardType="phone-pad"
                        style={{
                          fontSize: height / 55,
                          color: 'black',
                          paddingHorizontal: 10,
                        }}
                        placeholderTextColor="grey"
                        placeholder=""
                        onChangeText={txt => {
                          setBetAmount(txt);
                          convertToUSD(txt);
                        }}
                      />
                    </View>
                  </View>
                  <View style={{height: height / 45, width: width / 1.1}}>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: '#rgb(58, 58, 58)',
                        paddingHorizontal: 26,
                      }}>
                      Amount Value in USD
                    </Text>
                  </View>
                  <View style={styles.SelectCoinMainView1}>
                    <View style={styles.SelectCoinView1}>
                      <Text
                        style={{
                          fontSize: height / 60,
                          color: 'black',
                          padding: 10,
                        }}>
                        {usdAmount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <AppView style={styles.SecondOneView}>
                <View
                  style={{
                    height: height / 17,
                    width: width / 1.11,
                    justifyContent: 'center',
                    //backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontSize: height / 55,
                      fontWeight: '700',
                      color: 'grey',
                      marginHorizontal: 10,
                    }}>
                    Select the Bet End Time & Date
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 16,
                    width: width / 1.11,
                    flexDirection: 'row',
                  }}>
                  <DatePicker
                    style={{width: 150}}
                    date={date ? date.toString() : null}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD "
                    // minDate="1900-01-01"
                    // maxDate={myDate()}
                    minDate={myDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    style={{marginHorizontal: 18}}
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 5,
                        marginLeft: 4,
                      },
                      dateInput: {
                        marginLeft: width / 10,
                        height: height / 32,
                        width: width / 20,
                      },
                    }}
                    onDateChange={date => {
                      console.log('Alertdate is shown', date);
                      setDate(date.toString());
                    }}
                    onChangeText={txt => {
                      setDateEnd(txt);
                    }}
                  />

                  <DatePicker
                    style={{width: 150}}
                    date={time} // Initial date from state
                    mode="time" // The enum of date, datetime and time
                    placeholder="select date"
                    // format="YYYY-MM--DD"
                    format="hh:mm"
                    // maxDate={myDate()}
                    minTime="12:00"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require('../../assets/images/schedule.png')}
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 4,
                      },
                      dateInput: {
                        marginLeft: width / 10,
                        height: height / 32,
                        width: width / 20,
                      },
                    }}
                    onDateChange={time => {
                      setTime(time);
                    }}
                    onChangeText={txt => {
                      setTimeEnd(txt);
                    }}
                  />
                </View>
              </AppView>

              <AppView style={styles.FirstOneView}>
                <AppView
                  style={{
                    height: height / 15,
                    width: width / 1.1,
                    justifyContent: 'center',
                  }}>
                  <AppText
                    style={{
                      fontSize: height / 54,
                      color: 'grey',
                      fontWeight: '700',
                      marginHorizontal: 10,
                    }}>
                    Message for your Opponent
                  </AppText>
                </AppView>
                <AppView style={{height: height / 11, width: width / 1.1}}>
                  <AppView style={styles.TextInput2View}>
                    <TextInput
                      style={styles.Textinput}
                      placeholder="E.g. Push - ups"
                      placeholderTextColor="grey"
                      onChangeText={txt => {
                        setMessageOpponent(txt), _validateGameName(txt);
                      }}></TextInput>
                  </AppView>
                  {errorMessageOpponent != null ? (
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
                        {errorMessageOpponent}
                      </AppText>
                    </AppView>
                  ) : null}
                </AppView>
              </AppView>

              <AppView style={styles.sectionThreeContainer}>
                <AppView style={styles.challengeContainer}>
                  <AppText style={styles.txtChalllange}>
                    Who do you want to challenge ?
                  </AppText>
                </AppView>
                {route?.params?.opponent &&
                  renderOpponent(route?.params?.opponent)}
                <AppTouchable
                  //  onPress={() => selecteditem ? props.navigation.navigate('PickOpponentScreen') : alert("Please fill all entries")}

                  onPress={() =>
                    props.navigation.navigate('PickOpponentScreen')
                  }
                  style={styles.containerPickBtn}>
                  <AppView style={styles.btnViewPick}>
                    <AppText
                      style={{
                        color: 'rgb(255,255,255)',
                        fontSize: 22,
                        marginHorizontal: 10,
                      }}>
                      {route?.params?.opponent
                        ? 'Change Opponent'
                        : 'Pick Opponent'}
                    </AppText>
                  </AppView>
                </AppTouchable>

                {/* <AppTouchable onPress={() => {}} style={styles.containerPickBtn}>
                <AppView style={styles.cancelBtnView}>
                  <AppText style={{color: 'rgb(48,44,44)', fontSize: 22}}>
                    Cancel
                  </AppText>
                </AppView>
              </AppTouchable> */}

                {route?.params?.opponent ? (
                  <AppTouchable
                    onPress={() => onSubmit()}
                    /* onPress={() => onPlaceBetRequest()} */
                    style={styles.containerPickBtn}>
                    <AppView style={styles.btnViewPick}>
                      <AppText
                        style={{
                          color: 'rgb(255,255,255)',
                          fontSize: 22,
                          marginHorizontal: 10,
                        }}>
                        Place Bet
                      </AppText>
                      {isLoading && <Loader size="small" color="white" />}
                    </AppView>
                  </AppTouchable>
                ) : null}
              </AppView>

              {/* <TouchableOpacity>
                <AppView style={styles.payButtonView}>
                  <AppText style={{fontSize: height / 45, color: 'white'}}>
                    Select Opponent
                  </AppText>
                </AppView>
              </TouchableOpacity> */}
            </AppView>
          </AppView>
        </ScrollView>
      </AppView>
    </SafeAreaView>
  );
};

export default pay;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245, 245, 245)',
    // flex:1
  },
  FirstContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245, 245, 245)',
    // backgroundColor:"red",
    alignItems: 'center',
  },
  FirstOneView: {
    height: height / 7,
    width: width / 1.1,
    borderRadius: 10,
    borderColor: 'grey',
    // backgroundColor: 'red',
    borderWidth: 0.5,
    marginVertical: 10,
    alignItems: 'center',
  },
  SecondOneView: {
    height: height / 7.3,
    width: width / 1.1,
    borderRadius: 10,
    borderColor: 'grey',
    // backgroundColor: 'red',
    borderWidth: 0.5,
    // marginVertical: 10,
    alignItems: 'center',
  },
  ThirdOneView: {
    height: height / 5.5,
    width: width / 1.1,
    borderRadius: 10,
    borderColor: 'grey',
    // backgroundColor: 'red',
    borderWidth: 0.5,
    marginVertical: 10,
    alignItems: 'center',
  },
  FouthOneView: {
    height: height / 6.8,
    width: width / 1.1,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 0.5,
    // marginVertical: 10,
    alignItems: 'center',
  },
  taskView: {
    height: height / 27,
    width: width / 1.23,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  TitleText: {
    fontSize: height / 60,
    color: 'black',
  },
  TextInputView1: {
    height: height / 22,
    width: width / 1.23,
    // backgroundColor:"green",
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderColor: 'grey',
  },
  Task2View: {
    height: height / 27,
    width: width / 1.23,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  TextInput2View: {
    height: height / 20,
    width: width / 1.23,
    // backgroundColor:"green",
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderColor: 'grey',
    marginHorizontal: 10,
  },
  NextView: {
    height: height / 29,
    width: width / 1.23,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  Textinput: {
    fontSize: height / 60,
    color: 'black',
  },
  NextText: {
    fontSize: height / 65,
    color: '#rgb(94 ,28 ,159)',
  },
  SecondFirstmainView: {
    height: height / 27,
    width: width / 1.23,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  SeconTwomainView: {
    height: height / 22,
    width: width / 1.23,
    // backgroundColor:"green",
    flexDirection: 'row',
  },
  SecondThreemainView: {
    height: height / 27,
    width: width / 1.23,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  SecondFourmainView: {
    height: height / 22,
    width: width / 1.23,
    // backgroundColor:"green",
    flexDirection: 'row',
  },
  SecondFifthmainView: {
    height: height / 29,
    width: width / 1.23,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  FromView: {
    height: height / 27,
    width: width / 2.46,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  ToView: {
    height: height / 27,
    width: width / 2.46,
    // backgroundColor:"blue",
    justifyContent: 'center',
  },
  textmain: {
    fontSize: height / 60,
    color: '#rgb(115, 112, 112)',
  },
  SelectCountryView: {
    height: height / 23,
    width: width / 1.24,
    backgroundColor: 'red',
    borderColor: 'grey',
    // borderWidth: 1,
    // borderRadius: 10,
  },
  SelectCoinView: {
    height: height / 23,
    width: width / 1.24,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  ChooseCurrency: {
    height: height / 27,
    width: width / 1.23,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  SelectCurrencymainView: {
    height: height / 22,
    width: width / 1.23,
    //   backgroundColor: 'green',
    justifyContent: 'center',
  },
  PlaceBetView: {
    height: height / 27,
    width: width / 1.23,
    //   backgroundColor: 'red',
    justifyContent: 'center',
  },
  SelectCoinMainView: {
    height: height / 22,
    width: width / 1.23,
    //   backgroundColor: 'green',
    justifyContent: 'center',
  },
  NextView1: {
    height: height / 29,
    width: width / 1.23,
    //   backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  DowanaChallengeView: {
    height: height / 19,
    //   backgroundColor: 'red',
    width: width / 1.23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OpponenetmainView: {
    height: height / 12,
    // backgroundColor: 'green',
    width: width / 1.23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonView: {
    height: height / 15,
    width: width / 1.7,
    backgroundColor: '#rgb(94, 28, 159)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonView: {
    height: height / 17,
    width: width / 1.6,
    backgroundColor: 'rgb(94,28,159)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 30,
  },
  OpponentNameView: {
    height: height / 14,
    width: width / 1.3,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.7,
    flexDirection: 'row',
  },
  profileView: {
    height: height / 15,
    width: width / 6.2,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameOpponentView: {
    height: height / 15,
    width: width / 2.3,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  crossView: {
    height: height / 14,
    width: width / 7,
    // backgroundColor:"red",
    alignItems: 'flex-end',
  },
  btnContainer: {
    height: height * 0.11,
    width: width * 0.9,
    // backgroundColor: 'rgb(255,255,255)',
    // backgroundColor:"red",
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOne: {},
  btnIrelndView: {
    height: height * 0.06,
    width: width * 0.37,
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'black',
    borderRadius: 8,
  },
  sectionThreeContainer: {
    // height: height * 0.33,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 8,
  },
  challengeContainer: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChalllange: {
    fontSize: 18,
    color: 'rgb(58,58,58)',
  },
  containerPickBtn: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnViewPick: {
    height: height * 0.065,
    width: width * 0.75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnView: {
    height: height * 0.065,
    width: width * 0.5,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(112,112,112)',
    borderWidth: 0.6,
  },
  viewMainCintainer: {
    // height: height * 0.15,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  imgContView: {
    height: height * 0.09,
    width: width * 0.9,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgb(112,112,112)',
  },
  ranOppoTxtView: {
    marginHorizontal: 20,
    color: 'rgb(48,44,44)',
    fontSize: 20,
    fontWeight: '600',
  },
  selectCountryMainView: {
    height: height / 16,
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
    width: width / 1.24,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  ChooseCountryView: {
    height: height / 21,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  placeyourbetScreen: {
    height: height / 30,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },

  SelectCoinMainView1: {
    height: height / 19,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, {useState} from 'react';

import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import {AppView, AppText, AppTouchable} from '../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import DatePicker from 'react-native-datepicker';
import {SafeAreaView} from 'react-native';
import Header from '../../components/molecules/Header';
import {
  BackArrow,
  clock1,
  Calendar,
  profileicon,
  close,
} from '../../assets/icon';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CreateBet2 = (props, {route, navigation}) => {
  const [TitleofBet, setTitleofBet] = useState(
    props.route.params.TitleofBet ? props.route.params.TitleofBet : null,
  );
  const [NameofGame, setNameofGame] = useState(
    props.route.params.NameofGame ? props.route.params.NameofGame : null,
  );
  const [currencyisselected, setcurrencyisselected] = useState(
    props.route.params.currencyisselected
      ? props.route.params.currencyisselected
      : null,
  );
  const [amountofBet, setamountofBet] = useState(
    props.route.params.amountofBet ? props.route.params.amountofBet : null,
  );

  console.log('Title of the Bet----------->', TitleofBet);
  console.log('Name of Game----------->', NameofGame);
  console.log('Currencyis Selected----------->', currencyisselected);
  console.log('amount of bet----------->', amountofBet);

  const [DateEnd, setDateEnd] = useState(null);

  const [TimeEnd, setTimeEnd] = useState('');

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

  const [MessageOpponent, setMessageOpponent] = useState('');
  const [checkMessageOpponent, setCheckMessageOpponent] = useState(true);
  const [errorMessageOpponent, setErrorMessageOpponent] = useState(null);

  const [UserData, setUserData] = useState('');
  const [checkUserData, setCheckUserData] = useState(true);
  const [errorUserData, setErrorUserData] = useState(null);

  const _validateMessageOpponent = fname => {
    var fnameRegex = /^[a-zA-Z 0-9@_]{3,256}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorMessageOpponent('*Please enter Message for Opponent');
    } else if (!fnameRegex.test(fname)) {
      setErrorMessageOpponent('*Please enter a Message for Opponent');
    } else {
      setErrorMessageOpponent(null);
    }
  };

  const _validateUserData = fname => {
    var fnameRegex = /^[a-zA-Z 0-9@_]{3,256}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorUserData('*Please enter a User Data');
    } else if (!fnameRegex.test(fname)) {
      setErrorUserData('*Please enter a User Data');
    } else {
      setErrorUserData(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (MessageOpponent === '') {
      setErrorMessageOpponent('*Please enter Message for opponent');
      flag = false;
    }
    if (UserData === '') {
      setErrorUserData('*Please enter a User Data');
      flag = false;
    }

    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
    }
  };

  const updatekycdetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'post',
      url: `https://java-create-token.mobiloitte.org/account/create-own-bet`,
      data: {
        betAmount: amountofBet,
        betCurrencyName: currencyisselected,
        betTitle: TitleofBet,
        messageForOpponent: MessageOpponent,
        tellUserAboutYou: UserData,
        betGameName: NameofGame,

        toDate: DateEnd,
        updateTime: TimeEnd,
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('KycData ------------- >>>>>', res.data);
          props.navigation.navigate('HomeScreen', {
            betAmount: amountofBet,
            betCurrencyName: currencyisselected,
            betTitle: TitleofBet,
            messageForOpponent: MessageOpponent,
            tellUserAboutYou: UserData,
            betGameName: NameofGame,

            toDate: DateEnd,
            updateTime: TimeEnd,
          });
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // console.log("hello",matchInfo);
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
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

        <View style={styles.FirstMainCotainer}>
          <AppView style={styles.SecondOneView}>
            <View
              style={{
                height: height / 17,
                width: width / 1.11,
                justifyContent: 'center',
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
                    setMessageOpponent(txt), _validateMessageOpponent(txt);
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
                Tell User about Who you are
              </AppText>
            </AppView>
            <AppView style={{height: height / 11, width: width / 1.1}}>
              <AppView style={styles.TextInput2View}>
                <TextInput
                  style={styles.Textinput}
                  placeholder="I am the King Of this Game"
                  placeholderTextColor="grey"
                  onChangeText={txt => {
                    setUserData(txt), _validateUserData(txt);
                  }}></TextInput>
              </AppView>
              {errorUserData != null ? (
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
                    {errorUserData}
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
            {route?.params?.opponent && renderOpponent(route?.params?.opponent)}
            <AppTouchable
              //  onPress={() => selecteditem ? props.navigation.navigate('PickOpponentScreen') : alert("Please fill all entries")}

              onPress={() => props.navigation.navigate('PickOpponentScreen')}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateBet2;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
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
  TextInput2View: {
    height: height / 20,
    width: width / 1.23,
    // backgroundColor:"green",
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderColor: 'grey',
    marginHorizontal: 10,
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
    // backgroundColor: 'rgb(94,28,159)',
    backgroundColor: 'green',
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
  FirstMainCotainer: {
    height: height / 1.8,
    width: width / 1,
    marginTop: 10,
    alignItems: 'center',
  },
});

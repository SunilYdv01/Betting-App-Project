import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
//import Header from '../../components/molecules/Header';
import {Star, StarTwo} from '../../assets/icon';
const {height, width} = Dimensions.get('window');
// import GameCard from '../../components/GameCard/index';
import GameCard from '../../components/GameCard/index';

import axios from 'axios';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-material-dropdown';

import Header from '../../components/molecules/Header';
import {
  BackArrow,
  WalletIcon,
  hand,
  cross2,
  UserIcon,
  KycPrompt,
} from '../../assets/icon';

const PlaceYourBetTwo = (props, navigation, route) => {
  console.log('***********Routing***********', props);
  const [selecteditem, setSelecteditem] = useState(null);
  const [IDType, setIDtype] = useState(null);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [actualCurrencyList, setActualCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [matchInfo, setMatchInfo] = useState(route?.params?.item);
  const [betAmount, setBetAmount] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [usdAmount, setUSDAmount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleValue, setModalVisibleValue] = useState(false);

  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  let data = [
    {
      value: 'UST',
    },
    {
      value: 'USTD',
    },
    {
      value: 'Bitcoin',
    },
    {
      value: 'Dollar',
    },
  ];

  let data2 = [
    {
      value: 'Bitcoin',
    },
    {
      value: 'Dollar',
    },
    {
      value: 'UST',
    },
    {
      value: 'USTD',
    },
  ];

  const [id6, setId6] = useState([]);

  const fetchResponse = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('===Click===', value);

    const Data = {
      awayTeam: 'Shanxi Xinda',
      awayTeamPickUserId: '10510405',
      betAmount: 1,
      betCurrencyName: 'BTC',
      challengerUserId: '79',
      createTime: '2021-07-21T08:01:35.525Z',
      endDate: '1626856255',
      eventId: '10067810',
      fkUserId: '79',
      gameId: '105479341',
      gameName: 'China NBL',
      homeTeam: 'Hebei Xianglan',
      homeTeamPickUserId: '74',
      isPublic: false,
      opponentUserId: '74',
      sportId: '18',
      starteDate: '1626856200',
      tournamentName: 'China NBL',
      // yyyymmdd: 'string',
    };
    console.log('~~~~~~~~data~~~~~~~~~>', Data);
    axios({
      method: 'post',
      // url: 'https://java-create-token.mobiloitte.com/account/send-betting-api',
      url: 'https://java-create-token.mobiloitte.org/account/send-betting-api',

      data: Data,
      headers: {
        // Authorization: `Bearer${value}`,
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZS1hc2hpc2gwMDAwQG1haWxpbmF0b3IuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sInJvbGUiOiJVU0VSIiwiYXV0aGVudGljYXRlZCI6dHJ1ZSwidXNlcklkIjo3OSwidXNlcm5hbWUiOiJyZS1hc2hpc2gwMDAwQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNjI2ODYyMjczLCJleHAiOjE2MjY5NDg2NzN9.mYNz2R6JcKOIjZeJYhqj5OzkXO1IZ_rPhMMbQs3pLxmNXJtTu3JsfCio3FzW8BQNBVoQQnzagXQLcmOBMPKqYA',

        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log('resbetScreen-->>', res);
        if (res.status === 200) {
          props.navigation.navigate('Homescreen');
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('====err====', err));
  };

  console.log('------HockeyData6BetTwo------>>>>>>', navigation, route);
  const chackvalidation = () => {};
  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <Header
          head={false}
          headerText2={'Place Your Bet.'}
          backImage={BackArrow}
          onPress2={() => props.navigation.goBack()}
        />

        <AppView style={{height: height * 0.27, marginTop: 10}}>
          <GameCard
            item={matchInfo}
            matchTitle={'National Hockey League 2018'}
            onPlayPress={null}
          />
        </AppView>
        <ScrollView>
          <AppView style={styles.winPredictionView}>
            <AppView style={styles.predictTxtView}>
              <AppText style={styles.predictTxt}>
                Predict who will Win ?
              </AppText>
            </AppView>

            <AppView style={styles.btnContainer}>
              <AppTouchable
                style={styles.buttonOne}
                onPress={() => setSelectedTeam('home')}>
                <AppView
                  style={[
                    styles.btnIrelndView,
                    {
                      backgroundColor:
                        selectedTeam === 'home' ? 'rgb(94,28,159)' : 'white',
                    },
                  ]}>
                  <AppText
                    style={{
                      fontSize: height / 66,
                      color:
                        selectedTeam === 'home' ? 'white' : 'rgb(15,15,15)',
                    }}>
                    Netherland
                    {/* {matchInfo && matchInfo.home && matchInfo.home.name} */}
                  </AppText>
                </AppView>
              </AppTouchable>

              {/* <AppText style={{fontSize: height / 60}}>Vs</AppText> */}
              <AppTouchable
                style={styles.buttonOne}
                onPress={() => setSelectedTeam('away')}>
                <AppView
                  style={[
                    styles.btnIrelndView,
                    {
                      backgroundColor:
                        selectedTeam === 'away' ? 'rgb(94,28,159)' : 'white',
                    },
                  ]}>
                  <AppText
                    style={{
                      fontSize: height / 68,
                      color:
                        selectedTeam === 'away' ? 'white' : 'rgb(15,15,15)',
                    }}>
                    Ireland
                    {/* {matchInfo && matchInfo.away && matchInfo.away.name} */}
                  </AppText>
                </AppView>
              </AppTouchable>
            </AppView>

            {/* <AppView style={styles.btnContainer}>
              <AppTouchable style={styles.buttonOne}>
                <AppView style={styles.btnIrelndView}>
                  <AppText style={{fontSize: 16, color: 'rgb(15,15,15)'}}>
                    Ireland
                  </AppText>
                </AppView>
              </AppTouchable>

              <AppTouchable style={styles.buttonOne}>
                <AppView style={styles.btnIrelndView}>
                  <AppText style={{fontSize: 16, color: 'rgb(15,15,15)'}}>
                    Netherland
                  </AppText>
                </AppView>
              </AppTouchable>
            </AppView> */}

            <AppView style={styles.chooseCurrencyView}>
              <AppText style={{fontSize: 16, color: 'rgb(58,58,58)'}}>
                Choose the currency in which you want to bet
              </AppText>
            </AppView>
            <AppView style={styles.dropdownContainer}>
              <Dropdown
                inputContainerStyle={{
                  height: height * 0.06,
                  width: width * 0.86,
                  padding: width * 0.03,
                  paddingTop: 5,
                  marginTop: 20,
                  borderRadius: 5,
                  borderBottomColor: 'transparent',
                }}
                style={{fontSize: height / 50}}
                itemColor="rgba(0,0,0,0.45)"
                containerStyle={{
                  width: width * 0.86,
                  height: height * 0.06,
                  borderWidth: 1,
                  justifyContent: 'center',
                  backgroundColor: 'rgb(255,255,255)',
                  borderRadius: 8,
                }}
                placeholder="Select your currency"
                placeholderTextColor="rgba(0,0,0,0.45)"
                data={data}
                onChangeText={txt => {
                  setIDtype(txt), chackvalidation();
                }}
              />
            </AppView>

            <AppView style={[styles.chooseCurrencyView, {marginTop: 15}]}>
              <AppText style={{fontSize: 16, color: 'rgb(58,58,58)'}}>
                Place your bet
              </AppText>
            </AppView>

            <AppView style={styles.dropdownContainer}>
              <Dropdown
                inputContainerStyle={{
                  height: height * 0.06,
                  width: width * 0.86,
                  padding: width * 0.03,
                  paddingTop: 5,
                  marginTop: 20,
                  borderRadius: 5,
                  borderBottomColor: 'transparent',
                }}
                style={{fontSize: height / 50}}
                itemColor="rgba(0,0,0,0.45)"
                containerStyle={{
                  width: width * 0.86,
                  height: height * 0.06,
                  borderWidth: 1,
                  justifyContent: 'center',
                  backgroundColor: 'rgb(255,255,255)',
                  borderRadius: 8,
                }}
                placeholder="0.00"
                placeholderTextColor="rgba(0,0,0,0.45)"
                data={data2}
                onChangeText={txt => {
                  setIDtype(txt), chackvalidation();
                }}
              />
            </AppView>

            <AppView style={styles.sectionThreeContainer}>
              <AppView style={styles.challengeContainer}>
                <AppText style={styles.txtChalllange}>
                  Who do you want to challenge ?
                </AppText>
              </AppView>

              <AppView
                style={{
                  height: height * 0.1,
                  width: width * 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppView
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#E8E8E8',
                    height: height * 0.08,
                    width: width * 0.9,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'red',
                  }}>
                  <AppView>
                    <AppImage source={UserIcon} />
                  </AppView>

                  <AppView
                    style={{
                      height: height / 10,
                      width: width * 0.62,
                      justifyContent: 'center',
                      //backgroundColor: 'green',
                    }}>
                    <AppText style={{marginHorizontal: 20}}>
                      Random Opponent
                    </AppText>
                  </AppView>

                  <AppView style={{marginLeft: 12}}>
                    <AppTouchable
                      onPress={() =>
                        iAgree ? toggleIAgree() : _toggleIAgree()
                      }>
                      <AppImage
                        source={iAgree ? Star : StarTwo}
                        style={{height: 20, width: 20}}
                      />
                    </AppTouchable>
                  </AppView>
                </AppView>
              </AppView>

              <AppTouchable
                // onPress={() => alert('Clicked...)}
                onPress={() => fetchResponse()}
                style={styles.containerPickBtn}>
                <TouchableOpacity
                  onPress={() => {
                    //navigation.navigate("Login")
                    props.navigation.navigate({
                      name: 'AddAmount',

                      merge: true,
                    });
                  }}
                  // onPress={() => alert('pay now')}
                >
                  <AppView style={styles.btnViewPick}>
                    <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
                      Play Now
                    </AppText>
                  </AppView>
                </TouchableOpacity>
              </AppTouchable>

              <AppTouchable onPress={() => {}} style={styles.containerPickBtn}>
                <AppView style={styles.cancelBtnView}>
                  <AppText
                    onPress={() => {
                      setModalVisible(true);
                      // setTimeout(() => {
                      //   setModalVisible(false);
                      // }, 5000);
                    }}
                    style={{color: 'rgb(48,44,44)', fontSize: 22}}>
                    Cancel
                  </AppText>
                </AppView>
              </AppTouchable>
            </AppView>
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
                    Are you sure you want to cancel{'\n'} this Bet?
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
                      onPress={() => {
                        //navigation.navigate("Login")
                        props.navigation.navigate({
                          name: 'PlaceYourBet',

                          //name: 'PlaceYourBet',
                          //params: {opponent: contactItem},
                          merge: true,
                        });

                        // navigation.goBack();
                        //navigation.state.params.onSelectUser(selectedUser);
                      }}
                      // onPress={()=>alert("hello")}
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
        </ScrollView>
      </AppView>
    </SafeAreaView>
  );
};

export default PlaceYourBetTwo;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#E8E8E8',
    //backgroundColor: 'red',
  },
  flatListContainer: {
    height: height * 0.23,
    width: width * 1,
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  cardData: {
    height: height * 0.22,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    alignSelf: 'center',
    padding: 12,
    //backgroundColor: 'red',
  },
  calendarView2: {
    borderRightWidth: 1,
    height: height * 0.13,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  iccView2: {
    height: height * 0.13,
    width: width * 0.72,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  iccTxt: {
    fontSize: 14,
    color: 'rgb(15,15,15)',
    fontWeight: '700',
    marginLeft: 15,
  },
  irelandTeamView: {
    flexDirection: 'row',
    height: height * 0.05,
    width: width * 0.25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  versusView: {
    height: height * 0.05,
    width: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseContainer: {
    flexDirection: 'row',
  },
  chooseView: {
    height: height * 0.05,
    width: width * 0.5,
    justifyContent: 'center',
  },
  chooseTxtView: {
    color: 'rgb(94,28,159)',
    fontSize: 12,
    marginLeft: 10,
  },
  btcView: {
    height: height * 0.05,
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(223,209,236,255)',
  },
  watchView: {
    height: height * 0.05,
    width: width * 0.45,
    marginTop: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playBtnContainer: {
    height: height * 0.05,
    width: width * 0.4,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  playBtnTouch: {
    height: height * 0.03,
    width: width * 0.18,
    alignItems: 'center',
    borderRadius: 20,
    // justifyContent: 'center',
    //jujustifyContent: 'center',
    backgroundColor: 'rgb(89,189,91)',
  },

  predictTxt: {
    fontSize: 24,
    color: 'rgb(58,58,58)',
    marginHorizontal: 20,
  },
  btnContainer: {
    height: height * 0.11,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
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
    borderWidth: 0.8,
    borderColor: 'rgb(212,212,212)',
    borderRadius: 8,
  },
  chooseCurrencyView: {
    height: height * 0.03,
    width: width * 1,
    justifyContent: 'center',
    marginHorizontal: 28,

    //backgroundColor: 'red',
  },
  dropdownContainer: {
    height: height * 0.05,
    width: width * 0.86,
    justifyContent: 'center',
    marginHorizontal: 28,
    borderWidth: 0.5,
    borderColor: 'rgb(112,112,112)',
    borderRadius: 8,
    // alignItems: 'center',
  },
  sectionThreeContainer: {
    height: height * 0.4,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 8,
  },
  challengeContainer: {
    height: height * 0.05,
    width: width * 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChalllange: {
    fontSize: 18,
    color: 'rgb(58,58,58)',
    fontWeight: '600',
  },

  btnViewPick: {
    height: height * 0.065,
    width: width * 0.75,
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
    height: height * 0.15,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  winPredictionView: {
    // height: height * 0.42,
    width: width * 1,
    height: height / 1.2,
    backgroundColor: 'rgb(255,255,255)',
    //backgroundColor: 'cyan',
  },
  predictTxtView: {
    height: height * 0.07,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  predictTxt: {
    fontSize: 24,
    color: 'rgb(58,58,58)',
    marginHorizontal: 20,
  },
  btnContainer: {
    height: height * 0.11,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
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
    borderWidth: 0.8,
    borderColor: 'rgb(212,212,212)',
    borderRadius: 8,
  },
  chooseCurrencyView: {
    height: height / 25,
    width: width * 1,
    justifyContent: 'center',
    marginHorizontal: 28,
    //backgroundColor: 'red',
  },
  dropdownContainer: {
    height: height * 0.05,
    width: width * 0.86,
    justifyContent: 'center',
    marginHorizontal: 28,
    borderWidth: 0.5,
    borderColor: 'rgb(112,112,112)',
    borderRadius: 8,
  },
  sectionThreeContainer: {
    height: height * 0.33,
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
    height: height / 10,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  btnViewPick: {
    height: height * 0.065,
    width: width * 0.75,
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

  modalView: {
    marginTop: height / 2.7,
    height: height / 3.5,
    width: width / 1.1,
    backgroundColor: 'rgb(94,28,159)',
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
    backgroundColor: 'rgb(94,28,159)',
    width: width / 3.5,
    borderColor: 'rgba(202, 202, 202, 1)',
    borderWidth: 1,
    height: height / 20,
    alignSelf: 'center',
    marginTop: height / 30,
    borderRadius: 50,
    marginLeft: height / 20,
  },
  noView: {
    backgroundColor: 'rgb(94,28,159)',
    width: width / 3.5,
    borderColor: 'rgba(202, 202, 202, 1)',
    borderWidth: 1,
    height: height / 20,
    alignSelf: 'center',
    marginTop: height / 30,
    borderRadius: 50,
    justifyContent: 'center',
    marginLeft: height / 90,
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

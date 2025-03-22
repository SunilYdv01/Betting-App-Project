import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  AppText,
  AppView,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {
  BackArrowTwo,
  WalletIcon,
  hand,
  cross2,
  UserIcon,
  KycPrompt,
} from '../../assets/icon';
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import GameCard from '../../components/GameCard';
import {Dropdown} from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PlaceYourBet = ({props, navigation, route}) => {
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

  const OnchangeHandle = id => {
    setSelecteditem(id);
  };

  useEffect(() => {
    fetchCurrencies();
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);

    await axios({
      method: 'GET',
      // url: 'https://java-create-token.mobiloitte.com/account/my-account',
      url: 'https://java-create-token.mobiloitte.org/account/my-account',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(async res => {
        console.log('user detail --------->>', res);
        if (res.status === 200) {
          setUserDetail(res.data.data);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('err in user detail ----------', err));
  };
  const fetchCurrencies = async () => {
    await axios({
      method: 'GET',
      // url: 'https://java-create-token.mobiloitte.com/wallet/coin/get-coin-list',
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
  const onPlaceBetRequest = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);
    setLoading(true);
    axios({
      method: 'post',
      // url: 'https://java-create-token.mobiloitte.com/account/send-betting-api',
      url: 'https://java-create-token.mobiloitte.org/account/send-betting-api',
      data: {
        awayTeam: matchInfo.away.name,
        awayTeamPickUserId:
          selectedTeam === 'away'
            ? userDetail.userId
            : route?.params?.opponent?.userId,
        betAmount,
        betCurrencyName: selectedCurrency,
        // betId: 0,
        challengerUserId: userDetail.userId,
        createTime: new Date(),
        // endDate: '1626856255',
        eventId: matchInfo.our_event_id,
        // fkUserId: '79',
        gameId: matchInfo.sport_id,
        gameName: matchInfo.league.name,
        homeTeam: matchInfo.home.name,
        homeTeamPickUserId:
          selectedTeam === 'away'
            ? userDetail.userId
            : route?.params?.opponent?.userId,
        isPublic: false,
        opponentUserId: route?.params?.opponent?.userId,
        // seasonsIdSMls: "string",
        sportId: matchInfo.sport_id,
        starteDate: matchInfo.time,
        // status: "ACCEPT_BY_OPPONENT",
        // subCategoryOfGolf: "string",
        tournamentName: matchInfo.league.name,
        // updateTime: "2021-07-21T08:01:35.525Z",
        // winnerUserId: 0,
        yyyymmdd: 'string',
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(async res => {
        console.log('resbetScreen-->>', res);
        if (res.status === 200) {
          console.log('resbetScreen1-->>', res);
          alert('Success.....');
          // props.navigation.navigate('PlaceYourBetTwo');
        } else {
          alert('Something went wrong.');
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const getUSDCurrency = async data => {
    let tempArr = [];
    await Promise.all(
      data.map(async element => {
        await axios({
          method: 'GET',
          // url: `https://min-api.cryptocompare.com/data/price?fsym=${element.coinShortName}&tsyms=USD`,
          url: `https://min-api.cryptocompare.org/data/price?fsym=${element.coinShortName}&tsyms=USD`,
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
  const renderOpponent = item => {
    return (
      <AppView style={styles.viewMainCintainer}>
        <AppView style={styles.imgContView}>
          <AppView
            style={{
              height: height * 0.06,
              width: width / 9,
              justifyContent: 'center',
            }}>
            <AppImage source={UserIcon} />
          </AppView>
          <AppView
            style={{
              height: height * 0.06,
              width: width * 0.6,
              justifyContent: 'center',
            }}>
            <AppText style={styles.ranOppoTxtView}>
              {item?.name || item?.item?.givenName}{' '}
            </AppText>
          </AppView>
          <AppView
            style={{
              height: height * 0.06,
              width: width * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppTouchable>
              {/* <AppImage source={Check} style={{height: 20, width: 20}} /> */}
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  const convertToUSD = amount => {
    actualCurrencyList.map(item => {
      selectedCurrency === item.coinFullName
        ? setUSDAmount((Number(amount) * item.usdAmount).toFixed(3))
        : null;
    });
  };

  console.log('print', route.params);
  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <Header
          head={false}
          backImage={BackArrowTwo}
          headerText2="Place Your Bet"
          finalImage={WalletIcon}
          // onPress2={() => navigation.navigate('wallet')}
          onPress2={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView>
          <ScrollView>
            <AppView style={{marginBottom: 100}}>
              <AppView style={{marginVertical: 10}}>
                <GameCard
                  item={matchInfo}
                  matchTitle={'National Hockey League 2018'}
                  onPlayPress={null}
                />
              </AppView>

              <AppView style={styles.winPredictionView}>
                <AppView style={styles.predictTxtView}>
                  <AppText style={styles.predictTxt}>Select the Winner</AppText>
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
                            selectedTeam === 'home'
                              ? 'rgb(94,28,159)'
                              : 'white',
                        },
                      ]}>
                      <AppText
                        style={{
                          fontSize: height / 66,
                          color:
                            selectedTeam === 'home' ? 'white' : 'rgb(15,15,15)',
                        }}>
                        {matchInfo && matchInfo.home && matchInfo.home.name}
                      </AppText>
                    </AppView>
                  </AppTouchable>

                  <AppText style={{fontSize: height / 60}}>Vs</AppText>
                  <AppTouchable
                    style={styles.buttonOne}
                    onPress={() => setSelectedTeam('away')}>
                    <AppView
                      style={[
                        styles.btnIrelndView,
                        {
                          backgroundColor:
                            selectedTeam === 'away'
                              ? 'rgb(94,28,159)'
                              : 'white',
                        },
                      ]}>
                      <AppText
                        style={{
                          fontSize: height / 68,
                          color:
                            selectedTeam === 'away' ? 'white' : 'rgb(15,15,15)',
                        }}>
                        {matchInfo && matchInfo.away && matchInfo.away.name}
                      </AppText>
                    </AppView>
                  </AppTouchable>
                </AppView>

                <AppView style={styles.chooseCurrencyView}>
                  <AppText
                    style={{
                      fontSize: 16,
                      color: 'rgb(58,58,58)',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
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
                    data={currenciesList}
                    onChangeText={txt => {
                      console.log('currency ----- ', txt);
                      setIDtype(txt), setSelectedCurrency(txt);
                    }}
                  />
                </AppView>

                <AppView style={[styles.chooseCurrencyView]}>
                  <AppText
                    style={{
                      fontSize: 16,
                      color: 'rgb(58,58,58)',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    Place your bet
                  </AppText>
                </AppView>
                <AppView
                  style={{
                    width: width * 0.86,
                    height: height * 0.06,
                    borderWidth: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgb(255,255,255)',
                    borderRadius: 8,
                    alignSelf: 'center',
                    borderWidth: 0.8,
                    borderColor: 'grey',
                    // padding: 10,
                  }}>
                  <TextInput
                    maxLength={5}
                    // value={betAmount}
                    placeholder="Enter amount"
                    placeholderTextColor="black"
                    onChangeText={text => {
                      setBetAmount(text);
                      convertToUSD(text);
                    }}
                    keyboardType="numeric"
                    style={{fontSize: height / 60, color: 'black', padding: 10}}
                  />
                </AppView>

                <AppView style={[styles.chooseCurrencyView]}>
                  <AppText
                    style={{
                      fontSize: 16,
                      color: 'rgb(58,58,58)',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    Amount in USD
                  </AppText>
                </AppView>
                <AppView
                  style={{
                    width: width * 0.86,
                    height: height * 0.06,
                    borderWidth: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgb(255,255,255)',
                    borderRadius: 8,
                    alignSelf: 'center',
                    borderWidth: 0.8,
                    borderColor: 'grey',
                    // padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: height / 60,
                      color: 'black',
                      padding: 10,
                    }}>
                    {usdAmount}
                  </Text>
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
                  // onPress={() => selecteditem ? props.navigation.navigate('PickOpponentScreen') : alert("Please fill all entries")}

                  onPress={() => navigation.navigate('PickOpponentScreen')}
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
                    onPress={() => setModalVisible(true)}
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
            </AppView>
          </ScrollView>
        </KeyboardAwareScrollView>

        {/* ******************* Modal ******************************* */}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centered1View}>
            <View style={styles.modalView}>
              <View style={styles.Modal1View}></View>
              <View style={styles.Modal2View}>
                <Text
                  style={{
                    fontSize: height / 46,
                    fontWeight: '700',
                    color: 'rgb(58, 58, 58)',
                  }}>
                  You Challanging
                </Text>
              </View>
              <View style={styles.Modal3View}></View>
              <View style={styles.Modal4View}>
                <Text
                  style={{
                    fontSize: height / 60,
                    color: 'rgb(58, 58, 58)',
                    textAlign: 'center',
                  }}>
                  By Accepting this challenge you will play{'\n'}
                  for {usdAmount} USD
                </Text>
              </View>
              <View>
                <Image
                  resizeMode="contain"
                  style={{height: height / 10, width: width / 5}}
                  source={hand}></Image>
              </View>
              <View style={styles.Modal5View}>
                <Pressable
                  onPress={() => {
                    onPlaceBetRequest();
                    setModalVisible(!modalVisible);
                  }}
                  // onPress={() => {setModalVisible(!modalVisible)

                  //}
                >
                  <View style={styles.PlaceButttonView}>
                    <Text
                      style={{
                        fontSize: height / 40,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}>
                      Play
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal 2 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centered2View}>
            <View style={styles.mainModalView}>
              <View style={styles.ModalView1}></View>
              <View style={styles.ModalView2}>
                <Text
                  style={{
                    fontSize: height / 46,
                    fontWeight: '700',
                    color: 'rgb(58, 58, 58)',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to change {'\n'}
                  the Opponent ?
                </Text>
              </View>
              <View style={styles.ModalView3}></View>
              <View style={styles.ModalView4}>
                <Text
                  style={{
                    fontSize: height / 60,
                    color: 'rgb(58, 58, 58)',
                    textAlign: 'center',
                  }}>
                  By Changing Opponent you will loose the Chance to win a
                  potential return with this Player
                </Text>
              </View>
              <View>
                <Image
                  resizeMode="contain"
                  style={{height: height / 10, width: width / 5}}
                  source={cross2}></Image>
              </View>
              <View style={styles.ModalView5}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.OpponentButtonView}>
                    <Text
                      style={{
                        fontSize: height / 45,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '700',
                      }}>
                      Select Other Opponent
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal 3  KYC ************************ */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleValue}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleValue(!modalVisibleValue);
          }}>
          <View style={styles.centeredView3}>
            <View style={styles.modal3View}>
              <AppView
                style={{
                  height: height * 0.2,
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppImage source={KycPrompt} />
              </AppView>
              <AppView
                style={{
                  height: height * 0.06,
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText
                  style={{
                    color: 'rgb(255,255,255)',
                    fontSize: 28,
                    fontWeight: '700',
                  }}>
                  Complete your KYC !
                </AppText>
              </AppView>
              <AppView
                style={{
                  height: height * 0.05,
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText
                  style={{
                    color: 'rgb(255,255,255)',
                    fontSize: 22,
                  }}>
                  To unlock All the features
                </AppText>
              </AppView>
              <AppView
                style={{
                  height: height * 0.18,
                  width: width * 0.9,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <AppTouchable
                  style={{
                    height: height * 0.08,
                    width: width * 0.6,
                    backgroundColor: 'rgb(255,255,255)',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AppText
                    style={{
                      color: 'rgb(94,28,159)',
                      fontSize: 25,
                    }}>
                    Complete your KYC
                  </AppText>
                </AppTouchable>
              </AppView>
              <AppView
                style={{
                  height: height * 0.12,
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppTouchable
                  onPress={() => setModalVisibleValue(!modalVisibleValue)}>
                  <AppText
                    style={{
                      color: 'rgb(255,255,255)',
                      fontSize: 22,
                    }}>
                    Later
                  </AppText>
                </AppTouchable>
              </AppView>
            </View>
          </View>
        </Modal>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisibleValue(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </AppView>
    </SafeAreaView>
  );
};

export default PlaceYourBet;

const styles = StyleSheet.create({
  mainContainer: {
    // height: height * 1,
    width: width * 1,
    backgroundColor: '#E8E8E8',
  },
  flatListContainer: {
    height: height * 0.23,
    width: width * 1,
    justifyContent: 'center',
  },
  cardData: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    borderColor: 'rgb(228, 228 ,228)',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  calendarView: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(112,112,112,0.35)',
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchTimeContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  dateFormatStyle: {
    fontSize: 14,
    color: 'rgb(74,71,71)',
    fontWeight: '600',
    lineHeight: 21,
  },
  monthFormatStyle: {
    fontSize: 14,
    color: 'rgb(74,71,71)',
    fontWeight: '600',
    lineHeight: 21,
  },
  timeFormatStyle: {
    fontSize: 12,
    color: 'rgba(245,245,245,0.86)',
    lineHeight: 21,
  },
  iccView: {
    justifyContent: 'center',
  },
  iccTxt: {
    fontSize: 18,
    color: 'rgb(15,15,15)',
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  matchDetailsCard: {
    flexDirection: 'row',
    width: width * 0.65,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  irelandTeamView: {
    flexDirection: 'row',
    // height: height * 0.05,
    paddingVertical: 15,
    width: width * 0.25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  versusView: {
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 15,
    backgroundColor: 'rgba(168,164,164,0.5)',
  },
  versusTextStyle: {
    color: 'rgb(15,15,15)',
    fontSize: 12,
    fontWeight: '400',
  },
  startsInContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderColor: 'rgba(112,112,112,0.25)',
    paddingBottom: 10,
  },
  watchView: {
    height: height * 0.05,
    width: width * 0.45,
    marginTop: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  startsInText: {
    fontSize: 12,
    color: 'rgba(15,15,15,0.86)',
    alignSelf: 'center',
    paddingRight: 5,
  },
  watchContainer: {
    width: width * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeOuterView: {
    width: 28,
    height: 21,
    borderRadius: 5,
    backgroundColor: 'rgba(94,28,159,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchTimeText: {
    color: 'rgb(94,28,159)',
    fontSize: 12,
    fontWeight: '600',
  },
  watchColonStyle: {
    color: 'rgb(94,28,159)',
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  playBtnContainer: {
    height: height * 0.05,
    width: width * 0.4,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  playBtnTouch: {
    height: height * 0.034,
    width: width * 0.15,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(89,189,91,0.23)',
  },
  playBtnText: {
    fontSize: 14,
    color: 'rgb(80,187,95)',
    fontWeight: '700',
  },
  playerCountView: {
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bottomText: {
    color: 'rgb(94,28,159)',
    fontSize: 12,
  },
  winPredictionView: {
    // height: height * 0.42,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    paddingBottom: 30,
  },
  predictTxtView: {
    height: height * 0.07,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'center',
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
    borderWidth: 0.6,
    borderColor: 'black',
    borderRadius: 8,
  },
  chooseCurrencyView: {
    // height: height * 0.03,
    width: width * 1,
    justifyContent: 'center',
    marginHorizontal: 28,
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
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 2.3,
    width: width / 1,
    // backgroundColor: 'white',
    borderColor: 'grey',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centered1View: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'white',
    backgroundColor: '#ffffff50',
  },
  Modal1View: {
    height: height / 21,
    width: width / 1,
    // backgroundColor:"red"
  },
  Modal2View: {
    height: height / 19,
    width: width / 1,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modal3View: {
    height: height / 50,
    width: width / 1.2,
    // backgroundColor:"red",
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  Modal4View: {
    height: height / 14,
    width: width / 1.2,
    // backgroundColor:"red",
    justifyContent: 'center',
    // alignItems:"center"
  },
  Modal5View: {
    height: height / 12,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlaceButttonView: {
    height: height / 15,
    width: width / 1.7,
    backgroundColor: '#7A25CE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainModalView: {
    backgroundColor: 'white',
    borderRadius: 30,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 2.3,
    width: width / 1,
    borderWidth: 1,
    borderColor: 'grey',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centered2View: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ModalView1: {
    height: height / 21,
    width: width / 1,
    // backgroundColor:"red"
  },
  ModalView2: {
    height: height / 19,
    width: width / 1,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalView3: {
    height: height / 50,
    width: width / 1.2,
    // backgroundColor:"red",
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  ModalView4: {
    height: height / 13.5,
    width: width / 1.2,
    // backgroundColor:"red",
    justifyContent: 'center',
    // alignItems:"center"
  },
  ModalView5: {
    height: height / 12,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  OpponentButtonView: {
    height: height / 15,
    width: width / 1.7,
    backgroundColor: 'rgb(182,27,32)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView3: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modal3View: {
    height: height / 1.7,
    width: width / 1.2,
    backgroundColor: '#7A25CE',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

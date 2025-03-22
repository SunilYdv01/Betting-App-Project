import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  View,
  Text,
  Modal,
} from 'react-native';
import {
  AppImage,
  AppText,
  AppTouchable,
  AppView,
} from '../../components/Atom/atom';
import HeaderTwo from '../../components/molecules/HeaderTwo';
const {height, width} = Dimensions.get('window');
import {
  IrelandBall,
  NetherlandBall,
  HandBall,
  FootBall,
  CricketBall,
  BasketBall,
  BaseBall,
  Hockey,
} from '../../assets/icon';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import MaterialTabs from 'react-native-material-tabs';
import moment from 'moment';
import GameCard from '../../components/GameCard';
import TabNavigator from '../../../src/Navigator/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBarComponent from '../../Navigator/TabBarComponent';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {color} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';

const DATA = [
  {
    banner: 'hello',
    img: require('../../assets/images/printer/printer.png'),
  },
  {
    banner: 'hello',
    img: require('../../assets/images/printer/printer.png'),
  },
  {
    banner: 'hello',
    img: require('../../assets/images/printer/printer.png'),
  },
];

const HomeScreen = (props, {navigation, routes}) => {
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [mlbData, setMlbData] = useState([]);
  const [soccer, setSoccerData] = useState(null);

  const [userBalanceArray, setUserBalanceArray] = useState(null);
  const [availableSports, setAvailableSports] = useState(null);

  const [trendingMatches, setTredingMatches] = useState([]);
  const [nfl, setNFLPreseason] = useState([]);
  const [challengerNCB, setChallengerNCB] = useState([]);
  const [chinaNBL, setChinaNBL] = useState([]);
  const [boxingData, setBoxingData] = useState([]);
  const [hockeyData, setHockeyData] = useState([]);
  const [japanRL, setJapanRL] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [activeValue, setActiveValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const fatchresponce4 = () => {
    axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=16&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        console.log('------mlb2 result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          console.log('setMLB2 Data++++>>>>>', res.data.results[0]);
          setMlbData(res.data.results);
          console.log('++DATA SET++>>>>>', setMlbData);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch mlb2---->>>>', err));
  };

  const fetchSoccerSeasons = () => {
    axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=1&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        console.log('------soccer result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          console.log('setSoccerData++++>>>>>', res.data.results[0]);
          setSoccerData(res.data.results);
          console.log('++DATA SET++>>>>>', setSoccerData);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch soccer---->>>>', err));
  };

  const Rejectfun = (item, index) => {
    setModalVisible(true);
  };

  // ******************** BET 365 - GOLF API IMPLEMENTATION ********************

  const fetchGolfPGA = () => {
    axios({
      method: 'get',
      url: 'http://api.sportradar.us/golf/trial/pga/v3/en/2021/tournaments/schedule.json?api_key=9zsywqq78na8qqr6djjxkguq',
    })
      .then(res => {
        console.log('------hey geeta----->>>>', res.data);
        if (res.status === 200) {
          console.log('=====hey geeta Data========', res.data);
          // setGolf_pga(res.data.games);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch 8---->>>>', err));
  };
  // USE EFFECT TO RUN API ON SCREEN LOADING

  const fetchUserBalance = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);

    await axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/wallet/wallet/get-all-user-balance-and-coinlist',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        console.log('user balance data  ****%%%%%%%%------- ', res.data);
        if (res.status === 200) {
          setUserBalanceArray(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch user data---->>>>', err));
  };

  const fetchSports = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);
    await axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/account/get-game-details',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        console.log('available sports  ****%%%%%%%%------- ', res.data);
        if (res.status === 200) {
          setAvailableSports(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.log('errpr of sports --------- ', error);
      });
  };
  useEffect(() => {
    fatchresponce4();
    fetchSoccerSeasons();
    fetchGolfPGA();
    fetchSports();
    fetchUserBalance();
    fetchNFLPreSeason();
    fetchChallengerNCB(); //----------
    fetchChinaNBL();
    fetchBoxingData(); //-----------
    fetchHockeyFriendlyMatches(); //------
    fetchJapanReserveLeague(); // ------------
    bannerlistname(); //----------------
  }, []);

  const bannerlistname = async () => {
    const value = await AsyncStorage.getItem('token');

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/static/get-banner-list`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('apii banner ------------- >>>>>', res.data.data);

          setBannerData([...bannerData, ...res.data.data]);
          console.log('api banner2  ========>>>>>>>', bannerData);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  const fetchNFLPreSeason = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=12&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------nfl result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          console.log(
            'api 1 ------------- >>>>>',
            trendingMatches,
            ...res.data.results.slice(0, 2),
          );
          setNFLPreseason([...res.data.results.slice(0, 2)]);
          setTredingMatches([trendingMatches, ...res.data.results.slice(0, 2)]);
          // setTredingMatches([...trendingMatches, res.data.results[0]]);
          // console.log('++DATA SET++>>>>>', setId);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch nfl---->>>>', err));
  };

  const fetchChallengerNCB = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=13&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------tennis result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          console.log(
            'api 2 ------------- >>>>>',
            trendingMatches,
            res.data.results[0],
          );
          // console.log('setTENNIS Data++++>>>>>', res.data.results[0]);
          setChallengerNCB([res.data.results[0]]);
          setTredingMatches([...trendingMatches, res.data.results[0]]);
          // console.log('++DATA SET++>>>>>', setNcaamb);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch tennis---->>>>', err));
  };
  const fetchChinaNBL = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=18&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------nba result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          // console.log('setNBA Data++++>>>>>', res.data.results[0]);
          console.log('api 3 ------------- >>>>>', res.data.results[0]);
          setChinaNBL([...res.data.results.slice(0, 2)]);
          setTredingMatches([
            ...trendingMatches,
            ...res.data.results.slice(0, 3),
          ]);
          // console.log('++DATA SET++>>>>>', data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch nba---->>>>', err));
  };
  const fetchBoxingData = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=9&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------boxing result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          // console.log('setBOXING Data++++>>>>>', res.data.results[0]);
          // console.log('api 4 ------------- >>>>>', res.data.results[0]);

          setBoxingData([...res.data.results.slice(0, 2)]);
          setTredingMatches([
            ...trendingMatches,
            ...res.data.results.slice(0, 1),
          ]);
          // console.log('++DATA SET++>>>>>', setNcaafb);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch boxing---->>>>', err));
  };
  const fetchHockeyFriendlyMatches = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=17&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------nhl result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          // console.log('setNHL Data++++>>>>>', res.data.results[0]);
          // console.log('api 5 ------------- >>>>>', res.data.results[0]);
          setHockeyData([res.data.results[0]]);
          setTredingMatches([
            ...trendingMatches,
            ...res.data.results.slice(0, 1),
          ]);
          // console.log('++DATA SET++>>>>>', setId6);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch nhl---->>>>', err));
  };
  const fetchJapanReserveLeague = async () => {
    await axios({
      method: 'get',
      url: 'https://api.b365api.com/v1/bet365/upcoming?sport_id=16&token=90599-mk3MsmiYHiqXz7',
    })
      .then(res => {
        // console.log('------mlb result----->>>>', res.data.results[0]);
        if (res.status === 200) {
          // console.log('setMLB Data++++>>>>>', res.data.results[0]);
          console.log('api 6 ------------- >>>>>', res.data.results[0]);
          setJapanRL([...res.data.results.slice(0, 2)]);
          setTredingMatches([
            ...trendingMatches,
            ...res.data.results.slice(0, 1),
          ]);
          // console.log('++DATA SET++>>>>>', setApData);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch mlb---->>>>', err));
  };

  const renderGameCard7 = ({item, index}) => {
    // console.log(
    //   '------Moment------>>>>>>',
    //   moment(item.time),
    //   moment.unix(item.time).format('LLL'),
    // );
    return (
      <AppView style={{height: height * 0.25}}>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppView style={styles.matchTimeContainer}>
                <AppText style={styles.dateFormatStyle}>
                  {item && item.time ? moment.unix(item.time).format('DD') : ''}
                </AppText>
                <AppText style={styles.monthFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('MMM')
                    : ''}
                </AppText>
                <AppText style={styles.timeFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('YYYY')
                    : ''}
                </AppText>
              </AppView>
            </AppView>

            <AppView style={styles.iccView}>
              <AppView>
                <AppText style={styles.iccTxt}>{item.league.name}</AppText>
              </AppView>

              <AppView style={styles.matchDetailsCard}>
                <AppView
                  style={[
                    styles.irelandTeamView,
                    {
                      width: width * 0.26,
                    },
                  ]}>
                  <AppText>{item.away.name}</AppText>
                  <AppImage source={IrelandBall} />
                </AppView>
                <AppView style={styles.versusView}>
                  <AppText style={styles.versusTextStyle}>vs</AppText>
                </AppView>
                <AppView
                  style={[
                    styles.irelandTeamView,
                    {
                      width: width * 0.26,
                    },
                  ]}>
                  <AppImage source={NetherlandBall} />
                  <AppText>{item.home.name}</AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>

          <AppView style={styles.startsInContainer}>
            <AppView style={styles.watchView}>
              <AppView style={{width: width * 0.2}}>
                <AppText style={styles.startsInText}>Starts in</AppText>
              </AppView>
              <AppView style={styles.watchContainer}>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('hh')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('mm')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('ss')}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
            <AppView style={styles.playBtnContainer}>
              <AppTouchable
                style={styles.playBtnTouch}
                onPress={() => navigation.navigate('PlaceYourBet')}>
                <AppText style={styles.playBtnText}>Play</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
          <AppView style={styles.playerCountView}>
            <AppText style={styles.bottomText}>
              12k+ players have already enrolled their Winner!
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  const renderSoccer = ({item, index}) => {
    // console.log('------item 7Soccerrrrrrr------>>>>>>', item);
    return (
      <AppView style={{height: height * 0.25}}>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppView style={styles.matchTimeContainer}>
                <AppText style={styles.dateFormatStyle}>
                  {item && item.time ? moment.unix(item.time).format('DD') : ''}
                </AppText>
                <AppText style={styles.monthFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('MMM')
                    : ''}
                </AppText>
                <AppText style={styles.timeFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('YYYY')
                    : ''}
                </AppText>
              </AppView>
            </AppView>

            <AppView style={styles.iccView}>
              <AppView>
                <AppText style={styles.iccTxt}>USA NPSL</AppText>
              </AppView>

              <AppView style={styles.matchDetailsCard}>
                <AppView
                  style={[
                    styles.irelandTeamView,
                    {
                      width: width * 0.26,
                    },
                  ]}>
                  <AppText>{item.away.name}</AppText>
                  <AppImage
                    // source={{ uri: 'https://assets.b365api.com/images/team/b/159944.png'}}
                    source={IrelandBall}
                  />
                </AppView>
                <AppView style={styles.versusView}>
                  <AppText style={styles.versusTextStyle}>vs</AppText>
                </AppView>
                <AppView
                  style={[
                    styles.irelandTeamView,
                    {
                      width: width * 0.26,
                    },
                  ]}>
                  <AppImage source={NetherlandBall} />
                  <AppText>{item.home.name}</AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>

          <AppView style={styles.startsInContainer}>
            <AppView style={styles.watchView}>
              <AppView style={{width: width * 0.2}}>
                <AppText style={styles.startsInText}>Starts in</AppText>
              </AppView>
              <AppView style={styles.watchContainer}>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('hh')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('mm')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment.unix(item.time).format('ss')}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
            <AppView style={styles.playBtnContainer}>
              <AppTouchable
                style={styles.playBtnTouch}
                onPress={() => navigation.navigate('PlaceYourBet')}>
                <AppText style={styles.playBtnText}>Play</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
          <AppView style={styles.playerCountView}>
            <AppText style={styles.bottomText}>
              12k+ players have already enrolled their Winner!
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  const renderSports = () => {
    let arr = [];
    availableSports.map((item, index) => {
      arr.push(
        <AppView style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* <AppImage
            source={CricketBall}
            style={{
              width: 20,
              height: 20,
              tintColor:
                selectedTab == index ? 'rgb(94 ,28 ,159)' : 'rgb(172,172,172)',
            }}
          /> */}
          <AppText
            style={{
              fontSize: 15,
              color:
                selectedTab == index ? 'rgb(94 ,28 ,159)' : 'rgb(95,95,95)',
            }}>
            {item.gameName}
          </AppText>
        </AppView>,
      );
    });
    console.log('arr --------------- ', arr);
    return arr;
  };
  // **************************** END OF RENDER ITEM ****************************
  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <HeaderTwo
          onPress6={() => props.navigation.navigate('NotificationScreen')}
          onPress3={() => props.navigation.navigate('InboxScreen')}
          onPress4={() => props.navigation.navigate('DrawerNavigator')}
        />
        <ScrollView
          style={{marginBottom: 100}}
          showsVerticalScrollIndicator={false}>
          <AppView
            style={{
              width: width * 1,
            }}>
            <AppView style={styles.wrapperSwiper}>
              <SwiperFlatList
                autoplay
                autoplayDelay={1.5}
                autoplayLoop
                index={2}
                // showPagination
                paginationStyleItemActive={{backgroundColor: 'yellow'}}
                paginationStyle={{bottom: -25}}
                data={bannerData}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        height: height / 4,
                        width: width / 1.1,
                        marginHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <AppText>{item.bannerUrl}</AppText> */}
                      <Image
                        resizeMode="contain"
                        style={{height: height / 4.3, width: width / 1.15}}
                        source={{uri: item.bannerUrl}}
                      />
                    </View>
                  );
                }}
              />

              {/* <Swiper
                showsButtons={false}
                showsPagination={true}
                paginationStyle={{bottom: -5}}
                activeDotStyle={styles.activeDotStyle}
                dotStyle={styles.dotStyle}>
                <AppView style={styles.slide1}>
                  <AppImage
                    source={require('../../assets/images/HomeImgSwipper/HomeImgSwipper.png')}
                    style={styles.sliderImage}
                  />
                </AppView>
                <AppView style={styles.slide1}>
                  <AppImage
                    source={require('../../assets/images/HomeImgSwipper/HomeImgSwipper.png')}
                    style={styles.sliderImage}
                  />
                </AppView>
                <AppView style={styles.slide1}>
                  <AppImage
                    source={require('../../assets/images/HomeImgSwipper/HomeImgSwipper.png')}
                    style={styles.sliderImage}
                  />
                </AppView>
              </Swiper>  */}
            </AppView>

            {availableSports && (
              <AppView style={styles.middleTabView}>
                <MaterialTabs
                  items={renderSports()}
                  scrollable={true}
                  selectedIndex={selectedTab}
                  onChange={index => {
                    setSelectedTab(index);
                    props.navigation.navigate('SelectedSport', {
                      gameType: availableSports[index],
                    });
                  }}
                  barColor="rgb(255,255,255)"
                  indicatorColor="rgb(94 ,28 ,159)"
                  indicatorHeight={5}
                  activeTextColor="rgb(94 ,28 ,159)"
                  inactiveTextColor="rgb(95,95,95)"
                  activeTextStyle={{fontSize: 10}}
                  textStyle={{fontSize: 10}}
                  uppercase={false}
                  barHeight={70}
                />
              </AppView>
            )}
            {userBalanceArray && (
              <ScrollView
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}>
                {userBalanceArray.userBalance.map(item => (
                  <AppView style={styles.dollarContainer}>
                    <AppView style={styles.txtAccView}>
                      <AppText
                        style={{
                          fontSize: height / 40,
                          color: 'rgb(121,115,115)',
                          fontWeight: '700',
                        }}>
                        Your Account
                      </AppText>
                    </AppView>
                    <Image
                      source={{uri: item?.coinImage}}
                      style={{
                        height: 50,
                        width: 50,
                        alignSelf: 'center',
                        marginTop: 15,
                      }}
                    />
                    <AppView style={styles.txtInputView}>
                      <TextInput
                        // scrollEnabled={false}
                        placeholder={`${
                          item.instrument
                        }  ${item.availableBalance.toFixed(2)}`}
                        placeholderTextColor="rgb(172,172,172)"
                        keyboardType="numeric"
                        maxLength={4}
                        style={{fontSize: 30}}
                        editable={false}
                      />
                    </AppView>
                    <AppView style={styles.btnContainer}>
                      <AppTouchable
                        style={styles.withDrawTouchView}
                        onPress={() => props.navigation.navigate('Mywallet')}>
                        <AppView style={{alignItems: 'center'}}>
                          <AppText
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: '700',
                            }}>
                            DEPOSIT
                          </AppText>
                        </AppView>
                      </AppTouchable>
                      <AppTouchable
                        style={styles.withdrawContainer}
                        onPress={() => props.navigation.navigate('Mywallet')}>
                        <AppView style={{alignItems: 'center'}}>
                          <AppText
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: '700',
                            }}>
                            WITHDRAW
                          </AppText>
                        </AppView>
                      </AppTouchable>
                    </AppView>
                  </AppView>
                ))}
              </ScrollView>
            )}
            <AppView
              style={{
                // height: height * 0.045,
                width: width * 1,
                justifyContent: 'center',
                marginVertical: 25,
              }}>
              <AppText
                style={{
                  color: 'rgb(58,58,58)',
                  fontSize: 24,
                  marginLeft: 22,
                  fontWeight: '700',
                }}>
                Top 10 Trending Matches
              </AppText>
            </AppView>

            <AppView>
              <FlatList
                data={[
                  ...nfl,
                  ...challengerNCB,
                  ...chinaNBL,
                  ...boxingData,
                  ...hockeyData,
                  ...japanRL,
                ]}
                extraData={trendingMatches}
                style={{
                  // height: 210,
                  marginTop: 20,
                  // backgroundColor: 'red'
                }}
                renderItem={({item, index}) => (
                  <GameCard
                    item={item}
                    rejectpress={(item, index) => Rejectfun(item, index)}
                    // matchTitle={'NFL Preseason'}
                    onPlayPress={() =>
                      props.navigation.navigate('PlaceYourBet', {item: item})
                    }
                  />
                )}
              />
            </AppView>
          </AppView>
        </ScrollView>
        {/* <TabNavigator/> */}
        {/* <TabBarComponent /> */}
      </AppView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalView4}>
              <Text style={styles.modalText}>
                Are You sure you want to reject
              </Text>
              <Text style={styles.modalText}>Deniel's Bet?</Text>

              <View style={styles.modalView3}>
                <Text style={styles.modalText3}>
                  By Rejecting you will loose the chance to win a
                </Text>
                <Text>potential return of 0.00024 BTC</Text>
              </View>

              <View style={styles.modalView2}>
                <Entypo
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  name="circle-with-cross"
                  size={60}
                  color="red"
                />
              </View>

              <View style={styles.modalView1}>
                <Text
                  onPress={() => {
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);
                    setModalVisible(false);
                  }}
                  style={styles.modalText1}>
                  Reject The Bet
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // height: height * 1,
    height: height * 1,
    width: width * 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  wrapperSwiper: {
    height: height * 0.25,
    borderRadius: 8,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // height: height * 0.4
  },
  activeDotStyle: {
    width: 10,
    height: 5,
    borderRadius: 0,
    // backgroundColor: 'rgb(94 ,28 ,159)',
    backgroundColor: 'red',
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 0,
    backgroundColor: 'rgba(94 ,28 ,159, 0.4)',
  },
  sliderImage: {
    height: '90%',
    width: '90%',
    borderRadius: 20,
  },
  middleTabView: {
    height: height * 0.058,
    // width: width * 1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: 'rgb(228, 228 ,228)',
    backgroundColor: 'white',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  tabComponentView: {
    height: height * 0.07,
    width: width * 0.1666,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
  },
  dollarContainer: {
    // height: height * 0.3,
    width: width * 1,
    borderWidth: 2,
    borderColor: 'rgb(228, 228 ,228)',
    backgroundColor: '#ffffff',
    marginTop: 20,
    shadowColor: '#E1CCC9',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 10,
  },
  txtAccView: {
    height: height * 0.03,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  txtInputView: {
    height: height * 0.09,
    width: width * 1,
    alignItems: 'center',
    marginVertical: 5,
    // backgroundColor: 'brown',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // backgroundColor:'cyan'
  },
  cardData: {
    // height: height * 0.22,
    width: width * 0.9,
    backgroundColor: 'green',
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
  irelandTeamView: {
    flexDirection: 'row',
    // height: height * 0.05,
    paddingVertical: 15,
    width: width * 0.25,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor:'teal'
  },
  versusView: {
    // height: height * 0.05,
    // width: width * 0.1,
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
  calendarView: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(112,112,112,0.35)',
    // height: height * 0.08,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iccView: {
    // height: height * 0.08,
    // width: width * 0.6,
    justifyContent: 'center',
  },
  withdrawContainer: {
    height: height * 0.057,
    width: width * 0.38,
    marginHorizontal: 10,
    backgroundColor: 'rgb(219,56,56)',
    borderRadius: 38,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  withDrawTouchView: {
    height: height * 0.057,
    width: width * 0.38,
    marginHorizontal: 10,
    backgroundColor: 'rgb(67,209,120)',
    // backgroundColor:'red',
    borderRadius: 38,
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
  matchDetailsCard: {
    flexDirection: 'row',
    width: width * 0.65,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  leftSideTeamView: {
    width: width * 0.26 - 35,
    marginRight: 5,
  },
  rightSideTeamView: {
    width: width * 0.26 - 35,
    marginLeft: 5,
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
  iccTxt: {
    fontSize: 18,
    color: 'rgb(15,15,15)',
    fontWeight: '700',
    paddingHorizontal: 10,
    // marginLeft: 15,
    // textAlign: 'center',
  },
  playBtnContainer: {
    height: height * 0.05,
    width: width * 0.4,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  startsInText: {
    fontSize: 12,
    color: 'rgba(15,15,15,0.86)',
    alignSelf: 'center',
    paddingRight: 5,
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

  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: height / 5,

    //backgroundColor: "#ffffff99",
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalText: {
    fontSize: height / 45,
    fontWeight: '500',
    marginTop: height / 70,
    textAlign: 'center',
  },
  modalText1: {
    fontSize: height / 45,
    fontWeight: '500',

    textAlign: 'center',
    //alignItems: 'center',
    color: 'white',
  },
  modalView: {
    marginTop: height / 1.2,
    height: height / 1.4,
    width: width / 1,
    backgroundColor: 'white',
    borderRadius: 30,
    //padding: 35,
    //justifyContent: "flex-end",
    alignItems: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    //shadowColor: "green",
  },

  modalView2: {
    marginTop: height / 25,
    height: height / 12,
    width: width / 1,
    //backgroundColor: 'green',

    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText3: {
    fontSize: height / 55,
    fontWeight: '500',

    textAlign: 'center',
    //alignItems: 'center',
    color: 'black',
  },
  modalView3: {
    //marginTop: height / 25,
    height: height / 17,
    width: width / 1,
    backgroundColor: 'white',
    borderRadius: 40,
    //padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView4: {
    marginTop: height / 6,
    height: height / 17,
    width: width / 1,
    //backgroundColor: 'cyan',

    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView1: {
    marginTop: height / 35,
    height: height / 20,
    width: width / 1.5,
    backgroundColor: 'red',
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  // modaltap: {
  //   height: height / 50,
  //   width: width / 1.3,
  //   // backgroundColor:'red',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   flexDirection: 'row',
  // },

  tapt: {
    fontSize: height / 60,
    color: 'red',
    fontWeight: '500',
  },
});

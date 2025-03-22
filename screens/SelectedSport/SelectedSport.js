import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {BackArrowTwo, Star} from '../../assets/icon';
const {height, width} = Dimensions.get('window');
import {IrelandBall, NetherlandBall} from '../../assets/icon';
import GameCard from '../../components/GameCard';
import axios from 'axios';
import moment from 'moment';
import Loader from '../../components/Loader';

const APIKEY = '90599-mk3MsmiYHiqXz7';
const SelectedSport = ({navigation, route}) => {
  const [gameType, setGameType] = useState(route?.params?.gameType);
  const [isLoading, setLoading] = useState(false);

  const [dataList, setDataList] = useState([]);
  const [sport_id, setSportId] = useState(null);

  const fetchGameData = () => {
    setLoading(true);
    axios({
      method: 'get',
      // url: `https://api.b365api.com/v1/bet365/upcoming?sport_id=${gameType.sportId}&token=${APIKEY}`,
      url: 'https://api.b365api.com/v1/bet365/upcoming',
      params: {
        sport_id: gameType.sportId,
        token: APIKEY,
        // cc: 'us',
      },
    })
      .then(res => {
        console.log('------result----->>>>', res.data.results);
        if (res.status === 200) {
          setDataList(res.data.results);
        } else {
          alert('Something went wrong');
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);

        console.log('error ---------->>>>', err);
      });
  };

  useEffect(() => {
    const {gameType} = route.params;
    fetchGameData();
    console.log('game type %%%%%%%%%------------ ', gameType);
  }, []);

  console.log('------FootBall Data------>>>>>>', dataList);
  const _renderItem = ({item, index}) => {
    console.log('------item Game------>>>>>>', item);
    return (
      <AppView style={{height: height * 0.26, }}>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppView style={styles.matchTimeContainer}>
                <AppText style={styles.dateFormatStyle}>
                {item && item.time ? moment.unix(item.time).format('DD'):''}
                </AppText>
                <AppText style={styles.monthFormatStyle}>
                {item && item.time ? moment.unix(item.time).format('MMM'):''}
                </AppText>
                <AppText style={styles.timeFormatStyle}>
                {item && item.time ? moment.unix(item.time).format('YYYY'):''}
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
                  <AppText style={styles.leftSideTeamView}>
                    {item.away.name}
                  </AppText>
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

                  <AppText style={styles.rightSideTeamView}>
                    {item.home.name}
                  </AppText>
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
              <AppTouchable style={styles.playBtnTouch} onPress={() => {}}>
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

  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <AppView style={styles.headerView}>
          <Header
            head={false}
            backImage={BackArrowTwo}
            headerText2={gameType?.gameName || ''}
            favImage={Star}
            onPress2={() => navigation.goBack()}
          />
        </AppView>
        <AppView style={styles.containerOne}>
          <AppView style={styles.upcomingView}>
            <AppText style={styles.txtUpcoming}>Upcoming</AppText>
          </AppView>
          <ScrollView>
            {/* FLATLIST OF RENDER ONE */}
            {isLoading ? (
              <Loader />
            ) : (
              <AppView>
                <FlatList
                  data={dataList}
                  extraData={dataList}
                  style={{
                    marginTop: 20,
                  }}
                  renderItem={({item, index}) => (
                    <GameCard
                      item={item}
                      onPlayPress={() =>
                        navigation.navigate('PlaceYourBet', {item: item})
                      }
                    />
                  )}
                />
              </AppView>
            )}
          </ScrollView>
        </AppView>

        <AppView style={{height: height * 0.5, width: width * 1}} />
      </AppView>
    </SafeAreaView>
  );
};

export default SelectedSport;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#E8E8E8',
  },
  headerView: {},
  containerOne: {
    // height: height * 0.48,
    // height: height * 0.34,
    width: width * 1,
  },
  upcomingView: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'center',
  },
  txtUpcoming: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgb(58,58,58)',
    marginHorizontal: 19,
  },
  cardData: {
    height: height * 0.22,
    width: width * 0.9,
    backgroundColor: 'rgb(255,255,255)',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 12,
  },
  calendarView: {
    borderRightWidth: 1,
    height: height * 0.08,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarView2: {
    borderRightWidth: 1,
    height: height * 0.13,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  iccView: {
    height: height * 0.1,
    width: width * 0.75,
    justifyContent: 'center',
  },
  iccView2: {
    height: height * 0.13,
    width: width * 0.72,
    justifyContent: 'center',
    // backgroundColor: 'red',
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
  watchView: {
    height: height * 0.05,
    width: width * 0.45,
    marginTop: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iccTxt: {
    fontSize: 14,
    color: 'rgb(15,15,15)',
    fontWeight: '700',
    marginLeft: 15,
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
    justifyContent: 'center',
    backgroundColor: 'rgb(89,189,91)',
  },
  playerCountView: {
    height: height * 0.04,
    width: width * 0.85,
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
  // ++++++++++++++++++++++ Card Styles +++++++++++++++++++++++
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
  irelandTeamView: {
    flexDirection: 'row',
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
  calendarView: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(112,112,112,0.35)',
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iccView: {
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
});

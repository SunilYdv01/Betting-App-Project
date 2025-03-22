import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import {IrelandBall, NetherlandBall, Star, BackArrow} from '../../assets/icon';
import Button from '../../components/Button/Button';
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import moment from 'moment';
import Header from '../../components/molecules/Header';

const InboxScreen = (props, {navigation, route}) => {
  const [visible, setVisible] = useState(false);

  const [soccer, setSoccerData] = useState([]);

  const Submit = () => {
    setVisible(true);
  };

  // ******************** BET 365 - SOCCER API ********************

  const fetchSoccerSeasons = () => {
    axios({
      method: 'get',
      url: 'https://api.b365api.com/v2/events/upcoming',
      params: {
        sport_id: '1',
        token: '90599-mk3MsmiYHiqXz7',
        cc: 'us',
      },
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

  // //**************************** RENDER ITEM 7 OF FLATLIST ****************************
  console.log('------NCAAFBData7------>>>>>>', soccer);
  const renderSoccer = ({item, index}) => {
    console.log('------item 7Soccerrrrrrr------>>>>>>', item);
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
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={[styles.playBtnContainer]}>
                <AppTouchable
                  style={[
                    styles.playBtnTouch,
                    {backgroundColor: 'rgb(246,134,134)'},
                  ]}
                  onPress={Submit}>
                  <AppText
                    style={[styles.playBtnText, {color: 'rgb(255,0,83)'}]}>
                    Reject
                  </AppText>
                </AppTouchable>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable
                  style={styles.playBtnTouch}
                  onPress={() => navigation.navigate('PlaceYourBet')}>
                  <AppText style={styles.playBtnText}>Play</AppText>
                </AppTouchable>
              </AppView>
            </AppView>
          </AppView>
          <AppView style={styles.playerCountView}>
            <AppText style={styles.bottomText}>
              Daniel@123 Wants to bet 1K USD on Manchester
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  useEffect(() => {
    fetchSoccerSeasons();
  });

  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <AppView style={{height: height * 0.08, width: width * 1}}>
          {/* <HeaderTwo
            onPress4={() => props.navigation.navigate('DrawerNavigator')}
          /> */}
          <Header
            head={false}
            backImage={BackArrow}
            headerText2={'Inbox'}
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>

        <AppView style={styles.mainConatiner2}>
          <Button />
        </AppView>
        <AppView style={styles.mainConatiner5}>
          <AppView style={styles.trendingTxtView}>
            <AppText style={styles.trendText}>Soccer</AppText>
          </AppView>
          <AppView style={styles.cardData}>
            {/* ********************* FLATLIST Soccer ********************* */}

            <AppView>
              <FlatList
                data={soccer}
                style={{
                  height: 200,
                }}
                renderItem={renderSoccer}
              />
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  mainConatiner2: {
    height: height * 0.09,
    width: width * 1,
    flexDirection: 'row',
  },
  trendingTxtView: {
    height: height * 0.05,
    width: width * 0.85,
  },
  trendText: {
    fontSize: 20,
    color: 'rgb(48,44,44)',
    marginHorizontal: 8,
  },
  // -----------
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
    width: 30,
    height: 5,
    borderRadius: 0,
    backgroundColor: 'rgb(94 ,28 ,159)',
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
    backgroundColor: 'white',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  txtAccView: {
    height: height * 0.02,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  txtInputView: {
    height: height * 0.09,
    width: width * 1,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardData: {
    // height: height * 0.22,
    width: width * 1,
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
  },
  withDrawTouchView: {
    height: height * 0.057,
    width: width * 0.38,
    marginHorizontal: 10,
    backgroundColor: 'rgb(67,209,120)',
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
    width: width * 0.2,
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

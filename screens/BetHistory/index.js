import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {BackArrowTwo, UserPictures} from '../../assets/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import axios from 'axios';
import {IrelandBall, NetherlandBall} from '../../assets/icon';
const {height, width} = Dimensions.get('window');
import moment from 'moment';

const BetHistory = ({navigation}) => {
  const [betsList, setbetsList] = useState(null);

  useEffect(() => {
    fetchBets();
    betHistory();
  }, []);

  const fetchBets = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);
    await axios({
      method: 'GET',
      url: 'https://java-create-token.mobiloitte.org/account/my-bet-api?page=1&pagesize=12',
      params: {
        page: 1,
        pagesize: 12,
      },
      headers: {
        // userId: value,
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('users list------- ****%%%%%%%%------- ', res.data.data[0]);
        if (res.status === 200) {
          setbetsList(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.log('errpr of users --------- ', error);
      });
  };


  const betHistory  = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);
    await axios({
      method: 'GET',
      url: 'http://172.16.0.230:4096/view-bet-details?betId=2',
      params: {
        betId: 2,
        // userId: 79,
      },
      headers: {
  
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        console.log('users data------- ****%%%%%%%%------- ', res.data.data);
        if (res.status === 200) {
          // setbetsList(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.log('errpr of users --------- ', error);
      });
  };

  //*************************** RENDER ITEM 8 OF FLATLIST ***************************

  console.log('--------NCCAMB Data8-------->>>>>>>>', navigation);
  // //*************************** RENDER ITEM 7 OF FLATLIST ***************************
  console.log('------NCAAFBData7------>>>>>>', betsList);
  const renderSoccer = ({item, index}) => {
    console.log('------item 7------>>>>>>', item);
    return (
      <AppView style={{height: height * 0.25}}>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppView style={styles.mainImgTxtView}>
                <AppView style={styles.ImgContainerView}>
                  <AppImage
                    source={UserPictures}
                    style={{height: 40, width: 40}}
                  />
                </AppView>
                <AppView style={styles.TxtContainerView}>
                  <AppText style={styles.timeFormatStyle}>
                    <AppText style={styles.iccTxtDaniel}>Daniel_123</AppText>
                  </AppText>
                </AppView>
              </AppView>
            </AppView>

            <AppView style={styles.iccView}>
              <AppView>
                <AppText style={styles.iccTxt}>{item.tournamentName}</AppText>
              </AppView>

              <AppView style={styles.matchDetailsCard}>
                <AppView
                  style={[
                    styles.irelandTeamView,
                    {
                      width: width * 0.26,
                    },
                  ]}>
                  <AppText
                    style={{
                      color: 'rgb(15,15,15)',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    {item.awayTeam}
                  </AppText>
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
                  <AppText
                    style={{
                      color: 'rgb(68,196,116)',
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {item.homeTeam}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>

          <AppView style={styles.startsInContainer}>
            <AppView style={styles.watchView}>
              <AppView style={{width: width * 0.2}}>
                <AppText style={styles.startsInText}>Starts in: </AppText>
              </AppView>
              <AppView style={styles.watchContainer}>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {/* {moment(item.sport_event.starts_in).format('hh')} */}
                    {moment(item.updateTime).format('hh')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment(item.updateTime).format('hh')}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {moment(item.updateTime).format('hh')}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
            <AppView style={styles.playBtnContainer}>
              <AppTouchable
                style={styles.playBtnTouch}
                // onPress={() => navigation.navigate('PlaceYourBet')}
              >
                <AppText style={styles.playBtnText}>Declared</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  return (
    <SafeAreaView>
      <Header
        head={false}
        backImage={BackArrowTwo}
        headerText2="History"
        onPress2={() => navigation.goBack()}
      />
      <AppView style={{ }}>
        <AppView style={styles.txtHistoryView}>
          <AppText style={styles.txtHistory}>Bet History</AppText>
        </AppView>

        {/* ******************** FLATLIST CODE ********************  */}

        <AppView>
          <FlatList
            data={betsList}
            style={{
              // height: 374,
              height: 700,
              marginTop: 10,
              marginBottom: 15,
            }}
            renderItem={renderSoccer}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default BetHistory;

const styles = StyleSheet.create({
  cardData: {
    height: height / 4.5,
    width: width * 0.94,
    // backgroundColor: 'green',
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
  iccTxtDaniel: {
    fontSize: 11.5,
    color: 'rgb(15,15,15)',
    fontWeight: '500',
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
    width: width * 0.2,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    // backgroundColor: 'rgba(89,189,91,0.23)',
  },
  playBtnText: {
    fontSize: 14,
    color: 'rgb(145,143,143)',
    fontWeight: '500',
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
  mainImgTxtView: {
    height: height * 0.12,
    width: width * 0.15,
    // backgroundColor: 'red',
  },
  ImgContainerView: {
    height: height * 0.08,
    width: width * 0.15,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtContainerView: {
    height: height * 0.04,
    width: width * 0.15,
    // backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHistoryView: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: 'center',
  },
  txtHistory: {
    color: 'rgb(58,58,58)',
    fontSize: height/35,
    fontWeight:"700",
    marginHorizontal: 15,
  },
});

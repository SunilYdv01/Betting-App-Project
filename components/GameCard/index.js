import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
  View,
  Text,
} from '../../components/Atom/atom';
import {IrelandBall, NetherlandBall} from '../../assets/icon';
import moment from 'moment';
import {Modal} from 'react-native';
const {height, width} = Dimensions.get('window');

const GameCard = ({item, matchTitle, onPlayPress}) => {
  // console.log('--BetTwo--------------->>', item);
  //const [time, setTime] = useState(null);
  return (
    <>
      <AppView style={{height: height * 0.26}}>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppView style={styles.matchTimeContainer}>
                <AppText style={styles.dateFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('DD')
                    : '0'}
                </AppText>
                <AppText style={styles.monthFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('MMM')
                    : '0'}
                </AppText>
                <AppText style={styles.timesFormatStyle}>
                  {item && item.time
                    ? moment.unix(item.time).format('YYYY')
                    : '0'}
                </AppText>
              </AppView>
            </AppView>

            <AppView style={styles.iccView}>
              <AppView>
                {/* <AppText style={styles.iccTxt}>{matchTitle}</AppText> */}
                <AppText style={styles.iccTxt}>
                  {item && item.league && item.league.name}
                </AppText>
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
                    {item && item.away && item.away.name}
                  </AppText>
                  {/* <AppImage source={IrelandBall} /> */}
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
                  {/* <AppImage source={NetherlandBall} /> */}

                  <AppText style={styles.rightSideTeamView}>
                    {item && item.home && item.home.name}
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
                    {item && item.scheduled
                      ? moment(item.scheduled).format('hh')
                      : '0'}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {item && item.scheduled
                      ? moment(item.scheduled).format('mm')
                      : '0'}
                  </AppText>
                </AppView>
                <AppText style={styles.watchColonStyle}>:</AppText>
                <AppView style={styles.timeOuterView}>
                  <AppText style={styles.watchTimeText}>
                    {item && item.scheduled
                      ? moment(item.scheduled).format('ss')
                      : '0'}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
            {/* <AppView style={[styles.playBtnContainer, {width: width * 0.22}]}>
              <AppTouchable
                style={[
                  styles.playBtnTouch,
                  {width: width * 0.17, backgroundColor: '#FFCACA'},
                ]}
                onPress={rejectpress}>
                <AppText style={[styles.playBtnText, {color: 'red'}]}>
                  Reject
                </AppText>
              </AppTouchable>
            </AppView> */}
            <AppView style={styles.playBtnContainer}>
              <AppTouchable
                style={[styles.playBtnTouch, {width: width * 0.13}]}
                onPress={onPlayPress}>
                <AppText style={styles.playBtnText}>Play</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
          {/* <AppView style={styles.playerCountView}>
          <AppText style={styles.bottomText}>Reject</AppText>
        </AppView> */}
        </AppView>
      </AppView>
    </>
  );
};

export default GameCard;

const styles = StyleSheet.create({
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
    // marginVertical:30
    // height:height/4
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
  timesFormatStyle: {
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
    // borderBottomWidth: 0.6,
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
    fontSize: height / 62,
    color: 'rgb(15,15,15)',
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  playBtnContainer: {
    height: height * 0.05,
    width: width / 3,
    //backgroundColor: 'red',
    marginTop: 8,
    //justifyContent: 'center',
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
    // width: width * 0.15,
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
  //modal style....................
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
    marginTop: height / 50,
    textAlign: 'center',
  },
  modalView: {
    marginTop: height / 1.2,
    height: height / 2,
    width: width / 1,
    backgroundColor: 'cyan',
    borderRadius: 30,
    //padding: 35,
    //justifyContent: "flex-end",
    alignItems: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    //shadowColor: "green",
  },
  modaltap: {
    height: height / 50,
    width: width / 1.3,
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  tapt: {
    fontSize: height / 60,
    color: 'red',
    fontWeight: '500',
  },
});

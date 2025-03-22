import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {CricketBall} from '../../assets/icon';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import {IrelandBall, NetherlandBall} from '../../assets/icon';
import GameCard from '../../components/GameCard';
import axios from 'axios';
import moment from 'moment';

const TournamentMatches = () => {
  return (
    <AppView style={styles.mainContainer}>
      <AppView
        style={{
          height: height / 14,
          width: width / 1,
          //  backgroundColor: 'red'
        }}>
        <HeaderTwo />
      </AppView>
      <AppView style={styles.FirstContainer}>
        <AppView style={styles.FirstOneView}>
          <TouchableOpacity>
            <AppText style={styles.sportsText}>MATCH</AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
      <AppView style={styles.SecondContainer}>
        <AppView style={{height: height * 0.25, marginVertical: 13}}>
          <AppView style={styles.cardData}>
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={styles.calendarView}>
                <AppView style={styles.matchTimeContainer}>
                  <AppText style={styles.dateFormatStyle}>
                    <AppText>21</AppText>
                    {/* {moment(item.scheduled).format('DD')} */}
                  </AppText>
                  <AppText style={styles.monthFormatStyle}>
                    <AppText>May</AppText>
                    {/* {moment(item.scheduled).format('MMM')} */}
                  </AppText>
                  <AppText style={styles.timeFormatStyle}>
                    <AppText>22:30</AppText>
                    {/* {moment(item.scheduled).format('hh:mm')} */}
                  </AppText>
                </AppView>
              </AppView>

              <AppView style={styles.iccView}>
                <AppView>
                  <AppText style={styles.iccTxt}>ICC WorldCup 2021</AppText>
                  {/* <AppText style={styles.iccTxt}>{matchTitle}</AppText> */}
                </AppView>

                <AppView style={styles.matchDetailsCard}>
                  <AppView
                    style={[
                      styles.irelandTeamView,
                      {
                        width: width * 0.26,
                      },
                    ]}>
                    <AppText>Ireland</AppText>
                    {/* <AppText style={styles.leftSideTeamView}>
                  {item.away.name}
                </AppText> */}
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
                    <AppText>Netherland</AppText>
                    {/* <AppText style={styles.rightSideTeamView}>
                  {item.home.name}
                </AppText> */}
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
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>08</AppText>
                    {/* {moment(item.scheduled).format('hh')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    <AppText style={styles.watchTimeText}>21</AppText>
                    {/* <AppText style={styles.watchTimeText}> */}
                    {/* {moment(item.scheduled).format('mm')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>46</AppText>
                    {/* {moment(item.scheduled).format('ss')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                </AppView>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable style={styles.playBtnTouch} onPress={alert}>
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

        {/* Second Card     ///// */}

        <AppView style={{height: height * 0.25}}>
          <AppView style={styles.cardData}>
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={styles.calendarView}>
                <AppView style={styles.matchTimeContainer}>
                  <AppText style={styles.dateFormatStyle}>
                    <AppText>21</AppText>
                    {/* {moment(item.scheduled).format('DD')} */}
                  </AppText>
                  <AppText style={styles.monthFormatStyle}>
                    <AppText>May</AppText>
                    {/* {moment(item.scheduled).format('MMM')} */}
                  </AppText>
                  <AppText style={styles.timeFormatStyle}>
                    <AppText>22:30</AppText>
                    {/* {moment(item.scheduled).format('hh:mm')} */}
                  </AppText>
                </AppView>
              </AppView>

              <AppView style={styles.iccView}>
                <AppView>
                  <AppText style={styles.iccTxt}>ICC WorldCup 2021</AppText>
                  {/* <AppText style={styles.iccTxt}>{matchTitle}</AppText> */}
                </AppView>

                <AppView style={styles.matchDetailsCard}>
                  <AppView
                    style={[
                      styles.irelandTeamView,
                      {
                        width: width * 0.26,
                      },
                    ]}>
                    <AppText>Ireland</AppText>
                    {/* <AppText style={styles.leftSideTeamView}>
                  {item.away.name}
                </AppText> */}
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
                    <AppText>Netherland</AppText>
                    {/* <AppText style={styles.rightSideTeamView}>
                  {item.home.name}
                </AppText> */}
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
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>08</AppText>
                    {/* {moment(item.scheduled).format('hh')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    <AppText style={styles.watchTimeText}>21</AppText>
                    {/* <AppText style={styles.watchTimeText}> */}
                    {/* {moment(item.scheduled).format('mm')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>46</AppText>
                    {/* {moment(item.scheduled).format('ss')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                </AppView>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable style={styles.playBtnTouch} onPress={alert}>
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

        {/* Third card////// */}

        <AppView style={{height: height * 0.25, marginVertical: 13}}>
          <AppView style={styles.cardData}>
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={styles.calendarView}>
                <AppView style={styles.matchTimeContainer}>
                  <AppText style={styles.dateFormatStyle}>
                    <AppText>21</AppText>
                    {/* {moment(item.scheduled).format('DD')} */}
                  </AppText>
                  <AppText style={styles.monthFormatStyle}>
                    <AppText>May</AppText>
                    {/* {moment(item.scheduled).format('MMM')} */}
                  </AppText>
                  <AppText style={styles.timeFormatStyle}>
                    <AppText>22:30</AppText>
                    {/* {moment(item.scheduled).format('hh:mm')} */}
                  </AppText>
                </AppView>
              </AppView>

              <AppView style={styles.iccView}>
                <AppView>
                  <AppText style={styles.iccTxt}>ICC WorldCup 2021</AppText>
                  {/* <AppText style={styles.iccTxt}>{matchTitle}</AppText> */}
                </AppView>

                <AppView style={styles.matchDetailsCard}>
                  <AppView
                    style={[
                      styles.irelandTeamView,
                      {
                        width: width * 0.26,
                      },
                    ]}>
                    <AppText>Ireland</AppText>
                    {/* <AppText style={styles.leftSideTeamView}>
                  {item.away.name}
                </AppText> */}
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
                    <AppText>Netherland</AppText>
                    {/* <AppText style={styles.rightSideTeamView}>
                  {item.home.name}
                </AppText> */}
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
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>08</AppText>
                    {/* {moment(item.scheduled).format('hh')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    <AppText style={styles.watchTimeText}>21</AppText>
                    {/* <AppText style={styles.watchTimeText}> */}
                    {/* {moment(item.scheduled).format('mm')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                  <AppText style={styles.watchColonStyle}>:</AppText>
                  <AppView style={styles.timeOuterView}>
                    {/* <AppText style={styles.watchTimeText}> */}
                    <AppText style={styles.watchTimeText}>46</AppText>
                    {/* {moment(item.scheduled).format('ss')} */}
                    {/* {item.status} */}
                    {/* </AppText> */}
                  </AppView>
                </AppView>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable style={styles.playBtnTouch} onPress={alert}>
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
      </AppView>
    </AppView>
  );
};

export default TournamentMatches;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'grey',
  },
  FirstContainer: {
    height: height / 20,
    width: width / 1,
    backgroundColor: '#7A25CE',
    flexDirection: 'row',
  },
  FirstOneView: {
    height: height / 21,
    width: width / 2.9,
    backgroundColor: '#7A25CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportsText: {
    fontSize: height / 65,
    color: 'white',
    fontWeight: '500',
  },
  SecondContainer: {
    height: height / 1.22,
    width: width / 1,
    backgroundColor: 'white',
  },
  // Card Styling
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
    color: 'grey',
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

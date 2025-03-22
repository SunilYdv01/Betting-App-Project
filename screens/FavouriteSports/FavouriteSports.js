import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import {IrelandBall, NetherlandBall, Star, StarTwo} from '../../assets/icon';
import Button from '../../components/Button/Button';
const {height, width} = Dimensions.get('window');

const FavouriteSports = (props, {navigation, route}) => {
  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  return (
    <AppView style={styles.mainContainer}>
      <AppView style={{height: height * 0.08, width: width * 1}}>
        <HeaderTwo />
      </AppView>

      <ScrollView horizontal={true}>
        <AppView style={styles.mainConatiner2}>
          <Button />
          {/* <ScrollButton /> */}
          {/* <AppTouchable
            onPress={() => (history ? toggleHistory() : _toggleHistory())}>
            {history ? (
              <AppView style={[styles.mainInput, {width: width * 0.25}]}>
                <AppText style={styles.historytxt}>History</AppText>
              </AppView>
            ) : (
              <AppView style={[styles.mainInput2, {width: width * 0.25}]}>
                <AppText style={styles.historytxt2}>History</AppText>
              </AppView>
            )}
          </AppTouchable>

          </AppTouchable> */}
        </AppView>
      </ScrollView>

      <AppView style={styles.mainConatiner3}>
        {/* Card List */}
        <AppView style={styles.trendingTxtView}>
          <AppText style={styles.trendText}>Trending Tournaments</AppText>
        </AppView>
        <AppView style={styles.cardData}>
          <AppView style={{flexDirection: 'row'}}>
            <AppView style={styles.calendarView}>
              <AppText>21</AppText>
              <AppText>May</AppText>
              <AppText>22:30</AppText>
            </AppView>

            <AppView style={styles.iccView}>
              <AppView>
                <AppText style={styles.iccTxt}>ICC World Cup 2021</AppText>
              </AppView>

              <AppView style={{flexDirection: 'row', marginLeft: 15}}>
                <AppView style={styles.irelandTeamView}>
                  <AppText>Ireland</AppText>
                  <AppImage source={IrelandBall} />
                </AppView>
                <AppView style={styles.versusView}>
                  <AppText style={{backgroundColor: '#E8E8E8'}}>vs</AppText>
                </AppView>
                <AppView style={styles.irelandTeamView}>
                  <AppText>Netherland</AppText>
                  <AppImage source={NetherlandBall} style={{marginLeft: 15}} />
                </AppView>
              </AppView>
            </AppView>
          </AppView>

          <AppView
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.6,
              borderColor: 'rgb(15,15,15)',
            }}>
            <AppView style={styles.watchView}>
              <AppView>
                <AppText>Starts in</AppText>
              </AppView>
              <AppView>
                <AppText>08 :21: 46</AppText>
              </AppView>
            </AppView>
            <AppView style={styles.playBtnContainer}>
              <AppTouchable style={styles.playBtnTouch}>
                <AppText>Play</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
          <AppView style={styles.playerCountView}>
            <AppText style={{color: 'rgb(94,28,159)', fontSize: 12}}>
              12k+ players have already enrolled their Winner!
            </AppText>
          </AppView>
        </AppView>
      </AppView>

      <AppView style={styles.mainConatiner4}>
        <AppView style={{flexDirection: 'row'}}>
          <AppView style={styles.trendingTxtView}>
            <AppText
              style={{
                fontSize: 24,
                color: 'rgb(58,58,58)',
                marginHorizontal: 15,
              }}>
              Soccer
            </AppText>
          </AppView>
          <AppView style={styles.checkIcon}>
            <AppTouchable
              onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}>
              <AppImage
                source={iAgree ? Star : StarTwo}
                style={{height: 20, width: 20}}
              />
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>

      <ScrollView>
        <AppView style={styles.mainConatiner5}>
          {/* One */}
          <AppView style={styles.cardData}>
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={styles.calendarView}>
                <AppText>21</AppText>
                <AppText>May</AppText>
                <AppText>22:30</AppText>
              </AppView>

              <AppView style={styles.iccView}>
                <AppView>
                  <AppText style={styles.iccTxt}>ICC World Cup 2021</AppText>
                </AppView>

                <AppView style={{flexDirection: 'row', marginLeft: 15}}>
                  <AppView style={styles.irelandTeamView}>
                    <AppText>Ireland</AppText>
                    <AppImage source={IrelandBall} />
                  </AppView>
                  <AppView style={styles.versusView}>
                    <AppText style={{backgroundColor: '#E8E8E8'}}>vs</AppText>
                  </AppView>
                  <AppView style={styles.irelandTeamView}>
                    <AppText>Netherland</AppText>
                    <AppImage
                      source={NetherlandBall}
                      style={{marginLeft: 15}}
                    />
                  </AppView>
                </AppView>
              </AppView>
            </AppView>

            <AppView
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.6,
                borderColor: 'rgb(15,15,15)',
              }}>
              <AppView style={styles.watchView}>
                <AppView>
                  <AppText>Starts in</AppText>
                </AppView>
                <AppView>
                  <AppText>08 :21: 46</AppText>
                </AppView>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable style={styles.playBtnTouch}>
                  <AppText>Play</AppText>
                </AppTouchable>
              </AppView>
            </AppView>
            <AppView style={styles.playerCountView}>
              <AppText style={{color: 'rgb(94,28,159)', fontSize: 12}}>
                12k+ players have already enrolled their Winner!
              </AppText>
            </AppView>
          </AppView>

          {/* Two */}
          <AppView style={[styles.cardData, {marginTop: 10}]}>
            <AppView style={{flexDirection: 'row'}}>
              <AppView style={styles.calendarView}>
                <AppText>21</AppText>
                <AppText>May</AppText>
                <AppText>22:30</AppText>
              </AppView>

              <AppView style={styles.iccView}>
                <AppView>
                  <AppText style={styles.iccTxt}>ICC World Cup 2021</AppText>
                </AppView>

                <AppView style={{flexDirection: 'row', marginLeft: 15}}>
                  <AppView style={styles.irelandTeamView}>
                    <AppText>Ireland</AppText>
                    <AppImage source={IrelandBall} />
                  </AppView>
                  <AppView style={styles.versusView}>
                    <AppText style={{backgroundColor: '#E8E8E8'}}>vs</AppText>
                  </AppView>
                  <AppView style={styles.irelandTeamView}>
                    <AppText>Netherland</AppText>
                    <AppImage
                      source={NetherlandBall}
                      style={{marginLeft: 15}}
                    />
                  </AppView>
                </AppView>
              </AppView>
            </AppView>

            <AppView
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.6,
                borderColor: 'rgb(15,15,15)',
              }}>
              <AppView style={styles.watchView}>
                <AppView>
                  <AppText>Starts in</AppText>
                </AppView>
                <AppView>
                  <AppText>08 :21: 46</AppText>
                </AppView>
              </AppView>
              <AppView style={styles.playBtnContainer}>
                <AppTouchable style={styles.playBtnTouch}>
                  <AppText>Play</AppText>
                </AppTouchable>
              </AppView>
            </AppView>
            <AppView style={styles.playerCountView}>
              <AppText style={{color: 'rgb(94,28,159)', fontSize: 12}}>
                12k+ players have already enrolled their Winner!
              </AppText>
            </AppView>
          </AppView>
        </AppView>
      </ScrollView>
    </AppView>
  );
};

export default FavouriteSports;

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
    // backgroundColor: 'green',
  },
  mainConatiner3: {
    height: height * 0.3,
    width: width * 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingTxtView: {
    height: height * 0.05,
    width: width * 0.85,
    // backgroundColor: 'green',
    // justifyContent: 'flex-start',
  },
  trendText: {
    fontSize: 20,
    color: 'rgb(48,44,44)',
    marginHorizontal: 13,
  },
  cardData: {
    height: height * 0.22,
    width: width * 0.9,
    backgroundColor: '#E8E8E8',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  calendarView: {
    borderRightWidth: 1,
    height: height * 0.08,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iccView: {
    height: height * 0.08,
    width: width * 0.75,
    justifyContent: 'center',
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
    justifyContent: 'center',
    backgroundColor: 'rgb(89,189,91)',
  },
  playerCountView: {
    height: height * 0.04,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    height: height * 0.05,
    width: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainConatiner5: {
    height: height * 0.6,
    width: width * 1,
    // backgroundColor: 'cyan',
    padding: 10,
  },
});

import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  AppView,
  AppText,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
import {IrelandBall, NetherlandBall, Star, StarTwo} from '../../assets/icon';
const {height, width} = Dimensions.get('window');

const Button = ({props, navigation}) => {
  const [history, setHistory] = useState(true);
  const toggleHistory = () => {
    setHistory(false);
  };
  const _toggleHistory = () => {
    setHistory(true);
  };

  const [favSports, setFavSports] = useState(false);
  const toggleFavSports = () => {
    setFavSports(false);
  };
  const _toggleFavSports = () => {
    setFavSports(true);
  };

  const [inbox, setInbox] = useState(true);
  const toggleInbox = () => {
    setInbox(false);
  };
  const _toggleInbox = () => {
    setInbox(true);
  };

  return (
    <AppView>
      <ScrollView horizontal={true}>
        {/* <AppView style={styles.mainConatiner2}> */}
        <AppTouchable
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

        <AppTouchable
          onPress={() => (favSports ? toggleFavSports() : _toggleFavSports())}>
          {favSports ? (
            <AppView style={[styles.mainInput, {width: width * 0.42}]}>
              <AppText style={styles.historytxt}>Favourite sports</AppText>
            </AppView>
          ) : (
            <AppView style={[styles.mainInput2, {width: width * 0.42}]}>
              <AppTouchable
              // onPress={() => props.navigation.navigate('FavouriteSports')}
              >
                <AppText style={styles.historytxt2}>Favourite sports</AppText>
              </AppTouchable>
            </AppView>
          )}
        </AppTouchable>

        {/* <AppTouchable onPress={() => (inbox ? toggleInbox() : _toggleInbox())}>
          {inbox ? (
            <AppView style={[styles.mainInput, , {width: width * 0.25}]}>
              <AppText style={styles.historytxt}>Inbox (4)</AppText>
            </AppView>
          ) : (
            <AppView style={[styles.mainInput2, {width: width * 0.25}]}>
              <AppTouchable
                onPress={() => props.navigation.navigate('InboxScreen')}>
                <AppText style={styles.historytxt2}>Inbox (5)</AppText>
              </AppTouchable>
            </AppView>
          )}
        </AppTouchable> */}

        <AppTouchable onPress={() => (inbox ? toggleInbox() : _toggleInbox())}>
          {inbox ? (
            <AppView style={[styles.mainInput, , {width: width * 0.25}]}>
              <AppText style={styles.historytxt}>Inbox (4)</AppText>
            </AppView>
          ) : (
            <AppView style={[styles.mainInput2, {width: width * 0.25}]}>
              <AppText
                // onPress={() => props.navigation.navigate('InboxScreen')}
                style={styles.historytxt2}>
                Inbox (5)
              </AppText>
            </AppView>
          )}
        </AppTouchable>
        {/* </AppView> */}
      </ScrollView>
    </AppView>
  );
};

export default Button;

const styles = StyleSheet.create({
  mainInput: {
    height: height * 0.05,
    // width: width * 0.4,
    borderRadius: 10,
    borderWidth: 0.7,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  mainInput2: {
    height: height * 0.05,
    // width: width * 0.4,
    borderRadius: 10,
    borderWidth: 0.7,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(94,28,159)',
    margin: 8,
  },
  historytxt: {
    color: 'rgb(48,44,44)',
    fontSize: 18,
    fontWeight: '600',
  },
  historytxt2: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    fontWeight: '600',
  },
});

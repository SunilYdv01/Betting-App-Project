import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
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

const DATA = [
  {
    img: require('../../assets/images/cricket/cricket.png'),
    game: 'Cricket',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/soccerball/soccerball.png'),
    game: 'Soccer',
    task: '( 12 )',
  },
  {
    img: require('../../assets/images/FootBall/FootBall.png'),
    game: 'Football',
    task: '( 252 )',
  },
  {
    img: require('../../assets/images/tabletennis/tabletennis.png'),
    game: 'Table Tennis',
    task: '( 36 )',
  },
  {
    img: require('../../assets/images/hockey/hockey.png'),
    game: 'Hockey',
    task: '( 48 )',
  },
  {
    img: require('../../assets/images/handball/handball.png'),
    game: 'Handball',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/baketball/basketball.png'),
    game: 'Basketball',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/boxing/boxing.png'),
    game: 'Boxing',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/iceHockey/iceHockey.png'),
    game: 'Ice Hockey',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/AustralianRules/AustralianRules.png'),
    game: 'Australian Rules',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/badminton/badminton.png'),
    game: 'Badminton',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/cricket/cricket.png'),
    game: 'Cricket',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/AustralianRules/AustralianRules.png'),
    game: 'Rugby',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/soccerball/soccerball.png'),
    game: 'Soccer',
    task: '( 52 )',
  },
  {
    img: require('../../assets/images/cricket/cricket.png'),
    game: 'Cricket',
    task: '( 52 )',
  },
];
// const Item = ({item, img, tournamentname, game, task}) => (
//   <View style={styles.item}>
//     <View style={styles.ImageView}>
//       <TouchableOpacity>
//         <Image
//           resizeMode="contain"
//           style={styles.gameImage}
//           source={CricketBall}></Image>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.GameView}>
//       <Text style={styles.gameText}>{game}</Text>
//     </View>
//     <View style={styles.taskView}>
//       <Text style={styles.taskText}>{task}</Text>
//     </View>
//   </View>
// );

const AllSports = () => {
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
            <AppText style={styles.sportsText}>ALL SPORTS</AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
      <AppView style={styles.SecondContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({item}) => (
            <TouchableOpacity>
              <AppView style={styles.item}>
                <AppView style={styles.ImageView}>
                  <AppImage source={item.img} style={styles.imageContainer} />
                </AppView>
                <AppView style={styles.GameView}>
                  <AppText style={styles.gameText}>{item.game}</AppText>
                </AppView>
                <View style={styles.taskView}>
                  <Text style={styles.taskText}>{item.task}</Text>
                </View>
              </AppView>
            </TouchableOpacity>
          )}
        />
      </AppView>
    </AppView>
  );
};

export default AllSports;

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
    height: height / 1.3,
    backgroundColor: 'white',
    width: width / 1,
  },
  item: {
    // flex:1,
    width: width / 1,
    // marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 15,
    // borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  taskText: {
    fontSize: height / 54,
    color: '#rgb(145 ,143 ,143)',
    paddingHorizontal: 18,
  },
  gameText: {
    fontSize: height / 60,
    color: '#rgb(48, 44, 44)',
    paddingHorizontal: 18,
    fontWeight: '600',
  },
  taskView: {
    height: height / 15,
    width: width / 2.2,
    // backgroundColor:"green",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  GameView: {
    height: height / 15,
    width: width / 2.5,
    // backgroundColor:"red",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ImageView: {
    height: height / 15,
    width: width / 7.9,
    // backgroundColor:"yellow",
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameImage: {
    height: height / 44,
    width: 21,
  },
});

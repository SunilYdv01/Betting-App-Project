import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  SafeAreaView,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import {Dropdown} from 'react-native-material-dropdown';
import {
  IrelandBall,
  NetherlandBall,
  Star,
  BackArrowTwo,
} from '../../assets/icon';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../components/Loader';
import GameCard from '../../components/GameCard';

const APIKEY = '90599-mk3MsmiYHiqXz7';

const {height, width} = Dimensions.get('screen');

const DATA = [
  {
    tournamentname: 'English Premiere league ',
    game: 'Cricket',
    task: '( 2 )',
    // img: star,
  },
  {
    tournamentname: 'India Premiere league ',
    game: 'Cricket',
    task: '( 2 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league  ',
    game: 'Cricket',
    task: '( 5 )',
    // img: star,
  },
  {
    tournamentname: 'English vs India Test  ',
    game: 'Cricket',
    task: '( 1 )',
    // img: star,
  },
  {
    tournamentname: 'Australia Cup 2021',
    game: 'Cricket',
    task: '( 2 )',
    // img: star,
  },
  {
    tournamentname: 'West endies vs Bangladesh T20 ',
    game: 'Cricket',
    task: '( 5 )',
    // img: star,
  },
  {
    tournamentname: 'World Cup 2021',
    game: 'Cricket',
    task: '( 1 )',
    // img: star,
  },
  {
    tournamentname: 'West endies vs Bangladesh T20  ',
    game: 'Cricket',
    task: '( 5 )',
    // img: star,
  },
  {
    tournamentname: 'World Cup 2021 ',
    game: 'Cricket',
    task: '( 1 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 2 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 3 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 1 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 5 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 2 )',
    // img: star,
  },
  {
    tournamentname: 'Big Bash league ',
    game: 'Cricket',
    task: '( 5 )',
    // img: star,
  },
];

const AllSportsMatches = ({navigation}) => {
  // const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'ALL SPORTS'},
    {key: 'second', title: 'Tournament'},
    {key: 'third', title: 'MATCHES'},
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMatches, setLoadingMatches] = useState(false);

  const [availableSports, setAvailableSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [tournamentsList, setTournamentsList] = useState([]);
  const [allMatchesList, setAllMatchesList] = useState([]);
  const [selectedTorunament, setSelectedTorunament] = useState(null);
  const [availablematches, setAvailablematches] = useState([]);
  //   const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    // fetchSports();
  }, []);

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

  const fetchSelectedGame = async data => {
    setLoading(true);
    axios({
      method: 'get',
      // url: `https://api.b365api.com/v1/bet365/upcoming?sport_id=${gameType.sportId}&token=${APIKEY}`,
      url: 'https://api.b365api.com/v1/bet365/upcoming',
      params: {
        sport_id: data.sportId,
        token: APIKEY,
        // cc: 'us',
      },
    })
      .then(res => {
        console.log('------result----->>>>', res.data.results);

        if (res.status === 200) {
          const uniqueData = [
            ...res.data.results
              .reduce((map, obj) => map.set(obj.league.id, obj), new Map())
              .values(),
          ];
          console.log('uniqueData------------- ', uniqueData);
          setTournamentsList(uniqueData);
          setAllMatchesList(res.data.results);
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

  const onSelectTournament = item => {
    console.log('step --------- 1 ', allMatchesList);
    let tempArr = [...allMatchesList];
    let resultArr = [];
    console.log('step 2 ---------- ', item, tempArr);
    tempArr.forEach(subItem => {
      subItem.league.id === item.league.id ? resultArr.push(item) : null;
    });
    console.log('matches ----------------- ', resultArr);
    setAvailablematches(resultArr);
    setIndex(2);
  };
  const FirstRoute = () => (
    <AppView style={styles.SecondContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={availableSports}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedSport(item);
              setIndex(1);
              fetchSelectedGame(item);
            }}>
            <AppView style={styles.item1}>
              <AppView style={styles.ImageView1}>
                {/* <AppImage source={item.img} style={styles.imageContainer} /> */}
              </AppView>
              <AppView style={styles.GameView1}>
                <AppText style={styles.gameText1}>{item.gameName}</AppText>
              </AppView>
              <View style={styles.taskView1}>
                {/* <Text style={styles.taskText}>{item.task}</Text> */}
              </View>
            </AppView>
          </TouchableOpacity>
        )}
      />
    </AppView>
  );

  const SecondRoute = () => (
    <AppView
      style={{
        height: height / 1.4,
        backgroundColor: 'white',
        width: width / 1,
      }}>
      {isLoading ? (
        <View style={{marginTop: 60}}>
          <Loader />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tournamentsList}
          renderItem={renderTournamentItem}
        />
      )}
    </AppView>
  );

  const renderTournamentItem = ({item}) => {
    console.log('render item 1 -------- ', item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onSelectTournament(item)}>
        <View style={styles.tournamentgameView}>
          <Text style={styles.tournamentnameText}>{item.league.name}</Text>
          <Text style={styles.gameText}>{selectedSport.gameName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ThirdRoute = () => (
    <View style={{flex: 1, marginVertical: 10}}>
      {availablematches ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={availablematches}
          renderItem={({item, index}) => (
            <GameCard
              item={item}
              onPlayPress={() =>
                navigation.navigate('PlaceYourBet', {item: item})
              }
            />
          )}
        />
      ) : null}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 4,
      }}
      style={{backgroundColor: 'rgb(94,28,159)'}}
    />
  );
  return (
    <SafeAreaView>
      <View
        style={{
          height: height / 1,
        }}>
        <AppView
          style={{
            height: height / 14,
            width: width / 1,
          }}>
          <Header
            head={false}
            backImage={BackArrowTwo}
            headerText2={'All Sports'}
            favImage={Star}
            onPress2={() => navigation.goBack()}
          />
        </AppView>
        <AppView style={{alignSelf: 'center', marginVertical: 15}}>
          <AppText>Available Balance</AppText>
          <AppView>
            <AppText style={{textAlign: 'center'}}>1000 TOKEN</AppText>
            <AppText style={{textAlign: 'center'}}>1000 TOKEN</AppText>
          </AppView>
        </AppView>
        <AppView style={{flex: 1, width: width / 1, marginBottom: 20}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            contentContainerStyle={{backgroundColor: 'red'}}
            inactiveColor="black"
            activeColor="white"
            renderTabBar={renderTabBar}
          />
        </AppView>
      </View>
    </SafeAreaView>
  );
};

export default AllSportsMatches;
const styles = StyleSheet.create({
  item: {
    // flex:1,
    width: width / 1,
    // marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  tournamentnameText: {
    fontSize: height / 60,
    color: 'black',
    fontWeight: '600',
    //   width:width/2.2,
    // //   backgroundColor:"green",
    //   textAlign:"right",
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
  starImage: {
    height: height / 40,
    width: 20,
  },
  taskText: {
    fontSize: height / 54,
    color: 'black',
    paddingHorizontal: 18,
  },
  gameText: {
    fontSize: height / 60,
    color: 'black',
    paddingHorizontal: 18,
  },
  tournamentgameView: {
    height: height / 12,
    width: width / 1.7,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  taskStarView: {
    height: height / 12,
    width: width / 2.7,
    // backgroundColor:"green",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  SecondContainer: {
    height: height / 1.3,
    backgroundColor: 'white',
    width: width / 1,
  },
  item1: {
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
  taskText1: {
    fontSize: height / 54,
    color: '#rgb(145 ,143 ,143)',
    paddingHorizontal: 18,
  },
  gameText1: {
    fontSize: height / 60,
    color: '#rgb(48, 44, 44)',
    paddingHorizontal: 18,
    fontWeight: '600',
  },
  taskView1: {
    height: height / 15,
    width: width / 2.2,
    // backgroundColor:"green",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  GameView1: {
    height: height / 15,
    width: width / 2.5,
    // backgroundColor:"red",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ImageView1: {
    height: height / 15,
    width: width / 7.9,
    // backgroundColor:"yellow",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

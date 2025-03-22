import React, {useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../../components/molecules/Header';
// import HeaderTwo from '../../components/molecules/HeaderTwo'
import {AppView, AppImage, AppText} from '../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import {BackArrow, printer} from '../../assets/icon';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const DATA = [
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '13 Sep,2021',
    img2: require('../../assets/images/clock/clock.png'),
    matchstatus: 'Declared',
  },
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '13 Sep,2021',
    img2: require('../../assets/images/clock/clock.png'),
    matchstatus: 'Declared',
  },
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '13 Sep,2021',
    img2: require('../../assets/images/clock/clock.png'),
    matchstatus: 'Cancelled',
  },
];

const DATA1 = [
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '13 May,2021',
    img2: require('../../assets/images/tick/tick.png'),
    matchstatus: 'Declared',
  },
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '13 June,2021',
    img2: require('../../assets/images/tick/tick.png'),
    matchstatus: 'Declared',
  },
  {
    img: require('../../assets/images/User/User.png'),
    name: 'Daniel_123',
    tournamentname: 'ICC World Cup 2021',
    firstteam: 'Ireland',
    vs: 'vs',
    secondteam: 'Netherland',
    gamestatus: 'Game played : ',
    gameday: '15 June,2021',
    img2: require('../../assets/images/cancel/cancel.png'),
    matchstatus: 'Cancelled',
  },
];

const FirstRoute = () => (
  <AppView style={styles.mainContainer}>
    <AppView style={styles.SecondContainer}>
      <AppText
        style={{
          fontSize: height / 55,
          color: '#rgb(58 ,58 ,58)',
          paddingLeft: 14,
        }}>
        Showing 3 Bets
      </AppText>
    </AppView>
    <AppView style={styles.ThirdContaier}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({item}) => (
          <TouchableOpacity>
            <AppView style={styles.item}>
              <View style={styles.Image1View}>
                <Image
                  resizeMode="contain"
                  source={item.img}
                  style={styles.imageContainer}
                />
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
              <View style={styles.MatchView}>
                <View style={styles.WorldcupView}>
                  <AppText style={styles.worlcupText}>
                    {item.tournamentname}
                  </AppText>
                </View>
                <View style={styles.teamView}>
                  <Text style={styles.teamText}>{item.firstteam}</Text>
                  <Text style={styles.teamText}>{item.vs}</Text>
                  <Text style={styles.teamText}>{item.secondteam}</Text>
                </View>
                <View style={styles.matchtime}>
                  <Text style={styles.gameText}>{item.gamestatus}</Text>
                  <Text style={styles.game1Text}>{item.gameday}</Text>
                </View>
              </View>

              <View style={styles.clockView}>
                <Image
                  source={item.img2}
                  style={styles.Image2container}></Image>
                <Text style={styles.matchText}>{item.matchstatus}</Text>
              </View>
            </AppView>
          </TouchableOpacity>
        )}
      />
    </AppView>
    <AppView style={styles.FourthContainer}>
      <AppText style={{fontSize: height / 60, color: 'black'}}>
        **Your choice has been highlighted in{' '}
      </AppText>
      <AppText style={{fontSize: height / 60, color: 'green'}}>Green**</AppText>
    </AppView>
  </AppView>
);

const SecondRoute = () => (
  <AppView style={styles.mainContainer}>
    <AppView style={styles.SecondContainer}>
      <AppText
        style={{
          fontSize: height / 55,
          color: '#rgb(58 ,58 ,58)',
          paddingLeft: 14,
        }}>
        Showing 3 Bets
      </AppText>
    </AppView>
    <AppView style={styles.ThirdContaier}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA1}
        renderItem={({item}) => (
          <TouchableOpacity>
            <AppView style={styles.item}>
              <View style={styles.Image1View}>
                <Image
                  resizeMode="contain"
                  source={item.img}
                  style={styles.imageContainer}
                />
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
              <View style={styles.MatchView}>
                <View style={styles.WorldcupView}>
                  <AppText style={styles.worlcupText}>
                    {item.tournamentname}
                  </AppText>
                </View>
                <View style={styles.teamView}>
                  <Text style={styles.teamText}>{item.firstteam}</Text>
                  <Text style={styles.teamText}>{item.vs}</Text>
                  <Text style={styles.teamText}>{item.secondteam}</Text>
                </View>
                <View style={styles.matchtime}>
                  <Text style={styles.gameText}>{item.gamestatus}</Text>
                  <Text style={styles.game1Text}>{item.gameday}</Text>
                </View>
              </View>

              <View style={styles.clockView}>
                <Image
                  source={item.img2}
                  style={styles.Image2container}></Image>
                <Text style={styles.matchText}>{item.matchstatus}</Text>
              </View>
            </AppView>
          </TouchableOpacity>
        )}
      />
    </AppView>
    <AppView style={styles.FourthContainer}>
      <AppText style={{fontSize: height / 60, color: 'black'}}>
        **Your choice has been highlighted in{' '}
      </AppText>
      <AppText style={{fontSize: height / 60, color: 'green'}}>Green**</AppText>
    </AppView>
  </AppView>
);

const YourBetHistory = props => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Active games'},
    {key: 'second', title: 'History'},
  ]);

  // useEffect(() => {
  //   bettdetailsView();
  // }, []);

  //   const betdetailsView = async() => {
  //     const value = await AsyncStorage.getItem('token');

  //      axios({
  //       method: 'get',
  //       url: `https://java-create-token.mobiloitte.org:4094/account/view-bet-details`,
  //       headers: {
  //         Authorization: `Bearer ${value}`,
  //       },
  //       params:{
  //  betId:Betid
  //       }
  //     })
  //       .then(res => {
  //         if (res.status === 200) {
  //           console.log('apii banner ------------- >>>>>', res.data.data);

  //           setBannerData([...bannerData, ...res.data.data])
  //           console.log('api banner2  ========>>>>>>>', bannerData);

  //         }

  //          else {
  //           alert('Something went wrong');
  //         }
  //       })
  //       .catch(err => console.log('error catch---->>>>', err));

  //   };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'grey',
        alignSelf: 'center',
        height: 5,
        color: 'green',
        fontSize: height / 59,
        width: width / 2,
      }}
      style={{backgroundColor: '#7A25CE'}}
    />
  );
  return (
    <SafeAreaView>
      <AppView style={styles.mainContainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
            //  backgroundColor: 'red'
          }}>
          <Header
            head={false}
            headerText2={'Your Bets'}
            backImage={BackArrow}
            // finalImage={printer}
            onPress2={() => props.navigation.goBack()}
            // onPress4={()=> props.navigation.navigate("AllTransaction")}
          />
        </AppView>
        <AppView style={{height: height / 1.1, width: width / 1}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            contentContainerStyle={{backgroundColor: 'white'}}
            inactiveColor="black"
            activeColor="brown"
            renderTabBar={renderTabBar}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default YourBetHistory;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'red',
  },
  FirstRouteMainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245 ,245 ,245)',
  },
  SecondContainer: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  FirstContainer: {
    height: height / 20,
    width: width / 1,
    backgroundColor: '#7A25CE',
    flexDirection: 'row',
  },
  FirstOneView: {
    height: height / 21,
    width: width / 2,
    backgroundColor: '#7A25CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FirstTwoView: {
    height: height / 21,
    width: width / 2,
    backgroundColor: '#7A25CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportsText: {
    fontSize: height / 54,
    color: 'white',
    fontWeight: '500',
  },
  ThirdContaier: {
    height: height / 2.5,
    width: width / 1,
    //   backgroundColor:"cyan",
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    // flex:1,
    width: width / 1.1,
    marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 9,
    // borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  Image1View: {
    height: height / 8,
    width: width / 5.5,
    //   backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: height / 18,
    width: width / 10,
  },
  nameText: {
    fontSize: height / 85,
    paddingVertical: 5,
  },
  MatchView: {
    height: height / 10,
    width: width / 1.8,
    //   backgroundColor:"green"
  },
  WorldcupView: {
    height: height / 31,
    width: width / 2.7,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamView: {
    height: height / 27,
    width: width / 1.8,
    // backgroundColor:"cyan",
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchtime: {
    height: height / 35,
    width: width / 2.22,
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  teamText: {
    color: 'black',
    fontSize: height / 55,
    paddingHorizontal: 10,
  },
  gameText: {
    color: '#rgb(94, 28, 159)',
    fontSize: height / 70,
    paddingLeft: 11,
  },
  game1Text: {
    color: '#rgb(94, 28, 159)',
    fontSize: height / 70,
  },
  clockView: {
    height: height / 10,
    width: width / 7,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image2container: {
    height: height / 40,
    width: width / 19,
    marginVertical: 7,
  },
  matchText: {
    fontSize: height / 85,
    color: 'black',
  },
  FourthContainer: {
    height: height / 23,
    width: width / 1,
    // backgroundColor:'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

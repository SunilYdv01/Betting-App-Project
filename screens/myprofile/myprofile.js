import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../components/Atom/atom';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import Header from '../../components/molecules/Header';
import {
  profileicon,
  redface,
  well,
  lamp,
  Bomb,
  greenStar,
  target,
  daimond,
  SearchIcon,
  BackArrow,
  next,
} from '../../assets/icon';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import TabNavigator from '../../Navigator/TabNavigator';
const {height, width} = Dimensions.get('screen');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const DATA = [
  {
    img: require('../../assets/images/redFace/redFace.png'),
  },
  {
    img: require('../../assets/images/well/well.png'),
  },
  {
    img: require('../../assets/images/lamp/lamp.png'),
  },
  {
    img: require('../../assets/images/Bomb/Bomb.png'),
  },
  {
    img: require('../../assets/images/greenStar/greenStar.png'),
  },
  {
    img: require('../../assets/images/target/target.png'),
  },
  {
    img: require('../../assets/images/daimond/daimond.png'),
  },
];

const DATA2 = [
  {
    num: '60%',
    badges: 'Win Rate',
  },
  {
    num: '23',
    badges: 'Streak',
  },
  {
    num: '5.40',
    badges: 'Prediction',
  },
  {
    num: '232',
    badges: 'Winings',
  },
  {
    num: '107',
    badges: 'Loses',
  },
  {
    num: '13M',
    badges: 'Earned',
  },
];

const DATA3 = [
  {
    value: '20',
    text: 'Followers',
  },
  {
    value: '14',
    text: 'Following',
  },
];

const Myprofile = props => {
  // const [updateProfileDetails,setUpdateProfileDetails] =useState(  props.route.params.updateProfileDetails ? props.route.params.updateProfileDetails : null);
  // console.log("update profileee------->>>>>",updateProfileDetails);
  console.log('hellooooooo-------', props.route.params);
  const [userProfile, setUserProfile] = useState([]);
  const [achivementDetails, setAchivementDetails] = useState([]);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [streakValue, setStreakValue] = useState([]);
  const [winPercentageAmount, setWinPercentageAmount] = useState([]);
  const [predictionTime, setPredictionTime] = useState([]);
  const [winningLossEarned, setWinningLossEarned] = useState([]);

  useEffect(() => {
    userprofiledetails();
    achivementsofUser();
    followerofUser();
    followingofUser();
    streakdetails();
    predictionValue();
    winpercentageValue();
    winninglossEarnedata();
  }, []);

  // ******** profile details api   *************
  const userprofiledetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/my-account`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('userprofile ------------- >>>>>', res.data.data);
          setUserProfile(res.data.data);
          console.log('userprofile2222----yash-->>>', userProfile);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // console.log("userprofile2222----yash-->>>",userProfile);
  // ******** achivement  api   *************

  const achivementsofUser = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/get-list-achivement?achivementId=45`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Achivementslist ------------- >>>>>', res.data);
          setAchivementDetails(res.data.data);
          console.log(
            'achivementlist --------  11111111>>>>',
            achivementDetails,
          );
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // ******** follower api   *************

  const followerofUser = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/get-follower-friend-name`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('api follower ------------- >>>>>', res.data);

          // setFollower( ...res.data.data)
          // console.log("followerlist --------->>>>",follower);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // ******** following api   *************

  const followingofUser = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/get-following-friend-name`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('api following ------------- >>>>>', res.data);
          // setFollowing(...res.data.data)
          // console.log("following api ------->>>",following);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // streak Api ****************

  const streakdetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-streak`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('streak ------------- >>>>>', res.data.data);
          setStreakValue(res.data.data);
          console.log('Streak1111111------->>>', streakValue);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // Prediction Api ****************

  const predictionValue = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-prediction`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('prediction ------------- >>>>>', res.data.data);
          // setStreakValue(res.data.data.data)
          // console.log("Streak1111111------->>>",streakValue);
          setPredictionTime(res.data.data);
          console.log('prediction1111------------>>>>>', predictionTime);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // Winpercentage Api ****************

  const winpercentageValue = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);
    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-win-percentage`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Winpercentage ------------- >>>>>', res.data.data);
          // setStreakValue(res.data.data.data)
          // console.log("Streak1111111------->>>",streakValue);
          setWinPercentageAmount(res.data.data);
          console.log('winpercentage111111--------->>>>', winPercentageAmount);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  // Winning loss earned Api ****************

  const winninglossEarnedata = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-earn-win-loss`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Winninglossearned ------------- >>>>>', res.data.data);
          // setStreakValue(res.data.data.data)
          // console.log("Streak1111111------->>>",streakValue);
          setWinningLossEarned(res.data.data);
          console.log('Winninglossearned11111------->>>', winningLossEarned);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  return (
    <SafeAreaView>
      <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 13,
            width: width / 1,
            // backgroundColor: 'yellow',
          }}>
          <Header
            head={false}
            headerText2={'My Profile'}
            backImage={BackArrow}
            // finalImage={printer}
            onPress2={() => props.navigation.goBack()}
            // onPress4={()=> props.navigation.navigate("AllTransaction")}
          />
        </AppView>
        <KeyboardAwareScrollView>
          <AppView style={styles.FirstContainer}>
            <AppView style={styles.FirstOneView}>
              <AppView style={styles.profileiconView}>
                <AppView style={styles.iconmainView}>
                  <AppImage
                    style={{height: height / 17, width: width / 7.9}}
                    source={profileicon}
                    // source={{uri:userProfile.imageUrl}}
                    // source={ userProfile.imageUrl=== " "  ?    require("../../../src/assets/images/profileicon/profileicon.png")   :    require({})}
                  ></AppImage>
                </AppView>
                <AppView style={styles.nameView}>
                  <AppText
                    style={{
                      fontSize: height / 55,
                      fontWeight: '700',
                      color: '#rgb(94,28,159)',
                      marginVertical: 2,
                    }}>
                    {userProfile.firstName} {userProfile.lastName}
                  </AppText>
                  <AppText
                    style={{
                      fontSize: height / 55,
                      fontWeight: '700',
                      color: '#rgb(115 ,112, 112)',
                    }}>
                    {userProfile.userName}
                  </AppText>
                </AppView>
                <AppView
                  style={{
                    height: height / 13,
                    width: width / 4.5,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.navigate("Login")
                      props.navigation.navigate({
                        name: 'ProfileScreen',
                        params: {viewProfileDetails: userProfile},
                        // merge: true,
                      });
                    }}>
                    <AppText
                      style={{fontSize: height / 65, color: '#rgb(94,28,159)'}}>
                      Edit Profile
                    </AppText>
                  </TouchableOpacity>
                </AppView>
              </AppView>
              <AppView style={styles.FollowersFollowingMainView}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA3}
                  numColumns={2}
                  renderItem={({item}) => (
                    <View style={styles.item2}>
                      <View
                        style={{
                          height: height / 45,
                          width: width / 4.5,
                          // backgroundColor: 'cyan',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: height / 52,
                            fontWeight: '700',
                            color: '#rgb(94,28,159)',
                          }}>
                          {item.value}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: height / 30,
                          width: width / 4.5,
                          // backgroundColor: 'green',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontWeight: '700',
                            color: 'grey',
                          }}>
                          {item.text}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </AppView>
              <AppView style={styles.FirstTwoView}>
                <AppText
                  style={{
                    fontSize: height / 50,
                    marginHorizontal: 18,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  Achievements :-
                </AppText>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Achievements')}>
                  <AppText
                    style={{
                      fontSize: height / 55,
                      marginHorizontal: 18,
                      // fontWeight: '700',
                      color: '#rgb(94,28,159)',
                      width: width / 1.99,
                      // backgroundColor: 'green',
                      textAlign: 'right',
                    }}>
                    View all
                  </AppText>
                </TouchableOpacity>
              </AppView>
              <AppView
                style={{
                  height: height / 10,
                  width: width / 1,
                  //   backgroundColor: 'yellow',
                  // flexDirection:"row",
                  alignItems: 'center',
                }}>
                <FlatList
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  data={achivementDetails}
                  renderItem={({item}) => (
                    <View style={styles.item}>
                      <View style={styles.imageView}>
                        <Image
                          resizeMode="contain"
                          style={styles.imagestyle}
                          source={{uri: item.batchUrl}}
                        />
                      </View>
                    </View>
                  )}
                />
              </AppView>
            </AppView>
          </AppView>
          <AppView style={styles.SecondContainer}>
            <AppView style={styles.SecondOneView}>
              <AppText
                style={{
                  fontSize: height / 48,
                  marginHorizontal: 18,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Stats :-
              </AppText>
            </AppView>
            <AppView style={styles.SecondTwoView}>
              <View style={styles.FirstStatsView}>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    marginHorizontal: 23,
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {winPercentageAmount.winPercent}%
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Win Rate
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {streakValue.loss}
                    {streakValue.win}
                    {streakValue.NO}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Streak
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    marginHorizontal: 23,
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {predictionTime.prediction}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Prediction
                  </Text>
                </View>
              </View>
              <View style={styles.SecondStatsView}>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    marginHorizontal: 23,
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {winningLossEarned.win}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Winnings
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {winningLossEarned.lossMatch}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Loses
                  </Text>
                </View>
                <View
                  style={{
                    height: height / 12,
                    width: width / 4,
                    backgroundColor: 'white',
                    marginHorizontal: 23,
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'purple',
                      fontSize: height / 50,
                      fontWeight: '700',
                    }}>
                    {winningLossEarned.earn}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: height / 55,
                      fontWeight: '700',
                      marginVertical: 3,
                    }}>
                    Earned
                  </Text>
                </View>
              </View>

              {/* <FlatList
                // showsVerticalScrollIndicator={false}
                data={DATA2}
                numColumns={3}
                renderItem={({item}) => (
                  <View style={styles.item1}>
                    <View
                      style={styles.numView}>
                      <Text style={{fontSize:height/55,fontWeight:"700",color:"#rgb(94,28,159)"}}>{item.num}</Text>
                    </View>
                    <View
                      style={{
                        height: height / 25,
                        width: width / 4.5,
                        // backgroundColor: 'green',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize:height/55,fontWeight:"700",color:"grey"}}>{item.badges}</Text>
                    </View>
                  </View>
                )}
              /> */}
            </AppView>
          </AppView>
          <AppView style={styles.ThirdMainView}>
            <AppView style={styles.ThirdOneView}>
              <AppView style={styles.thirdfirstview}>
                <AppImage
                  resizeMode="contain"
                  style={{
                    height: height / 44,
                    width: width / 22,
                    tintColor: 'grey',
                  }}
                  source={SearchIcon}></AppImage>
              </AppView>
              <AppView style={styles.thirdtwoView}>
                <TextInput
                  style={{color: 'black', fontSize: height / 60}}
                  placeholderTextColor="grey"
                  placeholder="Find more friends"></TextInput>
              </AppView>
              <AppView style={styles.thirdthreeView}>
                <AppImage
                  resizeMode="contain"
                  style={{height: height / 56, width: width / 28}}
                  source={next}></AppImage>
              </AppView>
            </AppView>
          </AppView>
        </KeyboardAwareScrollView>
        <AppView
          style={{
            height: height / 8,
            width: width / 1,
            // backgroundColor: 'red',
            justifyContent: 'flex-start',
          }}>
          {/* <TabNavigator /> */}
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default Myprofile;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstContainer: {
    height: height / 2.8,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
    // backgroundColor:"red"
  },
  FirstOneView: {
    height: height / 3,
    width: width / 1,
    backgroundColor: 'white',
    marginTop: height / 70,
    position: 'absolute',
    alignItems: 'center',
  },
  profileiconView: {
    height: height / 13,
    width: width / 1.1,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  FollowersFollowingMainView: {
    height: height / 12,
    width: width / 1.1,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconmainView: {
    height: height / 13,
    width: width / 5,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameView: {
    height: height / 13,
    width: width / 2,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  followerMainView: {
    height: height / 11,
    width: width / 2.5,
    // backgroundColor:"red",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  followingMainView: {
    height: height / 11,
    width: width / 3,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingView: {
    height: height / 13,
    width: width / 4.5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followerView: {
    height: height / 13,
    width: width / 4.5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FirstTwoView: {
    height: height / 15,
    width: width / 1,
    // backgroundColor: 'red',
    // justifyContent:"center",
    alignItems: 'center',
    flexDirection: 'row',
  },
  SecondContainer: {
    height: height / 3,
    width: width / 1,
    // backgroundColor:"green"
  },
  SecondOneView: {
    height: height / 22,
    width: width / 1,
    // backgroundColor:"yellow",
    justifyContent: 'center',
  },
  SecondTwoView: {
    height: height / 4,
    width: width / 1,
    // backgroundColor: 'cyan',
    // alignItems: 'center',
    // flexDirection:"row",
    // justifyContent: 'center',
  },
  SecondThreeView: {
    height: height / 8,
    width: width / 1,
    // backgroundColor:"green",
    alignItems: 'center',
    flexDirection: 'row',
  },
  twofirstView: {
    height: height / 10,
    width: width / 4.5,
    backgroundColor: '#rgb(245,245,245)',
    borderRadius: 10,
    marginHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.7,
  },
  twosecondView: {
    height: height / 10,
    width: width / 4.5,
    backgroundColor: '#rgb(245,245,245)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.7,
  },
  twothirdView: {
    height: height / 10,
    width: width / 4.5,
    backgroundColor: '#rgb(245,245,245)',
    borderRadius: 10,
    marginHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.7,
  },
  ThirdMainView: {
    height: height / 10,
    width: width / 1,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThirdOneView: {
    height: height / 14,
    width: width / 1.2,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 0.7,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  thirdfirstview: {
    height: height / 14,
    width: width / 7,
    //   backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdthreeView: {
    height: height / 14,
    width: width / 10,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  thirdtwoView: {
    height: height / 14,
    width: width / 1.8,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  item: {
    // flex:1,
    width: width / 7.5,
    // marginVertical: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: 'red',
    // alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    // borderColor:"grey",
    // borderWidth:0.8,
    marginHorizontal: 5,
  },
  item1: {
    // flex:1,
    width: width / 4,
    margin: 10,
    // alignSelf: 'flex-start',
    // flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    justifyContent: 'center',
  },
  numView: {
    height: height / 25,
    width: width / 5,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    // flex:1,
    width: width / 4.5,
    margin: 8,
    // alignSelf: 'flex-start',
    // flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 14,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    justifyContent: 'center',
  },
  FirstStatsView: {
    height: height / 9,
    width: width / 1,
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'center',
  },
  SecondStatsView: {
    height: height / 9,
    width: width / 1,
    // backgroundColor:"blue",
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagestyle: {
    height: height / 14,
    width: width / 7,
  },
  imageView: {
    height: height / 5,
    width: width / 6.8,
  },
});

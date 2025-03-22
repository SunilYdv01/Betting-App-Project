import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
const {height, width} = Dimensions.get('screen');
import {profileicon, user, blueuser, cross} from '../../assets/icon';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import TabNavigator from '../../Navigator/TabNavigator';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader'

const DATA4 = [
  {
    num: '60%',
    badges: 'Win Rate',
  },
  {
    num: 'W5',
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
];

let DATA = [
  {
    no: '1',
    name: 'Umair',
    amount: '64.3M',
  },
  {
    no: '2',
    name: 'Ravi',
    amount: '65.2M',
  },
  {
    no: '3',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '4',
    name: 'Ashish',
    amount: '66.2M',
  },
  {
    no: '5',
    name: 'Ravi',
    amount: '65.2M',
  },
  {
    no: '6',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '7',
    name: 'Ashish',
    amount: '66.2M',
  },
  {
    no: '8',
    name: 'Ravi',
    amount: '65.2M',
  },
  {
    no: '9',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '10',
    name: 'Ashish',
    amount: '66.2M',
  },
  {
    no: '11',
    name: 'Ashish',
    amount: '65.2M',
  },
  {
    no: '12',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '13',
    name: 'Ashish',
    amount: '66.2M',
  },
  {
    no: '14',
    name: 'Ashish',
    amount: '65.2M',
  },
  {
    no: '15',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '16',
    name: 'Ashish',
    amount: '66.2M',
  },
];
let DATA1 = [
  {
    no: '1',
    name: 'Umair',
    amount: '64.3M',
  },
  {
    no: '2',
    name: 'Ashish',
    amount: '65.2M',
  },
  {
    no: '3',
    name: 'Yash',
    amount: '65.5M',
  },
  {
    no: '4',
    name: 'Ashish',
    amount: '66.2M',
  },
];

const FirstRoute = (props,{navigation,route}) => {
  console.log('===my props===', props.props);
  const[isLoading,setLoading] =useState(false);

  
  // const [ravi,setRavi] =useState(  props.route.params.ravi? props.route.params.ravi : null);
  const [modalVisible, setModalVisible] = useState(false);
  const [globalList, setGlobalList] = useState([]);
  const [globalListRank, setGlobalListRank] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [winningAmount, setWinningAmount] = useState([]);
  const [userid, setUserId] = useState([]);
  const [winningPercentageAmount, setwinningPercentageamount] = useState([]);
  const [streakUser, setStreakUser] = useState([]);
  const [predictionCorrect, setPredictionCorrect] = useState([]);

  useEffect(() => {
    globalCheckpersonName();
    userprofiledetails();
    winningamount();
    winningPercentage();
    streakofotheruser();
    predictionamount();
  }, []);




// function list () {
  
//     let listdata = [];
//     let i = 0;
//     console.log("heehehehe---1---->>>>",globalList);
//     for (let item of globalList) {
//       // for (let anyt of cartList) {
//       // if (item.globalList.userId == anyt.userId) {
//       console.log('heehehehe------->>>>', item.listdata[0]);
//       listdata[i] = item;
//       i++;
//     }
//     // }
//     // }
//     // setFilterData(list)
  
// }
  // global list or rank ****************

  const globalCheckpersonName = async (item) => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);
    setLoading(true);
    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/find-rank-in-global`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('======globallist2222=====>>>>>', res.data.data);
          // console.log("---------------------------->",res.data.data.list[0].userid);
          setGlobalList(res.data.data.list);
       
          // console.log('===setGlobalList===>>>', res.data.data.list);
          setGlobalListRank(res.data.data.rank);       
        } else {
          alert('Something went wrong');

          setLoading(false);
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
      setLoading(false);
  };
  globalList.map(item=>console.log("0000000000000000000",item));
  console.log('========globallistdata=======>>>>>', globalList);
  console.log(('global rank-------->>>', globalListRank));


  // winning Amount *******************

  const winningamount = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-earn-win-loss-other-user?userId=119`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('winning ------------- >>>>>', res.data.data);
          setWinningAmount(res.data.data);
          console.log('winning-------11111>>>', winningAmount);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch winning---->>>>', err));
  };

  // winning Percentage ******************

  const winningPercentage = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-win-percentage-other-user?userId=119`,
     
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('winningPercentage ------------- >>>>>', res.data.data);
          setwinningPercentageamount(res.data.data);
          console.log(
            'winningPercentage11111111-------->>>',
            winningPercentageAmount,
          );
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch winning---->>>>', err));
  };

  // streak of user**********

  const streakofotheruser = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-streak-other-user?userId=116`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('streak ------------- >>>>>', res.data.data);

          setStreakUser(res.data.data);
          console.log('streak1111111-------->>>>', streakUser);
          // setWinningAmount(res.data.data)
          // console.log("winning-------11111>>>",winningAmount);

          // setGlobalList( res.data.data.list)
          //  console.log('globallist22222 ---- >>>>>',globalList);
          //   setGlobalListRank(res.data.data.rank)
          //   console.log(("global rank-------->>>",globalListRank));
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch winning---->>>>', err));
  };


 







  //  Prediction ****************

  const predictionamount = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/stats-api-prediction-other-user?userId=119`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Prediction------------- >>>>>', res.data.data);
          setPredictionCorrect(res.data.data);
          console.log('Prediction 11111---------->>>>>>>', predictionCorrect);
          // setWinningAmount(res.data.data)
          // console.log("winning-------11111>>>",winningAmount);

          // setGlobalList( res.data.data.list)
          //  console.log('globallist22222 ---- >>>>>',globalList);
          //   setGlobalListRank(res.data.data.rank)
          //   console.log(("global rank-------->>>",globalListRank));
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch winning---->>>>', err));
  };

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
  //  console.log("helooooo----->>>>",globalList);

  // console.log(("global rank-------->>>",globalListRank));
  return (
    <AppView style={styles.FirstMainContainer}>
      <AppView style={styles.FirstOneView}>
        <AppView style={styles.ThView}>
          <AppText
            style={{fontSize: height / 28, color: 'white', fontWeight: '700'}}>
            {globalListRank}
          </AppText>
        </AppView>
        <AppView style={styles.iconView}>
          <AppImage
            resizeMode="contain"
            style={{height: height / 18, width: width / 9}}
            source={user}></AppImage>
        </AppView>
        <AppView style={styles.ValueView}>
          <AppText
            style={{fontSize: height / 28, color: 'white', fontWeight: '700'}}>
            0
          </AppText>
        </AppView>
      </AppView>
      <AppView
        style={{
          height: height / 12,
          width: width / 1,
          // backgroundColor: 'red',
          flexDirection: 'row',
        }}>
        <AppView
          style={{
            height: height / 12,
            width: width / 5.98,
            // backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text
            style={{fontSize: height / 50, color: '#000', fontWeight: '700'}}>
            #
          </Text>
        </AppView>
        <AppView
          style={{
            height: height / 12,
            width: width / 2.04,
            // backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text
            style={{fontSize: height / 50, color: '#000', fontWeight: '700'}}>
            Player Name
          </Text>
        </AppView>
        <AppView
          style={{
            height: height / 12,
            width: width / 2.88,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text
            style={{fontSize: height / 50, color: '#000', fontWeight: '700'}}>
            Winning
          </Text>
        </AppView>
      </AppView>
      <AppView style={styles.FirstTwoView}>


      {isLoading ? (
         <View style={{marginTop: 60}}>
          <Loader />
             </View>
           ) :  (    <FlatList
            showsVerticalScrollIndicator={false}
            data={globalList}
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <Text>{item.list}</Text>
                <View style={styles.noView}>
                  <Text style={styles.mainText}>{item.no}</Text>
                </View>
                <TouchableOpacity 
                    onPress={() =>setModalVisible(true)}
                
                // onPress={() =>{
                // props.navigation.navigate( setModalVisible(true)) },
                //   params={ravi:item}



                // }
                  
                  >
                  <View style={styles.nameView}>
                    <Text style={styles.mainText}>{item.userName}</Text>
                  </View>
                </TouchableOpacity>
  
                <View style={styles.amountView}>
                  <Text style={styles.mainText}>{item.amount}</Text>
                  <Text style={{fontSize: height / 65, color: 'grey'}}>
                    {item.value}
                  </Text>
                </View>
              </View>
            )}
          /> ) }
{/* 
        <FlatList
          showsVerticalScrollIndicator={false}
          data={globalList}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text>{item.list}</Text>
              <View style={styles.noView}>
                <Text style={styles.mainText}>{item.no}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.nameView}>
                  <Text style={styles.mainText}>{item.userName}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.amountView}>
                <Text style={styles.mainText}>{item.amount}</Text>
                <Text style={{fontSize: height / 65, color: 'grey'}}>
                  {item.value}
                </Text>
              </View>
            </View>
          )}
        /> */}
      </AppView>
      {/* Modal */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={(item) => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centered1View}>
          <View style={styles.modalView}>
            <View style={styles.firstMainViewModal}>
              <View style={styles.firstOnemodalview}>
                <Image source={blueuser}></Image>
              </View>
              <View style={styles.firstTwoViewmodal}>
                <Text
                  style={{
                    fontSize: height / 45,
                    fontWeight: '700',
                    color: '#rgb(94,28,159)',
                  }}>
                  umair siddiqui
                </Text>
                <Text
                  style={{
                    fontSize: height / 59,
                    fontWeight: '700',
                    color: '#rgb(115 ,112, 112)',
                  }}>
                  {globalList.userName}
                  
                  {/* console.log("hyyy",globalList); */}
                </Text>
              </View>
              <View style={styles.firstThreeViewModal}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={{
                      height: height / 60,
                      width: width / 30,
                      tintColor: 'grey',
                      marginTop: 10,
                    }}
                    source={cross}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondMainViewModal}>
              <View
                style={{
                  height: height / 18,
                  width: width / 6.8,
                  backgroundColor: 'white',
                  marginHorizontal: 23,
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'purple',
                    fontSize: height / 65,
                    fontWeight: '700',
                  }}>
                  {winningPercentageAmount.winPercent}
                  {/* {winPercentageAmount.winPercent} */}%
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: height / 75,
                    fontWeight: '700',
                    marginVertical: 3,
                  }}>
                  Win Rate
                </Text>
              </View>
              <View
                style={{
                  height: height / 18,
                  width: width / 6.8,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'purple',
                    fontSize: height / 65,
                    fontWeight: '700',
                  }}>
                  {streakUser.loss}
                  {streakUser.win}
                  {streakUser.NO}
                  {/* {streakValue.loss}{streakValue.win}{streakValue.NO} */}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: height / 75,
                    fontWeight: '700',
                    marginVertical: 3,
                  }}>
                  Streak
                </Text>
              </View>
              <View
                style={{
                  height: height / 18,
                  width: width / 6.8,
                  backgroundColor: 'white',
                  marginHorizontal: 23,
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'purple',
                    fontSize: height / 65,
                    fontWeight: '700',
                  }}>
                  {/* {predictionTime.prediction}
                   */}
                  {predictionCorrect.prediction}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: height / 85,
                    fontWeight: '700',
                    marginVertical: 3,
                  }}>
                  Prediction
                </Text>
              </View>
              <View
                style={{
                  height: height / 18,
                  width: width / 6.8,
                  backgroundColor: 'white',
                  // marginHorizontal: 23,
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 0.7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'purple',
                    fontSize: height / 65,
                    fontWeight: '700',
                  }}>
                  {/* {winningLossEarned.win} */}
                  {winningAmount.win}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: height / 75,
                    fontWeight: '700',
                    marginVertical: 3,
                  }}>
                  Winnings
                </Text>
              </View>
            </View>

            <View style={styles.SecondStatsView}>
              {/* <FlatList
                horizontal={true}
                showsVerticalScrollIndicator={false}
                data={DATA4}
                renderItem={({item}) => (
                  <View style={styles.item4}>
                    <Text
                      style={{
                        fontSize: height / 55,
                        fontWeight: '700',
                        paddingVertical: 5,
                        color: '#rgb(94,28,159)',
                      }}>
                      {item.num}
                    </Text>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: '#rgb(115 ,112, 112)',
                      }}>
                      {item.badges}
                    </Text>
                  </View>
                )}
              /> */}
            </View>
            <View style={styles.thirdMainViewModal}>
              <View style={styles.thirdFirstView}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      "hello",globalList
                    );
                    setModalVisible(!modalVisible),
                   props.props.navigation.navigate({
                      name: 'ViewProfile',
                      
          params:{userNameData:globalList,amountdata:winningAmount,winningpercentValue:winningPercentageAmount,currentstreak:streakUser,predictionValue:predictionCorrect },
                     
                  })}}>
                  <View style={styles.button1View}>
                    <Text style={{fontSize: height / 60, color: 'grey'}}>
                      View Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.thirdsecndView}>
                <TouchableOpacity>
                  <View style={styles.button2View}>
                    <Text style={{fontSize: height / 60, color: 'white'}}>
                      Follow
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AppView>
  );
};

const SecondRoute = props => {
  console.log('my props1', props.props);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendListRank, setFriendListRank] = useState([]);

  useEffect(() => {
    // globalCheckpersonName();
    friendCheckpersonName();
  }, []);
  const friendCheckpersonName = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/account/find-rank-in-friend',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('friend ------------- >>>>>', res.data.data);

          setFriendList(res.data.data.list);
          console.log('friendlist --------->>>>', friendList);
          setFriendListRank(res.data.data.rank);
          console.log('friendlist --------->>>>', friendListRank);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };
  return (
    <AppView style={styles.SecondMainContainer}>
      <AppView style={styles.SecondOneview}>
        <AppView style={styles.ThView}>
          <AppText
            style={{fontSize: height / 28, color: 'white', fontWeight: '700'}}>
            {friendListRank}
          </AppText>
        </AppView>
        <AppView style={styles.iconView}>
          <AppImage
            resizeMode="contain"
            style={{height: height / 18, width: width / 9}}
            source={user}></AppImage>
        </AppView>
        <AppView style={styles.ValueView}>
          <AppText
            style={{fontSize: height / 28, color: 'white', fontWeight: '700'}}>
            0
          </AppText>
        </AppView>
      </AppView>
      <AppView
        style={{
          height: height / 12,
          width: width / 1,
          // backgroundColor: 'red',
          flexDirection: 'row',
        }}>
        <AppView
          style={{
            height: height / 12,
            width: width / 5.98,
            // backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text style={{fontSize: height / 50, color: 'grey'}}>#</Text>
        </AppView>
        <AppView
          style={{
            height: height / 12,
            width: width / 2.04,
            // backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text style={{fontSize: height / 50, color: 'grey'}}>
            Player Name
          </Text>
        </AppView>
        <AppView
          style={{
            height: height / 12,
            width: width / 2.88,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: 'grey',
          }}>
          <Text style={{fontSize: height / 50, color: 'grey'}}>Winning</Text>
        </AppView>
      </AppView>
      <AppView style={styles.SecondTwoView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={friendList}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text>{item.list}</Text>
              <View style={styles.noView}>
                <Text style={styles.mainText}>{item.no}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.nameView}>
                  <Text style={styles.mainText}>{item.userName}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.amountView}>
                <Text style={styles.mainText}>{item.amount}</Text>
                <Text style={{fontSize: height / 65, color: 'grey'}}>
                  {item.value}
                </Text>
              </View>
            </View>
          )}
        />
      </AppView>

      {/* Modal */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centered1View}>
          <View style={styles.modalView}>
            <View style={styles.firstMainViewModal}>
              <View style={styles.firstOnemodalview}>
                <Image source={blueuser}></Image>
              </View>
              <View style={styles.firstTwoViewmodal}>
                <Text
                  style={{
                    fontSize: height / 45,
                    fontWeight: '700',
                    color: '#rgb(94,28,159)',
                  }}>
                  umair siddiqui
                </Text>
                <Text
                  style={{
                    fontSize: height / 59,
                    fontWeight: '700',
                    color: '#rgb(115 ,112, 112)',
                  }}>
                  @_umair111
                </Text>
              </View>
              <View style={styles.firstThreeViewModal}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={{
                      height: height / 60,
                      width: width / 30,
                      tintColor: 'grey',
                      marginTop: 10,
                    }}
                    source={cross}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondMainViewModal}>
              <FlatList
                horizontal={true}
                showsVerticalScrollIndicator={false}
                data={DATA4}
                renderItem={({item}) => (
                  <View style={styles.item4}>
                    <Text
                      style={{
                        fontSize: height / 55,
                        fontWeight: '700',
                        paddingVertical: 5,
                        color: '#rgb(94,28,159)',
                      }}>
                      {item.num}
                    </Text>
                    <Text
                      style={{
                        fontSize: height / 60,
                        color: '#rgb(115 ,112, 112)',
                      }}>
                      {item.badges}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.thirdMainViewModal}>
              <View style={styles.thirdFirstView}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      props.props.navigation.navigate('ViewProfile');
                  }}>
                  <View style={styles.button1View}>
                    <Text style={{fontSize: height / 60, color: 'grey'}}>
                      View Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.thirdsecndView}>
                <TouchableOpacity>
                  <View style={styles.button2View}>
                    <Text style={{fontSize: height / 60, color: 'white'}}>
                      Follow
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AppView>
  );
};

const LeaderBoard = props => {
  console.log('props111111', props);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Global'},
    {key: 'second', title: 'Friends'},
  ]);

  const renderScene = SceneMap({
    // first:FirstRoute,
    first: () => <FirstRoute props={props} />,
    second: () => <SecondRoute props={props} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'grey',
        alignSelf: 'center',
        height: 5,
        color: 'green',
        fontSize: 50,
      }}
      style={{backgroundColor: '#7A25CE'}}
    />
  );
  return (
    <SafeAreaView>
      <View
        style={{
          height: height / 1.03,
          backgroundColor: 'white',
          width: width / 1,
        }}>
        <AppView
          style={{
            height: height / 14,
            width: width / 1,
            //  backgroundColor: 'red'
          }}>
          <HeaderTwo
            onPress3={() => props.navigation.navigate('InboxScreen')}
            onPress4={() => props.navigation.navigate('DrawerNavigator')}
          />
        </AppView>
        <AppView style={{height: height / 1.03, width: width / 1}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            contentContainerStyle={{backgroundColor: 'red'}}
            inactiveColor="black"
            activeColor="brown"
            renderTabBar={renderTabBar}
          />
        </AppView>
      </View>
    </SafeAreaView>
  );
};
export default LeaderBoard;
const styles = StyleSheet.create({
  FirstMainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstOneView: {
    height: height / 11,
    backgroundColor: '#rgb(128,196, 28)',
    flexDirection: 'row',
  },
  ThView: {
    height: height / 11,
    width: width / 2.3,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  ValueView: {
    height: height / 11,
    width: width / 3,
    // backgroundColor:"green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView: {
    height: height / 11,
    width: width / 7,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  FirstTwoView: {
    height: height / 1.78,
    width: width / 1,
    backgroundColor: 'white',
  },
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
  mainText: {
    fontSize: height / 58,
    color: '#rgb(115, 112, 112)',
    fontWeight: '700',
  },
  noView: {
    height: height / 12,
    width: width / 6,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
    borderEndWidth: 0.6,
    borderColor: 'grey',
  },
  nameView: {
    height: height / 12,
    width: width / 2.05,
    // backgroundColor:"skyblue",
    alignItems: 'center',
    justifyContent: 'center',
    borderEndWidth: 0.6,
    borderColor: 'grey',
  },
  amountView: {
    height: height / 12,
    width: width / 2.9,
    // backgroundColor:"skyblue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  SecondMainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  SecondOneview: {
    height: height / 11,
    backgroundColor: '#rgb(128,196, 28)',
    flexDirection: 'row',
  },
  SecondTwoView: {
    height: height / 1.6,
    width: width / 1,
    backgroundColor: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 4,
    width: width / 1.08,
    borderWidth: 0.7,
    borderColor: 'grey',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centered1View: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#ffffff50',
  },
  firstMainViewModal: {
    height: height / 12,
    width: width / 1.08,
    // backgroundColor:"red",
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  secondMainViewModal: {
    height: height / 11,
    width: width / 1.1,
    // backgroundColor: 'green',
    // justifyContent:"center",
    alignItems: 'center',
    flexDirection: 'row',
  },
  thirdMainViewModal: {
    height: height / 14,
    width: width / 1.08,
    // backgroundColor: 'blue',
    flexDirection: 'row',
  },
  firstOnemodalview: {
    height: height / 12,
    width: width / 4.5,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstTwoViewmodal: {
    height: height / 12,
    width: width / 1.9,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  firstThreeViewModal: {
    height: height / 12,
    width: width / 6.8,
    // backgroundColor:"blue",
    alignItems: 'flex-end',
  },
  item4: {
    // flex:1,
    width: width / 5.5,
    margin: 5,
    // alignSelf: 'flex-start',
    // flexDirection: 'row',

    alignItems: 'center',
    height: height / 12,

    justifyContent: 'center',
  },
  thirdFirstView: {
    height: height / 14,
    width: width / 1.8,
    // backgroundColor:"red",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  thirdsecndView: {
    height: height / 14,
    width: width / 2.85,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1View: {
    height: height / 18,
    width: width / 3.8,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 0.9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2View: {
    height: height / 18,
    width: width / 3.8,
    backgroundColor: '#rgb(94,28,159)',
    borderColor: 'white',
    borderWidth: 0.7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // item1: {
  //   // flex:1,
  //   width: width / 1.1,
  //   // marginVertical: 7,
  //   alignSelf: 'flex-start',
  //   flexDirection: 'row',
  //   backgroundColor: 'white',
  //  alignItems:"center",

  //   height: height / 12,
  //   // borderRadius: 10,
  //   borderColor: 'grey',
  //   borderWidth: 0.6,
  // },
});

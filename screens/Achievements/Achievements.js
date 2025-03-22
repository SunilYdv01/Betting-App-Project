import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {BackArrowTwo, smile} from '../../assets/icon';
import {ProgressBar, Colors} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Progress from 'react-native-progress';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import moment from 'moment';

const DATA = [
  {
    img: smile,
    name: 'New Guy',
    task: 'You completed the welcome Tutorial',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    button: 'Collect',
  },
];

const Achievements = ({props, navigation}) => {
  const [achivementData, setachivementData] = useState([]);

  useEffect(() => {
    achivementsofUser();
  }, []);

  const achivementsofUser = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/get-list-achivement?achivementId=1`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Achivementslist ------------- >>>>>', res.data.data);
          setachivementData(res.data.data);
          console.log('achivements-11111--------->>', achivementData);
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
            height: height / 17,
            width: width / 1,
            //   backgroundColor: 'yellow',
          }}>
          <Header
            head={false}
            backImage={BackArrowTwo}
            headerText2=" Achievements"
            //   finalImage={printer}
            onPress2={() => navigation.goBack()}
          />
        </AppView>
        <AppView style={styles.FirstConatiner}>
          <AppView style={styles.FirstOneView}>
            <AppText style={styles.LevelText}>Level -{achivementData.level}</AppText>
          </AppView>
          <AppView style={styles.FirstTwoView}>
            {/* <Progress
              progress={0.44}
              width={250}
              height={10}
              color="#7A25CE"
              unfilledColor="white"
              borderColor="grey"
            /> */}

            <ProgressBar
              progress={0.5}
              width={250}
              height={4}
              color="#7A25CE"
              strokeCap="circle"
              backgroundColor="white"
              color={Colors.purple800}
            />
          </AppView>
          <AppView style={styles.FirstThreeView}>
            <AppText style={styles.XpText}>XP : 3540 / 53000</AppText>
          </AppView>
        </AppView>

        <AppView style={styles.SecondConatiner}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={achivementData}
            renderItem={({item, index}) => {
              return (
                <View style={styles.item}>
                  <View
                    style={{
                      height: height / 12,
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={{uri: item.batchUrl}}></Image>
                  </View>

                  <View
                    style={{
                      height: height / 12,
                      width: width / 1.6,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: height / 55,
                        color: 'black',
                        marginVertical: 8,
                      }}>
                      {item.userName}
                    </Text>
                    <Text style={{fontSize: height / 65, color: 'grey'}}>
                      {/* {item.createTime} */}
                      {moment(item.createTime).format('MMMM DD,YYYY')}   {moment(item.createTime).format('hh: mm : ss')}
                 
                    </Text>
         
                  </View>
                </View>
              );
            }}

            // )}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default Achievements;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstConatiner: {
    height: height / 6,
    width: width / 1,
    backgroundColor: '#rgb(128 ,196 ,28)',
  },
  FirstOneView: {
    height: height / 18,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  FirstTwoView: {
    height: height / 18,
    width: width / 1,
    // backgroundColor:"green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  FirstThreeView: {
    height: height / 18,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  LevelText: {
    fontSize: height / 30,
    color: 'white',
    fontWeight: '700',
  },
  XpText: {
    fontSize: height / 45,
    color: 'white',
    fontWeight: '700',
  },
  SecondConatiner: {
    height: height / 1.43,
    width: width / 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: height / 58,
    fontWeight: '700',
    color: 'black',
    paddingVertical: 3,
  },
  taskText: {
    fontSize: height / 65,
    // fontWeight:"700",
    color: 'black',
  },
  item: {
    // flex:1,
    width: width / 1.07,
    // marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: 'grey',
  },
  smileImageView: {
    height: height / 12,
    width: width / 7,
    //   backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    height: height / 12,
    width: width / 1.5,
    //   backgroundColor:"green",
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: height / 68,
    color: 'white',
  },
  ButtonView: {
    height: height / 22,
    width: width / 6,
    borderRadius: 10,
    backgroundColor: '#rgb(94, 28, 159)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    height: height / 12,
    width: width / 5.5,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

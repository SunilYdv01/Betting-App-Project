 import React from 'react';
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
import { ProgressBar, Colors } from 'react-native-paper';
const {height, width} = Dimensions.get('screen');

const DATA = [
  {
    img: smile,
    name: 'New Guy',
    task: 'You completed the welcome Tutorial',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    img: smile,
    name: 'Lorem',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const PlayerProfileAchivements = (props) => {
  return (
    <SafeAreaView>
      <AppView style={styles.mainConatiner}>
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
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <AppView style={styles.FirstConatiner}>
          <AppView style={styles.FirstOneView}>
            <AppText style={styles.LevelText}>Level 53</AppText>
          </AppView>
          <AppView style={styles.FirstTwoView}>
            {/* <ProgressBar   progress={0.44} width={250} height={10} 
            color='#7A25CE'
            unfilledColor= 'white'
            borderColor="grey"
          /> */}
          {/* <Progress.Bar progress={0.3} width={200} /> */}
          <ProgressBar progress={0.5} width={250} height={4}  color='#7A25CE' strokeCap="circle"   backgroundColor= 'white'
  color={Colors.purple800} />
          </AppView>
          <AppView style={styles.FirstThreeView}>
            <AppText style={styles.XpText}>XP : 3540 / 53000</AppText>
          </AppView>
        </AppView>

        <AppView style={styles.SecondConatiner}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            // keyExtractor={(item)=>item,id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.item}>
                  <View style={styles.smileImageView}>
                    <Image source={item.img}></Image>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.taskText}>{item.task}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default PlayerProfileAchivements;

const styles = StyleSheet.create({
  mainConatiner: {
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
  smileImageView: {
    height: height / 12,
    width: width / 6.7,
    //   backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    height: height / 12,
    width: width / 1.2,
    //   backgroundColor:"green",
    justifyContent: 'center',
  },
});

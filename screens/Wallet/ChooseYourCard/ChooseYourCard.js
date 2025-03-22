import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import Header from '../../../components/molecules/Header';
import {
  BackArrowTwo,
  Star,
  qrcode,
  copy,
  card,
  Mastero,
  visa,
} from '../../../assets/icon';
const DATA = [
  {
    name: 'Yash Sharma',
    number: '**** **** **** 6274',
    img: require('../../../assets/images/Visa/Visa.png'),
  },
  {
    name: 'Yash Sharma',
    number: '**** **** **** 8822',
    img: require('../../../assets/images/Maestro/Maestro.png'),
  },
];

const ChooseYourCard = props => {
  return (
    <SafeAreaView>
      <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
            // backgroundColor: 'yellow',
          }}>
          <Header
            head={false}
            backImage={BackArrowTwo}
            headerText2="Add Money"
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <AppView style={styles.FirstContainer}>
          <AppView style={styles.ImagecardView}>
            <AppImage
              resizeMode="contain"
              style={styles.cardImage}
              source={card}></AppImage>
          </AppView>
          <AppView style={styles.BalanceView}>
            <AppText style={styles.BalanceText}>Balance : 0.00 $</AppText>
          </AppView>
        </AppView>
        <AppView style={styles.SecondContainer}>
          <AppView style={styles.cardView}>
            <AppText style={styles.cardtext}>Add Balance</AppText>
          </AppView>
          <AppView style={styles.viewtext}>
            <AppText style={styles.Textline}>
              Choose a card to refill your Balance
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.ThirdContainer}>
          <FlatList
            data={DATA}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View
                  style={{
                    height: height / 12,
                    width: width / 7,
                    // backgroundColor:"red"
                  }}></View>
                <View
                  style={{
                    height: height / 12,
                    width: width / 2,
                    // backgroundColor: 'green',
                    justifyContent: 'center',
                    // alignItems:"center"
                  }}>
                  <Text
                    style={{
                      fontSize: height / 55,
                      fontWeight: '700',
                      paddingVertical: 10,
                      color: '#rgb(48,44,44)',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{fontSize: height / 65, color: '#rgb(48,44,44)'}}>
                    {item.number}
                  </Text>
                </View>

                <View
                  style={{
                    height: height / 12,
                    width: width / 4.5,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image resizeMode="contain" style={{height:height/14,width:width/7}} source={item.img}></Image>
                </View>
              </View>
            )}
          />
        </AppView>
        <AppView style={styles.FourthContainer}>
          <TouchableOpacity  onPress={() => props.navigation.navigate("AddMoney")}>
            <AppText
              style={{
                fontSize: height / 48,
                color: 'rgb(94,28,159)',
                marginHorizontal: 18,
                borderColor: 'rgb(94,28,159)',
                borderBottomWidth: 1,
                width: width / 2.5,
              }}>
              + Add Another Card
            </AppText>
          </TouchableOpacity>
        </AppView>
        <AppView style={styles.FifthContainer}>
          <TouchableOpacity>
            <AppView style={styles.buttonView}>
              <AppText style={styles.Confirmtext}>Confirm</AppText>
            </AppView>
          </TouchableOpacity>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default ChooseYourCard;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245, 245, 245)',
  },
  FirstContainer: {
    height: height / 3.2,
    width: width / 1,
    backgroundColor: '#rgb(255,255,255)',
  },
  SecondContainer: {
    height: height / 9,
    width: width / 1,
    // backgroundColor: '#FEFAEF',
  },
  cardView: {
    height: height / 20,
    width: width / 1,
    // backgroundColor:"yellow",
    justifyContent: 'flex-end',
  },
  viewtext: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardtext: {
    fontSize: height / 40,
    fontWeight: '700',
    // width: width / 2.35,
    // backgroundColor:"grey",
    // textAlign:"right",
    marginHorizontal: 18,
  },
  Textline: {
    fontSize: height / 55,
    width: width / 1.1,
    // backgroundColor:"cyan",
    textAlign: 'left',
    color: 'grey',
  },
  ImagecardView: {
    height: height / 5,
    width: width / 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: height / 8,
    width: width / 2.3,
  },
  BalanceText: {
    fontSize: height / 35,
    fontWeight: '700',
    color: '#rgb(48,44,44)',
  },
  BalanceView: {
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  ThirdContainer: {
    height: height / 4.5,
    width: width / 1,
    //   backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThirdFirstView: {
    height: height / 9,
    width: width / 1,
    //   backgroundColor:"cyan",
    alignItems: 'center',
    justifyContent: 'center',
  },
  ThirdSecondView: {
    height: height / 9,
    width: width / 1,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  FirstcardView: {
    height: height / 11,
    width: width / 1.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  SecondCardView: {
    height: height / 11,
    width: width / 1.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  radioButtonView1: {
    height: height / 11,
    width: width / 9,
    // backgroundColor:"green"
  },
  mainCardentry1: {
    height: height / 11,
    width: width / 1.8,
    // backgroundColor:"red"
  },
  firstcardentry: {
    height: height / 22,
    width: width / 1.8,
    // backgroundColor:"blue",
    justifyContent: 'center',
  },
  secondcardentry: {
    height: height / 22,
    width: width / 1.8,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  cardimageView: {
    height: height / 11,
    width: width / 4.4,
    // backgroundColor:"green",
    alignItems: 'center',
    justifyContent: 'center',
  },
  FourthContainer: {
    height: height / 18,
    width: width / 1,
    //    backgroundColor:"yellow",
    justifyContent: 'center',
  },
  FifthContainer: {
    height: height / 10,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonView: {
    height: height / 15,
    width: width / 1.35,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Confirmtext: {
    color: 'white',
    fontSize: height / 40,
  },
  item: {
    // flex:1,
    width: width / 1.08,
    marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    // justifyContent:"center"
  },
});

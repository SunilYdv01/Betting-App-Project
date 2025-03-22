import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {ArrowBackGreen, ChangePassword, Bitcoin} from '../../assets/icon';

const SecurityAlert = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setimage] = useState([
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'BTC'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'Tocken'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'BTC'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'Tocken'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'BTC'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'Tocken'},
    {logo: require('../../assets/images/Bitcoin/Bitcoin.png'), name: 'BTC'},
  ]);

  const [card, setCard] = useState([
    {
      heading: 'BTC Main Account',
      name: '@btc_main_account',
      text2: 'byjhbhfkg.....wda2300',
    },
    {
      heading: 'Account2',
      name: '@btc_main_account',
      text2: 'byjhbhfkg.....wda2300',
    },
    {
      heading: 'Account3',
      name: '@btc_main_account',
      text2: 'byjhbhfkg.....wda2300',
    },
    {
      heading: 'Account4',
      name: '@btc_main_account',
      text2: 'byjhbhfkg.....wda2300',
    },
  ]);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.backArrow}>
            <Image source={ArrowBackGreen} />
          </View>
          <View style={styles.headerTxt}>
            <Text style={styles.txtView}>Backup Wallet</Text>
          </View>
        </View>

        <View style={styles.blankContainer}></View>

        <View style={styles.sectionTwoView}>
          <View style={styles.sliderView}></View>

          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={image}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.flatTouchView}>
                  <Image source={item.logo} style={styles.imageContainer} />
                  <Text style={styles.txtView}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.sectionThreeContainer}>
            <FlatList
              data={card}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.flatCardView}>
                  <View style={styles.cardContainer}>
                    <Text
                      style={[
                        styles.txtView2,
                        {fontWeight: '600', fontWeight: '600'},
                      ]}>
                      {item.heading}
                    </Text>
                    <Text style={styles.txtView2}>{item.name}</Text>
                    <Text style={styles.txtView2}>{item.text2}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecurityAlert;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: 'rgb(0,0,0)',
  },
  headerContainer: {
    height: height * 0.08,
    width: width * 1,
    flexDirection: 'row',
  },
  backArrow: {
    height: height * 0.1,
    width: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    height: height * 0.1,
    width: width * 0.82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   txtView: {
  //     color: 'rgb(255,255,255)',
  //     fontSize: height / 30,
  //     fontWeight: '600',
  //     // backgroundColor: 'green',
  //   },
  blankContainer: {
    height: height * 0.035,
    width: width * 1,
  },
  sectionTwoView: {
    height: height * 0.9,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sliderView: {
    height: height * 0.048,
    width: width * 1,
  },
  flatTouchView: {
    height: height * 0.12,
    width: width * 0.22,
    backgroundColor: 'rgb(0,0,0)',
    margin: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    margin: 8,
  },
  txtView: {
    color: 'rgb(255,255,255)',
    fontWeight: '500',
    fontSize: height / 55,
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  sectionThreeContainer: {
    height: height * 0.7,
    width: width * 1,
    marginTop: 30,
  },
  flatCardView: {
    height: height * 0.12,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: height * 0.1,
    width: width * 0.9,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtView2: {
    color: 'rgb(0,0,0)',
    // fontSize: height / 55,
    marginLeft: 15,
  },
});

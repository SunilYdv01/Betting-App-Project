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
import {ArrowBackGreen, ChangePassword, BankIcon} from '../../assets/icon';

const ImportPrivateKey = props => {
  const [modalVisible, setModalVisible] = useState(false);
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

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.backArrow}>
            <Image source={ArrowBackGreen} />
          </View>
          <View style={styles.headerTxt}>
            <Text style={styles.txtView2}>Import Private Key</Text>
          </View>
        </View>

        <View style={styles.blankContainer}></View>

        <View style={styles.sectionTwoView}>
          <View style={styles.sliderView}></View>

          <View style={styles.headerView}>
            <Text style={styles.importTxt}>Import</Text>
          </View>

          <View style={styles.headerTxtView}>
            <Text style={styles.importTxtTwo}>
              Select the type of account you would like to import
            </Text>
          </View>

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
            <View style={styles.identifyAccount}>
              <Text
                style={{
                  fontSize: height / 38,
                  fontWeight: '600',
                  marginHorizontal: 12,
                }}>
                Identify your account
              </Text>
            </View>
            <View style={styles.keyAndCopyContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 12,
                  borderWidth: 0.5,
                  backgroundColor: 'grey',
                }}>
                <View style={styles.inptBoxView}>
                  <Text style={{marginHorizontal: 20, fontSize: height / 50}}>
                    Private Key
                  </Text>
                </View>
                <View style={styles.copyIconContainer}>
                  <TouchableOpacity>
                    <Image source={BankIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.btnViewContainer}>
              <TouchableOpacity
                style={styles.BtnView}
                onPress={() => setModalVisible(true)}>
                <Text style={{fontSize: height / 40, fontWeight: '500'}}>
                  IMPORT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportPrivateKey;

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
  headerView: {
    height: height * 0.055,
    width: width * 1,
    justifyContent: 'center',
  },
  importTxt: {
    fontWeight: '700',
    fontSize: height / 35,
    marginHorizontal: 12,
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
  },
  sectionThreeContainer: {
    height: height * 0.7,
    width: width * 1,
    marginTop: 30,
  },
  txtView2: {
    color: 'rgb(255,255,255)',
    fontSize: height / 30,
    fontWeight: '700',
  },
  headerTxtView: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: 'flex-start',
  },
  importTxtTwo: {
    color: 'rgb(0,0,0)',
    marginHorizontal: 12,
    fontSize: height / 55,
  },
  keyAndCopyContainer: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inptBoxView: {
    height: height * 0.09,
    width: width * 0.75,
    justifyContent: 'center',
  },
  copyIconContainer: {
    height: height * 0.09,
    width: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnViewContainer: {
    height: height * 0.15,
    width: width * 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  BtnView: {
    height: height * 0.07,
    width: width * 0.7,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
});

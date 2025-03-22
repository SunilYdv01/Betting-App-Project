import React,{useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Linking,
  Pressable
} from 'react-native';
import Header from '../../components/molecules/Header';
import {BackArrow, NotificationIcon, Referimage, copy,FB,Whatsapp,LinkdIn,Instagram,Twiteer,Skype,Snapchat,Google,Gmail,message,Telegram } from '../../assets/icon';
import { ScrollView } from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');



const ReferandEarn = ({navigation, props}) => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={{height: height / 16, width: width / 1}}>
          <Header
            head={false}
            backImage={BackArrow}
            headerText2={'Share App'}
            favImage={NotificationIcon}
            onPress2={() => navigation.goBack()}
          />
        </View>
        <View style={styles.FirstContainer}>
          <Image
            resizeMode="contain"
            style={{height: height / 3.3, width: width / 1.1}}
            source={Referimage}></Image>
        </View>
        <View style={styles.SecondContainer}>
          <Text
            style={{
              paddingHorizontal: 15,
              fontSize: height / 35,
              color: 'black',
              fontWeight: '700',
            }}>
            Share & Earn
          </Text>
        </View>
        <View style={styles.ThirdContainer}>
          <Text
            style={{
              paddingHorizontal: 15,
              fontSize: height / 50,
              color: 'black',
            }}>
            The more you Refer the more you can Earn
          </Text>
        </View>
        <View style={styles.fourthContainer}>
          <View style={styles.fourOneContainer}>
            <Text
              style={{
                paddingHorizontal: 11,
                fontSize: height / 55,
                color: 'blue',
              }}>
              xhkjdk5425as2d5a2d77c5ad7c5d7cdfgh
            </Text>
          </View>
          <View style={styles.fourTwoContainer}>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                style={{height: height / 30, width: width / 15}}
                source={copy}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fifthContainer}>
          <TouchableOpacity  onPress={() => setModalVisible(true)}>
            <View
              style={{
                height: height / 16,
                width: width / 1.6,
                backgroundColor: 'rgb(94,28,159)',
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: height / 38,
                  color: 'white',
                  fontWeight: '700',
                }}>
                Share
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centered1View}>
             
            <View style={styles.modalView}>
              <View style={styles.modalFirstView}>
                <Text
                  style={{
                    fontSize: height / 40,
                    fontWeight: '700',
                    paddingHorizontal: 15,
                  }}>
                  Share With
                </Text>
              </View>
              <View style={styles.SecondModalView}>
    
              <View style={styles.SecondOneView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('http://facebook.com')}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={FB}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.SecondTwoView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('http://Whatsapp.com')}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={Whatsapp}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.SecondThreeView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('http://Instagram.com')}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={Instagram}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.SecondFourView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('http://Twitter.com')}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={Twiteer}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.SecondFiveView}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('http://Linkdin.com')}>
                    <Image
                      resizeMode="contain"
                      style={{height: height / 16, width: width / 8}}
                      source={LinkdIn}></Image>
                  </TouchableOpacity>
                </View>
         
             
              </View>

              <View style={styles.SecondModal2View}>
    
    <View style={styles.SecondOneView}>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://telegram.com')}>
          <Image
            resizeMode="contain"
            style={{height: height / 15, width: width / 7 }}
            source={Telegram}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondTwoView}>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://gmail.com')}>
          <Image
            resizeMode="contain"
            style={{height: height / 17, width: width / 8}}
            source={Gmail}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondThreeView}>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://snapchat.com')}>
          <Image
            resizeMode="contain"
            style={{height: height / 14, width: width / 7}}
            source={Snapchat}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondFourView}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`sms:&addresses=null&body=My sms text`)}>
          <Image
            resizeMode="contain"
            style={{height: height / 14, width: width / 7}}
            source={message}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.SecondFiveView}>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://skype.com')}>
          <Image
            resizeMode="contain"
            style={{height: height / 16, width: width / 8}}
            source={Skype}></Image>
        </TouchableOpacity>
      </View>

   
    </View>

              <View style={styles.ThirdModalView}>
                <Pressable
                  // style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ReferandEarn;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstContainer: {
    height: height / 3,
    width: width / 1,
    // backgroundColor:"yellow",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondContainer: {
    height: height / 12,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  ThirdContainer: {
    height: height / 15,
    width: width / 1,
    // backgroundColor:"yellow",
  },
  fourthContainer: {
    height: height / 14,
    width: width / 1,
    // backgroundColor:"green",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fourOneContainer: {
    height: height / 20,
    width: width / 1.28,
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderWidth:0.7,
    // borderColor:"grey",
    // borderRadius:8
  },
  fourTwoContainer: {
    height: height / 20,
    width: width / 10,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  fifthContainer: {
    height: height / 10,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: 'grey',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 3,
    width: width / 1,
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
    color: 'purple',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  modalFirstView: {
    height: height / 16,
    width: width / 1,
    // backgroundColor: 'red',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
  },
  SecondModalView: {
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'green',
    flexDirection: 'row',
  },
  SecondOneView: {
    height: height / 14,
    width: width / 5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondTwoView: {
    height: height / 14,
    width: width / 5,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondThreeView: {
    height: height / 14,
    width: width / 5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFourView: {
    height: height / 14,
    width: width / 5,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFiveView: {
    height: height / 14,
    width: width / 5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThirdModalView: {
    height: height / 23,
    width: width / 1.13,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  SecondModal2View:{
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'green',
    flexDirection: 'row',
  }
});

import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import {Dropdown} from 'react-native-material-dropdown';

let data3 = [
  {
    value: '- Select your currency - ',
  },
  {
    value: 'BTH',
  },
  {
    value: 'BTC',
  },
  {
    value: 'Etherium ',
  },
  {
    value: 'Bit Coin',
  },
];

let data2 = [
  {
    value: 'Choose Bet Amount',
  },
  {
    value: '0.00',
  },
  {
    value: '1.00',
  },
  {
    value: '2.00 ',
  },
  {
    value: '5.00',
  },
  {
    value: '10.00',
  },
  {
    value: '20.00',
  },
  {
    value: '30.00',
  },
  {
    value: '50.00',
  },
  {
    value: '75.00',
  },
  {
    value: '1000.00',
  },
];

const CreateYourOwnBet = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
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
            <View style={styles.modalFirstview}>
              {/* <TouchableOpacity>
                <View style={styles.InstantBet}>
                  <Text
                    style={{
                      fontSize: height / 55,
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Instant Bet
                  </Text>
                </View>
              </TouchableOpacity> */}

              <View style={[styles.createYourBetView]}>
                <Text
                  style={{
                    fontSize: height / 55,
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Create your own Bet
                </Text>
              </View>
            </View>
            <View style={styles.BetinputMainView}>
              <View style={styles.BetView}>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontSize: height / 55,
                    // fontWeight: '700',
                    color: '#rgb(58, 58, 58)',
                  }}>
                  Bet Title
                </Text>
              </View>
              <View style={styles.InputMainView}>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Virat How many run in 10 over ?"
                    placeholderTextColor="grey"
                    keyboardType="default"
                    style={{
                      fontSize: height / 60,
                      color: 'black',
                      width: width / 1.35,
                    }}></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.pridictView}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  fontSize: height / 55,
                  // fontWeight: '700',
                  color: '#rgb(58, 58, 58)',
                }}>
                Make Your Choice
              </Text>
            </View>
            <View style={styles.TeamMainView}>
              <View style={styles.FirstTeamMainView}>
                <TouchableOpacity>
                  <View style={styles.FirstTeamView}>
                    <Text style={{fontSize: height / 60}}>YES</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.SecondTeamMainView}>
                <TouchableOpacity>
                  <View style={styles.SecondTeamView}>
                    <Text style={{fontSize: height / 60}}>NO</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ChooseCountryView}>
              <Text
                style={{
                  fontSize: height / 60,
                  color: '#rgb(58, 58, 58)',
                  paddingHorizontal: 15,
                }}>
                Choose the currency in which you want to bet
              </Text>
            </View>
            <View style={styles.selectCountryMainView}>
              <View style={styles.SelectCountryView}>
                <Dropdown
                  inputContainerStyle={{
                    // backgroundColor: 'red',
                    height: height / 20,
                    width: width * 0.8,
                    paddingTop: 10,
                    borderBottomColor: 'transparent',
                    // borderColor:"grey",
                    borderBottomWidth: 1,
                    // color:'white',
                    paddingHorizontal: 15,
                  }}
                  containerStyle={{
                    width: width * 0.78,
                    height: height / 22,
                    // justifyContent: "flex-end",
                    // backgroundColor:"red",
                    // color:"black"
                  }}
                  itemTextStyle={{color: 'white'}}
                  selectedItemColor={'black'}
                  placeholder="Select Currency"
                  placeholderTextColor="grey"
                  textColor="black"
                  data={data3}
                  //   onChangeText={txt => {
                  //     setGetCurrency(txt);
                  //   }}
                  //   value={getCurrency || ''}
                  //   onChangeText={txt => {
                  //     setPayCurrency(txt);
                  //   }}
                  //   value={payCurrency || ''}
                />
              </View>
            </View>
            <View style={styles.placeyourbetScreen}>
              <Text
                style={{
                  fontSize: height / 60,
                  color: '#rgb(58, 58, 58)',
                  paddingHorizontal: 15,
                }}>
                Place your bet
              </Text>
            </View>
            <View style={styles.SelectCoinMainView}>
              <View style={styles.SelectCoinView}>
                <Dropdown
                  inputContainerStyle={{
                    // backgroundColor: 'red',
                    height: height / 20,
                    width: width * 0.8,
                    paddingTop: 10,
                    borderBottomColor: 'transparent',
                    // borderColor:"grey",
                    borderBottomWidth: 1,
                    // color:'white',
                    paddingHorizontal: 15,
                  }}
                  containerStyle={{
                    width: width * 0.78,
                    height: height / 22,
                    // justifyContent: "flex-end",
                    // color:'black'
                  }}
                  itemTextStyle={{color: 'white'}}
                  selectedItemColor={'black'}
                  placeholder="Choose Bet Amount"
                  placeholderTextColor="grey"
                  textColor="grey"
                  data={data2}
                  //   onChangeText={txt => {
                  //     setGetCurrency(txt);
                  //   }}
                  //   value={getCurrency || ''}
                  //   onChangeText={txt => {
                  //     setPayCurrency(txt);
                  //   }}
                  //   value={payCurrency || ''}
                />
              </View>
            </View>
            <View style={styles.ChallangeView}>
              <Text
                style={{
                  paddingHorizontal: 15,
                  fontSize: height / 50,
                  fontWeight: '700',
                  color: '#rgb(58, 58, 58)',
                }}>
                Who do you want to challenge ?
              </Text>
            </View>
            <View style={styles.pickcancelMainView}>
              <View style={styles.PickmainView}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.PredictView}>
                    <Text
                      style={{
                        fontSize: height / 58,
                        color: 'white',
                        fontWeight: '700',
                      }}>
                      Pick opponent
                    </Text>
                  </View>
                </Pressable>
              </View>

              <View style={styles.CancelmainView}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.cancelView}>
                    <Text
                      style={{
                        fontSize: height / 58,
                        color: 'grey',
                        fontWeight: '700',
                      }}>
                      Cancel
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 1.4,
    width: width / 1.15,
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: height / 1,
    // backgroundColor:"green"
  },
  modalFirstview: {
    height: height / 16,
    width: width / 1.15,
    flexDirection: 'row',
    // backgroundColor:'yellow'
  },
  InstantBet: {
    height: height / 16,
    width: width / 2.3,
    borderTopLeftRadius: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createYourBetView: {
    height: height / 16,
    width: width / 1.15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

    backgroundColor: '#rgb(94,28,159)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pridictView: {
    height: height / 15,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  TeamMainView: {
    height: height / 11,
    width: width / 1.15,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  FirstTeamMainView: {
    height: height / 11,
    width: width / 2.3,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondTeamMainView: {
    height: height / 11,
    width: width / 2.3,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  FirstTeamView: {
    height: height / 17,
    width: width / 2.6,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SecondTeamView: {
    height: height / 17,
    width: width / 2.6,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChooseCountryView: {
    height: height / 19,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  selectCountryMainView: {
    height: height / 12,
    width: width / 1.24,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor:"grey",
    // borderWidth:1,
    // borderRadius:10
  },
  SelectCountryView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  placeyourbetScreen: {
    height: height / 35,
    width: width / 1.15,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  SelectCoinMainView: {
    height: height / 10,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectCoinView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  ChallangeView: {
    height: height / 25,
    width: width / 1.15,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickcancelMainView: {
    height: height / 14,
    width: width / 1.15,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  PickmainView: {
    height: height / 14,
    width: width / 2,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  CancelmainView: {
    height: height / 14,
    width: width / 2.6,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  PredictView: {
    height: height / 20,
    width: width / 2.3,
    backgroundColor: '#rgb(94,28,159)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelView: {
    height: height / 20,
    width: width / 3.4,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BetinputMainView: {
    height: height / 9,
    width: width / 1.16,
    // backgroundColor:"red"
  },
  BetView: {
    height: height / 24,
    width: width / 1.16,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  InputMainView: {
    height: height / 14,
    width: width / 1.16,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    height: height / 16,
    width: width / 1.22,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateYourOwnBet;

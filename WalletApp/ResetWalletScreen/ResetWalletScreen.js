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
const {height, width} = Dimensions.get('window');

const ResetWalletScreen = props => {
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
        <View style={styles.centeredView}>
          <View style={styles.warningView}>
            <View style={styles.viewTwo}>
              <Text style={styles.modalText}>Warning</Text>
            </View>
            <View style={styles.sectionTwo}>
              <View style={{marginHorizontal: 12, margin: 2}}>
                <Text style={{fontSize: height / 55}}>
                  Warning. This data will erase all saved data
                </Text>
              </View>
              <View style={{marginHorizontal: 12, margin: 1}}>
                <Text style={{fontSize: height / 55}}>
                  including your 12 secret words, if you didn't save
                </Text>
              </View>
              <View style={{marginHorizontal: 12, margin: 2}}>
                <Text style={{fontSize: height / 55}}>
                  your secret, please do so before you continue.
                </Text>
              </View>
            </View>
            <View style={styles.BtnViewContainer}>
              <View style={styles.cancelBtnView}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => props.navigation.navigate('ImportPrivateKey')}>
                  <Text style={{fontSize: height / 40}}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.understandBtnView}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{fontSize: height / 44}}>OK, I UNDERSTAND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Open Modal Alert</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: height * 1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0)',
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
  modalText: {
    fontWeight: '600',
    fontSize: height / 35,
    marginHorizontal: 10,
  },
  warningView: {
    height: height * 0.3,
    width: width * 0.91,
    backgroundColor: 'rgb(255,255,255)',
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
  viewTwo: {
    height: height * 0.08,
    width: width * 0.91,
    justifyContent: 'flex-end',
  },
  sectionTwo: {
    height: height * 0.1,
    width: width * 0.91,
    justifyContent: 'center',
  },
  BtnViewContainer: {
    height: height * 0.12,
    width: width * 0.91,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
  },
  cancelBtnView: {
    height: height * 0.07,
    width: width * 0.32,
    justifyContent: 'center',
  },
  understandBtnView: {
    height: height * 0.07,
    width: width * 0.5,
    justifyContent: 'center',
  },
});

export default ResetWalletScreen;

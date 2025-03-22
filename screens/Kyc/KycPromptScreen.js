import React, {useState} from 'react';
import {Alert, StyleSheet, Pressable, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
const {height, width} = Dimensions.get('window');
import {KycPrompt} from '../../assets/icon';
import {
  AppTouchable,
  AppView,
  AppText,
  AppImage,
} from '../../components/Atom/atom';

const KycPromptScreen= (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <AppView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <AppView style={styles.mainContainer}>
          <AppView
            style={{
              height: height * 0.2,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppImage source={KycPrompt} />
          </AppView>
          <AppView
            style={{
              height: height * 0.06,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText
              style={{
                color: 'rgb(255,255,255)',
                fontSize: 28,
                fontWeight: '700',
              }}>
              Complete your KYC !
            </AppText>
          </AppView>
          <AppView
            style={{
              height: height * 0.05,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText
              style={{
                color: 'rgb(255,255,255)',
                fontSize: 22,
              }}>
              To unlock All the features
            </AppText>
          </AppView>
          <AppView
            style={{
              height: height * 0.18,
              width: width * 0.9,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <AppTouchable 
              style={{
                height: height * 0.08,
                width: width * 0.6,
                backgroundColor: 'rgb(255,255,255)',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText
                style={{
                  color: 'rgb(94,28,159)',
                  fontSize: 25,
                }}>
                Complete your KYC
              </AppText>
            </AppTouchable>
          </AppView>
          <AppView
            style={{
              height: height * 0.12,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppTouchable onPress={() => {}}>
              <AppText
                style={{
                  color: 'rgb(255,255,255)',
                  fontSize: 22,
                }}>
                Later
              </AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <AppText style={styles.textStyle}>Show Modal</AppText>
      </Pressable> */}
    </AppView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // height: height * 1,
    // width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop≥: 22,
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
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
  mainContainer: {
    height: height * 0.6,
    width: width * 0.9,
    backgroundColor: '#7A25CE',
    borderRadius: 10,
  },
});

export default KycPromptScreen;

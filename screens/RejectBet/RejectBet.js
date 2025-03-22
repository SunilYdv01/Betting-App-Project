import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  
} from 'react-native';
import {CrossBet} from "../../assets/icon"
import { AppText, AppView, AppTouchable, AppImage } from '../../components/Atom/atom';

const {height, width} = Dimensions.get('window');
const Index = (props, {navigation}) => {
  const [visible, setVisible] = useState(false);
  const Submit = async () => {
    setVisible(true);
    // props.navigation.navigate('Scanfront', {frontimage: filePath});
  };
  
  

  return (
    <SafeAreaView
      style={{
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
          {/* <AppTouchable onPress={Submit}>
              <AppText>setVisible</AppText>
          </AppTouchable> */}
     
      <Modal animationType="fade" transparent={true} visible={visible}>
        <AppView
          style={styles.modalViewOne}>
          <AppView
            style={styles.modalViewTwo}>
            <AppView
              style={styles.modalViewThree}>
              <AppView></AppView>
            </AppView>
            <AppView
              style={styles.modalViewFive}>
              <AppView
                style={styles.modalViewSix}>
                <AppText
                  style={styles.modalTextTwo}>
                 By Rejecting you will loose the Chance to win a
                </AppText>
                <AppText
                 style={styles.modalTextTwo}>
                 potential return of 0.00024 BTC.
                </AppText>
              </AppView>
            </AppView>
            <AppView style={styles.modalViewEight}>
                <AppTouchable style={styles.modalCancelBtn}>
                <AppImage source={CrossBet} />
                </AppTouchable>
            </AppView>
            <AppView
              style={styles.modalViewSeven}>
              <AppTouchable
                onPress={() => setVisible(false)}
                style={styles.modalBtn}>
                <AppText
                  style={styles.modalBtnTxt}>
                  Reject The Bet
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>
      </Modal>
    </SafeAreaView>
  );
};
export default Index;
const styles = StyleSheet.create({
  bgimgstyle: {
    resizeMode: 'contain',
    height: height * 0.8,
    width: width * 0.8,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  captureimg: {
    resizeMode: 'contain',
    height: height * 0.65,
    width: width * 0.8,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalViewOne: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    height: height,
    width: width,
  },
  modalViewTwo: {
    bottom: 0,
    position: 'absolute',
    height: height * 0.45,
    width: width,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  modalViewThree: {
    height: height * 0.1,
    width: width,
    justifyContent: 'center',
  },
  modalViewFour: {
    height: height * 0.09,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginTop: 10
  },
  modalTextOne: {
    fontSize: width / 22,
    alignSelf: 'center',
    color: 'rgb(0,0,0)',
  }, 
  modalViewFive: {
    height: height * 0.09,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewSix :{
    height: height * 0.1,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalTextTwo: {
    fontSize: width / 30,
    alignSelf: 'center',
    color: 'rgb(0,0,0)',
  },
  modalViewSeven: {
    height: height * 0.1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtn: {
    height: height * 0.07,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 40
  },
  modalBtnTxt: {
    fontSize: width / 22,
    alignSelf: 'center',
    color: 'rgb(255,255,255)',
  },
  modalViewEight: { height: height*0.1, justifyContent: 'center', alignItems: 'center'},
  modalCancelBtn: { height: 155/2, width: 155/2, borderRadius: 155/2, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}
});
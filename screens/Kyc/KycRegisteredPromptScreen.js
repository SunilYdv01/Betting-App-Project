import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Modal, Alert} from 'react-native';
import {
  AppText,
  AppView,
  AppTouchable,
  AppImage,
} from '../../components/Atom/atom';
const {height, width} = Dimensions.get('window');
import {
  ArrowBackGreen,
  ChangePasswordSuccess,
  KycPrompt,
BackArrow
} from '../../assets/icon';
import axios from 'axios';

const KycRegisteredPromptScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    setModalVisible(false);
    // alert('Success....');
    props.navigation.navigate('MyTabs');
    // axios({
    //   method: 'get',
    //   url: 'http://182.72.203.247:4094/account/get-kyc-details',
    //   // params: {
    //   //   email: Email,
    //   // },
    //   // userId: token,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    // })
    //   .then(res => {
    //     console.log('res-->>', res.data);
    //     if (res.status === 200) {
    //       props.navigation.navigate('HomeScreen');
    //     } else {
    //       alert('Something went wrong');
    //     }
    //   })
    //   .catch(err => console.log('catch err--->>>', err));
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.mainContainer}>
        <AppView style={styles.blankConatiner}>
          <AppView style={styles.arrowBackView}>
            <AppTouchable onPress={() => props.navigation.navigate('BackKyc')}>
            <AppImage resizemode="contain" source={BackArrow} style={{marginLeft: 15,tintColor:"white",height:height/40,width:width/20}} />
            </AppTouchable>
          </AppView>
          <AppView style={styles.headingContainer}>
            <AppText style={{color: 'rgb(255,255,255)', fontSize: 24}}>
              KYC
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.sectionTwoContainer}>
          <AppView style={styles.passHeadView}>
            <AppText style={styles.txtForgotHead}>
              Review the Submission
            </AppText>
          </AppView>

          {/* Front Camera Scan */}
          <AppView
            style={{
              height: height * 0.6,
              width: width * 0.9,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* REMOVE IMAGE FROM HERE WHEN YOU IMPLEMENT API */}
            <AppImage source={KycPrompt} style={{height: 120, width: 120}} />
            <AppView style={{alignItems: 'center', marginTop: 25}}>
              <AppText style={{fontSize: 19, fontWeight: '600'}}>
                Thank you!
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnTouchView}
              style={[styles.button, styles.buttonOpen]}
              onPress={() => onSubmit()}>
              {/* // onPress={openCamera}> */}
              <AppText style={styles.resetTxtView}>Finish Verification</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>

      {/************************************** Modal Code **************************************/}
      <AppView style={{marginTop: 100}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <AppView style={styles.mainModalContainer}>
            <AppView style={styles.modalImgContainer}>
              <AppImage source={ChangePasswordSuccess} />
            </AppView>
            <AppView style={styles.modalTxtView}>
              <AppText style={styles.modalTxt}>Congratulations !</AppText>
            </AppView>
            <AppView style={styles.unlockModalView}>
              <AppText
                style={{
                  color: 'rgb(255,255,255)',
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                Now you are registered
              </AppText>
            </AppView>
            <AppView style={styles.unlockModalView2}>
              <AppText style={{color: 'rgb(255,255,255)', fontSize: 14}}>
                Your profile is now being reviewed. You can
              </AppText>
              <AppText style={{color: 'rgb(255,255,255)', fontSize: 14}}>
                expect it to finish in the next 24 hours
              </AppText>
            </AppView>
            <AppView style={styles.kycContainer}>
              <AppTouchable
                style={styles.kycTouchView}
                // onPress={() => alert('KYC Successfully Done!')}
                onPress={() =>
                  props.navigation.navigate('KycRegisteredPromptScreen')
                }>
                <AppText style={{color: 'rgb(94,28,159)', fontSize: 22}}>
                  Get Started your KYC
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </Modal>
      </AppView>
    </SafeAreaView>
  );
};

export default KycRegisteredPromptScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#7A25CE',
  },
  blankConatiner: {
    height: height * 0.1,
    width: width * 1,
    flexDirection: 'row',
  },
  arrowBackView: {
    height: height * 0.06,
    width: width * 0.3,
    justifyContent: 'center',
    top: 10,
    position: 'relative',
  },
  headingContainer: {
    height: height * 0.06,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 10,
    position: 'relative',
  },
  sectionTwoContainer: {
    // height: height * 0.88,
    height: height * 0.9,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  passHeadView: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  txtForgotHead: {
    color: 'rgb(23,23,23)',
    fontSize: 25,
  },
  btnContainer: {
    height: height * 0.12,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // btnTouchView: {
  //   height: height * 0.07,
  //   width: width * 0.75,
  //   backgroundColor: 'rgb(94,28,159)',
  //   borderRadius: 35,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  resetTxtView: {
    color: 'rgb(255,255,255)',
    fontSize: 22,
    fontWeight: '600',
  },
  laterBtnContainer: {
    height: height * 0.12,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: height * 0.07,
    width: width * 0.75,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: 'rgb(94,28,159)',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  // Modal Styling
  mainModalContainer: {
    height: height * 0.6,
    width: width * 0.85,
    // backgroundColor: 'rgb(255,255,255)',
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 10,
    left: 23,
    top: 180,
  },
  modalImgContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTxtView: {
    height: height * 0.06,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTxt: {
    color: 'rgb(255,255,255)',
    fontSize: 27,
    fontWeight: '700',
  },
  unlockModalView: {
    height: height * 0.03,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockModalView2: {
    height: height * 0.05,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kycContainer: {
    height: height * 0.18,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  kycTouchView: {
    height: height * 0.08,
    width: width * 0.6,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  laterBtnContainer: {
    height: height * 0.12,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

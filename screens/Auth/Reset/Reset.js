import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
import {
  ArrowBackGreen,
  Lock,
  KycPrompt,
  ResetIcon,
  BackArrow,
} from '../../../assets/icon';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
const {height, width} = Dimensions.get('window');
import axios from 'axios';

const Reset = props => {
  // const [token, setToken] = useState('');
  const [verifySmsCodeDto, setVerifySmsCodeDto] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [counter, SetCounter] = useState(59);
  const [random, SetRandom] = useState(Math.random());
  const [checkOtp, setCheckOtp] = useState(false);
  const [errorOtp, setErrorOtp] = useState(null);
  const handleResend = () => {
    SetRandom(Math.random());
    // Handle Resend otp action here
  };
  const handleVerify = otp => {
    // Handle the verification logic here
    // dispatch verify action
  };

  const onSubmit = () => {
    if (verifySmsCodeDto != '') {
      fatchresponce();
    } else {
      setErrorOtp('Please Enter Valid Otp.');
    }
  };

  const fatchresponce = () => {
    console.log('verifySmsCodeDto', verifySmsCodeDto);
    axios({
      method: 'post',
      url: 'http://182.72.203.247:4094/account/verify-sms-code-mobile-app',
      data: {
        verifySmsCodeDto: verifySmsCodeDto,
      },
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('res', res.status);

        if (res.status === 200) {
          props.navigation.navigate('ChangePass');
        } else {
          alert('somthing wrong');
        }
      })
      .catch(err => console.log('err', err));
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.mainContainer}>
        <AppView style={styles.blankConatiner}>
          <AppView style={styles.arrowBackView}>
            <AppTouchable onPress={() => props.navigation.navigate('Forgot')}>
              <AppImage
                resizemode="contain"
                source={BackArrow}
                style={{
                  marginLeft: 15,
                  tintColor: 'white',
                  height: height / 40,
                  width: width / 20,
                }}
              />
            </AppTouchable>
          </AppView>
          <AppView style={styles.headingContainer}>
            <AppText
              style={{
                color: 'rgb(255,255,255)',
                fontSize: 24,
                fontWeight: '700',
              }}>
              OTP Verification
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.sectionTwoContainer}>
          <AppView style={styles.lockContainer}>
            <AppImage source={ResetIcon} />
          </AppView>
          <AppView style={styles.passHeadView}>
            <AppText style={styles.txtForgotHead}>Verification Code</AppText>
          </AppView>
          <AppView style={styles.paraContainer}>
            <AppText style={styles.paraTxtView}>
              We have sent you a verification code to
            </AppText>
            <AppText style={styles.paraTxtView}>
              your registered email ID
            </AppText>
          </AppView>

          {/* Otp Container */}
          <AppView style={styles.enterCodeView}>
            <AppText style={styles.txtForgotHead}>Enter Code</AppText>
          </AppView>
          <AppView style={styles.placeholderContainer}>
            <CodeInput
              className={'border-box'}
              space={8}
              size={55}
              borderRadius={10}
              codeInputStyle={{
                backgroundColor: '#E8E8E8',
                color: 'black',
                fontSize: height / 38,
              }}
              activeColor="rgba(49, 180, 4, 1)"
              inactiveColor="rgba(49, 180, 4, 1.3)"
              codeLength={6}
              cellBorderWidth={3}
              inputPosition="center"
              keyboardType={'numeric'}
              // onFulfill={code => setToken(code)}
              onFulfill={code => setVerifySmsCodeDto(code)}
            />
          </AppView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: height / 10,
              width: width / 1,
              alignSelf: 'center',
              //backgroundColor:'red'
            }}>
            <CountDown
              key={random}
              until={counter}
              size={15}
              onFinish={() => setDisabled(() => false)}
              separatorStyle={{color: 'black'}}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: 'black'}}
              timeToShow={['M', 'S']}
              showSeparator
              timeLabels={{m: '', s: ''}}
            />
            <TouchableOpacity onPress={handleResend}>
              <View
                style={{
                  height: height / 21,
                  width: width / 10,
                  justifyContent: 'center',
                }}>
                <Image
                  disabled={disabled}
                  style={{marginLeft: 10}}
                  style={{
                    height: height / 32,
                    width: width / 17,
                    tintColor: 'rgb(139, 13, 217)',
                  }}
                  source={require('../../../assets/images/resend.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnTouchView}
              onPress={() => props.navigation.navigate('ChangePass')}>
              <AppText style={styles.resetTxtView}>Done</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default Reset;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#7A25CE',
  },
  blankConatiner: {
    height: height * 0.12,
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
    height: height * 0.88,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  lockContainer: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterCodeView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 20,
  },
  paraContainer: {
    height: height * 0.06,
    width: width * 1,
    justifyContent: 'center',
  },
  paraTxtView: {
    color: 'rgb(112,112,112)',
    fontSize: 16,
    marginLeft: 20,
  },
  placeholderContainer: {
    height: height * 0.115,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor:'yellow'
  },
  maininput: {
    height: height * 0.08,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 0.7,
  },
  emailIcon: {
    height: height * 0.04,
    width: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inptTxtField: {
    height: height * 0.04,
    width: width * 0.88,
    justifyContent: 'center',
  },
  emailConatinerView: {
    color: 'rgb(0,0,0)',
    fontSize: 15,
    marginLeft: 15,
    top: 10,
  },
  btnContainer: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouchView: {
    height: height * 0.07,
    width: width * 0.75,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetTxtView: {
    color: 'rgb(255,255,255)',
    fontSize: 22,
    fontWeight: '600',
  },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  // ---------------------  No need to use below styling --------------------
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  // mainModalContainer: {
  //   height: height * 0.6,
  //   width: width * 0.85,
  //   // backgroundColor: 'rgb(255,255,255)',
  //   backgroundColor: 'rgb(94,28,159)',
  //   borderRadius: 10,
  //   left: 23,
  //   top: 180,
  // },
  // modalImgContainer: {
  //   height: height * 0.2,
  //   width: width * 0.9,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalTxtView: {
  //   height: height * 0.06,
  //   width: width * 0.9,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalTxt: {
  //   color: 'rgb(255,255,255)',
  //   fontSize: 28,
  //   fontWeight: '700',
  // },
  // unlockModalView: {
  //   height: height * 0.05,
  //   width: width * 0.9,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // kycContainer: {
  //   height: height * 0.18,
  //   width: width * 0.9,
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  // },
  // kycTouchView: {
  //   height: height * 0.08,
  //   width: width * 0.6,
  //   backgroundColor: 'rgb(255,255,255)',
  //   borderRadius: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // laterBtnContainer: {
  //   height: height * 0.12,
  //   width: width * 0.9,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

// *********************************************************

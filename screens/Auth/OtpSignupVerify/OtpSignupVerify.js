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
  Button,
  Image,
  handleResend,
  Touchable,
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
//const [disabled, setDisabled] = useState(true)
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import { useSelector, useDispatch } from "react-redux";
const Index = props => {
  const [token, setToken] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [checkOtp, setCheckOtp] = useState(false);
  const [errorOtp, setErrorOtp] = useState(null);
  const [counter, SetCounter] = useState(59);
  const [random, SetRandom] = useState(Math.random());
  // const dispatch = useDispatch();
  const handleResend = () => {
    SetRandom(Math.random());
    // Handle Resend otp action here
  };
  const handleVerify = otp => {
    // Handle the verification logic here
    // dispatch verify action
  };

  const onSubmit = () => {
    if (token != '') {
      fatchresponce();
    } else {
      setErrorOtp('Please Enter Valid Otp.');
    }
  };

  // url: `http://182.72.203.247:4094/account/verify-user?token=${token}`,
  // url: `https://java-create-token.mobiloitte.org/account/verify-user?token=${token}`,

  // data: {
  //   token: token,
  //   // otp: code,
  // },
  const fatchresponce = () => {
    console.log('token', token);
    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/verify-user?token=${token}`,
      headers: {
        token: token,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('res', res.status);

        if (res.status === 200) {
          props.navigation.navigate('Login');
        } else {
          alert('somthing wrong');
        }
      })
      .catch(err => console.log('err', err));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <AppView style={styles.mainContainer}>
          <AppView style={styles.blankConatiner}>
            <AppView style={styles.arrowBackView}>
              <AppTouchable
                onPress={() => props.navigation.navigate('SignUpSecond')}>
                <AppImage
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
                  fontSize: height / 30,
                  fontWeight: '700',
                }}>
                OTP Verification
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.sectionTwoContainer}>
            <AppView style={styles.lockContainer}>
              <AppImage
                resizeMode="contain"
                style={{height: height / 8, width: width / 4}}
                source={ResetIcon}
              />
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
                space={11}
                size={65}
                borderRadius={10}
                codeInputStyle={{
                  backgroundColor: '#E8E8E8',
                  color: 'black',
                  fontSize: height / 38,
                }}
                codeLength={4}
                cellBorderWidth={0}
                inputPosition="center"
                keyboardType={'numeric'}
                onFulfill={code => setToken(code)}
              />
            </AppView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: height / 10,
                width: width / 1.25,
                alignSelf: 'center',
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
                    height: height / 22,
                    width: width / 13,
                    justifyContent: 'center',
                  }}>
                  <Image
                    disabled={disabled}
                    style={{marginLeft: 10}}
                    style={{
                      height: height / 33,
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
                onPress={() => props.navigation.navigate('Reset')}>
                {/* // onPress={() => props.navigation.navigate('Login')}> */}
                <AppText style={styles.resetTxtView}>Done</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>

        {/* ************************************* Modal Code *************************************
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
              <AppImage source={KycPrompt} />
            </AppView>
            <AppView style={styles.modalTxtView}>
              <AppText style={styles.modalTxt}>Complete your KYC !</AppText>
            </AppView>
            <AppView style={styles.unlockModalView}>
              <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
                To unlock All the features
              </AppText>
            </AppView>
            <AppView style={styles.kycContainer}>
              <AppTouchable
                style={styles.kycTouchView}
                onPress={() => props.navigation.navigate('Login')}>
                <AppText style={{color: 'rgb(94,28,159)', fontSize: 25}}>
                  Complete your KYC
                </AppText>
              </AppTouchable>
            </AppView>
            <AppView style={styles.laterBtnContainer}>
              <AppTouchable
                // onPress={() => setModalVisible(!modalVisible)}
                onPress={() => props.navigation.navigate('Login')}>
                <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
                  Later
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </Modal>
      </AppView>*/}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Index;

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
    // backgroundColor:"red"
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
    fontSize: height / 30,
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
    fontSize: height / 52,
    marginLeft: 20,
  },
  placeholderContainer: {
    height: height * 0.12,
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
    fontSize: height / 30,
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
  // acountSignUpView: {
  //   height: height * 0.1,
  //   width: width * 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // txtdontView: {
  //   fontSize: 18,
  //   color: 'rgb(21,21,21)',
  // },
  // registerView: {
  //   color: 'rgb(79,17,140)',
  //   textDecorationLine: 'underline',
  //   fontSize: 18,
  //   fontWeight: '600',
  // },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },
  // Modal Style
  centeredView: {
    // height: height * 0.6,
    // width: width * 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    fontSize: 28,
    fontWeight: '700',
  },
  unlockModalView: {
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

// **************************************************************************

// ************************************************************

// import React, {useState} from 'react';
// import {Alert, StyleSheet, Dimensions, SafeAreaView, Modal} from 'react-native';
// import {
//   AppText,
//   AppView,
//   AppImage,
//   AppTouchable,
// } from '../../../components/Atom/atom';
// import {ArrowBackGreen, Lock, KycPrompt, ResetIcon} from '../../../assets/icon';
// import axios from 'axios';
// const {height, width} = Dimensions.get('window');
// // import CodeInput from 'react-native-code-input';
// import CodeInput from '../../../screens/Auth/ConfirmationOTP/ConfirmationOTP';

// const OtpSignupVerify = props => {
//   //   const [modalVisible, setModalVisible] = useState(false);
//   const [code, setCode] = useState('');

//   const _onFulfill = code => {
//     // TODO: call API to check code here
//     // If code does not match, clear input with: this.refs.codeInputRef1.clear()
//     console.log('code--->>>', code);

//     axios({
//       method: 'get',
//       // url: `http://182.72.203.247:4094/account/verify-user?token=${code}`,
//       url: 'http://182.72.203.247:4094/account/verify-user',
//       body: {
//         token: code,
//       },
//       headers: {
//         'content-type': 'application/json',
//       },
//     })
//       .then(res => {
//         console.log('res1', res.data);
//         console.log('res2', res.data.responseCode);
//         if (res.data.responseCode == 200) {
//           // alert('OTP Success!');
//           props.navigation.navigate('Login');
//         } else if (res.data.responseCode == 400) {
//           alert('Something went wrong====Already Verified');
//         } else if (res.data.responseCode == 401) {
//           alert('Unauthorized User');
//         } else if (res.data.responseCode == 404) {
//           alert('Data Not Found');
//         }
//       })
//       .catch(err => console.log('err', err));

//     // if (code == '94504') {
//     //   Alert.alert(
//     //     'Confirmation Code',
//     //     'OTP Verified Successfully!!',
//     //     [{text: 'OK'}],
//     //     {},
//     //   );

//     //   this.props.navigation.navigate('Login');
//     // } else {
//     //   Alert.alert(
//     //     'Confirmation Code',
//     //     'Please enter valid Otp!',
//     //     [{text: 'OK'}],
//     //     {
//     //       cancelable: false,
//     //     },
//     //   );

//     //   this.refs.codeInputRef1.clear();
//     // }
//   };

//   const _onFinishCheckingCode1 = isValid => {
//     console.log(isValid);
//     if (!isValid) {
//       Alert.alert('Confirmation Code', 'Code not match!', [{text: 'OK'}], {
//         cancelable: false,
//       });
//     } else {
//       Alert.alert(
//         'Confirmation Code',
//         'Otp Successfully Verified!',
//         [{text: 'OK'}],
//         {cancelable: false},
//       );
//       // props.navigation.navigate('Login');
//     }
//   };

//   const _onFinishCheckingCode2 = (isValid, code) => {
//     console.log(isValid);
//     if (!isValid) {
//       Alert.alert('Confirmation Code', 'Code not match!', [{text: 'OK'}], {
//         cancelable: false,
//       });
//     } else {
//       setState(code);
//       Alert.alert('Confirmation Code', 'Successful!', [{text: 'OK'}], {
//         cancelable: false,
//       });
//     }
//   };

//   return (
//     <SafeAreaView backgroundColor="#7A25CE">
//       <AppView style={styles.mainContainer}>
//         <AppView style={styles.blankConatiner}>
//           <AppView style={styles.arrowBackView}>
//             <AppTouchable
//               onPress={() => props.navigation.navigate('SignUpSecond')}>
//               <AppImage source={ArrowBackGreen} style={{marginLeft: 15}} />
//             </AppTouchable>
//           </AppView>
//           <AppView style={styles.headingContainer}>
//             <AppText
//               style={{
//                 color: 'rgb(255,255,255)',
//                 fontSize: 24,
//                 fontWeight: '700',
//               }}>
//               OTP Verification
//             </AppText>
//           </AppView>
//         </AppView>
//         <AppView style={styles.sectionTwoContainer}>
//           <AppView style={styles.lockContainer}>
//             <AppImage source={ResetIcon} />
//           </AppView>
//           <AppView style={styles.passHeadView}>
//             <AppText style={styles.txtForgotHead}>Verification Code</AppText>
//           </AppView>
//           <AppView style={styles.paraContainer}>
//             <AppText style={styles.paraTxtView}>
//               We have sent you a verification code to
//             </AppText>
//             <AppText style={styles.paraTxtView}>
//               your registered email ID
//             </AppText>
//           </AppView>

//           {/* Otp Container */}
//           <AppView style={styles.enterCodeView}>
//             <AppText style={styles.txtForgotHead}>Enter Code</AppText>
//           </AppView>
//           <AppView style={styles.placeholderContainer}>
//             <CodeInput
//               // ref="codeInputRef1"
//               codeLength={4}
//               secureTextEntry
//               activeColor="rgba(49, 180, 4, 1)"
//               inactiveColor="rgba(49, 180, 4, 1.3)"
//               autoFocus={true}
//               inputPosition="center"
//               className={'border-b'}
//               size={50}
//               onFulfill={code => _onFulfill(code)}
//               containerStyle={{marginTop: 30}}
//               codeInputStyle={{borderWidth: 1.5}}
//               // onCodeChange={code => {
//               //   console.log('code', code);
//               //   code = code;
//               // }}
//             />
//           </AppView>
//           <AppView style={styles.btnContainer}>
//             <AppTouchable
//               style={styles.btnTouchView}
//               onPress={() => _onFulfill(code)}>
//               {/* // onPress={() => props.navigation.navigate('Login')}> */}
//               <AppText style={styles.resetTxtView}>Done</AppText>
//             </AppTouchable>
//           </AppView>
//         </AppView>
//       </AppView>

//       {/* ************************************* Modal Code *************************************
//       <AppView style={{marginTop: 100}}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//             setModalVisible(!modalVisible);
//           }}>
//           <AppView style={styles.mainModalContainer}>
//             <AppView style={styles.modalImgContainer}>
//               <AppImage source={KycPrompt} />
//             </AppView>
//             <AppView style={styles.modalTxtView}>
//               <AppText style={styles.modalTxt}>Complete your KYC !</AppText>
//             </AppView>
//             <AppView style={styles.unlockModalView}>
//               <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
//                 To unlock All the features
//               </AppText>
//             </AppView>
//             <AppView style={styles.kycContainer}>
//               <AppTouchable
//                 style={styles.kycTouchView}
//                 onPress={() => props.navigation.navigate('Login')}>
//                 <AppText style={{color: 'rgb(94,28,159)', fontSize: 25}}>
//                   Complete your KYC
//                 </AppText>
//               </AppTouchable>
//             </AppView>
//             <AppView style={styles.laterBtnContainer}>
//               <AppTouchable
//                 // onPress={() => setModalVisible(!modalVisible)}
//                 onPress={() => props.navigation.navigate('Login')}>
//                 <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
//                   Later
//                 </AppText>
//               </AppTouchable>
//             </AppView>
//           </AppView>
//         </Modal>
//       </AppView>*/}
//     </SafeAreaView>
//   );
// };

// export default OtpSignupVerify;

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: height * 1,
//     width: width * 1,
//     backgroundColor: '#7A25CE',
//   },
//   blankConatiner: {
//     height: height * 0.12,
//     width: width * 1,
//     flexDirection: 'row',
//   },
//   arrowBackView: {
//     height: height * 0.06,
//     width: width * 0.3,
//     justifyContent: 'center',
//     top: 10,
//     position: 'relative',
//   },
//   headingContainer: {
//     height: height * 0.06,
//     width: width * 0.7,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     top: 10,
//     position: 'relative',
//   },
//   sectionTwoContainer: {
//     height: height * 0.88,
//     width: width * 1,
//     backgroundColor: 'rgb(255,255,255)',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   lockContainer: {
//     height: height * 0.2,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   enterCodeView: {
//     height: height * 0.07,
//     width: width * 1,
//     justifyContent: 'center',
//   },
//   txtForgotHead: {
//     color: 'rgb(48,44,44)',
//     fontSize: 22,
//     fontWeight: '600',
//     marginLeft: 20,
//   },
//   paraContainer: {
//     height: height * 0.06,
//     width: width * 1,
//     justifyContent: 'center',
//   },
//   paraTxtView: {
//     color: 'rgb(112,112,112)',
//     fontSize: 16,
//     marginLeft: 20,
//   },
//   placeholderContainer: {
//     height: height * 0.18,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   maininput: {
//     height: height * 0.08,
//     width: width * 0.9,
//     borderRadius: 10,
//     borderWidth: 0.7,
//   },
//   emailIcon: {
//     height: height * 0.04,
//     width: width * 0.12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inptTxtField: {
//     height: height * 0.04,
//     width: width * 0.88,
//     justifyContent: 'center',
//   },
//   emailConatinerView: {
//     color: 'rgb(0,0,0)',
//     fontSize: 15,
//     marginLeft: 15,
//     top: 10,
//   },
//   btnContainer: {
//     height: height * 0.1,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnTouchView: {
//     height: height * 0.07,
//     width: width * 0.75,
//     backgroundColor: 'rgb(94,28,159)',
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resetTxtView: {
//     color: 'rgb(255,255,255)',
//     fontSize: 22,
//     fontWeight: '600',
//   },
//   // acountSignUpView: {
//   //   height: height * 0.1,
//   //   width: width * 1,
//   //   justifyContent: 'flex-end',
//   //   alignItems: 'center',
//   // },
//   // txtdontView: {
//   //   fontSize: 18,
//   //   color: 'rgb(21,21,21)',
//   // },
//   // registerView: {
//   //   color: 'rgb(79,17,140)',
//   //   textDecorationLine: 'underline',
//   //   fontSize: 18,
//   //   fontWeight: '600',
//   // },
//   textinputemail: {
//     fontSize: height / 45,
//     color: 'black',
//     marginLeft: 15,
//   },

//   // Modal Style
//   centeredView: {
//     // height: height * 0.6,
//     // width: width * 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // marginTop≥: 22,
//   },
//   // modalView: {
//   //   margin: 20,
//   //   backgroundColor: 'white',
//   //   borderRadius: 20,
//   //   padding: 35,
//   //   alignItems: 'center',
//   //   shadowColor: '#000',
//   //   shadowOffset: {
//   //     width: 0,
//   //     height: 2,
//   //   },
//   //   shadowOpacity: 0.25,
//   //   shadowRadius: 4,
//   //   elevation: 5,
//   // },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   mainModalContainer: {
//     height: height * 0.6,
//     width: width * 0.85,
//     // backgroundColor: 'rgb(255,255,255)',
//     backgroundColor: 'rgb(94,28,159)',
//     borderRadius: 10,
//     left: 23,
//     top: 180,
//   },
//   modalImgContainer: {
//     height: height * 0.2,
//     width: width * 0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalTxtView: {
//     height: height * 0.06,
//     width: width * 0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalTxt: {
//     color: 'rgb(255,255,255)',
//     fontSize: 28,
//     fontWeight: '700',
//   },
//   unlockModalView: {
//     height: height * 0.05,
//     width: width * 0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   kycContainer: {
//     height: height * 0.18,
//     width: width * 0.9,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   kycTouchView: {
//     height: height * 0.08,
//     width: width * 0.6,
//     backgroundColor: 'rgb(255,255,255)',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   laterBtnContainer: {
//     height: height * 0.12,
//     width: width * 0.9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

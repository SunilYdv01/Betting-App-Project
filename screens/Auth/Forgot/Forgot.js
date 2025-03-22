import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  Image,
  View,
  Text,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
import {ArrowBackGreen, Lock, Email, BackArrow} from '../../../assets/icon';
import App from '../../../../App';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Forgot = props => {
  console.log('err', props.navigation);
  const [Email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);

  const _emailvalidate = mail => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (mail === '') {
      setErrorEmail('*Please enter email.');
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
    } else {
      setErrorEmail(null);
    }
  };
  //url: 'http://182.72.203.247:4094/account/forget-password/mobiloitApp';//
  const validate = () => {
    let flag = true;
    if (Email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      //alert('Reset Success!');
    }
    console.log('error--->', Email);
    axios({
      method: 'get',
      // url: 'https://java-create-token.mobiloitte.org/account/forget-password/mobiloitApp',
      url: 'http://182.72.203.247:4094/account/forget-password/mobiloitApp',
      params: {
        email: Email,
      },
      headers: {'content-type': 'application/json'},
    })
      .then(res => {
        console.log('res-->>', res.data);
        if (res.data.status === 200) {
          // alert('Success---');
          props.navigation.navigate('Reset');
          //  ToastAndroid.show('Successful Login', ToastAndroid.LONG);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('err', err));
    // }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <AppView style={styles.mainContainer}>
          <AppView style={styles.blankConatiner}>
            <AppView style={styles.arrowBackView}>
              <AppTouchable onPress={() => props.navigation.navigate('Login')}>
                <AppImage
                  resizemode="contain"
                  source={BackArrow}
                  style={{
                    marginLeft: 15,
                    tintColor: 'lightgreen',
                    height: height / 50,
                    width: width / 15,
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
                Forgot Password
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.sectionTwoContainer}>
            <AppView style={styles.lockContainer}>
              <AppImage source={Lock} />
            </AppView>
            <AppView style={styles.passHeadView}>
              <AppText style={styles.txtForgotHead}>
                Forgot Your Password ?
              </AppText>
            </AppView>
            <AppView style={styles.paraContainer}>
              <AppText style={styles.paraTxtView}>
                Enter your Email Address and we will send you a
              </AppText>
              <AppText style={styles.paraTxtView}>
                link to reset your password
              </AppText>
            </AppView>
            <AppView style={styles.placeholderContainer}>
              {/* <AppView style={styles.maininput}>
              <AppView style={{height: height * 0.04, width: width * 0.9}}>
                <AppText style={styles.emailConatinerView}>Email</AppText>
              </AppView>
              <AppView style={{flexDirection: 'row'}}>
                <AppView style={styles.emailIcon}>
                  <AppImage resizeMode="contain"
                    source={require('../../../assets/images/Email/Email.png')}
                  />
                </AppView>
                <AppView style={styles.inptTxtField}>
                  <TextInput
                    style={styles.textinputemail}
                    placeholder="Enter Your Email"
                    keyboardType="email-address"
                    maxLength={256}
                    autoCapitalize="none"
                    onChangeText={txt => {
                      setEmail(txt), _emailvalidate(txt);
                    }}
                  />
                </AppView>
               
              </AppView>
            </AppView> */}
              <AppView style={styles.secondtwoView}>
                <AppView style={styles.textinput2View}>
                  <AppView
                    style={{height: height * 0.038, justifyContent: 'center',}}>
                    <AppText style={styles.labelContainer}>Email</AppText>
                  </AppView>
                  <AppView
                    style={{
                      height: height * 0.04,
                      justifyContent: 'center',
                      marginHorizontal: 10.5,
                     // backgroundColor:'red'
                     
                    }}>
                    <TextInput
                      syle={styles.passwortdtextinput}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      placeholderTextColor='grey'
                      maxLength={50}
                      autoCapitalize="none"
                      onChangeText={txt => {
                        setEmail(txt), _emailvalidate(txt);
                      }}
                    />
                  </AppView>
                </AppView>
              </AppView>
              {errorEmail != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width * 1,
                  }}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                    {errorEmail}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
            <AppView style={styles.btnContainer}>
              <AppTouchable
                style={styles.btnTouchView}
                onPress={() => props.navigation.navigate('Reset')}>
                <AppText style={styles.resetTxtView}>Reset Password</AppText>
              </AppTouchable>
            </AppView>
            <AppView style={styles.acountSignUpView}>
              <AppView style={{flexDirection: 'row'}}>
                <AppView style={styles.accountView}>
                  <AppText style={styles.txtdontView}>
                    Don't have an account ?
                  </AppText>
                </AppView>
                <AppView style={styles.signupView}>
                  <AppTouchable
                    onPress={() => props.navigation.navigate('RegisterScreen')}>
                    <AppText style={styles.registerView}>Signup</AppText>
                  </AppTouchable>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Forgot;

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
    width: width * 0.26,
    justifyContent: 'center',
    top: 10,
    position: 'relative',
    //backgroundColor:'yellow'
  },
  headingContainer: {
    height: height * 0.06,
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 10,
    position: 'relative',
   // backgroundColor:'red'
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
  passHeadView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize: 25,
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
    fontSize: 15,
    marginLeft: 20,
  },
  placeholderContainer: {
    height: height * 0.18,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maininput: {
    height: height * 0.085,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 0.7,
  },
  emailIcon: {
    height: height * 0.04,
    width: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  inptTxtField: {
    height: height * 0.045,
    width: width * 0.78,
    // justifyContent: 'center',
    // backgroundColor: "green",
    textAlign: 'center',
    // fontSize:height/60
  },
  emailConatinerView: {
    color: 'rgb(0,0,0)',
    fontSize: 15,
    marginLeft: 9,
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
  acountSignUpView: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtdontView: {
    fontSize: 18,
    color: 'rgb(21,21,21)',
  },
  registerView: {
    color: 'rgb(79,17,140)',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 2,
  },
  textinputemail: {
    // height: height*0.05,
    fontSize: height / 60,
    color: 'black',
    marginHorizontal: 15,
    backgroundColor: 'red',
    // textAlignVertical: 'bottom',
    justifyContent: 'flex-end',
    padding: 5,
  },

  // New Styling
  secondtwoView: {
    height: height / 9,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput2View: {
    height: height / 11,
    width: width / 1.1,
    // backgroundColor: 'rgb(94,28,159)',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 0.8,
    borderBottomWidth:2
    // justifyContent: 'center',
  },
  labelContainer: {
    fontSize: height / 50,
    color: 'rgb(0,0,0)',
    marginLeft: 10,
    // top: 8,
  },
  textinputemail: {
    fontSize: height / 55,
    color: 'white',
    marginHorizontal: 15,
    // backgroundColor:'red'
  },
  passwortdtextinput: {
    fontSize: height / 55,
    // color: 'white',
    backgroundColor: 'red',
    // padding:5,

    width: width / 2,

    color: 'black',
  },
});

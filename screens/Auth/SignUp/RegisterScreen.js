import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
import {LoginLogo, CheckboxIcon, Check} from '../../../assets/icon';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = props => {
  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  const [Username, setUsername] = useState('');
  const [checkUsername, setCheckUsername] = useState(true);
  const [errorUsername, setErrorUsername] = useState(null);

  const [Email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);

  const [newpassword, setNewpassword] = useState(null);
  const [checknewPassword, setChecknewPassword] = useState(false);
  const [errornewPassword, setErrornewPassword] = useState(null);

  const [confirmpassword, setConfirmpassword] = useState(null);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  //************************************* UserName Validation *************************************

  const _validateUserName = Uname => {
    var UnameRegex = /^[a-z A-Z @_]{3,32}$/i;
    var Uname = Uname.trim();
    if (Uname == '' || Uname == undefined || Uname == null) {
      setErrorUsername('*Please enter username.');
    } else if (!UnameRegex.test(Uname)) {
      setErrorUsername('*Please enter valid username.');
    } else {
      setErrorUsername(null);
    }
  };

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

  const _newpasswordvalidate = pass => {
    var newpasswordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (pass === '') {
      setErrornewPassword('*Please enter password.');
    } else if (!newpasswordRegex.test(pass)) {
      setErrornewPassword('*Please enter valid password.');
    } else {
      setErrornewPassword(null);
    }
  };

  const _confirmpassword = pass => {
    if (newpassword != pass) {
      setErrorConfirmPassword("*Password don't match");
      setCheckConfirmPassword(false);
    } else {
      setCheckConfirmPassword(true);
      setErrorConfirmPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (Username === '') {
      setErrorUsername('*Please enter username.');
      flag = false;
    }
    if (Email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }
    if (newpassword === '') {
      setErrornewPassword('*Please enter password.');
      flag = false;
    }
    if (confirmpassword === '') {
      setErrorConfirmPassword('*Please enter confirm password.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      props.navigation.navigate('SignUp', {
        userName: Username,
        email: Email,
        password: newpassword,
        confirmPassword: confirmpassword,
      });
    }
    axios({
      method: 'post',
      // url: 'http://182.72.203.247:4094/account/signup',
      url: 'https://java-create-token.mobiloitte.org/account/signup',
      data: {
        username: Username,
        email: Email,
        password: newpassword,
        confirmpassword: confirmpassword,
      },
      headers: {'content-type': 'application/json'},
    })
      .then(res => {
        console.log('res', res.data);
        if (res.data.status === 200) {
          alert('Success');
          // props.navigation.navigate('VerifyOtp', {email: Email});
        } else {
          alert('Something went wrong!');
        }
      })
      .catch(err => {
        // alert('re-try catch');
        console.log('err catch', err);
      });
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <KeyboardAwareScrollView>
        <AppView style={styles.mainView}>
          <AppView style={styles.titleImgView}>
            <AppImage source={LoginLogo} style={{height: 120}} />
          </AppView>
          <View style={{height: height / 2.35}}>
            <AppView style={styles.txtInptContainer}>
              {/* TextInput One */}
              <AppView style={styles.secondfirst}>
                {/* <AppView style={styles.textinput2View}>
              <AppText style={styles.labelContainer}>Username</AppText>
              <TextInput
                style={styles.textinputemail}
                placeholderTextColor="white"
                placeholder="Enter Username"
                keyboardType="default"
                maxLength={60}
                onChangeText={txt => {
                  setUsername(txt), _validateUserName(txt);
                }}
              />
            </AppView>
          </AppView> */}
                <AppView style={styles.textinput3View}>
                  <AppView
                    style={{
                      height: height * 0.03,
                      justifyContent: 'flex-end',
                      width: width / 1.45,
                      alignItems: 'flex-start',
                      alignSelf: 'center',
                    }}>
                    <AppText style={styles.labelContainer3}>Username</AppText>
                  </AppView>
                  <AppView
                    style={{
                      height: height * 0.043,
                      width: width / 1.12,
                      flexDirection: 'row',
                    }}>
                    <View style={{width: width / 10, alignItems: 'center'}}>
                      <AppImage
                        source={require('/Users/admin/Desktop/create-token-on-ethereum-blockchain-21053822-react/src/assets/images/user.png')}
                        style={{
                          height: height / 35,
                          width: width / 15,

                          tintColor: 'white',
                          resizeMode: 'contain',
                          // backgroundColor: 'yellow',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width / 1.48,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: 2.2,
                        // backgroundColor:'red'
                      }}>
                      <TextInput
                        style={styles.passwordtextinput}
                        placeholderTextColor="white"
                        placeholder="Enter Username"
                        keyboardType="default"
                        maxLength={60}
                        onChangeText={txt => {
                          setUsername(txt), _validateUserName(txt);
                        }}
                      />
                    </View>
                  </AppView>
                </AppView>
              </AppView>
              {errorUsername != null ? (
                <AppView
                  style={{
                    height: height * 0.02,
                    width: width * 1,
                  }}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                    {errorUsername}
                  </AppText>
                </AppView>
              ) : null}

              {/* TextInput Two */}

              <AppView style={styles.secondfirst}>
                <AppView style={styles.textinput3View}>
                  <AppView
                    style={{
                      height: height * 0.03,
                      justifyContent: 'flex-end',
                      width: width / 1.338,
                      alignItems: 'flex-start',
                      alignSelf: 'center',
                      // backgroundColor:'green'
                    }}>
                    <AppText style={styles.labelContainer1}>Email</AppText>
                  </AppView>
                  <AppView
                    style={{
                      // height: height * 0.05,
                      // justifyContent: 'space-around',
                      height: height * 0.043,
                      width: width / 1.1,
                      flexDirection: 'row',
                      //   backgroundColor: 'red',
                    }}>
                    <View style={{width: width / 10, alignItems: 'center'}}>
                      <AppImage
                        source={require('/Users/admin/Desktop/create-token-on-ethereum-blockchain-21053822-react/src/assets/images/user.png')}
                        style={{
                          height: height / 35,
                          width: width / 15,
                          tintColor: 'white',
                          resizeMode: 'contain',
                          // backgroundColor: 'yellow',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width / 1.5,
                        //alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: 2,
                        //backgroundColor:'red'
                      }}>
                      <TextInput
                        style={styles.textinputemail}
                        placeholderTextColor="white"
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        maxLength={256}
                        autoCapitalize="none"
                        onChangeText={txt => {
                          setEmail(txt), _emailvalidate(txt);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // backgroundColor:'yellow',
                        width: width / 9,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../../assets/images/tick.png')}
                          style={{
                            height: height / 30,
                            width: width / 15,
                            //tintColor: 'white',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </AppView>
                </AppView>
              </AppView>

              {errorEmail != null ? (
                <AppView
                  style={{
                    height: height * 0.022,
                    width: width * 1,
                    // backgroundColor:'green',
                    justifyContent: 'center',
                  }}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                    {errorEmail}
                  </AppText>
                </AppView>
              ) : null}
              {/* TextInput Three */}
              <AppView style={styles.secondfirst}>
                <AppView style={styles.textinput3View}>
                  <AppView
                    style={{
                      height: height * 0.03,
                      justifyContent: 'flex-end',
                      width: width / 1.338,
                      alignItems: 'flex-start',
                      alignSelf: 'center',
                      // backgroundColor: 'green',
                    }}>
                    <AppText style={styles.labelContainer2}>Password</AppText>
                  </AppView>
                  <AppView
                    style={{
                      //height: height * 0.05,
                      // justifyContent: 'space-around',
                      height: height * 0.043,
                      width: width / 1.12,
                      flexDirection: 'row',

                      // backgroundColor: 'cyan',
                    }}>
                    <View style={{width: width / 10, alignItems: 'center'}}>
                      <AppImage
                        source={require('/Users/admin/Desktop/create-token-on-ethereum-blockchain-21053822-react/src/assets/images/pass.png')}
                        style={{
                          height: height / 35,
                          width: width / 15,

                          tintColor: 'white',
                          resizeMode: 'contain',
                          // backgroundColor: 'yellow',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width / 1.48,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: 2.2,
                        // backgroundColor:'red'
                      }}>
                      <TextInput
                        style={styles.passwordtextinput}
                        secureTextEntry={true}
                        placeholderTextColor="white"
                        placeholder="Enter Password"
                        keyboardType="default"
                        maxLength={16}
                        onChangeText={txt => {
                          setNewpassword(txt), _newpasswordvalidate(txt);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // backgroundColor:'yellow',
                        width: width / 10,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../../assets/images/eye.png')}
                          style={{
                            height: height / 30,
                            width: width / 15,

                            tintColor: 'white',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </AppView>
                </AppView>
              </AppView>
              {errornewPassword != null ? (
                <AppView style={{height: height * 0.02, width: width * 1}}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 18}}>
                    {errornewPassword}
                  </AppText>
                </AppView>
              ) : null}

              {/* TextInput Four */}
              <AppView style={styles.secondfirst}>
                <AppView style={styles.textinput3View}>
                  <AppView
                    style={{
                      height: height * 0.03,
                      justifyContent: 'flex-end',
                      width: width / 1.338,
                      alignItems: 'flex-start',
                      alignSelf: 'center',
                      // backgroundColor: 'green',
                    }}>
                    <AppText style={styles.labelContainer2}>
                      Confirm Password
                    </AppText>
                  </AppView>
                  <AppView
                    style={{
                      height: height * 0.043,
                      width: width / 1.12,
                      flexDirection: 'row',
                    }}>
                    <View style={{width: width / 10, alignItems: 'center'}}>
                      <AppImage
                        source={require('/Users/admin/Desktop/create-token-on-ethereum-blockchain-21053822-react/src/assets/images/pass.png')}
                        style={{
                          height: height / 35,
                          width: width / 15,

                          tintColor: 'white',
                          resizeMode: 'contain',
                          // backgroundColor: 'yellow',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width / 1.48,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: 2.2,
                        // backgroundColor:'red'
                      }}>
                      <TextInput
                        style={styles.passwordtextinput}
                        secureTextEntry={true}
                        placeholderTextColor="white"
                        placeholder="Enter Confirm Password"
                        keyboardType="default"
                        maxLength={16}
                        onChangeText={txt => {
                          setConfirmpassword(txt), _confirmpassword(txt);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        // backgroundColor:'yellow',
                        width: width / 10,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../../assets/images/eye.png')}
                          style={{
                            height: height / 30,
                            width: width / 15,

                            tintColor: 'white',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </AppView>
                </AppView>
              </AppView>
              {errorConfirmPassword != null ? (
                <AppView style={{height: height * 0.02, width: width * 1}}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 18}}>
                    {errorConfirmPassword}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
          </View>
          <AppView style={styles.checkBoxContainer}>
            <AppView style={{marginLeft: 12}}>
              <AppTouchable
                onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}>
                <AppImage
                  resizeMode="contain"
                  source={iAgree ? CheckboxIcon : Check}
                  style={{height: 20, width: 20}}
                />
              </AppTouchable>
            </AppView>
            <AppView style={{flexDirection: 'row'}}>
              <AppText style={styles.termspolicyView}>
                I agree Winsum application
              </AppText>
              <TouchableOpacity>
                <Text style={styles.txt5}>Terms & Conditions</Text>
              </TouchableOpacity>
              {/* <AppText>policy and content policy.</AppText> */}
            </AppView>
          </AppView>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnViewContainer}
              onPress={() => onSubmit()}>
              <AppText style={styles.btnTxt}>SignUp</AppText>
            </AppTouchable>
          </AppView>
          <AppView style={styles.alreadyAccountContainer}>
            <AppView style={styles.txtOneView}>
              <AppText
                style={{
                  color: 'rgb(255,255,255)',
                  fontSize: 18,
                  // fontWeight: '600',
                }}>
                Already have an account ?
              </AppText>
            </AppView>
            <AppView style={styles.txtTwoView}>
              <AppTouchable onPress={() => props.navigation.navigate('Login')}>
                <AppText
                  style={{
                    textDecorationLine: 'underline',
                    color: 'rgb(255,255,255)',
                    fontSize: 18,
                    //   fontWeight: '600',
                  }}>
                  {' '}
                  Login
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainView: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#7A25CE',
  },
  titleImgView: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInptContainer: {
    height: height * 0.43,
    width: width * 1,
  },
  inptFieldView: {
    height: height * 0.09,
    width: width * 1,
  },
  textinput2View: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: '#7A25CE',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  textinputemail: {
    fontSize: height / 55,
    color: 'white',
    //marginLeft: 15,
    //  backgroundColor: 'red',
  },
  secondfirst: {
    height: height / 10,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkBoxContainer: {
    height: height * 0.1,
    width: width * 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 5,
    //backgroundColor:'black'
  },
  termspolicyView: {
    color: 'rgb(255,255,255)',
    fontSize: height / 55,
    // fontWeight: '600',
    paddingHorizontal: 5,
  },
  btnContainer: {
    height: height / 7.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  btnTxt: {
    color: '#7A25CE',
    fontSize: 25,
    fontWeight: '700',
  },
  btnViewContainer: {
    height: height * 0.07,
    width: width * 0.9,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyAccountContainer: {
    height: height * 0.07,
    width: width * 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtOneView: {
    height: height * 0.07,
    fontWeight: '700',
    color: 'rgb(255,255,255)',
    fontSize: 20,
  },
  txtOneView: {
    height: height * 0.07,
    fontWeight: '700',
    color: 'rgb(255,255,255)',
    fontSize: 20,
  },
  labelContainer: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    marginLeft: 18,
    top: 10,
  },

  textinput3View: {
    height: height / 11,
    width: width / 1.1,
    backgroundColor: '#7A25CE',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  labelContainer2: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    //marginLeft: 12,
    // top: 8,
    paddingHorizontal: 9,
  },
  passwordtextinput: {
    fontSize: height / 55,
    width: width / 1.48,
    color: 'white',
    // marginHorizontal: 15,
    // backgroundColor: 'red',
  },
  labelContainer1: {
    fontSize: height / 55,
    color: 'rgb(255,255,255)',
    // marginLeft: 10,
    // top: 8,
    //backgroundColor:'red',
    width: width / 6.5,
    textAlign: 'center',
  },
  labelContainer3: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    //marginLeft: 12,
    // top: 8,
    //paddingHorizontal: 9,
  },
  txt5: {
    color: 'rgb(255,255,255)',
    fontSize: height / 55,
    // fontWeight: '600',
    // paddingHorizontal:10
    textDecorationLine: 'underline',
  },
});

import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
import {
  ArrowBackGreen,
  Email,
  ChangePassword,
  ShowPassword,
  HideEye,
  BackArrow,
} from '../../../assets/icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChangePass = props => {
  const [HidePassword, setHidePassword] = useState(true);
  const [HidePassword2, setHidePassword2] = useState(true);

  const [userId, setUserId] = useState('');

  const [newpassword, setNewpassword] = useState(null);
  const [checknewPassword, setChecknewPassword] = useState(false);
  const [errornewPassword, setErrornewPassword] = useState(null);

  const [confirmpassword, setConfirmpassword] = useState(null);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  const _newpasswordvalidate = pass => {
    var newpasswordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (pass === '') {
      setErrornewPassword('*Please enter new password.');
    } else if (!newpasswordRegex.test(pass)) {
      setErrornewPassword('*Please enter valid new password.');
    } else {
      setErrornewPassword(null);
    }
  };

  const _connewpasswordvalidate = pass => {
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

  const onSubmit = async () => {
    if (validate()) {
    }
    console.log('newpassword----->>>', confirmpassword);
    console.log('oldpassword----->>>', newpassword);
    console.log('token--->>>', value);

    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);

    axios({
      method: 'post',
      url: 'https://java-create-token.mobiloitte.org/account/change-password',
      body: {
        newpassword: newpassword,
        confirmpassword: confirmpassword,
      },
      headers: {
        Authorization: value,
        // userId: 'userId',
        'content-type': 'application/json',
      },
    })
      .then(res => {
        console.log('res--->>>>', res.data);
        if (res.data.status === 200) {
          props.navigation.navigate('ChangePasswordSuccess');
        } else if (res.status === 201) {
          alert('Created');
        } else if (res.status === 205) {
          alert('Old password and new password must be different');
        } else if (res.status === 401) {
          alert(' Unauthorized');
        } else if (res.status === 403) {
          alert('For bidden');
        } else if (res.status === 404) {
          alert('Data Not Found');
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('err catch--->>>', err));
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <KeyboardAwareScrollView>
        <AppView style={styles.mainContainer}>
          <AppView style={styles.blankConatiner}>
            <AppView style={styles.arrowBackView}>
              <AppTouchable onPress={() => props.navigation.navigate('Reset')}>
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
                Change Password
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.sectionTwoContainer}>
            <AppView style={styles.lockContainer}>
              <AppImage source={ChangePassword} />
            </AppView>
            <AppView style={styles.passHeadView}>
              <AppText style={styles.txtForgotHead}>
                Create New Password
              </AppText>
            </AppView>
            <AppView style={styles.paraContainer}>
              <AppText style={styles.paraTxtView}>
                Enter you new password below, we're just
              </AppText>
              <AppText style={styles.paraTxtView}>being extra safe</AppText>
            </AppView>

            {/* Text Input Container */}
            <AppView style={{height: height * 0.28, justifyContent: 'center'}}>
              <AppView style={styles.placeholderContainer}>
                <AppView style={styles.mainTxtFieldView}>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      secureTextEntry={HidePassword ? true : false}
                      placeholder="Enter New Password"
                      keyboardType="default"
                      maxLength={16}
                      onChangeText={txt => {
                        setNewpassword(txt), _newpasswordvalidate(txt);
                      }}
                    />
                  </AppView>
                  <AppView style={styles.eyeIconView}>
                    <AppTouchable
                      onPress={() => setHidePassword(!HidePassword)}>
                      <AppImage
                        source={HidePassword ? HideEye : ShowPassword}
                        style={{height: 15, width: 20}}
                      />
                    </AppTouchable>
                  </AppView>
                </AppView>
              </AppView>
              {errornewPassword != null ? (
                <AppView style={{height: height * 0.02, width: width * 1}}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 25}}>
                    {errornewPassword}
                  </AppText>
                </AppView>
              ) : null}

              <AppView style={styles.placeholderContainer}>
                <AppView style={styles.mainTxtFieldView}>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      secureTextEntry={HidePassword2 ? true : false}
                      placeholder="Confirm New Password"
                      keyboardType="default"
                      maxLength={16}
                      onChangeText={txt => {
                        setConfirmpassword(txt), _connewpasswordvalidate(txt);
                      }}
                    />
                  </AppView>
                  <AppView style={styles.eyeIconView}>
                    <AppView style={styles.eyeIconView}>
                      <AppTouchable
                        onPress={() => setHidePassword2(!HidePassword2)}>
                        <AppImage
                          source={HidePassword2 ? HideEye : ShowPassword}
                          style={{height: 15, width: 20}}
                        />
                      </AppTouchable>
                    </AppView>
                  </AppView>
                </AppView>
              </AppView>
              {errorConfirmPassword != null ? (
                <AppView style={{height: height * 0.02, width: width * 1}}>
                  <AppText style={{color: 'red', fontSize: 13, marginLeft: 25}}>
                    {errorConfirmPassword}
                  </AppText>
                </AppView>
              ) : null}
            </AppView>
            <AppView style={styles.btnContainer}>
              <AppTouchable
                style={styles.btnTouchView}
                onPress={() => props.navigation.navigate('ChangePasswordSuccess')}>
                <AppText style={styles.resetTxtView}>Change Password</AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;

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
  passHeadView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize: 23,
    fontWeight: '800',
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
    height: height * 0.18,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  placeholderContainer: {
    height: height * 0.09,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inptTxtField: {
    height: height * 0.07,
    width: width * 0.75,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },
  eyeIconView: {
    height: height * 0.07,
    width: width * 0.12,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTxtFieldView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 0.5,
  },
});

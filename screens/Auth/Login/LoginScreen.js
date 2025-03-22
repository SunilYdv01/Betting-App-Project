import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  Modal,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import {
  LoginLogo,
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  HideEye,
  KycPrompt,
} from '../../../assets/icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader/index';

// Import GoogleSignIn
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

// Import FBSDK
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {TouchableOpacity} from 'react-native-gesture-handler';
// ************* Twitter Login Keys *************

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'qWPj1TXbreMX1SsDvdiQTaF7Y',
  TWITTER_CONSUMER_SECRET: '4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z',
};
//const {RNTwitterSignIn} = NativeModules;
// ************* Google Login Keys *************
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '31824317590-nvarplin90ot024puk8nro6kmdj855s6.apps.googleusercontent.com',
  //'31824317590-nvarplin90ot024puk8nro6kmdj855s6.apps.googleusercontent.org',
});

const Login = props => {
  const [loader, setLoader] = useState(false);

  // ****************** Facebook Login State ******************
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [socialtype, setSocialType] = useState('');
  const [fbdata, setFbData] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');

  // ****************** Social- Google Login Integration ******************
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  // useEffect(() => {
  //   _isSignedIn();
  // }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // alert('User is already signed in'); jldi kijiye n
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      gmailRegistration(info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      gmailRegistration(userInfo.user);

      console.log('User Info...vandoo --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const gmailRegistration = async fbdata => {
    console.log('fbdata===vandoo==>', fbdata);
    let body = {
      address: '',
      browseSecrateKey: '',
      city: '',
      country: '',
      countryCode: '',
      deviceToken: '',
      deviceType: '',
      dob: '',
      email: fbdata.email,
      firstName: fbdata.name,
      imageUrl: '',
      lastName: '',
      password: fbdata.id,
      pnWithoutCountryCode: '',
      refferalCode: '',
      roleStatus: 'USER',
      socialId: fbdata.id,
      socialType: 'GOOGLE',
      ssn: '',
      state: '',
      userName: '',
      webUrl: '',
    };
    // let body = formdata
    console.log(
      body,
      'https://java-create-token.mobiloitte.org/account/signup',
      //'http://172.16.16.247:4094/account/signup',
    );

    fetch(
      'https://java-create-token.mobiloitte.org/account/signup',
      //'http://172.16.16.247:4094/account/signup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
      .then(response => response.json())

      .then(async res => {
        setLoader(false);
        console.log('res--Google..vandoo---->>', res, res.data);

        if (res.data === 200) {
          console.log('token....vandana', res.data);
          await AsyncStorage.setItem('token', res.data.data);
          setModalVisible(true);
          props.navigation.navigate('KycPersonalInfo');
        } else {
          alert(res.message);
          loginfun(body);
        }
      })
      .catch(error => {
        console.log('error res===Google====>res', error);
      });
  };
  //<<==================Twitter===================>
  const twitterRegistration = data => {
    let body = {
      address: 'main market',
      browseSecrateKey: '1234',
      city: 'BALLIA',
      country: 'India',
      countryCode: '+91',
      deviceToken: 'string',
      deviceType: 'Window',
      dob: '12/8/1999',
      email: Email,
      firstName: 'Deepali',
      imageUrl: 'string',
      lastName: 'Shukla',
      password: Password,
      phoneNo: phone,
      pnWithoutCountryCode: 'string',
      refferalCode: 'ASDFGH11',
      roleStatus: 'USER',
      socialId: 'string',
      socialType: socialtype,
      ssn: 'ASDF11',
      state: 'U.P',
      userName: userName,
      webUrl: 'string',
    }; // let body = formdata
    fetch('https://java-create-token.mobiloitte.com/account/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())

      .then(async res => {
        setLoader(false);
        console.log('res--Twitter..vandoo---->>', res, res.data);

        if (res.data === 200) {
          console.log('token', res.data.data);
          await AsyncStorage.setItem('token', res.data.data);
          setModalVisible(true);
          //props.navigation.navigate('KycPersonalInfo');
        } else {
          alert(res.message);
          loginfun(body);
        }
      })
      .catch(error => {
        console.log('error res===vando ..twitter====>res', error);
      });
  };
  //<___--------------Twitterlogin---------------->

  const fbRegistration = async fbdata => {
    console.log('fbdata===vandoo==>', fbdata);
    let body = {
      address: '',
      browseSecrateKey: '',
      city: '',
      country: '',
      countryCode: '',
      deviceToken: '',
      deviceType: '',
      dob: '',
      email: fbdata.email,
      firstName: fbdata.name,
      imageUrl: '',
      lastName: '',
      password: fbdata.id,
      pnWithoutCountryCode: '',
      refferalCode: '',
      roleStatus: 'USER',
      socialId: fbdata.id,
      socialType: 'FACEBOOK',
      ssn: '',
      state: '',
      userName: fbdata.name,
      webUrl: '',
    }; // let body = formdata
    console.log(
      body,
      'https://java-create-token.mobiloitte.org/account/signup',
      //'http://172.16.16.247:4094/account/signup',
    );

    fetch(
      'https://java-create-token.mobiloitte.org/account/signup',
      //'http://172.16.16.247:4094/account/signup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
      .then(response => response.json())

      .then(async res => {
        setLoader(false);
        console.log('res--facebookVANdan---->>', res, res.data);

        if (res.data === 200) {
          console.log('token', res.data.data);
          await AsyncStorage.setItem('token', res.data.data);
          setModalVisible(true);
          //props.navigation.navigate('KycPersonalInfo');
        } else {
          alert(res.message);
          loginfun(body);
        }
      })
      .catch(error => {
        console.log('error res===facebook====>res', error);
      });
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  // ****************** Social-Facebook Login Integration ******************

  const _onLoginFinished = (error, result) => {
    if (error) {
      alert(error);
      console.log('Login has error: ' + result.error);
    } else if (result.isCancelled) {
      alert('Login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        console.log(data.accessToken.toString());
        const processRequest = new GraphRequest(
          '/me?fields=name,picture.type(large)',
          null,
          getResponseInfo,
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(processRequest).start();
      });
    }
  };

  const getResponseInfo = (error, result) => {
    if (error) {
      //Alert for the Error
      alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      console.log('======>', result);
      setUserName('Welcome ' + result.name);
      // alert('hi vandana');
      fbRegistration(result);
      setToken('User Token: ' + result.id);
      setProfilePic(result.picture.fbdata.url);
    }
  };

  const onLogout = () => {
    //Clear the state after logout
    setUserName(null);
    setToken(null);
    setProfilePic(null);
  };
  // ****************** Social-Twitter Login Integration ******************
  // const [modalVisibleValue, setModalVisibleValue] = useState(false);

  const [description, setDescription] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailID, setEmailId] = useState('');

  const [hidePass, setHidePass] = useState(true);
  const [EmailValidation, setEmailValidation] = useState('');

  const [Email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);

  const [Password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState(true);
  const [errorPassword, setErrorPassword] = useState(null);

  const [phone, setPhone] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

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

  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
      setErrorPassword('*Please enter a special character ');
    } else if (!passwordRegex.test(pass)) {
      setErrorPassword('*Please enter valid password.');
    } else {
      setErrorPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (Email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }
    if (Password === '') {
      setErrorPassword('*Please enter password.');
      flag = false;
    }
    return flag;
  };

  const loginfun = body => {
    console.log('pass', Password);
    // if (validate()) {
    setLoader(true);
    axios({
      method: 'post',
      //url: 'http://172.16.16.247:4094/auth',
      url: 'https://java-create-token.mobiloitte.org/auth',
      data: {
        email: body.email,
        password: body.socialId,
      },
      headers: {'content-type': 'application/json'},
    })
      .then(async res => {
        setLoader(false);
        console.log('res--vandoo>>', res, res.data.status);

        if (res.data.status === 200) {
          console.log('token', res.data.data.token);
          await AsyncStorage.setItem('token', res.data.data.token);
          setModalVisible(true);
          props.navigation.navigate('KycPersonalInfo');
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('err', err));
    setLoader(false);
  };

  const onSubmit = () => {
    console.log('pass', Password);
    if (validate()) {
      setLoader(true);
      axios({
        method: 'post',
        //url: 'http://172.16.16.247:4094/auth',
        url: 'https://java-create-token.mobiloitte.org/auth',
        data: {
          email: Email,
          password: Password,
        },
        headers: {'content-type': 'application/json'},
      })
        .then(async res => {
          setLoader(false);
          console.log('res-->>', res, res.data.status);

          if (res.data.status === 200) {
            console.log('token', res.data.data.token);
            await AsyncStorage.setItem('token', res.data.data.token);
            setModalVisible(true);
            props.navigation.navigate('KycPersonalInfo');
          } else {
            alert('Something went wrong.');
          }
        })
        .catch(err => console.log('err', err));
      setLoader(false);
    }
  };

  const getUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
        fbRegistration(json);
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  const FBLogin = () => {
    LoginManager.setLoginBehavior('WEB_ONLY');

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const data = await AccessToken.getCurrentAccessToken();
          getUser(data.accessToken);

          console.log(data.accessToken);
          // console.log("permission ", data)
          // if (!data) {
          //     // handle this however suites the flow of your app
          //     throw new Error('Something went wrong obtaining the users access token');
          // }
          // const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

          // // login with credential
          // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
          // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
          // this.callLoginApi('fbRegistration')
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  return (
    <SafeAreaView backgroundColor="rgb(94,28,159)">
      <AppView style={styles.mainView}>
        <AppView style={styles.titleImgView}>
          <AppImage
            resizeMode="contain"
            source={require('../../../assets/images/NewImages/Asset11.png')}
            style={{height: 120, width: 250}}
          />
        </AppView>

        <AppView style={styles.seconinnerView}>
          {/* *************** Email *************** */}
          <AppView style={styles.secondfirst}>
            <AppView style={styles.textinput2View}>
              <AppView
                style={{
                  height: height * 0.03,
                  justifyContent: 'flex-end',
                  width: width / 3,
                  alignItems: 'center',
                 // alignSelf: 'center',
                 // backgroundColor:'green'
                }}>
                <AppText style={styles.labelContainer1}>Email</AppText>
              </AppView>
              <AppView
                style={{
                //  height: height * 0.05,
                  // justifyContent: 'space-around',
                  height: height * 0.04,
                  width: width / 1.1,
                  flexDirection: 'row',
                   // backgroundColor: 'red',
                }}>
                <View style={{width: width / 9, alignItems: 'center'}}>
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
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: 2,
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
                    width: width / 12,
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
                height: height * 0.02,
                width: width * 1,
              }}>
              <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                {errorEmail}
              </AppText>
            </AppView>
          ) : null}
          {/* *************** Password *************** */}
          <AppView style={styles.secondtwoView}>
            <AppView style={styles.textinput2View}>
              <AppView
                style={{
                  height: height * 0.03,
                  justifyContent: 'flex-end',
                  width: width / 2.6,
                  alignItems: 'center',
                 // alignSelf: 'center',
                //  backgroundColor:'green'
                }}>
                <AppText style={styles.labelContainer}>Password</AppText>
              </AppView>
              <AppView
                style={{
                  height: height * 0.04,
                  width: width / 1.1,
                  flexDirection: 'row',
                 // backgroundColor:'red'
                }}>
                <View style={{}}>
                <AppImage
                  source={require('/Users/admin/Desktop/create-token-on-ethereum-blockchain-21053822-react/src/assets/images/pass.png')}
                  style={{
                    height: height / 32,
                    width: width / 10,
                    tintColor: 'white',
                    resizeMode: 'contain',
                    // backgroundColor: 'yellow',
                  }}
                />
                </View>
                <TextInput
                  style={styles.passwordtextinput}
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  placeholder="xxxxxxxxxxxxx"
                  maxLength={16}
                  keyboardType="default"
                  onChangeText={txt => {
                    setPassword(txt), _passwordvalidate(txt);
                  }}
                />
                <View
                  style={{
                   // backgroundColor:'yellow',
                    width: width / 3.85,
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
          {errorPassword != null ? (
            <AppView
              style={{
                height: height * 0.025,
                width: width * 1,
                top: -4,
                // backgroundColor:'green',
                // justifyContent:'center'
              }}>
              <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                {errorPassword}
              </AppText>
            </AppView>
          ) : null}
        </AppView>
        <AppView>
          {/* <AppView style={styles.thirdfirstView}></AppView> */}
          <AppView style={styles.thirdsecondview}>
            <AppTouchable onPress={() => props.navigation.navigate('Forgot')}>
              <AppText style={styles.forgotText}>Forgot Password ?</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
        <AppView style={styles.fourthview}>
          <AppTouchable
            onPress={() => onSubmit()}
            //onPress={() => props.navigation.navigate('pay')}
          >
            <AppView style={styles.loginView}>
              <AppText style={styles.logintext}>Continue</AppText>
            </AppView>
          </AppTouchable>
        </AppView>
        <AppView style={styles.fifthView}>
          <AppView style={styles.fifthFirstView}>
            <AppText style={styles.ortext}>OR</AppText>
          </AppView>
          <AppView style={styles.fifthSecondView}>
            {/* ********************   setPassword(txt), _passwordvalidate(txt);   Google Button ******************** */}
            {/* <AppTouchable onPress={() => gmailRegistration()}> */}
            <AppTouchable onPress={() => _signIn()}>
              {/* <AppTouchable
              //onPress={() => _signIn()}
              onPress={() =>
                onSubmit()}> */}
              <AppImage
                style={styles.imageone}
                resizeMode="contain"
                source={GoogleIcon}
              />
            </AppTouchable>
            {/* ******************** Facebook Button ******************** */}
            {/* <AppView style={styles.container}>
              {profilePic ? (
                <AppImage
                  source={{uri: profilePic}}
                  style={styles.imageStyle}
                />
              ) : null}
              <AppText style={styles.textStyle}> {userName} </AppText>
              <AppText style={styles.textStyle}> {token} </AppText> */}
            {/* {/* <LoginButton
                style={{
                  height: height * 0.05,
                  width: 110,
                }}
                readPermissions={['public_profile']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    alert(error);
                    console.log('Login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    alert('Login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      console.log(data.accessToken.toString());
                      const processRequest = new GraphRequest(
                        '/me?fields=name,picture.type(large)',
                        null,
                        getResponseInfo,
                      );
                      // Start the graph request.
                      new GraphRequestManager()
                        .addRequest(processRequest)
                        .start();
                    });
                  }
                }}
                onLogoutFinished={onLogout}
              /> */}
            <AppTouchable onPress={() => FBLogin()}>
              <AppImage
                style={styles.imagetwo}
                resizeMode="contain"
                source={FacebookIcon}
              />
            </AppTouchable>

            {/* ******************** Twitter Button ******************** */}
            <AppTouchable
              onPress={() => {
                twitterRegistration();
              }}>
              <AppImage
                style={styles.imagethree}
                resizeMode="contain"
                source={TwitterIcon}
              />
            </AppTouchable>
          </AppView>
        </AppView>
        <AppView style={styles.sixthView}>
          <AppText style={styles.dontText}>Don't have an account ?</AppText>
          <AppTouchable
            onPress={() => props.navigation.navigate('RegisterScreen')}>
            <AppText style={styles.signupText}>Signup</AppText>
          </AppTouchable>
        </AppView>

        {/* *************** Kyc Prompt Modal *************** */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView3}>
            <View style={styles.modal3View}>
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
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      props.navigation.navigate('KycPersonalInfo');
                  }}
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
                <AppTouchable
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      props.navigation.navigate('MyTabs');
                  }}>
                  <AppText
                    style={{
                      color: 'rgb(255,255,255)',
                      fontSize: 22,
                    }}>
                    Later
                  </AppText>
                </AppTouchable>
              </AppView>
            </View>
          </View>
        </Modal>
      </AppView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'rgb(94,28,159)',
  },
  // firstinnerView: {
  //   height: height / 6.8,
  //   width: width / 1,
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',  wait..
  // },
  titleImgView: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimage: {
    height: height / 7,
    width: width / 3,
  },
  seconinnerView: {
    height: height / 4.2,
    width: width / 1,
    // backgroundColor:"green"
  },
  secondfirst: {
    height: height / 10,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'flex-end',
    //backgroundColor:"red"
  },
  textinputView: {
    height: height / 14,
    width: width / 1.1,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1.5,
  },
  textinputemail: {
    fontSize: height / 55,
    color: 'white',
    // marginHorizontal: 15,
    // backgroundColor:'red',
    //width:width/5,
    //alignSelf:'flex-end'
  },
  secondtwoView: {
    height: height / 9,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"blue"
  },
  textinput2View: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: 'rgb(94,28,159)',
    //backgroundColor:"green",
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1.5,

    // justifyContent: 'flex-start',
  },
  passwordtextinput: {
    fontSize: height / 55,
    color: 'white',
    //marginHorizontal: 15,
    // backgroundColor:'black',
    width: width / 2,
    paddingHorizontal:2
  },
  thirdinnerView: {
    height: height / 23,
    width: width / 1,
    flexDirection: 'row',
  },
  thirdfirstView: {
    height: height / 23,
    width: width / 1.8,
    // backgroundColor:"green"
  },
  thirdsecondview: {
    height: height / 20,
    width: width / 1.01,
    // alignSelf: 'center',
    justifyContent: 'center',
    //right: -10,
    //  backgroundColor:"red",
    alignItems: 'flex-end',
  },
  forgotText: {
    fontSize: height / 50,
    width: width / 2.5,
    color: 'white',
    textDecorationLine: 'underline',
    //top: 2,
  },
  fourthview: {
    height: height / 7,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginView: {
    height: height / 14,
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logintext: {
    fontSize: height / 40,
    fontWeight: '700',
    color: 'rgb(94,28,159)',
  },
  fifthView: {
    height: height / 7,
    width: width / 1,
    alignItems: 'center',
  },
  fifthFirstView: {
    height: height / 12,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  ortext: {
    fontSize: height / 45,
    color: '#EAE0F3',
  },
  fifthSecondView: {
    height: height / 11,
    width: width * 0.75,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
  imageone: {
    height: height / 22,
    width: width / 7,
    paddingHorizontal: 40,
    // backgroundColor: 'red',
  },
  imagetwo: {
    height: height / 22,
    width: width / 7,
    paddingHorizontal: 40,
  },
  imagethree: {
    height: height / 22,
    width: width / 7,
    paddingHorizontal: 40,
  },
  sixthView: {
    height: height / 6,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    //  backgroundColor:'red'
  },
  dontText: {
    fontSize: height / 50,
    color: 'white',
  },
  signupText: {
    fontSize: height / 50,
    color: 'white',
    borderBottomWidth: 0.8,
    borderColor: 'white',
    paddingHorizontal: 4,
    textDecorationLine: 'underline',
  },
  labelContainer: {
    fontSize: height / 55,
    color: 'rgb(255,255,255)',
    // marginLeft: 10,
    // top: 8,
    //backgroundColor:'red',
    width: width / 2.9,
    textAlign: 'center',
  },
  labelContainer1: {
    fontSize: height / 55,
    color: 'rgb(255,255,255)',
    // marginLeft: 10,
    // top: 8,
    // backgroundColor:'red',
    width: width / 4,
    textAlign: 'center',
  },

  centeredView3: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modal3View: {
    height: height / 1.7,
    width: width / 1.2,
    backgroundColor: '#7A25CE',
    borderRadius: 20,

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
  // **************** Facebook Styling *****************
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   SafeAreaView,
//   Modal,
//   View,
//   Button,
// } from 'react-native';
// import {
//   AppView,
//   AppText,
//   AppImage,
//   AppTouchable,
// } from '../../../components/Atom/atom';
// const {height, width} = Dimensions.get('screen');
// import {
//   LoginLogo,
//   GoogleIcon,
//   FacebookIcon,
//   TwitterIcon,
//   HideEye,
//   KycPrompt,
// } from '../../../assets/icon';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../../components/Loader/index';

// // Import GoogleSignIn
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

// // Import FBSDK
// import {
//   LoginManager,
//   LoginButton,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';

// // ************* Google Login Keys *************
// GoogleSignin.configure({
//   // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//   webClientId:
//     '31824317590-nvarplin90ot024puk8nro6kmdj855s6.apps.googleusercontent.com',
// });

// const Login = props => {
//   const [loader, setLoader] = useState(false);

//   // ****************** Facebook Login State ******************
//   const [userName, setUserName] = useState('');
//   const [token, setToken] = useState('');
//   const [profilePic, setProfilePic] = useState('');

//   // ****************** Social- Google Login Integration ******************
//   const [userInfo, setUserInfo] = useState(null);
//   const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

//   useEffect(() => {
//     _isSignedIn();
//   }, []);

//   const _isSignedIn = async () => {
//     const isSignedIn = await GoogleSignin.isSignedIn();
//     if (isSignedIn) {
//       // alert('User is already signed in'); jldi kijiye n
//       _getCurrentUserInfo();
//     } else {
//       console.log('Please Login');
//     }
//     setGettingLoginStatus(false);
//   };

//   const _getCurrentUserInfo = async () => {
//     try {
//       let info = await GoogleSignin.signInSilently();
//       console.log('User Info --> ', info);
//       gmailRegistration(info);
//       setUserInfo(info);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//         alert('User has not signed in yet');
//         console.log('User has not signed in yet');
//       } else {
//         alert("Unable to get user's info");
//         console.log("Unable to get user's info");
//       }
//     }
//   };

//   const _signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({
//         showPlayServicesUpdateDialog: true,
//       });
//       const userInfo = await GoogleSignin.signIn();
//       console.log('User Info --> ', userInfo);
//       setUserInfo(userInfo);
//     } catch (error) {
//       console.log('Message', JSON.stringify(error));
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         alert('User Cancelled the Login Flow');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         alert('Signing In');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         alert('Play Services Not Available or Outdated');
//       } else {
//         alert(error.message);
//       }
//     }
//   };

//   const gmailRegistration = fbdata => {
//     let body = {
//       // fb_id: fbdata.id,
//       // first_name: fbdata.name,
//       // email: fbdata.email,
//       // phone: null,
//       address: 'main market',
//       browseSecrateKey: '1234',
//       city: 'BALLIA',
//       country: 'India',
//       countryCode: '+91',
//       deviceToken: 'string',
//       deviceType: 'Window',
//       dob: '12/8/1999',
//       email: Email,
//       firstName: 'Deepali',
//       imageUrl: 'string',
//       lastName: 'Shukla',
//       password: Password,
//       phoneNo: phone,
//       pnWithoutCountryCode: 'string',
//       refferalCode: 'ASDFGH11',
//       roleStatus: 'USER',
//       socialId: 'string',
//       socialType: 'GOOGLE',
//       ssn: 'ASDF11',
//       state: 'U.P',
//       userName: userName,
//       webUrl: 'string',
//     }; // let body = formdata
//     fetch('https://java-create-token.mobiloitte.com/account/signup', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })
//       .then(response => response.json())
//       .then(res => {
//         console.log('signup res====>res', res);
//       })
//       .catch(error => {
//         console.log('error res====>res', error);
//       });
//   };

//   const twitterRegistration = data => {
//     let body = {
//       // fb_id: fbdata.id,
//       // first_name: fbdata.name,
//       // email: fbdata.email,
//       // phone: null,
//       address: 'main market',
//       browseSecrateKey: '1234',
//       city: 'BALLIA',
//       country: 'India',
//       countryCode: '+91',
//       deviceToken: 'string',
//       deviceType: 'Window',
//       dob: '12/8/1999',
//       email: Email,
//       firstName: 'Deepali',
//       imageUrl: 'string',
//       lastName: 'Shukla',
//       password: Password,
//       phoneNo: phone,
//       pnWithoutCountryCode: 'string',
//       refferalCode: 'ASDFGH11',
//       roleStatus: 'USER',
//       socialId: 'string',
//       socialType: 'GOOGLE',
//       ssn: 'ASDF11',
//       state: 'U.P',
//       userName: 'Deepali Shukla',
//       webUrl: 'string',
//     }; // let body = formdata
//     fetch('https://java-create-token.mobiloitte.com/account/signup', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })
//       .then(response => response.json())
//       .then(res => {
//         console.log('signup res====>res', res);
//       })
//       .catch(error => {
//         console.log('error res====>res', error);
//       });
//     //   .then(res => {
//     //     console.log('res=====>', res);
//     //   })
//     //   .catch(error => {
//     //     console.log('error--', error);
//     //   });
//   };
//   const fbRegistration = fbdata => {
//     let body = {
//       // fb_id: fbdata.id,
//       // first_name: fbdata.name,
//       // email: fbdata.email,
//       // phone: null,
//       address: 'main market',
//       browseSecrateKey: '1234',
//       city: 'BALLIA',
//       country: 'India',
//       countryCode: '+91',
//       deviceToken: 'string',
//       deviceType: 'Window',
//       dob: '12/8/1999',
//       email: Email,
//       firstName: 'Deepali',
//       imageUrl: 'string',
//       lastName: 'Shukla',
//       password: Password,
//       phoneNo: phone,
//       pnWithoutCountryCode: 'string',
//       refferalCode: 'ASDFGH11',
//       roleStatus: 'USER',
//       socialId: 'string',
//       socialType: 'GOOGLE',
//       ssn: 'ASDF11',
//       state: 'U.P',
//       userName: 'Deepali Shukla',
//       webUrl: 'string',
//     }; // let body = formdata
//     fetch('https://java-create-token.mobiloitte.com/account/signup', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })
//       .then(response => response.json())
//       .then(res => {
//         console.log('signup res====>res', res);
//       })
//       .catch(error => {
//         console.log('error res====>res', error);
//       });
//     //   .then(res => {
//     //     console.log('res=====>', res);
//     //   })
//     //   .catch(error => {
//     //     console.log('error--', error);
//     //   });
//   };

//   const _signOut = async () => {
//     setGettingLoginStatus(true);
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       setUserInfo(null);
//     } catch (error) {
//       console.error(error);
//     }
//     setGettingLoginStatus(false);
//   };

//   // ****************** Social-Facebook Login Integration ******************

//   // const _onLoginFinished = (error, result) => {
//   //   if (error) {
//   //     alert(error);
//   //     console.log('Login has error: ' + result.error);
//   //   } else if (result.isCancelled) {
//   //     alert('Login is cancelled.');
//   //   } else {
//   //     AccessToken.getCurrentAccessToken().then(data => {
//   //       console.log(data.accessToken.toString());
//   //       const processRequest = new GraphRequest(
//   //         '/me?fields=name,picture.type(large)',
//   //         null,
//   //         getResponseInfo,
//   //       );
//   //       // Start the graph request.
//   //       new GraphRequestManager().addRequest(processRequest).start();
//   //     });
//   //   }
//   // };

//   const getResponseInfo = (error, result) => {
//     if (error) {
//       //Alert for the Error
//       alert('Error fetching data: ' + error.toString());
//     } else {
//       //response alert
//       console.log(JSON.stringify(result));
//       setUserName('Welcome ' + result.name);
//       alert('hi vandoo');
//       fbRegistration(data);
//       setToken('User Token: ' + result.id);
//       setProfilePic(result.picture.data.url);
//     }
//   };

//   const onLogout = () => {
//     //Clear the state after logout
//     setUserName(null);
//     setToken(null);
//     setProfilePic(null);
//   };
//   // ****************** Social-Twitter Login Integration ******************
//   // const [modalVisibleValue, setModalVisibleValue] = useState(false);

//   const [description, setDescription] = useState('');
//   const [password2, setPassword2] = useState('');
//   const [emailID, setEmailId] = useState('');

//   const [hidePass, setHidePass] = useState(true);
//   const [EmailValidation, setEmailValidation] = useState('');

//   const [Email, setEmail] = useState('');
//   const [checkEmail, setCheckEmail] = useState(true);
//   const [errorEmail, setErrorEmail] = useState(null);

//   const [Password, setPassword] = useState('');
//   const [checkPassword, setCheckPassword] = useState(true);
//   const [errorPassword, setErrorPassword] = useState(null);

//   const [phone, setPhone] = useState('');
//   const [isFocused, setIsFocused] = useState(false);

//   const [modalVisible, setModalVisible] = useState(false);

//   const _emailvalidate = mail => {
//     var emailRegex =
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (mail === '') {
//       setErrorEmail('*Please enter email.');
//     } else if (!emailRegex.test(mail)) {
//       setErrorEmail('*Please enter valid email.');
//     } else {
//       setErrorEmail(null);
//     }
//   };

//   const _passwordvalidate = pass => {
//     var passwordRegex =
//       /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//     if (pass === '') {
//       setErrorPassword('*Please enter password.');
//     } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
//       setErrorPassword(
//         '*Please enter a special character and length must be 8 digit.',
//       );
//     } else if (!passwordRegex.test(pass)) {
//       setErrorPassword('*Please enter valid password.');
//     } else {
//       setErrorPassword(null);
//     }
//   };

//   const validate = () => {
//     let flag = true;
//     if (Email === '') {
//       setErrorEmail('*Please enter email.');
//       flag = false;
//     }
//     if (Password === '') {
//       setErrorPassword('*Please enter password.');
//       flag = false;
//     }
//     return flag;
//   };

//   const onSubmit = () => {
//     console.log('pass', Password);
//     if (validate()) {
//     }
//     setLoader(true);
//     axios({
//       method: 'post',
//       // url: 'http://182.72.203.247:4094/auth',
//       url: 'https://java-create-token.mobiloitte.com/auth',
//       data: {
//         email: Email,
//         password: Password,
//       },
//       headers: {'content-type': 'application/json'},
//     })
//       .then(async res => {
//         setLoader(false);
//         console.log('res-->>', res, res.data.status);

//         if (res.data.status === 200) {
//           console.log('token', res.data.data.token);
//           await AsyncStorage.setItem('token', res.data.data.token);
//           setModalVisible(true);
//           // props.navigation.navigate('KycPersonalInfo');
//         } else {
//           alert('Something went wrong.');
//         }
//       })
//       .catch(err => console.log('err', err));
//     setLoader(false);
//   };

//   return (
//     <SafeAreaView backgroundColor="rgb(94,28,159)">
//       <AppView style={styles.mainView}>
//         <AppView style={styles.titleImgView}>
//           <AppImage
//             resizeMode="contain"
//             source={require('../../../assets/images/NewImages/Asset11.png')}
//             style={{height: 120, width: 250}}
//           />
//         </AppView>

//         <AppView style={styles.seconinnerView}>
//           {/* *************** Email *************** */}
//           <AppView style={styles.secondfirst}>
//             <AppView style={styles.textinput2View}>
//               <AppImage />
//               <AppView
//                 style={{height: height * 0.04, justifyContent: 'center'}}>
//                 <AppText style={styles.labelContainer}>Email</AppText>
//               </AppView>
//               <AppView
//                 style={{height: height * 0.05, justifyContent: 'center'}}>
//                 <TextInput
//                   style={styles.textinputemail}
//                   placeholderTextColor="white"
//                   placeholder="Enter Email"
//                   keyboardType="email-address"
//                   maxLength={256}
//                   autoCapitalize="none"
//                   onChangeText={txt => {
//                     setEmail(txt), _emailvalidate(txt);
//                   }}
//                 />
//               </AppView>
//             </AppView>
//           </AppView>

//           {errorEmail != null ? (
//             <AppView
//               style={{
//                 height: height * 0.02,
//                 width: width * 1,
//               }}>
//               <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                 {errorEmail}
//               </AppText>
//             </AppView>
//           ) : null}
//           {/* *************** Password *************** */}
//           <AppView style={styles.secondtwoView}>
//             <AppView style={styles.textinput2View}>
//               <AppView
//                 style={{height: height * 0.04, justifyContent: 'center'}}>
//                 <AppText style={styles.labelContainer}>Password</AppText>
//               </AppView>
//               <AppView
//                 style={{height: height * 0.048, justifyContent: 'center'}}>
//                 <TextInput
//                   style={styles.passwordtextinput}
//                   placeholderTextColor="white"
//                   secureTextEntry={true}
//                   placeholder="Enter Password"
//                   maxLength={16}
//                   keyboardType="default"
//                   onChangeText={txt => {
//                     setPassword(txt), _passwordvalidate(txt);
//                   }}
//                 />
//               </AppView>
//             </AppView>
//           </AppView>
//           {errorPassword != null ? (
//             <AppView
//               style={{
//                 height: height * 0.03,
//                 width: width * 1,
//                 top: -10,
//               }}>
//               <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                 {errorPassword}
//               </AppText>
//             </AppView>
//           ) : null}
//         </AppView>
//         <AppView>
//           {/* <AppView style={styles.thirdfirstView}></AppView> */}
//           <AppView style={styles.thirdsecondview}>
//             <AppTouchable onPress={() => props.navigation.navigate('Forgot')}>
//               <AppText style={styles.forgotText}>Forgot Password ?</AppText>
//             </AppTouchable>
//           </AppView>
//         </AppView>
//         <AppView style={styles.fourthview}>
//           <AppTouchable onPress={() => onSubmit()}>
//             <AppView style={styles.loginView}>
//               <AppText style={styles.logintext}>Continue</AppText>
//             </AppView>
//           </AppTouchable>
//         </AppView>
//         <AppView style={styles.fifthView}>
//           <AppView style={styles.fifthFirstView}>
//             <AppText style={styles.ortext}>OR</AppText>
//           </AppView>
//           <AppView style={styles.fifthSecondView}>
//             {/* ******************** Google Button ******************** */}
//             <AppTouchable onPress={() => _signIn()}>
//               <AppImage
//                 style={styles.imageone}
//                 resizeMode="contain"
//                 source={GoogleIcon}
//               />
//             </AppTouchable>

//             {/* ******************** Facebook Button ******************** */}
//             <AppView style={styles.container}>
//               {/* {profilePic ? (
//                 <AppImage
//                   source={{uri: profilePic}}
//                   style={styles.imageStyle}
//                 />
//               ) : null}
//               <AppText style={styles.textStyle}> {userName} </AppText>
//               <AppText style={styles.textStyle}> {token} </AppText> */}
//               <LoginButton
//                 style={{
//                   height: height * 0.05,
//                   width: 110,
//                 }}
//                 readPermissions={['public_profile']}
//                 onLoginFinished={(error, result) => {
//                   if (error) {
//                     alert(error);
//                     console.log('Login has error: ' + result.error);
//                   } else if (result.isCancelled) {
//                     alert('Login is cancelled.');
//                   } else {
//                     AccessToken.getCurrentAccessToken().then(data => {
//                       console.log(data.accessToken.toString());
//                       const processRequest = new GraphRequest(
//                         '/me?fields=name,picture.type(large)',
//                         null,
//                         getResponseInfo,
//                       );
//                       // Start the graph request.
//                       new GraphRequestManager()
//                         .addRequest(processRequest)
//                         .start();
//                     });
//                   }
//                 }}
//                 onLogoutFinished={onLogout}
//               />
//               {/* <AppTouchable onPress={() => _onLoginFinished()}>
//                 <AppImage
//                   style={styles.imagetwo}
//                   resizeMode="contain"
//                   source={FacebookIcon}
//                 />
//               </AppTouchable> */}
//             </AppView>

//             {/* ******************** Twitter Button ******************** */}
//             <AppTouchable
//               onPress={() => {
//                 twitterRegistration();
//               }}>
//               <AppImage
//                 style={styles.imagethree}
//                 resizeMode="contain"
//                 source={TwitterIcon}
//               />
//             </AppTouchable>
//           </AppView>
//         </AppView>
//         <AppView style={styles.sixthView}>
//           <AppText style={styles.dontText}>Don't have an account?</AppText>
//           <AppTouchable
//             onPress={() => props.navigation.navigate('RegisterScreen')}>
//             <AppText style={styles.signupText}> Sign Up</AppText>
//           </AppTouchable>
//         </AppView>

//         {/* *************** mpt Modal *************** */}

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//             setModalVisible(!modalVisible);
//           }}>
//           <View style={styles.centeredView3}>
//             <View style={styles.modal3View}>
//               <AppView
//                 style={{
//                   height: height * 0.2,
//                   width: width * 0.9,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <AppImage source={KycPrompt} />
//               </AppView>
//               <AppView
//                 style={{
//                   height: height * 0.06,
//                   width: width * 0.9,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <AppText
//                   style={{
//                     color: 'rgb(255,255,255)',
//                     fontSize: 28,
//                     fontWeight: '700',
//                   }}>
//                   Complete your KYC !
//                 </AppText>
//               </AppView>
//               <AppView
//                 style={{
//                   height: height * 0.05,
//                   width: width * 0.9,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <AppText
//                   style={{
//                     color: 'rgb(255,255,255)',
//                     fontSize: 22,
//                   }}>
//                   To unlock All the features
//                 </AppText>
//               </AppView>
//               <AppView
//                 style={{
//                   height: height * 0.18,
//                   width: width * 0.9,
//                   alignItems: 'center',
//                   justifyContent: 'flex-end',
//                 }}>
//                 <AppTouchable
//                   onPress={() => {
//                     setModalVisible(!modalVisible),
//                       props.navigation.navigate('KycPersonalInfo');
//                   }}
//                   style={{
//                     height: height * 0.08,
//                     width: width * 0.6,
//                     backgroundColor: 'rgb(255,255,255)',
//                     borderRadius: 10,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <AppText
//                     style={{
//                       color: 'rgb(94,28,159)',
//                       fontSize: 25,
//                     }}>
//                     Complete your KYC
//                   </AppText>
//                 </AppTouchable>
//               </AppView>
//               <AppView
//                 style={{
//                   height: height * 0.12,
//                   width: width * 0.9,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <AppTouchable
//                   onPress={() => {
//                     setModalVisible(!modalVisible),
//                       props.navigation.navigate('MyTabs');
//                   }}>
//                   <AppText
//                     style={{
//                       color: 'rgb(255,255,255)',
//                       fontSize: 22,
//                     }}>
//                     Later
//                   </AppText>
//                 </AppTouchable>
//               </AppView>
//             </View>
//           </View>
//         </Modal>
//       </AppView>
//     </SafeAreaView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   mainView: {
//     height: height / 1,
//     width: width / 1,
//     backgroundColor: 'rgb(94,28,159)',
//   },
//   // firstinnerView: {
//   //   height: height / 6.8,
//   //   width: width / 1,
//   //   alignItems: 'center',
//   //   justifyContent: 'flex-end',  wait..
//   // },
//   titleImgView: {
//     height: height * 0.2,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoimage: {
//     height: height / 7,
//     width: width / 3,
//   },
//   seconinnerView: {
//     height: height / 4.2,
//     width: width / 1,
//     // backgroundColor:"green"
//   },
//   secondfirst: {
//     height: height / 10,
//     width: width / 1,
//     alignItems: 'center',
//     // justifyContent: 'flex-end',
//     // backgroundColor:"red"
//   },
//   textinputView: {
//     height: height / 14,
//     width: width / 1.1,
//     backgroundColor: 'rgb(94,28,159)',
//     borderRadius: 5,
//     borderColor: 'white',
//     borderWidth: 1.5,
//   },
//   textinputemail: {
//     fontSize: height / 55,
//     color: 'white',
//     marginHorizontal: 15,
//     // backgroundColor:'red'
//   },
//   secondtwoView: {
//     height: height / 9,
//     width: width / 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor:"blue"
//   },
//   textinput2View: {
//     height: height / 12,
//     width: width / 1.1,
//     backgroundColor: 'rgb(94,28,159)',
//     // backgroundColor:"green",
//     borderRadius: 5,
//     borderColor: 'white',
//     borderWidth: 1.5,
//     // justifyContent: 'center',
//   },
//   passwordtextinput: {
//     fontSize: height / 55,
//     color: 'white',
//     marginHorizontal: 15,
//     // backgroundColor:'red'
//   },
//   thirdinnerView: {
//     height: height / 23,
//     width: width / 1,
//     flexDirection: 'row',
//   },
//   thirdfirstView: {
//     height: height / 23,
//     width: width / 1.8,
//     // backgroundColor:"green"
//   },
//   thirdsecondview: {
//     height: height / 23,
//     width: width / 2.4,
//     alignSelf: 'flex-end',
//     justifyContent: 'flex-end',
//     right: -10,
//     // backgroundColor:"red"
//   },
//   forgotText: {
//     fontSize: height / 52,
//     width: width / 2.5,
//     color: 'white',
//     textDecorationLine: 'underline',
//     top: 2,
//   },
//   fourthview: {
//     height: height / 7,
//     width: width / 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   loginView: {
//     height: height / 14,
//     width: width / 1.1,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logintext: {
//     fontSize: height / 40,
//     fontWeight: '700',
//     color: 'rgb(94,28,159)',
//   },
//   fifthView: {
//     height: height / 7,
//     width: width / 1,
//     alignItems: 'center',
//   },
//   fifthFirstView: {
//     height: height / 20,
//     width: width / 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   ortext: {
//     fontSize: height / 45,
//     color: '#EAE0F3',
//   },
//   fifthSecondView: {
//     height: height / 11,
//     width: width * 0.88,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     // backgroundColor: 'green',
//   },
//   imageone: {
//     height: height / 22,
//     width: width / 7,
//     paddingHorizontal: 40,
//     // backgroundColor: 'red',
//   },
//   imagetwo: {
//     height: height / 22,
//     width: width / 7,
//     paddingHorizontal: 40,
//   },
//   imagethree: {
//     height: height / 22,
//     width: width / 7,
//     paddingHorizontal: 40,
//   },
//   sixthView: {
//     height: height / 15,
//     width: width / 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   dontText: {
//     fontSize: height / 56,
//     color: 'white',
//   },
//   signupText: {
//     fontSize: height / 56,
//     color: 'white',
//     borderBottomWidth: 0.8,
//     borderColor: 'white',
//     // textDecorationLine: 'underline',
//   },
//   labelContainer: {
//     fontSize: height / 50,
//     color: 'rgb(255,255,255)',
//     marginLeft: 10,
//     // top: 8,
//   },

//   centeredView3: {
//     height: height / 1,
//     width: width / 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00000080',
//   },
//   modal3View: {
//     height: height / 1.7,
//     width: width / 1.2,
//     backgroundColor: '#7A25CE',
//     borderRadius: 20,

//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   // **************** Facebook Styling *****************
//   container: {
//     // flex: 1,
//     // backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     fontSize: 20,
//     color: '#000',
//     textAlign: 'center',
//     padding: 10,
//   },
//   imageStyle: {
//     width: 200,
//     height: 300,
//     resizeMode: 'contain',
//   },
// });

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  Pressable,
  Modal,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Image, KeyboardAvoidingView} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('window');
import Header from '../../../components/molecules/Header';
import {
  BackArrow,
  RegisterStepOne,
  CheckboxIcon,
  KycPrompt,
  Check,
} from '../../../assets/icon';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CountryCode} from '../../CountryCode';

const RegisterTwo = (props, {navigation}) => {
  console.log('err', props.route.params);

  const [modalVisible, setModalVisible] = useState(false);

  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  const [iAgreeSecond, setIAgreeSecond] = useState(true);
  const toggleIAgreeSecond = () => {
    setIAgreeSecond(false);
  };

  const _toggleIAgreeSecond = () => {
    setIAgreeSecond(true);
  };

  const [code, setCode] = React.useState('+91');
  const [isText, setIsText] = React.useState('');

  const [Address, setAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState(true);
  const [errorAddress, setErrorAddress] = useState(null);

  const [City, setCity] = useState('');
  const [checkCity, setCheckCity] = useState(true);
  const [errorCity, setErrorCity] = useState(null);

  const [State, setState] = useState('');
  const [checkState, setCheckState] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const [Zip, setZip] = useState('');
  const [checkZip, setCheckZip] = useState(true);
  const [errorZip, setErrorZip] = useState(null);

  const [MobileNumber, setMobileNumber] = useState('');
  const [checkMobileNumber, setCheckMobileNumber] = useState(true);
  const [errorMobileNumber, setErrorMobileNumber] = useState(null);

  const [filterdata, setFilterdata] = useState(CountryCode);

  const [countryCode, setcountryCode] = useState('+1');
  const [contrymodal, setcontrymodal] = useState(false);

  const [PromoCode, setPromocode] = useState(null);

  const SeacrFunct = value => {
    if (!value || value === '') {
      // console.log("DATADATA", D);
      setFilterdata(CountryCode);
    } else {
      let mydata = filterdata.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      // console.log("newData--->", newData);
      setFilterdata(mydata);
      setIsText(value);
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = CountryCode.filter(function (item) {
        const itemData = item.label
          ? item.label.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterdata(newData);
    } else {
      setFilterdata(CountryCode);
    }
  };

  const _validateAddress = address => {
    var addressRegex = /^[a-zA-Z0-9\s,/,-]{3,70}$/;
    address = address.trim();
    if (address == '' || address == undefined || address == null) {
      setErrorAddress('*Please enter address.');
    } else if (!addressRegex.test(address)) {
      setErrorAddress('*Please enter valid address.');
    } else {
      setErrorAddress(null);
    }
  };

  const _validateCity = city => {
    var cityRegex = /^[a-zA-Z ]{3,60}$/i;
    if (city == '' || city == undefined || city == null) {
      setErrorCity('*Please enter city.');
    } else if (!cityRegex.test(city)) {
      setErrorCity('*Please enter valid city.');
    } else {
      setErrorCity(null);
    }
  };

  const _validateState = state => {
    var stateRegex = /^[a-zA-Z ]{3,60}$/i;
    if (state == '' || state == undefined || state == null) {
      setErrorState('*Please enter state.');
    } else if (!stateRegex.test(state)) {
      setErrorState('*Please enter valid state.');
    } else {
      setErrorState(null);
    }
  };

  const _validateZip = zip => {
    var zipRegex = /^[0-9/s]{4,8}$/;
    if (zip == '' || zip == undefined || zip == null) {
      setErrorZip('*Please enter zip ');
    } else if (!zipRegex.test(zip)) {
      setErrorZip('*Please Enter zip ');
    } else {
      setErrorZip(null);
    }
  };

  const _validateMobileNumber = mobileNo => {
    var mobileNoRegex = /^[0-9]{4,11}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setErrorMobileNumber('*Please enter mobile number.');
    } else if (!mobileNoRegex.test(mobileNo)) {
      setErrorMobileNumber('*Please Enter valid mobile number..');
    } else {
      setErrorMobileNumber(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (Address === '') {
      setErrorAddress('*Please enter address.');
      flag = false;
    }
    if (City === '') {
      setErrorCity('*Please enter city.');
      flag = false;
    }
    if (State === '') {
      setErrorState('*Please enter state.');
      flag = false;
    }
    if (Zip === '') {
      setErrorZip('*Please enter zip');
      flag = false;
    }
    if (MobileNumber === '') {
      setErrorMobileNumber('*Please enter mobile number.');
      flag = false;
    }

    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      // props.navigation.navigate('KycPromptScreen');
      setModalVisible(true);
    }
    const Data = {
      // address: '',
      // browseSecrateKey: '',
      // city: '',
      // country: '',
      // countryCode: '',
      // deviceToken: '',
      // deviceType: '',
      // dob: '',
      // email: 're-ruu@mailinator.com',
      // firstName: '',
      // imageUrl: '',
      // lastName: '',
      // password: '111449291980319550211',
      // pnWithoutCountryCode: '',
      // refferalCode: '',
      // roleStatus: 'USER',
      // socialId: '111449291980319550211',
      // socialType: 'GOOGLE',
      // ssn: '',
      // state: '',
      // userName: '',
      // webUrl: '',

      address: '',
      browseSecrateKey: '',
      city: '',
      country: '',
      countryCode: '',
      deviceToken: '',
      deviceType: '',
      dob: '',
      email: props.route.params.email,
      firstName: '',
      imageUrl: '',
      lastName: '',
      password: props.route.params.password,
      pnWithoutCountryCode: '',
      refferalCode: '',
      roleStatus: 'USER',
      socialId: props.route.params.password,
      socialType: 'GOOGLE',
      ssn: '',
      state: '',
      userName: props.route.params.userName,
      webUrl: '',

      // address: Address,
      // city: City,
      // country: 'string',
      // countryCode: 'string',
      // deviceToken: 'string',
      // deviceType: 'string',
      // dob: props.route.params.Dob,
      // email: props.route.params.email,
      // firstName: props.route.params.firstName,
      // imageUrl: 'string',
      // lastName: props.route.params.lastName,
      // password: props.route.params.password,
      // phoneNo: props.route.params.phoneNo,
      // pnWithoutCountryCode: 'string',
      // roleStatus: 'USER',
      // ssn: props.route.params.SsnNumber,
      // state: State,
      // userName: props.route.params.userName,
      // webUrl: 'string',
      // refferalCode: PromoCode,
      // phoneNo: MobileNumber,
      // address: 'Address',
      // city: 'Agra',
      // country: 'string',
      // countryCode: 'string',
      // deviceToken: 'string',
      // deviceType: 'string',
      // dob: 'string',
      // // email: 'string',
      // email: 'humpy@mailinator.com',
      // firstName: 'Ashish',
      // // firstName: props.route.params.firstName,
      // imageUrl: 'string',
      // lastName: 'Ojha',
      // // lastName: props.route.params.lastName,
      // password: 'Mobiloitte1@',
      // // password: 'string',
      // phoneNo: '+918871860523',
      // phoneNo: 'string',
      // pnWithoutCountryCode: 'string',
      // roleStatus: 'USER',
      // ssn: '342543',
      // // ssn: props.route.params.ssn,
      // state: State,
      // userName: 'string',
      // webUrl: 'string',
      // address: 'string',
      // city: 'string',
      // country: 'string',
      // countryCode: 'string',
      // deviceToken: 'string',
      // deviceType: 'string',
      // dob: 'string',
      // imageUrl: 'string',
      // phoneNo: '+919494949494',
      // pnWithoutCountryCode: 'string',
      // roleStatus: 'USER',
      // // ssn: '342543',
      // state: 'string',
      // webUrl: 'string',
      // userName: props.route.params.userName,
      // email: props.route.params.email,
      // password: props.route.params.password,
      // confirmPassword: props.route.params.confirmPassword,
      // firstName: props.route.params.firstName,
      // lastName: props.route.params.lastName,
      // ssn: props.route.params.ssn,
    };
    console.log('data', Data);
    axios({
      method: 'post',
      // url: 'http://182.72.203.247:4094/account/signup',
      // url: 'https://java-create-token.mobiloitte.org/account/signup',
      url: 'https://java-create-token.mobiloitte.org/account/signup',
      data: Data,
      headers: {'content-type': 'application/json'},
    })
      .then(res => {
        console.log('res', res.data);
        if (res.data.status === 200) {
          console.log('res', res);
          props.navigation.navigate('OtpSignupVerify');
          alert('Success');
        } else {
        }
      })
      .catch(err => {
        alert('re-try catch');
        console.log('err', err);
      });
  };

  const renderItem = ({item}) => (
    <Item name={item.label} dialCode={item.value} icon={item.icon} />
  );

  const Item = ({name, dialCode, icon}) => (
    <TouchableOpacity
      key={String(name)}
      // onPress={() => props.props.navigation.navigate('PhoneNumberVerification', { dialCode: dialCode, icon: icon, name: name })}
      onPress={() => {
        setCode(dialCode);
        setcontrymodal(!contrymodal);
      }}>
      <View style={styles.item}>
        <Image source={icon} style={styles.image2} resizeMode="cover" />
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.dialcodeText}>{dialCode}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <KeyboardAwareScrollView>
        <AppView style={styles.mainView}>
          <AppView>
            <Header
              head={false}
              backImage={BackArrow}
              headerText2="Register"
              onPress2={() => props.navigation.goBack()}
            />
          </AppView>
          <ScrollView>
            <AppView style={styles.containerTwo}>
              <AppView style={styles.imgContainer}>
                <AppImage
                  style={{height: height / 20, width: width / 9}}
                  resizeMode="contain"
                  source={RegisterStepOne}
                />
              </AppView>
              <AppView style={styles.blankView} />
              <AppView style={styles.imgContainer}>
                <AppImage
                  style={{height: height / 20, width: width / 9}}
                  resizeMode="contain"
                  source={RegisterStepOne}
                />
              </AppView>
              <AppView style={styles.blankView} />
              <AppView
                style={[styles.imgContainer, {backgroundColor: 'white'}]}>
                <AppText style={{fontSize: height / 40, color: 'black'}}>
                  3
                </AppText>
              </AppView>
            </AppView>

            <AppView style={styles.inptTxtMain}>
              {/* <AppView style={styles.TxtInptContainer}>
              <AppText style={styles.labelContainer}>Address</AppText>
              <TextInput
                style={{fontSize: height / 55, color: 'white', marginLeft: 15}}
                placeholderTextColor="white"
                keyboardType="default"
                placeholder="Enter your address"
                maxLength={120}
                onChangeText={txt => {
                  setAddress(txt), _validateAddress(txt);
                }}
              />
            </AppView> */}
              <AppView style={styles.textinput3View}>
                <AppView
                  style={{
                    height: height * 0.04,
                    justifyContent: 'center',
                    width: width / 4,
                  }}>
                  <AppText style={styles.labelContainer2}>Address</AppText>
                </AppView>
                <AppView
                  style={{height: height * 0.048, justifyContent: 'center'}}>
                  <TextInput
                    style={styles.passwordtextinput}
                    placeholderTextColor="white"
                    keyboardType="default"
                    placeholder="Enter your address"
                    maxLength={120}
                    onChangeText={txt => {
                      setAddress(txt), _validateAddress(txt);
                    }}
                  />
                </AppView>
              </AppView>
            </AppView>
            {errorAddress != null ? (
              <AppView
                style={{
                  height: height * 0.02,
                  width: width * 1,
                  // backgroundColor:'green'
                }}>
                <AppText style={{color: 'red', fontSize: 13, marginLeft: 22}}>
                  {errorAddress}
                </AppText>
              </AppView>
            ) : null}

            <AppView style={styles.CityView}>
              <AppView style={styles.textinput3View}>
                <AppView
                  style={{height: height * 0.04, justifyContent: 'center'}}>
                  <AppText style={styles.labelContainer2}>City</AppText>
                </AppView>
                <AppView
                  style={{height: height * 0.048, justifyContent: 'center'}}>
                  <TextInput
                    style={styles.passwordtextinput}
                    placeholderTextColor="white"
                    keyboardType="default"
                    placeholder="Enter your city"
                    onChangeText={txt => {
                      setCity(txt), _validateCity(txt);
                    }}
                  />
                </AppView>
              </AppView>
            </AppView>
            {errorCity != null ? (
              <AppView
                style={{
                  height: height * 0.025,
                  width: width * 1,
                  //  backgroundColor:'green'
                }}>
                <AppText style={{color: 'red', fontSize: 13, marginLeft: 22}}>
                  {errorCity}
                </AppText>
              </AppView>
            ) : null}

            <AppView style={styles.stateMainContainer}>
              <AppView>
                <AppView style={styles.TxtStateView}>
                  <AppView
                    style={{height: height * 0.04, justifyContent: 'center'}}>
                    <AppText style={styles.labelContainer2}>State</AppText>
                  </AppView>
                  <AppView style={{height: height * 0.048}}>
                    <TextInput
                      style={styles.passwordtextinput}
                      placeholderTextColor="white"
                      keyboardType="default"
                      placeholder="Enter your state"
                      onChangeText={txt => {
                        setState(txt), _validateState(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorState != null ? (
                  <AppView
                    style={{
                      height: height * 0.021,
                      width: width / 1.9,
                      // backgroundColor:'green'
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 16}}>
                      {errorState}
                    </AppText>
                  </AppView>
                ) : null}
              </AppView>

              <AppView>
                <AppView style={styles.zipContainer}>
                  <AppView
                    style={{height: height * 0.04, justifyContent: 'center'}}>
                    <AppText style={styles.labelContainer2}>Zip</AppText>
                  </AppView>
                  <AppView style={{height: height * 0.048}}>
                    <TextInput
                      style={styles.passwordtextinput}
                      placeholderTextColor="white"
                      keyboardType="phone-pad"
                      placeholder="Enter your zip"
                      maxLength={8}
                      onChangeText={txt => {
                        setZip(txt), _validateZip(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorZip != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 0.3,
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 7}}>
                      {errorZip}
                    </AppText>
                  </AppView>
                ) : null}
              </AppView>
            </AppView>

            {/* <AppView style={styles.touchMain}>
            <AppTouchable>
              <AppText style={styles.startOverTxt}>Start Over</AppText>
            </AppTouchable>
          </AppView> */}
            <AppView style={styles.mainOneView}>
              <AppView style={styles.mainTwoView}>
                <AppView
                  style={{
                    justifyContent: 'center',
                    textAlign: ' center',
                    height: height / 12.2,
                    width: width / 4.9,
                    backgroundColor: '#7A25CE',

                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <AppView
                    style={{height: height * 0.048, justifyContent: 'center'}}>
                    <Text
                      style={styles.passwordtextinput}
                      onPress={() => setcontrymodal(true)}>
                      {code}
                    </Text>
                    {/* style={styles.passwordtextinput}
                    placeholderTextColor="white"
                    keyboardType="number-pad"
                    placeholder="+91"
                    maxLength={3}
                  /> */}
                  </AppView>
                </AppView>
                <AppView
                  style={{
                    height: height / 12.3,
                    width: width / 1.55,
                    justifyContent: 'center',
                  }}>
                  <AppView
                    style={{height: height * 0.04, justifyContent: 'center'}}>
                    <AppText style={styles.labelContainer2}>
                      Mobile Number
                    </AppText>
                  </AppView>
                  <AppView style={{height: height * 0.046}}>
                    <TextInput
                      style={styles.passwordtextinput}
                      placeholderTextColor="white"
                      keyboardType="numeric"
                      placeholder="Enter Mobile Number"
                      maxLength={15}
                      onChangeText={txt => {
                        setMobileNumber(txt), _validateMobileNumber(txt);
                      }}
                    />
                  </AppView>
                  {/* <AppText style={styles.labelContainer}>Mobile Number</AppText>
                <TextInput
                  style={{
                    fontSize: height / 55,
                    color: 'white',
                    marginLeft: 15,
                  }}
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  placeholder="EnterMobile Number"
                  maxLength={15}
                  onChangeText={txt => {
                    setMobileNumber(txt), _validateMobileNumber(txt);
                  }}
                /> */}
                </AppView>
              </AppView>
            </AppView>
            {errorMobileNumber != null ? (
              <AppView
                style={{
                  height: height * 0.02,
                  width: width * 1,
                  // backgroundColor:'green',
                  justifyContent: 'flex-start',
                }}>
                <AppText style={{color: 'red', fontSize: 13, marginLeft: 22}}>
                  {errorMobileNumber}
                </AppText>
              </AppView>
            ) : null}
            <AppView style={styles.promoMainView}>
              {/* <AppView style={styles.promoSubMainView}>
              <AppText style={styles.labelContainer}>Promo Code</AppText>
              <TextInput
                style={{
                  fontSize: height / 55,
                  color: 'white',
                  marginLeft: 15,
                }}
                placeholderTextColor="white"
                keyboardType="default"
                placeholder="Enter your promo code"
                maxLength={8}
              />
            </AppView> */}
              <AppView style={styles.textinput3View}>
                <AppView
                  style={{height: height * 0.04, justifyContent: 'center'}}>
                  <AppText style={styles.labelContainer2}>Promo Code</AppText>
                </AppView>
                <AppView
                  style={{height: height * 0.048, justifyContent: 'center'}}>
                  <TextInput
                    style={styles.passwordtextinput}
                    placeholderTextColor="white"
                    keyboardType="default"
                    placeholder="Enter your promo code"
                    maxLength={8}
                    onChangeText={txt => {
                      setPromocode(txt);
                    }}
                  />
                </AppView>
              </AppView>
            </AppView>
            <AppView
              style={{
                height: height / 11,
                width: width / 1,
                //justifyContent:'flex-end',
                flexDirection: 'row',
                // backgroundColor:"black"
              }}>
              <AppView
                style={{
                  height: height / 10,
                  width: width / 8,
                  alignItems: 'center',
                  //backgroundColor:"cyan"
                }}>
                <AppTouchable
                  onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}>
                  <AppImage
                    resizeMode="contain"
                    source={iAgree ? CheckboxIcon : Check}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  />
                </AppTouchable>
              </AppView>

              <AppView
                style={{
                  height: height / 11,
                  width: width / 1.17,
                  justifyContent: 'center',
                  //backgroundColor:'red'
                }}>
                <AppText style={styles.txtSubView}>
                  I am over 18+ years old and I acknowledge {'\n'}
                  that I am not allowed to have any other {'\n'}
                  person to access or use my gaming account
                </AppText>
                {/* <AppText style={styles.txtSubView}>
            
              </AppText>
              <AppText style={styles.txtSubView}>
                 
              </AppText> */}
              </AppView>
            </AppView>
            <AppView
              style={{
                height: height / 11,
                width: width / 1,
                flexDirection: 'row',
                // justifyContent: 'center',
              }}>
              <AppView
                style={{
                  height: height / 11,
                  width: width / 8,
                  alignItems: 'center',
                }}>
                <AppTouchable
                  onPress={() =>
                    iAgreeSecond ? toggleIAgreeSecond() : _toggleIAgreeSecond()
                  }>
                  <AppImage
                    resizeMode="contain"
                    source={iAgreeSecond ? CheckboxIcon : Check}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  />
                </AppTouchable>
              </AppView>
              <AppView
                style={{
                  height: height / 11,
                  width: width / 1.16,
                  marginRight: 10,
                  // backgroundColor:"red"
                }}>
                <AppText style={styles.txtSubView}>
                  I am over 18+ years old and I acknowledge {'\n'}
                  that I am not allowed to have any other {'\n'}
                  person to access or use my gaming account
                </AppText>
              </AppView>
            </AppView>
          </ScrollView>
          <AppView style={styles.btnMainContainer}>
            <AppTouchable
              // style={[styles.button, styles.buttonOpen]}
              onPress={() => onSubmit()}>
              <AppView style={styles.mainBtnView}>
                <AppText style={styles.continueTxtView}>Create Account</AppText>
              </AppView>
            </AppTouchable>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>

      {/************************************** Modal Code **************************************/}
      {/* <AppView style={{marginTop: 100}}>
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
                onPress={() => props.navigation.navigate('OtpSignupVerify')}>
                <AppText style={{color: 'rgb(94,28,159)', fontSize: 25}}>
                  Complete your KYC
                </AppText>
              </AppTouchable>
            </AppView>
            <AppView style={styles.laterBtnContainer}>
              <AppTouchable
                // onPress={() => setModalVisible(!modalVisible)}>
                // {/* // onPress={() => props.navigation.navigate('SignUpSecond')}>
                onPress={() => onSubmit()}>
                <AppText style={{color: 'rgb(255,255,255)', fontSize: 22}}>
                  Later
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
        </Modal>
      </AppView> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={contrymodal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setcontrymodal(!contrymodal);
        }}>
        <SafeAreaView style={{flex: 1}} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{}}>
          <View
            style={{height: height, width: width, backgroundColor: '#31005A'}}>
            <View
              style={{
                height: height / 15,
                width: width / 1,
                flexDirection: 'row',
              }}>
              <Header
                head={false}
                backImage={BackArrow}
                headerText2="Register"
                onPress2={() => props.navigation.goBack()}
              />
            </View>

            <View style={styles.searchView}>
              <TextInput
                value={isText}
                style={styles.searchInput}
                placeholder="Search by country and dialing code"
                onChangeText={text => {
                  setIsText(text);
                  SeacrFunct(text);
                }}
                placeholderTextColor="#B5BBC9"></TextInput>
            </View>

            <View style={{height: '80%', width: width}}>
              <FlatList
                data={filterdata}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.value}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '10%',
                position: 'absolute',
                bottom: Platform.OS === 'ios' ? 20 : 0,
                width: width,
              }}>
              {/* <Pressable
                style={[{ alignSelf: 'center' }, styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle], { color: "#fff", }}>Close</Text>
              </Pressable> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterTwo;

const styles = StyleSheet.create({
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  imgContainer: {
    height: height / 19,
    width: width / 9,
    borderRadius: 30,
    backgroundColor: '#7A25CE',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtInptContainer: {
    height: height / 12,
    width: width / 1.07,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  containerTwo: {
    height: height / 9.5,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  blankView: {
    height: height / 240,
    width: width / 4,
    backgroundColor: 'white',
  },
  inptTxtMain: {
    height: height / 10,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtStateView: {
    height: height / 12,
    width: width / 2.1,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
    //color:'white'
  },
  CityView: {
    height: height / 10,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateMainContainer: {
    height: height / 10,
    width: width / 1.02,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  zipContainer: {
    height: height / 12,
    width: width / 2.62,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  touchMain: {
    height: height / 16,
    width: width * 0.95,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  startOverTxt: {
    fontSize: height / 50,
    // width: width / 4.2,
    color: 'rgb(65,160,242)',
    borderBottomWidth: 0.5,
    borderColor: '#4EC6E2',
    textDecorationLine: 'underline',
  },
  mainOneView: {
    height: height / 11,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'cyan'
  },
  mainTwoView: {
    height: height / 12,
    width: width / 1.12,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  mainThreeView: {
    height: height / 13,
    width: width / 4,
    borderEndWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  promoMainView: {
    height: height / 10,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  promoSubMainView: {
    height: height / 12,
    width: width / 1.07,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  btnMainContainer: {
    height: height / 7,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  mainBtnView: {
    height: height / 12,
    width: width / 1.07,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTxtView: {
    fontSize: height / 38,
    fontWeight: '700',
    color: '#7A25CE',
  },
  txtSubView: {
    fontSize: height / 55,
    color: 'white',
    paddingLeft: 10,
  },
  labelContainer: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    marginLeft: 18,
    top: 10,
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
    // elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
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

  textinput3View: {
    height: height / 11,
    width: width / 1.12,
    backgroundColor: '#7A25CE',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1.5,

    // justifyContent: 'center',
  },
  labelContainer2: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    marginLeft: 12,
    // top: 8,
  },
  passwordtextinput: {
    fontSize: height / 55,
    color: 'white',

    marginHorizontal: 11,
    // backgroundColor:'red'
  },
  searchView: {
    height: '8%',
    width: width / 1.2,
    // marginVertical: "5%",
    marginHorizontal: '7%',
  },
  searchInput: {
    borderBottomWidth: 0.9,
    borderColor: '#CFD2D8',
    fontSize: 19,
    fontWeight: '600',
    // fontFamily: "TitilliumWeb-SemiBold",
    color: '#fff',
    padding: 10,
  },

  headerText: {
    fontSize: 28,
    color: '#FFF',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 15,
    color: '#FFF',
    alignContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
  },
  input: {
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingLeft: 5,
    width: height / 12,
    height: height / 18,
    justifyContent: 'center',
  },
  mobileinput: {
    marginLeft: height / 36,
    color: '#AB63E6',
    backgroundColor: '#FFF',
    paddingLeft: height / 48,
    borderRadius: 5,
    height: height / 18,
    width: height / 3.6,
  },

  root: {padding: height / 35, minHeight: height / 2.4},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: height / 35},
  cell: {
    width: height / 18,
    height: height / 18,
    //lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  centeredView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22
  },
  modalView: {
    height: height,
    width: width,
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: height / 35,
    // padding: 35,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 20,
    width: width / 1.4,
    position: 'absolute',
    bottom: height / 36,
    borderRadius: height / 36,
    // padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#A962E5',
  },
  textStyle: {
    textAlign: 'center',

    fontSize: height / 50,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // marginHorizontal: '10%',
    marginVertical: '3%',
    // justifyContent: 'center',
    width: width / 1.1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: height / 50,
    alignSelf: 'center',
    marginLeft: 15,
    color: '#fff',
    width: width / 1.7,
  },
  image2: {
    height: height / 20,
    width: height / 20,
    borderRadius: height / 40,
  },
  dialcodeText: {
    fontSize: height / 50,
    alignSelf: 'center',
    marginLeft: height / 70,
    color: '#fff',
  },
  sliceText: {},
});

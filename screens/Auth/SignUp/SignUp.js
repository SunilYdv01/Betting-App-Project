import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,Text,View
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('window');
import {RegisterStepOne, Icon, BackArrow} from '../../../assets/icon';
import Header from '../../../components/molecules/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
//import {white} from 'react-native-paper/lib/typescript/styles/colors';

const SignUp = props => {
  console.log('err', props.route.params);

  const [date, setDate] = useState('date:2016-12-16');
  const [Dob, setDob] = useState(null);

  const [FirstName, setFirstName] = useState('');
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [errorFirstName, setErrorFirstName] = useState(null);

  const [LastName, setLastName] = useState('');
  const [checkLastName, setCheckLastName] = useState(true);
  const [errorLastName, setErrorLastName] = useState(null);

  const [SsnNumber, setSsnNumber] = useState('');
  const [checkSsnNumber, setCheckSsnNumber] = useState(true);
  const [errorSsnNumber, setErrorSsnNumber] = useState(null);

  const [gender, setGender] = useState('male');

  const myDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log('Alert', today);
    return today;
  };

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };
  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };
  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };
  // const [date, setDate] = useState(new Date());

  //************************************* First Name Validation *************************************
  const _validateFirstName = fname => {
    var fnameRegex = /^[a-z A-Z ]{2,32}$/i;
    if (fname == '' || fname == undefined || fname == null) {
      setErrorFirstName('*Please enter first name.');
    } else if (!fnameRegex.test(fname)) {
      setErrorFirstName('*Please enter valid first name.');
    } else {
      setErrorFirstName(null);
    }
  };

  const _validateLastName = lname => {
    var lnameRegex = /^[a-z A-Z ]{2,32}$/i;
    if (lname == '' || lname == undefined || lname == null) {
      setErrorLastName('*Please enter last name.');
    } else if (!lnameRegex.test(lname)) {
      setErrorLastName('*Please enter valid last name.');
    } else {
      setErrorLastName(null);
    }
  };

  const _validateSsnNumber = pin => {
    var pinRegex = /^[0-9]{2,32}$/i;
    if (pin == '' || pin == undefined || pin == null) {
      setErrorSsnNumber('*Please enter ssn number.');
    } else if (!pinRegex.test(pin)) {
      setErrorSsnNumber('*Please enter valid ssn number.');
    } else {
      setErrorSsnNumber(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (FirstName === '') {
      setCheckFirstName('*Please enter first name.');
      flag = false;
    }
    if (LastName === '') {
      setErrorLastName('*Please enter last name.');
      flag = false;
    }
    if (SsnNumber === '') {
      setErrorSsnNumber('*Please enter ssn number.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      // alert('Success!');
      props.navigation.navigate('SignUpSecond', {
        firstName: FirstName,
        lastName: LastName,
        ssn: SsnNumber,
        userName: props.route.params.userName,
        email: props.route.params.email,
        password: props.route.params.password,
        confirmPassword: props.route.params.confirmPassword,
        dob: Dob,
      });
    }
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <KeyboardAwareScrollView>
        <AppView style={styles.mainView}>
          <Header
            head={false}
            backImage={BackArrow}
            headerText2="Register"
            // onPress1={() => props.navigation.navigate('Login')}
            onPress2={() => props.navigation.goBack()}
          />

          <AppView style={styles.logoImgView}>
            <AppView style={styles.logoViewTwo}>
              <AppImage
                style={{height: height / 19.8, width: width / 8}}
                resizeMode="contain"
                source={require('../../../assets/images/RegisterStepOne/RegisterStepOne.png')}
              />
            </AppView>
            <AppView
              style={{
                height: height / 240,
                width: width / 4,
                backgroundColor: 'white',
              }}
            />
            <AppView style={styles.TxtTwoView}>
              <AppText style={{fontSize: height / 40, color: 'black'}}>
                2
              </AppText>
            </AppView>
            <AppView
              style={{
                height: height / 240,
                width: width / 4,
                backgroundColor: 'white',
              }}
            />
            <AppView style={styles.TxtTwoView}>
              <AppText style={{fontSize: height / 40, color: 'black'}}>
                3
              </AppText>
            </AppView>
          </AppView>
          <AppView
            style={{
              height: height / 15,
              width: width / 1,
              flexDirection: 'row',
            }}>
            <AppView
              style={{
                height: height / 23,
                width: width / 11.2,
                alignItems: 'flex-end',
                //backgroundColor:'red',
                justifyContent: 'center',
              }}>
              <AppImage
                style={{
                  height: height / 40,
                  width: width / 19,
                  tintColor: 'white',
                }}
                source={Icon}
              />
            </AppView>
            <AppView
              style={{
                height: height / 16,
                width: width / 1.17,
                marginLeft: 5,
                justifyContent: 'center',
              }}>
              <AppText style={{fontSize: height / 54, color: 'white'}}>
                Please enter your information as it is shown on your identify
                documents.
              </AppText>
            </AppView>
          </AppView>
          {/* <ScrollView> */}
          <AppView
            style={{
              height: height / 13,
              width: width / 1,
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor:'red',
              // alignSelf:'center'
            }}>
            <AppView style={styles.MrView}>
              <AppTouchable
                onPress={() => setGender('male')}
                style={[
                  styles.MrviewTwo,
                  {backgroundColor: gender === 'male' ? '#7A25CE' : 'white'},
                ]}>
                <AppText
                  style={{
                    fontSize: height / 38,
                    color: gender === 'male' ? 'white' : 'black',
                  }}>
                  Mr.
                </AppText>
              </AppTouchable>
              <AppTouchable
                onPress={() => setGender('female')}
                style={[
                  styles.MrviewTwo,
                  {backgroundColor: gender === 'female' ? '#7A25CE' : 'white'},
                ]}>
                <AppText
                  style={{
                    fontSize: height / 38,
                    color: gender === 'female' ? 'white' : 'black',
                  }}>
                  Ms.
                </AppText>
              </AppTouchable>
            </AppView>
          </AppView>
          <AppView style={styles.TxtInptViewContainer}>
            <AppView style={styles.textinput3View}>
              <AppView
                style={{height: height * 0.03, justifyContent: 'center'}}>
                <AppText style={styles.labelContainer2}>First Name</AppText>
              </AppView>
              <AppView
                style={{height: height * 0.04, justifyContent: 'center'}}>
                <TextInput
                  style={styles.passwordtextinput}
                  placeholder="Enter First Name"
                  placeholderTextColor="white"
                  keyboardType="default"
                  maxLength={30}
                  onChangeText={txt => {
                    setFirstName(txt), _validateFirstName(txt);
                  }}
                />
              </AppView>
            </AppView>
          </AppView>
          {errorFirstName != null ? (
            <AppView style={{height: height * 0.02, width: width * 1}}>
              <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                {errorFirstName}
              </AppText>
            </AppView>
          ) : null}
          <AppView
            style={{
              // height: height / 11,
              height: height / 13,
              width: width / 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <AppView style={styles.textinput3View}>
              <AppView
                style={{height: height * 0.03, justifyContent: 'center'}}>
                <AppText style={styles.labelContainer2}>Last Name</AppText>
              </AppView>
              <AppView
                style={{height: height * 0.04, justifyContent: 'center'}}>
                <TextInput
                  style={styles.passwordtextinput}
                  placeholderTextColor="white"
                  placeholder="Enter Last Name"
                  keyboardType="default"
                  maxLength={30}
                  onChangeText={txt => {
                    setLastName(txt), _validateLastName(txt);
                  }}
                />
              </AppView>
            </AppView>
          </AppView>
          {errorLastName != null ? (
            <AppView style={{height: height * 0.02, width: width * 1}}>
              <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                {errorLastName}
              </AppText>
            </AppView>
          ) : null}
          <AppView style={styles.ssnView}>
            <AppView style={styles.textinput3View}>
              <AppView
                style={{height: height * 0.03, justifyContent: 'center'}}>
                <AppText maxLength={6} style={styles.labelContainer2}>
                  SSN Number
                </AppText>
              </AppView>
              <AppView
                style={{height: height * 0.04, justifyContent: 'center'}}>
                <TextInput
                  style={styles.passwordtextinput}
                  placeholderTextColor="white"
                  maxLength={6}
                  placeholder="Last 6 digit of your SSN"
                  onChangeText={txt => {
                    setSsnNumber(txt), _validateSsnNumber(txt);
                  }}
                />
              </AppView>
            </AppView>
          </AppView>
          {errorSsnNumber != null ? (
            <AppView style={{height: height * 0.02, width: width * 1}}>
              <AppText style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                {errorSsnNumber}
              </AppText>
            </AppView>
          ) : null}
          <AppView
            style={{
              height: height / 15,
              width: width / 1,
              justifyContent: 'center',
              // marginTop: 15,
            }}>
            <AppText style={styles.DOBContainer}>Date of birth</AppText>
          </AppView>

          <AppView
            style={{
              height: height / 10,
              width: width / 1,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppView
              style={{
                height: height / 16,
                width: width / 1.09,
                borderRadius: 5,
                backgroundColor: '#7A25CE',
                borderWidth: 0.8,
                borderColor: 'white',
                justifyContent: 'center',
              }}>
              <DatePicker
                style={{width: width * 0.912}}
                date={date ? date.toString() : null}
                mode="date"
                placeholder="Select date"
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate={myDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                //wheels={{width: width * 0.9, backgroundColor: 'cyan'}}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 12,
                    top: 5,
                    marginLeft: 4,
                  },
                  dateInput: {
                    marginLeft: width / 6,
                    height: height / 16.2,
                  
                    width: width / 9,
                    backgroundColor: 'white',
                    borderTopRightRadius:5,
                    borderBottomRightRadius:5
                  },
                  datePickerCon: {
                    backgroundColor: 'white',
                    width: width / 1,
                  },
                }}
                onDateChange={date => {
                  console.log('Alertdate is shown', date);
                  setDate(date.toString());
                }}
                onChangeText={txt => {
                  setDob(txt);
                }}
              />
            </AppView>
            {/* <DatePicker
              date={date}
              onDateChange={setDate}
              style={{backgroundColor: '#7A25CE'}}
            /> */}
          </AppView>

          <AppView style={styles.btnMainView}>
            <AppTouchable onPress={() => onSubmit()}>
              <AppView style={styles.btnContainer}>
                <AppText
                  style={{
                    fontSize: height / 38,
                    fontWeight: '700',
                    color: '#7A25CE',
                  }}>
                  Continue
                </AppText>
              </AppView>
            </AppTouchable>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  backArrowView: {
    height: height * 0.08,
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxtView: {
    height: height * 0.08,
    width: width * 0.8,
    justifyContent: 'center',
   // backgroundColor:'red'
  },
  RegisterTxtView: {
    color: 'white',
    fontSize: height / 35,
    fontWeight: '700',
    marginHorizontal: 60,
  },
  logoImgView: {
    height: height * 0.07,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical:4
    // backgroundColor: 'red',
  },
  logoViewTwo: {
    height: height / 19,
    width: width / 9,
    borderRadius: 30,
    backgroundColor: '#7A25CE',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtTwoView: {
    height: height / 19,
    width: width / 9,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MrView: {
    height: height / 15,
    width: width / 1.08,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  MrviewTwo: {
    height: height / 18,
    width: width / 2.4,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtInptView: {
    height: height / 11,
    width: width / 1.07,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    marginTop: 5,
  },
  TxtinptContainerOne: {
    height: height / 13,
    width: width / 1.07,
    backgroundColor: '#7A25CE',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    flexDirection: 'row',
  },
  ssnView: {
    // height: height / 11,
    height: height / 13,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  btnContainer: {
    height: height / 13,
    width: width / 1.07,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnMainView: {
    height: height * 0.25,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  calendarContainer: {
    height: height / 13.7,
    width: width / 3.3,
    borderEndWidth: 0.8,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarSubView: {
    height: height / 13.7,
    width: width / 3.2,
    borderEndWidth: 0.8,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inptThreeView: {
    height: height / 11,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtInptViewContainer: {
    height: height / 11,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  DOBContainer: {
    fontSize: height / 43,
    color: 'white',
    width: width / 2.9,
    textAlign: 'right',
    fontWeight: '700',
    //backgroundColor:'red'
    // marginHorizontal: 8,
  },
  labelContainer: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    marginLeft: 18,
    top: 10,
  },

  textinput3View: {
    height: height / 14,
    width: width / 1.1,
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
    marginLeft: 9,
    padding: 4,
    //backgroundColor:'red'
  },
});

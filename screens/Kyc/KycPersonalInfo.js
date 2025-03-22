// import React, {useState} from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import {
//   AppText,
//   AppView,
//   AppImage,
//   AppTouchable,
// } from '../../components/Atom/atom';
// import {ArrowBackGreen, BackArrow} from '../../assets/icon';
// import axios from 'axios';
// const {height, width} = Dimensions.get('window');
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const kycPersonalInfo = (props, {navigation}) => {
//   const [FirstName, setFirstName] = useState('');
//   const [checkFirstName, setCheckFirstName] = useState(true);
//   const [errorFirstName, setErrorFirstName] = useState(null);

//   const [LastName, setLastName] = useState('');
//   const [checkLastName, setCheckLastName] = useState(true);
//   const [errorLastName, setErrorLastName] = useState(null);

//   const [Address, setAddress] = useState('');
//   const [checkAddress, setCheckAddress] = useState(true);
//   const [errorAddress, setErrorAddress] = useState(null);

//   const [City, setCity] = useState('');
//   const [checkCity, setCheckCity] = useState(true);
//   const [errorCity, setErrorCity] = useState(null);

//   const [Zip, setZip] = useState('');
//   const [checkZip, setCheckZip] = useState(true);
//   const [errorZip, setErrorZip] = useState(null);

//   const [Citizenship, setCitizenship] = useState('');
//   const [checkCitizenship, setCheckCitizenship] = useState(true);
//   const [errorCitizenship, setErrorCitizenship] = useState(null);

//   const [kycData, setKycData] = useState();

//   const _validateFirstName = fname => {
//     var fnameRegex = /^[a-z A-Z]{3,32}$/i;
//     var fname = fname.trim();
//     if (fname == '' || fname == undefined || fname == null) {
//       setErrorFirstName('*Please enter first name.');
//     } else if (!fnameRegex.test(fname)) {
//       setErrorFirstName('*Please enter valid first name.');
//     } else {
//       setErrorFirstName(null);
//     }
//   };

//   const _validateLastName = lname => {
//     var lnameRegex = /^[a-z A-Z ]{3,32}$/i;
//     var lname = lname.trim();
//     if (lname == '' || lname == undefined || lname == null) {
//       setErrorLastName('*Please enter last name.');
//     } else if (!lnameRegex.test(lname)) {
//       setErrorLastName('*Please enter valid last name.');
//     } else {
//       setErrorLastName(null);
//     }
//   };

//   const _validateAddress = address => {
//     var addressRegex = /^[a-zA-Z0-9\s,/,-]{3,70}$/;
//     address = address.trim();
//     if (address == '' || address == undefined || address == null) {
//       setErrorAddress('*Please enter address.');
//     } else if (!addressRegex.test(address)) {
//       setErrorAddress('*Please enter valid address.');
//     } else {
//       setErrorAddress(null);
//     }
//   };

//   const _validateCity = city => {
//     var cityRegex = /^[a-zA-Z ]{3,60}$/i;
//     if (city == '' || city == undefined || city == null) {
//       setErrorCity('*Please enter city.');
//     } else if (!cityRegex.test(city)) {
//       setErrorCity('*Please enter valid city.');
//     } else {
//       setErrorCity(null);
//     }
//   };

//   const _validateZip = mobileNo => {
//     var zipRegex = /^[0-9/s]{4,8}$/;
//     if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
//       setErrorZip('*Please enter zip code.');
//     } else if (!zipRegex.test(mobileNo)) {
//       setErrorZip('*Please Enter valid zip code.');
//     } else {
//       setErrorZip(null);
//     }
//   };

//   const _validateCitizenship = citizenship => {
//     var citizenshipRegex = /^[a-zA-Z ]{3,60}$/i;
//     if (citizenship == '' || citizenship == undefined || citizenship == null) {
//       setErrorCitizenship('*Please enter citizenship.');
//     } else if (!citizenshipRegex.test(citizenship)) {
//       setErrorCitizenship('*Please enter valid citizenship.');
//     } else {
//       setErrorCitizenship(null);
//     }
//   };

//   const validate = () => {
//     let flag = true;
//     if (FirstName === '') {
//       setErrorFirstName('*Please enter first name.');
//       flag = false;
//     }
//     if (LastName === '') {
//       setErrorLastName('*Please enter last name.');
//       flag = false;
//     }
//     if (Address === '') {
//       setErrorAddress('*Please enter address.');
//       flag = false;
//     }
//     if (City === '') {
//       setErrorCity('*Please enter city.');
//       flag = false;
//     }
//     if (Zip === '') {
//       setErrorZip('*Please enter zip.');
//       flag = false;
//     }
//     if (Citizenship === '') {
//       setErrorCitizenship('*Please enter citizenship.');
//       flag = false;
//     }
//     return flag;
//   };

//   const onSubmit = () => {
//     if (validate()) {
//       // updatekycdetails();
//     }
//     updatekycdetails();
//   };

//   const updatekycdetails = async () => {
//     const value = await AsyncStorage.getItem('token');
//     console.log('====== my token======>>>>', value);

//     axios({
//       method: 'post',
//       // url: `https://java-create-token.mobiloitte.org/account/save-kyc-details`,
//       url: `https://java-create-token.mobiloitte.org/account/save-kyc-details`,
//       //url: `https://java-create-token.mobiloitte.org/account/save-kyc-details`,
//       data: {
//         document: [
//           {
//             address: 'BALLIA',
//             backIdUrl: 'image',
//             citizenship: 'indian',
//             city: 'delhi',
//             createTime: '2021-11-11T07:09:50.440Z',
//             docIdNumber: 'string',
//             docName: 'string',
//             documentId: 0,
//             documentNumber: 0,
//             documentStatus: 'ACCEPTED',
//             firstName: 'string',
//             frontIdUrl: 'image',
//             lastName: 'string',
//             latest: true,
//             reason: 'string',
//             updateTime: '2021-11-11T07:09:50.440Z',
//             zipode: '12345',
//           },
//         ],
//       },
//       // document: [
//       //   {
//       //     firstName: FirstName,
//       //     lastName: LastName,
//       //     address: Address,
//       //     city: City,
//       //     zip: Zip,
//       //     citizenship: Citizenship,
//       //     // backIdUrl: 'string',
//       //     // createTime: '2021-10-07T06:12:46.129Z',
//       //     // docIdNumber: 'string',
//       //     // docName: 'string',
//       //     // documentId: 0,
//       //     // documentNumber: 0,
//       //     // documentStatus: 'ACCEPTED',
//       //     // firstName: 'Yash',
//       //     // lastName: 'Sharma',
//       //     // address: 'Okhla',
//       //     // city: 'Okhla',
//       //     // zipode: '110022',
//       //     // citizenship: 'Indian',
//       //     // frontIdUrl: 'string',
//       //     // latest: '',
//       //     // reason: 'string',
//       //     // updateTime: '2021-10-07T06:12:46.129Z',
//       //     // address: 'BALLIA',
//       //     // backIdUrl: 'string',
//       //     // citizenship: 'string',
//       //     // city: 'string',
//       //     // createTime: '2021-11-11T07:09:50.440Z',
//       //     // docIdNumber: 'string',
//       //     // docName: 'string',
//       //     // documentId: 0,
//       //     // documentNumber: 0,
//       //     // documentStatus: 'ACCEPTED',
//       //     // firstName: 'string',
//       //     // frontIdUrl: 'string',
//       //     // lastName: 'string',
//       //     // latest: true,
//       //     // reason: 'string',
//       //     // updateTime: '2021-11-11T07:09:50.440Z',
//       //     // zipode: 'string',
//       //   },
//       // ],
//       // // },
//       headers: {
//         Authorization: `Bearer ${value}`,
//         'content-type': 'application/json',
//       },
//     })
//       .then(res => {
//         if (res.status === 200) {
//           console.log('KycData ------------- >>>>>', res.data);
//           props.navigation.navigate('KycDocumentVerification', {
//             firstName: FirstName,
//             lastName: LastName,
//             address: Address,
//             city: City,
//             zip: Zip,
//             citizenship: Citizenship,
//           });
//           // setKycData(res.data)
//           // console.log(("kyc- Data 111111-------->",kycData));
//           //  setUserProfile(res.data.data)
//         } else {
//           alert('Something went wrong');
//         }
//       })
//       .catch(err => console.log('error vandooocatch---->>>>', err));
//   };

//   return (
//     <SafeAreaView>
//       <KeyboardAwareScrollView>
//         <AppView style={styles.mainContainer}>
//           <AppView style={styles.blankConatiner}>
//             <AppView style={styles.arrowBackView}>
//               <AppTouchable onPress={() => props.navigation.navigate('MyTabs')}>
//                 <AppImage
//                   resizemode="contain"
//                   source={BackArrow}
//                   style={{
//                     marginLeft: 15,
//                     tintColor: 'white',
//                     height: height / 40,
//                     width: width / 20,
//                   }}
//                 />
//               </AppTouchable>
//             </AppView>
//             <AppView style={styles.headingContainer}>
//               <AppText
//                 style={{
//                   color: 'rgb(255,255,255)',
//                   fontSize: height / 35,
//                   fontWeight: '700',
//                 }}>
//                 KYC - Details
//               </AppText>
//             </AppView>
//           </AppView>

//           <AppView style={styles.sectionTwoContainer}>
//             {/* <KeyboardAwareScrollView> */}
//             <ScrollView>
//               <AppView style={styles.passHeadView}>
//                 <AppText style={styles.txtForgotHead}>
//                   Personal Information
//                 </AppText>
//               </AppView>

//               <AppView
//                 style={{
//                   height: height / 1.5,
//                   alignItems: 'center',
//                   overflow: 'hidden',
//                   // paddingBottom: 5,
//                   // backgroundColor: 'green',
//                 }}>
//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>
//                       First Name
//                     </AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your First Name"
//                       maxLength={60}
//                       onChangeText={txt => {
//                         setFirstName(txt), _validateFirstName(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorFirstName != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{
//                         color: 'red',
//                         fontSize: height / 60,
//                         marginLeft: 17,
//                       }}>
//                       {errorFirstName}
//                     </AppText>
//                   </AppView>
//                 ) : null}

//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>
//                       Last Name
//                     </AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your Last Name"
//                       maxLength={60}
//                       onChangeText={txt => {
//                         setLastName(txt), _validateLastName(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorLastName != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{
//                         color: 'red',
//                         fontSize: height / 60,
//                         marginLeft: 17,
//                       }}>
//                       {errorLastName}
//                     </AppText>
//                   </AppView>
//                 ) : null}

//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>
//                       Street Address
//                     </AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your Street Address"
//                       maxLength={100}
//                       onChangeText={txt => {
//                         setAddress(txt), _validateAddress(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorAddress != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                       {errorAddress}
//                     </AppText>
//                   </AppView>
//                 ) : null}

//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>City</AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your City"
//                       maxLength={40}
//                       onChangeText={txt => {
//                         setCity(txt), _validateCity(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorCity != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                       {errorCity}
//                     </AppText>
//                   </AppView>
//                 ) : null}

//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>
//                       Zip/Area Code
//                     </AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your Zip/Area Code"
//                       keyboardType="numeric"
//                       maxLength={8}
//                       onChangeText={txt => {
//                         setZip(txt), _validateZip(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorZip != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                       {errorZip}
//                     </AppText>
//                   </AppView>
//                 ) : null}

//                 <AppView style={styles.maininput}>
//                   <AppView style={{height: height * 0.03, width: width * 0.9}}>
//                     <AppText style={styles.emailConatinerView}>
//                       Citizenship
//                     </AppText>
//                   </AppView>
//                   <AppView style={styles.inptTxtField}>
//                     <TextInput
//                       style={styles.textinputemail}
//                       placeholder="Enter Your Citizenship"
//                       maxLength={60}
//                       onChangeText={txt => {
//                         setCitizenship(txt), _validateCitizenship(txt);
//                       }}
//                     />
//                   </AppView>
//                 </AppView>
//                 {errorCitizenship != null ? (
//                   <AppView
//                     style={{
//                       height: height * 0.02,
//                       width: width * 1,
//                     }}>
//                     <AppText
//                       style={{color: 'red', fontSize: 13, marginLeft: 17}}>
//                       {errorCitizenship}
//                     </AppText>
//                   </AppView>
//                 ) : null}
//               </AppView>

//               <AppView style={styles.btnContainer}>
//                 <AppTouchable
//                   style={styles.btnTouchView}
//                   onPress={() => onSubmit()}>
//                   <AppText style={styles.resetTxtView}>Next</AppText>
//                 </AppTouchable>
//               </AppView>
//             </ScrollView>
//             {/* </KeyboardAwareScrollView> */}
//           </AppView>
//         </AppView>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default kycPersonalInfo;

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: height * 1,
//     width: width * 1,
//     backgroundColor: '#7A25CE',
//   },
//   blankConatiner: {
//     height: height * 0.1,
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
//     // backgroundColor:"red"
//   },
//   sectionTwoContainer: {
//     // height: height * 0.88,
//     height: height * 0.991,
//     width: width * 1,
//     backgroundColor: 'rgb(255,255,255)',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     // backgroundColor: 'red',
//   },
//   enterCodeView: {
//     height: height * 0.07,
//     width: width * 1,
//     justifyContent: 'center',
//   },
//   passHeadView: {
//     height: height * 0.08,
//     width: width * 1,
//     justifyContent: 'flex-end',
//     marginBottom: 15,
//     // backgroundColor: 'brown',
//   },
//   txtForgotHead: {
//     color: 'rgb(48,44,44)',
//     fontSize: 26,
//     fontWeight: '600',
//     marginLeft: 20,
//   },
//   paraContainer: {
//     height: height * 0.06,
//     width: width * 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   paraTxtView: {
//     color: 'rgb(112,112,112)',
//     fontSize: 18,
//     marginLeft: 20,
//   },

//   maininput: {
//     height: height * 0.082,
//     width: width * 0.9,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 4,
//     borderRadius: 10,
//     borderWidth: 1,
//     marginVertical: 10,
//     borderColor: 'rgb(228, 228 ,228)',
//   },
//   emailConatinerView: {
//     color: 'rgb(0,0,0)',
//     fontSize: height / 50,
//     marginLeft: 15,
//     top: 2,
//     paddingVertical: 5,
//   },
//   inptTxtField: {
//     height: height * 0.05,
//     width: width * 0.85,
//     justifyContent: 'center',
//     // backgroundColor: 'green',
//     marginVertical: 8,
//   },
//   btnContainer: {
//     height: height * 0.1,
//     width: width * 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     // bottom: 40,
//     // position: 'absolute',
//     // backgroundColor: 'red',
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
//   textinputemail: {
//     fontSize: height / 55,
//     color: 'black',
//     marginLeft: 15,
//     // padding:8
//   },
//   placeholderContainer: {
//     height: height * 0.42,
//     width: width * 1,
//     alignItems: 'center',
//   },
//   // textinputemail: {
//   //   fontSize: height / 45,
//   //   color: 'black',
//   //   marginLeft: 12,
//   //   bottom: 2,
//   // },
// });

import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import {ArrowBackGreen, BackArrow} from '../../assets/icon';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';

const kycPersonalInfo = (props, {navigation}) => {
  const [FirstName, setFirstName] = useState('');
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [errorFirstName, setErrorFirstName] = useState(null);

  const [LastName, setLastName] = useState('');
  const [checkLastName, setCheckLastName] = useState(true);
  const [errorLastName, setErrorLastName] = useState(null);

  const [Address, setAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState(true);
  const [errorAddress, setErrorAddress] = useState(null);

  const [City, setCity] = useState('');
  const [checkCity, setCheckCity] = useState(true);
  const [errorCity, setErrorCity] = useState(null);

  const [Zip, setZip] = useState('');
  const [checkZip, setCheckZip] = useState(true);
  const [errorZip, setErrorZip] = useState(null);

  const [Citizenship, setCitizenship] = useState('');
  const [checkCitizenship, setCheckCitizenship] = useState(true);
  const [errorCitizenship, setErrorCitizenship] = useState(null);

  const [kycData, setKycData] = useState();

  const _validateFirstName = fname => {
    var fnameRegex = /^[a-z A-Z]{3,32}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorFirstName('*Please enter first name.');
    } else if (!fnameRegex.test(fname)) {
      setErrorFirstName('*Please enter valid first name.');
    } else {
      setErrorFirstName(null);
    }
  };

  const _validateLastName = lname => {
    var lnameRegex = /^[a-z A-Z ]{3,32}$/i;
    var lname = lname.trim();
    if (lname == '' || lname == undefined || lname == null) {
      setErrorLastName('*Please enter last name.');
    } else if (!lnameRegex.test(lname)) {
      setErrorLastName('*Please enter valid last name.');
    } else {
      setErrorLastName(null);
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

  const _validateZip = mobileNo => {
    var zipRegex = /^[0-9/s]{4,8}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setErrorZip('*Please enter zip code.');
    } else if (!zipRegex.test(mobileNo)) {
      setErrorZip('*Please Enter valid zip code.');
    } else {
      setErrorZip(null);
    }
  };

  const _validateCitizenship = citizenship => {
    var citizenshipRegex = /^[a-zA-Z ]{3,60}$/i;
    if (citizenship == '' || citizenship == undefined || citizenship == null) {
      setErrorCitizenship('*Please enter citizenship.');
    } else if (!citizenshipRegex.test(citizenship)) {
      setErrorCitizenship('*Please enter valid citizenship.');
    } else {
      setErrorCitizenship(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (FirstName === '') {
      setErrorFirstName('*Please enter first name.');
      flag = false;
    }
    if (LastName === '') {
      setErrorLastName('*Please enter last name.');
      flag = false;
    }
    if (Address === '') {
      setErrorAddress('*Please enter address.');
      flag = false;
    }
    if (City === '') {
      setErrorCity('*Please enter city.');
      flag = false;
    }
    if (Zip === '') {
      setErrorZip('*Please enter zip.');
      flag = false;
    }
    if (Citizenship === '') {
      setErrorCitizenship('*Please enter citizenship.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      // updatekycdetails();
    }
    updatekycdetails();
  };

  const updatekycdetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'post',
      url: `https://java-create-token.mobiloitte.org/account/save-kyc-details`,
      data: {
        document: [
          {
            firstName: FirstName,
            lastName: LastName,
            address: Address,
            city: City,
            zip: Zip,
            citizenship: Citizenship,
            // backIdUrl: 'string',
            // createTime: '2021-10-07T06:12:46.129Z',
            // docIdNumber: 'string',
            // docName: 'string',
            // documentId: 0,
            // documentNumber: 0,
            // documentStatus: 'ACCEPTED',
            // firstName: 'Yash',
            // lastName: 'Sharma',
            // address: 'Okhla',
            // city: 'Okhla',
            // zipode: '110022',
            // citizenship: 'Indian',
            // frontIdUrl: 'string',
            // latest: true,
            // reason: 'string',
            // updateTime: '2021-10-07T06:12:46.129Z',
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('KycData ------------- >>>>>', res.data);
          props.navigation.navigate('KycDocumentVerification', {
            firstName: FirstName,
            lastName: LastName,
            address: Address,
            city: City,
            zip: Zip,
            citizenship: Citizenship,
          });
          // setKycData(res.data)
          // console.log(("kyc- Data 111111-------->",kycData));
          //  setUserProfile(res.data.data)
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <AppView style={styles.mainContainer}>
          <AppView style={styles.blankConatiner}>
            <AppView style={styles.arrowBackView}>
              <AppTouchable onPress={() => props.navigation.navigate('MyTabs')}>
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
                  fontSize: height / 35,
                  fontWeight: '700',
                }}>
                KYC - Details
              </AppText>
            </AppView>
          </AppView>

          <AppView style={styles.sectionTwoContainer}>
            {/* <KeyboardAwareScrollView> */}
            <ScrollView>
              <AppView style={styles.passHeadView}>
                <AppText style={styles.txtForgotHead}>
                  Personal Information
                </AppText>
              </AppView>

              <AppView
                style={{
                  height: height / 1.5,
                  alignItems: 'center',
                  overflow: 'hidden',
                  // paddingBottom: 5,
                  // backgroundColor: 'green',
                }}>
                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>
                      First Name
                    </AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your First Name"
                      maxLength={60}
                      onChangeText={txt => {
                        setFirstName(txt), _validateFirstName(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorFirstName != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 1,
                    }}>
                    <AppText
                      style={{
                        color: 'red',
                        fontSize: height / 60,
                        marginLeft: 17,
                      }}>
                      {errorFirstName}
                    </AppText>
                  </AppView>
                ) : null}

                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>
                      Last Name
                    </AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your Last Name"
                      maxLength={60}
                      onChangeText={txt => {
                        setLastName(txt), _validateLastName(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorLastName != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 1,
                    }}>
                    <AppText
                      style={{
                        color: 'red',
                        fontSize: height / 60,
                        marginLeft: 17,
                      }}>
                      {errorLastName}
                    </AppText>
                  </AppView>
                ) : null}

                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>
                      Street Address
                    </AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your Street Address"
                      maxLength={100}
                      onChangeText={txt => {
                        setAddress(txt), _validateAddress(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorAddress != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 1,
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                      {errorAddress}
                    </AppText>
                  </AppView>
                ) : null}

                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>City</AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your City"
                      maxLength={40}
                      onChangeText={txt => {
                        setCity(txt), _validateCity(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorCity != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 1,
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                      {errorCity}
                    </AppText>
                  </AppView>
                ) : null}

                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>
                      Zip/Area Code
                    </AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your Zip/Area Code"
                      keyboardType="numeric"
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
                      width: width * 1,
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                      {errorZip}
                    </AppText>
                  </AppView>
                ) : null}

                <AppView style={styles.maininput}>
                  <AppView style={{height: height * 0.03, width: width * 0.9}}>
                    <AppText style={styles.emailConatinerView}>
                      Citizenship
                    </AppText>
                  </AppView>
                  <AppView style={styles.inptTxtField}>
                    <TextInput
                      style={styles.textinputemail}
                      placeholder="Enter Your Citizenship"
                      maxLength={60}
                      onChangeText={txt => {
                        setCitizenship(txt), _validateCitizenship(txt);
                      }}
                    />
                  </AppView>
                </AppView>
                {errorCitizenship != null ? (
                  <AppView
                    style={{
                      height: height * 0.02,
                      width: width * 1,
                    }}>
                    <AppText
                      style={{color: 'red', fontSize: 13, marginLeft: 17}}>
                      {errorCitizenship}
                    </AppText>
                  </AppView>
                ) : null}
              </AppView>

              <AppView style={styles.btnContainer}>
                <AppTouchable
                  style={styles.btnTouchView}
                  onPress={() => onSubmit()}>
                  <AppText style={styles.resetTxtView}>Next</AppText>
                </AppTouchable>
              </AppView>
            </ScrollView>
            {/* </KeyboardAwareScrollView> */}
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default kycPersonalInfo;

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
    // backgroundColor:"red"
  },
  sectionTwoContainer: {
    // height: height * 0.88,
    height: height * 0.991,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor: 'red',
  },
  enterCodeView: {
    height: height * 0.07,
    width: width * 1,
    justifyContent: 'center',
  },
  passHeadView: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    // backgroundColor: 'brown',
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize: 26,
    fontWeight: '600',
    marginLeft: 20,
  },
  paraContainer: {
    height: height * 0.06,
    width: width * 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paraTxtView: {
    color: 'rgb(112,112,112)',
    fontSize: 18,
    marginLeft: 20,
  },

  maininput: {
    height: height * 0.082,
    width: width * 0.9,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'rgb(228, 228 ,228)',
  },
  emailConatinerView: {
    color: 'rgb(0,0,0)',
    fontSize: height / 50,
    marginLeft: 15,
    top: 2,
    paddingVertical: 5,
  },
  inptTxtField: {
    height: height * 0.05,
    width: width * 0.85,
    justifyContent: 'center',
    // backgroundColor: 'green',
    marginVertical: 8,
  },
  btnContainer: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // bottom: 40,
    // position: 'absolute',
    // backgroundColor: 'red',
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
    fontSize: height / 55,
    color: 'black',
    marginLeft: 15,
    // padding:8
  },
  placeholderContainer: {
    height: height * 0.42,
    width: width * 1,
    alignItems: 'center',
  },
  // textinputemail: {
  //   fontSize: height / 45,
  //   color: 'black',
  //   marginLeft: 12,
  //   bottom: 2,
  // },
});

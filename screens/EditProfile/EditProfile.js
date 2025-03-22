import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AppView, AppText} from '../../components/Atom/atom';
// import { Avatar } from "react-native-paper";
import {Avatar, Icon} from 'react-native-elements';
// import Header from "../../../components/Molecules/Header";
import {BackArrow, UserIconOne, lion} from '../../assets/icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/molecules/Header';
const {height, width} = Dimensions.get('screen');
import {CountryCode} from '../CountryCode';

const EditProfile = props => {
  console.log('urlImage', urlImage);
  const [filePath, setFilePath] = useState({});
  const [address, setAddress] = useState();
  const [countryCodeValue, setCountryCodeValue] = useState();

  const [urlImage, setUrlImage] = useState();

  const [FirstName, setFirstName] = useState('');
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [errorFirstName, setErrorFirstName] = useState(null);

  const [LastName, setLastName] = useState('');
  const [checkLastName, setCheckLastName] = useState(true);
  const [errorLastName, setErrorLastName] = useState(null);

  const [Email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);

  const [PhoneNo, setPhoneNo] = useState('');
  const [checkPhoneNo, setCheckPhoneNo] = useState(true);
  const [errorPhoneNo, setErrorPhoneNo] = useState(null);

  const _validateFirstName = fname => {
    var fnameRegex = /^[a-z A-Z]{3,32}$/i;
    var fname = fname.trim();
    if (fname == '' || fname == undefined || fname == null) {
      setErrorFirstName('* Please enter first name.');
    } else if (!fnameRegex.test(fname)) {
      setErrorFirstName('* Please enter valid first name.');
    } else {
      setErrorFirstName(null);
    }
  };

  const _validateLastName = lname => {
    var lnameRegex = /^[a-z A-Z ]{3,32}$/i;
    var lname = lname.trim();
    if (lname == '' || lname == undefined || lname == null) {
      setErrorLastName('* Please enter last name.');
    } else if (!lnameRegex.test(lname)) {
      setErrorLastName('* Please enter valid last name.');
    } else {
      setErrorLastName(null);
    }
  };

  const _validateEmail = address => {
    var addressRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    address = address.trim();
    if (address == '' || address == undefined || address == null) {
      setErrorEmail('* Please enter address.');
    } else if (!addressRegex.test(address)) {
      setErrorEmail('* Please enter valid address.');
    } else {
      setErrorEmail(null);
    }
  };

  // const _validatePhoneNo = pno => {
  //   var pnoRegex = /^[0-9]$/i;
  //   // var pno = pno.trim();
  //   if (pno == '' || pno == undefined || pno == null) {
  //     setErrorPhoneNo('*Please enter Phone No');
  //   } else if (!pnoRegex.test(pno)) {
  //     setErrorPhoneNo('*Please enter valid Phone No');
  //   } else {
  //     setErrorPhoneNo(null);
  //   }
  // };

  const _validatePhoneNo = pno => {
    var pnoRegex = /^[0-9]{4,11}$/;
    if (pno == '' || pno == undefined || pno == null) {
      setErrorPhoneNo('*Please enter mobile number.');
    } else if (!pnoRegex.test(pno)) {
      setErrorPhoneNo('*Please Enter valid mobile number..');
    } else {
      setErrorPhoneNo(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (FirstName === '') {
      setErrorFirstName('* Please enter first name.');
      flag = false;
    }
    if (LastName === '') {
      setErrorLastName('* Please enter last name.');
      flag = false;
    }
    if (Email === '') {
      setErrorEmail('* Please enter Email address.');
      flag = false;
    }
    if (PhoneNo === '') {
      setErrorPhoneNo('* Please enter Phone address.');
      flag = false;
    }
  };

  const onSubmit = () => {
    if (validate()) {
    }
    viewProfiledetails();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const [filterdata, setFilterdata] = useState(CountryCode);

  const [countryCode, setcountryCode] = useState('+1');
  const [contrymodal, setcontrymodal] = useState(false);
  const [code, setCode] = React.useState('+91');
  const [isText, setIsText] = React.useState('');

  const SeacrFunct = value => {
    if (!value || value === '') {
      // console.log("DATADATA", D);
      setFilterdata(countryCode);
    } else {
      let mydata = filterdata.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      // console.log("newData--->", newData);
      setFilterdata(mydata);
      setIsText(value);
    }
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

  // useEffect(() => {
  //   viewProfiledetails();
  // }, []);
  //   email: Email,
  //   firstName: FirstName,
  //   imageUrl: urlImage,
  //   lastName: LastName,
  //   phoneNo: PhoneNo,
  //   countryCode: countryCodeValue,
  // }
  // url: `https://java-create-token.mobiloitte.org/account/profile-update`,

  // ******** profile details api   *************
  const viewProfiledetails = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token,======>>>> ', {
      email: Email,
      firstName: FirstName,
      imageUrl: urlImage,
      lastName: LastName,
      phoneNo: PhoneNo,
      countryCode: countryCodeValue,
    });

    axios({
      method: 'post',
      url: `https://java-create-token.mobiloitte.org/account/profile-update`,
      data: {
        address: 'string',
        city: 'string',
        country: 'string',
        countryCode: 'string',
        dob: 'string',
        email: Email,
        firstName: FirstName,
        gender: 'string',
        imageUrl: urlImage,
        lastName: LastName,
        phoneNo: PhoneNo,
        pnWithoutCountryCode: 'string',
        ssn: 'string',
        state: 'string',
        userName: 'vandana',
      },
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        alert('hello');
        if (res.status === 200) {
          console.log('Viewprofile -----details-------- >>>>>', res.data);
          props.navigation.navigate('myprofile', {
            firstName: FirstName,
            lastName: LastName,
            email: Email,
            phoneNo: PhoneNo,
            imageUrl: urlImage,
          });
          //  setUserProfile(res.data.data)
          //  console.log("userprofile2222----yash-->>>",userProfile);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch-vvvvvvvvvvvvvvvvv--->>>>', err));
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Header
              head={false}
              backImage={BackArrow}
              headerText2={'Edit Profile'}
              onPress2={() => props.navigation.goBack()}
            />
          </View>

          <View style={styles.imgView}>
            <Avatar
              rounded
              size={'xlarge'}
              source={{uri: filePath.uri}}
              style={{height: height / 5.5, width: width / 2.5}}>
              {/* <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        /> */}
              <Avatar.Accessory
                name="camera"
                type="ionicon"
                size={40}
                color="#517fa4"
                onPress={() => chooseFile('photo')}
                onChangeText={uri => {
                  setUrlImage(uri) === {uri: filePath.uri};
                  setUrlImage(filePath.uri);
                }}
              />
            </Avatar>
            {/* <Text>{filePath.uri}</Text> */}
          </View>

          <View style={styles.footer}>
            <View style={{height: height / 20, width: width}}></View>
            <View style={styles.titleStyle}>
              <View style={styles.titleStyle1}>
                <Text style={styles.txt}>First Name</Text>
              </View>
              <View style={styles.txtInputView}>
                <TextInput
                  placeholderTextColor="#9C9BA0"
                  placeholder="Yash"
                  style={styles.txtStyle}
                  onChangeText={txt => {
                    setFirstName(txt), _validateFirstName(txt);
                  }}
                />
              </View>
            </View>
            {errorFirstName != null ? (
              <AppView
                style={{
                  height: height * 0.02,
                  width: width * 1,
                }}>
                <AppText
                  style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
                  {errorFirstName}
                </AppText>
              </AppView>
            ) : null}
            <View style={styles.lst}>
              <View style={styles.lst1}>
                <Text style={styles.txt}>Last Name</Text>
              </View>
              <View style={styles.txtInputView1}>
                <TextInput
                  placeholderTextColor="#9C9BA0"
                  placeholder="Sharma"
                  style={styles.txtStyle}
                  onChangeText={txt => {
                    setLastName(txt), _validateLastName(txt);
                  }}
                />
              </View>
            </View>
            {errorLastName != null ? (
              <AppView
                style={{
                  height: height * 0.02,
                  width: width * 1,
                }}>
                <AppText
                  style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
                  {errorLastName}
                </AppText>
              </AppView>
            ) : null}
            <View style={styles.lst}>
              <View style={styles.email}>
                <Text style={styles.txt}>Email</Text>
              </View>
              <View style={styles.txtInputView1}>
                <TextInput
                  placeholderTextColor="#9C9BA0"
                  placeholder="re-yash@mobiloitte.com"
                  autoCapitalize="none"
                  style={styles.txtStyle}
                  onChangeText={txt => {
                    setEmail(txt), _validateEmail(txt);
                  }}
                />
              </View>
            </View>
            {errorEmail != null ? (
              <AppView
                style={{
                  height: height * 0.03,
                  width: width * 1,
                  // backgroundColor:"green"
                }}>
                <AppText
                  style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
                  {errorEmail}
                </AppText>
              </AppView>
            ) : null}
            <View style={styles.phnView1}>
              <View style={styles.phnView2}>
                <Text style={styles.txt}>Phone Number</Text>
                <View style={styles.enterView}>
                  <View style={styles.txt5}>
                    <Text
                      style={styles.passwordtextinput}
                      onPress={() => setcontrymodal(true)}>
                      {code}.
                    </Text>

                    {/* <Image
                      source={require("../../../assets/images/DownArrow.png")}
                      resizeMode="contain"
                      style={{
                        justifyContent: "center", //top:5
                      }}
                    /> */}
                  </View>
                  <View style={styles.phnView}>
                    <TextInput
                      placeholder="Enter Phone Number"
                      style={styles.txtStyle}
                      onChangeText={txt => {
                        setPhoneNo(txt), _validatePhoneNo(txt);
                      }}
                    />
                  </View>
                </View>
              </View>
              {errorPhoneNo != null ? (
                <AppView
                  style={{
                    height: height * 0.03,
                    width: width * 1,
                    // backgroundColor:"green"
                  }}>
                  <AppText
                    style={{
                      color: 'red',
                      fontSize: height / 60,
                      marginLeft: 17,
                    }}>
                    {errorPhoneNo}
                  </AppText>
                </AppView>
              ) : null}
            </View>

            <View style={styles.btnView1}>
              <TouchableOpacity onPress={() => onSubmit()}>
                <View style={styles.btnView}>
                  <Text
                    style={{
                      fontSize: height / 40,
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Confirm
                  </Text>
                  {/* <Button
                    onPress1={() => props.navigation.navigate("Home")}
                    buttonTitle="Submit"
                  /> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>

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
                style={{
                  height: height,
                  width: width,
                  backgroundColor: '#31005A',
                }}>
                <View
                  style={{
                    height: height / 15,
                    width: width / 1,
                    flexDirection: 'row',
                  }}>
                  <Header
                    head={false}
                    backImage={BackArrow}
                    headerText2="Select Country  Code"
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#E5E5E5',
  },
  imgView: {
    height: height / 4,
    width: width / 1,
    //   backgroundColor: "yellow",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    height: height / 10,
    backgroundColor: '#E5E5E5',
    width: width,
    alignItems: 'center',
  },
  footer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#ffffff',
    //  backgroundColor:"red",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  titleStyle: {
    height: height / 11,
    width: width / 1,
    //   backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle1: {
    height: height / 35,
    width: width / 1.18,
    // backgroundColor: "yellow",
    justifyContent: 'flex-end',
  },
  txt: {
    // fontFamily: "Roboto-Light",
    fontWeight: '400',
    // fontStyle: "normal",
    fontSize: height / 55,
    color: '#403B58',
  },
  txtInputView: {
    height: height / 18,
    width: width / 1.18,
    // backgroundColor: "aqua",
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
  },
  txtStyle: {
    // fontFamily: "Roboto-Light",
    fontWeight: '400',
    // fontStyle: "normal",
    fontSize: height / 55,
    color: 'black',
  },
  phnView: {
    borderBottomWidth: 0.5,
    left: 8,
    height: height / 20,
    width: width / 1.37,
    //  backgroundColor: "cyan",
    justifyContent: 'center',
  },
  btnView: {
    backgroundColor: '#47087B',
    height: height / 15,
    width: width / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnView1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height / 12,
    //  backgroundColor: "red",
    //top:50
  },
  lst: {
    height: height / 10,
    width: width / 1,
    //  backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  lst1: {
    height: height / 30,
    width: width / 1.18,
    // backgroundColor: "yellow",
    justifyContent: 'flex-end',
  },
  txtInputView1: {
    height: height / 18,
    width: width / 1.18,
    //   backgroundColor: "aqua",
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  email: {
    height: height / 30,
    width: width / 1.18,
    //    backgroundColor: "yellow",
    justifyContent: 'center',
  },
  phnView1: {
    height: height / 12,
    width: width / 1,
    // backgroundColor: "green",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  phnView2: {
    //  backgroundColor: "pink",
    height: height / 15,

    justifyContent: 'center',
    width: width / 1.18,
  },
  txt5: {
    flexDirection: 'row',
    width: width / 10,
    // backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  enterView: {
    flexDirection: 'row',
    width: width / 1.1,
    height: height / 20,
    // backgroundColor: "red",
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
  searchInput: {
    borderBottomWidth: 0.9,
    borderColor: '#CFD2D8',
    fontSize: 19,
    fontWeight: '600',
    // fontFamily: "TitilliumWeb-SemiBold",
    color: '#fff',
    padding: 10,
  },
  searchView: {
    height: '8%',
    width: width / 1.2,
    // marginVertical: "5%",
    marginHorizontal: '7%',
  },
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<2nd>>>>>>>>>>

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Dimensions,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   FlatList,
//   PermissionsAndroid,
// } from 'react-native';
// import {KeyboardAvoidingView} from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {AppView, AppText} from '../../components/Atom/atom';
// // import { Avatar } from "react-native-paper";
// import {Avatar, Icon} from 'react-native-elements';
// // import Header from "../../../components/Molecules/Header";
// import {BackArrow, UserIconOne, lion} from '../../assets/icon';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import Header from '../../components/molecules/Header';
// const {height, width} = Dimensions.get('screen');
// import {CountryCode} from '../CountryCode';

// const EditProfile = props => {
//   console.log('urlImage', urlImage);
//   const [filePath, setFilePath] = useState({});
//   const [address, setAddress] = useState();
//   const [countryCodeValue, setCountryCodeValue] = useState();

//   const [urlImage, setUrlImage] = useState();

//   const [FirstName, setFirstName] = useState('');
//   const [checkFirstName, setCheckFirstName] = useState(true);
//   const [errorFirstName, setErrorFirstName] = useState(null);

//   const [LastName, setLastName] = useState('');
//   const [checkLastName, setCheckLastName] = useState(true);
//   const [errorLastName, setErrorLastName] = useState(null);

//   const [Email, setEmail] = useState('');
//   const [checkEmail, setCheckEmail] = useState(true);
//   const [errorEmail, setErrorEmail] = useState(null);

//   const [PhoneNo, setPhoneNo] = useState('');
//   const [checkPhoneNo, setCheckPhoneNo] = useState(true);
//   const [errorPhoneNo, setErrorPhoneNo] = useState(null);

//   const _validateFirstName = fname => {
//     var fnameRegex = /^[a-z A-Z]{3,32}$/i;
//     var fname = fname.trim();
//     if (fname == '' || fname == undefined || fname == null) {
//       setErrorFirstName('* Please enter first name.');
//     } else if (!fnameRegex.test(fname)) {
//       setErrorFirstName('* Please enter valid first name.');
//     } else {
//       setErrorFirstName(null);
//     }
//   };

//   const _validateLastName = lname => {
//     var lnameRegex = /^[a-z A-Z ]{3,32}$/i;
//     var lname = lname.trim();
//     if (lname == '' || lname == undefined || lname == null) {
//       setErrorLastName('* Please enter last name.');
//     } else if (!lnameRegex.test(lname)) {
//       setErrorLastName('* Please enter valid last name.');
//     } else {
//       setErrorLastName(null);
//     }
//   };

//   const _validateEmail = address => {
//     var addressRegex =
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     address = address.trim();
//     if (address == '' || address == undefined || address == null) {
//       setErrorEmail('* Please enter address.');
//     } else if (!addressRegex.test(address)) {
//       setErrorEmail('* Please enter valid address.');
//     } else {
//       setErrorEmail(null);
//     }
//   };

//   const _validatePhoneNo = pno => {
//     var pnoRegex = /^[0-9]$/i;
//     var pno = pno.trim();
//     if (pno == '' || pno == undefined || pno == null) {
//       setErrorLastName('* Please enter Phone No');
//     } else if (!pnoRegex.test(pno)) {
//       setErrorLastName('* Please enter valid Phone No');
//     } else {
//       setErrorLastName(null);
//     }
//   };

//   const validate = () => {
//     let flag = true;
//     if (FirstName === '') {
//       setErrorFirstName('* Please enter first name.');
//       flag = false;
//     }
//     if (LastName === '') {
//       setErrorLastName('* Please enter last name.');
//       flag = false;
//     }
//     if (Email === '') {
//       setErrorEmail('* Please enter Email address.');
//       flag = false;
//     }
//     if (PhoneNo === '') {
//       setErrorPhoneNo('* Please enter Phone address.');
//       flag = false;
//     }
//   };

//   const onSubmit = () => {
//     if (validate()) {
//     }
//     viewProfiledetails();
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs camera permission',
//           },
//         );
//         // If CAMERA Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else return true;
//   };

//   const requestExternalWritePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'External Storage Write Permission',
//             message: 'App needs write permission',
//           },
//         );
//         // If WRITE_EXTERNAL_STORAGE Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         alert('Write permission err', err);
//       }
//       return false;
//     } else return true;
//   };

//   const captureImage = async type => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//       videoQuality: 'low',
//       durationLimit: 30, //Video max duration in seconds
//       saveToPhotos: true,
//     };
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchCamera(options, response => {
//         console.log('Response = ', response);

//         if (response.didCancel) {
//           alert('User cancelled camera picker');
//           return;
//         } else if (response.errorCode == 'camera_unavailable') {
//           alert('Camera not available on device');
//           return;
//         } else if (response.errorCode == 'permission') {
//           alert('Permission not satisfied');
//           return;
//         } else if (response.errorCode == 'others') {
//           alert(response.errorMessage);
//           return;
//         }
//         console.log('base64 -> ', response.base64);
//         console.log('uri -> ', response.uri);
//         console.log('width -> ', response.width);
//         console.log('height -> ', response.height);
//         console.log('fileSize -> ', response.fileSize);
//         console.log('type -> ', response.type);
//         console.log('fileName -> ', response.fileName);
//         setFilePath(response);
//       });
//     }
//   };

//   const chooseFile = type => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//     };
//     launchImageLibrary(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       console.log('base64 -> ', response.base64);
//       console.log('uri -> ', response.uri);
//       console.log('width -> ', response.width);
//       console.log('height -> ', response.height);
//       console.log('fileSize -> ', response.fileSize);
//       console.log('type -> ', response.type);
//       console.log('fileName -> ', response.fileName);
//       setFilePath(response);
//     });
//   };

//   const [filterdata, setFilterdata] = useState(CountryCode);

//   const [countryCode, setcountryCode] = useState('+1');
//   const [contrymodal, setcontrymodal] = useState(false);
//   const [code, setCode] = React.useState('+91');
//   const [isText, setIsText] = React.useState('');

//   const SeacrFunct = value => {
//     if (!value || value === '') {
//       // console.log("DATADATA", D);
//       setFilterdata(countryCode);
//     } else {
//       let mydata = filterdata.filter(item =>
//         item.label.toLowerCase().includes(value.toLowerCase()),
//       );
//       // console.log("newData--->", newData);
//       setFilterdata(mydata);
//       setIsText(value);
//     }
//   };

//   const renderItem = ({item}) => (
//     <Item name={item.label} dialCode={item.value} icon={item.icon} />
//   );

//   const Item = ({name, dialCode, icon}) => (
//     <TouchableOpacity
//       key={String(name)}
//       // onPress={() => props.props.navigation.navigate('PhoneNumberVerification', { dialCode: dialCode, icon: icon, name: name })}
//       onPress={() => {
//         setCode(dialCode);
//         setcontrymodal(!contrymodal);
//       }}>
//       <View style={styles.item}>
//         <Image source={icon} style={styles.image2} resizeMode="cover" />
//         <Text style={styles.nameText}>{name}</Text>
//         <Text style={styles.dialcodeText}>{dialCode}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // useEffect(() => {
//   //   viewProfiledetails();
//   // }, []);

//   // ******** profile details api   *************
//   const viewProfiledetails = async () => {
//     const value = await AsyncStorage.getItem('token');
//     console.log('====== my token======>>>>', value);

//     axios({
//       method: 'post',
//       url: `https://java-create-token.mobiloitte.org/account/profile-update`,
//       data: {
//         email: Email,
//         firstName: FirstName,
//         imageUrl: urlImage,
//         lastName: LastName,
//         phoneNo: PhoneNo,
//         countryCode: countryCodeValue,
//       },
//       headers: {
//         Authorization: `Bearer ${value}`,
//         'content-type': 'application/json',
//       },
//     })
//       .then(res => {
//         // alert("hello")
//         if (res.status === 200) {
//           console.log('Viewprofile -----details-------- >>>>>', res.data);
//           props.navigation.navigate('myprofile', {
//             firstName: FirstName,
//             lastName: LastName,
//             email: Email,
//             phoneNo: PhoneNo,
//             imageUrl: urlImage,
//           });
//           //  setUserProfile(res.data.data)
//           //  console.log("userprofile2222----yash-->>>",userProfile);
//         } else {
//           alert('Something went wrong');
//         }
//       })
//       .catch(err => console.log('error catch---->>>>', err));
//   };

//   return (
//     <SafeAreaView>
//       <KeyboardAwareScrollView>
//         <View style={styles.mainContainer}>
//           <View style={styles.header}>
//             <Header
//               head={false}
//               backImage={BackArrow}
//               headerText2={'Edit Profile'}
//               onPress2={() => props.navigation.goBack()}
//             />
//           </View>

//           <View style={styles.imgView}>
//             <Avatar
//               rounded
//               size={'xlarge'}
//               source={{uri: filePath.uri}}
//               style={{height: height / 5.5, width: width / 2.5}}>
//               {/* <Image
//           source={{uri: filePath.uri}}
//           style={styles.imageStyle}
//         /> */}
//               <Avatar.Accessory
//                 name="camera"
//                 type="ionicon"
//                 size={40}
//                 color="#517fa4"
//                 onPress={() => chooseFile('photo')}
//                 onChangeText={uri => {
//                   setUrlImage(uri) === {uri: filePath.uri};
//                   setUrlImage(filePath.uri);
//                 }}
//               />
//             </Avatar>
//             {/* <Text>{filePath.uri}</Text> */}
//           </View>

//           <View style={styles.footer}>
//             <View style={{height: height / 20, width: width}}></View>
//             <View style={styles.titleStyle}>
//               <View style={styles.titleStyle1}>
//                 <Text style={styles.txt}>First Name</Text>
//               </View>
//               <View style={styles.txtInputView}>
//                 <TextInput
//                   placeholderTextColor="#9C9BA0"
//                   placeholder="Yash"
//                   style={styles.txtStyle}
//                   onChangeText={txt => {
//                     setFirstName(txt), _validateFirstName(txt);
//                   }}
//                 />
//               </View>
//             </View>
//             {errorFirstName != null ? (
//               <AppView
//                 style={{
//                   height: height * 0.02,
//                   width: width * 1,
//                 }}>
//                 <AppText
//                   style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
//                   {errorFirstName}
//                 </AppText>
//               </AppView>
//             ) : null}
//             <View style={styles.lst}>
//               <View style={styles.lst1}>
//                 <Text style={styles.txt}>Last Name</Text>
//               </View>
//               <View style={styles.txtInputView1}>
//                 <TextInput
//                   placeholderTextColor="#9C9BA0"
//                   placeholder="Sharma"
//                   style={styles.txtStyle}
//                   onChangeText={txt => {
//                     setLastName(txt), _validateLastName(txt);
//                   }}
//                 />
//               </View>
//             </View>
//             {errorLastName != null ? (
//               <AppView
//                 style={{
//                   height: height * 0.02,
//                   width: width * 1,
//                 }}>
//                 <AppText
//                   style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
//                   {errorLastName}
//                 </AppText>
//               </AppView>
//             ) : null}
//             <View style={styles.lst}>
//               <View style={styles.email}>
//                 <Text style={styles.txt}>Email</Text>
//               </View>
//               <View style={styles.txtInputView1}>
//                 <TextInput
//                   placeholderTextColor="#9C9BA0"
//                   placeholder="re-yash@mobiloitte.com"
//                   autoCapitalize="none"
//                   style={styles.txtStyle}
//                   onChangeText={txt => {
//                     setEmail(txt), _validateEmail(txt);
//                   }}
//                 />
//               </View>
//             </View>
//             {errorEmail != null ? (
//               <AppView
//                 style={{
//                   height: height * 0.03,
//                   width: width * 1,
//                   // backgroundColor:"green"
//                 }}>
//                 <AppText
//                   style={{color: 'red', fontSize: height / 60, marginLeft: 17}}>
//                   {errorEmail}
//                 </AppText>
//               </AppView>
//             ) : null}
//             <View style={styles.phnView1}>
//               <View style={styles.phnView2}>
//                 <Text style={styles.txt}>Phone Number</Text>
//                 <View style={styles.enterView}>
//                   <View style={styles.txt5}>
//                     <Text
//                       style={styles.passwordtextinput}
//                       onPress={() => setcontrymodal(true)}>
//                       {code}
//                     </Text>

//                     {/* <Image
//                       source={require("../../../assets/images/DownArrow.png")}
//                       resizeMode="contain"
//                       style={{
//                         justifyContent: "center", //top:5
//                       }}
//                     /> */}
//                   </View>
//                   <View style={styles.phnView}>
//                     <TextInput
//                       placeholder="Enter Phone Number"
//                       style={styles.txtStyle}
//                       onChangeText={txt => {
//                         setPhoneNo(txt), _validatePhoneNo(txt);
//                       }}
//                     />
//                   </View>
//                 </View>
//               </View>
//               {errorPhoneNo != null ? (
//                 <AppView
//                   style={{
//                     height: height * 0.03,
//                     width: width * 1,
//                     // backgroundColor:"green"
//                   }}>
//                   <AppText
//                     style={{
//                       color: 'red',
//                       fontSize: height / 60,
//                       marginLeft: 17,
//                     }}>
//                     {errorPhoneNo}
//                   </AppText>
//                 </AppView>
//               ) : null}
//             </View>

//             <View style={styles.btnView1}>
//               <TouchableOpacity onPress={() => onSubmit()}>
//                 <View style={styles.btnView}>
//                   <Text
//                     style={{
//                       fontSize: height / 40,
//                       color: 'white',
//                       fontWeight: '700',
//                     }}>
//                     Confirm
//                   </Text>
//                   {/* <Button
//                     onPress1={() => props.navigation.navigate("Home")}
//                     buttonTitle="Submit"
//                   /> */}
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={contrymodal}
//             onRequestClose={() => {
//               Alert.alert('Modal has been closed.');
//               setcontrymodal(!contrymodal);
//             }}>
//             <SafeAreaView style={{flex: 1}} />

//             <KeyboardAvoidingView
//               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//               style={{}}>
//               <View
//                 style={{
//                   height: height,
//                   width: width,
//                   backgroundColor: '#31005A',
//                 }}>
//                 <View
//                   style={{
//                     height: height / 15,
//                     width: width / 1,
//                     flexDirection: 'row',
//                   }}>
//                   <Header
//                     head={false}
//                     backImage={BackArrow}
//                     headerText2="Select Country  Code"
//                     onPress2={() => props.navigation.goBack()}
//                   />
//                 </View>

//                 <View style={styles.searchView}>
//                   <TextInput
//                     value={isText}
//                     style={styles.searchInput}
//                     placeholder="Search by country and dialing code"
//                     onChangeText={text => {
//                       setIsText(text);
//                       SeacrFunct(text);
//                     }}
//                     placeholderTextColor="#B5BBC9"></TextInput>
//                 </View>

//                 <View style={{height: '80%', width: width}}>
//                   <FlatList
//                     data={filterdata}
//                     renderItem={renderItem}
//                     showsVerticalScrollIndicator={false}
//                     keyExtractor={item => item.value}
//                   />
//                 </View>
//                 <View
//                   style={{
//                     justifyContent: 'flex-start',
//                     alignItems: 'flex-start',
//                     height: '10%',
//                     position: 'absolute',
//                     bottom: Platform.OS === 'ios' ? 20 : 0,
//                     width: width,
//                   }}>
//                   {/* <Pressable
//                 style={[{ alignSelf: 'center' }, styles.button, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text style={[styles.textStyle], { color: "#fff", }}>Close</Text>
//               </Pressable> */}
//                 </View>
//               </View>
//             </KeyboardAvoidingView>
//           </Modal>
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default EditProfile;

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: height / 1,
//     width: width / 1,
//     backgroundColor: '#E5E5E5',
//   },
//   imgView: {
//     height: height / 4,
//     width: width / 1,
//     //   backgroundColor: "yellow",
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   header: {
//     height: height / 10,
//     backgroundColor: '#E5E5E5',
//     width: width,
//     alignItems: 'center',
//   },
//   footer: {
//     height: height / 1,
//     width: width / 1,
//     backgroundColor: '#ffffff',
//     //  backgroundColor:"red",
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   },
//   titleStyle: {
//     height: height / 11,
//     width: width / 1,
//     //   backgroundColor: "red",
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleStyle1: {
//     height: height / 35,
//     width: width / 1.18,
//     // backgroundColor: "yellow",
//     justifyContent: 'flex-end',
//   },
//   txt: {
//     // fontFamily: "Roboto-Light",
//     fontWeight: '400',
//     // fontStyle: "normal",
//     fontSize: height / 55,
//     color: '#403B58',
//   },
//   txtInputView: {
//     height: height / 18,
//     width: width / 1.18,
//     // backgroundColor: "aqua",
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     borderBottomWidth: 0.5,
//   },
//   txtStyle: {
//     // fontFamily: "Roboto-Light",
//     fontWeight: '400',
//     // fontStyle: "normal",
//     fontSize: height / 55,
//     color: 'black',
//   },
//   phnView: {
//     borderBottomWidth: 0.5,
//     left: 8,
//     height: height / 20,
//     width: width / 1.37,
//     //  backgroundColor: "cyan",
//     justifyContent: 'center',
//   },
//   btnView: {
//     backgroundColor: '#47087B',
//     height: height / 15,
//     width: width / 1.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//   },
//   btnView1: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: width,
//     height: height / 12,
//     //  backgroundColor: "red",
//     //top:50
//   },
//   lst: {
//     height: height / 10,
//     width: width / 1,
//     //  backgroundColor: "red",
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lst1: {
//     height: height / 30,
//     width: width / 1.18,
//     // backgroundColor: "yellow",
//     justifyContent: 'flex-end',
//   },
//   txtInputView1: {
//     height: height / 18,
//     width: width / 1.18,
//     //   backgroundColor: "aqua",
//     justifyContent: 'center',
//     borderBottomWidth: 0.5,
//   },
//   email: {
//     height: height / 30,
//     width: width / 1.18,
//     //    backgroundColor: "yellow",
//     justifyContent: 'center',
//   },
//   phnView1: {
//     height: height / 12,
//     width: width / 1,
//     // backgroundColor: "green",
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   phnView2: {
//     //  backgroundColor: "pink",
//     height: height / 15,

//     justifyContent: 'center',
//     width: width / 1.18,
//   },
//   txt5: {
//     flexDirection: 'row',
//     width: width / 10,
//     // backgroundColor: "green",
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 0.5,
//   },
//   enterView: {
//     flexDirection: 'row',
//     width: width / 1.1,
//     height: height / 20,
//     // backgroundColor: "red",
//   },
//   item: {
//     // marginHorizontal: '10%',
//     marginVertical: '3%',
//     // justifyContent: 'center',
//     width: width / 1.1,
//     alignSelf: 'center',
//     flexDirection: 'row',
//   },
//   nameText: {
//     fontSize: height / 50,
//     alignSelf: 'center',
//     marginLeft: 15,
//     color: '#fff',
//     width: width / 1.7,
//   },
//   image2: {
//     height: height / 20,
//     width: height / 20,
//     borderRadius: height / 40,
//   },
//   dialcodeText: {
//     fontSize: height / 50,
//     alignSelf: 'center',
//     marginLeft: height / 70,
//     color: '#fff',
//   },
//   sliceText: {},
//   searchInput: {
//     borderBottomWidth: 0.9,
//     borderColor: '#CFD2D8',
//     fontSize: 19,
//     fontWeight: '600',
//     // fontFamily: "TitilliumWeb-SemiBold",
//     color: '#fff',
//     padding: 10,
//   },
//   searchView: {
//     height: '8%',
//     width: width / 1.2,
//     // marginVertical: "5%",
//     marginHorizontal: '7%',
//   },
// });

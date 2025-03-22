import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
} from 'react-native-image-picker';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import {BackArrow} from '../../assets/icon';
const {height, width} = Dimensions.get('window');
import axios from 'axios';

const TestingFile = props => {
  console.log('====KycFrontScreen====>>>>', props.route.params);
  const [filePath, setFilePath] = useState([]);
  const [testImage, settestImage] = useState('');

  const formData = new FormData();
  formData.append(
    'file',
    filePath.uri,
    // {
    // uri:
    //   Platform.OS == 'ios' ? filePath.uri.replace('file://') : filePath.uri,
    // type: filePath.type,
    // name: filePath.fileName,
    // }
  );

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
      // videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
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
        props.navigation.navigate('BackKyc', {
          nationalId: props.route.params.nationalId,
          passport: props.route.params.passport,
          driverLicence: props.route.params.driverLicence,
          others: props.route.params.others,
          firstName: props.route.params.firstName,
          lastName: props.route.params.lastName,
          address: props.route.params.address,
          city: props.route.params.city,
          zip: props.route.params.zip,
          citizenship: props.route.params.citizenship,
          file: filePath.uri
        })
      });
    }
  };
  console.log('*******InitialFilePathAfterSet*********', filePath);

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

  const fatchresponce = async () => {
    console.log('URL--->>>', filePath);
    // const formData = new FormData();
    // formData.append('file', {
    //   uri:
    //     Platform.OS == 'ios' ? filePath.uri.replace('file://') : filePath.uri,
    //   type: filePath.type,
    //   name: filePath.fileName,
    // });
    // var requestOptions = {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // };

    // fetch('http://182.72.203.247:4094/account/upload-file', requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error===>>>', Object.keys(error)));
    // console.log('+++++++++', formData);
    axios({
      method: 'post',
      url:'https://java-create-token.mobiloitte.org/account/upload-file',
    
      data: formData,
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log('res', res.status);
        if (res.status === 200) {
          // props.navigation.navigate('BackKyc', {file: filePath.uri});
          props.navigation.navigate('BackKyc', {
            nationalId: props.route.params.nationalId,
            passport: props.route.params.passport,
            driverLicence: props.route.params.driverLicence,
            others: props.route.params.others,
            firstName: props.route.params.firstName,
            lastName: props.route.params.lastName,
            address: props.route.params.address,
            city: props.route.params.city,
            zip: props.route.params.zip,
            citizenship: props.route.params.citizenship,
            file: filePath
          });
          // alert('Done')
        } else {
          alert('some thing went wrong.');
        }
      })
      .catch(err => console.log('catch err-->>>', err));
   
  };

  const Submit = async () => {
    fatchresponce();
  };

  return (
    <View style={styles.container}>
      <AppView style={styles.blankConatiner}>
        <AppView style={styles.arrowBackView}>
          <AppTouchable
            onPress={() =>
              props.navigation.navigate('KycDocumentVerification')
            }>
             <AppImage resizemode="contain" source={BackArrow} style={{marginLeft: 15,tintColor:"white",height:height/40,width:width/20}} />
          </AppTouchable>
        </AppView>
        <AppView style={styles.headingContainer}>
          <AppText style={{color: 'rgb(255,255,255)', fontSize:height/30}}>
            KYC
          </AppText>
        </AppView>
      </AppView>

      <AppView style={styles.sectionTwoContainer}>
        <AppView style={styles.passHeadView}>
          <AppText style={styles.txtForgotHead}>Scan Front Side</AppText>
        </AppView>

        <View style={styles.container2}>
          <View
            style={{
              height: height * 0.55,
              width: width * 0.95,
              alignItems: 'center',
            }}>
            <Image source={{uri: filePath.uri}} style={styles.imgeStyle} />
          </View>
          {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
        </View>

        <AppView style={[styles.btnmainoneView]}>
          <AppView style={[styles.btnContainer, {flexDirection: 'row'}]}>
            <AppTouchable
              style={styles.btnTouchView}
              onPress={() => captureImage('photo')}
              // onPress={() => chooseFile('photo')}
              onLongPress={Submit}>
              {/* onLongPress={() => captureImage('photo')}> */}
              <AppText style={styles.resetTxtView}>Scan Now</AppText>
            </AppTouchable>

            <AppTouchable
              style={styles.btnTouchView}
              onPress={() => props.navigation.navigate('BackKyc')}
              // onPress={() => props.navigation.navigate('BackKyc', {
              //   nationalId: props.route.params.nationalId,
              //   passport: props.route.params.passport,
              //   driverLicence: props.route.params.driverLicence,
              //   others: props.route.params.others,
              //   firstName: props.route.params.firstName,
              //   lastName: props.route.params.lastName,
              //   address: props.route.params.address,
              //   city: props.route.params.city,
              //   zip: props.route.params.zip,
              //   citizenship: props.route.params.citizenship,
              //   file: filePath.uri
              // })}
              >
              <AppText style={styles.resetTxtView}>Next</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
    </View>
  );
};

export default TestingFile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: height * 0.12,
    width: width * 0.3,
    justifyContent: 'center',
    top: 10,
    position: 'relative',
  },
  headingContainer: {
    height: height * 0.12,
    width: width * 0.7,
    justifyContent: 'center',
    // alignItems: 'flex-start',
    left: 60,
    top: 10,
    position: 'relative',
  },
  sectionTwoContainer: {
    // height: height * 0.88,
    height: height * 0.88,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  passHeadView: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  txtForgotHead: {
    color: 'rgb(23,23,23)',
    fontSize:height/35,
    marginLeft: 20,
  },

  btnContainer: {
    height: height * 0.05,
    width: width * 1,
    // justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    // bottom: 50,
    position: 'absolute',
  },
  btnTouchView: {
    height: height * 0.07,
    width: width * 0.35,
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
  container2: {
    height: height * 0.64,
    width: width * 0.95,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  btnmainoneView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.15,
    width: width * 1,
  },
  // imgPathView: {
  //   height: height * 0.4,
  //   width: width * 0.95,
  // },
  imgeStyle: {
    width: width * 0.9,
    height: height * 0.3,
    marginTop: 40,
    borderRadius: 10,
  },
});

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
  console.log('====KycBackScreen====>>>>', props.route.params);
  const [filePath, setFilePath] = useState([]);
  const [testImage, settestImage] = useState('');

  const formData = new FormData();
  formData.append('file', filePath.uri);

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
        props.navigation.navigate('KycRegisteredPromptScreen')
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

  const fatchresponce = async () => {
    // console.log('testimage---->>>>', testImage);
    console.log('url--->>>', filePath.uri);
    axios({
      method: 'post',
      // url: 'http://182.72.203.247:4094/account/upload-file',
      url:'https://java-create-token.mobiloitte.org/account/upload-file',
      body: {
        file: filePath.uri,
      },
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log('res', res.status);
        if (res.status === 200) {
          // props.navigation.navigate('BackKyc', {file: filePath.uri});
          console.log("gsfjhagdf",{file: filePath.uri});
          props.navigation.navigate('KycRegisteredPromptScreen');
        } else {
          alert('some thing went wrong.');
        }
      })
      .catch(err => console.log('catch err-->>>', err));
    // props.navigation.navigate('KycRegisteredPromptScreen');
  };

  const Submit = async () => {
    fatchresponce();
  };

  return (
    <View style={styles.container}>
      <AppView style={styles.blankConatiner}>
        <AppView style={styles.arrowBackView}>
          <AppTouchable onPress={() => props.navigation.navigate('KycFront')}>
          <AppImage resizemode="contain" source={BackArrow} style={{marginLeft: 15,tintColor:"white",height:height/40,width:width/20}} />      
              </AppTouchable>
        </AppView>
        <AppView style={styles.headingContainer}>
          <AppText style={{color: 'rgb(255,255,255)', fontSize: 24}}>
            KYC
          </AppText>
        </AppView>
      </AppView>

      <AppView style={styles.sectionTwoContainer}>
        <AppView style={styles.passHeadView}>
          <AppText style={styles.txtForgotHead}>Scan Back Side</AppText>
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
              {/* //  onLongPress={() => captureImage('photo')}>  */}
              <AppText style={styles.resetTxtView}>Scan Now</AppText>
            </AppTouchable>

            <AppTouchable
              style={styles.btnTouchView}
              onPress={() =>
                props.navigation.navigate('KycRegisteredPromptScreen')
              }>
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
    fontSize: height/35,
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
    // backgroundColor: 'red',
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

// KYC BACK ORIGINAL CODE BELOW

// import React, {Component} from 'react';
// import {
//   Alert,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   Dimensions,
//   View,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import {
//   AppText,
//   AppView,
//   AppImage,
//   AppTouchable,
// } from '../../components/Atom/atom';
// import {ArrowBackGreen} from '../../assets/icon';
// const {height, width} = Dimensions.get('window');
// import axios from 'axios';

// export default class KycFrontScan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       images: null,
//       frontImage: null,
//     };
//   }

//   _apis = () => {
//     alert('fgdhgfjhj,hkhj');
//     // axios({
//     //   method: 'post',
//     //   url: 'http://172.16.0.230:4094/account/upload-file',
//     //   data: {
//     //     file: image.uri,
//     //   },
//     //   headers: {
//     //     Accept: 'application/json',
//     //     'Content-Type': 'application/json',
//     //   },
//     // })
//     //   .then(res => {
//     //     console.log('res', res.data);

//     //     if (res.data.responseCode === 200) {
//     //       alert('Success...');
//     //       // props.navigation.navigate('KycServiceProvider');
//     //       ToastAndroid.show('Successfully Updated', ToastAndroid.LONG);
//     //     } else {
//     //       alert('some thing went wrong.');
//     //     }
//     //   })
//     //   .catch(err => console.log('err', err));
//   };
//   componentDidMount() {
//     this.setState({
//       frontImage: this.props.route.params.image,
//     });
//   }

//   pickSingleWithCamera(cropping, mediaType = 'photo') {
//     ImagePicker.openCamera({
//       cropping: cropping,
//       width: 550,
//       height: 600,
//       includeExif: true,
//       mediaType,
//     })
//       .then(image => {
//         console.log('received image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//         this.props.navigation.navigate('KycRegisteredPromptScreen');
//       })
//       .catch(e => alert(e));
//   }

//   pickSingleBase64(cropit) {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       includeBase64: true,
//       includeExif: true,
//     })
//       .then(image => {
//         console.log('received base64 image');
//         this.setState({
//           image: {
//             uri: `data:${image.mime};base64,` + image.data,
//             width: image.width,
//             height: image.height,
//           },
//           images: null,
//         });
//       })
//       .catch(e => alert(e));
//   }

//   cleanupImages() {
//     ImagePicker.clean()
//       .then(() => {
//         console.log('removed tmp images from tmp directory');
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   cleanupSingleImage() {
//     let image =
//       this.state.image ||
//       (this.state.images && this.state.images.length
//         ? this.state.images[0]
//         : null);
//     console.log('will cleanup image', image);

//     ImagePicker.cleanSingle(image ? image.uri : null)
//       .then(() => {
//         console.log(`removed tmp image ${image.uri} from tmp directory`);
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   cropLast() {
//     if (!this.state.image) {
//       return Alert.alert(
//         'No image',
//         'Before open cropping only, please select image',
//       );
//     }

//     ImagePicker.openCropper({
//       path: this.state.image.uri,
//       width: 200,
//       height: 200,
//     })
//       .then(image => {
//         console.log('received cropped image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }

//   pickSingle(cropit, circular = false, mediaType) {
//     ImagePicker.openPicker({
//       width: 500,
//       height: 500,
//       cropping: cropit,
//       cropperCircleOverlay: circular,
//       sortOrder: 'none',
//       compressImageMaxWidth: 1000,
//       compressImageMaxHeight: 1000,
//       compressImageQuality: 1,
//       // compressVideoPreset: 'MediumQuality',
//       includeExif: true,
//       cropperStatusBarColor: 'white',
//       cropperToolbarColor: 'white',
//       cropperActiveWidgetColor: 'white',
//       cropperToolbarWidgetColor: '#3498DB',
//     })
//       .then(image => {
//         console.log('received image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }

//   pickMultiple() {
//     ImagePicker.openPicker({
//       multiple: true,
//       waitAnimationEnd: false,
//       sortOrder: 'desc',
//       includeExif: true,
//       forceJpg: true,
//     })
//       .then(images => {
//         this.setState({
//           image: null,
//           images: images.map(i => {
//             console.log('received image', i);
//             return {
//               uri: i.path,
//               width: i.width,
//               height: i.height,
//               mime: i.mime,
//             };
//           }),
//         });
//       })
//       .catch(e => alert(e));
//   }

//   scaledHeight(oldW, oldH, newW) {
//     return (oldH / oldW) * newW;
//   }

//   renderImage(image) {
//     return (
//       <Image
//         style={{width: 300, height: 300, resizeMode: 'contain'}}
//         source={image}
//       />
//     );
//   }

//   renderAsset(image) {
//     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//       return this.renderVideo(image);
//     }

//     return this.renderImage(image);
//   }

//   render() {
//     return (
//       <SafeAreaView backgroundColor="#7A25CE">
//         <AppView style={styles.container}>
//           <AppView style={styles.blankConatiner}>
//             <AppView style={styles.arrowBackView}>
//               <AppTouchable
//                 onPress={() => this.props.navigation.navigate('KycFront')}>
//                 <AppImage source={ArrowBackGreen} style={{marginLeft: 15}} />
//               </AppTouchable>
//             </AppView>
//             <AppView style={styles.headingContainer}>
//               <AppText style={{color: 'rgb(255,255,255)', fontSize: 24}}>
//                 KYC
//               </AppText>
//             </AppView>
//           </AppView>
//           <AppView style={styles.sectionTwoContainer}>
//             <AppView style={styles.passHeadView}>
//               <AppText style={styles.txtForgotHead}>Scan Back Side</AppText>
//             </AppView>
//             <ScrollView>
//               {this.state.image ? this.renderAsset(this.state.image) : null}
//               {this.state.images
//                 ? this.state.images.map(i => (
//                     <View key={i.uri}>{this.renderAsset(i)}</View>
//                   ))
//                 : null}
//             </ScrollView>

//             <TouchableOpacity
//               onPress={() => this.pickSingleWithCamera(false)}
//               style={{}}>
//               {/* <Text style={styles.text}>Select Single Image With Camera</Text> */}
//             </TouchableOpacity>

//             {/* <AppView style={styles.btnContainer}>
//               <AppTouchable
//                 style={styles.btnTouchView}
//                 onPress={() => {
//                   this.state.image
//                     ? this._apis
//                     : this.pickSingleWithCamera(false);
//                 }}>
//                 {/* onPress={() => this.pickSingleWithCamera(false)}>
//                 <AppText style={styles.resetTxtView}>
//                   {this.state.image ? 'Submit' : 'Scan Now'}
//                 </AppText>
//               </AppTouchable>
//             </AppView> */}
//             <AppView style={styles.btnContainer}>
//               <AppTouchable
//                 style={styles.btnTouchView}
//                 // onPress={() => this.props.navigation.navigate('BackKyc')}
//                 onPress={() => this.pickSingleWithCamera(false)}>
//                 <AppText style={styles.resetTxtView}>Scan Now</AppText>
//               </AppTouchable>
//             </AppView>
//           </AppView>
//         </AppView>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: height * 1,
//     width: width * 1,
//     backgroundColor: '#7A25CE',
//     marginTop: 18,
//   },
//   button: {
//     backgroundColor: 'blue',
//     marginBottom: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//   },
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
//     // alignItems: 'flex-start',
//     left: 60,
//     top: 10,
//     position: 'relative',
//   },
//   sectionTwoContainer: {
//     // height: height * 0.88,
//     height: height * 0.86,
//     width: width * 1,
//     backgroundColor: 'rgb(255,255,255)',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   enterCodeView: {
//     height: height * 0.07,
//     width: width * 1,
//     justifyContent: 'center',
//   },
//   passHeadView: {
//     height: height * 0.1,
//     width: width * 1,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'red',
//     alignItems: 'center',
//   },
//   txtForgotHead: {
//     color: 'rgb(23,23,23)',
//     fontSize: 20,
//     marginLeft: 20,
//   },
//   paraContainer: {
//     height: height * 0.15,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paraTxtView: {
//     color: 'rgb(112,112,112)',
//     fontSize: 16,
//   },
//   maininput: {
//     height: height * 0.07,
//     width: width * 0.9,
//     borderRadius: 10,
//     borderWidth: 0.7,
//     marginTop: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//   },
//   maininputID: {
//     height: height * 0.07,
//     width: width * 0.9,
//     borderRadius: 10,
//     borderWidth: 0.7,
//     marginTop: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgb(94,28,159)',
//   },
//   emailConatinerView: {
//     color: 'rgb(0,0,0)',
//     fontSize: 15,
//     marginLeft: 15,
//     top: 5,
//   },
//   btnContainer: {
//     height: height * 0.1,
//     width: width * 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: 50,
//     position: 'absolute',
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
//     fontSize: height / 45,
//     color: 'black',
//     marginLeft: 15,
//   },
//   placeholderContainer: {
//     height: height * 0.42,
//     width: width * 1,
//     alignItems: 'center',
//   },
//   textinputemail: {
//     fontSize: height / 45,
//     color: 'black',
//     marginLeft: 15,
//   },
//   inptTxtField: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   nationalTxt: {
//     color: 'rgb(22,22,22)',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   nationalTxt2: {
//     color: 'rgb(255,255,255)',
//     fontSize: 18,
//     fontWeight: '600',
//   },
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
//     height: height * 0.06,
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

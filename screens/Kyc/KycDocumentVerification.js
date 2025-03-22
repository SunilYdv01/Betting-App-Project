import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, FlatList} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import {BackArrow} from '../../assets/icon';
const {height, width} = Dimensions.get('window');

const KycDocumentVerification = props => {
  console.log('====DocumentVerificationScreen====>>>>', props.route.params);

  const [arrData, setArrData] = useState([
    {id: 1, title: 'National ID', isChecked: false},
    {id: 2, title: 'Passport', isChecked: false},
    {id: 3, title: 'Drivers Licence', isChecked: false},
    {id: 4, title: 'Others', isChecked: false},
  ]);

  const [selecteditem, setSelecteditem] = useState(false);
  const [NationalID, setNationalID] = useState(
    'NationalID'
    // props.route?.params?.NationalID ? props.route?.params?.NationalID : null,
  );

  const [Passport, setPassport] = useState(
    'Passport'
    // props.route?.params?.Passport ? props.route?.params?.Passport : null,
  );

  const [DriversLicence, setDriversLicence] = useState(
    'DriversLicence'
    // props.route?.params?.DriversLicence
    //   ? props.route?.params?.DriversLicence
    //   : null,
  );

  const [Others, setOthers] = useState(
    'Others'
    // props.route?.params?.Others ? props.route?.params?.Others : null,
  );

  const onSubmit = () => {
    // alert('Success');
    let flagCheck = false;
    arrData.forEach(item => {
      item.isChecked ? (flagCheck = true) : null;
    });
    if (!flagCheck) {
      alert('Please select an ID first to procced further');
      return;
    }
    props.navigation.navigate('KycFront', {
      nationalId: NationalID,
      passport: Passport,
      driverLicence: DriversLicence,
      others: Others,
      firstName: props.route.params.firstName,
      lastName: props.route.params.lastName,
      address: props.route.params.address,
      city: props.route.params.city,
      zip: props.route.params.zip,
      citizenship: props.route.params.citizenship,
    });
  };
  const onSelectID = (item, index) => {
    console.log('------------- hello ', arrData);
    let tempArr = [...arrData];
    tempArr.map((subItem, subIndex) => {
      index === subIndex
        ? (subItem.isChecked = true)
        : (subItem.isChecked = false);
    });
    setArrData(tempArr);
  };
  console.log('data ------- ', arrData);

 

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.mainContainer}>
        <AppView style={styles.blankConatiner}>
          <AppView style={styles.arrowBackView}>
            <AppTouchable
              onPress={() => props.navigation.navigate('KycPersonalInfo')}>
              <AppImage resizemode="contain" source={BackArrow} style={{marginLeft: 15,tintColor:"white",height:height/40,width:width/20}} />
            </AppTouchable>
          </AppView>
          <AppView style={styles.headingContainer}>
            <AppText
              style={{
                color: 'rgb(255,255,255)',
                fontSize: height/30,
                fontWeight: '700',
              }}>
              KYC - Details
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.sectionTwoContainer}>
          <AppView style={styles.passHeadView}>
            <AppText style={styles.txtForgotHead}>
              Document Verification
            </AppText>
          </AppView>
          <AppView style={styles.paraContainer}>
            <AppText style={styles.paraTxtView}>
              Your document photo helps us prove your identity, it
            </AppText>
            <AppText style={styles.paraTxtView}>
              should match the information you have
            </AppText>
            <AppText style={styles.paraTxtView}>
              provided in the previous steps.
            </AppText>
          </AppView>

          <AppView style={{height: height * 0.45, alignItems: 'center'}}>
            {/* Button 1 */}
            {/* <AppTouchable onPress={() => {}}>
              <AppView style={{}}>
                <AppTouchable
                  onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}>
                  {iAgree ? (
                    <AppView style={[styles.maininput]}>
                      <AppText style={styles.nationalTxt}>National ID</AppText>
                    </AppView>
                  ) : (
                    <AppView style={[styles.maininputID]}>
                      <AppText style={styles.nationalTxt2}>National ID</AppText>
                    </AppView>
                  )}
                </AppTouchable>
              </AppView>
            </AppTouchable> */}

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={arrData}
              renderItem={({item, index}) => (
                <AppTouchable>
                  <AppView style={{marginTop: 10, width: width * 0.9}}>
                    <AppTouchable onPress={() => onSelectID(item, index)}>
                      <AppView style={{}}>
                        <AppView
                          style={[
                            styles.maininput,
                            {
                              backgroundColor: item.isChecked
                                ? 'rgb(94,28,159)'
                                : 'white',
                            },
                          ]}>
                          <AppText
                            style={[
                              styles.nationalTxt,
                              {
                                color: item.isChecked
                                  ? 'white'
                                  : 'rgb(22,22,22)',
                              },
                            ]}>
                            {item.title}
                          </AppText>
                        </AppView>
                      </AppView>
                    </AppTouchable>
                  </AppView>
                </AppTouchable>
              )}
            />
          </AppView>
          <AppView style={styles.btnContainer}>
            <AppTouchable
              style={styles.btnTouchView}
              // onPress={() => alert('Success')}>
              onPress={() => onSubmit()}>
              <AppText style={styles.resetTxtView}>Next</AppText>
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default KycDocumentVerification;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#7A25CE',
    marginTop: 20,
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
  },
  sectionTwoContainer: {
    // height: height * 0.88,
    height: height * 0.9,
    width: width * 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  },
  txtForgotHead: {
    color: 'rgb(48,44,44)',
    fontSize:height/35,
    fontWeight: '600',
    marginLeft: 20,
    // textAlign: 'center',
  },
  paraContainer: {
    height: height * 0.12,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paraTxtView: {
    color: 'rgb(112,112,112)',
    fontSize:height/60,
  },
  maininput: {
    height: height * 0.07,
    width: width * 0.9,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 8,
    borderColor: 'rgb(228, 228 ,228)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //  {
  //   height: height * 0.07,
  //   width: width * 0.9,
  //   borderRadius: 10,
  //   borderWidth: 0.7,
  //   marginTop: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // backgroundColor: 'red',
  // },
  maininputID: {
    height: height * 0.07,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 0.7,
    marginTop: 15,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgb(94,28,159)',
  },
  emailConatinerView: {
    color: 'rgb(0,0,0)',
    fontSize: 15,
    marginLeft: 15,
    top: 5,
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
    height: height * 0.42,
    width: width * 1,
    alignItems: 'center',
  },
  textinputemail: {
    fontSize: height / 45,
    color: 'black',
    marginLeft: 15,
  },
  inptTxtField: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nationalTxt: {
    color: 'rgb(22,22,22)',
    fontSize: 18,
    fontWeight: '400',
  },
  nationalTxt2: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    fontWeight: '600',
  },
});

import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {BackArrow} from '../../assets/icon';
// import Button from "../../../components/Molecules/Button";
const {height, width} = Dimensions.get('screen');
//import {image} from '../../assets/icon';
const ProfileScreen = (props, {navigation, route}) => {
  const [viewProfileDetails, setViewProfileDetails] = useState(
    props.route.params.viewProfileDetails
      ? props.route.params.viewProfileDetails
      : null,
  );

  const [profileImage, setProfileImage] = useState(0);
  console.log('ViewProfile------>>>>', viewProfileDetails);
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <ImageBackground
          resizeMode="contain"
          // source={require("../../assets/images/profileicon/profileicon.png")}
          source={
            profileImage
              ? require('../../assets/images/profileicon/profileicon.png')
              : require('../../assets/images/profileicon/profileicon.png')
          }
          style={{width: width / 1, height: height / 1.8}}>
          <View style={styles.secondContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('myprofile')}>
              <View style={styles.thirdContainer}>
                <Image
                  source={BackArrow}
                  resizeMode="contain"
                  style={{
                    height: height / 45,
                    width: width / 30,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.forthContainer}>
            <View style={styles.firstView}>
              <View style={styles.secondView}>
                <View style={styles.thirdView}>
                  <Text
                    style={{
                      color: '#005DAC',
                      fontWeight: '700',
                      fontStyle: 'normal',
                      fontSize: height / 50,
                    }}>
                    Personal Details
                  </Text>
                </View>
                <View style={styles.forthView}></View>
              </View>
              <View
                style={{
                  height: height / 25,
                  width: width / 1,
                  //backgroundColor: 'red',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    marginHorizontal: 30,
                    color: 'black',
                    //  fontWeight: 'bold',
                  }}>
                  {viewProfileDetails.firstName} {viewProfileDetails.lastName}
                </Text>
              </View>
              <View
                style={{
                  height: height / 30,
                  width: width / 1,
                  //backgroundColor: 'yellow',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginHorizontal: 30,
                    color: 'black',
                    fontWeight: '400',
                  }}>
                  {viewProfileDetails.email}
                </Text>
              </View>
              <View
                style={{
                  height: height / 30,
                  width: width / 1,
                  // backgroundColor: 'pink',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{marginHorizontal: 30}}>
                  +91 {viewProfileDetails.phoneNo}{' '}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width,
                  height: height / 7,
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('EditProfile')}>
                  <View style={styles.fifthContainer}>
                    <Text
                      style={{
                        fontSize: height / 40,
                        color: 'white',
                        fontWeight: '700',
                      }}>
                      Edit Profile
                    </Text>

                    {/* <Button
                    onPress1={() => props.navigation.navigate("Login")}
                    submitText={{
                    //   fontStyle: "normal",
                      fontWeight: "400",
                    //   fontFamily: "Roboto-Light",
                      color: "#A09DAC",
                      fontSize: height / 50,
                    }}
                    buttonTitle="Edit Profile"
                  /> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    backgroundColor: '#E5E5E5',
    width: width / 1,
    //alignItems: 'center',
  },
  secondContainer: {
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width * 0.15,
    // backgroundColor: "#E5E5E5",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },

  thirdContainer: {
    backgroundColor: '#FFFFFF',
    //  backgroundColor:"red",
    height: height / 20,
    width: width / 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  forthContainer: {
    height: height / 1.8,
    width: width / 1,
    backgroundColor: '#ffffff',
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 2.5,
    //   marginBottom: 40,
    //  backgroundColor:"cyan",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  fifthContainer: {
    backgroundColor: '#47087B',

    height: height / 15,
    width: width / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  firstView: {
    height: height / 2.1,
    width: width / 1,
    // backgroundColor:"red",
    flexDirection: 'column',
  },
  secondView: {
    height: height / 15,
    width: width / 1,
    flexDirection: 'row',

    justifyContent: 'center',
  },
  thirdView: {
    height: height / 25,
    width: width / 3,
    justifyContent: 'center',

    justifyContent: 'center',
  },
  forthView: {
    height: height / 32,
    width: width / 2,
    justifyContent: 'center',
  },
  container: {
    //     flex: 1,
    //    backgroundColor: 'yellow',
  },
});

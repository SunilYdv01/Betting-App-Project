// import React, {useState} from 'react';
// import {
//   Image,
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';

// import SplashScreen from '../../src/screens/SplashScreen/SplashScreen';
// import Tutorial from '../screens/Tutorial/Tutorial';
// import WheretoPlay from '../screens/WheretoPlay/WheretoPlay';
// import LoginScreen from '../screens/Auth/Login/LoginScreen';
// import RegisterScreen from '../screens/Auth/SignUp/RegisterScreen';
// import SignUp from '../screens/Auth/SignUp/SignUp';
// import RegisterTwo from '../screens/Auth/SignUp/RegisterTwo';
// import RegisterThree from '../screens/Auth/SignUp/RegisterThree';
// import TermsofUse from '../screens/TermsofUse/TermsofUse';

// import Forgot from '../screens/Auth/Forgot/Forgot';
// import Reset from '../screens/Auth/Reset/Reset';
// import ChangePass from '../screens/Auth/ChangePassReset/ChangePassReset';
// import ChangePasswordSuccess from '../screens/Auth/ChangePasswordSuccess/ChangePasswordSuccess';

// import KycPromptScreen from '../screens/Kyc/KycPromptScreen';
// import KycPersonalInfo from '../screens/Kyc/KycPersonalInfo';
// import KycDocumentVerification from '../screens/Kyc/KycDocumentVerification';

// import OtpSignupVerify from '../screens/Auth/OtpSignupVerify/OtpSignupVerify';
// import KycFrontScan from '../screens/Kyc/KycFront';
// import BackKyc from '../screens/Kyc/BackKyc';
// import KycRegisteredPromptScreen from '../screens/Kyc/KycRegisteredPromptScreen';

// import HomeScreen from '../screens/Home/HomeScreen';
// import SelectedSport from '../screens/SelectedSport/SelectedSport';
// import PlaceYourBet from '../screens/PlaceYourBet/PlaceYourBet';
// import PlaceYourBetTwo from '../screens/PlaceYourBetTwo/PlaceYourBetTwo';
// import PickOpponentScreen from '../screens/PickOpponentScreen/PickOpponentScreen';
// import OtpTestApi from '../../OtpTestApi';
// import RejectBet from '../screens/RejectBet/RejectBet';
// import InboxScreen from '../screens/InboxScreen/InboxScreen';
// import DrawerNavigator from './DrawerNavigator';
// import BetHistory from '../screens/BetHistory';
// import AllSportsMatches from '../screens/AllSportsMatches';
// import DepositAmountScreen from '../screens/DepositAmountScreen';
// import BuyToken from '../screens/BuyToken/BuyToken';
// import TabNavigator from '../Navigator/TabNavigator';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ContactUs from '../screens/ContactUs/ContactUs';
// import ReferandEarn from '../screens/ReferandEarn/ReferandEarn';
// import myprofile from '../screens/myprofile/myprofile';
// import LeaderBoard from '../screens/LeaderBoard/LeaderBoard';
// import Achievements from '../screens/Achievements/Achievements';
// import ViewProfile from '../screens/Viewprofile/ViewProfile';
// // import Mywallet from '../screens/Wallet/Mywallet/Mywallet';
// import AllTransaction from '../screens/Transaction/AllTransaction/AllTransaction';
// import YourBetHistory from '../screens/YourBetHistory/YourBetHistory';
// import PlayerProfileAchivements from '../screens/PlayerProfileAchivements/PlayerProfileAchivements';
// import Transactiondetails from '../screens/Transaction/Transactiondetails/Transactiondetails';
// import CryptoWallet from '../screens/Wallet/CryptoWallet/CryptoWallet';
// import Mywallet from '../screens/Wallet/Mywallet/Mywallet';
// import WithdrawYourCoin from '../screens/Wallet/WithdrawYourCoin/WithdrawYourCoin';
// import DepositCryptoCoin from '../screens/Wallet/DepositCryptoCoin/DepositCryptoCoin';
// import WithdrawYourAmount from '../screens/Wallet/WithdrawYourAmount/WithdrawYourAmount';
// import DepositAmountMoney from '../screens/Wallet/DepositAmountMoney/DepositAmountMoney';
// import AddMoney from '../screens/Wallet/AddMoney/AddMoney';
// import ChooseYourCard from '../screens/Wallet/ChooseYourCard/ChooseYourCard';
// import FiatWallet from '../screens/Wallet/FiatWallet/FiatWallet';
// import CreateBet from '../screens/CreateBet/CreateBet';
// import CreateYourOwnBet from '../screens/CreateYourownBet/CreateYourOwnBet';
// import Pay from '../screens/pay/pay';
// import pay from '../screens/pay/pay';
// import AddAmount from '../screens/AddAmount/AddAmount';
// import NotificationScreen from '../screens/NotificationScreen/Notification';

// import AddCardDetails from '../screens/AddCardDetails/AddCardDetails';
// import EditProfile from '../screens/EditProfile/EditProfile';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import Qr from '../screens/Qr/Qr';
// import CreateBet2 from '../screens/CreateBet2/CreateBet2';

// // import FavouriteSports from '../src/screens/FavouriteSports/FavouriteSports';
// import FavouriteSports from '../../src/screens/FavouriteSports/FavouriteSports';

// const {height, width} = Dimensions.get('window');

// const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

// function MyTabs(props) {
//   return Platform.OS === 'ios' ? (
//     <Tab.Navigator
//       tabBarOptions={{
//         showLabel: false,
//         showIcon: true,

//         activeTintColor: 'white',
//         inactiveTintColor: 'black',
//         style: {
//           // paddingTop: 12,
//           position: 'absolute',
//           paddingBottom: 9,
//           elevation: 10,
//           backgroundColor: 'rgb(94,28,159)',
//         },
//         labelStyle: {
//           textAlign: 'center',
//           fontSize: height / 74,
//         },
//         tabBarIcon: () => (
//           <ImageBackground
//             // source={require('../assets/images/TutorialTwo/TutorialTwo.png')}
//             style={{
//               width,
//               height: 63,
//             }}
//           />
//         ),
//       }}>
//       {/* {(Platform.OS === 'ios' ? 'red' : 'green')} */}
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
//                   : require('../assets/images/HomeIcon/HomeIcon.png')
//                 // : require('../assets/images/HomeIcon/HomeIcon.png')
//               }
//               style={{height: height / 32, width: width / 16}}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Wallet"
//         component={Mywallet}
//         options={{
//           tabBarLabel: 'Wallet',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/wallet3.png')
//                   : require('../assets/images/WalletIcon/WalletIcon.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="CraeteBet"
//         component={CreateBet}
//         options={{
//           tabBarLabel: 'Bet',

//           tabBarIcon: ({focused, color, size}) => (
//             // onPress={() => handlePress('Add', 2)}
//             <Image
//               resizeMode="contain"
//               source={
//                 // focused === 'Add'
//                 focused
//                   ? require('../assets/images/AddTwo/AddTwo.png')
//                   : require('../assets/images/AddTwo/AddTwo.png')
//               }
//               style={{height: height / 8, width: width / 4}}
//             />
//           ),
//         }}
//       />

//       {/* Trophy Tab */}
//       <Tab.Screen
//         name="LeaderBoard"
//         component={LeaderBoard}
//         options={{
//           tabBarLabel: 'LeaderBoards',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/TrophyIconTwo/TrophyIconTwo.png')
//                   : require('../assets/images/TrophyIconOne/TrophyIconOne.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />

//       {/* Profile Tab */}
//       <Tab.Screen
//         name="wallet"
//         component={BetHistory}
//         options={{
//           tabBarLabel: 'Wallet',
//           // tabBarVisible: false,
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/clock2.png')
//                   : require('../assets/images/clock3/clock3.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//                 // tintColor:"white"
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />
//       {/* <Tab.Screen name="BuyToken" component={BuyToken } /> */}
//     </Tab.Navigator>
//   ) : (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: 'white',
//         inactiveTintColor: 'black',

//         showLabel: false,
//         showIcon: true,
//         style: {
//           height: 70,
//           // paddingTop: 12,
//           position: 'absolute',
//           // paddingBottom: 10,
//           elevation: 10,
//           backgroundColor: 'rgb(94,28,159)',
//         },
//         labelStyle: {
//           textAlign: 'center',
//           fontSize: height / 74,
//         },
//         tabBarIcon: () => (
//           <ImageBackground
//             // source={require('../assets/images/TutorialTwo/TutorialTwo.png')}
//             style={{
//               width,
//               height: 63,
//             }}
//           />
//         ),
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
//                   : require('../assets/images/HomeIcon/HomeIcon.png')
//                 // : require('../assets/images/HomeIcon/HomeIcon.png')
//               }
//               style={{height: height / 32, width: width / 16}}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />
//       {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
//       <Tab.Screen
//         name="Wallet"
//         component={Mywallet}
//         options={{
//           tabBarLabel: 'Wallet',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/wallet3.png')
//                   : require('../assets/images/WalletIcon/WalletIcon.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="CreateBet"
//         component={CreateBet}
//         options={{
//           tabBarLabel: 'Bet',
//           tabBarIcon: ({focused, color, size}) => (
//             // onPress={() => handlePress('Add', 2)}
//             <Image
//               resizeMode="contain"
//               source={
//                 // focused === 'Add'
//                 focused
//                   ? require('../assets/images/AddTwo/AddTwo.png')
//                   : require('../assets/images/AddTwo/AddTwo.png')
//               }
//               style={{height: height / 8, width: width / 4}}
//             />
//           ),
//         }}
//       />

//       {/* Trophy Tab */}
//       <Tab.Screen
//         name="LeaderBoard"
//         component={LeaderBoard}
//         options={{
//           tabBarLabel: 'LeaderBoards',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/TrophyIconTwo/TrophyIconTwo.png')
//                   : require('../assets/images/TrophyIconOne/TrophyIconOne.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />

//       {/* Profile Tab */}
//       <Tab.Screen
//         name="BetHistory"
//         component={BetHistory}
//         options={{
//           tabBarLabel: 'Bethistory',
//           // tabBarVisible: false,
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('../assets/images/clock2.png')
//                   : require('../assets/images/clock3/clock3.png')
//               }
//               style={{
//                 height: height / 32,
//                 width: width / 16,
//                 // tintColor:"white"
//               }}
//               resizeMode="contain"
//             />
//           ),
//         }}
//       />
//       {/* <Tab.Screen name="BuyToken" component={BuyToken } /> */}
//     </Tab.Navigator>
//   );
// }

// function AllStackNavigation() {
//   return (
//     <Stack.Navigator
//       initialRouteName="SplashScreen"
//       // initialRouteName="HomeScreen"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Splash" component={SplashScreen} />
//       <Stack.Screen name="Tutorial" component={Tutorial} />
//       <Stack.Screen name="WheretoPlay" component={WheretoPlay} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//       <Stack.Screen name="SignUpSecond" component={RegisterTwo} />
//       <Stack.Screen name="SignUpThird" component={RegisterThree} />
//       <Stack.Screen name="Forgot" component={Forgot} />
//       <Stack.Screen name="Reset" component={Reset} />
//       <Stack.Screen name="ChangePass" component={ChangePass} />
//       <Stack.Screen
//         name="ChangePasswordSuccess"
//         component={ChangePasswordSuccess}
//       />
//       <Stack.Screen name="KycPromptScreen" component={KycPromptScreen} />
//       <Stack.Screen name="KycPersonalInfo" component={KycPersonalInfo} />
//       <Stack.Screen
//         name="KycDocumentVerification"
//         component={KycDocumentVerification}
//       />
//       <Stack.Screen name="TermsConditions" component={TermsofUse} />
//       <Stack.Screen name="OtpSignupVerify" component={OtpSignupVerify} />

//       <Stack.Screen name="KycFront" component={KycFrontScan} />

//       <Stack.Screen name="BackKyc" component={BackKyc} />
//       <Stack.Screen
//         name="KycRegisteredPromptScreen"
//         component={KycRegisteredPromptScreen}
//       />

//       <Stack.Screen name="FavouriteSports" component={FavouriteSports} />

//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="SelectedSport" component={SelectedSport} />

//       <Stack.Screen name="PlaceYourBet" component={PlaceYourBet} />
//       <Stack.Screen name="PlaceYourBetTwo" component={PlaceYourBetTwo} />
//       <Stack.Screen name="PickOpponentScreen" component={PickOpponentScreen} />

//       <Stack.Screen name="RejectBet" component={RejectBet} />
//       <Stack.Screen name="InboxScreen" component={InboxScreen} />

//       <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

//       {/* Testing Screen */}
//       <Stack.Screen name="OtpTestApi" component={OtpTestApi} />
//       <Stack.Screen name="BetHistory" component={BetHistory} />
//       <Stack.Screen name="AllSportsMatches" component={AllSportsMatches} />
//       <Stack.Screen name="DepositAmount" component={DepositAmountScreen} />

//       <Stack.Screen name="ContactUs" component={ContactUs} />
//       <Stack.Screen name="MyTabs" component={MyTabs} />
//       <Stack.Screen name="ReferandEarn" component={ReferandEarn} />
//       <Stack.Screen name="myprofile" component={myprofile} />
//       <Stack.Screen name="Achievements" component={Achievements} />
//       <Stack.Screen name="ViewProfile" component={ViewProfile} />
//       <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
//       {/* <Stack.Screen name="Mywallet" component={Mywallet} /> */}
//       <Stack.Screen name="AllTransaction" component={AllTransaction} />
//       <Stack.Screen
//         name="PlayerProfileAchivements"
//         component={PlayerProfileAchivements}
//       />
//       <Stack.Screen name="Transactiondetails" component={Transactiondetails} />
//       <Stack.Screen name="CryptoWallet" component={CryptoWallet} />
//       <Stack.Screen name="Mywallet" component={Mywallet} />
//       <Stack.Screen name="WithdrawYourCoin" component={WithdrawYourCoin} />
//       <Stack.Screen name="DepositCryptoCoin" component={DepositCryptoCoin} />
//       <Stack.Screen name="WithdrawYourAmount" component={WithdrawYourAmount} />
//       <Stack.Screen name="DepositAmountMoney" component={DepositAmountMoney} />
//       <Stack.Screen name="AddMoney" component={AddMoney} />
//       <Stack.Screen name="ChooseYourCard" component={ChooseYourCard} />
//       <Stack.Screen name="FiatWallet" component={FiatWallet} />
//       <Stack.Screen name="CreateBet" component={CreateBet} />
//       <Stack.Screen name="CreateYourOwnBet" component={CreateYourOwnBet} />
//       <Stack.Screen name="pay" component={pay} />
//       <Stack.Screen name="BuyToken" component={BuyToken} />
//       <Stack.Screen name="AddAmount" component={AddAmount} />
//       <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
//       <Stack.Screen name="Qr" component={Qr} />
//       <Stack.Screen name="AddCardDetails" component={AddCardDetails} />
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//       <Stack.Screen name="CreateBet2" component={CreateBet2} />
//     </Stack.Navigator>
//   );
// }

// export default function StackNavigateExample() {
//   return (
//     <NavigationContainer>
//       <AllStackNavigation />
//     </NavigationContainer>
//   );
// }
// // import React from 'react'
// // import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

// // const StackNavigator = () => {
// //   return (
// //    <SafeAreaView>
// //       <View>
// //       <Text>skdjfsd,fjd,jf</Text>
// //     </View>
// //    </SafeAreaView>
// //   )
// // }

// // export default StackNavigator

// // const styles = StyleSheet.create({})
// // import React from 'react';
// // import {StyleSheet, Text, View} from 'react-native';

// // const StackNavigator = () => {
// //   return (
// //     <View style={{marginTop: 100}}>
// //       <Text>vvgnbbvnbvn</Text>
// //     </View>
// //   );
// // };

// // export default StackNavigator;

// // const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../../src/screens/SplashScreen/SplashScreen';
import Tutorial from '../screens/Tutorial/Tutorial';
import WheretoPlay from '../screens/WheretoPlay/WheretoPlay';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/SignUp/RegisterScreen';
import SignUp from '../screens/Auth/SignUp/SignUp';
import RegisterTwo from '../screens/Auth/SignUp/RegisterTwo';
import RegisterThree from '../screens/Auth/SignUp/RegisterThree';
import TermsofUse from '../screens/TermsofUse/TermsofUse';

import Forgot from '../screens/Auth/Forgot/Forgot';
import Reset from '../screens/Auth/Reset/Reset';
import ChangePass from '../screens/Auth/ChangePassReset/ChangePassReset';
import ChangePasswordSuccess from '../screens/Auth/ChangePasswordSuccess/ChangePasswordSuccess';

import KycPromptScreen from '../screens/Kyc/KycPromptScreen';
import KycPersonalInfo from '../screens/Kyc/KycPersonalInfo';
import KycDocumentVerification from '../screens/Kyc/KycDocumentVerification';

import OtpSignupVerify from '../screens/Auth/OtpSignupVerify/OtpSignupVerify';
import KycFrontScan from '../screens/Kyc/KycFront';
import BackKyc from '../screens/Kyc/BackKyc';
import KycRegisteredPromptScreen from '../screens/Kyc/KycRegisteredPromptScreen';

import HomeScreen from '../screens/Home/HomeScreen';
import SelectedSport from '../screens/SelectedSport/SelectedSport';
import PlaceYourBet from '../screens/PlaceYourBet/PlaceYourBet';
import PlaceYourBetTwo from '../screens/PlaceYourBetTwo/PlaceYourBetTwo';
import PickOpponentScreen from '../screens/PickOpponentScreen/PickOpponentScreen';
import OtpTestApi from '../../OtpTestApi';
import RejectBet from '../screens/RejectBet/RejectBet';
import InboxScreen from '../screens/InboxScreen/InboxScreen';
import DrawerNavigator from './DrawerNavigator';
import BetHistory from '../screens/BetHistory';
import AllSportsMatches from '../screens/AllSportsMatches';
import DepositAmountScreen from '../screens/DepositAmountScreen';
import BuyToken from '../screens/BuyToken/BuyToken';
import TabNavigator from '../Navigator/TabNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactUs from '../screens/ContactUs/ContactUs';
import ReferandEarn from '../screens/ReferandEarn/ReferandEarn';
import myprofile from '../screens/myprofile/myprofile';
import LeaderBoard from '../screens/LeaderBoard/LeaderBoard';
import Achievements from '../screens/Achievements/Achievements';
import ViewProfile from '../screens/Viewprofile/ViewProfile';
// import Mywallet from '../screens/Wallet/Mywallet/Mywallet';
import AllTransaction from '../screens/Transaction/AllTransaction/AllTransaction';
import YourBetHistory from '../screens/YourBetHistory/YourBetHistory';
import PlayerProfileAchivements from '../screens/PlayerProfileAchivements/PlayerProfileAchivements';
import Transactiondetails from '../screens/Transaction/Transactiondetails/Transactiondetails';
import CryptoWallet from '../screens/Wallet/CryptoWallet/CryptoWallet';
import Mywallet from '../screens/Wallet/Mywallet/Mywallet';
import WithdrawYourCoin from '../screens/Wallet/WithdrawYourCoin/WithdrawYourCoin';
import DepositCryptoCoin from '../screens/Wallet/DepositCryptoCoin/DepositCryptoCoin';
import WithdrawYourAmount from '../screens/Wallet/WithdrawYourAmount/WithdrawYourAmount';
import DepositAmountMoney from '../screens/Wallet/DepositAmountMoney/DepositAmountMoney';
import AddMoney from '../screens/Wallet/AddMoney/AddMoney';
import ChooseYourCard from '../screens/Wallet/ChooseYourCard/ChooseYourCard';
import FiatWallet from '../screens/Wallet/FiatWallet/FiatWallet';
import CreateBet from '../screens/CreateBet/CreateBet';
import CreateYourOwnBet from '../screens/CreateYourownBet/CreateYourOwnBet';
import Pay from '../screens/pay/pay';
import pay from '../screens/pay/pay';
import AddAmount from '../screens/AddAmount/AddAmount';
import NotificationScreen from '../screens/NotificationScreen/Notification';

import AddCardDetails from '../screens/AddCardDetails/AddCardDetails';
import EditProfile from '../screens/EditProfile/EditProfile';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Qr from '../screens/Qr/Qr';
import CreateBet2 from '../screens/CreateBet2/CreateBet2';

// import FavouriteSports from '../src/screens/FavouriteSports/FavouriteSports';
import FavouriteSports from '../../src/screens/FavouriteSports/FavouriteSports';

const {height, width} = Dimensions.get('window');

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  return Platform.OS === 'ios' ? (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        showIcon: true,

        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: {
          // paddingTop: 12,
          position: 'absolute',
          paddingBottom: 9,
          elevation: 10,
          backgroundColor: 'rgb(94,28,159)',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: height / 74,
        },
        tabBarIcon: () => (
          <ImageBackground
            // source={require('../assets/images/TutorialTwo/TutorialTwo.png')}
            style={{
              width,
              height: 63,
            }}
          />
        ),
      }}>
      {/* {(Platform.OS === 'ios' ? 'red' : 'green')} */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                  : require('../assets/images/HomeIcon/HomeIcon.png')
                // : require('../assets/images/HomeIcon/HomeIcon.png')
              }
              style={{height: height / 32, width: width / 16}}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Mywallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/wallet3.png')
                  : require('../assets/images/WalletIcon/WalletIcon.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="CraeteBet"
        component={CreateBet}
        options={{
          tabBarLabel: 'Bet',

          tabBarIcon: ({focused, color, size}) => (
            // onPress={() => handlePress('Add', 2)}
            <Image
              resizeMode="contain"
              source={
                // focused === 'Add'
                focused
                  ? require('../assets/images/AddTwo/AddTwo.png')
                  : require('../assets/images/AddTwo/AddTwo.png')
              }
              style={{height: height / 8, width: width / 4}}
            />
          ),
        }}
      />

      {/* Trophy Tab */}
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          tabBarLabel: 'LeaderBoards',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/TrophyIconTwo/TrophyIconTwo.png')
                  : require('../assets/images/TrophyIconOne/TrophyIconOne.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="wallet"
        component={BetHistory}
        options={{
          tabBarLabel: 'Wallet',
          // tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/clock2.png')
                  : require('../assets/images/clock3/clock3.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
                // tintColor:"white"
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* <Tab.Screen name="BuyToken" component={BuyToken } /> */}
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',

        showLabel: false,
        showIcon: true,
        style: {
          height: 70,
          // paddingTop: 12,
          position: 'absolute',
          // paddingBottom: 10,
          elevation: 10,
          backgroundColor: 'rgb(94,28,159)',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: height / 74,
        },
        tabBarIcon: () => (
          <ImageBackground
            // source={require('../assets/images/TutorialTwo/TutorialTwo.png')}
            style={{
              width,
              height: 63,
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                  : require('../assets/images/HomeIcon/HomeIcon.png')
                // : require('../assets/images/HomeIcon/HomeIcon.png')
              }
              style={{height: height / 32, width: width / 16}}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen
        name="Wallet"
        component={Mywallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/wallet3.png')
                  : require('../assets/images/WalletIcon/WalletIcon.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="CreateBet"
        component={CreateBet}
        options={{
          tabBarLabel: 'Bet',
          tabBarIcon: ({focused, color, size}) => (
            // onPress={() => handlePress('Add', 2)}
            <Image
              resizeMode="contain"
              source={
                // focused === 'Add'
                focused
                  ? require('../assets/images/AddTwo/AddTwo.png')
                  : require('../assets/images/AddTwo/AddTwo.png')
              }
              style={{height: height / 8, width: width / 4}}
            />
          ),
        }}
      />

      {/* Trophy Tab */}
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          tabBarLabel: 'LeaderBoards',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/TrophyIconTwo/TrophyIconTwo.png')
                  : require('../assets/images/TrophyIconOne/TrophyIconOne.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="BetHistory"
        component={BetHistory}
        options={{
          tabBarLabel: 'Bethistory',
          // tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/clock2.png')
                  : require('../assets/images/clock3/clock3.png')
              }
              style={{
                height: height / 32,
                width: width / 16,
                // tintColor:"white"
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* <Tab.Screen name="BuyToken" component={BuyToken } /> */}
    </Tab.Navigator>
  );
}

function AllStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      // initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="WheretoPlay" component={WheretoPlay} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpSecond" component={RegisterTwo} />
      <Stack.Screen name="SignUpThird" component={RegisterThree} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
      />
      <Stack.Screen name="KycPromptScreen" component={KycPromptScreen} />
      <Stack.Screen name="KycPersonalInfo" component={KycPersonalInfo} />
      <Stack.Screen
        name="KycDocumentVerification"
        component={KycDocumentVerification}
      />
      <Stack.Screen name="TermsConditions" component={TermsofUse} />
      <Stack.Screen name="OtpSignupVerify" component={OtpSignupVerify} />

      <Stack.Screen name="KycFront" component={KycFrontScan} />

      <Stack.Screen name="BackKyc" component={BackKyc} />
      <Stack.Screen
        name="KycRegisteredPromptScreen"
        component={KycRegisteredPromptScreen}
      />

      <Stack.Screen name="FavouriteSports" component={FavouriteSports} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SelectedSport" component={SelectedSport} />

      <Stack.Screen name="PlaceYourBet" component={PlaceYourBet} />
      <Stack.Screen name="PlaceYourBetTwo" component={PlaceYourBetTwo} />
      <Stack.Screen name="PickOpponentScreen" component={PickOpponentScreen} />

      <Stack.Screen name="RejectBet" component={RejectBet} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />

      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

      {/* Testing Screen */}
      <Stack.Screen name="OtpTestApi" component={OtpTestApi} />
      <Stack.Screen name="BetHistory" component={BetHistory} />
      <Stack.Screen name="AllSportsMatches" component={AllSportsMatches} />
      <Stack.Screen name="DepositAmount" component={DepositAmountScreen} />

      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="ReferandEarn" component={ReferandEarn} />
      <Stack.Screen name="myprofile" component={myprofile} />
      <Stack.Screen name="Achievements" component={Achievements} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
      {/* <Stack.Screen name="Mywallet" component={Mywallet} /> */}
      <Stack.Screen name="AllTransaction" component={AllTransaction} />
      <Stack.Screen
        name="PlayerProfileAchivements"
        component={PlayerProfileAchivements}
      />
      <Stack.Screen name="Transactiondetails" component={Transactiondetails} />
      <Stack.Screen name="CryptoWallet" component={CryptoWallet} />
      <Stack.Screen name="Mywallet" component={Mywallet} />
      <Stack.Screen name="WithdrawYourCoin" component={WithdrawYourCoin} />
      <Stack.Screen name="DepositCryptoCoin" component={DepositCryptoCoin} />
      <Stack.Screen name="WithdrawYourAmount" component={WithdrawYourAmount} />
      <Stack.Screen name="DepositAmountMoney" component={DepositAmountMoney} />
      <Stack.Screen name="AddMoney" component={AddMoney} />
      <Stack.Screen name="ChooseYourCard" component={ChooseYourCard} />
      <Stack.Screen name="FiatWallet" component={FiatWallet} />
      <Stack.Screen name="CreateBet" component={CreateBet} />
      <Stack.Screen name="CreateYourOwnBet" component={CreateYourOwnBet} />
      <Stack.Screen name="pay" component={pay} />
      <Stack.Screen name="BuyToken" component={BuyToken} />
      <Stack.Screen name="AddAmount" component={AddAmount} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="Qr" component={Qr} />
      <Stack.Screen name="AddCardDetails" component={AddCardDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CreateBet2" component={CreateBet2} />
    </Stack.Navigator>
  );
}

export default function StackNavigateExample() {
  return (
    <NavigationContainer>
      <AllStackNavigation />
    </NavigationContainer>
  );
}

import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
const {height, width} = Dimensions.get('window');
import {DrawerItem} from '@react-navigation/drawer';
import {Refer,customer,ContactFAQs, Rules, PrivacyPolicy,sport,basket,MessageIcon,profile2,UserIconOne} from '../assets/icon';

function navigatebro(props, ScreenNmae) {
  props.navigation.closeDrawer();
  props.navigation.reset({
    index: 0,
    routes: [{name: ScreenNmae}],
  });
}


const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {
  
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.mainView}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View style={{width: '95%'}}>
            <View style={styles.drawerLogoView}>
              <Image
                 style={{height:height/4, width:width/1.8}}
                source={require('../assets/images/LoginLogo/LoginLogo.png')}
                resizeMode="contain"
              />
            </View>
            <View style={{}}>

            <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={UserIconOne}
                        style={{height: height/30, width:width/15,tintColor:"white"}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>My Profile</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('myprofile')}
              />
      
              <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={sport}
                        style={{height: height/30, width:width/15,tintColor:"white"}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>All Sports</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('AllSportsMatches')}
              />
                     <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={basket}
                        style={{height: height/30, width:width/15,tintColor:"white"}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Buy Token</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('AddAmount')}
              />

<DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={customer}
                        style={{height: height/30, width:width/15,tintColor:"white"}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Your KYC</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('KycPersonalInfo')}
              />

              {/* <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={Refer}
                        style={{height: 30, width: 30}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Refer and Earn</Text>
                    </View>
                  </View>
                )}
                onPress={() => alert('')}
              /> */}
              <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={ContactFAQs}
                        style={{height: height/30, width:width/15}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Contact & FAQs</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('ContactUs')}
              />
              {/* <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={Rules}
                        style={{height: 30, width: 30}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Rules</Text>
                    </View>
                  </View>
                )}
                onPress={() => alert('Rules Click...')}
              /> */}
              <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={PrivacyPolicy}
                        style={{height: height/30, width:width/15}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Privacy Policy</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('TermsConditions')}
              />
              {/* <DrawerItem
                label={() => <Text style={styles.lebeltext}>Logout</Text>}
                onPress={() => props.navigation.navigate('Login')}
                // onPress={() => alert('Logout Click...')}
              /> */}


<DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={Refer}
                        style={{height: height/30, width:width/15}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>My Bets</Text>
                    </View>
                  </View>
                )}
                onPress={() => props.navigation.navigate('BetHistory')}
              />



              <DrawerItem
                label={() => (
                  <View style={styles.drawerMainView}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={ContactFAQs}
                        style={{height: height/30, width:width/15}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.txtContainer}>
                      <Text style={styles.lebeltext}>Logout</Text>
                    </View>
                  </View>
                )}

                
                onPress={() => props.navigation.navigate('Login')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  lebeltext: {
    color: '#FFFFFF',
    fontSize: 18,
    width: width * 0.5,
    fontWeight: '600',
    marginLeft: -9,
  },
  Image: {
    height: height * 0.03,
    width: width * 0.55,
  },
  drawerMainView: {
    height: height * 0.05,
    width: width * 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: -12,
  },
  imgContainer: {
    height: height * 0.05,
    width: width * 0.15,
    justifyContent: 'center',
  },
  txtContainer: {
    height: height * 0.05,
    width: width * 0.4,
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  mainView: {
    backgroundColor: 'rgb(94,28,159)',
    height: height * 1,
    width: width * 0.75,
  },
  drawerLogoView: {
    height: height * 0.2,
    width: width * 0.68,
    justifyContent: 'center',
  },
});

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import {BackArrow} from '../../assets/icon';
import Header from '../../components/molecules/Header';

const TermsofUse = (props, {route, navigation}) => {
  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.Container}>
        <AppView style={styles.mainView}>
          <AppView
            style={{
              justifyContent: 'space-between',
              height: height * 0.06,
              width: width * 1,
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Header
              head={false}
              headerText2={'Terms & Conditions'}
              backImage={BackArrow}
              onPress2={() => props.navigation.goBack()}
            />
          </AppView>
          <ScrollView>
            <AppView style={styles.mainViewContainer}>
              <AppView style={styles.sportsViewContainer}>
                <AppText style={styles.TxtViewContainer}>
                  Sports Betting Terms and Condition
                </AppText>
              </AppView>
              <AppView style={{height: height / 5.8, width: width / 1.06}}>
                <AppText style={{fontSize: height / 65.2, color: 'white'}}>
                  This is document called "Terms of Use",covering the conditions
                  of engagement between the parties is an agreement between you,
                  the user and Go TeeOff Ventures Pvt Ltd. ( together with our
                  affiliates and/or subsidiaries from time to time, if any).
                  GoTeeOff Ventures Pvt. Ltd. is a private limited company
                  incorporated in Singapore whose registered office is 12 Eu
                  Tong Sen Street, #08-169, The Central, Singapore 059819.
                </AppText>
              </AppView>
              <AppView style={{height: height / 2.63, width: width / 1.06}}>
                <AppText style={{fontSize: height / 64, color: 'white'}}>
                  Whereas, GTO is a software development company with focus on
                  internet based online booking services for golf playing time,
                  hotel reservations, transportation reservations, tour packages
                  etc and maintains informative websites, could based vendor
                  sales &amp; property management software's, golf instruction
                  coaching video content along with other products &amp;
                  services, their related software, and/or web &ampJor mobile
                  Samp:/or tablet applications in iOS &amp./or Android along
                  with a Utility Token called the GTO Taken used for e-commerce
                  on our platform, and corresponding to the offerings of our
                  GoTeeOff platform subscriptions & brands (including but not
                  limited to Go TeeOff, Free @ Par, Basic Birdie, Premium Eagle,
                  VIP Albatross, Corporate Hole-in-One, GTO Book & Play. GTO
                  Play &amp: Stay, GTO Family Tours, Go TeeOff Academy, GTO
                  E-Mall, GTO Events & Tournaments, individually as service and
                  collectively as our "Services.
                </AppText>
              </AppView>
              <AppView style={{height: height / 9, width: width / 1.06}}>
                <AppText style={{fontSize: height / 63, color: 'white'}}>
                  References made in this Agreement to "GTO", "we", "our" and
                  *us" are to GoTeeOff Ventures Pte Ltd while references made to
                  you" or "your" are to the personventity with whom GTO enters
                  in to this Agreement.
                </AppText>
              </AppView>
            </AppView>
          </ScrollView>

          {/* <AppView style={styles.touchContainer}>
            <TouchableOpacity></TouchableOpacity>
          </AppView> */}
          {/* <AppView style={styles.btnContainer}>

            {/* <TouchableOpacity  onPress={() => props.navigation.navigate('Login')}>
              <AppView style={styles.agreeView}>
                <AppText style={styles.agreeTxtView}>Agree</AppText>
              </AppView>
            </TouchableOpacity> */}
          {/* </AppView> */}
        </AppView>

        {/* <AppText>Terms and Conditions screens.....</AppText> */}
      </AppView>
    </SafeAreaView>
  );
};

export default TermsofUse;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  mainViewContainer: {
    height: height / 1.2,
    width: width / 1,
    alignItems: 'center',
  },
  sportsViewContainer: {
    height: height / 18,
    width: width / 1.06,
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  TxtViewContainer: {
    fontSize: height / 40,
    color: 'white',
    fontWeight: '700',
  },
  touchContainer: {
    height: height / 14,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  btnContainer: {
    height: height / 9,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeView: {
    height: height / 12,
    width: width / 1.15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeTxtView: {
    fontSize: height / 38,
    color: '#7A25CE',
    fontWeight: '700',
  },
});

import React from 'react';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import {
  BackArrow,
  RegisterStepOne,
  Check,
  BankIcon,
  PayPal,
  Visa,
  MasterCard,
  Bitcoin,
} from '../../../assets/icon';
import Header from '../../../components/molecules/Header';

const RegisterThree = props => {
  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.container}>
        <AppView style={styles.mainView}>
          <AppView>
            <Header head={true} image={BackArrow} headerText="Deposit" />
          </AppView>
          <AppView style={styles.subHeaderView}>
            <AppView style={styles.imgContainer}>
              <AppImage
                style={{height: height / 20, width: width / 10}}
                resizeMode="contain"
                source={RegisterStepOne}
              />
            </AppView>
            <AppView style={styles.blankView}></AppView>
            <AppView style={styles.imgContainer}>
              <AppImage
                style={{height: height / 20, width: width / 10}}
                resizeMode="contain"
                source={RegisterStepOne}
              />
            </AppView>
            <AppView style={styles.blankView}></AppView>
            <AppView style={styles.imgContainer}>
              <AppImage
                style={{height: height / 20, width: width / 10}}
                resizeMode="contain"
                source={RegisterStepOne}
              />
            </AppView>
          </AppView>

          <AppView style={styles.viewContainer}>
            <AppView style={styles.viewContainerTwo}>
              <AppView style={styles.imgCheckView}>
                <AppImage
                  style={{height: height / 25, width: width / 13}}
                  resizeMode="contain"
                  source={Check}
                />
              </AppView>
              <AppView style={{height: height / 9.5, width: width / 1.21}}>
                <AppText
                  style={{fontSize: height / 48, color: 'white', padding: 10}}>
                  You're Registered Almost there.Make
                </AppText>
                <AppText
                  style={{
                    fontSize: height / 48,
                    color: 'white',
                    marginLeft: 10,
                  }}>
                  A Deposit and Get Started
                </AppText>
              </AppView>
            </AppView>
          </AppView>
          <AppView style={styles.chooseContainer}>
            <AppText style={styles.chooseTxtView}>Choose One</AppText>
          </AppView>
          <AppView style={{height: height / 4.5, width: width / 1}}>
            <AppView style={styles.touchContainer}>
              <AppTouchable>
                <AppView style={styles.bookingContainer}>
                  <AppView style={styles.bankView}>
                    <AppImage source={BankIcon} />
                  </AppView>
                  <AppView style={styles.bankTxtView}>
                    <AppText style={{fontSize: height / 50, color: '#000000'}}>
                      Online Banking
                    </AppText>
                  </AppView>
                </AppView>
              </AppTouchable>

              <AppTouchable>
                <AppView style={styles.bookingContainer}>
                  <AppView style={styles.bankView}>
                    <AppImage source={PayPal} />
                  </AppView>
                </AppView>
              </AppTouchable>
            </AppView>
            <AppView style={styles.touchContainer}>
              <AppTouchable>
                <AppView style={styles.bookingContainer}>
                  <AppView style={styles.bankViewTwo}>
                    <AppView style={{margin: 8}}>
                      <AppImage source={Visa} />
                    </AppView>
                    <AppView style={styles.visaView}>
                      <AppImage source={MasterCard} />
                    </AppView>
                  </AppView>
                  <AppView style={styles.bankTxtViewTwo}>
                    <AppText style={{fontSize: height / 50, color: '#000000'}}>
                      Debit Card
                    </AppText>
                  </AppView>
                </AppView>
              </AppTouchable>

              <AppTouchable>
                <AppView style={styles.bookingContainer}>
                  <AppView style={styles.bankViewTwo}>
                    <AppImage source={Bitcoin} />
                  </AppView>
                  <AppView style={styles.bankTxtViewTwo}>
                    <AppText style={{fontSize: height / 50, color: '#000000'}}>
                      Crypto
                    </AppText>
                  </AppView>
                </AppView>
              </AppTouchable>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default RegisterThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  imgContainer: {
    height: height / 19,
    width: width / 9,
    borderRadius: 30,
    backgroundColor: '#7A25CE',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeaderView: {
    height: height / 9.5,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  blankView: {
    height: height / 240,
    width: width / 4,
    backgroundColor: 'white',
  },
  viewContainer: {
    height: height / 7,
    width: width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainerTwo: {
    height: height / 9,
    width: width / 1.07,
    backgroundColor: '#7A25CE',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
  },
  imgCheckView: {
    height: height / 18,
    width: width / 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chooseContainer: {
    height: height / 16,
    width: width / 1,
    justifyContent: 'center',
  },
  chooseTxtView: {
    fontSize: height / 45,
    color: 'white',
    width: width / 3.5,
    textAlign: 'right',
  },
  touchContainer: {
    height: height / 9,
    width: width / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingContainer: {
    height: height / 11.8,
    width: width / 2.18,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bankView: {
    height: height / 11.8,
    width: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankTxtView: {
    height: height / 11.8,
    width: width * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankViewTwo: {
    height: height / 11.8,
    width: width * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankTxtViewTwo: {
    height: height / 11.8,
    width: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

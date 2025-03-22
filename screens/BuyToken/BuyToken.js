import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {AppView, AppText} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {BackArrow, bell} from '../../assets/icon';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-material-dropdown';
const {height, width} = Dimensions.get('screen');
import TabNavigator from '../../Navigator/TabNavigator';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let data3 = [
  {
    value: '--Select currency--',
  },

  {
    value: 'USD',
  },
  {
    value: 'BITCOIN',
  },
  {
    value: 'ETHEREUM',
  },
  {
    value: 'RIPPLE',
  },
];

const FirstRoute = props => {
  console.log('my props4', props.props);
  return (
    <View style={styles.FirstRouteMainView}>
      <View style={styles.FirstrouteOneView}>
        <View style={styles.TokenView}>
          <Text
            style={{fontSize: height / 30, color: 'white', fontWeight: '700'}}>
            1 Token A=$10
          </Text>
        </View>
        <View style={styles.buytokenVIewmain}>
          <View style={styles.BuyForView}>
            <Text
              style={{
                fontSize: height / 55,
                color: 'white',
                fontWeight: '700',
              }}>
              BUY FOR
            </Text>
          </View>
          <View style={styles.BuyforInputView}>
            {/* <View style={styles.textInput1View}>
          {/* <TextInput
            style={{fontSize: height / 55, color: 'black'}}
           
            placeholderTextColor="black"
            placeholder=""
          
            /> */}

            {/* </View> */}

            <Dropdown
              inputContainerStyle={{
                height: height / 20,
                width: width * 0.7,
                paddingTop: 15,
                borderBottomColor: 'transparent',
                borderBottomWidth: 1,
                alignSelf: 'center',
              }}
              containerStyle={{
                width: width * 0.7,
                // height: 40,
                // backgroundColor:"red"
              }}
              itemTextStyle={{color: 'white'}}
              selectedItemColor={'black'}
              placeholder="Select Currency"
              placeholderTextColor="grey"
              textColor="grey"
              data={data3}
            />
          </View>
          <View style={styles.QuantityView}>
            <Text
              style={{
                fontSize: height / 55,
                color: 'white',
                fontWeight: '700',
              }}>
              QUANTITY
            </Text>
          </View>
          <View style={styles.QuantityInputView}>
            <View style={styles.textInput2View}>
              <TextInput
                style={{fontSize: height / 55, color: 'black'}}
                keyboardType="number-pad"
                placeholderTextColor="black"
                placeholder=""></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.ButtonMainView}>
          <TouchableOpacity
            onPress={() => props.props.navigation.navigate('FiatWallet')}>
            <View
              style={{
                height: height / 19,
                width: width / 2.2,
                backgroundColor: 'green',
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: height / 55,
                  color: 'white',
                  fontWeight: '700',
                }}>
                BUY TOKEN
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* error part */}
      </View>
    </View>
  );
};

const SecondRoute = props => {
  return (
    <View style={styles.FirstRouteMainView}>
      <View style={styles.FirstrouteOneView}>
        <View style={styles.TokenView}>
          <Text
            style={{fontSize: height / 30, color: 'white', fontWeight: '700'}}>
            1 Token A=$10
          </Text>
        </View>
        <View style={styles.buytokenVIewmain}>
          <View style={styles.BuyForView}>
            <Text
              style={{
                fontSize: height / 55,
                color: 'white',
                fontWeight: '700',
              }}>
              REEDEM FOR
            </Text>
          </View>

          <View style={styles.BuyforInputView}>
            {/* <View style={styles.textInput1View}>
         {/* <TextInput
           style={{fontSize: height / 55, color: 'black'}}
          
           placeholderTextColor="black"
           placeholder=""
         
           /> */}

            {/* </View> */}

            <Dropdown
              inputContainerStyle={{
                height: height / 20,
                width: width * 0.7,
                paddingTop: 15,
                borderBottomColor: 'transparent',
                borderBottomWidth: 1,
                alignSelf: 'center',
              }}
              containerStyle={{
                width: width * 0.7,
                // height: 40,
                // backgroundColor:"red"
              }}
              itemTextStyle={{color: 'white'}}
              selectedItemColor={'black'}
              placeholder="Select Currency"
              placeholderTextColor="grey"
              textColor="grey"
              data={data3}
            />
          </View>
          <View style={styles.QuantityView}>
            <Text
              style={{
                fontSize: height / 55,
                color: 'white',
                fontWeight: '700',
              }}>
              QUANTITY
            </Text>
          </View>
          <View style={styles.QuantityInputView}>
            <View style={styles.textInput2View}>
              <TextInput
                keyboardType="number-pad"
                style={{fontSize: height / 55, color: 'black'}}
                placeholderTextColor="black"
                placeholder=""></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.ButtonMainView}>
          <TouchableOpacity
            onPress={() => props.props.navigation.navigate('FiatWallet')}>
            <View
              style={{
                height: height / 19,
                width: width / 2.2,
                backgroundColor: 'green',
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: height / 55,
                  color: 'white',
                  fontWeight: '700',
                }}>
                REEDEM TOKEN
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* error part */}
      </View>
    </View>
  );
};

const ThirdRoute = () => {
  return (
    <View
      style={{
        height: height / 1.6,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: height / 45, color: 'black', fontWeight: '700'}}>
        Oops ! No Recent History Available 🤔{' '}
      </Text>
    </View>
  );
};

const BuyToken = props => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'BUY TOKEN'},
    {key: 'second', title: 'REEDEM TOKEN'},
    {key: 'third', title: 'HISTORY'},
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute props={props} />,
    second: () => <SecondRoute props={props} />,
    third: () => <ThirdRoute props={props} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'grey',
        alignSelf: 'center',
        height: 5,
        color: 'green',
      }}
      style={{backgroundColor: '#7A25CE'}}
      renderLabel={({route, focused, color}) => (
        <Text style={{fontSize: height / 60, color: 'white'}}>
          {route.title}
        </Text>
      )}></TabBar>
  );

  return (
    <SafeAreaView>
      <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
            backgroundColor: 'red',
          }}>
          <Header
            head={false}
            backImage={BackArrow}
            headerText2={'Buy Token'}
            finalImage={bell}
            onPress2={() => props.navigation.goBack()}
            // onPress2={()=>navigation.goBack()}
            // onPress1={() => props.navigation.navigate('Login')}
          />
        </AppView>
        <AppView style={styles.firstContainer}>
          <AppView style={styles.firstOneView}>
            <AppView style={styles.AvailablebalanceView}>
              <AppText
                style={{
                  fontSize: height / 60,
                  color: 'white',
                  fontWeight: '700',
                }}>
                Available Balance
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.firstTwoView}>
            <AppText style={{fontSize: height / 30, color: 'white'}}>
              1000 TOKEN
            </AppText>
          </AppView>
          <AppView style={styles.firstThreeView}>
            <AppText style={{fontSize: height / 60, color: 'white'}}>
              Value in USD: $1753
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.Secondcontainer}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            contentContainerStyle={{backgroundColor: 'red'}}
            inactiveColor="black"
            activeColor="brown"
            renderTabBar={renderTabBar}
          />
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default BuyToken;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#f5f5f5',
    // backgroundColor:"red"
  },
  firstContainer: {
    height: height / 6.5,
    width: width / 1,
    backgroundColor: '#7A25CE',
  },
  firstOneView: {
    height: height / 17.5,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  firstTwoView: {
    height: height / 18,
    width: width / 1,
    // backgroundColor:"green",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  firstThreeView: {
    height: height / 25,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvailablebalanceView: {
    height: height / 24,
    width: width / 1.1,
    // backgroundColor: 'grey',
    borderRadius: 25,
    borderColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Secondcontainer: {
    height: height / 1.61,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstRouteMainView: {
    height: height / 1.7,
    width: width / 1,
    backgroundColor: '#f5f5f5',
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  FirstrouteOneView: {
    height: height / 2.2,
    width: width / 1.1,
    backgroundColor: '#7A25CE',
    borderRadius: 20,
  },
  TokenView: {
    height: height / 12,
    width: width / 1.1,
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buytokenVIewmain: {
    height: height / 4.5,
    // backgroundColor:"red",
    width: width / 1.1,
    alignItems: 'center',
  },
  BuyForView: {
    height: height / 21,
    width: width / 1.3,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  BuyforInputView: {
    height: height / 17,
    width: width / 1.3,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  QuantityView: {
    height: height / 21,
    width: width / 1.3,
    // backgroundColor:"green",
    justifyContent: 'center',
  },
  QuantityInputView: {
    height: height / 17,
    width: width / 1.3,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  textInput1View: {
    height: height / 18,
    width: width / 1.8,
    // backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  DropDownView: {
    height: height / 18,
    width: width / 5.1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  textInput2View: {
    height: height / 18,
    width: width / 1.31,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  ButtonMainView: {
    height: height / 13,
    // backgroundColor:"green",
    width: width / 1.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

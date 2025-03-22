import React from 'react'
import { StyleSheet, Text, View ,Dimensions,TextInput,TouchableOpacity, ScrollView, SafeAreaView} from 'react-native'
import {
    AppView,
    AppText,
    AppImage,
    AppTouchable,
    AppTextInput
  } from '../../../components/Atom/atom';
  const {height, width} = Dimensions.get('screen');
  import Header from '../../../components/molecules/Header';
  import {Dropdown} from 'react-native-material-dropdown';
  import {BackArrowTwo, Star,qrcode,copy,card,Mastero,visa,information,} from '../../../assets/icon';
import App from '../../../../OtpTestApi';

// import { TouchableOpacity } from 'react-native-gesture-handler';

let data3 = [
  {
    value:'----- Choose Your Wallet ------ '
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
  {
    value: 'STELLER',
  },
  {
    value: 'NEO',
  },
  {
    value: 'CARDANO',
  },
];

const WidrawYourAmount = (props) => {
    return (
      <SafeAreaView>
        <AppView style={styles.MainConatiner}>
           <AppView
          style={{
            height: height / 17,
            width: width / 1,
            // backgroundColor: 'yellow',
          }}>
          <Header head={false} backImage={BackArrowTwo} headerText2="Add Money" 
                  onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <ScrollView>
        <AppView style={styles.FirstContainer}>
          <AppView style={styles.ImagecardView}>
            <AppImage
              resizeMode="contain"
              style={styles.cardImage}
              source={card}></AppImage>
          </AppView>
          <AppView
            style={styles.BalanceView}>
                <AppText style={styles.BalanceText}>Balance :   550.00 $</AppText>
            </AppView>
        </AppView>
        <AppView style={styles.SecondContainer}>
          <AppView style={styles.SecondfirstView}>
              <AppView style={styles.WidrawView}>
              <AppText style={styles.WidrawText}>Withdrawable Balance :   500.00 $</AppText>
              </AppView>
              <AppView style={styles.informationImageView}>
                  <TouchableOpacity>
                  <AppImage resizeMode="contain" style={styles.informationImage} source={information}></AppImage>
                  </TouchableOpacity>
                  
              </AppView>
          </AppView>
          <AppView style={styles.SecondtwoView}>
              <AppView style={styles.TextInputView}>
              <TextInput keyboardType="number-pad" placeholderTextColor="grey" style={styles.Textinput1} placeholder=""></TextInput>
              </AppView>
          </AppView>
          <AppView style={styles.SecondthreeView}>
          <AppText style={styles.ChooseText}>Choose Your Wallet</AppText>
          </AppView>
          <AppView style={styles.SecondfourView}>
          <AppView style={styles.TextinputView2}>
             
              <Dropdown
              inputContainerStyle={{
                height: height/20,
                width: width*0.750,
                paddingTop: 9,
                borderBottomColor: 'transparent',
                borderBottomWidth:1,
                paddingHorizontal:3
              }}
              containerStyle={{
                width: width * 0.75,
                height: 40,
                // backgroundColor:"red"
              }}
              itemTextStyle={{color: 'white'}}
              selectedItemColor={'black'}
              placeholder="USD"
              placeholderTextColor="grey"
              textColor="black"
              data={data3}
            />
          
             
             
               </AppView>
          </AppView>
        
       
        </AppView>

        <AppView style={styles.ThirdContainer}>
        <TouchableOpacity>
          <AppView style={styles.buttonView}>
            <AppText style={styles.Confirmtext}>Withdraw</AppText>
          </AppView>
        </TouchableOpacity>
        </AppView>
        </ScrollView>
       
        </AppView>
        </SafeAreaView>
    )
}

export default WidrawYourAmount

const styles = StyleSheet.create({
    MainConatiner:{
        height:height/1,
        width:width/1,
        backgroundColor:"#rgb(245,245,245)"
    },
    FirstContainer: {
        height: height / 3.2,
        width: width / 1,
        backgroundColor: '#rgb(255,255,255)',
      },
      ImagecardView: {
        height: height / 5,
        width: width / 1,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardImage:{
          height: height / 8, 
          width: width / 2.3
        },
        BalanceText:{
            fontSize:height/35,
            fontWeight:"700",
            color:"#rgb(48,44,44)"
        },
        BalanceView:{
            height: height / 14,
            width: width / 1,
            // backgroundColor: 'red',
            alignItems:"center"
          },
          SecondContainer: {
            height: height / 3.2,
            width: width / 1,
            // backgroundColor: 'red',
          },
          SecondfirstView:{
              height:height/18,
              width:width/1,
            //   backgroundColor:"green",
            //   justifyContent:"flex-end",
              flexDirection:"row"
          },
          SecondtwoView:{
              height:height/10,
              width:width/1,
            //   backgroundColor:"yellow",
              alignItems:"center",
              justifyContent:"center"
          },
          SecondthreeView:{
            height:height/22,
            width:width/1,
            // backgroundColor:"black",
            justifyContent:"center"
          },
          SecondfourView:{
            height:height/12,
            width:width/1,
            // backgroundColor:"yellow",
            alignItems:"center",
            justifyContent:"center"
          },
          WidrawView:{
              height:height/18,
            width:width/1.2,
            // backgroundColor:"green",
            justifyContent:"flex-end",
        },
        WidrawText:{
            fontSize:height/55,
            color:"black",
            marginHorizontal:19
        },
        informationImageView:{
            height:height/18,
            width:width/6.2,
            // backgroundColor:"red",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    informationImage:{
        height:height/40,
        width:width/18
    },
    TextInputView:{
        height:height/14,
        width:width/1.1,
        backgroundColor:"white",
    borderRadius:10,
    borderWidth:1,
    borderColor:"grey",
    alignItems:"center",
    justifyContent:"center"
},
ChooseText:{
    fontSize:height/55,
    color:"grey",
    marginHorizontal:19
},
TextinputView2:{
    height:height/14,
    width:width/1.1,
    backgroundColor:"white",
borderRadius:10,
borderWidth:1,
borderColor:"grey",
flexDirection:"row",
alignItems:"center",
justifyContent:"center"
},
Textinput1:{
    // backgroundColor:"green",
fontSize:height/55,
color:"black",
width:width/1.3
},
DropdownView:{
    height:height/14,
    width:width/12,
    backgroundColor:"blue",
alignItems:"center",
justifyContent:"center"
},
dropdownImage:{
    height:height/70,
    width:width/35
},
TextinputViewMain:{
    height:height/14,
    width:width/1.22,
    backgroundColor:"red",
justifyContent:"center",
alignItems:"center"
},
Textinput2:{
    // backgroundColor:"green",
fontSize:height/55,
color:"black",
width:width/1.3
},
ThirdContainer:{
    height:height/8,
    width:width/1,
    // backgroundColor:"red",
    alignItems:"center",
    justifyContent:"flex-end"
},
buttonView: {
    height: height / 15,
    width: width / 1.35,
    backgroundColor: 'rgb(94,28,159)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Confirmtext: {
    color: 'white',
    fontSize: height / 40,
  },


     
})
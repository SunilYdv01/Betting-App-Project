import React from 'react'
import { StyleSheet, Text, View,Dimensions,TextInput,TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import {
    AppView,
    AppText,
    AppImage,
    AppTouchable,
    AppTextInput
  } from '../../../components/Atom/atom';
  const {height, width} = Dimensions.get('screen');
  import Header from '../../../components/molecules/Header';
  import {BackArrow, Star,qrcode,copy,card,Mastero,visa} from '../../../assets/icon';
  import {Dropdown} from 'react-native-material-dropdown';
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
  

const DepositAmountMoney = (props) => {
    return (
        <SafeAreaView>
        <AppView style={styles.MainContainer}>
        <AppView
          style={{
            height: height / 17,
            width: width / 1,
            backgroundColor: 'yellow',
          }}>
          <Header head={false} backImage={BackArrow} headerText2="Add Money"
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
                <AppText style={styles.BalanceText}>Balance :   0.00 $</AppText>
            </AppView>
        </AppView>
        <AppView style={styles.SecondContainer}>
          <AppView style={styles.cardView}>
            <AppText style={styles.cardtext}>Enter Amount</AppText>
          </AppView>
          <AppView style={styles.FirstTextinputmain}>
            <AppView style={styles.Textinput1View}>
            <TextInput
            keyboardType="numeric"
                style={styles.inputText2}
                placeholderTextColor="black"
                placeholder=""></TextInput>
            </AppView>
          </AppView>
        </AppView>
        <AppView style={styles.ThirdContainer}>
          <AppView style={styles.cardView}>
            <AppText style={styles.cardtext}>Choose Wallet</AppText>
          </AppView>
          <AppView style={styles.FirstTextinputmain}>
            <AppView style={styles.Textinput1View}>
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
        <AppView style={styles.FourthContainer}>
            <TouchableOpacity     onPress={() => props.navigation.navigate("ChooseYourCard")}>
            <AppText style={{fontSize:height/48,color:"rgb(94,28,159)",marginHorizontal:18,borderColor:"rgb(94,28,159)", borderBottomWidth:1,width:width/1.73}}>+ Add Balance Through card</AppText>
            </TouchableOpacity>
            
        </AppView>
        <AppView style={styles.FifthContainer}>
            <TouchableOpacity>
          <AppView style={styles.buttonView}>
            <AppText style={styles.Confirmtext}>Confirm</AppText>
          </AppView>
        </TouchableOpacity>
        </AppView>
        </ScrollView>
        
        </AppView>
        </SafeAreaView>
    )
}

export default DepositAmountMoney

const styles = StyleSheet.create({
    MainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#rgb(245, 245, 245)',
      },
      FirstContainer: {
        height: height / 3.2,
        width: width / 1,
        backgroundColor: '#rgb(255,255,255)',
      },
      SecondContainer: {
        height: height / 6.7,
        width: width / 1,
        // backgroundColor: 'red',
      },
      cardView: {
        height: height / 20,
        width: width / 1,
        // backgroundColor:"yellow",
        justifyContent: 'flex-end',
      },
      FirstTextinputmain: {
        height: height / 9,
        width: width / 1,
        // backgroundColor:"green",
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardtext: {
        fontSize: height / 50,
        // fontWeight: '700',
        // width: width / 2.35,
        // backgroundColor:"grey",
        // textAlign:"right",
        marginHorizontal: 18,
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
          inputText2: {
            color: 'black',
            fontSize: height / 53,
            width: width / 1.3,
              // backgroundColor: 'green',
          },
          Textinput1View:{
              height:height/13,
            width:width/1.1,
            backgroundColor:"white",
            borderRadius:10,
            borderColor:"grey",
          borderWidth:1,
          alignItems:"center",justifyContent:"center"
        },
        ThirdContainer: {
            height: height / 6.7,
            width: width / 1,
            // backgroundColor: 'red',
          },
          FourthContainer:{
            height:height/18,
            width:width/1 ,
         //    backgroundColor:"yellow",
            justifyContent:"center"
         },
         FifthContainer:{
             height:height/10,
             width:width/1 ,
             // backgroundColor:"red",
             justifyContent:"center",
             alignItems:"center"
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
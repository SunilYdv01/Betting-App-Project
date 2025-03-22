
import React from 'react'
import { Dimensions, StyleSheet, Text, View,TouchableOpacity,Image,FlatList, SafeAreaView } from 'react-native'
import Header from '../../../components/molecules/Header';
import {BackArrow,plus,bargraph} from '../../../assets/icon'
import { AppView,AppText, } from '../../../components/Atom/atom';
const {height,width}=Dimensions.get("screen")

const DATA = [
    {
      img: require("../../../assets/images/redicon/redicon.png"),
      amount: '$ 204',
      progress: 'Send',
      date: 'Aug 19, 2019',
    },
    {
      img: require("../../../assets/images/greenicon/greenicon.png"),
      amount: '$ 204',
      progress: 'Deposited',
      date: 'Aug 19, 2019',
    },
    {
      img: require("../../../assets/images/redicon/redicon.png"),
      amount: '$ 204',
      progress: 'Withdrawn',
      date: 'Aug 19, 2019',
    },
    {
      img: require("../../../assets/images/greenicon/greenicon.png"),
      amount: '$ 204',
      progress: 'Send',
      date: 'Aug 19, 2019',
    },
    {
      img: require("../../../assets/images/redicon/redicon.png"),
      amount: '$ 204',
      progress: 'Deposited',
      date: 'Aug 19, 2019',
    },
    
  ];

const FiatWallet = (props) => {
    return (
        <SafeAreaView>
        <View style={styles.SecondMainContainer}>
            <AppView style={{height:height/17,width:width/1,backgroundColor:"red"}}>
            <Header
          head={false}
          headerText2={' Fiat Wallet'}
          backImage={BackArrow}
        
          onPress2={() =>props.navigation.goBack()}
        />
            </AppView>
<View style={styles.SecondfirstView}>
<View style={styles.SecondFirstOneView}>
        <Text style={{fontSize:height/27,color:"white",fontWeight:"700"}}>$ 11,760.93</Text>
    </View>
    <View style={styles.SecondFirstTwoView}>
    <Text style={{fontSize:height/58,color:"white"}}>Total Balance</Text>
    </View>
    <View style={styles.SecondFirstThreeView1}>
        <TouchableOpacity>
        <View style={styles.DepositView}>
            <Image style={{height:height/60,width:width/30,paddingVertical:13}} source={plus}></Image>
            <Text style={{fontSize:height/70,color:"grey"}}>Deposit</Text>
        </View>
        </TouchableOpacity>
      
   
        <TouchableOpacity> 
        <View style={styles.BitGraphView}>
            <Image resizeMode="contain" style={{height:height/30,width:width/30,paddingVertical:13}} source={bargraph}></Image>
            <Text style={{fontSize:height/70,color:"grey"}}>Withdraw</Text>
      
            </View>
        </TouchableOpacity>
        

    </View>
</View>
<View style={styles.SecondTwoView}>
<Text style={{fontSize:height/45,color:"black",fontWeight:"700"}}>Recent Transitions :</Text>

</View>
<View style={styles.SecondThreeView}>


<FlatList
  showsVerticalScrollIndicator={false}
  data={DATA}
  renderItem={({item})  => (

    <View  style={styles.item}>
    <View style={styles.imageView}>
      <Image
        resizeMode="contain"
        style={styles.imagestyle} source={item.img}/>
    </View>
    <View style={styles.amountView}>
      <Text style={styles.AmountText}>{item.amount}</Text>
    </View>
    <View style={styles.progressView}>
      <Text style={styles.progressText}>{item.progress}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  </View>
 
  )}
/>



</View>
<View style={styles.SecondFourView}>
    <TouchableOpacity  onPress={() => props.navigation.navigate('AllTransaction')} >
    <Text style={{fontSize:height/60,color:"#7A25CE"}}>Show All Transaction</Text>
    </TouchableOpacity>
  
</View>
</View>
</SafeAreaView>
    )
}

export default FiatWallet

const styles = StyleSheet.create({

    SecondMainContainer:{
        height:height/1,
        width:width/1,
        backgroundColor:"white"
    },
    SecondfirstView:{
        height:height/4,
        width:width/1,
        backgroundColor:"#rgb(128, 196, 28)",
     
    },
    SecondfirstView1:{
      height:height/7.5,
      width:width/1,
      backgroundColor:"#rgb(128, 196, 28)",
      // backgroundColor:"red",
      justifyContent:"center",
      alignItems:"center"
  },
    SecondFirstOneView:{
        height:height/11,
        width:width/1,
        // backgroundColor:"blue",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    SecondFirstOneView1:{
      height:height/13,
      width:width/1,
      // backgroundColor:"blue",
      justifyContent:"center",
      alignItems:"center"
    },
SecondFirstTwoView:{
    height:height/22,
    width:width/1,
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center"
},
SecondFirstThreeView1:{
    height:height/10,
    width:width/1,
    // backgroundColor:"#7A25CE",
    // backgroundColor:"cyan",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
},
DepositView:{
    height:height/14,
    width:width/5,
    backgroundColor:"white",
    borderRadius:8,
    borderWidth:0.7,
    borderColor:"grey",
    marginHorizontal:15,
    alignItems:"center",
    justifyContent:"center"
},
BitGraphView:{
    height:height/14,
    width:width/5,
    backgroundColor:"white",
    borderRadius:8,
    borderWidth:0.7,
    borderColor:"grey",
    alignItems:"center",
    justifyContent:"center"
},
SecondTwoView:{
    height:height/18,
    width:width/1,
    // backgroundColor:"red",
    justifyContent:"center",
    paddingHorizontal:15
},
item: {
    // flex:1,
    width: width / 1.08,
    marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    borderRadius: 10,
    borderColor:"grey",
    borderWidth:0.8,
    // justifyContent:"center"
  },
  imagestyle: {
    height: height / 22,
    width: width / 9,
  },
  AmountText: {
    fontSize: height / 58,
    marginHorizontal: 10,
  },
  imageView: {
    height: height / 12,
    width: width / 7,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountView: {
    height: height / 16,
    width: width / 4,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  progressView: {
    height: height / 12,
    width: width / 2,
    // backgroundColor:"green",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateText:{
    fontSize:height/65
  },
  progressText:{
    fontSize:height/55,
    color:"green",
    marginVertical:3
  },
  SecondThreeView:{
      height:height/2.08,
    width:width/1,
    // backgroundColor:"red",
    alignItems:"center"
},
SecondFourView:
{
    height:height/16,
    width:width/1,
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center"
},
SecondThreeView1:{
  height:height/3,
  width:width/1,
  // backgroundColor:"red",
  alignItems:"center"
},
SecondFourView1:{
  height:height/5.2,
  width:width/1,
  // backgroundColor:"blue",
  justifyContent:"center",
  alignItems:"center"
},
SecondFiveView1:{
  height:height/25,
  width:width/1,
  // backgroundColor:"green",
  justifyContent:"center",
  alignItems:"center"
},
})




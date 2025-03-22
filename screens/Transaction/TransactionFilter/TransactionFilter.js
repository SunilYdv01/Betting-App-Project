import React,{useState} from 'react'
import { Dimensions, StyleSheet, Text, View,FlatList,Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { AppImage,AppView,AppText } from '../../../components/Atom/atom'
import Header from '../../../components/molecules/Header'
import {BackArrow,close,printer} from "../../../assets/icon"
const {height,width}=Dimensions.get("screen")
const DATA = [
    {
      img: require("../../../assets/images/redicon/redicon.png"),
      amount: '$ 204',
      progress: 'Send',
      date: 'Aug 19, 2019',
      isTransaction:true
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
      isTransaction:true
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
      isTransaction:true
    },
    {
        img: require("../../../assets/images/greenicon/greenicon.png"),
        amount: '$ 204',
        progress: 'Send',
        date: 'Aug 19, 2019',
        isTransaction:true
      },
      {
        img: require("../../../assets/images/redicon/redicon.png"),
        amount: '$ 204',
        progress: 'Deposited',
        date: 'Aug 19, 2019',
        isTransaction:true
      },
      {
        img: require("../../../assets/images/greenicon/greenicon.png"),
        amount: '$ 204',
        progress: 'Send',
        date: 'Aug 19, 2019',
        isTransaction:true
      },
      {
        img: require("../../../assets/images/redicon/redicon.png"),
        amount: '$ 204',
        progress: 'Deposited',
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
        isTransaction:true
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
      {
        img: require("../../../assets/images/greenicon/greenicon.png"),
        amount: '$ 204',
        progress: 'Send',
        date: 'Aug 19, 2019',
        isTransaction:true
      },
      {
        img: require("../../../assets/images/redicon/redicon.png"),
        amount: '$ 204',
        progress: 'Deposited',
        date: 'Aug 19, 2019',
      },
    
  ];
  const DATA1=[
    {
      type:"Transaction Type",
      img2:require("../../../assets/images/dropdown/dropdown.png")
    },
    {
      type:"Coin",
      img2:require("../../../assets/images/dropdown/dropdown.png")
    },
    {
      type:" Choose Type",
      img2:require("../../../assets/images/dropdown/dropdown.png")
    },
  ];
 

const TransactionFilter = () => {
  const [selectedType, setSelectedType] =  useState('transaction')
  const [transactionList, setTransactionList] =  useState([null])
  const onSelectTransaction =()=>{
    DATA.forEach(item => {
      item.isTransaction ? tempArr.push(item) : null
      })
  }
 
    return (
        <SafeAreaView>
        <AppView style={styles.MainContainer}>
         <AppView style={{height:height/17,width:width/1,backgroundColor:"red"}}>
             <Header head={false} backImage={BackArrow} headerText2={"All Transactions"} favImage={printer} finalImage={close}/>
         </AppView>
         <AppView style={styles.FirstContainer}>
        
          <FlatList
              horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DATA1}
         
          renderItem={({item})=>(
            <TouchableOpacity>
               <View style={styles.item1}>
              <View style={styles.container1}>
              <Text style={styles.typeText} >{item.type}</Text>
              
              </View>
              <Image resizeMode="contain" style={styles.imagestyle1} source={item.img2}></Image>
            
             
            </View>
            </TouchableOpacity>
           
          )}
          />
         </AppView>
         <AppView style={styles.SecondContainer}>
        

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
        </AppView>
        </AppView>
        </SafeAreaView>
    )
}

export default TransactionFilter

const styles = StyleSheet.create({
    MainContainer:{
        height:height/1,
        width:width/1,
        backgroundColor:"white"
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
        fontSize: height / 60,
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
        height: height / 12,
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
      FirstContainer:{
        height:height/12,
        width:width/1,
        // backgroundColor:"green",
        flexDirection:"row",
        alignItems:"center"
      },
      SecondContainer:{
        height:height/1.3,
        width:width/1,
        backgroundColor:"white",
        alignItems:"center"
      },
      item1:{
        //  flex:1,
         width: width / 2.8,
        marginHorizontal:8,
         alignSelf: 'flex-start',
         flexDirection: 'row',
         backgroundColor: 'white',
         alignItems: 'center',
         height: height / 20,
         borderRadius: 25,
         borderColor:"grey",
         borderWidth:0.7,
        //  justifyContent:"center"
      },
      typeText:{
fontSize:height/60,
color:"grey",
// paddingHorizontal:10
      },
      imagestyle1:{
height:height/60,
width:width/30
      },
      container1:{
height:height/20,
width:width/3.3,
// backgroundColor:"red",
justifyContent:"center",
// flexDirection:"row",
alignItems:"center",
// marginHorizontal:7


      }
})
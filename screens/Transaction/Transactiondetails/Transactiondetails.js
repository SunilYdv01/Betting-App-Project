import React,{useState} from 'react';
import {StyleSheet, Text, View, Dimensions,TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../../components/Atom/atom';
import Header from '../../../components/molecules/Header';
import {
  BackArrowTwo,
  Star,
  qrcode,
  copy,
  information,
  printer,
  redicon,
  share
} from '../../../assets/icon';
// import {color} from 'react-native-reanimated';
// import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
// import App from '../../../../OtpTestApi';
const {height, width} = Dimensions.get('screen');
import moment from 'moment';
const Transactiondetails = (props,{navigation,route}) => {
const [transactionExpand,setTransacionExpand] =useState(  props.route.params.transactionExpand ? props.route.params.transactionExpand : null);


console.log("hyyyyyy transaction------",transactionExpand[0]);
  return (
      <SafeAreaView>
    <AppView style={styles.mainContainer}>
      <AppView
        style={{
          height: height / 17,
          width: width / 1,
          //   backgroundColor: 'yellow',
        }}>
        <Header
          head={false}
          backImage={BackArrowTwo}
          headerText2=" Transaction Details"
          finalImage={printer}
          onPress2={() => props.navigation.goBack()}
        />
      </AppView>
      <ScrollView>

      <AppView style={styles.FirstContainer}>
       <AppView style={styles.FirstOneView}>
         {/* <AppText style={styles.WithdrawText}>{transactionExpand[0].txnType}</AppText> */}
         <AppText style={[styles.WithdrawText], {fontSize:height/40,color:transactionExpand.txnType ==="WITHDRAW" ? "green" :"red"}}>
                  
         {transactionExpand[0].txnType}
                  </AppText >
       </AppView>
       <AppView style={styles.FirsttwoView}>

       <AppImage 
                      resizeMode="contain"
                      style={styles.iconImage}
                      source={ transactionExpand.txnType=== "WITHDRAW "  ?    require("../../../assets/images/greenicon/greenicon.png")   :    require("../../../assets/images/redicon/redicon.png")}  
                    />
                 
         {/* <AppImage resizeMode="contain" style={styles.iconImage} source={redicon}></AppImage> */}
       </AppView>
      </AppView>

      <AppView style={styles.SecondContainer}>
       <AppView style={styles.SecondOneView}>
         <AppView style={styles.TimeDateMainView}>
           <AppView style={styles.DateView}>
             <AppText style={styles.dateText}>Date</AppText>
           </AppView>
           <AppView style={styles.TimeView}>
           <AppText style={styles.timeText}>Time</AppText>
           </AppView>
         </AppView>
       </AppView>
       <AppView style={styles.SecondTwoView}>
       <AppView style={styles.TimeDateMainView1}>
           <AppView style={styles.Date1View}>
             <AppText style={styles.date1Text}>
             {moment(transactionExpand[0].txnTime).format('MMMM DD,YYYY')} 
             </AppText>
           </AppView>
           <AppView style={styles.Time1View}>
           <AppText style={styles.time1Text}>{moment(transactionExpand[0].txnTime).format('HH:MM A')} </AppText>
           </AppView>
         </AppView>
       </AppView>
       <AppView style={styles.ThirdContainer}>
         <AppView style={styles.thirdOneView}>
           <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>Total Amount</AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText style={{fontSize:height/50, color:"#rgb(145 ,143, 143)"}}>{transactionExpand[0].units} {transactionExpand[0].coinType}</AppText>
           </AppView>
          
         </AppView>
         <AppView style={styles.thirdTwoView}>
         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>Total Amount ($)</AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText style={{fontSize:height/50, color:"#rgb(145 ,143, 143)"}}>$162345</AppText>
           </AppView>
          
         </AppView>
         <AppView style={styles.thirdThreeView}>
         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>Withdraw Fee</AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText style={{fontSize:height/50, color:"#rgb(145 ,143, 143)"}}>{transactionExpand[0].fees} {transactionExpand[0].coinType}</AppText>
           </AppView>
          
         </AppView>
         <AppView style={styles.thirdFourView}>
         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>Status</AppText>
           </AppView>
           <AppView style={styles.TransactionShareVIew}>
             <AppView style={styles.TransactionView}>
             <AppText style={[styles.WithdrawText1], [{fontSize:height/50,color:transactionExpand.status ==="Deposit" ? "green" :"red"}]}>
                  
                  {transactionExpand[0].status}
                           </AppText >
             {/* <AppText style={{fontSize:height/50, color:"#rgb(55, 211 ,70)"}}>{transactionExpand[0].status}</AppText> */}
             </AppView>
             <AppView style={styles.ShareImageView}>
               <TouchableOpacity>
               <AppImage resizeMode="contain" style={{height:height/36,width:width/18}} source={share}></AppImage>
               </TouchableOpacity>
               
             </AppView>
          
           </AppView>
          
         </AppView>
       </AppView>

       <AppView style={styles.FourthContainer}>
         <AppView style={styles.FourthOneView}>  

         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>Transaction ID</AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText style={{fontSize:height/50, color:"#rgb(145 ,143, 143)"}}>{transactionExpand[0].address}</AppText>
           </AppView>

           </AppView>
         {/* <AppView style={styles.FourthTwoView}>

         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>From </AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText style={{fontSize:height/50, color:"#rgb(145 ,143, 143)"}}>VHGYGKYGFkjhg6348612345</AppText>
           </AppView>

         </AppView> */}
         <AppView style={styles.FourthThreeView}>

         <AppView style={styles.AmountView}>
           <AppText style={{fontSize:height/50,color:"black"}}>To</AppText>
           </AppView>
           <AppView style={styles.BTCView}>
           <AppText numberOfLines={2} ellipsizeMode='tail'renderTruncatedFooter={() => <ReadMoreButton />} style={{fontSize:height/60, color:"#rgb(145 ,143, 143)"}}>{transactionExpand[0].txnHash}</AppText>
           </AppView>

         </AppView>
       </AppView>
      </AppView>
      </ScrollView>
     
    </AppView>
    </SafeAreaView>
  );
};

export default Transactiondetails;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  FirstContainer: {
    height: height / 5,
    width: width / 1,
    backgroundColor: 'white',
  },
  SecondContainer: {
    height: height / 10,
    width: width / 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    //   justifyContent:"center"
  },
  FirstOneView:{
    height:height/14,
    width:width/1,
    // backgroundColor:"green",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  FirsttwoView:{
    height:height/10,
    width:width/1,
    // backgroundColor:"cyan",
    alignItems:"center",
    justifyContent:"center"
  },
  WithdrawText:{
    fontSize:height/38,
    color:"red",
    fontWeight:"700"
  },
  iconImage:{
    height:height/15,
    width:width/6.8,
  },
  SecondOneView:{
    height:height/20,
    width:width/1,
    // backgroundColor:"cyan",
    alignItems:"center"
  },
  SecondTwoView:{
    height:height/20,
    width:width/1,
    // backgroundColor:"green",
  //  justifyContent:"center",
   alignItems:"center"
  },
  TimeDateMainView:{
    height:height/20,
    width:width/1.16,
    // backgroundColor:"green",
    flexDirection:"row"
  },
  TimeView:{
    height:height/20,
    width:width/2.34,
    // backgroundColor:"red",
    justifyContent:"center"
  },
  DateView:{
    height:height/20,
    width:width/2.34,
    // backgroundColor:"blue",
    justifyContent:"center"

  },
  dateText:{
    fontSize:height/50,
    fontWeight:"700",
    color:"#rgb(48 ,44 ,44)"

    
  
  },
  timeText:{
    fontSize:height/50,
      fontWeight:"700",
      color:"#rgb(48 ,44 ,44)"
  },
  TimeDateMainView1:{
    height:height/20,
    width:width/1.16,
    // backgroundColor:"cyan",
    flexDirection:"row",
    borderBottomWidth:1,
    borderColor:"#rgb(145 ,143, 143)"
  },
  Time1View:{
    height:height/20,
    width:width/2.34,
    // backgroundColor:"red",
    justifyContent:"center"
  },
  Date1View:{
    height:height/20,
    width:width/2.34,
    // backgroundColor:"blue",
    justifyContent:"center"

  },
  date1Text:{
    fontSize:height/50,
    fontWeight:"700",
    color:"#rgb(145 ,143, 143)"
  },
  time1Text:{
    fontSize:height/50,
      // fontWeight:"700",
      color:"#rgb(145 ,143, 143)"
  },
  ThirdContainer:{
    height:height/3.5,
    width:width/1,
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center"
  },

  thirdOneView:{
    height:height/15,
    width:width/1.16,
    // backgroundColor:"cyan",
    
  },
  thirdTwoView:{
    height:height/15,
    width:width/1.16,
    // backgroundColor:"green",
   
  },
  thirdThreeView:{
    height:height/15,
    width:width/1.16,
    // backgroundColor:"cyan"
  },
  thirdFourView:{
    height:height/13,
    width:width/1.16,
    // backgroundColor:"blue",
    borderColor:"#rgb(145 ,143, 143)",
    borderBottomWidth:1
  },
  AmountView:{
    height:height/30,
    width:width/1.16,
    // backgroundColor:"white",
    justifyContent:"flex-end"
  },
  BTCView:{
    height:height/30,
    width:width/1.16,
    // backgroundColor:"red",
    justifyContent:"flex-end"
  },
  TransactionShareVIew:{
    height:height/30,
    width:width/1.16,
    // backgroundColor:"red",
    flexDirection:"row",
    
    
  },
  TransactionView:{
    height:height/30,
    width:width/2.1,
    // backgroundColor:"yellow",
    justifyContent:"flex-end"
  },
  ShareImageView:{
    height:height/30,
    width:width/2.3,
    // backgroundColor:"green",
    justifyContent:"flex-end"
  },
  FourthContainer:{
    height:height/5,
    width:width/1,
    // backgroundColor:"green",
    alignItems:"center"
  },
  FourthOneView: {
    height:height/15,
  width:width/1.16,
  // backgroundColor:"cyan",
},
FourthTwoView: {
  height:height/15,
width:width/1.16,
// backgroundColor:"red",
},
FourthThreeView: {
  height:height/15,
width:width/1.16,
// backgroundColor:"cyan",
},
});
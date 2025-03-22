import React,{useState,useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View,TouchableOpacity,Image,FlatList, SafeAreaView} from 'react-native';
import {AppImage, AppText, AppView} from '../../../components/Atom/atom';
import Header from '../../../components/molecules/Header';
import {BackArrow,plus,bargraph} from '../../../assets/icon';
import TabNavigator from "../../../Navigator/TabNavigator"
import {Dropdown} from 'react-native-material-dropdown';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
const {height, width} = Dimensions.get('screen');
const DATA1 = [
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
      progress: 'Send',
      date: 'Aug 19, 2019',
    },
    
];

const CryptoWallet = (props,{navigation,route}) => {

  const [valueDetails,setValueDetails] =useState(  props.route.params.valueDetails ? props.route.params.valueDetails : null);
 const [transactionHistory,setTransactionHistory] =useState()
 const [coinToUsd,setCoinToUsd] =useState()
// alert(props.route.params && props.route.params.index)
  console.log("my------->>>>>>>",valueDetails);


  // const AllTransaction = props => {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [transactionDetails,setTransactionDetails] = useState([]);
  
    useEffect(() => {
      // globalCheckpersonName();
      transactionAllDetails();
      availbalebalancecointousd();
    }, []);
  
    const transactionAllDetails= async () => { 
     
      const value = await AsyncStorage.getItem('token');
      console.log('====== my token======>>>>', value);

      axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/wallet/wallet/get-all-transaction-history?coinName=${valueDetails.instrument}`,
    
      
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
     
      })
      .then(res => {
        if (res.status === 200) {
        
          console.log('transactionCryptoWallet ------------- >>>>>', res.data.data.resultlist);
  
         setTransactionHistory(res.data.data.resultlist)
         console.log("transactionCryptoWallet111111111 ------------- >>>>>",transactionHistory)
        } else {
          alert('Something went wrong');
        }
        })
         .catch(err => console.log('error catch---->>>>', err));
      };


      const availbalebalancecointousd = async () => { 
     
        const value = await AsyncStorage.getItem('token');
        console.log('====== my token======>>>>', value);
  
        axios({
        method: 'get',
        url: `https://java-create-token.mobiloitte.org/wallet/wallet/get-balance-in-usd?coinName=${valueDetails.instrument}`,
      
        
        headers: {
          Authorization: `Bearer ${value}`,
          'content-type': 'application/json',
        },
       
        })
        .then(res => {
          if (res.status === 200) {
            
            console.log('balance in usd  ------------- >>>>>', res.data);
            // console.log('transactionDetails ------------- >>>>>', res.data.data.resultlist[0]);
  
            
       setCoinToUsd(res.data.data)
       console.log("balance in usd 11111111-------- >>>>", coinToUsd);
          } else {
            alert('Something went wrong');
          }
          })
           .catch(err => console.log('error catch---->>>>', err));
        };


  return (
      <SafeAreaView>
    <AppView style={styles.mainContainer}>
      <AppView
        style={{
            height: height / 17,
             width: width / 1, 
            //  backgroundColor: 'red'
             }}>
        <Header head={false} backImage={BackArrow} headerText2={'My Wallet'}
         onPress2={() =>props.navigation.goBack()}
      
        />
      </AppView>
      <AppView style={styles.firstContainer}>
 <AppView style={styles.firstOneView}>
 {/* <Dropdown
              inputContainerStyle={{
                height: height/20,
                width: width*0.350,
                paddingTop: 9,
                borderBottomColor: 'transparent',
                borderBottomWidth:1,
                paddingHorizontal:20
              }}
              containerStyle={{
                width: width * 0.35,
                // height: 40,
                // backgroundColor:"red"
              }}
              itemTextStyle={{color: 'white'}}
              selectedItemColor={'black'}
              placeholder="USD"
              placeholderTextColor="black"
              textColor="white"
              data={data3}
            /> */}
             <AppText style={{fontSize:height/50,color:"white"}}> {valueDetails.coinName}</AppText>
              <AppText style={{fontSize:height/25,color:"white",fontWeight:"700"}}>$ {coinToUsd}</AppText>
 </AppView>
 
 <AppView style={styles.firstTwoView}>
 <LineChart
    data={{
      labels: ["Day","Week","Month","Year","All"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={width/1} // from react-native
    height={height/4.7}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#7A25CE",
      backgroundGradientFrom: "#7A25CE",
      backgroundGradientTo: "#7A25CE",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        // borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical:10,
    //   borderRadius: 16
    }}
  />
 </AppView>


      </AppView>
      <AppView style={styles.SecondContainer}>
            <TouchableOpacity 
              onPress={() => {
                // navigation.navigate("Login")
                props.navigation.navigate({
                  name: 'DepositCryptoCoin',
                  params: {walletdata:valueDetails ,newData:coinToUsd },
                  // merge: true,
                });
              }}
            
            
            // onPress={() => props.navigation.navigate('DepositCryptoCoin')}
            >
            <AppView style={styles.DepositView}>
                <Image style={{height:height/60,width:width/30,paddingVertical:13}} source={plus}></Image>
                <Text style={{fontSize:height/70,color:"grey"}}>Deposit</Text>
            </AppView>
            </TouchableOpacity>
          
       
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Login")
                props.navigation.navigate({
                  name: 'WithdrawYourCoin',
                  params: {withdrawData:valueDetails , newAmount:coinToUsd },
                  // merge: true,
                });
              }} > 
            <AppView style={styles.BitGraphView}>
                <Image resizeMode="contain" style={{height:height/30,width:width/30,paddingVertical:13}} source={bargraph}></Image>
                <Text style={{fontSize:height/70,color:"grey"}}>Withdraw</Text>
          
                </AppView>
            </TouchableOpacity>
        </AppView>
        <View style={styles.ThirdContainer}>
            <Text style={{fontSize:height/45,color:"black",fontWeight:"700"}}>Latest Transitions :</Text>
        </View>
        <AppView style={styles.fourthContainer}>


        { transactionHistory > 0 ? <FlatList
      showsVerticalScrollIndicator={false}
      data={transactionList}
      renderItem={({item})  => 
       {
         if (index > 3){
           return null
         }
         return<TouchableOpacity 
  
         >
              <View  style={styles.item}>
              <View style={styles.imageView}>
              <Image
                            resizeMode="contain"
                            style={styles.imagestyle}
                            source={    transactionHistory.txnType=== "WITHDRAW"  ?    require("../../../assets/images/greenicon/greenicon.png")   :    require("../../../assets/images/redicon/redicon.png")}  
                          />
        </View>
        <View style={styles.amountView}>
        <Text style={styles.AmountText}>{item.units} {item.coinType}</Text>
        </View>
        <View style={styles.progressView}>
        <Text style={[styles.progressText], {color:transactionHistory.txnType ==="WITHDRAW" ? "green" :"red"}}>
                        
                        {item.txnType}
                        </Text>
                        <Text style={styles.dateText}>
                          
                          {/* {item.txnTime} */}
                            {moment(item.txnTime).format('MMMM DD,YYYY')} 
                            </Text>
              </View>
            </View>
            </TouchableOpacity>
           
            }
       }
   
    /> :
     <View style={{height:height/4,width:width/1,backgroundColor:"#00000010",justifyContent:"center",alignItems:"center"}}>
           <Text style={{fontSize:height/40,color:"black"}}>No Recent Transaction</Text>
        </View> }



  
        </AppView>
       
        <AppView style={styles.fifthContainer}>
        <TouchableOpacity  onPress={() => props.navigation.navigate('AllTransaction')}>
        <AppText style={{fontSize:height/55,color:"#7A25CE"}}>Show All Transaction</AppText>
        </TouchableOpacity>
           
        </AppView>
        {/* <AppView style={styles.sixthContainer}>
            {/* <TabNavigator/> */}
        {/* </AppView>  */}
    </AppView>
    </SafeAreaView>
  );
};

export default CryptoWallet;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    backgroundColor: 'white',
    width: width / 1,
  },
  firstContainer:{
      height:height/3,
      width:width/1,
      backgroundColor:"white"
  },
  SecondContainer:{
    height:height/10,
    width:width/1,
    backgroundColor:"#7A25CE",
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
    // borderColor:"grey",
    alignItems:"center",
    justifyContent:"center"
},
ThirdContainer:{
    height:height/15,
    width:width/1,
    // backgroundColor:"red",
    justifyContent:"center",
    paddingHorizontal:18,
    position:"relative"
},
fourthContainer:{
    height:height/3.50,
    width:width/1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
},
fifthContainer:{
    height:height/17,
    width:width/1,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center"
},
sixthContainer:{
    height:height/12.7,
    width:width/1,
    // backgroundColor:"white"
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
  firstOneView:{
height:height/9,
width:width/1,
backgroundColor:"#7A25CE",
justifyContent:"center",
alignItems:"center",
// borderColor:"grey",
// borderTopWidth:1
// borderWidth:1,
// borderRadius:20
  },
  firstTwoView:{
    height:height/15,
    width:width/1,
    backgroundColor:"#7A25CE"
  },
  firstThreeView:{

  },
});
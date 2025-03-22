import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../../components/Atom/atom';
import Header from '../../../components/molecules/Header';
import {BackArrow, plus, bargraph} from '../../../assets/icon';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Loader from '../../../components/Loader';

// const DATA = [
//     {
//       img: require("../../../assets/images/redicon/redicon.png"),
//       amount: '$ 204',
//       progress: 'Send',
//       date: 'Aug 19, 2019',
//     },
//     {
//       img: require("../../../assets/images/greenicon/greenicon.png"),
//       amount: '$ 204',
//       progress: 'Deposited',
//       date: 'Aug 19, 2019',
//     },
//     {
//       img: require("../../../assets/images/redicon/redicon.png"),
//       amount: '$ 204',
//       progress: 'Withdrawn',
//       date: 'Aug 19, 2019',
//     },
//     {
//       img: require("../../../assets/images/greenicon/greenicon.png"),
//       amount: '$ 204',
//       progress: 'Send',
//       date: 'Aug 19, 2019',
//     },
//     {
//       img: require("../../../assets/images/redicon/redicon.png"),
//       amount: '$ 204',
//       progress: 'Deposited',
//       date: 'Aug 19, 2019',
//     },

//   ];

// const DATA1 = [
//   {
//     img: require("../../../assets/images/redicon/redicon.png"),
//     amount: '$ 204',
//     value:"0.8934 BTC",
//     progress: 'Send',
//     date: 'Aug 19, 2019',
//   },
//   {
//     img: require("../../../assets/images/greenicon/greenicon.png"),
//     amount: '$ 204',
//     value:"0.8934 BTC",
//     progress: 'Deposited',
//     date: 'Aug 19, 2019',
//   },

// ];
// const DATA2=[
//   {
//     img2:require("../../../assets/images/Bitcoin/Bitcoin.png"),
//     name: 'Bitcoin (BTC)',
//     value1:"0.8934 BTC",
//     amount1: '$15,927',
//     transaction: '+5.24%',
//   },
//   {
//     img2:require("../../../assets/images/ethereum/ethereum.png"),
//     name: 'Ethereum (ETH)',
//     value1:"0.8934 BTC",
//     amount1: '$15,927',
//     transaction: '+5.24%',
//   },
//   {
//     img2:require("../../../assets/images/ripple/ripple.png"),
//     name: 'Ripple (XRP)',
//     value1:"0.8934 BTC",
//     amount1: '$15,927',
//     transaction: '+5.24%',
//   },
//   {
//     img2:require("../../../assets/images/tron/tron.png"),
//     name: 'WINS Token',
//     value1:"0.8934 BTC",
//     amount1: '$15,927',
//     transaction: '+5.24%',
//   }
// ]

// const SecondRoute = (props) => {
//   return(

//     <View style={styles.SecondMainContainer}>
//     <View style={styles.SecondfirstView}>
//     <View style={styles.SecondFirstOneView}>
//             <Text style={{fontSize:height/27,color:"white",fontWeight:"700"}}>$ 11,760.93</Text>
//         </View>
//         <View style={styles.SecondFirstTwoView}>
//         <Text style={{fontSize:height/58,color:"white"}}>Total Balance</Text>
//         </View>
//         <View style={styles.SecondFirstThreeView1}>
//             <TouchableOpacity>
//             <View style={styles.DepositView}>
//                 <Image style={{height:height/60,width:width/30,paddingVertical:13}} source={plus}></Image>
//                 <Text style={{fontSize:height/70,color:"grey"}}>Deposit</Text>
//             </View>
//             </TouchableOpacity>

//             <TouchableOpacity>
//             <View style={styles.BitGraphView}>
//                 <Image resizeMode="contain" style={{height:height/30,width:width/30,paddingVertical:13}} source={bargraph}></Image>
//                 <Text style={{fontSize:height/70,color:"grey"}}>Withdraw</Text>

//                 </View>
//             </TouchableOpacity>

//         </View>
//     </View>
//     <View style={styles.SecondTwoView}>
//     <Text style={{fontSize:height/45,color:"black",fontWeight:"700"}}>Recent Transitions :</Text>

//     </View>
//     <View style={styles.SecondThreeView}>

//     <FlatList
//       showsVerticalScrollIndicator={false}
//       data={DATA}
//       renderItem={({item})  => (

//         <View  style={styles.item}>
//         <View style={styles.imageView}>
//           <Image
//             resizeMode="contain"
//             style={styles.imagestyle} source={item.img}/>
//         </View>
//         <View style={styles.amountView}>
//           <Text style={styles.AmountText}>{item.amount}</Text>
//         </View>
//         <View style={styles.progressView}>
//           <Text style={styles.progressText}>{item.progress}</Text>
//           <Text style={styles.dateText}>{item.date}</Text>
//         </View>
//       </View>

//       )}
//     />

//     </View>
//     <View style={styles.SecondFourView}>
//         <TouchableOpacity  onPress={() => props.props.navigation.navigate('AllTransaction')} >
//         <Text style={{fontSize:height/60,color:"#7A25CE"}}>Show All Transaction</Text>
//         </TouchableOpacity>

//     </View>
// </View>
// )}

const Mywallet = (props, {navigation}) => {
  const [isLoading, setLoading] = useState(false);

  const [coinListWallet, setCoinListWallet] = useState([]);
  const [coinListName, setCoinListName] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [totalBalance, setTotalBalance] = useState();

  const [actualCurrencyList, setActualCurrencyList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [usdAmount, setUSDAmount] = useState(null);
  const [betAmount, setBetAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [IDType, setIDtype] = useState(null);
  const [ETHUSD, setETHUSD] = useState(0);
  const [BTCUSD, setBTCUSD] = useState(0);
  const [XRPUSD, setXRPUSD] = useState(0);
  const [AVTUSD, setAVTUSD] = useState(0);

  useEffect(() => {
    walletBalancecoinlist();
    currencylistdata();
    transactionhistorydata();
    totalbalancecointousd();

    DepositcryptoList();
  }, []);

  const currencylistdata = async () => {
    await axios({
      method: 'GET',
      url: 'https://java-create-token.mobiloitte.org/wallet/coin/get-coin-list',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(async res => {
        console.log('currencies list-->>', res);
        if (res.status === 200) {
          let tempArr = [];
          res.data.data.forEach(element => {
            element.coinType === 'crypto'
              ? tempArr.push({value: element.coinFullName})
              : null;
          });
          setCurrenciesList(tempArr);

          getUSDCurrency(res.data.data);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.log('err in currencies list ----------', err));
  };

  const getUSDCurrency = async data => {
    let tempArr = [];
    await Promise.all(
      data.map(async element => {
        await axios({
          method: 'GET',
          url: `https://min-api.cryptocompare.com/data/price?fsym=${element.coinShortName}&tsyms=USD`,
          headers: {
            'content-type': 'application/json',
          },
          params: {
            api_key:
              '61e5b7f568ed5e01762d3f99c426b88fa0046caf4a7c62a284102b86c41d25ca',
          },
        })
          .then(async res => {
            console.log('data in usd-->>', element.coinShortName, res.data);
            console.log('====Value-->>', res.data);
            if (res.status === 200) {
              tempArr.push({...element, usdAmount: res.data.USD});
              if (element.coinShortName === 'ETH') {
                setETHUSD(res.data.USD);
              } else if (element.coinShortName === 'BTC') {
                setBTCUSD(res.data.USD);
              } else if (element.coinShortName === 'XRP') {
                setXRPUSD(res.data.USD);
              } else if (element.coinShortName === 'AVT') {
                setAVTUSD(res.data.USD);
              } else {
              }
            } else {
              alert('Something went wrong.');
            }
          })
          .catch(err => console.log('err in currencies list ----------', err));
      }),
    );
    setActualCurrencyList(tempArr);
  };
  console.log('setActualCurrencyList', actualCurrencyList);

  const walletBalancecoinlist = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);
    setLoading(true);
    axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/wallet/wallet/get-all-user-balance-and-coinlist',

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('wallet111111 ------------- >>>>>', res.data.data);
          setCoinListName([...coinListName, ...res.data.data.userBalance]);
          console.log('cointlistName111111 --------->>>>', coinListName);
        } else {
          alert('Something went wrong');
          setLoading(false);
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
    setLoading(false);
  };

  // Transaction details api

  const transactionhistorydata = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: 'https://java-create-token.mobiloitte.org/wallet/wallet/get-all-transaction-history',

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log(
            'transactionDetails ------------- >>>>>',
            res.data.data.resultlist,
          );

          setTransactionList(res.data.data.resultlist);
          console.log(
            'transactionDetails111111111111 ------------- >>>>>',
            transactionList,
          );
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  const totalbalancecointousd = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/wallet/wallet/get-balance-in-usd`,

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('balance in usd  ------------- >>>>>', res);
          // console.log('transactionDetails ------------- >>>>>', res.data.data.resultlist[0]);

          setTotalBalance(res.data.data);
          //  setCoinToUsd(res.data.data)
          console.log('balance in usd 11111111-------- >>>>', totalBalance);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  //<----new Api+++++++++++++++++++++--->

  const DepositcryptoList = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org:4094/wallet/wallet/get-deposits?coinName=BTC&page=2&pageSize=4
=${walletdata.instrument}`,

      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('mobiloitte ------------- >>>>>', res.data.data);
          setWalletDetailsAddress(res.data.data);
          console.log('vandnamobi------>>', walletDetailAddress);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('vandanajjhjjjj---->>>>', err));
  };

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
            headerText2={'Wallet'}
            backImage={BackArrow}
            onPress2={() => props.navigation.goBack()}
          />
        </AppView>
        <View style={styles.SecondMainContainer}>
          <View style={styles.SecondfirstView1}>
            <View style={styles.SecondFirstOneView1}>
              <Text
                style={{
                  fontSize: height / 27,
                  color: 'white',
                  fontWeight: '700',
                }}>
                $ {totalBalance}
              </Text>
            </View>
            <View style={styles.SecondFirstTwoView}>
              <Text style={{fontSize: height / 58, color: 'white'}}>
                Total Balance
              </Text>
            </View>
          </View>
          <View style={styles.SecondTwoView}>
            <Text
              style={{
                fontSize: height / 45,
                color: '#090909',
                fontWeight: '700',
              }}>
              Assets :
            </Text>
          </View>
          <View style={styles.SecondThreeView1}>
            {isLoading ? (
              <View style={{marginTop: 60}}>
                <Loader />
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={coinListName}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.navigate("Login")
                      props.navigation.navigate({
                        name: 'CryptoWallet',
                        params: {valueDetails: item},
                        // merge: true,
                      });
                    }}
                    //  onPress={() =>props.navigation.navigate('CryptoWallet',{item:item,index:index})}
                  >
                    <View style={styles.item1}>
                      <View style={styles.imageView}>
                        <Image
                          resizeMode="contain"
                          style={styles.imagestyle}
                          source={{uri: item.coinImage}}
                        />
                      </View>
                      <View style={styles.nameView}>
                        <Text style={styles.nameText}>{item.coinName}</Text>
                        <Text style={styles.value1Text}>
                          {item.availableBalance} {item.instrument}
                        </Text>
                      </View>
                      <View style={styles.amount1View}>
                        <Text style={styles.amount1Text}>
                          $
                          {item.instrument === 'ETH'
                            ? (ETHUSD * item.availableBalance).toFixed(2)
                            : item.instrument === 'BTC'
                            ? (BTCUSD * item.availableBalance).toFixed(2)
                            : item.instrument === 'XRP'
                            ? (XRPUSD * item.availableBalance).toFixed(2)
                            : item.instrument === 'AVT'
                            ? (AVTUSD * item.availableBalance).toFixed(2)
                            : item.availableBalance}
                        </Text>
                        <Text style={styles.transactionText}>
                          {item.inOrderBalance}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          <View style={styles.SecondFourView2}>
            <Text
              style={{
                fontSize: height / 45,
                color: '#090909',
                fontWeight: '700',
              }}>
              Transations :
            </Text>
          </View>
          <View style={styles.SecondFourView1}>
            {transactionList > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={transactionList}
                renderItem={({item}) => {
                  if (index > 2) {
                    return null;
                  }
                  return (
                    <TouchableOpacity>
                      <View style={styles.item}>
                        <View style={styles.imageView}>
                          <Image
                            resizeMode="contain"
                            style={styles.imagestyle}
                            source={
                              transactionList.txnType === 'WITHDRAW'
                                ? require('../../../assets/images/greenicon/greenicon.png')
                                : require('../../../assets/images/redicon/redicon.png')
                            }
                          />
                        </View>
                        <View style={styles.amountView}>
                          <Text style={styles.AmountText}>
                            {item.units} {item.coinType}
                          </Text>
                          {/* <Text style={styles.valueText}>{item.value}</Text> */}
                        </View>
                        <View style={styles.progressView}>
                          <Text
                            style={
                              ([styles.progressText],
                              {
                                color:
                                  transactionList.txnType === 'WITHDRAW'
                                    ? 'green'
                                    : 'red',
                              })
                            }>
                            {item.txnType}
                          </Text>

                          <Text style={styles.dateText}>
                            {/* {item.txnTime} */}
                            {moment(item.txnTime).format('MMMM DD,YYYY')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  height: height / 5.3,
                  width: width / 1,
                  backgroundColor: '#00000010',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: height / 40, color: 'black'}}>
                  No Recent Transaction
                </Text>
              </View>
            )}
          </View>

          <View style={styles.SecondFiveView1}>
            {/* <TouchableOpacity 
        onPress={() => props.navigation.navigate('AllTransaction')}
        >
        <Text style={{fontSize:height/60,color:"#7A25CE"}}>Show All Transaction</Text>
        </TouchableOpacity>
       */}
          </View>
        </View>
      </AppView>
    </SafeAreaView>
  );
};

export default Mywallet;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  SecondMainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'white',
  },
  SecondfirstView: {
    height: height / 4,
    width: width / 1,
    backgroundColor: '#rgb(128, 196, 28)',
  },
  SecondfirstView1: {
    height: height / 6.5,
    width: width / 1,
    backgroundColor: '#rgb(128, 196, 28)',
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFirstOneView: {
    height: height / 11,
    width: width / 1,
    // backgroundColor:"blue",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  SecondFirstOneView1: {
    height: height / 13,
    width: width / 1,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFirstTwoView: {
    height: height / 22,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFirstThreeView1: {
    height: height / 10,
    width: width / 1,
    // backgroundColor:"#7A25CE",
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  DepositView: {
    height: height / 14,
    width: width / 5,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: 'grey',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BitGraphView: {
    height: height / 14,
    width: width / 5,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SecondTwoView: {
    height: height / 18,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    paddingHorizontal: 15,
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
    borderColor: 'grey',
    borderWidth: 0.8,
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
  dateText: {
    fontSize: height / 65,
  },
  progressText: {
    fontSize: height / 55,
    color: 'green',
    marginVertical: 3,
  },
  SecondThreeView: {
    height: height / 2.3,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
  },
  SecondFourView: {
    height: height / 16,
    width: width / 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondThreeView1: {
    height: height / 3,
    width: width / 1,
    // backgroundColor:"red",
    alignItems: 'center',
  },
  SecondFourView1: {
    height: height / 5.2,
    width: width / 1,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondFiveView1: {
    height: height / 25,
    width: width / 1,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: height / 70,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  item1: {
    // flex:1,
    width: width / 1.08,
    marginVertical: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 14,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    // justifyContent:"center"
  },

  nameView: {
    height: height / 14,
    width: width / 2.5,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  amount1View: {
    height: height / 14,
    width: width / 2.85,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: height / 55,
    color: 'black',
    fontWeight: '700',
    paddingVertical: 3,
  },
  amount1Text: {
    fontSize: height / 55,
    color: 'black',
    paddingVertical: 3,
  },
  transactionText: {
    fontSize: height / 65,
    color: 'green',
  },
  value1: {
    fontSize: height / 60,
    color: 'black',
  },
  SecondFourView2: {
    height: height / 22,
    width: width / 1,
    // backgroundColor:"blue",
    justifyContent: 'center',
    paddingHorizontal: 13,
  },
});

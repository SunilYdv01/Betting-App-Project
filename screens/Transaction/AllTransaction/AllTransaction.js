import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {AppView, AppText, AppImage} from '../../../components/Atom/atom';
const {height, width} = Dimensions.get('screen');
import Header from '../../../components/molecules/Header';
import {
  BackArrowTwo,
  printer,
  filter,
  redicon,
  greenicon,
} from '../../../assets/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

const DATA = [
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Send',
    date: 'Aug 19, 2019',
    isTransaction: true,
  },
  {
    img: require('../../../assets/images/greenicon/greenicon.png'),
    amount: '$ 204',
    progress: 'Deposited',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Withdrawn',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Send',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/greenicon/greenicon.png'),
    amount: '$ 204',
    progress: 'Deposited',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Withdrawn',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Send',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/greenicon/greenicon.png'),
    amount: '$ 204',
    progress: 'Deposited',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Withdrawn',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Send',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/greenicon/greenicon.png'),
    amount: '$ 204',
    progress: 'Deposited',
    // date: 'Aug 19, 2019',
  },
  {
    img: require('../../../assets/images/redicon/redicon.png'),
    amount: '$ 204',
    progress: 'Withdrawn',
    // date: 'Aug 19, 2019',
  },
];

const AllTransaction = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionDetails,setTransactionDetails] = useState([]);

  useEffect(() => {
    // globalCheckpersonName();
    transactionAllDetails();
  }, []);

  const transactionAllDetails= async () => { 
   
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
          // console.log('transactionDetails ------------- >>>>>', res);
          // console.log('transactionDetails ------------- >>>>>', res.data);
          // console.log('transactionDetails ------------- >>>>>', res.data.data);
          console.log('transactionDetails ------------- >>>>>', res.data.data.resultlist);
          // console.log('transactionDetails ------------- >>>>>', res.data.data.resultlist[0]);

     setTransactionDetails( res.data.data.resultlist)
     console.log("transactionData11111---------->>>",transactionDetails);

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
            // backgroundColor: 'yellow',
          }}>
          <Header
            head={false}
            backImage={BackArrowTwo}
            headerText2="All Transactions"
            favImage={printer}
            finalImage={filter}
            onPress2={() => props.navigation.goBack()}
            onPress4={() => setModalVisible(true)}
          />
        </AppView>
        <AppView style={styles.FirstContainer}>
         { transactionDetails > 0 ? <FlatList
            showsVerticalScrollIndicator={false}
            data={transactionDetails}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Login")
                props.navigation.navigate({
                  name: 'Transactiondetails',
                  params: {transactionExpand: transactionDetails},
                  // merge: true,
                })}}
                
                // onPress={() => props.navigation.navigate('Transactiondetails')}
                >
                <View style={styles.item}>
                  <View style={styles.imageView}>

                 
                        <Image
                      resizeMode="contain"
                      style={styles.imagestyle}
                      source={    transactionDetails.txnType=== "WITHDRAW"  ?    require("../../../assets/images/greenicon/greenicon.png")   :    require("../../../assets/images/redicon/redicon.png")}  
                    />
                 
                
                    
                  </View>
                  <View style={styles.amountView}>
                    <Text style={styles.AmountText}>{item.units} {item.coinType}</Text>
                  </View>
                  <View style={styles.progressView}>
                    <Text style={[styles.progressText], {color:transactionDetails.txnType ==="WITHDRAW" ? "green" :"red"}}>
                  
                      {item.txnType}
                      </Text>

                    <Text style={styles.dateText}>
                    
                    {/* {item.txnTime} */}
                      {moment(item.txnTime).format('MMMM DD,YYYY')} 
                      </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          /> :
          <View style={{height:height/1.4,width:width/1,backgroundColor:"#00000010",justifyContent:"center",alignItems:"center"}}>
           <Text style={{fontSize:height/40,color:"black"}}>No Recent Transaction</Text>
        </View> 
         
         } 
        </AppView>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.mainModalView}>
               
                <View style={styles.modalView1}>
                  <Text
                    style={{
                      fontSize: height / 50,
                      // fontWeight: '700',
                      paddingHorizontal: 15,
                    }}>
                    Select Filter :-
                  </Text>
                </View>
                <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalView2}>
               
                  <Text
                    style={{
                      fontSize: height / 50,
                      fontWeight: '700',
                      paddingHorizontal: 15,
                    }}>
                  Transaction Type
                  </Text>
                  </View>
                  </TouchableOpacity>
               
                
            <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView3}>
                  <Text
                    style={{
                      fontSize: height / 50,
                      fontWeight: '700',
                      paddingHorizontal: 15,
                    }}>
                    Coins
                  </Text>
                </View>
            </TouchableOpacity>
               <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
               <View style={styles.modalView4}>
                  <Text
                    style={{
                      fontSize: height / 50,
                      fontWeight: '700',
                      paddingHorizontal: 15,
                    }}>
                    Choose Value
                  </Text>
                </View>
               </TouchableOpacity>
               
              </View>

            </View>
          </View>
        </Modal>
      </AppView>
    </SafeAreaView>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
  },
  FirstContainer: {
    height: height / 1.17,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
    alignItems: 'center',
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
  dateText: {
    fontSize: height / 58,
  },
  progressText: {
    fontSize: height / 65,
    // color: 'green',
    marginVertical: 5,
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
  // dateText: {
  //   fontSize: height / 65,
  // },
  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    height: height / 2.7,
    width: width / 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth: 1,
    borderColor: 'grey',

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mainModalView: {
    height: height / 3.2,
    width: width / 1,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView1: {
    height: height / 15,
    width: width / 1.12,
    // backgroundColor:"red",
    justifyContent: 'center',
    // borderColor:"black",
    // borderTopWidth:1,
    // borderWidth:0.6
  },
  modalView2: {
    height: height / 14,
    width: width / 1.12,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    // borderTopWidth:1,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
  },
  modalView3: {
    height: height / 14,
    width: width / 1.12,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    // // borderTopWidth:1,
    // borderTopWidth: 0.6,
    // borderBottomWidth: 0.6,
  },
  modalView4: {
    height: height / 14,
    width: width / 1.12,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    // borderTopWidth:1,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
  },
});

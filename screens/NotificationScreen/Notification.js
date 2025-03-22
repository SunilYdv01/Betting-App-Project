import React, {useEffect, useState} from 'react';
// import {AccordionList} from 'accordion-collapse-react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {BackArrow, trash} from '../../assets/icon';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';
import {Avatar, Icon} from 'react-native-elements';

var ravi = [{}];
const NotificationScreen = ({props, navigation}) => {
  var swipeoutBtns = [
    {
      backgroundColor: '#D02E23',
      component: (
        <TouchableOpacity onPress={() => deleteAllNotifications()}>
          <View>
            <Icon
              style={{
                height: height / 20,
                width: width / 20,
                alignSelf: 'center',
                marginVertical: 25,
                //   tintColor:"white"
              }}
              name="delete"
              type="delete"
            />
          </View>
        </TouchableOpacity>
      ),
    },
  ];
  const [notificationValue, setNotificationsValue] = useState([]);
  const [delAllNotification, setDelAllNotification] = useState([]);

  useEffect(() => {
    userNotifications();
  }, []);

  // ******* profile details api   ************
  const userNotifications = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my token======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/get-push-notification`,
      headers: {
        Authorization: `Bearer ${value}`,
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('raviNoti ------yyyyy7yyyyyyyyy------- >>>>>', res);
          console.log('raviNoti ------zzzzzzzzzzz------- >>>>>', res.data);
          console.log('raviNoti ------df------- >>>>>', res.data.data);
          let i = 0;
          for (let item of res.data.data) {
            ravi[i] = item;
            i++;
          }
          //   setNotificationsValue ([...notificationValue,...res.data.data])
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  const deleteAllNotifications = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my deltoken======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/delete-all-push-notification`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log(
            'raviNotiDel ------yyyyy7yyyyyyyyy------- >>>>>',
            res.data,
          );

          setNotificationsValue(res.data);
          console.log('datatatatatatt---------->>>>>', notificationValue);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  const deleteNotification = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('====== my deltoken======>>>>', value);

    axios({
      method: 'get',
      url: `https://java-create-token.mobiloitte.org/account/delete-push-notification?notificationId=40813`,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('DeleteNotification ------------- >>>>>', res.data);
          userNotifications();
          //   setNotificationsValue ([...notificationValue,...res.data.data])
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log('error catch---->>>>', err));
  };

  return (
    <SafeAreaView
    // backgroundColor="#5A3E89"
    >
      <View style={styles.mainContainer}>
        <View style={{height: height / 16, width: width / 1}}>
          <Header
            head={false}
            backImage={BackArrow}
            finalImage={trash}
            headerText2={'Notifications'}
            onPress2={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            height: height / 1.18,
            width: width / 1,
            //  backgroundColor: 'red',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={ravi}
            renderItem={({item}) => {
              console.log('notification------->>>>>>>>>', notificationValue);

              return (
                <Swipeout
                  right={swipeoutBtns}
                  onPress={() => deleteNotification()}>
                  <View
                    style={{
                      height: height / 12,
                      width: width / 1,
                      backgroundColor: 'white',
                      // borderRadius:10,
                      marginVertical: 3,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        //   backgroundColor:'red',

                        height: height / 20,
                        width: width / 1,
                      }}>
                      <View
                        style={{
                          //   backgroundColor:'red',
                          height: height / 20,
                          width: width / 1.1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'black'}}>{item.message}</Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        color: 'black',
                        alignSelf: 'flex-end',
                        fontSize: height / 60,
                        width: width / 3,
                      }}>
                      {moment(item.creationDate).format('MMMM DD,YYYY')}
                    </Text>
                  </View>
                </Swipeout>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width * 1,
    backgroundColor: 'grey',
  },
  backContainer: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'center',
  },
  headerTxt: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: 'center',
  },
  TxtContainer: {
    fontSize: 30,
    // fontFamily: 'Roboto-Bold',
    marginHorizontal: 14,
    color: 'rgb(255,255,255)',
  },
  listContainerView: {
    height: height * 0.75,
    width: width * 1,
  },
  flatOneContainer: {
    height: height * 0.08,
    width: width * 0.94,
    backgroundColor: 'rgb(39,38,53)',
    // backgroundColor:"red",
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 8,
    borderRadius: 8,
  },
  numberView: {
    // fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgb(239,239,239)',
    margin: 10,
  },
  titleContainer: {
    // fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgb(239,239,239)',
    margin: 10,
    marginLeft: -5,
  },
});

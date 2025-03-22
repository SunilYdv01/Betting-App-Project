import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  Pressable,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import Contacts from 'react-native-contacts';
import ListItem from '../../components/ListItem';
import {
  OpponentFb,
  RefernEarn,
  BackArrowTwo,
  CheckboxIcon,
  Check,
  UserIcon,
  SearchIcon,
  contact,
  cross,
} from '../../assets/icon';
import Header from '../../components/molecules/Header';
import {TextInput} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PickOpponentScreen = (props, {navigation}) => {
  // Related to Search
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [usersList, setUsersList] = useState(null);
  const [filteredUsersList, setFilteredUsersList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [iAgree, setIAgree] = useState(true);
  const [contactItem, setContactItem] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  let [contacts, setContacts] = useState([]);
  // let [contacts, setContacts] = useState([]);

  const openContact = contact => {
    console.log(contact);
    setContactItem(contact);
    setModalVisible(false);
    //Contacts.openExistingContact(contact, () => {});
  };

  useEffect(() => {
    try {
      const andoidContactPermission = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts Permission granted');
        let newArray = [];
        Contacts.getAll().then(contacts => {
          contacts.forEach(contact => {
            newArray.push({
              thumbnailPath: contact.thumbnailPath ? contact.thumbnailPath : '',
              givenName: contact.givenName,
              phoneNumbers:
                contact.phoneNumbers &&
                contact.phoneNumbers[0] &&
                contact.phoneNumbers[0].number,
            });
            // console.log("contact===>", newArray)
            // console.log("contact===>", contact)

            // console.log(contact.givenName)
            // console.log(contact.phoneNumbers)
            setContacts(newArray);
          });
        });
        console.log('newArray--', newArray);
        // Contacts.getAll((andoidContactPermission, contacts) => {
        //     //     console.log(contacts);
        // });
      } else {
        let newArray = [];
        Contacts.getAll().then(contacts => {
          contacts.forEach(contact => {
            newArray.push({
              thumbnailPath: contact.thumbnailPath ? contact.thumbnailPath : '',
              givenName: contact.givenName,
              phoneNumbers:
                contact.phoneNumbers &&
                contact.phoneNumbers[0] &&
                contact.phoneNumbers[0].number,
            });
            console.log('contact===>', newArray);
            // console.log("contact===>", contact)

            // console.log(contact.givenName)
            // console.log(contact.phoneNumbers)
            setContacts(newArray);
          });
        });
        // Linking.openURL('app-settings:')

        // alert("Contacts permission denied")

        // console.log("Contacts permission denied");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    // axios({
    //   method: 'GET',
    //   url: 'https://jsonplaceholder.typicode.com/posts',
    // })
    //   .then(res => {
    //     console.log('res1 ---------', res.data);
    //     setFilteredDataSource(res.data);
    //     setMasterDataSource(res.data);
    //   })
    //   .catch(err => console.log('err', err));
  }, []);

  const fetchUsers = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log('my token', value);
    await axios({
      method: 'GET',
      // url: 'https://java-create-token.mobiloitte.com/account/get-all-user-name',
      url: 'https://java-create-token.mobiloitte.org/account/get-all-user-name',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
      .then(res => {
        console.log('users list------- ****%%%%%%%%------- ', res.data);
        if (res.status === 200) {
          let arr = res.data.data;
          arr.map(item => {
            item.isChecked = false;
          });
          setUsersList(arr);
          setFilteredUsersList(arr);
          // setAvailableSports(res.data.data);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(error => {
        console.log('errpr of users --------- ', error);
      });
  };
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      //   setShow(!true);
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = usersList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredUsersList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredUsersList(usersList);
      setSearch(text);
    }
  };
  const onSelectUser = index => {
    let tempArr = [...filteredUsersList];
    tempArr.map((subItem, subIndex) => {
      index === subIndex
        ? ((subItem.isChecked = true), setContactItem(subItem))
        : (subItem.isChecked = false);
    });
    setFilteredUsersList(tempArr);
  };
  const renderOpponent = ({item, index}) => {
    return (
      <AppView style={styles.viewMainCintainer}>
        <AppView style={styles.imgContView}>
          <AppView style={{height: height * 0.06, width: width * 0.1}}>
            <AppImage source={UserIcon} />
          </AppView>
          <AppView
            style={{
              height: height * 0.06,
              width: width * 0.6,
              justifyContent: 'center',
            }}>
            <AppText style={styles.ranOppoTxtView}>{item.name}</AppText>
          </AppView>
          <AppView
            style={{
              height: height * 0.06,
              width: width * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppTouchable
              // onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}
              onPress={() => onSelectUser(index)}>
              <AppImage
                source={item.isChecked ? Check : CheckboxIcon}
                style={{height: 20, width: 20, tintColor: 'grey'}}
              />
            </AppTouchable>
          </AppView>
        </AppView>
      </AppView>
    );
  };
  return (
    <SafeAreaView>
      <Header
        head={false}
        backImage={BackArrowTwo}
        headerText2="Select Your Opponent"
        onPress2={() => props.navigation.goBack()}
      />
      <ScrollView style={styles.mainContainer}>
        <AppView style={styles.searchBarContainer}>
          <AppView style={styles.secViewOne}>
            <AppView style={styles.seacshImaView}>
              <AppImage
                resizeMode="contain"
                source={SearchIcon}
                style={{
                  height: height / 40,
                  width: width / 20,
                  tintColor: 'grey',
                }}
              />
            </AppView>
            <AppView style={{height: height * 0.06, width: width * 0.75}}>
              <TextInput
                style={styles.inptView}
                onChangeText={text => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Find friends"
              />
            </AppView>
          </AppView>
        </AppView>
        {filteredUsersList ? (
          <FlatList
            style={{flex: 1, height: 200}}
            data={filteredUsersList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOpponent}
          />
        ) : null}
        <AppView style={styles.loginShareContainer}>
          <AppView style={styles.socialTxtView}>
            <AppView style={styles.txtView}>
              <AppText style={styles.textSentence}>
                Oh no, looks like you have no friend justyet.
              </AppText>
              <AppText style={styles.textSentence}>
                Don't let them miss out.
              </AppText>
            </AppView>

            <AppTouchable
              style={[styles.btnTouchView, {backgroundColor: '#D39A3F'}]}>
              <AppView style={styles.fbimageView}>
                <AppImage
                  resizeMode="contain"
                  style={{
                    height: height / 20,
                    width: width / 10,
                    tintColor: 'white',
                  }}
                  source={contact}
                />
              </AppView>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AppView style={styles.socialbtn}>
                  <AppText style={styles.btnTextView}>
                    Play With Your Contact
                    {/* {contactItem && contactItem.item.givenName} */}
                  </AppText>
                </AppView>
              </TouchableOpacity>
            </AppTouchable>

            <AppTouchable
              onPress={() => props.navigation.navigate('ReferandEarn')}
              style={[
                styles.btnTouchView,
                {backgroundColor: 'rgb(28,142,159)'},
              ]}>
              <AppView style={styles.fbimageView}>
                <AppImage source={RefernEarn} />
              </AppView>

              <AppView style={[styles.socialbtn]}>
                <AppText style={[styles.btnTextView, {marginHorizontal: 35}]}>
                  Refer and Earn
                </AppText>
              </AppView>
            </AppTouchable>
          </AppView>
        </AppView>

        <AppView style={{}}>
          <AppTouchable
            style={styles.contButtonTouch}
            onPress={() => {
              // navigation.navigate("Login")
              props.navigation.navigate({
                //name: 'PlaceYourBet',

                name: 'PlaceYourBetTwo',
                params: {opponent: contactItem},
                merge: true,
              });

              // navigation.goBack();
              //navigation.state.params.onSelectUser(selectedUser);
            }}
            // onPress={()=>alert("hello")}
          >
            <AppView style={styles.contButtonView}>
              <AppText style={styles.contButtonText}>Continue</AppText>
            </AppView>
          </AppTouchable>
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
                <View
                  style={{
                    height: height / 15,
                    width: width / 1.2,
                    backgroundColor: '#47087B',
                    alignItems: 'center',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: height / 15,
                      width: width / 1.35,
                      // backgroundColor: 'cyan',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: height / 45,
                        color: 'white',
                        fontWeight: '700',
                      }}>
                      Challange your Contacts
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      height: height / 15,
                      width: width / 9,
                      // backgroundColor: 'yellow',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Image
                        style={{
                          height: height / 60,
                          width: width / 30,
                          tintColor: 'grey',
                          marginVertical: 15,
                        }}
                        source={cross}></Image>
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View style={{flex: 1, width: width / 1.2, marginTop: 8}}>
                  <FlatList
                    data={contacts}
                    renderItem={contact => {
                      console.log('contact -> ' + JSON.stringify(contact));

                      return (
                        <ListItem
                          key={contact.item.recordID}
                          item={contact.item}
                          onPress={() => openContact(contact)}
                        />
                      );
                    }}
                    keyExtractor={item => item.recordID}
                  />
                  <AppView
                    style={{
                      height: height * 0.08,
                      width: width * 0.8,
                      alignItems: 'center',
                    }}>
                    <AppTouchable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </AppTouchable>
                  </AppView>
                </View>
              </View>
            </View>
          </Modal>
        </AppView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PickOpponentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // height: height * 1,
    width: width * 1,
    backgroundColor: 'rgb(245,245,245)',
    marginBottom: 50,
  },
  searchBarContainer: {
    height: height * 0.1,
    width: width * 1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMainCintainer: {
    // height: height * 0.15,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  imgContView: {
    height: height * 0.09,
    width: width * 0.9,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgb(112,112,112)',
  },
  ranOppoTxtView: {
    marginHorizontal: 20,
    color: 'rgb(48,44,44)',
    fontSize: 20,
    fontWeight: '600',
  },
  loginShareContainer: {
    height: height * 0.42,
    width: width * 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialTxtView: {
    height: height * 0.35,
    width: width * 0.9,
    // backgroundColor: 'green',
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgb(0,0,2)',
  },
  txtView: {
    height: height * 0.1,
    width: width * 0.9,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSentence: {
    fontSize: 16,
    color: 'rgb(112,112,112)',
  },
  btnTouchView: {
    height: height * 0.07,
    width: width * 0.7,
    margin: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 11,
  },
  fbimageView: {
    height: height * 0.074,
    width: width * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialbtn: {
    height: height * 0.074,
    width: width * 0.6,
    justifyContent: 'center',
  },
  btnTextView: {
    fontSize: height / 50,
    color: 'rgb(255,255,255)',
    marginHorizontal: 8,
  },
  contButtonTouch: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contButtonView: {
    height: height * 0.065,
    width: width * 0.75,
    backgroundColor: 'rgb(94,28,159)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  contButtonText: {
    fontSize: 22,
    color: 'rgb(255,255,255)',
    fontWeight: '600',
  },
  secViewOne: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.9,
    //borderBottomWidth: 0.6,
    borderColor: 'grey',
    // borderRadius:8
    //backgroundColor: 'red',
  },
  seacshImaView: {
    height: height * 0.06,
    width: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  inptView: {
    height: height * 0.06,
    width: width * 0.75,
    paddingLeft: 20,
    backgroundColor: '#EEEEEE',
    //backgroundColor: 'red',
    fontSize: 19,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height / 1.4,
    width: width / 1.2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: height * 0.06,
    width: width * 0.45,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'rgb(94,28,159)',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

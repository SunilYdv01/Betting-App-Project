import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {blueuser, cross} from '../../assets/icon';

const DATA4 = [
  {
    num: '60%',
    badges: 'Win Rate',
  },
  {
    num: '23',
    badges: 'Win Streak',
  },
  {
    num: '5.40',
    badges: 'Prediction',
  },
  {
    num: '232',
    badges: 'Winings',
  },
 
];
const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centered1View}>
          <View style={styles.modalView}>
            <View style={styles.firstMainViewModal}>
              <View style={styles.firstOnemodalview}>
                <Image source={blueuser}></Image>
              </View>
              <View style={styles.firstTwoViewmodal}>
                <Text
                  style={{
                    fontSize: height / 45,
                    fontWeight: '700',
                    color: '#rgb(94,28,159)',
                  }}>
                  umair siddiqui
                </Text>
                <Text
                  style={{
                    fontSize: height / 59,
                    fontWeight: '700',
                    color: '#rgb(115 ,112, 112)',
                  }}>
                  @_umair111
                </Text>
              </View>
              <View style={styles.firstThreeViewModal}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{
                    height: height / 60,
                    width: width / 30,
                    tintColor: 'grey',
                    marginTop: 10,
                  }}
                  source={cross}></Image>
                </TouchableOpacity>
              
              </View>
            </View>
            <View style={styles.secondMainViewModal}>
              <FlatList
               horizontal={true}
               showsVerticalScrollIndicator={false}
               data={DATA4}
               renderItem={({item}) => (
                 <View style={styles.item4}>
                   <Text style={{fontSize:height/55,fontWeight:"700",paddingVertical:5,color:'#rgb(94,28,159)'}}>{item.num}</Text>
                   <Text style={{fontSize:height/60,color:'#rgb(115 ,112, 112)'}}>{item.badges}</Text>
                 </View>
               )}
              />
            </View>
            <View style={styles.thirdMainViewModal}>
              <View style={styles.thirdFirstView}>
                <TouchableOpacity>
                <View style={styles.button1View}>
                  <Text style={{fontSize:height/60,color:'grey'}}>View Profile</Text>
                </View>
                </TouchableOpacity>
               
              </View>
              <View style={styles.thirdsecndView}>
                <TouchableOpacity>
                <View style={styles.button2View}>
              <Text style={{fontSize:height/60,color:'white'}}>Follow</Text>
              </View>
                </TouchableOpacity>
             
              </View>
            </View>
           
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: height / 4,
    width: width / 1.08,
    borderWidth: 0.7,
    borderColor: 'grey',
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
  centered1View: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22
  },
  firstMainViewModal: {
    height: height / 12,
    width: width / 1.08,
    // backgroundColor:"red",
    flexDirection: 'row',
    borderColor:"grey",
    borderBottomWidth:0.5
  },
  secondMainViewModal: {
    height: height / 11,
    width: width / 1.08,
    // backgroundColor: 'green',
    // justifyContent:"center",
    alignItems:'center'
  },
  thirdMainViewModal: {
    height: height / 14,
    width: width / 1.08,
    // backgroundColor: 'blue',
    flexDirection:"row"
  },
  firstOnemodalview: {
    height: height / 12,
    width: width / 4.5,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstTwoViewmodal: {
    height: height / 12,
    width: width / 1.9,
    // backgroundColor:"red",
    justifyContent: 'center',
  },
  firstThreeViewModal: {
    height: height / 12,
    width: width / 6.8,
    // backgroundColor:"blue",
    alignItems: 'flex-end',
  },
  item4:{
 // flex:1,
 width: width / 5.5,
 margin:5,
 // alignSelf: 'flex-start',
 // flexDirection: 'row',

 alignItems: 'center',
 height: height / 12,


 justifyContent: 'center',
  },
  thirdFirstView:{
    height:height/14,
    width:width/1.8,
    // backgroundColor:"red",
    alignItems:'flex-end',
    justifyContent:"center"
  },
  thirdsecndView:{
    height:height/14,
    width:width/2.85,
    // backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center"
  },
  button1View:{
    height:height/18,
    width:width/3.8,
    backgroundColor:"white",
    borderColor:"grey",
  borderWidth:0.9,
  borderRadius:10,
  justifyContent:"center",
  alignItems:"center"
},
button2View:{
  height:height/18,
  width:width/3.8,
  backgroundColor:'#rgb(94,28,159)',
  borderColor:"white",
  borderWidth:0.7,
borderRadius:10,
justifyContent:"center",
alignItems:"center"
}
});

export default App;

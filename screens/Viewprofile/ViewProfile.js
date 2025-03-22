import React,{useState} from 'react';
import {StyleSheet, Text, View, Dimensions,TouchableOpacity,FlatList,Image, SafeAreaView, ScrollView} from 'react-native';
import {
  AppView,
  AppText,
  AppImage,
  AppTouchable,
  AppTextInput,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {profileicon,redface,well,lamp,Bomb,greenStar,target,daimond,BackArrow} from '../../assets/icon';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const DATA=[
  {
    img1: require('../../assets/images/UserIcon/UserIcon.png'),
     name:"Daniel_123",
     tournamentname:"ICC World Cup 2021",
     firstteam:"Ireland",
     vs:"vs",
     secondteam:"Netherland",
     gamestatus:"Game played : ",
     bet:"Bet money : 100k",
     gameday:"13 May,2021",
     img2: require('../../assets/images/tick/tick.png'),
     matchstatus:"Declared"

  },
];

const DATA1 = [
    {
      img: require('../../assets/images/redFace/redFace.png'),
    },
    {
      img: require('../../assets/images/well/well.png'),
    },
    {
      img: require('../../assets/images/lamp/lamp.png'),
    },
    {
      img: require('../../assets/images/Bomb/Bomb.png'),
    },
    {
      img: require('../../assets/images/greenStar/greenStar.png'),
    },
    {
      img: require('../../assets/images/target/target.png'),
    },
    {
      img: require('../../assets/images/daimond/daimond.png'),
    },
  ];

const DATA2 = [
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
    {
      num: '107',
      badges: 'Loses',
    },
    {
      num: '13M',
      badges: 'Earned',
    },
  ];
const DATA3=[
    {
      value:"20",
      text:"Followers"
    },
    {
      value:"14",
      text:"Follow"
    }
  ]

const ViewProfile = ({props,route,navigation}) => {
   const [userNameData,setUserNameData] =useState(  props.route.params.userNameData ? props.route.params.userNameData : null);
   const [amountdata,setAmountdata] =useState(  props.route.params.amountdata ? props.route.params.amountdata : null);
   const [winningpercentValue,setwinningpercentValue] =useState(  props.route.params.winningpercentValue ? props.route.params.winningpercentValue : null);
   const [currentstreak,setcurrentstreak] =useState(  props.route.params.currentstreak ? props.route.params.currentstreak : null);
   const [predictionValue,setpredictionValue] =useState(  props.route.params.predictionValue ? props.route.params.predictionValue : null);
   console.log("update profileee------->>>>>",amountdata);
   console.log("update profileee------->>>>>",winningpercentValue);
   console.log("update profileee------->>>>>",currentstreak);
   console.log("update profileee------->>>>>",userNameData);
   console.log("update profileee------->>>>>",predictionValue);


  return (
      <SafeAreaView>
    <AppView style={styles.MainContainer}>
      <AppView
        style={{
          height: height / 13,
          width: width / 1,
          // backgroundColor: 'yellow',
        }}>
        <Header
          head={false}
          headerText2={'View Player'}
          backImage={BackArrow}
          onPress2={() => props.navigation.goBack()}
        />
      </AppView>
      <ScrollView>
      <AppView style={styles.FirstContainer}>
        <AppView style={styles.FirstOneView}>
          <AppView style={styles.profileiconView}>
            <AppView style={styles.iconmainView}>
              <AppImage
                style={{height: height / 17, width: width / 8}}
                source={profileicon}></AppImage>
            </AppView>
            <AppView style={styles.nameView}>
              <AppText
                style={{
                  fontSize: height / 55,
                  fontWeight: '700',
                  color: '#rgb(94,28,159)',
                  marginVertical: 2,
                }}>
                umair siddiqui
              </AppText>
              <AppText
                style={{
                  fontSize: height / 55,
                  fontWeight: '700',
                  color: '#rgb(115 ,112, 112)',
                }}>
                @umair_111
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.FollowersFollowingMainView}>
          <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA3}
       numColumns={2}
                renderItem={({item}) => (
                  <View style={styles.item2}>
                    <View
                      style={{
                        height: height /45,
                        width: width / 4.5,
                        // backgroundColor: 'cyan',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize:height/52,fontWeight:"700",color:"#rgb(94,28,159)"}}>{item.value}</Text>
                    </View>
                    <View
                      style={{
                       height: height / 30,
                        width: width / 4.5,
                        // backgroundColor: 'green',
                        alignItems: 'center', 
                        justifyContent:"center"
                      }}>
                      <Text style={{fontSize:height/55,fontWeight:"700",color:"grey"}}>{item.text}</Text>
                    </View>
                  </View>
                )}
              />
          </AppView>
          <AppView style={styles.FirstTwoView}>
            <AppText
              style={{
                fontSize: height / 50,
                marginHorizontal: 18,
                fontWeight: '700',
                color: 'black',
              }}>
              Achievements
            </AppText>
            <TouchableOpacity
            onPress={() => props.navigation.navigate('PlayerProfileAchivements')}
            >
            <AppText
              style={{
                fontSize: height / 55,
                marginHorizontal: 18,
                // fontWeight: '700',
                color: '#rgb(94,28,159)',
                width: width / 1.9,
                // backgroundColor: 'green',
                textAlign: 'right',
              }}>
              View all
            </AppText>
            </TouchableOpacity>
           
          </AppView>
          <AppView
                style={{
                  height: height / 10,
                  width: width / 1,
                  //   backgroundColor: 'yellow',
                  // flexDirection:"row",
                  alignItems: 'center',
                }}>
                <FlatList
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  data={DATA1}
                  renderItem={({item}) => (
                    <View style={styles.item3}>
                      <View style={styles.imageView}>
                        <Image
                          resizeMode="contain"
                          style={styles.imagestyle}
                          source={item.img}
                        />
                      </View>
                    </View>
                  )}
                />

              
              </AppView>

        </AppView>
      
      </AppView>
      <AppView style={styles.SecondContainer}>
          <AppView style={styles.SecondOneView}>
              <AppText style={{
                fontSize: height / 48,
                marginHorizontal: 18,
                fontWeight: '700',
                color: 'black',
              }}>Stats</AppText>
          </AppView>
          <AppView style={styles.SecondTwoView}>
              <FlatList
                // showsVerticalScrollIndicator={false}
                data={DATA2}
                numColumns={3}
                renderItem={({item}) => (
                  <View style={styles.item1}>
                    <View
                      style={styles.numView}>
                      <Text style={{fontSize:height/55,fontWeight:"700",color:"#rgb(94,28,159)"}}>{item.num}</Text>
                    </View>
                    <View
                      style={{
                        height: height / 25,
                        width: width / 4.5,
                        // backgroundColor: 'green',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize:height/55,fontWeight:"700",color:"grey"}}>{item.badges}</Text>
                    </View>
                  </View>
                )}
              />
            </AppView>
      </AppView>
      <AppView style={styles.ThirdmainContainer}>
        <AppView style={styles.ThirdOneView}>
        <AppText
              style={{
                fontSize: height / 50,
                marginHorizontal: 18,
                fontWeight: '700',
                color: 'black',
              }}>
             Top Winnings
            </AppText>
        </AppView>
        <AppView style={styles.ThirdTwoView}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({item})  => (
            <TouchableOpacity>
                <AppView style={styles.item}>
                    <View style={styles.Image1View}>
                    <Image resizeMode="contain" source={item.img1} style={styles.imageContainer} /> 
                     <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View style={styles.MatchView}>
                        <View style={styles.WorldcupView}>
                        <AppText style={styles.worlcupText}>{item.tournamentname}</AppText>         
                        </View>
                 <View style={styles.teamView}>
                 <Text style={styles.teamText}>{item.firstteam}</Text>
                  <Text style={styles.teamText}>{item.vs}</Text>
                  <Text style={styles.teamText}>{item.secondteam}</Text>
                     </View>   
                     <Text style={{paddingHorizontal:12,fontSize:height/70,color:"#rgb(94,28,159)"}}>{item.bet}</Text>
   <View style={styles.matchtime}>
   <Text style={styles.gameText}>{item.gamestatus}</Text>
    <Text style={styles.game1Text}>{item.gameday}</Text>
   </View>
  </View>
 
   <View style={styles.clockView}>
   <Image source={item.img2} style={styles.Image2container}></Image>
    <Text style={styles.matchText}>{item.matchstatus}</Text>
   </View>

                </AppView>
            </TouchableOpacity>
            )}
/>
          {/* <AppView style={styles.thirdFirstinnerView}></AppView> */}
        </AppView>
      </AppView>
      </ScrollView>
    </AppView>
    </SafeAreaView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  MainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
  },
  FirstContainer: {
    height: height / 2.8,
    width: width / 1,
    backgroundColor: '#rgb(245,245,245)',
    // backgroundColor:"red"
  },
  FirstOneView: {
    height: height / 3,
    width: width / 1,
    backgroundColor: 'white',
    marginTop: height / 70,
    position: 'absolute',
    alignItems: 'center',
  },
  profileiconView: {
    height: height / 13,
    width: width / 1.1,
    // backgroundColor:"red",
    flexDirection: 'row',
  },
  FollowersFollowingMainView: {
    height: height / 12,
    width: width / 1.1,
    // backgroundColor:"green",
  justifyContent:"center",
  alignItems:"center"
  },
  iconmainView: {
    height: height / 13,
    width: width / 5,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameView: {
    height: height / 13,
    width: width / 2,
    // backgroundColor:"cyan",
    justifyContent: 'center',
  },
  followerMainView: {
    height: height / 11,
    width: width / 2.5,
    // backgroundColor:"red",
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  followingMainView: {
    height: height / 11,
    width: width / 3,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingView: {
    height: height / 13,
    width: width / 4.5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followerView: {
    height: height / 13,
    width: width / 4.5,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FirstTwoView: {
    height: height / 12,
    width: width / 1,
    // backgroundColor: 'red',
    // justifyContent:"center",
    alignItems: 'center',
    flexDirection: 'row',
  },
  SecondContainer:{
      height:height/3.3,
      width:width/1,
      backgroundColor:"white"
  },
  SecondOneView:{
      height:height/22,
      width:width/1,
    //   backgroundColor:"yellow",
      justifyContent:"center"
  },
  SecondTwoView:{
    height: height / 4.5,
    width: width / 1,
    // backgroundColor: 'cyan',
    alignItems: 'center',
    // flexDirection:"row",
    justifyContent: 'center',
  },
  SecondThreeView:{
    height:height/8,
    width:width/1,
    // backgroundColor:"green",
    alignItems:"center",
      flexDirection:"row"
  },
  twofirstView:{
      height:height/10,
    width:width/4.5,
    backgroundColor:"#rgb(245,245,245)",
  borderRadius:10,
  marginHorizontal:35
  ,justifyContent:"center",
  alignItems:"center",
  borderColor:"grey",
  borderWidth:0.7
},
twosecondView:{
    height:height/10,
    width:width/4.5,
    backgroundColor:"#rgb(245,245,245)",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"grey",
    borderWidth:0.7,
},
twothirdView:{
    height:height/10,
    width:width/4.5,
    backgroundColor:"#rgb(245,245,245)",
borderRadius:10,
marginHorizontal:35,
justifyContent:"center",
alignItems:"center",
borderColor:"grey",
borderWidth:0.7,
},
ThirdmainContainer:{
  height:height/5.2,
  width:width/1,
  backgroundColor:"white",
  marginTop:10,

},
ThirdOneView:{
  height:height/20,
  width:width/1,
  // backgroundColor:"red",
  justifyContent:"center"
},
ThirdTwoView:{
  height:height/9,
  width:width/1,
  // backgroundColor:"green",
  // justifyContent:"center",
  alignItems:"center"
},
thirdFirstinnerView:{
  height:height/10,
  width:width/1.1,
  backgroundColor:"white",
  borderRadius:8,
  borderWidth:0.7,
  borderColor:"grey"
},
item: {
  // flex:1,
  width: width / 1.1,
  marginVertical: 7,
  alignSelf: 'flex-start',
  flexDirection: 'row',
  backgroundColor: 'white',
  alignItems: 'center',
  height: height / 10,
  borderRadius: 10,
  borderColor: 'grey',
  borderWidth: 0.5,
},
Image1View:{
    height:height/8,
    width:width/5.5,
  //   backgroundColor:"red",
    alignItems:"center",
    justifyContent:"center"
},
imageContainer:{
height:height/18,
width:width/10,

},
nameText:{
    fontSize:height/85,
    paddingVertical:5

},
MatchView:{
    height:height/10,
    width:width/1.8,
  //   backgroundColor:"green"

},
WorldcupView:{
    height:height/34,
  width:width/2.7,
  // backgroundColor:"red",
  justifyContent:"flex-end",
  alignItems:"center"
},
teamView:{
  
  height:height/32,
  width:width/1.8,
  // backgroundColor:"cyan",
flexDirection:"row",
alignItems:"center"
},
matchtime:{
height:height/48,
width:width/2.22,
// backgroundColor:"red",
flexDirection:"row",
alignItems:"center",
justifyContent:"flex-start"
},
teamText:{
color:"black",
fontSize:height/55,
paddingHorizontal:10
},
gameText:{
color:"#rgb(44,48,48)",
fontSize:height/70,
paddingLeft:11

},
game1Text:{
color:"#rgb(44,48,48)",
fontSize:height/70

},
clockView:{
height:height/10,
width:width/7,
// backgroundColor:"red",
alignItems:'center',
justifyContent:"center"
},
Image2container:{
height:height/40,
width:width/19,
marginVertical:7
},
matchText:{
fontSize:height/85,
color:"black"
},
worlcupText:{
  fontSize:height/60,
  color:"black",
  
},
item2:{
        // flex:1,
        width: width / 4.5,
        margin:8,
        // alignSelf: 'flex-start',
        // flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        height: height / 14,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.8,
        justifyContent: 'center',
  },
  item1: {
    // flex:1,
    width: width / 4,
    margin:10,
    // alignSelf: 'flex-start',
    // flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.8,
    justifyContent: 'center',
  },
  numView:{
    height: height / 25,
    width: width / 5,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item3: {
    // flex:1,
    width: width / 7.5,
    // marginVertical: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    // borderColor:"grey",
    // borderWidth:0.8,
  },

});

import React,{useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image,FlatList} from 'react-native';
import {
  AppText,
  AppView,
  AppImage,
  AppTouchable,
} from '../../components/Atom/atom';
import Header from '../../components/molecules/Header';
import {
  
  star
} from '../../assets/icon';
import HeaderTwo from '../../components/molecules/HeaderTwo';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {height, width} = Dimensions.get("screen");


const DATA=[
{
   tournamentname:"English Premiere league " ,
   game:"Cricket",
   task:"( 2 )",
   img:star,
},
{
    tournamentname:"India Premiere league " ,
    game:"Cricket",
    task:"( 2 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league  " ,
    game:"Cricket",
    task:"( 5 )",
    img:star,
 },
 {
    tournamentname:"English vs India Test  " ,
    game:"Cricket",
    task:"( 1 )",
    img:star,
 },
 {
    tournamentname:"Australia Cup 2021" ,
    game:"Cricket",
    task:"( 2 )",
    img:star,
 },
 {
    tournamentname:"West endies vs Bangladesh T20 " ,
    game:"Cricket",
    task:"( 5 )",
    img:star,
 },
 {
    tournamentname:"World Cup 2021" ,
    game:"Cricket",
    task:"( 1 )",
    img:star,
 },
 {
    tournamentname:"West endies vs Bangladesh T20  " ,
    game:"Cricket",
    task:"( 5 )",
    img:star,
 },
 {
    tournamentname:"World Cup 2021 " ,
    game:"Cricket",
    task:"( 1 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 2 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 3 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 1 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 5 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 2 )",
    img:star,
 },
 {
    tournamentname:"Big Bash league " ,
    game:"Cricket",
    task:"( 5 )",
    img:star,
 },
];
const Item = ({item, img, tournamentname, game,task}) => (
    <View  style={styles.item}>
        <View style={styles.tournamentgameView}>
<Text style={styles.tournamentnameText}>{tournamentname}</Text>
    <Text style={styles.gameText}>{game}</Text>
</View>
    <View style={styles.taskStarView}>
    <Text style={styles.taskText}>{task}</Text>
    <TouchableOpacity>
    <Image style={styles.starImage} source={star}></Image>
    </TouchableOpacity>
   
    </View>
     
   </View>
     
  
  );


    
const ChampionsTournament = () => {

    const renderItem = ({item}) => (
        <Item
          
          tournamentname={item.tournamentname}
          game={item.game}
          task={item.task}
          img={item.img}
        
        />
      );
   
  return (
    
   
  
  <AppView style={styles.mainContainer}>
  <AppView
    style={{
        height: height / 14, 
        width: width / 1,
        //  backgroundColor: 'red'
         }}>
    <HeaderTwo  />
  </AppView>
  <AppView style={styles.FirstContainer}>
      <AppView style={styles.FirstOneView}>
          <TouchableOpacity >
          <AppText style={styles.sportsText}>ALL SPORTS</AppText>
          </TouchableOpacity>
         
      </AppView>
      <AppView style={styles.FirstTwoView}>
          <TouchableOpacity>
          <AppText style={styles.tournamentText}>TOURNAMENT</AppText>
          </TouchableOpacity>
     
      </AppView>
      <AppView style={styles.FirstThreeView}>
          <TouchableOpacity>
          <AppText style={styles.tournamentText}>MATCH</AppText>
          </TouchableOpacity>
     
      </AppView>
    
  </AppView>
  <AppView style={{height:height/1.3,backgroundColor:"white",width:width/1}}>
    <FlatList
    showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        // keyExtractor={(item)=>item,id}
      />
    </AppView>
  
</AppView>

  );
};

export default ChampionsTournament;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: 'grey',
  },
  FirstContainer:{
      height:height/20,
      width:width/1,
      backgroundColor:"#7A25CE",
      flexDirection:"row"
  },
  FirstOneView:{
      height:height/21,
      width:width/2.9,
      backgroundColor:"#7A25CE",
      alignItems:"center",
      justifyContent:"center"
  },
  FirstTwoView:{
    height:height/21,
    width:width/3.5,
    backgroundColor:"#7A25CE",
    alignItems:"center",
    justifyContent:"center"
  },
  sportsText:{
      fontSize:height/65,
      color:"white",
      fontWeight:"500"
  },
  tournamentText:{
    fontSize:height/65,
    color:"white",
    fontWeight:"500"
  },
  item: {
    // flex:1,
    width: width / 1,
    // marginVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 12,
    // borderRadius: 10,
    borderColor:"grey",
    borderWidth:0.5,
  },
  tournamentnameText:{
      fontSize:height/60,
      color:"black",
      fontWeight:"600",
    //   width:width/2.2,
    // //   backgroundColor:"green",
    //   textAlign:"right",
      paddingVertical:5,
      paddingHorizontal:18

  },
  starImage:{
height:height/40,width:20
  },
  taskText:{
    fontSize:height/54,
    color:"black",
    paddingHorizontal:18
  },
  gameText:{
    fontSize:height/60,
    color:"black",
    paddingHorizontal:18
  },
  tournamentgameView:{
      height:height/12,
    width:width/1.7,
    // backgroundColor:"red",
    justifyContent:"center",
},
taskStarView:{
    height:height/12,
    width:width/2.7,
    // backgroundColor:"green",
    flexDirection:"row",
justifyContent:"flex-end",
alignItems:"center"
},
FirstThreeView:{
  height:height/21,
    width:width/3.2,
    backgroundColor:"#7A25CE",
    alignItems:"center",
    justifyContent:"center"
}
});


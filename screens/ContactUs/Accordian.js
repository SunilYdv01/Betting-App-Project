import React, { Component } from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { View, Text, Image } from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Header from '../../components/molecules/Header';
import { BackArrow } from '../../assets/icon';
const { height, width } = Dimensions.get("screen")


const SECTIONS = [
  {
    title: 'What are the benefits',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ',
    img: require("../../assets/images/dropdown/dropdown.png")
  },
  {
    title: 'What is membership?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'How can you make a deposit?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'How can i help?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'What are the basic requirements?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'What is premium account?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'What are donating programs?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },
  {
    title: 'How do i get a reference?',
    content: 'Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et '
  },

];

class Accordian extends Component {
  state = {
    activeSections: [],
  };

  // _renderSectionTitle = (section) => {
  //   return (
  //     <View>
  //       {/* <Text>{section.content}</Text> */}
  //     </View>
  //   );
  // };

  _renderHeader = (section) => {
    return (
      <View style={{
        height: height / 9.5, width: width,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexDirection: 'row'

      }}>
        <View style={{height:height/10,width:width/1.1,
        justifyContent:'center',
        // backgroundColor:"green"
        }}>
          <Text style={{ fontSize: height / 37 }}>{section.title}</Text>
        </View>
        <View style={{
          // backgroundColor:'cyan',
          height:height/10,width:width/16,justifyContent:'center',alignItems:'center'}}>
          <Image source={require("../../assets/images/dropdown/dropdown.png")} />
        </View>

      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={{
        backgroundColor: '#47087B',
        height: height / 6,
         justifyContent: 'center',
         alignItems:'center',
        width:width/1
      }}>
      <View style={{height: height / 6,
         justifyContent: 'center',
         alignItems:'center',
        width:width/1.1}}>
      <Text style={{ fontSize: height / 55,color:"#FFFFFF",alignSelf:'center' }}>{section.content}</Text>
      </View>
        
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {

    return (
      <SafeAreaView>
        <View style={{ height: height, width: width }}>
          
        <ScrollView>
        <Accordion
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
          
        </View>
      </SafeAreaView>

    );
  }
}
export default Accordian


// import React, { Component } from "react";
// import {
//   Dimensions,
//   SafeAreaView,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from "react-native";
// //import { View, Text, Image} from 'react-native-animatable';
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Accordion from "react-native-collapsible/Accordion";
// import Icon from "react-native-vector-icons/MaterialIcons";
// // import FilterHeader from "../../components/Molecules/FilterHeader";

// // import WithDrawHeader from "../../components/Molecules/WithDrawHeader";
// const { height, width } = Dimensions.get("screen");

// // const SECTIONS = [
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //     img: require("../../assets/images/Arrow/arrowdown.png"),
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// //   {
// //     title:
// //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// //     content:
// //       "Lorem ipsum dolor sit amet, consecteturcing elit. Aenean euismod bibendum laoreet. Proin avida sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et ",
// //   },
// // ];

// var faq = [{}];
// var item;
// class Accordian extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       Data: [],
//       iAgree: false,
//       activeSections: [],
//     };
//   }

//   componentDidMount() {
//     this.getApi();
//   }

//   toggle = (iAgree) => {
//     this.setState(!iAgree);
//   };
//   getApi = async () => {
//     const value = await AsyncStorage.getItem("token");
//     axios({
//       method: "get",
//       url: `https://java-whitepaper.mobiloitte.org/static/get-FAQ-list`,
//       headers: {
//         Authorization: `Bearer ${value}`,
//       },
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           this.setState({ Data: res.data.data });
//           //  console.log("hfhrfgrfygryfgh ============**********====>",res.data.data);
//           // console.log("Data =====================*====>", this.state.Data[]);
//         } else {
//           alert("Something went wrong");
//         }
//       })
//       .catch((err) => console.log("error catch---->>>>", err));
//   };

//   _renderHeader = (section) => {
//     console.log("section1111", section);
//     return (
//       <View
//         style={{
//           // height: height / 12,
//           height: height / 15,
//           width: width,
//           backgroundColor: "#FFFFFF",
//           alignItems: "center",
//           justifyContent: "space-around",
//           flexDirection: "row",
//           marginVertical: 3,
//         }}
//       >
//         <View style={styles.txtView}>
//           <Text
//             style={{
//               // fontFamily: "Roboto-Light",
//               fontSize: height / 60,
//               fontStyle: "normal",
//               fontWeight: "400",
//               color: "#363636",
//             }}
//           >
//             {section.question}
//           </Text>
//         </View>

//         <Image
//           source={
//             this.state.iAgree
//               ? require("../../assets/images/AddIconTwo/AddIconTwo.png")
//               : require("../../assets/images/AddIconTwo/AddIconTwo.png")
//           }
//           resizeMode="contain"
//           style={styles.img}
//         />
//       </View>
//     );
//   };

//   _renderContent = (section) => {
//     return (
//       <View
//         style={{
//           backgroundColor: "rgba(246, 246, 246, 1)",
//           //  backgroundColor:"red",
//           height: height / 6,
//           width: width / 1.05,
//           //justifyContent: "center",
//           // alignItems:"center",
//           alignSelf: "center",
//         }}
//       >
//         <Text
//           style={{
//             // fontFamily: "Roboto-Regular",
//             fontSize: height / 55,

//             color: "#363636",
//           }}
//         >
//           {section.answer}
//         </Text>
//       </View>
//     );
//   };

//   _updateSections = (activeSections) => {
//     this.setState({ activeSections });
//   };
//   _toggle = () => {};
//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         <View
//           style={{
//             height: height / 1.2,
//             width: width,
//             //  backgroundColor:"red"
//           }}
//         >
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <Accordion
//               sections={this.state.Data}
//               activeSections={this.state.activeSections}
//               renderSectionTitle={this._renderSectionTitle}
//               renderHeader={this._renderHeader}
//               renderContent={this._renderContent}
//               onChange={this._updateSections}
//             />
//           </ScrollView>
//         </View>
//       </View>
//     );
//   }
// }
// export default Accordian;

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: height / 1,
//     width: width / 1,
//     backgroundColor: "rgba(246, 246, 246, 1)",
//   },
//   img: {
//     height: height / 20,
//     width: width / 35,
//   },
//   imgView: {
//     // backgroundColor: "aqua",
//     height: height / 20,
//     width: width / 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     height: height / 10,
//     backgroundColor: "#E5E5E5",
//     width: width,
//     alignItems: "center",
//   },
//   txtView: {
//     //backgroundColor: "yellow",
//     height: height / 16,
//     width: width / 1.15,
//     // alignItems:"center"
//     // alignSelf:"center"
//   },
// });
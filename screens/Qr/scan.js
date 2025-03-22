import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View,
    StyleSheet,
    SafeAreaView,
    BackHandler,
    Image,
    Dimensions 
} from 'react-native';

import Header from "../../components/molecules/Header"
const {height,width}=Dimensions.get("screen")


class Scan extends Component {
    constructor(props,) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        // const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.'
        return (
      <SafeAreaView>
            <View style={styles.scrollViewStyle}>
                <Fragment>
                
                    {!scan && !ScanResult &&   
                    <View style={{height:height/1.35,width:width/1,justifyContent:"center"}}>
                        <View style={styles.cardView} >
                            {/* <Text numberOfLines={8} style={styles.descText}>{desccription}</Text> */}

                          <View style={{height:height/2.3,width:width/1.1,alignItems:"center"}}>
                          <TouchableOpacity onPress={()=> BackHandler.exitApp()}>
                          <Image resizeMode="contain" style={{height:height/16,width:width/8,marginVertical:20}} source={require("../../assets/images/camera.png")}></Image>
                            </TouchableOpacity>
                            <Image resizeMode="contain" style={{height:height/4,width:width/1.8}} source={require("../../assets/images/qrscanner.png")}></Image>
                          </View>
                            
                            <TouchableOpacity onPress={this.activeQR} style={{height:height/18,width:width/1.4,backgroundColor:"white",borderColor:"#47087B",borderWidth:2,borderRadius:15,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            <Image resizeMode="contain" style={{tintColor:"purple",height:height/30,width:width/15,marginHorizontal:10}} source={require("../../assets/images/camera.png")}></Image>
                                <Text style={styles.buttonTextStyle}>Click Here to Scan </Text>
                            </TouchableOpacity>

                        </View>
                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result !</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={{height:height/18,width:width/1.4,backgroundColor:"white",borderRadius:15,alignItems:"center",justifyContent:"center",borderColor:"purple",borderWidth:2}}>
                                    <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                                </TouchableOpacity>

                            </View>
                        </Fragment>
                    }


                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            vibrate= {true}
                          
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                           
                            topContent={
                                <View style={{height:height/3.8,width:width/1,backgroundColor:"white"}}>
                                      <Text style={styles.centerText}>
                                   Scan  QR Code of Your Crypto Wallet  And Withdraw The Cryptocurrency in your Account  </Text>
                                   {/* <Text style={styles.centerText}>
                                   And helloolollolohdjkghdjkhgdjkfhsjk  </Text> */}
                                </View>
                              
                            }
                            bottomContent={
                                <View style={{height:height/4,width:width/1,backgroundColor:"white",alignItems:"center",top:-25,position:"absolute"}}>
                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                       <View style={{height:height/12,width:width/5,backgroundColor:"white",borderRadius:40,top:-30,alignItems:"center",}}>
                                           <Image style={{tintColor:"purple",height:height/16,width:width/7.5,}} source={require("../../assets/images/camera2.png")}></Image>
                                        {/* <Text style={styles.buttonTextStyle}>OK. Got it!</Text> */}
                                        </View>
                                        
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                        <View style={{height:height/18,width:width/1.5,backgroundColor:"white",borderRadius:15,borderColor:"purple",borderWidth:2,justifyContent:"center",alignItems:"center"}}>
                                        <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>

                            }
                        />
                    }
                </Fragment>
            </View>
            </SafeAreaView> 

        );
    }
}

export default Scan;

const styles = StyleSheet.create({
  scrollViewStyle: {
    height:height/1,
    width:width/1,
    // justifyContent: 'flex-start',
    backgroundColor: 'grey'
},

textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
    // backgroundColor:"green"
},
textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white'
},
cardView: {
    width: width/1.1,
    height: height/1.7,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    // padding: 25,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: '10%',
    backgroundColor: 'white'
},
scanCardView: {
    width: width/1.1,
    height: height/1.7,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
buttonWrapper: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center'
},
buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20
},
buttonScan2: {
    // marginLeft: deviceWidth / 2 - 50,
    width: width/1.1,
    height: height/1.7,
    // width: 100,
    // height: 100,
},
descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16
},
highlight: {
    fontWeight: '700',
},
centerText: {
marginVertical:20,
    textAlign: 'center',
    fontSize: height/45,
fontWeight:"700",
    color: 'grey',
},
textBold: {
    fontWeight: '500',
    color: '#000',
},
bottomContent: {
   width: width/1.1,
   height: 120,
},
// buttonTouchable: {
//     fontSize: 21,
//     backgroundColor: 'red',
//     // marginTop: 32,
//     width: width/1.1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: height/10
// },
buttonTextStyle: {
    color: 'purple',
    fontWeight: '700',
    fontSize:height/50
}
})
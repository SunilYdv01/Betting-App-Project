import React from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
// import Header from '../../components/molecules/Header'
import Scan from './scan'
import Header from '../../components/molecules/Header'
import { SafeAreaView } from 'react-native'
const {height,width}=Dimensions.get("screen")
const Qr = ({props,navigation}) => {
  return (
    <SafeAreaView>
    <View>
       <View style={{height:height/17,width:width/1,}}>
                    <Header
              head={false}
              headerText2={'Qr Code Scanner'}
              backImage={require("../../assets/images/BackArrow/BackArrow.png")}
              onPress2={() => navigation.goBack()}
            />
                    </View>
           
     <Scan />
    </View>
    </SafeAreaView>
  )
}

export default Qr;








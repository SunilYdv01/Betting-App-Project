import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Accordian from './Accordian'
import Header from '../../components/molecules/Header';
import { BackArrow } from '../../assets/icon';
import Accordian1 from './Accordian';

const ContactUs = ({props, navigation}) => {
  return (
    <SafeAreaView>
    <Header
            head={false}
            backImage={BackArrow}
            headerText2={'Contact Us & FAQs'}
            onPress2={() => navigation.goBack()}
          />
          <ScrollView style={{bottom:3}}>
          <Accordian/>
          </ScrollView>
    
    </SafeAreaView>
  )
}

export default ContactUs

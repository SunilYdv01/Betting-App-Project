import React,{useEffect,useState} from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from "../../components/molecules/Header"
const {height,width}=Dimensions.get("screen")
import {BackArrow} from "../../assets/icon"

import {CreditCardInput} from 'react-native-payment-card'

const AddCardDetails = ({props,navigation}) => {



    const viewProfiledetails = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log('====== my token======>>>>', value);
    
        axios({
          method: 'post',
          url: `https://java-create-token.mobiloitte.org/account/add-card`,
          data: {
          
          },
          headers: {
            Authorization: `Bearer ${value}`,
            'content-type': 'application/json',
          },
        })
          .then(res => {
            // alert("hello")
            if (res.status === 200) {
              console.log('Viewprofile -----details-------- >>>>>', res.data);
              props.navigation.navigate('myprofile', {
                firstName: FirstName,
                lastName: LastName,
                email: Email,
                phoneNo:PhoneNo,
                imageUrl: urlImage,
              });
              //  setUserProfile(res.data.data)
              //  console.log("userprofile2222----yash-->>>",userProfile);
            } else {
              alert('Something went wrong');
            }
          })
          .catch(err => console.log('error catch---->>>>', err));
      };
    

    return (
        <SafeAreaView>
        <View>
            <Header head={false}
            backImage={BackArrow}
            headerText2={"Add Your Card"}
            onPress2={() => navigation.goBack()}
            />

<View style={{height:height/1.5,width:width/1}}>
<CreditCardInput

autoFocus
requiresName
requiresCVC
// labelStyle={"red"}
// inputStyle={}
validColor={"black"}
invalidColor={"red"}
placeholderColor={"darkgray"}

/>
</View>

<View style={{height:height/10,width:width/1,justifyContent:"center",alignItems:"center"}}>

   
    <TouchableOpacity>
    <View style={{height:height/16,width:width/1.25,borderRadius:10,backgroundColor:"#196D5B",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:height/48,color:"white",fontWeight:'700'}}>Continue</Text>
    </View>
    </TouchableOpacity>
  
</View>
        </View>
        </SafeAreaView>
    )
}

export default AddCardDetails

const styles = StyleSheet.create({})



// import React, { useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// // import Button from './Button';
// import TextField from './TextField';
// const CreditCardForm = () => {
//   const [name, setName] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiration, setExpiration] = useState('');
//   const [cvv, setCvv] = useState('');
//   function onSubmit() {
//     console.log('form submitted');
//   }
//   return (
//     <View>
//       <TextField
//         style={styles.textField}
//         label="Cardholder Name"
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />
//       <TextField
//         style={styles.textField}
//         label="Card Number"
//         value={cardNumber}
//         onChangeText={(text) => setCardNumber(text)}
//       />
//       <View style={styles.row}>
//         <TextField
//           style={[
//             styles.textField,
//             {
//               marginRight: 24,
//             },
//           ]}
//           label="Expiration Date"
//           value={expiration}
//           onChangeText={(text) => setExpiration(text)}
//         />
//         <TextField
//           style={styles.textField}
//           label="Security Code"
//           value={cvv}
//           onChangeText={(text) => setCvv(text)}
//         />
//       </View>
//       <Button title="PAY $15.12" onPress={onSubmit} />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   row: {
//     flex: 1,
//     flexDirection: 'row',
//     marginBottom: 36,
//   },
//   textField: {
//     flex: 1,
//     marginTop: 24,
//   },
// });
// export default CreditCardForm;
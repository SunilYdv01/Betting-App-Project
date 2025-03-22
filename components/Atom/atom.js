import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const AppView = (props) => (
  <View style={props.style} {...props}>
    {props.children}
  </View>
);

const AppText = (props) => (
  <Text style={[props.style]} {...props}>
    {props.children}
  </Text>
);

const AppImage = (props) => (
  <Image source={props.source} style={props.style} {...props} />
);
const AppBackgroundColor = (props) => (
  <backgroundColor source={props.source} style={props.style} {...props}>
    {props.children}
  </backgroundColor>
);

const AppBackgroundImage = (props) => (
  <ImageBackground source={props.source} style={props.style} {...props}>
    {props.children}
  </ImageBackground>
);

const AppButton = (props) => (
  <TouchableOpacity {...props} onPress={props.onpress} style={[props.style]}>
    <Text>{props.title}</Text>
  </TouchableOpacity>
);

const AppTouchable = (props) => (
  <TouchableOpacity
    {...props}
    onPressIn={props.onPressIn}
    style={[props.style]}>
    {props.children}
  </TouchableOpacity>
);

const AppIndicator = (props) => <ActivityIndicator {...props} />;

const AppHideTouchable = (props) => <TouchableWithoutFeedback {...props} />;

const AppList = (props) => <FlatList {...props} />;

export {
  AppView,
  AppText,
  AppImage,
  AppBackgroundColor,
  AppTouchable,
  AppBackgroundImage,
  ActivityIndicator,
  AppButton,
  AppIndicator,
  AppHideTouchable,
  AppList,
};

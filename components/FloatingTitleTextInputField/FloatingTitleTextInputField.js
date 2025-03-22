import React, {useState} from 'react';
import {View, Animated, StyleSheet, TextInput} from 'react-native';
import {string, func, object, number} from 'prop-types';

const FloatingTitleTextInputField = props => {
  const propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,
  };

  const defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {},
    otherTextInputAttributes: {},
  };

  //   constructor(props) {
  //     super(props);
  //     const {value} = this.props;
  //     this.position = new Animated.Value(value ? 1 : 0);
  //     this.state = {
  //       isFieldActive: false,
  //     };
  //   }
  const {value} = props;
  const [isFieldActive, setIsFieldActive] = useState(false);
  var position = new Animated.Value(value ? 1 : 0);

  const _handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive((isFieldActive = true));
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  };

  const _handleBlur = props => {
    if (isFieldActive && !props.value) {
      setIsFieldActive((isFieldActive = false));
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  };

  const _onChangeText = updatedValue => {
    const {attrName, updateMasterState} = props;
    updateMasterState(attrName, updatedValue);
  };

  const _returnAnimatedTitleStyles = () => {
    const isFieldActive = props;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
    } = {props};

    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    };
  };

  //   render() {
  return (
    <View style={Styles.container}>
      <Animated.Text style={[Styles.titleStyles, _returnAnimatedTitleStyles()]}>
        {props.title}
      </Animated.Text>
      <TextInput
        value={props.value}
        style={[Styles.textInput, props.textInputStyles]}
        underlineColorAndroid="transparent"
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        onChangeText={_onChangeText}
        keyboardType={props.keyboardType}
        {...props.otherTextInputProps}
      />
    </View>
  );
};
// }

export default FloatingTitleTextInputField;

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 50,
    marginVertical: 4,
  },
  textInput: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Avenir-Medium',
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 3,
    left: 4,
  },
});

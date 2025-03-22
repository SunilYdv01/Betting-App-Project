import React from 'react';
import {Dimensions, ActivityIndicator, View} from 'react-native';

const Loader = ({color, size, customStyle}) => {
  return (
    <ActivityIndicator
      color={color || 'rgb(94,28,159)'}
      size={size || 'large'}
    />
  );
};
export default Loader;

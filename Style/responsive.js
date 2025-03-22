// Dimensions will Import Here

import {Dimensions, Platform, PixelRatio} from 'react-native';
//import styles from './styles';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

// based on iphone 6 scale
const scale = SCREEN_WIDTH / 375;
const ScaleHeight = SCREEN_HEIGHT / 667;
const ScaleWidth = SCREEN_WIDTH / 375;
const ScaleWidthMenu = (SCREEN_WIDTH - 68) / 307;

export function RF(size) {
  if (Platform.OS === 'ios') return Math.round(size * ScaleWidth);
  else return Math.round(size * ScaleWidth);
}

export function SH(height) {
  return Math.round(height * ScaleHeight);
}

export function SW(width) {
  return Math.round(width * ScaleWidth);
}

export function scaleWidthMenu(width) {
  return Math.round(width * ScaleWidthMenu);
}

export function normalizeFontMenu(size) {
  if (Platform.OS === 'ios') return Math.round(size * ScaleWidthMenu);
  else return Math.round(size * ScaleHeight);
}

//Extra Responsive functions

export function hp(percentage) {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('screen').height * percentage) / 100,
  );
}

export function wp(percentage) {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('screen').width * percentage) / 100,
  );
}

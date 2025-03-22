import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {AppView, AppText, AppImage} from '../../components/Atom/atom';
import AppIntroSlider from 'react-native-app-intro-slider';
const {height, width} = Dimensions.get('window');

const slides = [
  {
    key: 1,
    image: require('../../assets/images/TutorialOne/TutorialOne.png'),
    title: 'Professionals you\n         can trust',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes,',
    // backgroundColor: 'rgba(90,26,153,255)',
    backgroundColor: 'rgb (107, 57, 118)',
    titleColor: 'rgb(255,255,255)',
    textColor: 'rgb(255,255,255)',
  },
  {
    key: 2,
    image: require('../../assets/images/TutorialTwo/TutorialTwo.png'),
    title: 'Professionals you\n         can trust',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes,',
    backgroundColor: 'rgb(255,255,255)',
    titleColor: 'rgb(49,49,49)',
    textColor: 'rgb(26,25,25)',
  },
  {
    key: 3,
    image: require('../../assets/images/TutorialThree/TutorialThree.png'),
    title: 'Professionals you\n         can trust',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes,',
    // backgroundColor: 'rgba(101,175,30,255)',
    backgroundColor: 'rgb(101,175,30)',
    titleColor: 'rgb(255,255,255)',
    textColor: 'rgb(255,255,255)',
  },
];

const Tutorial = props => {
  const [showRealApp, setShowRealApp] = useState(false);

  const _onDone = () => {
    setShowRealApp(true);
    props.navigation.navigate('Login');
  };

  const _onSkip = () => {
    setShowRealApp(true);
    props.navigation.navigate('Login');
  };

  const _renderItem = ({item}) => {
    return (
      <AppView style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
        <AppView style={styles.imgContainer}>
          <AppImage source={item.image} />
        </AppView>
        <AppView style={styles.titleContainer}>
          <AppText style={[styles.title, {color: item.titleColor}]}>
            {item.title}
          </AppText>
        </AppView>
        <AppView style={styles.txtContainer}>
          <AppText style={[styles.txtView, {color: item.textColor}]}>
            {item.text}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  return (
    <SafeAreaView backgroundColor="#7A25CE">
      <AppView style={styles.mainContainer}>
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
          onSkip={_onSkip}
          showSkipButton={true}
          showNextButton={false}
        />
      </AppView>
    </SafeAreaView>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  mainContainer: {
    height: height * 0.97,
    width: width * 1,
    backgroundColor: 'rgba(90,26,153,255)',
  },
  slide: {
    height: height * 1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'rgb(255,255,255)',
    fontSize: height/35,
    fontWeight: '700',
  },
  imgContainer: {
    height: height * 0.4,
    width: width * 1,
    alignItems: 'center',
  },
  txtContainer: {
    height: height * 0.25,
    width: width * 0.85,
    alignItems: 'center',
  },
  txtView: {
    color: 'rgb(255,255,255)',
    fontSize: height/55,
  },
});

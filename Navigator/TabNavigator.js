import React from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home/HomeScreen';
import TabBarComponent from './TabBarComponent';
const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const CustomTabBarButton = props => {
  const {onPress, children, navigation} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // top: -30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          //   backgroundColor: THEME_COLOR,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
export default function BottomTabStack() {
  return (
    <NavigationContainer>
      <View style={{}}>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          tabBarOptions={{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            style: {
              // backgroundColor: "#fff",
              paddingTop: 12,
              // height: height * 0.075,
              /* Changes starts here */
              position: 'absolute',
              // height: height * 0.095,
              // borderRadius: 35,
              paddingBottom: 5,
              // left: 20,
              // right: 20,
              // bottom: 10,
              elevation: 10,
            },
            labelStyle: {
              textAlign: 'center',
              fontSize: 14,
            },
            tabBarIcon: () => (
              <ImageBackground
                // source={require('../assets/images/TutorialTwo/TutorialTwo.png')}
                style={{
                  width,
                  height: 63,
                }}
              />
            ),
          }}
          tabBar={props => <TabBarComponent {...props} />}>
          {/* Home Tab */}
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                      : require('../assets/images/HomeIcon/HomeIcon.png')
                  }
                  style={{
                    height: size,
                    width: size,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />

          {/* Timer Tab */}
          <Tab.Screen
            name="Timer"
            component={Home}
            options={{
              tabBarLabel: 'Timer',
              // tabBarVisible: false,
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                      : require('../assets/images/IrelandBall/IrelandBall.png')
                  }
                  style={{
                    height: size,
                    width: size,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />

          {/* Add Tab */}
          <Tab.Screen
            name="Add"
            component={Home}
            options={{
              tabBarLabel: 'Add',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/AddIconOne/AddIconOne.png')
                      : require('../assets/images/AddIconTwo/AddIconTwo.png')
                  }
                  style={{
                    top: 6,
                    height: size,
                    width: size,
                    tintColor: '#fff',
                  }}
                  resizeMode="contain"
                />
              ),
              // tabBarButton: (props) => <CustomTabBarButton {...props} />
            }}
          />

          {/* Trophy Tab */}
          <Tab.Screen
            name="Trophy"
            component={Home}
            options={{
              tabBarLabel: 'Trophy',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                      : require('../assets/images/IrelandBall/IrelandBall.png')
                  }
                  style={{
                    height: size,
                    width: size,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />

          {/* Profile Tab */}
          <Tab.Screen
            name="User"
            component={Home}
            options={{
              tabBarLabel: 'User',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/HomeIconTwo/HomeIconTwo.png')
                      : require('../assets/images/IrelandBall/IrelandBall.png')
                  }
                  style={{
                    height: size,
                    width: size,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
  shadow: {
    shadowColor: '#e5e5e3',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.2,
    elevation: 5,
  },
});

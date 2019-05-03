import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './src/screens/Home';
import Description from './src/screens/Description';

useScreens();

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Description: {
      screen: Description,
    },
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

export default createAppContainer(App);

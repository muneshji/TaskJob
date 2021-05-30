import React from 'react';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import BottomTab from './src/Componenet/BottomTab'
  import updaete from './src/Componenet/Update'
  import Home from './src/Componenet/Home';


  const AppStackNavigator = createStackNavigator({
  
    BottomTab_screen: {
      screen: Home,
      navigationOptions: {
        header: null//removing the top navigation bar,
      }
    },
    BottomTab_screen1: {
      screen: BottomTab,
      navigationOptions: {
        header: null//removing the top navigation bar,
      }
    },

    Update: {
      screen: updaete,
      navigationOptions: {
        header: null//removing the top navigation bar,
      }
    },

  
  },
  {
    initialRouteName: 'BottomTab_screen1',
  });
  
  export default createAppContainer(AppStackNavigator);






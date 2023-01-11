/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation-stack';

import Details from './components/Details';
import Home from './components/Home';

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(App);

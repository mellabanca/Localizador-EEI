import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import MeteorScreen from './screens/Meteor';
import IssLocationScreen from './screens/IssLocation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
                       screenOptions={{headerShown: false}}
      >
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "IssLocation" component={IssLocationScreen}/>
        <Stack.Screen name = "Meteors" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardScreen from '../screens/onBoard/onboardScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import OtpScreen from '../screens/otpScreen/otpScreen';
import Home from '../screens/homeScreen/homes';
import Location from '../screens/Location/location';

const homeStack = createNativeStackNavigator()
const Navigation = () => {
  return (
   <NavigationContainer>
    <homeStack.Navigator>
        <homeStack.Screen name='onBoardScreen' component={OnboardScreen} options={{headerShown:false}} />
        <homeStack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}} />
        <homeStack.Screen name='OtpScreen' component={OtpScreen} options={{headerShown:false}} />
        <homeStack.Screen name='Location' component={Location} options={{headerShown:false}} />
        <homeStack.Screen name='HomeScreen' component={Home} options={{headerShown:false}} />
    </homeStack.Navigator>
   </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})
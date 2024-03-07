import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import OTP from './components/OTP';
import Reset from './components/ResetPassword';
import SelectCarPage from './components/SelectCarPage';
import CheckoutPage from './components/CheckoutPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ResetPassword" component={Reset} />
          <Stack.Screen name="SelectCarPage" component={SelectCarPage} />
          <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

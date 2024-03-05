// LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  const LoginbuttonClick = () => {
    console.log('Login pressed Again');
    navigation.navigate('SelectCarPage');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.input} placeholder="Enter your username" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
      </View>

      <Text style={styles.link}>Forgot your password?</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={LoginbuttonClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? <Text style={styles.signupLink}>Signup!</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  buttonContainer: {
    backgroundColor: '#9b59b6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;

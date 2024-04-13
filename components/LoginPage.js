import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_URL } from '@env';
import { useColorScheme } from 'react-native';

const LoginPage = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendToRegister = async () => {
    navigation.navigate('RegisterPage');
  };

  const sendToReset = async () => {
    navigation.navigate('ResetPassword');
  };

  const loginSuccess = async () => {
    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!username) {
      alert('Please fill in the username');
      return;
    }

    if (!password) {
      alert('PLease fill in correct password');
      return;
    }

    try {
      const requestBody = {
        username: username,
        password: password,
      }

      console.log(requestBody);

      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const { user_id } = responseData.main;

      console.log('Login successful. User ID:', user_id);
      alert('Your Login is successful!');

      // Store user_id in AsyncStorage
      await AsyncStorage.setItem('user', user_id.toString());

      // Navigate to the SelectCarPage
      navigation.navigate('SelectCarPage');
    } catch (error) {
      console.error('Login failed:', error);

      // Additional error handling based on error types
      if (error instanceof TypeError) {
        // Handle network errors or fetch errors
        alert('Network error occurred. Please check your internet connection.');
      } else if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        alert('Error parsing server response. Please try again later.');
      } else {
        // Handle other types of errors
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
      <KeyboardAvoidingView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <View style={[styles.inner, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
          <Text style={[styles.title, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Welcome Back!</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Username:</Text>
            <TextInput style={[styles.input, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]} placeholder="Enter your username" onChangeText={(text) => setUsername(text)} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Password:</Text>
            <TextInput style={[styles.input, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]} placeholder="Enter your password" secureTextEntry onChangeText={(text) => setPassword(text)} />
          </View>

          <TouchableOpacity onPress={sendToReset}><Text style={[styles.link, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Forgot your password?</Text></TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: colorScheme === 'dark' ? '#4b4b4b' : '#9b59b6' }]} onPress={loginSuccess}>
            <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text>Don't have an account? <TouchableOpacity onPress={sendToRegister}>
              <Text style={[styles.signupLink, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Signup!</Text>
            </TouchableOpacity></Text>
          </View>
        </View>
      </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    padding: 12,
    width: '100%',
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

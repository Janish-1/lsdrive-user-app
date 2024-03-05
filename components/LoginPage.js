import React , {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSuccess = () => {
    // Log the body data before making the API call
    const requestBody = {
      username: username,
      password: password,
    };
    console.log('Request body:', requestBody);
    console.log(JSON.stringify(requestBody))

    // Call your API endpoint here to register the user
    fetch(`http://lsdrivebackend.ramo.co.in/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle success response
      console.log('Login successful:', data);
      alert('Your Login is successful!');
      navigation.navigate('Dashboard');
    })
    .catch(error => {
      // Handle error
      console.error('Login failed:', error);
      alert('Login failed. Please try again later.');
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} placeholder="Enter your username" onChangeText={(text) => setUsername(text)} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry onChangeText={(text) => setPassword(text)} />
        </View>

        <Text style={styles.link}>Forgot your password?</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={loginSuccess}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? <Text style={styles.signupLink}>Signup!</Text></Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

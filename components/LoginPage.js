// LoginPage.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLoginPress = () => {
    // Implement your login logic here
    if (loginForm.email && loginForm.password) {
      // Assuming successful login, you can navigate to another page or perform other actions
      console.log('Login successful', loginForm);
      // For example, navigate to the home page
      // navigation.navigate('Home');
    } else {
      console.log('Incomplete login form');
      // Handle incomplete form submission
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 10,
  },
  registerLink: {
    marginTop: 20,
    color: '#3498db',
  },
});

export default LoginPage;

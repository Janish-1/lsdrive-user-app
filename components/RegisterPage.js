import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_URL } from '@env';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const Sendtologin = () => {
    navigation.navigate('LoginPage');
  };

  const registrationSuccess = () => {
    if (!username || !fullname || !phone || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      alert('Username must be at least 3 characters long.');
      return;
    }

    if (fullname.length < 2) {
      alert('Fullname must be at least 2 characters long.');
      return;
    }

    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    // Log the body data before making the API call
    const requestBody = {
      username: username,
      full_name: fullname,
      phone_number: phone,
      email: email,
      password: password,
      user_type: "user",
    };

    console.log('Request body:', requestBody);
    console.log(JSON.stringify(requestBody))

    // Call your API endpoint here to register the user
    fetch(`${API_URL}/api/driver/`, {
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
        console.log('Registration successful:', data);
        alert('Your registration is successful!');
        navigation.navigate('LoginPage')
      })
      .catch(error => {
        // Handle error
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again later.');
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
        <Text style={[styles.title, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Create Profile</Text>

        <View style={styles.formGroup}>
          <Text style={styles.textform}>Username:</Text>
          <TextInput
            placeholder="Enter your User Name"
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
            style={styles.input}
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.textform}>Fullname:</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
            style={styles.input}
            value={fullname}
            onChangeText={text => setFullname(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.textform}>Phone Number:</Text>
          <TextInput
            placeholder='Enter your Phone Number'
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
            style={styles.input}
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.textform}>Email:</Text>
          <TextInput
            placeholder='Enter your email Id'
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.textform}>Password:</Text>
          <TextInput
            placeholder='Enter your Password'
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#4b4b4b' : '#9b59b6' }]} onPress={registrationSuccess}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Submit</Text>
        </TouchableOpacity>

        <Text>Already have an account? <TouchableOpacity onPress={Sendtologin}>
          <Text style={styles.link}>Sign in</Text></TouchableOpacity>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    width: 'auto',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    color: 'black',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#9b59b6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: "white",
  },
  textform: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default RegisterPage;

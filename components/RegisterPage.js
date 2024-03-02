// RegisterPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const registrationSuccess = () => {
    alert('Your registration is successful!');
    // You can add navigation logic here to navigate to another screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>

      <View style={styles.formGroup}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Fullname:</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={(text) => setFullname(text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Gender:</Text>
        <TouchableOpacity onPress={() => setGender('male')}>
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('female')}>
          <Text>Female</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Vehicle Type:</Text>
        <TouchableOpacity onPress={() => setVehicleType('automated')}>
          <Text>Automated</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVehicleType('manual')}>
          <Text>Manual</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={registrationSuccess}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text>Already have an account? <Text style={styles.link}>Sign in</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegisterPage;

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutPage = () => {
  const navigation = useNavigation();
  const [pickupDate, setPickupDate] = useState('Tue 05 Mar - 12:42 PM');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLocationPickerPress = () => {
    navigation.navigate('Dashboard'); // Replace 'DashboardPage' with the actual name of your Dashboard page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check out</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Drop City</Text>
        <TouchableOpacity style={styles.selectButton} onPress={handleLocationPickerPress}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pickup Date & Time</Text>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{pickupDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Drop Date & Time</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>SCHEDULE RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    marginRight: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#ffc107',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  selectButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
  },
  changeButton: {
    padding: 10,
    backgroundColor: '#ffc107',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  changeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  scheduleButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  scheduleButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CheckoutPage;

import React, { useState, useRef,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import Location from '../assets/icons/location-svgrepo-com.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const Dashboard = () => {
  const mapRef = useRef(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [rideData, setRideData] = useState({
    current_latitude: null,
    current_longitude: null,
    current_address: null,
    destination_latitude: null,
    destination_longitude: null,
    destination_address: null,
  });

  const navigation = useNavigation();

  useEffect(() => {
    // Load rideData from AsyncStorage when the component mounts
    loadRideData();
  }, []);

  const saveRideData = async (data) => {
    try {
      await AsyncStorage.setItem('rideData', JSON.stringify(data));
      const allData = await getAllDataInStorage(); // Wait for the result
      console.log('AsyncStorage updated:', allData);
    } catch (error) {
      console.error('Error saving ride data:', error);
    }
  };

  const loadRideData = async () => {
    try {
      const data = await AsyncStorage.getItem('rideData');
      if (data) {
        const parsedData = JSON.parse(data);
        setRideData(parsedData);
      }
    } catch (error) {
      console.error('Error loading ride data:', error);
    }
  };

  const GOOGLE_API_KEY = 'AIzaSyBJvvPvzCPEAaTa2abV448G_aYJPgDz0-c';

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setPickupLocation(currentLocation);
        animateToLocation(currentLocation);
        fetchAddress(currentLocation);
      },
      error => console.log('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const animateToLocation = (location) => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 1000);
  };

  const onPickupSelected = async (details) => {
    const newPickupLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
    };
    setPickupLocation(newPickupLocation);
    animateToLocation(newPickupLocation);
    // Update rideData with new pickup location
    setRideData(prevData => ({
      ...prevData,
      current_latitude: newPickupLocation.latitude,
      current_longitude: newPickupLocation.longitude,
      current_address: newPickupLocation.address,
    }));
    // Save updated rideData to AsyncStorage
    saveRideData({
      ...rideData,
      current_latitude: newPickupLocation.latitude,
      current_longitude: newPickupLocation.longitude,
      current_address: newPickupLocation.address,
    });
  };

  const onDestinationSelected = async (details) => {
    const newDestination = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
    };
    setDestination(newDestination);
    animateToLocation(newDestination);
    // Update rideData with new destination
    setRideData(prevData => ({
      ...prevData,
      destination_latitude: newDestination.latitude,
      destination_longitude: newDestination.longitude,
      destination_address: newDestination.address,
    }));
    // Save updated rideData to AsyncStorage
    saveRideData({
      ...rideData,
      destination_latitude: newDestination.latitude,
      destination_longitude: newDestination.longitude,
      destination_address: newDestination.address,
    });
  };

  const getAllDataInStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      return data.map(([key, value]) => ({ [key]: JSON.parse(value) }));
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
      return null;
    }
  };

  const fetchAddress = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        Alert.alert('Current Location', address);
        setPickupLocation(address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pickupLocation && <Marker coordinate={pickupLocation} title="Pickup Location" />}
        {destination && <Marker coordinate={destination} title="Destination Location" />}
      </MapView>

      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder='Enter pickup location'
          onPress={(data, details = null) => onPickupSelected(details)}
          fetchDetails={true}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.locationInput,
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Enter destination location'
          onPress={(data, details = null) => onDestinationSelected(details)}
          fetchDetails={true}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.locationInput,
          }}
        />
      </View>

      <TouchableOpacity style={styles.locateButton} onPress={getCurrentLocation}>
        <Location
          width="24"
          height="24"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('CheckoutPage')}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
    zIndex: 5,
  },
  textInputContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  locationInput: {
    height: 44,
    color: '#5d5d5d',
    fontSize: 18,
  },
  locateButton: {
    position: 'absolute',
    bottom: 30,
    left: '35%',
    marginLeft: -25,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  bookButton: {
    position: 'absolute',
    bottom: 30,
    left: '65%',
    marginLeft: -50,
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 30,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Dashboard;

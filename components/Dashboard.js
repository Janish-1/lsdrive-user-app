import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';

Geocoder.init('AIzaSyBJvvPvzCPEAaTa2abV448G_aYJPgDz0-c');

const Dashboard = () => {
  const [pickupLocation, setPickupLocation] = useState({ name: '', coords: null });
  const [destinationLocation, setDestinationLocation] = useState({ name: '', coords: null });
  const navigation = useNavigation();

  const SendCheckoutPage = () => {
    navigation.navigate('CheckoutPage');
  };

  const getNameFromCoords = async (coords) => {
    try {
      const response = await Geocoder.from(coords.latitude, coords.longitude);
      if (response.results.length > 0) {
        return response.results[0].formatted_address;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting name from coordinates:', error);
      return null;
    }
  };

  const getCoordsFromAddress = async (address) => {
    try {
      const response = await Geocoder.from(address);
      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting coordinates from address:', error);
      return null;
    }
  };

  const handlePickupLocationChange = async (text) => {
    setPickupLocation({ ...pickupLocation, name: text });

    // Convert the address to coordinates
    const coords = await getCoordsFromAddress(text);
    if (coords) {
      const name = await getNameFromCoords(coords);
      setPickupLocation({ name: name || text, coords });
    }
  };

  const handleDestinationLocationChange = async (text) => {
    setDestinationLocation({ ...destinationLocation, name: text });

    // Convert the address to coordinates
    const coords = await getCoordsFromAddress(text);
    if (coords) {
      const name = await getNameFromCoords(coords);
      setDestinationLocation({ name: name || text, coords });
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setPickupLocation({ ...pickupLocation, coords: location.coords });
    };

    fetchLocation();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;

    if (!pickupLocation.coords) {
      setPickupLocation({ ...pickupLocation, coords: coordinate });
    } else if (!destinationLocation.coords) {
      setDestinationLocation({ ...destinationLocation, coords: coordinate });
    }
  };

  // const drawerRef = useRef(null);

  const handleHomePress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const homeAddress = 'Home'; // Replace with the actual home address
    setPickupLocation({ name: homeAddress, coords: location.coords });

    // Close the drawer after updating the location
    drawerRef.current.closeDrawer();
  };

  // const renderDrawerContent = () => (
  //   <View style={styles.drawerContent}>
  //     <View style={styles.centeredContainer}>
  //       <Image source={require('../assets/img/logo.png')} style={styles.profileImage} />
  //       <Text style={styles.profileName}>Your Name</Text>
  //     </View>

  //     <TouchableOpacity style={styles.drawerOption} onPress={handleHomePress}>
  //       <Ionicons name="home" size={24} color="black" />
  //       <Text style={styles.drawerOptionText}>Home</Text>
  //     </TouchableOpacity>

  //     <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Change Password pressed')}>
  //       <Ionicons name="lock-closed" size={24} color="black" />
  //       <Text style={styles.drawerOptionText}>Change Password</Text>
  //     </TouchableOpacity>

  //     <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Options pressed')}>
  //       <Ionicons name="settings" size={24} color="black" />
  //       <Text style={styles.drawerOptionText}>Options</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // const openDrawer = () => {
  //   drawerRef.current.openDrawer();
  // };

  return (
    // <DrawerLayoutAndroid
    //   ref={drawerRef}
    //   drawerWidth={200}
    //   drawerPosition="left"
    //   renderNavigationView={renderDrawerContent}
    // >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pickupLocation.coords ? pickupLocation.coords.latitude : 37.78825,
            longitude: pickupLocation.coords ? pickupLocation.coords.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {pickupLocation.coords && <Marker coordinate={pickupLocation.coords} title={pickupLocation.name || "Pickup"} />}
          {destinationLocation.coords && (
            <Marker coordinate={destinationLocation.coords} title={destinationLocation.name || "Destination"} />
          )}
        </MapView>
        <View style={styles.inputContainer}>
          {/* <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity> */}
          <TextInput
            style={styles.input}
            placeholder="Enter Pickup Location Name"
            value={pickupLocation.name}
            onChangeText={handlePickupLocationChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Destination Location Name"
            value={destinationLocation.name}
            onChangeText={handleDestinationLocationChange}
          />
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={SendCheckoutPage}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.currentLocationButton} onPress={() => console.log('Current Location pressed')}>
          <Ionicons name="locate" size={24} color="black" />
        </TouchableOpacity>
      </View>
    // </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  input: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  drawerButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 320,
    marginTop: 16,
  },
  centeredContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  drawerOptionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  bookButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
});

export default Dashboard;

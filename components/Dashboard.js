import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, DrawerLayoutAndroid, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [pickupLocation, setPickupLocation] = useState({ name: '', coords: null });
  const [destinationLocation, setDestinationLocation] = useState({ name: '', coords: null });

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

  const handleHomePress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setPickupLocation({ name: 'Home', coords: location.coords });
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <View style={styles.centeredContainer}>
        <Image source={require('../assets/img/logo.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Your Name</Text>
      </View>

      <TouchableOpacity style={styles.drawerOption} onPress={handleHomePress}>
        <Ionicons name="home" size={24} color="black" />
        <Text style={styles.drawerOptionText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Change Password pressed')}>
        <Ionicons name="lock-closed" size={24} color="black" />
        <Text style={styles.drawerOptionText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Options pressed')}>
        <Ionicons name="settings" size={24} color="black" />
        <Text style={styles.drawerOptionText}>Options</Text>
      </TouchableOpacity>
    </View>
  );

  let drawerRef = null;

  const openDrawer = () => {
    drawerRef.openDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={(ref) => (drawerRef = ref)}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
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
          {pickupLocation.coords && <Marker coordinate={pickupLocation.coords} title="Pickup" />}
          {destinationLocation.coords && (
            <Marker coordinate={destinationLocation.coords} title="Destination" />
          )}
        </MapView>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter Pickup Location Name"
            value={pickupLocation.name}
            onChangeText={(text) => setPickupLocation({ ...pickupLocation, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Destination Location Name"
            value={destinationLocation.name}
            onChangeText={(text) => setDestinationLocation({ ...destinationLocation, name: text })}
          />
        </View>
      </View>
    </DrawerLayoutAndroid>
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
    top: 16,
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
});

export default App;

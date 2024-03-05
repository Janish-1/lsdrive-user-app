import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Modal } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SelectCarPage = () => {
    const navigation = useNavigation();

    const [rideType, setRideType] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);

    const cars = [
        { id: 1, name: 'Hatchback', image: require('../assets/img/hatchback.jpg') },
        { id: 2, name: 'Sedan', image: require('../assets/img/sedan.jpg') },
        { id: 3, name: 'SUV/MUV', image: require('../assets/img/suv.jpg') },
        { id: 4, name: 'EV', image: require('../assets/img/ev.jpg') },
        { id: 5, name: 'Luxury', image: require('../assets/img/luxury.jpg') },
    ];

    const selectCar = (carId) => {
        setSelectedCar(carId);
    };

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const LocationButtonClick = () => {
        console.log('Pressed Select Location');
        navigation.navigate('Dashboard');
    }

    const NextButtonClick = () => {
        console.log('Login pressed Again');
        navigation.navigate('CheckoutPage');
      };
    
      return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* Add markers or other map components as needed */}
                </MapView>
                <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
                    <Ionicons name="menu-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome Janish Pancholi</Text>
                </View>

                <View style={styles.pickupContainer}>
                    <Text style={styles.pickupText}>Please Select Your Pickup Address</Text>
                    <TouchableOpacity style={styles.changeButton} onPress={LocationButtonClick}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                    <Text style={styles.addressText}>Bais Godam</Text>
                </View>

                <View style={styles.rideTypeContainer}>
                    <TouchableOpacity
                        style={[styles.rideTypeButton, rideType === 'IN-CITY' && styles.selectedRideType]}
                        onPress={() => setRideType('IN-CITY')}
                    >
                        <Text style={styles.rideTypeText}>IN-CITY</Text>
                        {rideType === 'IN-CITY' && <View style={styles.indicator} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.rideTypeButton, rideType === 'OUTSTATION' && styles.selectedRideType]}
                        onPress={() => setRideType('OUTSTATION')}
                    >
                        <Text style={styles.rideTypeText}>OUTSTATION</Text>
                        {rideType === 'OUTSTATION' && <View style={styles.indicator} />}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal>
                    {cars.map((car) => (
                        <TouchableOpacity
                            key={car.id}
                            style={[styles.carOption, selectedCar === car.id && styles.selectedCar]}
                            onPress={() => selectCar(car.id)}
                        >
                            <Image source={car.image} style={styles.carImage} />
                            <Text style={styles.carText}>{car.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextButtonText} onPress={NextButtonClick}>NEXT</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal visible={drawerVisible} animationType="slide" transparent={true}>
                <View style={styles.drawerContainer}>
                    <TouchableOpacity style={styles.drawerCloseButton} onPress={toggleDrawer}>
                        <Ionicons name="close-outline" size={24} color="black" />
                    </TouchableOpacity>
                    {/* Add drawer menu options here */}
                    <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Option 1 pressed')}>
                        <Text style={styles.drawerOptionText}>Option 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Option 2 pressed')}>
                        <Text style={styles.drawerOptionText}>Option 2</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        height: windowHeight * 0.5,
    },
    map: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#ffc107',
        padding: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    pickupContainer: {
        padding: 20,
        alignItems: 'center',
    },
    pickupText: {
        fontSize: 16,
        color: '#333',
    },
    changeButton: {
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    changeButtonText: {
        fontSize: 16,
        color: '#000',
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    rideTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,
    },
    rideTypeButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rideTypeText: {
        fontSize: 16,
        color: '#fff',
    },
    selectedRideType: {
        backgroundColor: '#ff9800', // Change color to indicate selection
    },
    indicator: {
        width: 10,
        height: 10,
        backgroundColor: 'green', // Adjust color as needed
        borderRadius: 5,
        marginLeft: 5,
    },
    carOption: {
        alignItems: 'center',
        marginRight: 10,
    },
    carImage: {
        width: 100,
        height: 60,
    },
    carText: {
        marginTop: 5,
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    nextButtonText: {
        fontSize: 20,
        color: '#fff',
    },
    selectedCar: {
        borderColor: '#ffc107',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: windowWidth * 0.8,
        height: '100%',
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    drawerCloseButton: {
        alignSelf: 'flex-end',
        padding: 20,
    },
    drawerOption: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    drawerOptionText: {
        fontSize: 16,
        color: '#333',
    },
    drawerButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
});

export default SelectCarPage;

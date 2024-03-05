import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, DrawerLayoutAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SelectCarPage = () => {
    const navigation = useNavigation();

    const [rideType, setRideType] = useState('');
    const [selectedCar, setSelectedCar] = useState('');

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

    const LocationButtonClick = () => {
        console.log('Pressed Select Location');
        navigation.navigate('Dashboard');
    };

    const NextButtonClick = () => {
        console.log('Next button pressed');
        navigation.navigate('CheckoutPage');
    };

    const drawerContent = (
        <View style={styles.drawerContent}>
            <View style={styles.centeredContainer}>
                <Image source={require('../assets/img/logo.png')} style={styles.profileImage} />
                <Text style={styles.profileName}>Janish Pancholi</Text>
            </View>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Home pressed')}>
                <Ionicons name="home" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Rides pressed')}>
                <Ionicons name="car" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Fare Chart pressed')}>
                <Ionicons name="cash" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Fare Chart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Wallet pressed')}>
                <Ionicons name="wallet" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('About Us pressed')}>
                <Ionicons name="information-circle" size={24} color="black" />
                <Text style={styles.drawerOptionText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Refer and Earn pressed')}>
                <Ionicons name="people" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Refer and Earn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('FAQ pressed')}>
                <Ionicons name="help-circle" size={24} color="black" />
                <Text style={styles.drawerOptionText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Help and Support pressed')}>
                <Ionicons name="help-circle-outline" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Help and Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Preferred Driver pressed')}>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Preferred Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Share App pressed')}>
                <Ionicons name="share-social" size={24} color="black" />
                <Text style={styles.drawerOptionText}>Share App</Text>
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
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => drawerContent}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
                        <Ionicons name="menu" size={32} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Welcome Janish Pancholi</Text>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageBox}>
                        <Image source={require('../assets/img/car.gif')} style={styles.bigImage} />
                    </View>
                </View>

                <View contentContainerStyle={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.pickupText}>Please Select Your Pickup Address</Text>
                        <TouchableOpacity style={styles.changeButton} onPress={LocationButtonClick}>
                            <Text style={styles.changeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.carSelectionContainer}>
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
                </View>
            </View>
        </DrawerLayoutAndroid >
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9b59b6',
        padding: 10,
        paddingBottom: 20,
        paddingTop: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageBox: {
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
    },
    bigImage: {
        width: windowWidth - 40, // Adjust the width as necessary
        height: windowHeight * 0.3, // Adjust the height as necessary
        resizeMode: 'contain', // Use 'contain' to fit the image within the view
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingBottom: 20,
        paddingTop: 20,
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
        backgroundColor: '#9b59b6',
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
        backgroundColor: '#9b59b6',
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
        backgroundColor: '#9b59b6',
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
        borderColor: 'purple',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
    },
    drawerContent: {
        flex: 1,
        padding: 16,
    },
    drawerButton: {
        marginLeft: 16,
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
    textContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    carSelectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    bookButtonText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default SelectCarPage;
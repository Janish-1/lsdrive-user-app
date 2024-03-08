import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, DrawerLayoutAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../assets/icons/home-1-svgrepo-com.svg';
import FAQ from '../assets/icons/faq-svgrepo-com.svg';
import Help from '../assets/icons/help-svgrepo-com.svg';
import Transit from '../assets/icons/calgary-transit-my-fare-svgrepo-com.svg';
import Car from '../assets/icons/car-side-svgrepo-com.svg';
import Refer from '../assets/icons/refer-to-svgrepo-com.svg';
import Menu from '../assets/icons/menu-svgrepo-com.svg';
import Share from '../assets/icons/share-svgrepo-com.svg';
import Wallet from '../assets/icons/wallet-svgrepo-com.svg';
import About from '../assets/icons/about-svgrepo-com.svg';
import Man from '../assets/icons/man-svgrepo-com.svg';

const SelectCarPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [username, setusername] = useState('');
    const [profileimage, setprofileimage] = useState('');
    const [rideData, setRideData] = useState({
        rideType: 'IN-CITY', // Default value for rideType
        selectedCar: null,   // Default value for selectedCar
    });

    useEffect(() => {
        // Load saved ride data from AsyncStorage when the component mounts
        loadRideData();
    }, []);


    const selectCar = (carId) => {
        setSelectedCar(carId);
        setRideData({ ...rideData, selectedCar: carId });
        saveRideData({ ...rideData, selectedCar: carId });
    };

    const handleRideTypeChange = (type) => {
        setRideType(type);
        setRideData({ ...rideData, rideType: type });
        saveRideData({ ...rideData, rideType: type });
    };

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
                setRideType(parsedData.rideType);
                setSelectedCar(parsedData.selectedCar);
                setRideData(parsedData);
            }
        } catch (error) {
            console.error('Error loading ride data:', error);
        }
    };

    const getAllDataInStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('rideData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting data from AsyncStorage:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve user_id from AsyncStorage
                const value = await AsyncStorage.getItem('user');

                // Check if user_id exists
                if (value) {
                    // Make a fetch call to get user data
                    const response = await fetch(`http://lsdrivebackend.ramo.co.in/api/driver/${value}`);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    setusername(responseData.username);
                    setprofileimage(responseData.profileimage);
                    setUserData(responseData.main);
                } else {
                    console.error('User ID not found in AsyncStorage');
                    // Handle the case where user_id is not present in AsyncStorage
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle errors, show an error message or redirect to a different screen
            }
        };

        // Fetch user data initially
        fetchData();

        // Fetch user data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // The empty dependency array ensures the effect runs only once when the component mounts

    const [rideType, setRideType] = useState('');
    const [selectedCar, setSelectedCar] = useState('');

    const cars = [
        { id: 1, name: 'Hatchback', image: require('../assets/img/hatchback.jpg') },
        { id: 2, name: 'Sedan', image: require('../assets/img/sedan.jpg') },
        { id: 3, name: 'SUV/MUV', image: require('../assets/img/suv.jpg') },
        { id: 4, name: 'EV', image: require('../assets/img/ev.jpg') },
        { id: 5, name: 'Luxury', image: require('../assets/img/luxury.jpg') },
    ];

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
                <Image source={profileimage} style={styles.profileImage} />
                <Text style={styles.profileName}>{username}</Text>
            </View>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Home pressed')}>
                <Home width="24" height="24" />
                <Text style={styles.drawerOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Rides pressed')}>
                <Car width="24" height="24" />
                <Text style={styles.drawerOptionText}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Fare Chart pressed')}>
                <Transit width="24" height="24" />
                <Text style={styles.drawerOptionText}>Fare Chart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Wallet pressed')}>
                <Wallet width="24" height="24" />
                <Text style={styles.drawerOptionText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('About Us pressed')}>
                <About width="24" height="24" />
                <Text style={styles.drawerOptionText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Refer and Earn pressed')}>
                <Refer width="24" height="24" />
                <Text style={styles.drawerOptionText}>Refer and Earn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('FAQ pressed')}>
                <FAQ width="24" height="24" />
                <Text style={styles.drawerOptionText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Help and Support pressed')}>
                <Help width="24" height="24" />
                <Text style={styles.drawerOptionText}>Help and Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Preferred Driver pressed')}>
                <Man width="24" height="24" />
                <Text style={styles.drawerOptionText}>Preferred Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Share App pressed')}>
                <Share width="24" height="24" />
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
                        <Menu width="24" height="24" />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Welcome {username}</Text>
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
                            onPress={() => handleRideTypeChange('IN-CITY')}
                        >
                            <Text style={styles.rideTypeText}>IN-CITY</Text>
                            {rideType === 'IN-CITY' && <View style={styles.indicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.rideTypeButton, rideType === 'OUTSTATION' && styles.selectedRideType]}
                            onPress={() => handleRideTypeChange('OUTSTATION')}
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

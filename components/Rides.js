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

const Rides = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [username, setusername] = useState('');
    const [profileimage, setprofileimage] = useState('');
    const [rideData, setRideData] = useState();
    const [showPastRides, setShowPastRides] = useState(false);

    useEffect(() => {
        // Load saved ride data from AsyncStorage when the component mounts
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
            const keys = await AsyncStorage.getAllKeys();
            const data = await AsyncStorage.multiGet(keys);
            return data.map(([key, value]) => ({ [key]: JSON.parse(value) }));
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

    const RedirectPage = (page) => {
        console.log(page, ' Pressed');
        navigation.navigate(page);
    }

    const Logout = async () => {
        try {
            // Retrieve user_id from AsyncStorage
            const value = await AsyncStorage.getItem('user');

            // Check if user_id exists
            if (value) {
                // Make a fetch call to logout
                const response = await fetch('http://lsdrivebackend.ramo.co.in/api/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: value }),
                });

                if (response.ok) {
                    // Logout successful
                    console.log('Logout successful');
                    navigation.navigate('LoginPage');
                } else {
                    console.error('Logout failed:', response.status);
                }
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const drawerContent = (
        <View style={styles.drawerContent}>
            <View style={styles.centeredContainer}>
                <Image source={profileimage} style={styles.profileImage} />
                <Text style={styles.profileName}>{username}</Text>
            </View>
            <TouchableOpacity style={styles.drawerOption} onPress={() => RedirectPage('SelectCarPage')}>
                <Home width="24" height="24" />
                <Text style={styles.drawerOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => RedirectPage('Rides')}>
                <Car width="24" height="24" />
                <Text style={styles.drawerOptionText}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Fare Chart pressed')}>
                <Transit width="24" height="24" />
                <Text style={styles.drawerOptionText}>Fare Chart</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Wallet pressed')}>
                <Wallet width="24" height="24" />
                <Text style={styles.drawerOptionText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('About Us pressed')}>
                <About width="24" height="24" />
                <Text style={styles.drawerOptionText}>About Us</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Refer and Earn pressed')}>
                <Refer width="24" height="24" />
                <Text style={styles.drawerOptionText}>Refer and Earn</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('FAQ pressed')}>
                <FAQ width="24" height="24" />
                <Text style={styles.drawerOptionText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Help and Support pressed')}>
                <Help width="24" height="24" />
                <Text style={styles.drawerOptionText}>Help and Support</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Preferred Driver pressed')}>
                <Man width="24" height="24" />
                <Text style={styles.drawerOptionText}>Preferred Driver</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.drawerOption} onPress={() => console.log('Share App pressed')}>
                <Share width="24" height="24" />
                <Text style={styles.drawerOptionText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={Logout}>
                <Text style={styles.drawerOptionText}>Logout</Text>
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
                <View style={styles.nheader}>
                    <TouchableOpacity onPress={() => setShowPastRides(true)}>
                        <Text style={[styles.nheaderText, showPastRides && styles.activeHeaderText]}>Past Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowPastRides(false)}>
                        <Text style={[styles.nheaderText, !showPastRides && styles.activeHeaderText]}>Active Rides</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.shadowBox}>
                    <Text style={styles.rideTitle}>{showPastRides ? 'Past Rides' : 'Active Rides'}</Text>
                    {showPastRides ? (
                        <Text style={styles.noRidesText}>We don't have any completed ride to show here</Text>
                    ) : (
                        <Text style={styles.noRidesText}>Active ride content goes here</Text>
                    )}
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
        marginBottom: 16, // Increase margin bottom for bigger boxes
    },
    drawerOptionText: {
        marginLeft: 16, // Increase margin left for bigger icons
        fontSize: 20, // Increase font size for bigger text
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
    nheader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nheaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    activeHeaderText: {
        color: '#9b59b6',
    },
    shadowBox: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rideTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noRidesText: {
        fontSize: 16,
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#9b59b6',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        width: '45%',
    },
});

export default Rides;

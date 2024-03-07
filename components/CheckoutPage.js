import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CheckoutPage = () => {
    const navigation = useNavigation();
    const [pickupDate, setPickupDate] = useState('Tue 05 Mar - 12:42 PM');
    const [dropDate, setDropDate] = useState('Tue 05 Mar - 5:42 PM');
    const [dropCity, setdropCity] = useState('Indore');
    const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleLocationPickerPress = () => {
        navigation.navigate('Dashboard');
    };

    const handleScheduleRide = () => {
        // Logic to schedule the ride
        setShowPopup(true); // Show popup after scheduling the ride
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close the popup
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Check out</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Drop City</Text>
                <TouchableOpacity style={styles.selectButton} onPress={handleLocationPickerPress}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
                <Text style={styles.dateText}>{dropCity}</Text>
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
                    <Text style={styles.selectButtonText}>Change</Text>
                </TouchableOpacity>
                <Text style={styles.dateText}>{dropDate}</Text>
            </View>

            <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleRide}>
                <Text style={styles.scheduleButtonText}>SCHEDULE RIDE</Text>
            </TouchableOpacity>

            {/* Checkout Popup */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={handleClosePopup}
            >
                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                        <Text style={styles.popupTitle}>Ride Details</Text>
                        <Text style={styles.popupText}>Pickup Date & Time: {pickupDate}</Text>
                        <Text style={styles.popupText}>Drop Date & Time: {dropDate}</Text>
                        <Text style={styles.popupText}>Drop City: {dropCity}</Text>
                        {/* Add more details as needed */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.closeButton}>
                                <Text style={styles.checkoutText}>Checkout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#9b59b6',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        paddingTop: 30,
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
        backgroundColor: '#9b59b6',
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    selectButtonText: {
        fontSize: 16,
        color: '#333',
    },
    changeButton: {
        padding: 10,
        backgroundColor: '#9b59b6',
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    changeButtonText: {
        fontSize: 16,
        color: 'black',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    scheduleButton: {
        backgroundColor: '#9b59b6',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    scheduleButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    // Styles for Popup
    popupContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    popupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    popupText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: '#9b59b6',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    checkoutText: {
        fontSize: 16,
        color: 'white',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default CheckoutPage;

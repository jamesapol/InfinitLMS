import { StyleSheet, Text, View, Image, Vibration } from 'react-native'
import React, { useEffect } from 'react'

import errorIcon from '../../../../assets/images/icons/error.png'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Avatar } from 'react-native-paper'

export default function ErrorModal({ onOkPressed }) {
    useEffect(() => {
        Vibration.vibrate(100)
    
    }, [])
    
    return (
        <View style={styles.centeredModal}>
            <View style={styles.modalContainer}>

                {/* <View style={{ position: 'absolute', top: -20, right: -20, backgroundColor: '#313131', borderRadius: 1000, }}>

                    <FontAwesome5 name="times-circle" size={RFPercentage(4)} color="white" />
                </View> */}
                <View style={styles.modalContent}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '5%'
                    }}>
                        <Avatar.Image source={errorIcon} size={RFPercentage(4)} style={styles.modalIcon} />

                        <Text style={styles.modalHeaderText}>
                            File Not Found
                        </Text>
                    </View>
                    <Text style={styles.modalText}>The URL of the original file is not valid or the document is not publicly accessible. Verify the URL is correct, then contact the document owner.</Text>
                </View>
                {/* <TouchableOpacity style={styles.modalButton} onPress={onOkPressed}>
                    <Text style={{ fontSize: RFPercentage(1.74), fontWeight: '400' }}>OK</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#31313166'
    },
    modalContainer: {
        width: '65%',
        height: '20%',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#313131',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 7,
        padding: '5%',

    },
    modalContent: {
        // backgroundColor: 'green',
        // paddingHorizontal: '10%',
        justifyContent: 'space-between',
        // paddingVertical: '5%',
        alignItems: 'center',
        // paddingVertical: '5%',
        flex: 1
    },
    modalIcon: {
        alignSelf: 'center',
    },
    modalHeaderText: {
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: '5%'
        // marginBottom: '5%',
        // marginTop: '2.5%'
    },
    modalText: {
        fontSize: RFPercentage(1.4),
        textAlign: 'center',
    },
    modalButton: {
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderColor: "#313131",
        backgroundColor: '#ff6b00',
        elevation: 7,
        paddingVertical: '2.5%',

    }
})
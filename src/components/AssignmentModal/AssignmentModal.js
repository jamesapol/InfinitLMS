import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { BASE_URL } from '../../config';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native-paper';
export default function AssignmentModal({
    actID,
    actUUID,
    actTitle,
    actDescription,
    actDateCreated,
    actDueDate,
    fileName,
    fileURI,
    fileType,
    onClosePressed
}) {

    const [submitLoading, setSubmitLoading] = useState(true)
    // const [fileURI, setFileURI] = useState();
    // const [fileSize, setFileSize] = useState();
    // const [fileName, setFileName] = useState();
    // const [fileType, setFileType] = useState();

    // const selectPDF = async () => {
    //     let result = await DocumentPicker.getDocumentAsync({
    //         // type: ["image/jpeg", "image/png", "application/pdf"],
    //         // type: ["application/msword", "application/docx"],
    //         type: ["application/*"],
    //     });
    //     console.log(result);
    //     if (result.uri) {
    //         const fileInfo = await FileSystem.getInfoAsync(result.uri);
    //         if (fileInfo.size >= 5000000) {
    //             setFileSizeErrorModalVisible(true);
    //         } else {
    //             setFileURI(result.uri);
    //             setFileSize(result.size);
    //             setFileName(result.name);
    //             setFileType(result.mimeType);
    //         }
    //     }
    // };

    const onSubmitPressed = () => {
        setSubmitLoading(true)
    }

    return (
        <View style={styles.centeredModal}>
            <View style={styles.modalContainer}>
                {submitLoading ? <ActivityIndicator /> :
                    <>
                        <TouchableOpacity onPress={onClosePressed} style={styles.closeButton} activeOpacity={0.5}>
                            <FontAwesome5 name="times-circle" size={RFPercentage(3)} color="white" />
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <FontAwesome5 name="clipboard-list" size={RFPercentage(3)} color="#313131" />
                                <Text style={styles.activityTitle}>
                                    {actTitle}
                                </Text>
                            </View>
                            <View style={styles.modalBody}>
                                <Text numberOfLines={2} style={{ fontSize: RFPercentage(1.3) }}>
                                    {fileName}
                                </Text>
                                <TouchableOpacity
                                    onPress={onSubmitPressed}
                                    style={styles.submitButton} activeOpacity={0.7}>
                                    <Text style={{ fontSize: RFPercentage(1.5), color: "#FFF", fontWeight: 'bold' }}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </>
                }
            </View>
        </View >
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
        width: '80%',
        height: '20%',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#313131',
        padding: '2.5%',
        backgroundColor: '#fff',
        elevation: 5
    },
    closeButton: {
        position: 'absolute', top: -15, right: -15, backgroundColor: '#f33f', borderRadius: 1000,
    },
    modalContent: {
        width: '100%',
        flex: 1,
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalBody: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    activityTitle: {
        fontSize: RFPercentage(1.7),
        fontWeight: 'bold',
        marginLeft: '2.5%'
    },
    submitButton: {
        paddingVertical: '2.5%', borderWidth: 2, borderColor: '#313131', width: '50%', backgroundColor: "#ff6b00", borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginTop: '2.5%', elevation: 7
    }
})
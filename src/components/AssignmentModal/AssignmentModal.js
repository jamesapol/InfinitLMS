import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';

export default function AssignmentModal({
    actID,
    actUUID,
    actTitle,
    actDescription,
    actDateCreated,
    actDueDate,
}) {

    const [fileURI, setFileURI] = useState();
    const [fileSize, setFileSize] = useState();
    const [fileName, setFileName] = useState();
    const [fileType, setFileType] = useState();

    const selectPDF = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            // type: ["image/jpeg", "image/png", "application/pdf"],
            // type: ["application/msword", "application/docx"],
            type: ["application/*"],
        });
        console.log(result);
        if (result.uri) {
            const fileInfo = await FileSystem.getInfoAsync(result.uri);
            if (fileInfo.size >= 5000000) {
                setFileSizeErrorModalVisible(true);
            } else {
                setFileURI(result.uri);
                setFileSize(result.size);
                setFileName(result.name);
                setFileType(result.mimeType);

            }
        }
    };

    const removeFile = () => {
        setFileURI();
        setFileSize();
        setFileName();
        setFileType();
    }

    return (
        <View style={styles.centeredModal}>
            <View style={styles.modalContainer}>
                <Text>AssignmentModal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredModal: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '80%', height: '40%', borderWidth: 2, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', elevation: 5 }
})
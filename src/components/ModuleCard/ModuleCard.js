import { FlatList, Modal, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import AssignmentModal from '../AssignmentModal/AssignmentModal';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import AssignmentCard from '../ActivityCardsType/AssignmentCard/AssignmentCard';
import YoutubeCard from '../ActivityCardsType/YoutubeCard/YoutubeCard';
import FileCard from '../ActivityCardsType/FileCard/FileCard';

export default function ModuleCard({
    bg,
    item,
    columnCount,
    user,
    secID_content,
    userClasses,
    onPress
}) {
    const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)

    //for assignment title, description and id
    const [actTitle, setActTitle] = useState();
    const [actDescription, setActDescription] = useState();
    const [actID, setActID] = useState();
    const [actUUID, setActUUID] = useState();
    const [actDateCreated, setActDateCreated] = useState();
    const [actDueDate, setActDueDate] = useState();

    const moduleImage = ({ dataType }) => {
        let imgSource;

        if (dataType == 3) {
            imgSource = require('../../../assets/images/icons/ppt.png')
        }
    }

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':');
        let period = 'AM';
        let formattedHours = parseInt(hours, 10);

        if (formattedHours >= 12) {
            period = 'PM';
            formattedHours = formattedHours === 12 ? 12 : formattedHours - 12;
        } else if (formattedHours === 0) {
            formattedHours = 12;
        }

        return `${formattedHours}:${minutes} ${period}`;
    };

    data = [
        { time: '09:00', description: 'Event 1 Description', crsTitle: 'Event 1', },
        { time: '10:45', crsTitle: 'Event 2', description: 'Event 2 Description' },
        { time: '12:00', crsTitle: 'Event 3', description: 'Event 3 Description' },
        { time: '14:00', crsTitle: 'Event 4', description: 'Event 4 Description' },
        { time: '16:30', crsTitle: 'Event 5', description: 'Event 5 Description' }
    ]

    const handlePress = () => setExpanded(!expanded);

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

    const closeAssignmentModal = () => {
        setAssignmentModalVisible(false)
    }

    return (
        <View>
            <Modal
                animationType='fade'
                transparent
                onRequestClose={closeAssignmentModal}
                visible={assignmentModalVisible}
            >
                <AssignmentModal

                />

            </Modal>
            <FlatList
                key={Math.random()}
                // numColumns={2}
                data={item}
                keyExtractor={(item) => `${item.actID}`}
                renderItem={({ item, index }) => (
                    <View style={{ paddingHorizontal: '2.5%' }}>
                        {item.typID === 1 ?
                            <AssignmentCard
                                item={item}
                            /> :
                            

                            item.typID === 3 ?
                                <FileCard
                                    item={item}
                                /> :
                                item.typID === 5 ?
                                    <YoutubeCard
                                        item={item}
                                    /> : null}
                    </ View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    moduleCardContainer: {
        flex: 1, justifyContent: 'center', marginBottom: '5%', backgroundColor: '#FFF', elevation: 4
    },

    moduleCardHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '2.5%', paddingVertical: '1.5%', backgroundColor: '#313131',
    }
})


{/* <View style={{ height: 1, marginVertical: '1%', width: '100%', backgroundColor: '#313131' }} /> */ }
{/* <Text style={{ fontSize: RFPercentage(1.3) }}>
    Due Date:
    <Text style={{ fontWeight: 'bold', }}>
        {" "}{moment(item.actDateEnd).format('MMMM D, YYYY, h:m A')}
    </Text>
</Text> */}


{/* <View style={{ width: '100%', elevation: 7, backgroundColor: '#fff', padding: '2.5%', marginBottom: '2.5%', borderRadius: 7, borderWidth: 2, borderColor: '#dc3545' }}>
    
                                        </View> */}
{/* <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold', marginBottom: '2.5%' }}>
                                            <MaterialIcons name="assignment" size={24} color="black" />Assignment
                                        </Text>
                                        {item.actDescription ?
                                            <View style={{ width: '90%' }}>
                                                <Text style={{ fontSize: RFPercentage(1.1) }}>
                                                    {item.actDescription}
                                                </Text>
                                            </View>
                                            : null}
                                        <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: '2.5%', marginTop: '2.5%' }}>
                                            <View style={{ flex: 1, maxWidth: '75%', height: '100%', }}>
                                                {fileName ?
                                                    <Text numberOfLines={2}>
                                                        {fileName}
                                                    </Text>
                                                    : null}
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                {fileURI ?
                                                    <TouchableOpacity style={{ marginRight: '1%', marginTop: '2.5%', paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}
                                                        onPress={removeFile}
                                                    >
                                                        <Text>
                                                            <MaterialCommunityIcons name="file-remove" size={RFPercentage(2)} color="red" />
                                                        </Text>
                                                    </TouchableOpacity> : null}
                                                <TouchableOpacity style={{ marginLeft: fileURI ? '1%' : 0, marginTop: '2.5%', paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}
                                                    onPress={selectPDF}
                                                >
                                                    <Text>
                                                        <FontAwesome5 name="upload" size={RFPercentage(2)} color="#ff6b00" />
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {fileURI ?
                                            <View style={{ marginTop: '2.5%', alignSelf: 'flex-end' }}>
                                                <TouchableOpacity style={{ paddingHorizontal: '10%', paddingVertical: '1.5%', borderWidth: 2, elevation: 7, borderRadius: 7, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                                    <Text style={{ fontSize: RFPercentage(1.3) }}>
                                                        Submit
                                                    </Text>
                                                </TouchableOpacity>
                                            </View> : null
                                        } */}
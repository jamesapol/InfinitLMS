import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";

export default function ModuleCard({
    bg,
    item,
    columnCount,
    user,
    secID_content,
    userClasses,
    onPress
}) {

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
            type: "application/pdf",
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

    return (
        // <>
        //     <TouchableOpacity onPress={() => console.log(item)}>
        //         <Text>
        //             TEST
        //         </Text>
        //     </TouchableOpacity>
        // </>
        // <Text>
        //     {item.secID_content}
        //    {JSON.stringify(item.secID_content)} 
        // </Text>
        <FlatList
            key={Math.random()}
            // numColumns={2}
            data={item}
            keyExtractor={(item) => `${item.actID}`}
            renderItem={({ item, index }) => (
                <View style={{ paddingHorizontal: '2.5%' }}>

                    <View style={{ flex: 1, justifyContent: 'center', marginBottom: '5%', backgroundColor: '#FFF', elevation: 4 }}>

                        {/* header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '2.5%', paddingVertical: '1.5%', backgroundColor: '#313131', }}>
                            <Text style={{ fontSize: RFPercentage(1.7), fontWeight: 'bold', color: "#FFF" }}>
                                {`${item.actTitle}`}
                            </Text>
                        </View>

                        {/* body */}
                        <View style={{ padding: '2.5%', alignItems: 'flex-start' }}>
                            {/* for assignments */}
                            {item.typID === 1 ?
                                <>
                                    <View style={{ width: '100%', elevation: 7, backgroundColor: '#fff', padding: '2.5%', borderRadius: 7 }}>
                                        {item.actDescription ?
                                            <View style={{ width: '90%' }}>
                                                <Text style={{fontSize: RFPercentage(1.1)}}>
                                                    {item.actDescription}
                                                </Text>
                                            </View>
                                            : null}
                                    </View>
                                    <View style={{width:'100%', elevation: 7, backgroundColor:'#FFF', padding: '2.5%', marginTop: '2.5%', borderRadius: 7}}>

                                    </View>
                                </>
                                :
                                // for other file types
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 7, padding: '2%', backgroundColor: '#fff' }}>
                                        {item.actFileIcon === 'far fa-file-powerpoint' ?
                                            <FontAwesome5 name="file-powerpoint" size={RFPercentage(7)} color="#313131" />
                                            : item.actFileIcon === 'far fa-file-pdf' ?
                                                <FontAwesome5 name="file-pdf" size={RFPercentage(7)} color="#313131" />
                                                : item.actFileIcon === 'far fa-file-word' ?
                                                    <FontAwesome5 name="file-word" size={24} color="black" />
                                                    : null}
                                        <View style={{ marginLeft: '2.5%', }}>
                                            <Text style={{ fontSize: RFPercentage(1.75), fontWeight: 'bold' }}>
                                                {item.actFileType}
                                            </Text>
                                            {item.actDescription ?
                                                <View style={{ width: '90%' }}>
                                                    <Text>
                                                        {item.actDescription}
                                                    </Text>
                                                </View>
                                                :
                                                <View style={{ width: '90%' }}>
                                                    <Text>
                                                        No description.
                                                    </Text>
                                                </View>}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                        <TouchableOpacity style={{ paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: 5, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                            <Text style={{}}>
                                                {/* View File */}
                                                <FontAwesome5 name="eye" size={RFPercentage(2)} color="#ff6b00" />
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: '2.5%', width: '15%', paddingVertical: '1%', borderWidth: 2, elevation: 7, borderRadius: 7, margin: 5, borderColor: '#313131', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                            <Text>
                                                {/* Download File */}
                                                <FontAwesome5 name="download" size={RFPercentage(2)} color="#ff6b00" />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                        </View>


                        {/* footer */}
                        <View style={{ backgroundColor: '#bbb', flexDirection: 'row', justifyContent: 'flex-end', padding: '1.5%', alignItems: 'center', }}>
                            <Text style={{ fontSize: RFPercentage(1.3) }}>
                                {moment(item.actDateCreated).fromNow()}{" "}
                                <MaterialCommunityIcons name="clock" size={RFPercentage(1.5)} color="#313131" />
                            </Text>
                            <Text>
                            </Text>
                        </View>
                    </View>
                </ View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 5,
        marginHorizontal: '2.5%',
        marginBottom: '5%',
        borderRadius: 15,
    },

    courseTitleAndCodeContainer: {
        // height: 125,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%'
    },

    courseTitleAndCode: {
        paddingTop: 10,
        marginVertical: 7.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    otherDetailsContainer: {
        // height: columnCount === 1 ? 225 : 275,
        justifyContent: 'space-between',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        backgroundColor: '#fff',
        // paddingHorizontal: this.columnCount === 1 ? '2.5%' : '5%',
    },

    classDetails: {
        paddingLeft: 10,
        fontSize: RFPercentage(1.7)
    },

    rowDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewButton: {
        margin: 10,
        backgroundColor: '#f66b00',
        width: '100%',
        height: 50,
        // height: '70%',
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})


{/* <View style={{ height: 1, marginVertical: '1%', width: '100%', backgroundColor: '#313131' }} /> */ }
{/* <Text style={{ fontSize: RFPercentage(1.3) }}>
    Due Date:
    <Text style={{ fontWeight: 'bold', }}>
        {" "}{moment(item.actDateEnd).format('MMMM D, YYYY, h:m A')}
    </Text>
</Text> */}
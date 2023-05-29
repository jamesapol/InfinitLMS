import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import subjectIcon from '../../../assets/images/icons/educ.png'
import defaultImage from '../../../assets/images/icons/default.png'
import { BASE_URL } from '../../config';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../CustomButton/CustomButton';

import { List } from 'react-native-paper';

export default function CourseCard({
    bg,
    item,
    columnCount,
    user,
    instructors,
    userClasses,
    onPress
}) {
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

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.cardContainer}
        >

            {/* COURSE TITLE AND CODE */}
            <View style={styles.courseTitleAndCodeContainer}>
                <Image source={subjectIcon} style={{ height: RFPercentage(5), width: RFPercentage(5), borderRadius: 1000, borderColor: '#ff5b00', borderWidth: 1, marginRight: '2.5%', backgroundColor: 'red', }} />

                <View style={{ flex: 1, marginVertical: '-1%' }}>
                    <Text style={{ fontWeight: '900', fontSize: RFPercentage(2), color: "#FFF", }}>
                        {item.crsDescription}
                    </Text>
                    <Text style={{ fontWeight: '900', fontSize: RFPercentage(1.5), color: '#FFF' }}>{item.crsTitle}</Text>
                </View>
            </View>

            <View style={{
                ...styles.otherDetailsContainer,
                // height: columnCount === 1 ? 250 : 275,
                paddingHorizontal: columnCount === 1 ? '2.5%' : '5%',
            }}>

                <View style={{ justifyContent: 'space-between', }}>
                    {/* INSTRUCTORS */}


                    {/* OTHER DETAILS */}
                    <View style={{ marginVertical: '2.5%' }}>
                        <View style={styles.rowDetails} >
                            <Ionicons name="time" size={RFPercentage(1.7)} color="black" />
                            <Text style={styles.classDetails}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {convertTo12HourFormat(item.crsTimeFrom)}
                                </Text>
                                {" "}to{" "}
                                <Text style={{ fontWeight: 'bold' }}>
                                    {convertTo12HourFormat(item.crsTimeTo)}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.rowDetails} >
                            <Ionicons name="calendar" size={RFPercentage(1.7)} color="black" />
                            <Text style={styles.classDetails}>
                                {(item.crsMon && item.crsTue && item.crsWed && item.crsThu && item.crsFri) ? "Monday - Friday" :
                                    <>
                                        {item.crsMon ? "Mon " : null}
                                        {item.crsTue ? "Tue " : null}
                                        {item.crsWed ? "Wed " : null}
                                        {item.crsThu ? "Thu " : null}
                                        {item.crsFri ? "Fri " : null}
                                        {item.crsSat ? "Sat " : null}
                                        {item.crsSun ? "Sun " : null}
                                    </>
                                }
                            </Text>
                        </View>
                        <View style={styles.rowDetails} >
                            {/* <Fontisto name="room" size={RFPercentage(1.7)} color="black" /> */}
                            {/* <FontAwesome5 name="door-closed" size={RFPercentage(1.7.8)} color="black" /> */}
                            <MaterialIcons name="meeting-room" size={RFPercentage(1.7)} color="black" />
                            <Text style={styles.classDetails}>{item.romName}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: '#515151', alignSelf: 'center', }} />

                    <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(1.7), paddingVertical: '1%', }}>{item.instructors.length > 1 ? "Instructors:" : "Instructor:"}</Text>
                    <FlatList
                        key={new Date}
                        numColumns={2}
                        data={item.instructors}
                        keyExtractor={(instructor) => `${instructor.usrLastName}-${instructor.usrFirstName}`}
                        renderItem={({ item: instructor }) => (
                            <View style={{ flexDirection: 'row', marginVertical: '1%', flex: 1, marginHorizontal: 1, }}>
                                <View style={{ height: RFPercentage(3.5), width: RFPercentage(3.5), borderRadius: 1000, borderColor: '#ff5b00', borderWidth: 1, marginRight: '2.5%', }}>
                                    <Image source={{ uri: `${BASE_URL}/images/avatars/${instructor ? instructor.usrImage ? instructor.usrImage : defaultImage : null}` }} style={{ height: '100%', width: '100%', borderRadius: 1000 }} />
                                </View>
                                <View style={{ flex: 1, marginVertical: '-1%', paddingBottom: '2.5%' }} >
                                    <Text style={{ fontSize: RFPercentage(1.5), fontWeight: 'bold', overflow: 'scroll', }} numberOfLines={2} ellipsizeMode='tail'>
                                        {`${instructor.usrLastName ?? null}, ${instructor.usrFirstName ?? null} ${instructor.usrMiddleName ?? ''}`}
                                    </Text>

                                    <Text style={{ fontSize: RFPercentage(1.3), color: '#666' }} ellipsizeMode='tail'>
                                        {instructor.typName}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />

                </View>

                {/* <CustomButton
                    onPress={onPress}
                    text="View Course"

                /> */}
                {/* <TouchableOpacity style={styles.viewButton} onPress={onPress}>
                    <Text style={{ fontSize: RFPercentage(1.6), color: 'white' }}>
                        View Course
                    </Text>
                </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        // backgroundColor: '#fff',
        elevation: 16,
        marginHorizontal: '2.5%',
        marginBottom: '2.5%',
        borderRadius: 15,
    },

    courseTitleAndCodeContainer: {
        flexDirection: 'row',
        // backgroundColor: 'rgba(1,0.5,1,0.6)',
        backgroundColor: '#313131',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: '2.5%'

    },

    otherDetailsContainer: {
        // height: columnCount === 1 ? 225 : 275,
        justifyContent: 'space-between',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        backgroundColor: '#fff',
        paddingBottom: '2.5%'
        // paddingHorizontal: this.columnCount === 1 ? '2.5%' : '5%',
    },

    classDetails: {
        paddingLeft: 10,
        fontSize: RFPercentage(1.5),
        fontWeight: 'bold'
    },

    rowDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '0.5%',
    },

    viewButton: {
        margin: '2.5%',
        backgroundColor: '#f66b00',
        width: '100%',
        height: RFPercentage(3.5),
        // height: '70%',
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
        // ,marginTop: 50
    }
})
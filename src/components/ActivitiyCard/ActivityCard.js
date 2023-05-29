import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { List } from 'react-native-paper';

export default function ActivityCard({
    bg,
    item,
    columnCount,
    user,
    secID_content,
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


    const handlePress = () => setExpanded(!expanded);

    return (
        <FlatList
            data={item}
            keyExtractor={(item) => `${item.actID}`}
            renderItem={({ item: secID_content }) => (
                <View style={{ paddingHorizontal: '2.5%' }}>
                    <ActivityCard />
                    <Text style={{ fontSize: RFPercentage(1.8),  }}>
                        {`${secID_content.actTitle}`}
                    </Text>
                </View>
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
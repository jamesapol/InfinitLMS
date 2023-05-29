import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default function CourseBottomSheet() {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: '2.5%',
            marginHorizontal: '2.5%',
            // backgroundColor: '#a1a1a1',
        }}>
            <Text style={{ fontSize: RFPercentage(2), fontWeight: 'bold' }}>Course Lists</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
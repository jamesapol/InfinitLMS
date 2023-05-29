import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WarningModal() {
    return (
        <View style={styles.root}>
            <View style={styles.centeredModal}>
                <Text>WarningModal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    centeredModal: {
        height: '40%',
        width: '75%',
        backgroundColor:'red',
    }
})
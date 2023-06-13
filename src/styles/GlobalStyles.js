import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const GlobalStyles() {
    const {
        primaryBG,
        secondaryBG,
        tertiaryBG,
        primaryFontColor,
        secondaryFontColor,
        tertiaryFontColor } = useContext(AuthContext)

    const themeStyles = {
        primaryBG: primaryBG,
        secondaryBG: secondaryBG,
        tertiaryBG: tertiaryBG,
        primaryFontColor: primaryFontColor,
        secondaryFontColor: secondaryFontColor,
        tertiaryFontColor: tertiaryFontColor,
    }

    return themeStyles

}

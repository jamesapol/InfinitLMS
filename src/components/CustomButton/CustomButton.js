import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function CustomButton({
    onPress,
    backgroundColor,
    fgColor,
    borderColor,
    borderWidth,
    style,
    // imgStyle,
    source = null,
    text,
    buttonRef,
    disabled = false,
    prefixChild,
    fontSize,
    loading = false,
    loadingColor = "#FFF",
    marginVertical,
    marginHorizontal,
    child
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            disabled={disabled}
            ref={buttonRef}
            onPress={onPress}
            style={[
                style,
                styles.buttonSize,
                backgroundColor ?? { backgroundColor: '#FF6b00' },
                borderWidth ?? { borderWidth: 1 },
                borderColor ?? { borderColor: '#ff6b00' },
                marginVertical ?? { marginVertical: '2.5%'},
            ]}
        >
            {prefixChild}
            {/* <Image
          source={{ source, cache: true }}
          style={{ imgStyle, display: source ? "flex" : "none" }}
          resizeMode="contain"
        /> */}
            {loading == true ? (
                <ActivityIndicator color={loadingColor} size={18} />
            ) : (
                <Text style={[
                    styles.text,
                    fgColor ?? { color: '#FFF' },
                    fontSize ?? { fontSize: 18 }
                ]}>
                    {text}
                </Text>
            )}
            {child}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonSize: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 10,
        paddingVertical: '2.5%',
        // paddingHorizontal: width * 0.1,
        // paddingVertical: height * 0.01,
        // height: RFPercentage(4)
        // height: '25%',
    },
    text: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: -0.5
    },
});

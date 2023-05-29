import { StyleSheet, Text, Dimensions, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function CustomSearch({
    inputLabel,
    innerRef,
    onFocus,
    selectTextOnFocus,
    value,
    style,
    placeholder,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    autoFocus,
    paddingVertical,
    editable,
    returnKeyType,
    onSubmitEditing,
    onChangeText,
    textAlign = "left",
    disabled,
    prefixChild,
    child,
    ...rest
}) {
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };
    return (
        <View style={{ ...styles.root, borderWidth: focus ? 2.5 : 1.5 }}>
            {prefixChild}
            <Text style={styles.inputLabel}>{inputLabel}</Text>
            <TextInput

                selectTextOnFocus={selectTextOnFocus}
                ref={innerRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                style={[style, styles.input]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoFocus={autoFocus}
                editable={editable}
                disabled={disabled}
                textAlign={textAlign}
                {...rest}
            />
            {child}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        borderColor: '#Ff6b00',
        borderRadius: 15,
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        height: '100%',
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "#DEE0E2",
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        fontSize: 18,
        flex: 1,
    },

    inputLabel: {
        color: '#Ff6b00',
        fontSize: 18,
        fontWeight: "900",
    },
});

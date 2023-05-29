import { StyleSheet, Text, Dimensions, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function CustomInput({
  inputLabel,
  innerRef,
  onFocus,
  selectTextOnFocus,
  value,
  style,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "none",
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
    <View style={{ ...styles.root, borderWidth: focus ? 2 : 1 }}>
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
    // backgroundColor: "#f005",
    // borderRadius: 30,
    // paddingHorizontal: width * 0.01,
    // paddingVertical: height * 0.01,
    // marginVertical: height * 0.005,
    // marginHorizontal: '2.5%',
    // flex: 1,
    // height: '10%',
    // padding: '3%',
    // borderWidth: 2,
    // marginBottom: 100

    borderColor: '#ff6b00',
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: 5,
    height: height * 0.05,
    flexDirection: "row",
    // backgroundColor: "#DEE0E2",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "1%",
  },

  input: {
    // paddingVertical: height * 0.01,
    // backgroundColor: 'red',
    // justifyContent: "center",
    // textAlign:'center',
    // backgroundColor: 'teal',

    // alignItems: "flex-end",
    // justifyContent:'flex-end',
    fontSize: 18,
    flex: 1,
    // fontWeight:'900'
    // textAlign: "right",
    // marginRight: "2%",
  },

  inputLabel: {
    color: '#ff6b00',
    fontSize: 18,
    fontWeight: "900",
  },
});

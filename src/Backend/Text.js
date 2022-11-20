import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TextType = ({ typeOfText, value, changeTextFunction, placeholder }) => {
  return (
    <View style={styles.inputDiv}>
      <Text style={styles.inputLabel}>{typeOfText}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={changeTextFunction}
        placeholder={placeholder}
      />
    </View>
  );
};

export default TextType;

const styles = StyleSheet.create({
  inputDiv: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    marginBottom: 13,
  },

  inputLabel: {
    fontSize: 14,
    paddingBottom: 5,
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
    // marginLeft: 10,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    width: "100%",
    fontSize: 15,
    borderRadius: 5,
  },

  btn: {
    backgroundColor: "blue",
    color: "white",
    width: "100%",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  btnTxt: {
    color: "white",

    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },

  count: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
  },

  countBtn: {
    backgroundColor: "blue",
    color: "white",

    padding: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  countTxt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: 25,
    paddingLeft: 3,
    paddingRight: 3,
  },
});

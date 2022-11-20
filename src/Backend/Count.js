import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Count = ({
  typeOfCount,
  functionTypeIncrement,
  functionTypeDecrement,
  value,
}) => {
  return (
    <View style={styles.inputDiv}>
      <Text style={styles.inputLabel}>{typeOfCount}</Text>

      <View style={styles.count}>
        <Pressable style={styles.countBtn} onPress={functionTypeIncrement}>
          <Text style={styles.btnTxt}>+</Text>
        </Pressable>
        <Text style={styles.countTxt}>{value}</Text>
        <Pressable style={styles.countBtn} onPress={functionTypeDecrement}>
          <Text style={styles.btnTxt}>-</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Count;

const styles = StyleSheet.create({
  inputDiv: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    marginBottom: 10,
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
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "center",
    borderRadius: 5,
  },
  countTxt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

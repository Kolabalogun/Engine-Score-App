import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headertxt}>Engine Scores</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headertxt: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
});

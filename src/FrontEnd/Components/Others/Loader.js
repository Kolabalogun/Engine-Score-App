import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../../../Function/Context";

const Loader = () => {

  const {currentTheme} = useGlobalContext()

return (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator
      size="large"
      color={
        currentTheme === "Red"
          ? "#CF0A0A"
          : currentTheme === "Pink"
          ? "#EA047E"
          : currentTheme === "Purple"
          ? "#EA047E"
          : "#377D71"
      }
    />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#edeff2",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Loader;



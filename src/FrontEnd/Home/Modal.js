import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Modal = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/logo-01.png")} />
      <View style={styles.bannerView}>
        <Image
          style={styles.modalBanner}
          source={require("../../../assets/banner1.png")}
        />
      </View>
      <Text style={styles.modaltxt}>Engine Score App</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(59, 58, 69)",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
    position: "relative",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  logo: {
    marginTop: 40,
    height: 100,
    width: 60,
    alignItems: "center",
  },

  bannerView: {
    marginTop: 30,
    height: 590,
    width: 300,
    position: "absolute",
    top: 90,
  },

  modalBanner: {
    height: "100%",
    width: "100%",
  },

  modaltxt: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700",
    borderTopColor: "rgb(255, 204, 51)",
    borderTopWidth: 2,
    borderBottomColor: "rgb(255, 204, 51)",
    borderBottomWidth: 2,
    marginBottom: 70,
    padding: 10,
  },
});

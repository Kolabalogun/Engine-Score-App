import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { AppProvider } from "./Backend/Context";
import Index from "./Backend/Index";
import Group from "./Components/Group";
import Header from "./Components/Header";

import Match from "./Components/Match";
import Modal from "./Components/Modal";

const stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [ModalState, ModalStateF] = useState(true);

  function closeModal() {
    ModalStateF(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });

  return (
    <AppProvider>
      {ModalState ? (
        <Modal />
      ) : (
        <NavigationContainer style={styles.container}>
          <Header />
          <Tab.Navigator>
            <Tab.Screen name="Match" component={Match} />
            <Tab.Screen name="Backend" component={Index} />
            <Tab.Screen name="Group" component={Group} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

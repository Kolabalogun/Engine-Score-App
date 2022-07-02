import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import Group from "./Group";
import Header from "./Header";
import Match from "./Match";

const Tab = createMaterialTopTabNavigator();

function ScreenA(params) {}

const Home = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Header />
      <Tab.Navigator>
        <Tab.Screen name="Match" component={Match} />
        <Tab.Screen name="Group" component={Group} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

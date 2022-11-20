import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import TabNavigations from "./TabNavigation";



const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Home"}
    >
      <Stack.Screen name="Tabs" component={TabNavigations} />
      
    </Stack.Navigator>
  );
};

export default Navigations;

const styles = StyleSheet.create({});

import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Match from "../FrontEnd/Pages/Match";
import Notification from "../Notification/Notification";
import Index from "../Backend/Index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Group from "../FrontEnd/Pages/Group";




const Tabs = createMaterialBottomTabNavigator ();

const TabNavigations = () => {
  return (
    <Tabs.Navigator
    barStyle={{ backgroundColor: '#fff', paddingBottom: 10 }}
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Match") {
            iconName = "home";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Group") {
            iconName = "calendar-o";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Backend") {
            iconName = "soccer-ball-o";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Notification") {
            iconName = "comment";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;

          
        },
  


        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Match" component={Match} />
      <Tabs.Screen name="Group" component={Group} />
      <Tabs.Screen name="Backend" component={Index} />
      <Tabs.Screen name="Notification" component={Notification} />
    </Tabs.Navigator>
  );
};

export default TabNavigations;

const styles = StyleSheet.create({});

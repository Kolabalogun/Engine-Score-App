import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Home from "../FrontEnd/Pages/Home";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import TopPick from "../Backend/Top Pick/TopPick";
import ListofTeams from "../Backend/Team/ListofTeams";
import MatchList from "../Backend/Match/MatchList";
import Players from "../Backend/Player/Players";
import ListofPlayers from "../Backend/Player/ListofPlayers";
import { useGlobalContext } from "./Context";

const Tabs = createMaterialBottomTabNavigator();

const AdminNavigation = () => {
const {currentTheme} = useGlobalContext()

  return (
    <Tabs.Navigator
     
      barStyle={{
        backgroundColor:
          currentTheme === "Red"
            ? "#CF0A0A"
            : currentTheme === "Pink"
            ? "#EA047E"
            : currentTheme === "Purple"
            ? "#fff"
            : "#377D71",
      }}
      initialRouteName="Top Pick"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Top Pick") {
            iconName = "home";
            (size = focused ? 26 : 26),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "MatchList") {
            iconName = "soccer-ball-o";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "ListofPlayers") {
            iconName = "group";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "Team List") {
            iconName = "list-alt";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Top Pick" component={TopPick} />
      <Tabs.Screen name="MatchList" component={MatchList} />
      <Tabs.Screen name="Team List" component={ListofTeams} />
      <Tabs.Screen name="ListofPlayers" component={ListofPlayers} />
    </Tabs.Navigator>
  );
};

export default AdminNavigation;

const styles = StyleSheet.create({});

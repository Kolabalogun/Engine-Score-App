import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Groupbackend from "./GroupBackEnd";
import MatchBackEnd from "./MatchBackEnd";

const Tab = createMaterialTopTabNavigator();

const Index = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groupbackend" component={Groupbackend} />

      <Tab.Screen name="MatchBackEnd" component={MatchBackEnd} />
    </Tab.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from 'react'
import { useGlobalContext } from '../../../Function/Context';
import { styles } from '../../../Function/styles';

const Nav = () => {
     const {
       competitionF,
       competition,
       currentTheme,
       
       competitionTypeF,
     } = useGlobalContext();
  return (
    <View style={styles.navMenu}>
      <TouchableOpacity
        onPress={() => {
          competitionF(4);
          competitionTypeF("Engine 4.0");
        }}
        style={{
          backgroundColor:
            competition === 4 && currentTheme === "Default"
              ? "#377D71"
              : competition === 4 && currentTheme === "Red"
              ? "#CF0A0A"
              : competition === 4 && currentTheme === "Pink"
              ? "#EA047E"
              : competition === 4 && currentTheme === "Purple"
              ? "#EA047E"
              : "#fff",
          paddingHorizontal: 10,
          paddingVertical: 15,
          flex: 1,
          marginHorizontal: 5,
          alignItems: "center",
          borderRadius: 50,
        }}
      >
        <Text
          style={{
            color:
              competition === 4 && currentTheme === "Default"
                ? "#fff"
                : competition === 4 && currentTheme === "Pink"
                ? "#fff"
                : competition === 4 && currentTheme === "Red"
                ? "#fff"
                : competition === 4 && currentTheme === "Purple"
                ? "#fff"
                : competition !== 4 && currentTheme === "Pink"
                ? "#EA047E"
                : competition !== 4 && currentTheme === "Red"
                ? "#CF0A0A"
                : competition !== 4 && currentTheme === "Purple"
                ? "#EA047E"
                : "#377D71",
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Engine 4.0
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          competitionF(3);
          competitionTypeF("Engine 3.0");
        }}
        style={{
          backgroundColor:
            competition === 3 && currentTheme === "Default"
              ? "#377D71"
              : competition === 3 && currentTheme === "Red"
              ? "#CF0A0A"
              : competition === 3 && currentTheme === "Pink"
              ? "#EA047E"
              : competition === 3 && currentTheme === "Purple"
              ? "#EA047E"
              : "#fff",
          paddingHorizontal: 10,
          paddingVertical: 15,
          flex: 1,
          marginHorizontal: 5,
          alignItems: "center",
          borderRadius: 50,
        }}
      >
        <Text
          style={{
            color:
              competition === 3 && currentTheme === "Default"
                ? "#fff"
                : competition === 3 && currentTheme === "Pink"
                ? "#fff"
                : competition === 3 && currentTheme === "Red"
                ? "#fff"
                : competition === 3 && currentTheme === "Purple"
                ? "#fff"
                : competition !== 3 && currentTheme === "Pink"
                ? "#EA047E"
                : competition !== 3 && currentTheme === "Red"
                ? "#CF0A0A"
                : competition !== 3 && currentTheme === "Purple"
                ? "#EA047E"
                : "#377D71",
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Engine 3.0
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Nav

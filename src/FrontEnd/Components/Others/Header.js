import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../../Function/styles";
import { useGlobalContext } from "../../../Function/Context";




const Header = ({navigation, functions, imgtype, functions2, imgtype2}) => {
  const {currentTheme} = useGlobalContext()
  return (
    <View style={styles.homeHeader}>
      <TouchableOpacity
        onPress={
          functions
            ? functions
            : () => {
                navigation.toggleDrawer();
              }
        }
        style={styles.profilePic}
      >
        <Image
          source={imgtype ? imgtype : require("../../../../assets/menu.png")}
          resizeMode="cover"
          style={{ height: imgtype? 28: 20, width: imgtype? 28: 20 }}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleDiv}>
        <Text style={styles.headerTitle}>
          Engine
          <Text
            style={[
              styles.headerTitleScore,
              {
                color:
                  currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#377D71",
              },
            ]}
          >
            Scores
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={
          functions2
            && functions2
         
        }
        style={styles.profilePic}
      >
        <Image
          source={imgtype2}
          resizeMode="cover"
          style={{ height: 30, width: 30,  }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;


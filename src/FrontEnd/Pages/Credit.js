import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../Components/Others/Header";


import { styles } from "../../Function/styles";
import { useGlobalContext } from "../../Function/Context";



const Credits = ({navigation}) => {
const {currentTheme} = useGlobalContext()
    
function functions(params) {
  navigation.toggleDrawer();
}
  return (
    <ScrollView style={styles.container}>
      <Header functions={functions} />
      <View style={styles.body}>
        <View style={styles.noth}>
          <TouchableOpacity
            onLongPress={() => navigation.navigate("AuthNavigations")}
          >
            <Image
              resizeMode="contain"
              source={require("../../../assets/credit.png")}
              style={{ width: 300, height: 300, borderRadius: 15 }}
            />
          </TouchableOpacity>
          <Text style={styles.nothTxt}>This app is developed by Ibrahim.</Text>
          <TouchableOpacity
            style={[
              styles.optionBtn,
              {
                borderColor:
                  currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#000",

                backgroundColor:
                  currentTheme === "Red"
                    ? "black"
                    : currentTheme === "Pink"
                    ? "#496EEC"
                    : currentTheme === "Purple"
                    ? "rgb(85, 3, 85)"
                    : "#377D71",
              },
            ]}
            onPress={() => {
              Linking.openURL("https://ibrahimkolabalogun.web.app/");
            }}
          >
            <Text style={[styles.option, { color: "white" }]}>
              See Portfolio
            </Text>
          </TouchableOpacity>
          <Text style={styles.nothTxt}>This app is designed by Mirabel.</Text>
          <TouchableOpacity
            style={[
              styles.optionBtn,
              {
                backgroundColor:
                  currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#000",

                borderColor:
                  currentTheme === "Red"
                    ? "black"
                    : currentTheme === "Pink"
                    ? "#496EEC"
                    : currentTheme === "Purple"
                    ? "rgb(85, 3, 85)"
                    : "#377D71",
              },
            ]}
            onPress={() => {
              Linking.openURL("https://www.behance.net/SheIsMeerah");
            }}
          >
            <Text style={[styles.option, { color: "white" }]}>
              See Portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Credits;



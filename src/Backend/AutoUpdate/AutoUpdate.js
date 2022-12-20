import {
  Image,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from 'react'

import { useGlobalContext } from '../../Function/Context';
import { styles } from '../../Function/styles';



const AutoUpdatee = () => {




    const {  AutoUpdateState, getData, currentTheme } =
      useGlobalContext();

    useEffect(() => {
     getData()
    }, [])

  return (
    <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 5,
          paddingTop: 120,
        }}
      >
        <View style={styles.homeHeader}>
          <View style={styles.headerTitleDiv}>
            <Text style={styles.headerTitle}>
              Engine
              <Text
                style={[
                  styles.headerTitleScore,
                 {color: currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#377D71",}
                ]}
              >
                Scores
              </Text>
            </Text>
          </View>
        </View>

        <Image source={require("../../../assets/balll.png")} />

        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <Text
            style={{
              flexDirection: "row",
              textAlign: "center",
              paddingHorizontal: 10,
              fontSize: 14,
            }}
          >
            New Update Available
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "flex-end", flex: 1 }}>
        <TouchableOpacity
          style={{

            paddingVertical: 15,
          backgroundColor:       currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#377D71",
            flexDirection: "row",
            flex: 1,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
          onPress={() => {
              Linking.openURL(AutoUpdateState?.link);
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,

              textAlign: "center",
            }}
          >
            CLICK TO DOWNLOAD
          </Text>
        </TouchableOpacity>
      </View>
 
    </SafeAreaView>
  );
}

export default AutoUpdatee;

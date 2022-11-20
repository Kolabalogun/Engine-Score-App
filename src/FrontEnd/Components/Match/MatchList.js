import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MatchList = ({
  matchDay,
  firstteam,
  secondteam,
  firstteamScore,
  secondteamScore,
  time,
  gamestate,
}) => {
  return (
    <View style={styles.matches}>
      <View style={styles.left}>
        <Text style={styles.leftText}>{time}</Text>
        <Text style={styles.leftText}>{gamestate}</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.teams}>
        <Text style={styles.leftText}>{firstteam}</Text>
        <Text style={styles.leftText}>{secondteam}</Text>
      </View>
      <View style={styles.score}>
        <Text style={styles.leftText}>{firstteamScore}</Text>
        <Text style={styles.leftText}>{secondteamScore}</Text>
      </View>
    </View>
  );
};

export default MatchList;

const styles = StyleSheet.create({
  matches: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  left: {
    paddingRight: 10,
  },
  line: {
    backgroundColor: "#aaa",
    width: 1,
    height: "100%",
    marginRight: 10,
  },

  teams: {
    flex: 1,
  },
});

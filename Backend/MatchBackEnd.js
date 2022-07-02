import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MatchOne from "./MatchOne";

const MatchBackEnd = () => {
  return (
    <View style={styles.con}>
      <Text style={styles.groupName}>Update Match</Text>

      <MatchOne />
    </View>
  );
};

export default MatchBackEnd;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    padding: 15,
    backgroundColor: "aliceblue",
  },
  groupName: {
    fontSize: 20,
    fontWeight: "700",
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: "blue",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    color: "black",
    marginBottom: 6,
  },
});

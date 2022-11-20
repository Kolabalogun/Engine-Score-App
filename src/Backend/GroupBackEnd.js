import { ScrollView, StyleSheet } from "react-native";
import React from "react";

import GroupOne from "./GroupOne";

const Groupbackend = () => {
  return (
    <ScrollView style={styles.con}>
      <GroupOne />
    </ScrollView>
  );
};

export default Groupbackend;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    padding: 15,
    backgroundColor: "aliceblue",
  },
});

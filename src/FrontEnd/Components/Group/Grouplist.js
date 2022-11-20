import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Grouplist = ({
  id,
  name,
  played,

  draw,
  win,
  lost,
  gd,
  point,
}) => {
  return (
    <View style={styles.topTablerow}>
      {/* <Text style={styles.tableHeadone}>{id}</Text> */}
      <Text style={styles.tableHeadone}>{name}</Text>
      <Text style={styles.tableHead}>{played}</Text>
      <Text style={styles.tableHead}>{win}</Text>
      <Text style={styles.tableHead}>{lost}</Text>
      <Text style={styles.tableHead}>{draw}</Text>
      <Text style={styles.tableHead}>{gd}</Text>
      <Text style={styles.tableHead}>{point}</Text>
    </View>
  );
};

export default Grouplist;

const styles = StyleSheet.create({
  topTablerow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tableHead: {
    color: "black",
    // padding: 3,
    alignItems: "center",
    fontSize: 13,
  },
  tableHeadone: {
    color: "black",
    paddingRight: 5,
    alignItems: "center",
    // width: 30,
    fontSize: 13,
  },
});

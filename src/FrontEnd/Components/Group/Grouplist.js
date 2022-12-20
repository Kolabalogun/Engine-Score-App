import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Grouplist = ({

  name,
  played,

  draw,
  win,
  lost,
  gd,
  point,
}) => {
  return (
    <View style={styles.topTable}>
      <Text
        style={[
          styles.tableHeadone,
          {
            alignItems: "center",
        fontsize: 13,
          }
        ]}
      >
        {name}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
          fontsize: 13,
          },
        ]}
      >
        {played}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
            alignItems: "center",
             fontsize: 13,
          },
        ]}
      >
        {win}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
            alignItems: "center",
            fontsize: 13,
          },
        ]}
      >
        {lost}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
            alignItems: "center",
            fontsize: 13,
          },
        ]}
      >
        {draw}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
            alignItems: "center",
          fontsize: 13,
          },
        ]}
      >
        {gd}
      </Text>
      <Text
        style={[
          styles.tableHead,
          {
            fontWeight: "400",
            alignItems: "center",
              fontsize: 13,
          },
        ]}
      >
        {point}
      </Text>
    </View>
  );
};

export default Grouplist;

const styles = StyleSheet.create({
  
  topTable: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tableHead: {
    color: "black",

    flex: 1,
  },
  tableHeadone: {
    color: "black",

    flex: 4,
  },
});

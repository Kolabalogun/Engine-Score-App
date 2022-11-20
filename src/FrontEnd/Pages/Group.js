import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Grouplist from "../Components/Group/Grouplist";


const Group = () => {
  const { Group } = useGlobalContext();

  const points = Group;
  points.sort(function (a, b) {
    return b.points - a.points;
  });

  const Group1Elements = points.map((group, index) => {
    if (group.group === 1) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.name}
          played={group.played}
          draw={group.draw}
          win={group.won}
          lost={group.lost}
          gd={group.goalD}
          point={group.points}
        />
      );
    }
  });
  const Group2Elements = points.map((group, index) => {
    if (group.group === 2) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.name}
          played={group.played}
          draw={group.draw}
          win={group.won}
          lost={group.lost}
          gd={group.goalD}
          point={group.points}
        />
      );
    }
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Engine 4.0</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.groupName}>Group One</Text>
          <View style={styles.table}>
            <View style={styles.topTable}>
              {/* <Text style={styles.tableHead}>No</Text> */}
              <Text style={styles.tableHead}>Teams</Text>
              <Text style={styles.tableHead}>P</Text>
              <Text style={styles.tableHead}>W</Text>
              <Text style={styles.tableHead}>L</Text>
              <Text style={styles.tableHead}>D</Text>
              <Text style={styles.tableHead}>GD</Text>
              <Text style={styles.tableHead}>Pts</Text>
            </View>
            {Group1Elements}
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.groupName}>Group One</Text>
          <View style={styles.table}>
            <View style={styles.topTable}>
              {/* <Text style={styles.tableHead}>No</Text> */}
              <Text style={styles.tableHead}>Teams</Text>
              <Text style={styles.tableHead}>P</Text>
              <Text style={styles.tableHead}>W</Text>
              <Text style={styles.tableHead}>L</Text>
              <Text style={styles.tableHead}>D</Text>
              <Text style={styles.tableHead}>GD</Text>
              <Text style={styles.tableHead}>Pts</Text>
            </View>
            {Group2Elements}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#aaa",
    backgroundColor: "aliceblue",
  },
  main: {
    padding: 15,
  },
  group: {
    padding: 0,
    marginBottom: 30,
  },

  groupName: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: "#aaa",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    color: "black",
    marginBottom: 10,
    marginTop: 5,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    color: "#aaa",
    paddingTop: 10,
    alignItems: "center",
  },
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

    // padding: 3,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
  },
});

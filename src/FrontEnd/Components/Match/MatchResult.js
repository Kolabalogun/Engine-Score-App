import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../../Function/Context";


const MatchResult = () => {
  const { MatchState } = useGlobalContext();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Engine 4.0</Text>
        </View>

        <View style={styles.scoreBoard}>
          <View style={styles.firstTeam}>
            <Text style={styles.teamName}>Mechanical Engineering</Text>
            <View style={styles.hh}>
              <Image
                source={require("../../../../assets/logo-01.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.score}>
            <Text style={styles.scoreTxt}>2</Text>
            <Text style={styles.scoreLine}>-</Text>
            <Text style={styles.scoreTxt}>2</Text>
          </View>
          <View style={styles.firstTeam}>
            <Text style={styles.teamName}>Computer Engineering</Text>
            <View style={styles.hh}>
              <Image
                source={require("../../../../assets/logo-02.png")}
                style={styles.logo}
              />
            </View>
          </View>
        </View>

        <View style={styles.scoreActionsCon}>
          <View style={styles.scoreActions}>
            <View style={styles.matches}>
              <View style={styles.left}>
                <Text style={styles.leftText}>Goal</Text>
                <Text style={styles.leftText}>32</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.teams}>
                <Text style={styles.leftText}>Salako Micheal</Text>
                <Text style={styles.leftTextAssist}>Assist: Ibrahim</Text>
              </View>
            </View>
            <View style={styles.matchesRight}>
              <View style={styles.left}>
                <Text style={styles.leftText}>Goal</Text>
                <Text style={styles.leftText}>42</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.teams}>
                <Text style={styles.leftText}>Salako Micheal</Text>
                <Text style={styles.leftTextAssist}>Assist: Ibrahim</Text>
              </View>
            </View>
            <View style={styles.matches}>
              <View style={styles.left}>
                <Text style={styles.leftText}>Goal</Text>
                <Text style={styles.leftText}>57</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.teams}>
                <Text style={styles.leftText}>Salako Micheal</Text>
                <Text style={styles.leftTextAssist}>Assist: Ibrahim</Text>
              </View>
            </View>
            <View style={styles.matchesRight}>
              <View style={styles.left}>
                <Text style={styles.leftText}>Goal</Text>
                <Text style={styles.leftText}>82</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.teams}>
                <Text style={styles.leftText}>Salako Micheal</Text>
                <Text style={styles.leftTextAssist}>Assist: Ibrahim</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.Matchdetails}>
          <Text style={styles.MDhead}>Match Details</Text>

          <View style={styles.items}>
            <Text style={styles.itemsTxt}>Venue</Text>
            <Text style={styles.itemsTxt}>Maracana Field</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.itemsTxt}>Date</Text>
            <Text style={styles.itemsTxt}>TBD</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.itemsTxt}>Referee</Text>
            <Text style={styles.itemsTxt}>Cristiano Ronaldo</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MatchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  main: {
    padding: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },

  scoreBoard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreTxt: {
    fontWeight: "600",
    fontSize: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scoreLine: {
    fontWeight: "600",
    fontSize: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },

  logo: {
    height: "100%",
    width: "100%",
  },
  hh: {
    height: 80,
    width: 48,
    justifyContent: "center",
    marginTop: 5,
    // backgroundColor: "#aaa",
  },
  firstTeam: {
    alignItems: "center",
  },
  teamName: {
    fontSize: 14,
    fontWeight: "500",
  },
  matches: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  matchesRight: {
    display: "flex",
    // alignItems: "flex-end",
    flexDirection: "row-reverse",
    width: "100%",
    marginTop: 20,
    // backgroundColor: "yellow",
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
    // flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  scoreActions: {
    backgroundColor: "white",

    borderRadius: 5,
    padding: 10,
    // height: 400,
    flexDirection: "column-reverse",
  },

  scoreActionsCon: {
    backgroundColor: "aliceblue",
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },

  Matchdetails: {
    marginTop: 10,
    padding: 10,
    marginBottom: 30,
  },
  MDhead: {
    textAlign: "center",
    borderBottomColor: "#aaa",
    padding: 5,
    borderBottomWidth: 1,
  },
  items: {
    padding: 5,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  itemsTxt: {
    fontWeight: "500",
  },

  leftTextAssist: {
    color: "#aaa",
  },
  leftText: {
    fontSize: 15,
  },
});

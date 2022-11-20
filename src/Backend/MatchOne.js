import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Count from "./Count";
import TextType from "./Text";
import { useGlobalContext } from "../Function/Context";

const MatchOne = () => {
  const {
    inputMatchID,
    inputMatchIDFunction,
    inputGameState,
    inputGameStateFunction,
    inputFirstTeamScore,
    FirstTeamScoreFunctionIncreasement,
    FirstTeamScoreFunctionDecreasement,
    inputSecondTeamScore,
    SecondTeamScoreFunctionIncreasement,
    SecondTeamScoreFunctionDecreasement,
    matchID,
    handleMatchPress,
  } = useGlobalContext();
  return (
    <View>
      <TextType
        typeOfText="Match ID"
        value={inputMatchID}
        changeTextFunction={inputMatchIDFunction}
        placeholder="Enter Match ID"
      />

      <TextType
        typeOfText="Game State"
        value={inputGameState}
        changeTextFunction={inputGameStateFunction}
        placeholder="Enter Game State"
      />

      <Count
        typeOfCount="First Team"
        functionTypeIncrement={FirstTeamScoreFunctionIncreasement}
        functionTypeDecrement={FirstTeamScoreFunctionDecreasement}
        value={inputFirstTeamScore}
      />
      <Count
        typeOfCount="Second Team"
        functionTypeIncrement={SecondTeamScoreFunctionIncreasement}
        functionTypeDecrement={SecondTeamScoreFunctionDecreasement}
        value={inputSecondTeamScore}
      />

      <Pressable style={styles.btn} onPress={() => handleMatchPress(matchID)}>
        <Text style={styles.btnTxt}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default MatchOne;

const styles = StyleSheet.create({
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
  inputDiv: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    marginBottom: 13,
  },

  inputLabel: {
    fontSize: 14,
    paddingBottom: 5,
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
    // marginLeft: 10,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    width: "100%",
    fontSize: 15,
    borderRadius: 5,
  },

  displays: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btn: {
    backgroundColor: "blue",
    color: "white",
    width: "100%",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  btnTxt: {
    color: "white",

    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },

  count: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
  },

  countBtn: {
    backgroundColor: "blue",
    color: "white",

    padding: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  countTxt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: 25,
    paddingLeft: 3,
    paddingRight: 3,
  },
});

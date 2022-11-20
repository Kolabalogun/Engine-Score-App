import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../Function/Context";
import TextType from "./Text";
import Count from "./Count";

const GroupOne = () => {
  const {
    handlePress,
    inputnameFunction,

    inputname,

    name,

    inputMatches,
    MatchPlayedFunctionIncreasement,
    MatchPlayedFunctionDecreasement,
    inputWins,
    WinsFunctionIncreasement,
    WinsFunctionDecreasement,
    inputDraw,
    DrawFunctionIncreasement,
    DrawFunctionDecreasement,
    inputLoss,
    LossFunctionIncreasement,
    LossFunctionDecreasement,

    inputGoalD,
    GoalDFunctionIncreasement,
    GoalDFunctionDecreasement,
    inputpoints,
    pointsFunctionIncreasement,
    pointsFunctionDecreasement,
  } = useGlobalContext();

  return (
    <View>
      <Text style={styles.groupName}>Update Groups</Text>

      <TextType
        typeOfText="Team Name"
        value={inputname}
        changeTextFunction={inputnameFunction}
        placeholder="Enter Team Name"
      />

      <View style={styles.displays}>
        <Count
          typeOfCount="Matches Played"
          functionTypeIncrement={MatchPlayedFunctionIncreasement}
          functionTypeDecrement={MatchPlayedFunctionDecreasement}
          value={inputMatches}
        />
        <Count
          typeOfCount="Wins"
          functionTypeIncrement={WinsFunctionIncreasement}
          functionTypeDecrement={WinsFunctionDecreasement}
          value={inputWins}
        />
      </View>

      <View style={styles.displays}>
        <Count
          typeOfCount="Draw"
          functionTypeIncrement={DrawFunctionIncreasement}
          functionTypeDecrement={DrawFunctionDecreasement}
          value={inputDraw}
        />
        <Count
          typeOfCount="Loss"
          functionTypeIncrement={LossFunctionIncreasement}
          functionTypeDecrement={LossFunctionDecreasement}
          value={inputLoss}
        />
      </View>

      <View style={styles.displays}>
        <Count
          typeOfCount="Goal Difference"
          functionTypeIncrement={GoalDFunctionIncreasement}
          functionTypeDecrement={GoalDFunctionDecreasement}
          value={inputGoalD}
        />
        <Count
          typeOfCount="Points"
          functionTypeIncrement={pointsFunctionIncreasement}
          functionTypeDecrement={pointsFunctionDecreasement}
          value={inputpoints}
        />
      </View>

      <Pressable style={styles.btn} onPress={() => handlePress(name)}>
        <Text style={styles.btnTxt}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default GroupOne;

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

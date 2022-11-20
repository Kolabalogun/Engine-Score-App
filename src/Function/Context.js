import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";

import { MatchArray } from "../FrontEnd/Components/Match/MatchArray";
import { GroupArray } from "../FrontEnd/Components/Group/GroupState";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [Group, GroupF] = useState(GroupArray);

  //   BackEnd Group STage

  const [inputID, inputIDF] = useState(1);
  const [inputname, inputnameF] = useState("");
  const [inputMatches, inputMatchesF] = useState(0);
  const [inputWins, inputWinsF] = useState(0);
  const [inputLoss, inputLossF] = useState(0);
  const [inputDraw, inputDrawF] = useState(0);
  const [inputGoalD, inputGoalDF] = useState(0);
  const [inputpoints, inputpointsF] = useState(0);

  function inputnameFunction(e) {
    inputnameF(e);
  }

  function RankFunctionIncreasement(params) {
    inputIDF(inputID + 1);
  }
  function RankFunctionDecreasement(params) {
    inputIDF(inputID - 1);
  }
  function MatchPlayedFunctionIncreasement(params) {
    inputMatchesF(inputMatches + 1);
  }
  function MatchPlayedFunctionDecreasement(params) {
    if (inputMatches > 0) {
      inputMatchesF(inputMatches - 1);
    }
  }
  function WinsFunctionIncreasement(params) {
    inputWinsF(inputWins + 1);
  }
  function WinsFunctionDecreasement(params) {
    if (inputWins > 0) {
      inputWinsF(inputWins - 1);
    }
  }
  function LossFunctionIncreasement(params) {
    inputLossF(inputLoss + 1);
  }
  function LossFunctionDecreasement(params) {
    if (inputLoss > 0) {
      inputLossF(inputLoss - 1);
    }
  }
  function DrawFunctionIncreasement(params) {
    inputDrawF(inputDraw + 1);
  }
  function DrawFunctionDecreasement(params) {
    if (inputDraw > 0) {
      inputDrawF(inputDraw - 1);
    }
  }
  function GoalDFunctionIncreasement(params) {
    inputGoalDF(inputGoalD + 1);
  }
  function GoalDFunctionDecreasement(params) {
    if (inputGoalD > 0) {
      inputGoalDF(inputGoalD - 1);
    }
  }
  function pointsFunctionIncreasement(params) {
    inputpointsF(inputpoints + 1);
  }
  function pointsFunctionDecreasement(params) {
    if (inputpoints > 0) {
      inputpointsF(inputpoints - 1);
    }
  }

  const name = inputname.toLocaleUpperCase();

  function handlePress(name) {
    const rank = inputID;
    const gamePlay = inputMatches;
    const wins = inputWins;
    const draw = inputDraw;
    const loss = inputLoss;
    const GoalD = inputGoalD;
    const points = inputpoints;

    GroupF((prevState) => {
      return prevState.map((memee) => {
        return memee.name === name
          ? {
              ...memee,
              id: rank,
              played: gamePlay,
              won: wins,
              lost: loss,
              draw: draw,
              goalD: GoalD,
              points: points,
            }
          : { ...memee };
      });
    });
  }

  // Matches

  const [MatchState, MatchStateF] = useState(MatchArray);

  const [inputMatchID, inputMatchIDF] = useState("");
  const [inputFirstTeamScore, inputFirstTeamScoreF] = useState(0);
  const [inputSecondTeamScore, inputSecondTeamScoreF] = useState(0);
  const [inputGameState, inputGameStateF] = useState("");

  function inputMatchIDFunction(e) {
    inputMatchIDF(e);
  }
  function inputGameStateFunction(e) {
    inputGameStateF(e);
  }

  function FirstTeamScoreFunctionIncreasement(params) {
    inputFirstTeamScoreF(inputFirstTeamScore + 1);
  }
  function FirstTeamScoreFunctionDecreasement(params) {
    if (inputFirstTeamScore > 0) {
      inputFirstTeamScoreF(inputFirstTeamScore - 1);
    }
  }
  function SecondTeamScoreFunctionIncreasement(params) {
    inputSecondTeamScoreF(inputSecondTeamScore + 1);
  }
  function SecondTeamScoreFunctionDecreasement(params) {
    if (inputSecondTeamScore > 0) {
      inputSecondTeamScoreF(inputSecondTeamScore - 1);
    }
  }

  const matchID = inputMatchID.toLocaleUpperCase();

  function handleMatchPress(matchID) {
    const firstteamScoren = inputFirstTeamScore;
    const secondteamScoren = inputSecondTeamScore;
    const gamestate = inputGameState.toLocaleUpperCase();

    MatchStateF((prevState) => {
      return prevState.map((memee) => {
        return memee.id === matchID
          ? {
              ...memee,

              firstteamScore: firstteamScoren,
              secondteamScore: secondteamScoren,
              gamestate: gamestate,
            }
          : { ...memee };
      });
    });
    console.warn("success");

    inputMatchIDF("");
    inputGameStateF("");
    inputFirstTeamScoreF(0);
    inputSecondTeamScoreF(0);
  }

  return (
    <AppContext.Provider
      value={{
        Group,
        inputname,
        inputnameFunction,
        name,
        inputID,
        RankFunctionIncreasement,
        RankFunctionDecreasement,
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
        handlePress,
        MatchState,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

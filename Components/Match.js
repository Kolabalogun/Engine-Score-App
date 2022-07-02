import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MatchList from "./MatchList";
import { useGlobalContext } from "../Backend/Context";
import { NavigationContainer } from "@react-navigation/native";
import MatchResult from "./MatchResult";

const stack = createStackNavigator();

const Match = ({ navigation }) => {
  const { MatchState } = useGlobalContext();

  function onMatchClick(params) {
    navigation.navigate("MatchResult");
  }

  const MatchDayOneElements = MatchState.map((match, index) => {
    if (match.matchDay === 1) {
      return (
        <Pressable key={index} onPress={onMatchClick}>
          <MatchList
            //   id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });
  const MatchDayTwoElements = MatchState.map((match, index) => {
    if (match.matchDay === 2) {
      return (
        <Pressable key={index} onPress={() => onMatchClick(match.id)}>
          <MatchList
            //   id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });
  const MatchDayThreeElements = MatchState.map((match, index) => {
    if (match.matchDay === 3) {
      return (
        <Pressable key={index} onPress={() => onMatchClick(match.id)}>
          <MatchList
            id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });

  function Screen_A(params) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Engine 4.0</Text>
          </View>

          <Text style={styles.groupName}>Matchday One</Text>

          {MatchDayOneElements}

          <Text style={styles.groupName}>Matchday Two</Text>

          {MatchDayTwoElements}

          <Text style={styles.groupName}>Matchday Three</Text>

          {MatchDayThreeElements}
        </View>
      </ScrollView>
    );
  }

  return (
    <stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <stack.Screen name="Screen_A" component={Screen_A} />
      <stack.Screen name="MatchResult" component={MatchResult} />
    </stack.Navigator>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  main: {
    padding: 15,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
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
    marginTop: 15,
  },
});

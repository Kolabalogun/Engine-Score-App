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
import MatchList from "../Components/Match/MatchList";
// import { useGlobalContext } from "../../Backend/Context";
import { NavigationContainer } from "@react-navigation/native";
// import MatchResult from "../Components/Match/MatchResult";
import { useGlobalContext } from "../../Function/Context";
import MatchResult from "../Components/Match/MatchResult";
import { color } from "react-native-reanimated";

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

  function Screen_A() {
    return (

        <View style={styles.container}>

      {/* <View style={styles.homeHeader}>
        <View style={styles.profilePic}>
        <Image
            source={require("../../../assets/pro.jpg")}
            resizeMode="cover"
            style={{ height: 40, width: 40, borderRadius: 50 }}
          />
        </View>
        <View style={styles.headerTitleDiv}>
       <Text style={styles.headerTitle}>Engine <Text style={styles.headerTitleScore} >Scores</Text></Text>
        </View>
        <View style={styles.profilePic}>
        <Image
            source={require("../../../assets/pro.jpg")}
            resizeMode="cover"
            style={{ height: 40, width: 40, borderRadius: 50 }}
          />
        </View>
      </View> */}

    </View>
   

  
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
    backgroundColor: "#f5f5f5",
    padding: 10
  },

  homeHeader :{
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center'
  },

  headerTitle :{
fontSize:26,
fontWeight: '400'

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

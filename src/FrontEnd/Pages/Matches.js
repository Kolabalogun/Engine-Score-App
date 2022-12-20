import {
  Image,

  RefreshControl,
  ScrollView,
  TouchableOpacity,

  Text,
  View,
  SafeAreaView,
} from "react-native";

import React from "react";

import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";


import Header from "../Components/Others/Header";
import Nav from "../Components/Others/Nav";
import Loader from "../Components/Others/Loader";

const Match = ({ navigation }) => {
  const { MatchsFromDB, getMatchsFromDB, competition, loader, currentTheme } =
    useGlobalContext();

  const Engine40list = MatchsFromDB.map((match, index) => {
    if (match.Competition === "Engine 4.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("MatchResult", {
              matchId: match.id,
            })
          }
          style={styles.eachMatch}
        >
          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
            style={{height: 40, width: 40 }}
            />
          </View>
          <View style={styles.eachMatchTime}>
            {match.MatchActive ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.eachMatchTeamTimeScore, {color: currentTheme === "Red"
              ? "#CF0A0A"
              : currentTheme === "Pink"
              ? "#EA047E"
              : currentTheme === "Purple"
              ? "#EA047E"
              :  "#377D71",}]}>
                  {match.HomeTeamScore}
                </Text>
                <Text style={styles.eachMatchTeamDateScore}>-</Text>
                <Text style={[styles.eachMatchTeamTimeScore, {color: currentTheme === "Red"
              ? "#CF0A0A"
              : currentTheme === "Pink"
              ? "#EA047E"
              : currentTheme === "Purple"
              ? "#EA047E"
              :  "#377D71",}]}>
                  {match.AwayTeamScore}
                </Text>
              </View>
            ) : (
              <>
                <Text style={[styles.eachMatchTeamTime, {color:
                     currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#377D71",
                
                }]}>{match.Matchtime}</Text>
                <Text style={styles.eachMatchTeamDate}>{match.MatchDate}</Text>
              </>
            )}
          </View>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-02.png")}
              resizeMode="contain"
            style={{height: 40, width: 40 }}
            />

            <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });
  const Engine30list = MatchsFromDB.map((match, index) => {
    if (match.Competition === "Engine 3.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("MatchResult", {
              matchId: match.id,
            })
          }
          style={styles.eachMatch}
        >
          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
            style={{height: 40, width: 40 }}
            />
          </View>
          <View style={styles.eachMatchTime}>
            {match.MatchActive ? (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.eachMatchTeamTimeScore,
                    {
                      color:
                        currentTheme === "Red"
                          ? "#CF0A0A"
                          : currentTheme === "Pink"
                          ? "#EA047E"
                          : currentTheme === "Purple"
                          ? "#EA047E"
                          : "#377D71",
                    },
                  ]}
                >
                  {match.HomeTeamScore}
                </Text>
                <Text style={styles.eachMatchTeamDateScore}>-</Text>
                <Text
                  style={[
                    styles.eachMatchTeamTimeScore,
                    {
                      color:
                        currentTheme === "Red"
                          ? "#CF0A0A"
                          : currentTheme === "Pink"
                          ? "#EA047E"
                          : currentTheme === "Purple"
                          ? "#EA047E"
                          : "#377D71",
                    },
                  ]}
                >
                  {match.AwayTeamScore}
                </Text>
              </View>
            ) : (
              <>
                <Text
                  style={[
                    styles.eachMatchTeamTime,
                    {
                      color:
                        currentTheme === "Red"
                          ? "#CF0A0A"
                          : currentTheme === "Pink"
                          ? "#EA047E"
                          : currentTheme === "Purple"
                          ? "#EA047E"
                          : "#377D71",
                    },
                  ]}
                >
                  {match.Matchtime}
                </Text>
                <Text style={styles.eachMatchTeamDate}>{match.MatchDate}</Text>
              </>
            )}
          </View>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-02.png")}
              resizeMode="contain"
            style={{height: 40, width: 40 }}
            />

            <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getMatchsFromDB();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    
      <Header navigation={navigation} />

      <Nav />

      {loader ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#377D71"]}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.dashboardTitle}>Match</Text>

            {competition === 4 ? Engine40list : Engine30list}
          </View>
        </ScrollView>
      )}
 
    </SafeAreaView>
  );
};

export default Match;



import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
  View,
} from "react-native";
import React, { useEffect } from "react";

import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";
import { useState } from "react";

import Header from "../Components/Others/Header";
import Nav from "../Components/Others/Nav";
import Loader from "../Components/Others/Loader";

const Home = ({ navigation }) => {
  const {
    MatchsFromDB,
    getMatchsFromDB,
    competition,
    TopPicksDB,
    competitionType,
    getTopPick,
    loader,
    currentTheme,
  } = useGlobalContext();

  const Engine40list = MatchsFromDB.map((match, index) => {
    if (match.Competition === competitionType && !match.Matchplayed) {
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
                <Text style={[styles.eachMatchTeamTime , {color: currentTheme === "Red"
              ? "#CF0A0A"
              : currentTheme === "Pink"
              ? "#EA047E"
              : currentTheme === "Purple"
              ? "#EA047E"
              :  "#377D71",}]}>{match.Matchtime}</Text>
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
    if (match.Competition === competitionType && !match.Matchplayed) {
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
                <Text style={[styles.eachMatchTeamTime , {color: currentTheme === "Red"
              ? "#CF0A0A"
              : currentTheme === "Pink"
              ? "#EA047E"
              : currentTheme === "Purple"
              ? "#EA047E"
              :  "#377D71",}]}>{match.Matchtime}</Text>
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

  // Top Pick
  const [TopPickState, TopPickStateF] = useState([]);

  const getTopPickData = () => {
    const data = TopPicksDB.filter(
      (top) => top.Competition === competitionType
    );
    TopPickStateF(data);
  };

  useEffect(() => {
    getTopPickData();
  }, [TopPicksDB, competitionType]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTopPick();
    getTopPickData();
    getMatchsFromDB();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function Screen_A() {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />

        <Nav />
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
          {loader ? (
            <Loader />
          ) : (
            <>
              <View style={styles.dashboard}>
                <Text style={styles.dashboardTitle}>Top Pick</Text>

                {TopPickState.map((tp, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dashboardBox,
                      {
                        backgroundColor:
                        currentTheme === "Pink"
                            ? "#496EEC"
                            : currentTheme === "Purple"
                            ? "rgb(85, 3, 85)"
                            : "black",
                      },
                    ]}
                  >
                    <Text style={styles.competitionName}>{tp.Competition}</Text>
                    <Text style={styles.matchDay}>
                      Matchday {tp.MatchSelect.MatchDay}
                    </Text>

                    <View style={styles.scoreBoard}>
                      <View style={styles.teamBoard}>
                        <Image
                          source={require("../../../assets/logo-01.png")}
                          resizeMode="contain"
                          style={{ height: 90, width: 90 }}
                        />

                        <Text style={styles.teamTxt}>
                          {tp.MatchSelect.HomeTeam}
                        </Text>
                      </View>
                      <View style={styles.score}>
                        {tp.MatchSelect.MatchActive ? (
                          <>
                            <Text style={styles.scoreTxt}>
                              {tp.MatchSelect.HomeTeamScore}
                            </Text>
                            <Text style={styles.scoreTxt}>:</Text>
                            <Text style={styles.scoreTxt}>
                              {tp.MatchSelect.AwayTeamScore}
                            </Text>
                          </>
                        ) : (
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              {tp.MatchSelect.Matchtime}
                            </Text>
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: 15,
                              }}
                            >
                              {"vs"}
                            </Text>
                            <Text style={styles.eachMatchTeamDate}>
                              {tp.MatchSelect.MatchDate}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.teamBoard}>
                        <Image
                          source={require("../../../assets/logo-02.png")}
                          resizeMode="contain"
                          style={{ height: 90, width: 90 }}
                        />

                        <Text style={styles.teamTxt}>
                          {tp.MatchSelect.AwayTeam}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View>
                <Text style={styles.dashboardTitle}>Match</Text>

                {competition === 4 ? Engine40list : Engine30list}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <Screen_A />;
};

export default Home;

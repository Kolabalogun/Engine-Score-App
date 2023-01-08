import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Others/Loader";
import Header from "../Components/Others/Header";

const initialState = {
  Competition: "",

  MatchDay: "",
  HomeTeam: "",
  HomeTeamFormation: "",
  MatchDate: "",
  AwayTeam: "",
  AwayTeamFormation: "",
  Matchtime: "",
  HomeTeamScore: 0,
  AwayTeamScore: 0,
  MatchTimeline: [],
  MatchActive: false,
};
const MatchResult = ({ route, navigation }) => {
  const {
    TeamsFromDB,
    getTeamsFromDB,
    loader,
    currentTheme,
    currentAdmin,
    loaderF,
  } = useGlobalContext();

  const { matchId } = route.params;

  const [matchhInfo, matchhInfoF] = useState(initialState);

  useEffect(() => {
    matchId && getBlogDetail();
  }, [matchId]);

  const getBlogDetail = async () => {
    loaderF(true);
    const docRef = doc(db, "Matchs", matchId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      matchhInfoF({ ...snapshot.data() });
    }
    loaderF(false);
  };

  const {
    Competition,
    HomeTeam,
    HomeTeamFormation,
    MatchDate,
    AwayTeam,
    AwayTeamFormation,
    Matchtime,
    HomeTeamScore,
    AwayTeamScore,
    MatchTimeline,
    MatchActive,
    MatchDay,
  } = matchhInfo;

  const [HomeTeamData, HomeTeamDataF] = useState([]);
  const [AwayTeamData, AwayTeamDataF] = useState([]);

  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team) => team.Competition === Competition && team.TeamName === HomeTeam
    );

    HomeTeamDataF(data);
  }, [Competition, TeamsFromDB]);
  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team) => team.Competition === Competition && team.TeamName === AwayTeam
    );
    AwayTeamDataF(data);
  }, [Competition, TeamsFromDB]);

  const [activeMenu, activeMenuF] = useState("lineup");

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTeamsFromDB();
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //  list of formations

  const Home433 = require("../../../assets/formations/4-3-3home.png");
  const Home442 = require("../../../assets/formations/4-4-2home.png");
  const Home343 = require("../../../assets/formations/3-4-3home.png");
  const Home352 = require("../../../assets/formations/3-5-2home.png");
  const Home4231 = require("../../../assets/formations/4-3-2-1home.png");

  const Away433 = require("../../../assets/formations/4-3-3away.png");
  const Away442 = require("../../../assets/formations/4-4-2away.png");
  const Away343 = require("../../../assets/formations/3-4-3away.png");
  const Away352 = require("../../../assets/formations/3-5-2away.png");
  const Away4231 = require("../../../assets/formations/4-3-2-1away.png");

  const handleDeleteMatchSummary = async (id) => {
    const data = MatchTimeline?.filter((dad, index) => dad.dateId !== id);

    try {
      await updateDoc(doc(db, "Matchs", matchId), {
        ...matchhInfo,

        MatchTimeline: [...data],
      });
    } catch (error) {
      console.log(error, "line 219");
    }
    getBlogDetail();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#edeff2" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#377D71"]}
          onRefresh={onRefresh}
        />
      }
      ListHeaderComponent={Header}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.matchTopBar,
          {
            backgroundColor:
              currentTheme === "Red"
                ? "#CF0A0A"
                : currentTheme === "Pink"
                ? "#EA047E"
                : currentTheme === "Default"
                ? "#377D71"
                : "rgb(85, 3, 85)",
          },
        ]}
      >
        <View style={[styles.homeHeader, { backgroundColor: "none" }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "aliceblue",
              opacity: 1,
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../../../assets/ba.png")}
              resizeMode="cover"
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleDiv}>
            <Text
              style={[
                styles.headerTitle,
                {
                  fontSize: 13,
                  color: "white",
                },
              ]}
            >
              {Competition}
            </Text>
          </View>
          <TouchableOpacity style={{ borderRadius: 50 }}>
            <Image
              // source={require("../../../assets/refresh.png")}
              resizeMode="cover"
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.resultdashboard}>
            <View style={[styles.dashboardBox, { backgroundColor: "white" }]}>
              <Text style={[styles.competitionName, { color: "black" }]}>
                Maracana Field
              </Text>
              <Text style={styles.matchDay}>Matchday {MatchDay}</Text>

              <View style={styles.scoreBoard}>
                <View style={styles.teamBoard}>
                  <Image
                    source={require("../../../assets/logo-01.png")}
                    resizeMode="contain"
                    style={{ height: 90, width: 90 }}
                  />

                  <Text style={styles.resultTeamTxt}>{HomeTeam}</Text>
                </View>
                <View style={styles.score}>
                  {MatchActive ? (
                    <>
                      <Text style={[styles.scoreTxt, { color: "black" }]}>
                        {HomeTeamScore}
                      </Text>
                      <Text style={[styles.scoreTxt, { color: "black" }]}>
                        :
                      </Text>
                      <Text style={[styles.scoreTxt, { color: "black" }]}>
                        {AwayTeamScore}
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
                        style={[
                          styles.resulteachMatchTeamTime,
                          { color: "black" },
                        ]}
                      >
                        {Matchtime}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      >
                        {"vs"}
                      </Text>
                      <Text style={styles.eachMatchTeamDate}>{MatchDate}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.teamBoard}>
                  <Image
                    source={require("../../../assets/logo-02.png")}
                    resizeMode="contain"
                    style={{ height: 90, width: 90 }}
                  />

                  <Text style={styles.resultTeamTxt}>{AwayTeam}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.navMenu}>
            <TouchableOpacity
              onPress={() => {
                activeMenuF("lineup");
              }}
              style={{
                backgroundColor:
                  activeMenu === "lineup" && currentTheme === "Default"
                    ? "#377D71"
                    : activeMenu === "lineup" && currentTheme === "Red"
                    ? "#CF0A0A"
                    : activeMenu === "lineup" && currentTheme === "Pink"
                    ? "#EA047E"
                    : activeMenu === "lineup" && currentTheme === "Purple"
                    ? "#EA047E"
                    : "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 1,
                marginHorizontal: 20,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color:
                    activeMenu === "lineup" && currentTheme === "Default"
                      ? "#fff"
                      : activeMenu === "lineup" && currentTheme === "Pink"
                      ? "#fff"
                      : activeMenu === "lineup" && currentTheme === "Red"
                      ? "#fff"
                      : activeMenu === "lineup" && currentTheme === "Purple"
                      ? "#fff"
                      : activeMenu !== "lineup" && currentTheme === "Pink"
                      ? "#EA047E"
                      : activeMenu !== "lineup" && currentTheme === "Red"
                      ? "#CF0A0A"
                      : activeMenu !== "lineup" && currentTheme === "Purple"
                      ? "#EA047E"
                      : "#377D71",
                  fontWeight: "500",
                  fontsize: 12,
                }}
              >
                Line Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                activeMenuF("timeline");
              }}
              style={{
                backgroundColor:
                  activeMenu === "timeline" && currentTheme === "Default"
                    ? "#377D71"
                    : activeMenu === "timeline" && currentTheme === "Red"
                    ? "#CF0A0A"
                    : activeMenu === "timeline" && currentTheme === "Pink"
                    ? "#EA047E"
                    : activeMenu === "timeline" && currentTheme === "Purple"
                    ? "#EA047E"
                    : "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 1,
                marginHorizontal: 20,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color:
                    activeMenu === "timeline" && currentTheme === "Default"
                      ? "#fff"
                      : activeMenu === "timeline" && currentTheme === "Pink"
                      ? "#fff"
                      : activeMenu === "timeline" && currentTheme === "Red"
                      ? "#fff"
                      : activeMenu === "timeline" && currentTheme === "Purple"
                      ? "#fff"
                      : activeMenu !== "timeline" && currentTheme === "Pink"
                      ? "#EA047E"
                      : activeMenu !== "timeline" && currentTheme === "Red"
                      ? "#CF0A0A"
                      : activeMenu !== "timeline" && currentTheme === "Purple"
                      ? "#EA047E"
                      : "#377D71",
                  fontWeight: "500",
                  fontsize: 12,
                }}
              >
                Summary
              </Text>
            </TouchableOpacity>
          </View>

          {activeMenu === "lineup" ? (
            <View style={styles.formationSection}>
              <View style={styles.teams}>
                <View style={styles.team}>
                  <Image
                    source={require("../../../assets/logo-01.png")}
                    resizeMode="contain"
                    style={{ height: 35, width: 35 }}
                  />

                  <View style={styles.formation}>
                    <Text style={{ fontsize: 12 }}>{HomeTeam}</Text>
                    <Text style={{ color: "#aaa", fontSize: 12 }}>
                      {HomeTeamFormation}
                    </Text>
                  </View>
                </View>
                <View style={styles.team}>
                  <Image
                    source={require("../../../assets/logo-02.png")}
                    resizeMode="contain"
                    style={{ height: 30, width: 30 }}
                  />

                  <View style={styles.formation}>
                    <Text style={{ fontsize: 12 }}>{AwayTeam}</Text>
                    <Text style={{ color: "#aaa", fontSize: 12 }}>
                      {AwayTeamFormation}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", flex: 1 }}>
                <Image
                  source={
                    HomeTeamFormation === "4-3-3"
                      ? Home433
                      : HomeTeamFormation === "3-4-3"
                      ? Home343
                      : HomeTeamFormation === "3-5-2"
                      ? Home352
                      : Home4231
                  }
                  resizeMode="contain"
                  style={{ flex: 1, height: 300, width: "100%" }}
                />
                <Image
                  source={
                    AwayTeamFormation === "4-3-3"
                      ? Away433
                      : AwayTeamFormation === "3-4-3"
                      ? Away343
                      : AwayTeamFormation === "3-5-2"
                      ? Away352
                      : Away4231
                  }
                  resizeMode="contain"
                  style={{ flex: 1, height: 300, width: "100%" }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.formationSection}>
              {MatchTimeline?.slice(0)
                .reverse()
                .map((details, index) => {
                  if (
                    details.MatchBody !== null &&
                    details.MatchBody !== "" &&
                    details.MatchBody !==
                      "Match Starts in few Minutes. Who will win?"
                  ) {
                    return (
                      <View style={{ flexDirection: "column" }} key={index}>
                        <View style={styles.eachSummary}>
                          <View>
                            <Text
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#aaa",
                                fontsize: 12,
                              }}
                            >
                              {details.MatchBody}
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "500",
                                paddingTop: 10,
                              }}
                            >
                              {details.MatchNote}
                            </Text>
                          </View>

                          <View>
                            <Image
                              source={
                                details.MatchBody === "Yellow Card"
                                  ? require("../../../assets/red.png")
                                  : details.MatchBody === "Goal"
                                  ? require("../../../assets/ball.png")
                                  : details.MatchBody === "Red Card"
                                  ? require("../../../assets/yellow.png")
                                  : details.MatchBody ===
                                    "Match Starts in few Minutes. Who will win?"
                                  ? require("../../../assets/load.png")
                                  : details.MatchBody === "Match Started"
                                  ? require("../../../assets/matchstarts.png")
                                  : require("../../../assets/ft.png")
                              }
                              resizeMode="contain"
                              style={{ height: 35 }}
                            />
                          </View>
                        </View>
                        {currentAdmin && (
                          <TouchableOpacity
                            onPress={() =>
                              handleDeleteMatchSummary(details.dateId)
                            }
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: 5,
                                marginBottom: 10,
                                paddingVertical: 5,
                              }}
                            >
                              Delete
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  }
                })}
            </View>
          )}

          <View style={styles.formationSection}>
            <Text style={styles.manager}>Manager</Text>

            <View style={styles.managerSplit}>
              {HomeTeamData.map((team, index) => (
                <Text
                  style={{
                    fontsize: 12,
                  }}
                  key={index}
                >
                  {team.TeamManager}
                </Text>
              ))}
              {AwayTeamData.map((team, index) => (
                <Text
                  style={{
                    fontsize: 12,
                  }}
                  key={index}
                >
                  {team.TeamManager}
                </Text>
              ))}
            </View>

            <Text style={styles.manager}>Lineups</Text>

            <View style={styles.lineups}>
              {HomeTeamData?.map((team, index) => (
                <View key={index}>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.goalkepper}
                  </Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender4}</Text>

                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders1}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders2}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders3}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders4}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders5}
                  </Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers4}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers5}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs4}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs5}</Text>
                </View>
              ))}

              {AwayTeamData?.map((team, index) => (
                <View key={index}>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.goalkepper}
                  </Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.defender4}</Text>

                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders1}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders2}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders3}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders4}
                  </Text>
                  <Text style={{ fontsize: 12 }}>
                    {team.Players.midfielders5}
                  </Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers4}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.attakers5}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs1}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs2}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs3}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs4}</Text>
                  <Text style={{ fontsize: 12 }}>{team.Players.benchs5}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default MatchResult;

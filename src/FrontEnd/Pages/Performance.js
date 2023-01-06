import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";
import Header from "../Components/Others/Header";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Others/Loader";
import Nav from "../Components/Others/Nav";

const Performance = ({ navigation }) => {
  const {
    competitionType,
    competitionTypeF,
    competition,
    PlayerGoalAssistData,
    loader,
    loaderF,
  } = useGlobalContext();

  const [PlayerDataFromDB, PlayerDataFromDBF] = useState(PlayerGoalAssistData);

  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
    loaderF(true);
    const docRef = doc(db, "Player Data", "WmVhSufxYzBSkL8HsqkF");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      PlayerDataFromDBF([...snapshot.data().playerDatas]);
    }
    loaderF(false);
  };

  const goalsRanking = PlayerDataFromDB;
  goalsRanking.sort(function (a, b) {
    return b.Goals - a.Goals;
  });

  const GoalsGroup = goalsRanking.slice(0, 5).map((goal, index) => {
    if (goal.Competition === competitionType) {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.eachMatch,
            { paddingHorizontal: 10, paddingVertical: 5, marginBottom: 0 },
          ]}
        >
          <View style={styles.eachPerformancePlayer}>
            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 40, width: 40 }}
            />
            <View>
              <Text style={styles.eachPerformanceScore}>{goal.PlayerName}</Text>
              <Text style={{ color: "#aaa" }}>{goal.TeamNameSelect}</Text>
            </View>
          </View>

          <View style={styles.eachPerformancePlayer}>
            <Text style={styles.eachPerformanceScore}>{goal.Goals}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  const AssistsRanking = PlayerDataFromDB;
  AssistsRanking.sort(function (a, b) {
    return b.Assists - a.Assists;
  });

  const AssistsGroup = AssistsRanking.slice(0, 6).map((goal, index) => {
    if (goal.Competition === competitionType) {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.eachMatch,
            { paddingHorizontal: 10, paddingVertical: 5, marginBottom: 0 },
          ]}
        >
          <View style={styles.eachPerformancePlayer}>
            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 40, width: 40 }}
            />
            <View>
              <Text style={styles.eachPerformanceScore}>{goal.PlayerName}</Text>
              <Text style={{ color: "#aaa" }}>{goal.TeamNameSelect}</Text>
            </View>
          </View>

          <View style={styles.eachPerformancePlayer}>
            <Text style={styles.eachPerformanceScore}>{goal.Assists}</Text>
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
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#377D71"]}
              onRefresh={onRefresh}
            />
          }
        >
          <Nav />

          {loader ? (
            <Loader />
          ) : (
            <>
              <View style={styles.group}>
                <Text style={styles.groupName}>Goals</Text>
                <View style={styles.performanceGroup}>{GoalsGroup}</View>
              </View>
              <View style={styles.group}>
                <Text style={styles.groupName}>Assists</Text>
                <View style={styles.performanceGroup}>{AssistsGroup}</View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Performance;

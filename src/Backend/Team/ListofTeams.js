import {
  Image,
  SafeAreaView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Loader from "../../FrontEnd/Components/Others/Loader";
import Header from "../../FrontEnd/Components/Others/Header";
import Nav from "../../FrontEnd/Components/Others/Nav";
import { styles } from "../../Function/styles";
const ListofTeams = ({ navigation }) => {
  const {
    competition,

    getTeamsFromDB,

    loader,

    TeamsFromDB,
    handleDeleteTeam,
  } = useGlobalContext();

  function navigateToAddNewTeam(params) {
    navigation.navigate("Add Teams");
  }

  const Engine40list = TeamsFromDB.map((teams, index) => {
    if (teams.Competition === "Engine 4.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("EditTeams", {
              teamId: teams.id,
            })
          }
          style={[styles.eachMatch, { paddingHorizontal: 10 }]}
        >
          <View style={[styles.eachMatchTeam, { flex: 0 }]}>
            <Text style={[styles.eachMatchTeamTxt, { fontSize: 15 }]}>
              {teams.TeamName}
            </Text>
          </View>

          <View style={[styles.eachMatchTeam, { flex: 0 }]}>
            <TouchableOpacity
              onPress={() => handleDeleteTeam(teams.id)}
              style={{ backgroundColor: "red", borderRadius: 10 }}
            >
              <Text style={{ color: "white", padding: 7 }}>Delete Team</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  });
  const Engine30list = TeamsFromDB.map((teams, index) => {
    if (teams.Competition === "Engine 3.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("EditTeams", {
              teamId: teams.id,
            })
          }
          style={[styles.eachMatch, { paddingHorizontal: 10 }]}
        >
    <View style={[styles.eachMatchTeam, { flex: 0 }]}>
            <Text style={[styles.eachMatchTeamTxt, { fontSize: 15 }]}>
              {teams.TeamName}
            </Text>
          </View>

    <View style={[styles.eachMatchTeam, { flex: 0 }]}>
            <TouchableOpacity
              onPress={() => handleDeleteTeam(teams.id)}
              style={{ backgroundColor: "red", borderRadius: 10 }}
            >
              <Text style={{ color: "white", padding: 7 }}>Delete Team</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  });

  function Headers({ functions, imgtype }) {
    return (
      <View style={styles.homeHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.profilePic}
        >
          <Image
            source={require("../../../assets/home.png")}
            resizeMode="cover"
            style={{ height: 28, width: 28 }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
          <Text style={styles.headerTitle}>
            Engine <Text style={styles.headerTitleScore}>Scores</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={functions} style={styles.profilePic}>
          <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTeamsFromDB();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        functions={() => navigation.navigate("Home")}
        imgtype={require("../../../assets/home.png")}
        functions2={navigateToAddNewTeam}
        imgtype2={require("../../../assets/add.png")}
      />

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
          {competition === 4 ? Engine40list : Engine30list}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ListofTeams;

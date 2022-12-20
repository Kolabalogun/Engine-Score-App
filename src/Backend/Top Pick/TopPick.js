import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Function/Context";
import SelectDropdown from "react-native-select-dropdown";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";
import Button from "../../FrontEnd/Components/Others/Button";
import Header from "../../FrontEnd/Components/Others/Header";
import Nav from "../../FrontEnd/Components/Others/Nav";

import { styles } from "../../Function/styles";

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
  MatchTimeline: "",
  MatchActive: false,
};

const TopPick = ({ navigation }) => {
  const {
    competitionType,
    currentTheme,
    MatchsFromDB,
    notification,
    notificationF,
    loaderF,
    loader,
  } = useGlobalContext();

  const [MatchData, MatchDataF] = useState([]);

  const [MatchSelect, MatchSelectF] = useState(initialState);

  const {
    Competition,

    HomeTeam,

    MatchDate,
    AwayTeam,

    Matchtime,
    HomeTeamScore,
    AwayTeamScore,

    MatchActive,
    MatchDay,
  } = MatchSelect;

  useEffect(() => {
    const data = MatchsFromDB.filter(
      (match) => match.Competition === competitionType && !match.Matchplayed
    );

    MatchDataF(data);
  }, [competitionType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Competition === "Engine 4.0") {
      if (MatchSelect) {
        loaderF(true);
        try {
          await updateDoc(doc(db, "Top Pick", "FReTe1WrlShEj1CQmlTR"), {
            Competition: Competition,
            MatchSelect: MatchSelect,
          });
          loaderF(false);
          notificationF("Team Successfully Added");

          navigation.navigate("Home");
          loaderF(false);
        } catch (error) {
          notificationF(error);
        }
      } else {
        return notificationF("All fields must be filled");
      }
    } else {
      if (MatchSelect) {
        loaderF(true);
        try {
          await updateDoc(doc(db, "Top Pick", "ZBKXoFBPpW6BOxIhyRBr"), {
            Competition: Competition,
            MatchSelect: MatchSelect,
          });

          notificationF("Team Successfully Added");

          navigation.navigate("Home");
          loaderF(false);
          loaderF(false);
        } catch (error) {
          notificationF(error);
        }
      } else {
        return notificationF("All fields must be filled");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        functions={() => navigation.navigate("Home")}
        imgtype={require("../../../assets/home.png")}
      />

      <Nav />

      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Competition
            </Text>

            <TextInput
              value={competitionType}
              readonly={true}
              placeholder="Competition"
              style={styles.InputTextArea}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Select Match
            </Text>

            <SelectDropdown
              data={MatchData}
              defaultButtonText={"Select Match"}
              buttonStyle={styles.dropdownStyle}
              buttonTextStyle={styles.dropdownStyleTxt}
              onSelect={(selectedItem, index) => {
                MatchSelectF(selectedItem);
              }}
            />
          </View>
          <View
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
            <Text style={styles.competitionName}>Maracana Field</Text>
            <Text style={styles.matchDay}>Matchday {MatchDay}</Text>

            <View style={styles.scoreBoard}>
              <View style={styles.teamBoard}>
                <Image
                  source={require("../../../assets/logo-01.png")}
                  resizeMode="contain"
                  style={{ height: 90, width: 90 }}
                />

                <Text style={styles.teamTxt}>{HomeTeam}</Text>
              </View>
              <View style={styles.score}>
                {MatchActive ? (
                  <>
                    <Text style={styles.scoreTxt}>{HomeTeamScore}</Text>
                    <Text style={styles.scoreTxt}>:</Text>
                    <Text style={styles.scoreTxt}>{AwayTeamScore}</Text>
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
                    <Text style={styles.eachMatchTeamTime}>{Matchtime}</Text>
                    <Text
                      style={{
                        color: "white",
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

                <Text style={styles.teamTxt}>{AwayTeam}</Text>
              </View>
            </View>
          </View>
          <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
            {notification}
          </Text>

          <Button handleSubmit={handleSubmit} />
        </>
      )}
    </View>
  );
};

export default TopPick;




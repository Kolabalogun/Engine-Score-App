import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { useGlobalContext } from "../../Function/Context";

import { db } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../../FrontEnd/Components/Others/Header";
import Button from "../../FrontEnd/Components/Others/Button";
import { styles } from "../../Function/styles";
const CreateMatch = ({ navigation }) => {
  const {
    TeamsFromDB,
    notification,
    notificationF,
    currentUser,
    loader,
    loaderF,
  } = useGlobalContext();

  const [Competition, CompetitionF] = useState("");
  const [TeamData, TeamDataF] = useState([]);

  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team, index) => team.Competition === Competition
    );

    TeamDataF(data.map((d) => d.TeamName));
  }, [Competition, TeamsFromDB]);

  const competitionData = ["Engine 4.0", "Engine 3.0"];
  const formationData = [ "4-3-3", "4-2-3-1", "3-4-3", "3-5-2"];

  const [HomeTeam, HomeTeamF] = useState("");
  const [HomeTeamFormation, HomeTeamFormationF] = useState("");

  const [MatchDate, MatchDateF] = useState("");
  const [MatchDay, MatchDayF] = useState("");

  const [AwayTeam, AwayTeamF] = useState("");
  const [AwayTeamFormation, AwayTeamFormationF] = useState("");
  const [Matchtime, MatchtimeF] = useState("");
  const [Matchplayed, MatchplayedF] = useState(false);

  const [dateId, setdateId] = useState("");

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();
    const realTime = new Date().toLocaleTimeString();
    const realDate = new Date().toDateString();

    // HomeTeamF(`${realDate} ${realTime}`);

    setdateId(dateId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (MatchDate.length < 6 || Matchtime.length < 5) {

notificationF('Invalid Date or Time Format')

      
    }

 else   if (HomeTeam === AwayTeam) {
     return notificationF("Same Team can't be Matched"); 
    } else{
      if (
        HomeTeam &&
        AwayTeam &&
        Competition &&
        HomeTeamFormation &&
        MatchDate &&
        Matchtime &&
        AwayTeamFormation &&
        MatchDay
      ) {
        // if we adding new team
        loaderF(true);

        try {
          await addDoc(collection(db, "Matchs"), {
            Competition: Competition,
            HomeTeam: HomeTeam,
            MatchDate: MatchDate,
            HomeTeamFormation: HomeTeamFormation,
            AwayTeamFormation: AwayTeamFormation,
            HomeTeamScore: 0,
            AwayTeamScore: 0,
            MatchTimeline: [],
            MatchActive: false,

            AwayTeam: AwayTeam,
            Matchtime: Matchtime,

            MatchDay: MatchDay,

            Matchplayed: Matchplayed,
            dateId: dateId,
          });

          notificationF("Team Successfully Added");
          HomeTeamF("");
          AwayTeamF("");
          navigation.navigate("MatchList");
          loaderF(false);
        } catch (error) {
          // console.log(error);
          notificationF(error);
        }
      } else {
        return notificationF("All fields must be filled");
      }
    }
  };

  function navigateTogoBack(params) {
    navigation.goBack();
  }


  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Header
              functions={navigateTogoBack}
              imgtype={require("../../../assets/ba.png")}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Create Match</Text>
                <Text style={styles.capText}>
                  Please input the Match Details.
                </Text>
              </View>

              <KeyboardAvoidingView style={styles.Inputs}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Competition
                  </Text>

                  <SelectDropdown
                    data={competitionData}
                    defaultButtonText="Select Competition"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      CompetitionF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Home Team
                  </Text>

                  <SelectDropdown
                    data={TeamData}
                    defaultButtonText="Please select Home Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      HomeTeamF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Away Team
                  </Text>

                  <SelectDropdown
                    data={TeamData}
                    defaultButtonText="Please select Away Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      AwayTeamF(selectedItem);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Home Team Formation
                  </Text>

                  <SelectDropdown
                    data={formationData}
                    defaultButtonText="Select Home Team Formation"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      HomeTeamFormationF(selectedItem);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Away Team Formation
                  </Text>

                  <SelectDropdown
                    data={formationData}
                    defaultButtonText="Select Away Team Formation"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      AwayTeamFormationF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Matchday
                  </Text>

                  <TextInput
                    value={MatchDay}
                    name="goalkepper"
                    onChangeText={(e) => MatchDayF(e)}
                    placeholder="MatchDay"
                    maxLength={2}
                    style={styles.InputTextArea}
                    keyboardType="decimal-pad"
                  />
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, marginTop: 10 }}>
                    <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                      Date
                    </Text>

                    <TextInput
                      value={MatchDate}
                      name="goalkepper"
                      onChangeText={(e) => MatchDateF(e)}
                      placeholder="Enter Date e.g (20 Jan)"
                      maxLength={6}
                      style={styles.InputTextArea}
                    />
                  </View>

                  <View style={{ flex: 1, marginTop: 10 }}>
                    <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                      Time
                    </Text>

                    <TextInput
                      value={Matchtime}
                      name="goalkepper"
                      onChangeText={(e) => MatchtimeF(e)}
                      placeholder="Enter Time e.g (03:00)"
                      maxLength={5}
                      style={styles.InputTextArea}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
          <Button handleSubmit={handleSubmit}/>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateMatch;



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
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useGlobalContext } from "../../Function/Context";
import { db } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "../../Function/styles";
import Button from "../../FrontEnd/Components/Others/Button";
import Header from "../../FrontEnd/Components/Others/Header";

const Players = ({ navigation }) => {
  const {
    TeamsFromDB,
    notification,
    notificationF,
    loader,
    loaderF,
  } = useGlobalContext();

  const [Competition, CompetitionF] = useState("");

  const [TeamData, TeamDataF] = useState([]);

  const [TeamNameFilter, TeamNameFilterF] = useState([]);
  const [TeamNameSelect, TeamNameSelectF] = useState(null);



  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team, index) => team.Competition === Competition
    );

    TeamNameFilterF(data.map((d) => d.TeamName));
    TeamDataF(data);
  }, [Competition, TeamsFromDB]);

  const [PlayerData, PlayerDataF] = useState([]);

  useEffect(() => {
    const data = TeamData?.filter(
      (team, index) => team.TeamName === TeamNameSelect
    );

    if (TeamData.length > 0) {
      const propertyNames = data[0].Players;

      const dd = Object.values(propertyNames);

      PlayerDataF(dd);
    }
  }, [ TeamNameSelect]);

  const competitionData = ["Engine 4.0", "Engine 3.0"];
  const typee = ["Goal", "Assist"];

 

  const [Goals, GoalsF] = useState("");

  const [Assists, AssistsF] = useState("");

  const [PlayerName, PlayerNameF] = useState("");
  const [GoalsSelect, GoalsSelectF] = useState("");




    const [PlayerDataFromDB, PlayerDataFromDBF] = useState([]);


      useEffect(() => {
        getBlogDetail();
      }, [Competition, TeamNameSelect, PlayerName, PlayerData, TeamData]);

      const getBlogDetail = async () => {
        const docRef = doc(db, "Player Data", 'WmVhSufxYzBSkL8HsqkF');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          PlayerDataFromDBF([ ...snapshot.data().playerDatas ]);
      
        }
      };

const [FilteredPlayerDataFromDB, FilteredPlayerDataFromDBF] = useState([]);

       useEffect(() => {
        if (
          PlayerDataFromDB.length > 0 &&
          TeamNameSelect &&
          PlayerName &&
          Competition
        ) {
          const data = PlayerDataFromDB.filter(
            (player) =>
              !(player.Competition === Competition &&
                player.PlayerName === PlayerName &&
              player.TeamNameSelect === TeamNameSelect)
          );

          if (data.length > 0) {
            
          FilteredPlayerDataFromDBF(data);
          }

        }

        GoalsF(FilteredPlayerDataFromDBForGoalData.Goals)
        AssistsF(FilteredPlayerDataFromDBForGoalData.Assists)
       

       }, [PlayerDataFromDB, Competition, TeamNameSelect, PlayerName]);



       const [
         FilteredPlayerDataFromDBForGoalData,
         FilteredPlayerDataFromDBForGoalDataF,
       ] = useState({
         Goals: 0,
         Assists: 0,
       });
console.log(FilteredPlayerDataFromDBForGoalData);

   useEffect(() => {
     if (PlayerDataFromDB.length > 0 && TeamNameSelect && PlayerName && Competition) {
       const data = PlayerDataFromDB.filter(
         (player) =>
           (player.Competition === Competition &&
             player.PlayerName === PlayerName &&
           player.TeamNameSelect === TeamNameSelect)
       );

       if (data.length > 0) {
        
       FilteredPlayerDataFromDBForGoalDataF(data[0]);
       } else {
        FilteredPlayerDataFromDBForGoalDataF({
         Goals: 0,
         Assists: 0,
       });
       }

     
     GoalsF(FilteredPlayerDataFromDBForGoalData.Goals);
     AssistsF(FilteredPlayerDataFromDBForGoalData.Assists);
     }

   }, [PlayerDataFromDB, Competition, TeamNameSelect, PlayerName]);





  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      TeamNameSelect &&
      PlayerName &&
      Competition &&
      Goals &&
     
      Assists
    ) {
      // if we adding new team
      loaderF(true);
      try {
        await updateDoc(doc(db, "Player Data", "WmVhSufxYzBSkL8HsqkF"), {
          playerDatas: [
            ...FilteredPlayerDataFromDB,
            {TeamNameSelect ,
              PlayerName ,
              Competition ,
              Goals ,
             
              Assists,}
          ],
        });
          
              GoalsF(0)
              AssistsF(0)

              navigation.navigate('ListofPlayers')
              loaderF(false);

      } catch (error) {
        console.log(error, "line 219");
      }
    } else {
      return notificationF("All fields must be filled");
    }
  };

 



  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Header
              functions={() => navigation.goBack()}
              imgtype={require("../../../assets/ba.png")}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Player Data</Text>
                <Text style={styles.capText}>Add Goal Scorer or Assists</Text>
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
                    Player's Team
                  </Text>

                  <SelectDropdown
                    data={TeamNameFilter}
                    defaultButtonText="Please select Player's Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      TeamNameSelectF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Player's Name
                  </Text>

                  <SelectDropdown
                    data={PlayerData}
                    defaultButtonText="Please select Player's Name"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      PlayerNameF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Number of Goals
                  </Text>

                  <TextInput
                    value={Goals}
                    name="goalkepper"
                    onChangeText={(e) => GoalsF(e)}
                    placeholder="Number of Goals"
                    maxLength={2}
                    keyboardType="decimal-pad"
                    style={styles.InputTextArea}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Assist
                  </Text>

                  <TextInput
                    value={Assists}
                    name="goalkepper"
                    onChangeText={(e) => AssistsF(e)}
                    placeholder="Number of Assist"
                    maxLength={2}
                    keyboardType="decimal-pad"
                    style={styles.InputTextArea}
                  />
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
              <Button handleSubmit={handleSubmit} />
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Players;

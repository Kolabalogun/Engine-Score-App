import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useGlobalContext } from "../../Function/Context";

import { db } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../../FrontEnd/Components/Others/Header";
import { styles } from "../../Function/styles";
import Button from "../../FrontEnd/Components/Others/Button";

const AddTeams = ({ navigation }) => {
  const {
    competition,
    competitionF,
    notification,
    notificationF,
    currentUser,
    loader,
    loaderF,
    TeamsFromDB,
  } = useGlobalContext();
  const [Competition, CompetitionF] = useState("");

  const competitionData = ["Engine 4.0", "Engine 3.0"];
  const GroupData = [1, 2];
  const formationData = [ "4-3-3", "4-2-3-1", "3-4-3", "3-5-2"];

  const [TeamName, TeamNameF] = useState("");

  const [Players, PlayersF] = useState({
    goalkepper: "",
    defender1: "",
    defender2: "",
    defender3: "",
    defender4: "",
    defender5: "",
    midfielders1: "",
    midfielders2: "",
    midfielders3: "",
    midfielders4: "",
    midfielders5: "",
    attakers1: "",
    attakers2: "",
    attakers3: "",
    attakers4: "",
    attakers5: "",
    benchs1: "",
    benchs2: "",
    benchs3: "",
    benchs4: "",
    benchs5: "",
  });

  const [TeamGroup, TeamGroupF] = useState("");
  const [TeamManager, TeamManagerF] = useState("");
  const [Formation, FormationF] = useState("");
  const [selectedImage, selectedImageF] = useState(null);

  const [dateId, setdateId] = useState("");

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();
    const realTime = new Date().toLocaleTimeString();
    const realDate = new Date().toDateString();

    setdateId(dateId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Competition && TeamName && TeamManager && TeamGroup) {
      // if we adding new team
      loaderF(true);

      try {
        await addDoc(collection(db, "Teams"), {
          Competition: Competition,
          TeamName: TeamName,
          Players: Players,
       
          TeamFormation: Formation,
          TeamGroup: TeamGroup,

          TeamManager: TeamManager,
      
          stat: {
            mp: "0",
            wins: "0",
            loss: "0",
            draw: "0",
            matchplayed: "0",
            gd: "0",
            points: "0",
          },
          dateId: dateId,
        });

        notificationF("Team Successfully Added");
        TeamNameF("");
        TeamManagerF("");
        navigation.navigate("Team List");
        loaderF(false);
      } catch (error) {
        // console.log(error);
        notificationF(error);
      }
    } else {
      return notificationF("All fields must be filled");
    }
  };

  function navigateToListofTeam(params) {
    navigation.navigate("Team List");
  }

  function functions(params) {
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
              functions={functions}
              imgtype={require("../../../assets/ba.png")}
              functions2={navigateToListofTeam}
              imgtype2={require("../../../assets/list.png")}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Add New Team</Text>
                <Text style={styles.capText}>
                  Please input the details of the Team.
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
                    Team Name
                  </Text>
                  <TextInput
                    value={TeamName}
                    onChangeText={(e) => TeamNameF(e)}
                    placeholder="Enter the Team Name"
                    style={styles.InputTextArea}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Manager
                  </Text>
                  <TextInput
                    value={TeamManager}
                    onChangeText={(e) => TeamManagerF(e)}
                    placeholder="Enter the Manager of the Team"
                    style={styles.InputTextArea}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Team Formation
                  </Text>

                  <SelectDropdown
                    data={formationData}
                    defaultButtonText="Select Team Formation"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      FormationF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Team Group
                  </Text>

                  <SelectDropdown
                    data={GroupData}
                    defaultButtonText="Select Team Group"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      TeamGroupF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Players
                  </Text>

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    GoalKeeper
                  </Text>

                  <TextInput
                    value={Players.goalkepper}
                    name="goalkepper"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, goalkepper: e };
                      })
                    }
                    placeholder="Please enter GoalKeeper's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Defender
                  </Text>

                  <TextInput
                    value={Players.defender1}
                    name="defender1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, defender1: e };
                      })
                    }
                    placeholder="Please enter defender1's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Defender
                  </Text>

                  <TextInput
                    value={Players.defender2}
                    name="defender2"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, defender2: e };
                      })
                    }
                    placeholder="Please enter defender2's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Defender
                  </Text>

                  <TextInput
                    value={Players.defender3}
                    name="defender3"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, defender3: e };
                      })
                    }
                    placeholder="Please enter defender3's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Defender
                  </Text>

                  <TextInput
                    value={Players.defender4}
                    name="defender4"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, defender4: e };
                      })
                    }
                    placeholder="Please enter defender4's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Defender
                  </Text>

                  <TextInput
                    value={Players.defender5}
                    name="defender5"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, defender5: e };
                      })
                    }
                    placeholder="Please enter defender5's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Midfielders
                  </Text>

                  <TextInput
                    value={Players.midfielders1}
                    name="midfielders1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, midfielders1: e };
                      })
                    }
                    placeholder="Please enter midfielders1's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Midfielders
                  </Text>

                  <TextInput
                    value={Players.midfielders2}
                    name="midfielders1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, midfielders2: e };
                      })
                    }
                    placeholder="Please enter midfielders2's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Midfielders
                  </Text>

                  <TextInput
                    value={Players.midfielders3}
                    name="midfielders3"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, midfielders3: e };
                      })
                    }
                    placeholder="Please enter midfielders3's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Midfielders
                  </Text>

                  <TextInput
                    value={Players.midfielders4}
                    name="midfielders4"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, midfielders4: e };
                      })
                    }
                    placeholder="Please enter midfielders4's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Midfielders
                  </Text>

                  <TextInput
                    value={Players.midfielders5}
                    name="midfielders5"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, midfielders5: e };
                      })
                    }
                    placeholder="Please enter midfielders5's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    attakers
                  </Text>

                  <TextInput
                    value={Players.attakers1}
                    name="attakers1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, attakers1: e };
                      })
                    }
                    placeholder="Please enter attakers1's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    attakers
                  </Text>

                  <TextInput
                    value={Players.attakers2}
                    name="attakers1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, attakers2: e };
                      })
                    }
                    placeholder="Please enter attakers2's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    attakers
                  </Text>

                  <TextInput
                    value={Players.attakers3}
                    name="attakers3"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, attakers3: e };
                      })
                    }
                    placeholder="Please enter attakers3's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    attakers
                  </Text>

                  <TextInput
                    value={Players.attakers4}
                    name="attakers4"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, attakers4: e };
                      })
                    }
                    placeholder="Please enter attakers4's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    attakers
                  </Text>

                  <TextInput
                    value={Players.attakers5}
                    name="attakers5"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, attakers5: e };
                      })
                    }
                    placeholder="Please enter attakers5's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    benchs
                  </Text>

                  <TextInput
                    value={Players.benchs1}
                    name="benchs1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, benchs1: e };
                      })
                    }
                    placeholder="Please enter benchs1's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    benchs
                  </Text>

                  <TextInput
                    value={Players.benchs2}
                    name="benchs1"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, benchs2: e };
                      })
                    }
                    placeholder="Please enter benchs2's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    benchs
                  </Text>

                  <TextInput
                    value={Players.benchs3}
                    name="benchs3"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, benchs3: e };
                      })
                    }
                    placeholder="Please enter benchs3's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    benchs
                  </Text>

                  <TextInput
                    value={Players.benchs4}
                    name="benchs4"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, benchs4: e };
                      })
                    }
                    placeholder="Please enter benchs4's Name"
                    style={styles.InputTextArea}
                  />

                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    benchs
                  </Text>

                  <TextInput
                    value={Players.benchs5}
                    name="benchs5"
                    onChangeText={(e) =>
                      PlayersF((prev) => {
                        return { ...prev, benchs5: e };
                      })
                    }
                    placeholder="Please enter benchs5's Name"
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

export default AddTeams;

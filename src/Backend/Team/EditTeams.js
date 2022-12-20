import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Function/Context';
import Header from '../../FrontEnd/Components/Others/Header';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import Loader from '../../FrontEnd/Components/Others/Loader';
import { styles } from '../../Function/styles';
import Button from '../../FrontEnd/Components/Others/Button';



const initialState={
    Competition: '',
    TeamName:'',
    Players:   {
goalkepper: '',
defender1: '',
defender2: '',
defender3: '',
defender4: '',
defender5: '',
midfielders1:'',
midfielders2:'',
midfielders3:'',
midfielders4:'',
midfielders5:'',
attakers1:'',
attakers2:'',
attakers3:'',
attakers4:'',
attakers5:'',
benchs1:'',
benchs2:'',
benchs3:'',
benchs4:'',
benchs5:'',

    },

    TeamGroup: '',
    TeamManager: '',
    TeamFormation: '',
    selectedImage: null,

        stat: {
      wins: '',
      loss: '',
      draw: '',
      matchplayed:'',
      gd:'',
      points: '',
      
    },
id:''

}

const EditTeams = ({route, navigation}) => {

  const {competition, competitionF, notification, notificationF, currentUser, loader, loaderF, TeamsFromDB } = useGlobalContext();


      const { teamId } = route.params;

      const [teamInfo, teamInfoF] =useState(initialState)


      useEffect(() => {
    teamId && getBlogDetail();
  }, [teamId]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Teams", teamId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      teamInfoF({ ...snapshot.data() });
    }
  };


  const{   Competition,
    TeamName, stat,
    Players,
  TeamGroup,
    TeamManager,
    TeamFormation,
    selectedImage,} = teamInfo









  const competitionData = ['Engine 4.0', 'Engine 3.0']
  const formationData = ['4-4-2', '4-3-3', '4-2-3-1', '3-4-3', '3-5-2']


 
 

   




  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        const realTime = new Date().toLocaleTimeString()
        const realDate = new Date().toDateString()

        // TeamNameF(`${realDate} ${realTime}`);

        
        setdateId(dateId);
    }, []);

   



  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.cancelled) {

        
     teamInfoF((prev) => ({ ...prev, selectedImage: result.uri }));
    

    }
  };


  const handleSubmit = async (e) => {
    
      e.preventDefault();

      if (teamInfo) {
loaderF(true)
        try {
          await updateDoc(doc(db, "Teams", teamId), {
            ...teamInfo
          });
  navigation.navigate("Team List");
  loaderF(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        return notificationF("field must be filled");
      }
    
 

  }

 
  function functions() {
     navigation.goBack()  }

  


  return (
    <SafeAreaView style={styles.container}>
      <Header
        functions={functions}
        imgtype={require("../../../assets/ba.png")}
      />

      {loader ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topSection}>
            <Text style={styles.topText}>Edit Team</Text>
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
                defaultValue={Competition}
                defaultButtonText="Select Competition"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                 

                  teamInfoF((prev) => ({ ...prev, Competition: selectedItem }));
                }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Team Name
              </Text>
              <TextInput
                value={TeamName}
                onChangeText={(e) => {
                  teamInfoF({ ...teamInfo, TeamName: e });
                }}
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
                onChangeText={(e) => {
                  teamInfoF({ ...teamInfo, TeamManager: e });
                }}
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
                defaultValue={TeamFormation}
                defaultButtonText="Select Team Formation"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  // FormationF(selectedItem)

                  teamInfoF((prev) => ({
                    ...prev,
                    TeamFormation: selectedItem,
                  }));
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Wins
                  </Text>
                  <TextInput
                    maxLength={1}
                    keyboardType="decimal-pad"
                    value={stat.wins}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          wins: e,
                        },
                      });
                    }}
                    placeholder="Match Won"
                    style={styles.InputTextArea}
                  />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Draw
                  </Text>
                  <TextInput
                    maxLength={1}
                    keyboardType="decimal-pad"
                    value={stat.draw}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          draw: e,
                        },
                      });
                    }}
                    placeholder="Match Draws"
                    style={styles.InputTextArea}
                  />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Loss
                  </Text>
                  <TextInput
                    maxLength={1}
                    keyboardType="decimal-pad"
                    value={stat.loss}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          loss: e,
                        },
                      });
                    }}
                    placeholder="Match Lost"
                    style={styles.InputTextArea}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Match Played
                  </Text>
                  <TextInput
                    maxLength={1}
                    keyboardType="decimal-pad"
                    value={stat.matchplayed}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          matchplayed: e,
                        },
                      });
                    }}
                    placeholder="Match Played"
                    style={styles.InputTextArea}
                  />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Goal Difference
                  </Text>
                  <TextInput
                    maxLength={2}
                    keyboardType="decimal-pad"
                    value={stat.gd}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          gd: e,
                        },
                      });
                    }}
                    placeholder="Goal Difference"
                    style={styles.InputTextArea}
                  />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Points
                  </Text>
                  <TextInput
                    maxLength={2}
                    keyboardType="decimal-pad"
                    value={stat.points}
                    onChangeText={(e) => {
                      teamInfoF({
                        ...teamInfo,
                        stat: {
                          ...stat,
                          points: e,
                        },
                      });
                    }}
                    placeholder="Match Points"
                    style={styles.InputTextArea}
                  />
                </View>
              </View>
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
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      goalkepper: e,
                    },
                  });
                }}
                placeholder="Please enter GoalKeeper's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Defender
              </Text>

              <TextInput
                value={Players.defender1}
                name="defender1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      defender1: e,
                    },
                  });
                }}
                placeholder="Please enter defender1's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Defender
              </Text>

              <TextInput
                value={Players.defender2}
                name="defender2"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      defender2: e,
                    },
                  });
                }}
                placeholder="Please enter defender2's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Defender
              </Text>

              <TextInput
                value={Players.defender3}
                name="defender3"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      defender3: e,
                    },
                  });
                }}
                placeholder="Please enter defender3's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Defender
              </Text>

              <TextInput
                value={Players.defender4}
                name="defender4"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      defender4: e,
                    },
                  });
                }}
                placeholder="Please enter defender4's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Defender
              </Text>

              <TextInput
                value={Players.defender5}
                name="defender5"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      defender5: e,
                    },
                  });
                }}
                placeholder="Please enter defender5's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Midfielders
              </Text>

              <TextInput
                value={Players.midfielders1}
                name="midfielders1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      midfielders1: e,
                    },
                  });
                }}
                placeholder="Please enter midfielders1's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Midfielders
              </Text>

              <TextInput
                value={Players.midfielders2}
                name="midfielders1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      midfielders2: e,
                    },
                  });
                }}
                placeholder="Please enter midfielders2's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Midfielders
              </Text>

              <TextInput
                value={Players.midfielders3}
                name="midfielders3"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      midfielders3: e,
                    },
                  });
                }}
                placeholder="Please enter midfielders3's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Midfielders
              </Text>

              <TextInput
                value={Players.midfielders4}
                name="midfielders4"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      midfielders4: e,
                    },
                  });
                }}
                placeholder="Please enter midfielders4's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Midfielders
              </Text>

              <TextInput
                value={Players.midfielders5}
                name="midfielders5"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      midfielders5: e,
                    },
                  });
                }}
                placeholder="Please enter midfielders5's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                attakers
              </Text>

              <TextInput
                value={Players.attakers1}
                name="attakers1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      attakers1: e,
                    },
                  });
                }}
                placeholder="Please enter attakers1's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                attakers
              </Text>

              <TextInput
                value={Players.attakers2}
                name="attakers1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      attakers2: e,
                    },
                  });
                }}
                placeholder="Please enter attakers2's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                attakers
              </Text>

              <TextInput
                value={Players.attakers3}
                name="attakers3"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      attakers3: e,
                    },
                  });
                }}
                placeholder="Please enter attakers3's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                attakers
              </Text>

              <TextInput
                value={Players.attakers4}
                name="attakers4"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      attakers4: e,
                    },
                  });
                }}
                placeholder="Please enter attakers4's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                attakers
              </Text>

              <TextInput
                value={Players.attakers5}
                name="attakers5"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      attakers5: e,
                    },
                  });
                }}
                placeholder="Please enter attakers5's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                benchs
              </Text>

              <TextInput
                value={Players.benchs1}
                name="benchs1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      benchs1: e,
                    },
                  });
                }}
                placeholder="Please enter benchs1's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                benchs
              </Text>

              <TextInput
                value={Players.benchs2}
                name="benchs1"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      benchs2: e,
                    },
                  });
                }}
                placeholder="Please enter benchs2's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                benchs
              </Text>

              <TextInput
                value={Players.benchs3}
                name="benchs3"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      benchs3: e,
                    },
                  });
                }}
                placeholder="Please enter benchs3's Name"
                style={styles.InputTextArea}
              />

              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                benchs
              </Text>

              <TextInput
                value={Players.benchs4}
                name="benchs4"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      benchs4: e,
                    },
                  });
                }}
                placeholder="Please enter benchs4's Name"
                style={styles.InputTextArea}
              />
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                benchs
              </Text>

              <TextInput
                value={Players.benchs4}
                name="benchs4"
                onChangeText={(e) => {
                  teamInfoF({
                    ...teamInfo,
                    Players: {
                      ...Players,
                      benchs5: e,
                    },
                  });
                }}
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
      )}
    </SafeAreaView>
  );
}

export default EditTeams


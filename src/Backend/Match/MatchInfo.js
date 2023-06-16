import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../Function/Context";
import Header from "../../FrontEnd/Components/Others/Header";
import SelectDropdown from "react-native-select-dropdown";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Loader from "../../FrontEnd/Components/Others/Loader";
import { styles } from "../../Function/styles";
import Button from "../../FrontEnd/Components/Others/Button";
const initialState = {
  Competition: "",

  MatchDay: "",
  HomeTeam: "",
  HomeTeamFormation: "",
  MatchDate: "",
  AwayTeam: "",
  AwayTeamFormation: "",
  Matchtime: "",
  HomeTeamScore: "",
  AwayTeamScore: "",
  MatchTimeline: [],
  MatchActive: false,
  Matchplayed: false,
  id: "",
};

// notification

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// notification

const MatchInfo = ({ route, navigation }) => {
  const {
    subAdmins,

    notification,
    notificationF,
    handleDeleteMatch,
    loader,
    loaderF,
  } = useGlobalContext();

  const { matchId } = route.params;

  const [matchhInfo, matchhInfoF] = useState(initialState);

  useEffect(() => {
    matchId && getBlogDetail();
  }, [matchId]);

  useEffect(() => {
    MatchNoteF(`${HomeTeamScore} - ${AwayTeamScore}`);
  }, [matchhInfo]);

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
    Matchplayed,
  } = matchhInfo;

  const [notificationBody, notificationBodyF] = useState(null);
  const [notificationNote, notificationNoteF] = useState("");

  const [MatchBody, MatchBodyF] = useState(notificationBody);

  const [MatchNote, MatchNoteF] = useState(
    `${HomeTeamScore} - ${AwayTeamScore}`
  );

  useEffect(() => {
    if (MatchBody === "Red Card" || MatchBody === "Yellow Card") {
      MatchNoteF(`${notificationNote}`);
    } else {
      MatchNoteF(`${HomeTeamScore} - ${AwayTeamScore} - ${notificationNote}`);
    }
  }, [notificationNote]);

  const formationData = ["4-3-3", "4-2-3-1", "3-4-3", "3-5-2"];

  const [dateId, setdateId] = useState("");

  // to set timeId
  useEffect(() => {
    const dateId = new Date().getTime();

    setdateId(dateId);
  }, [notificationBody]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matchhInfo) {
      loaderF(true);
      try {
        await updateDoc(doc(db, "Matchs", matchId), {
          ...matchhInfo,

          MatchTimeline: [...MatchTimeline, { MatchBody, MatchNote, dateId }],
        });

        if (notificationBody) {
          await schedulePushNotification();
          SendNotificationToAllUsers();
        }

        navigation.navigate("MatchList");

        loaderF(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      return notificationF("field must be filled");
    }
  };

  function functions(params) {
    navigation.goBack();
  }

  // Notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notificationn, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${HomeTeam} vs ${AwayTeam}`,
        body: `${notificationBody} ${notificationNote}`,
        //   data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
    handleSendUserTokentoDB();
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      handleSendUserTokentoDB();
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  // Notifications

  // sending Notification

  const [UsersToken, UsersTokenF] = useState([""]);
  const [UsersList, UsersListF] = useState([""]);

  console.log(UsersList);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const docRef = doc(db, "Users", "Vgp5x0EfVAXtx8JM7yGx");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersListF([...snapshot.data().expoPushTokenFB]);
      UsersTokenF({ ...snapshot.data() });
    }
  };

  const notes = ["Match Starts in few Minutes. Who will win?"];
  const bnotes = [
    "Match Started",
    "Yellow Card",
    "Red Card",
    `Goal ${HomeTeam} ${HomeTeamScore} - ${AwayTeamScore} ${AwayTeam}`,
    `Halftime ${HomeTeamScore} - ${AwayTeamScore}`,
    `Full Time ${HomeTeamScore} - ${AwayTeamScore}`,
  ];

  // send notificatiion multiple user
  const msgs = UsersList.map((list, index) =>
    JSON.parse(
      JSON.stringify({
        to: list,

        title: `${HomeTeam} vs ${AwayTeam}`,
        body: `${notificationBody} ${notificationNote}`,
      })
    )
  );

  const SendNotificationToAllUsers = () => {
    let res = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgs),
    });
  };

  // send expoToken to \db
  const handleSendUserTokentoDB = async () => {
    if (expoPushToken !== "") {
      try {
        await updateDoc(doc(db, "Users", "Vgp5x0EfVAXtx8JM7yGx"), {
          ...UsersToken,
          expoPushTokenFB: arrayUnion(expoPushToken),
        });
      } catch (error) {
        console.log(error, "line 219");
      }
    }
  };
  // send expoToken to \db

  // sending Notification

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
            <Text style={styles.topText}>Edit Match</Text>
            <Text style={styles.capText}>Please input the Match Details.</Text>
          </View>

          <KeyboardAvoidingView style={styles.Inputs}>
            <View style={{ marginTop: 0 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Competition
              </Text>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                {Competition}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Home Team
                </Text>
                <TextInput
                  value={HomeTeam}
                  onChangeText={(e) => {
                    matchhInfoF({ ...matchhInfo, HomeTeam: e });
                  }}
                  placeholder="Home Team"
                  style={styles.InputTextArea}
                />
              </View>
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Away Team
                </Text>
                <TextInput
                  value={AwayTeam}
                  onChangeText={(e) => {
                    matchhInfoF({ ...matchhInfo, AwayTeam: e });
                  }}
                  placeholder="Away Team"
                  style={styles.InputTextArea}
                />
              </View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Home Team Formation
                </Text>

                <SelectDropdown
                  data={formationData}
                  defaultValue={HomeTeamFormation}
                  defaultButtonText="Select Home Team Formation"
                  buttonStyle={styles.dropdownStyle}
                  buttonTextStyle={styles.dropdownStyleTxt}
                  onSelect={(selectedItem, index) => {
                    matchhInfoF((prev) => ({
                      ...prev,
                      HomeTeamFormation: selectedItem,
                    }));
                  }}
                />
              </View>
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Away Team Formation
                </Text>

                <SelectDropdown
                  data={formationData}
                  defaultValue={AwayTeamFormation}
                  defaultButtonText="Select Away Team Formation"
                  buttonStyle={styles.dropdownStyle}
                  buttonTextStyle={styles.dropdownStyleTxt}
                  onSelect={(selectedItem, index) => {
                    matchhInfoF((prev) => ({
                      ...prev,
                      AwayTeamFormation: selectedItem,
                    }));
                  }}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Start Match
              </Text>

              <SelectDropdown
                data={["Yes"]}
                defaultButtonText={
                  MatchActive ? "Yes" : "Please select to Start Match"
                }
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  matchhInfoF((prev) => ({ ...prev, MatchActive: true }));
                }}
              />
            </View>

            {MatchActive ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Home Team Score
                  </Text>

                  <TextInput
                    value={HomeTeamScore}
                    onChangeText={(e) => {
                      matchhInfoF({ ...matchhInfo, HomeTeamScore: e });
                    }}
                    placeholder="0"
                    maxLength={2}
                    style={styles.InputTextArea}
                    keyboardType={"decimal-pad"}
                  />
                </View>

                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Away Team Score
                  </Text>

                  <TextInput
                    value={AwayTeamScore}
                    onChangeText={(e) => {
                      matchhInfoF({ ...matchhInfo, AwayTeamScore: e });
                    }}
                    placeholder="0"
                    maxLength={2}
                    style={styles.InputTextArea}
                    keyboardType={"decimal-pad"}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Date
                  </Text>

                  <TextInput
                    value={MatchDate}
                    onChangeText={(e) => {
                      matchhInfoF({ ...matchhInfo, MatchDate: e });
                    }}
                    placeholder="Enter Date e.g (20 Jan)"
                    maxLength={6}
                    style={styles.InputTextArea}
                  />
                </View>

                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Time
                  </Text>

                  <TextInput
                    value={Matchtime}
                    onChangeText={(e) => {
                      matchhInfoF({ ...matchhInfo, Matchtime: e });
                    }}
                    placeholder="Enter Time e.g (03:00)"
                    maxLength={5}
                    style={styles.InputTextArea}
                  />
                </View>
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Notification
              </Text>

              <SelectDropdown
                data={MatchActive ? bnotes : notes}
                defaultButtonText={"Notification"}
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  notificationBodyF(selectedItem);
                  if (
                    selectedItem ===
                    `Goal ${HomeTeam} ${HomeTeamScore} - ${AwayTeamScore} ${AwayTeam}`
                  ) {
                    MatchBodyF("Goal");
                  } else if (
                    selectedItem ===
                    `Halftime ${HomeTeamScore} - ${AwayTeamScore}`
                  ) {
                    MatchBodyF("Halftime");
                  } else if (
                    selectedItem ===
                    `Full Time ${HomeTeamScore} - ${AwayTeamScore}`
                  ) {
                    MatchBodyF("Full Time");
                  } else if (
                    selectedItem ===
                    "Match Starts in few Minutes. Who will win?"
                  ) {
                    MatchBodyF("Match Starts in few Minutes. Who will win?");
                  } else if (selectedItem === "Match Started") {
                    MatchBodyF("Match Started");
                  } else if (selectedItem === "Yellow Card") {
                    MatchBodyF("Yellow Card");
                  } else if (selectedItem === "Red Card") {
                    MatchBodyF("Red Card");
                  }
                }}
              />
            </View>
            {MatchBody === "Goal" && (
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Notification Note
                </Text>

                <TextInput
                  value={notificationNote}
                  onChangeText={(e) => {
                    notificationNoteF(e);
                  }}
                  placeholder="Add Goal Scorer's Name"
                  style={styles.InputTextArea}
                />
              </View>
            )}
            {MatchBody === "Yellow Card" && (
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Notification Note
                </Text>

                <TextInput
                  value={notificationNote}
                  onChangeText={(e) => {
                    notificationNoteF(e);
                  }}
                  placeholder="Add Goal Scorer's Name"
                  style={styles.InputTextArea}
                />
              </View>
            )}
            {MatchBody === "Red Card" && (
              <View style={{ marginTop: 10, flex: 1 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Notification Note
                </Text>

                <TextInput
                  value={notificationNote}
                  onChangeText={(e) => {
                    notificationNoteF(e);
                  }}
                  placeholder="Add Goal Scorer's Name"
                  style={styles.InputTextArea}
                />
              </View>
            )}

            <View style={{ marginTop: 10, flex: 1 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Remove Match from Home List
              </Text>

              <SelectDropdown
                data={["Yes"]}
                defaultValue={HomeTeamFormation}
                defaultButtonText="Remove Match from Home List"
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropdownStyleTxt}
                onSelect={(selectedItem, index) => {
                  matchhInfoF((prev) => ({
                    ...prev,
                    Matchplayed: true,
                  }));
                }}
              />
            </View>
          </KeyboardAvoidingView>
          <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
            {notification}
          </Text>
          <Button handleSubmit={handleSubmit} />

          {!subAdmins && (
            <Button
              txt={"Delete Match"}
              color={"red"}
              handleSubmit={() => {
                handleDeleteMatch(matchId);
              }}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MatchInfo;

import { StyleSheet, Text, LogBox } from "react-native";
import React, { useState, useContext, useEffect } from "react";


import { useNavigation } from "@react-navigation/native";

import { auth, db, provider } from "../Utils/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const AppContext = React.createContext();

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const AppProvider = ({ children }) => {
  const [competition, competitionF] = useState(4);

  const [notification, notificationF] = useState("");
  const [loader, loaderF] = useState("");

  //   notification
  useEffect(() => {
    const timeoutt = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => {
      clearInterval(timeoutt);
    };
  }, [notification]);

  const navigation = useNavigation();

  // get list of teams from firebase

  const [TeamsFromDBi, TeamsFromDBiF] = useState([]);

  const TeamsFromDB = TeamsFromDBi;
  TeamsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });

  function getTeamsFromDB (params) {
      loaderF(true);
      const unsub = onSnapshot(
        collection(db, "Teams"),

        (snapshot) => {
          let list = [];

          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          TeamsFromDBiF(list);
          loaderF(false);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }

  useEffect(() => {
  getTeamsFromDB()
  }, []);
  // get list of users from firebase

  const [UsersToken, UsersTokenF] = useState("");

  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Users", "Vgp5x0EfVAXtx8JM7yGx");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersTokenF({ ...snapshot.data() });
    }
  };

  // console.log( UsersToken, 'context line 137');

  // to delete Teams
  const handleDeleteTeam = async (id) => {
 try {
      loaderF(true);
      await deleteDoc(doc(db, "Teams", id));
      loaderF(false);
    
    } catch (error) {
      console.log(error);
    }

  };
  // to delete Teams


  // get list of teams from firebase

  const [MatchsFromDBi, MatchsFromDBiF] = useState([]);

  const MatchsFromDB = MatchsFromDBi;
  MatchsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });


  const getMatchsFromDB =() => {

    loaderF(true);
    const unsub = onSnapshot(
      collection(db, "Matchs"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        MatchsFromDBiF(list);
        loaderF(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
 
    
  }

  useEffect(() => {
   getMatchsFromDB()
  }, []);

  // to delete Matchs
  const handleDeleteMatch = async (id) => {
    // console.warn('sdhgghds');
    // if (window.confirm("Are you sure you want to delete this blog?")) {
    try {
      loaderF(true);
      await deleteDoc(doc(db, "Matchs", id));
      loaderF(false);
      navigation.goBack();
      // toast.error("Blog successfully deleted");
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // get list of top picks from firebase

  const [TopPicksDB, TopPicksDBF] = useState([]);

  function getTopPick(params) {
      loaderF(true);
      const unsub = onSnapshot(
        collection(db, "Top Pick"),

        (snapshot) => {
          let list = [];

          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          TopPicksDBF(list);
          loaderF(false);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }

  useEffect(() => {
   getTopPick()
  }, []);

  // check if there is internet connecttion
  const [online, onlineF] = useState(true);

  NetInfo.fetch().then((state) => {
    onlineF(state.isConnected);
  });

  if (!online) {
    alert("You have no Internet Connection!!");
  }

  const [currentAdmin, currentAdminF] = useState(null);

  const [currentUser, currentUserF] = useState(false);

  const [currentTheme, currentThemeF] = useState('Default');

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@checkUserSignIn", value);
    } catch (e) {
      // saving error
    }
  };

  const storeTheme = async (value) => {
    try {
      await AsyncStorage.setItem("@userSelectedTheme", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@checkUserSignIn");
      const theme = await AsyncStorage.getItem("@userSelectedTheme");
      if (value !== null) {
        currentUserF(value);
      }
      if (theme !== null) {
        currentThemeF(theme);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [competitionType, competitionTypeF] = useState("Engine 4.0");

  // refreshing

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  // AutoUpdate 


  let projectVersion = '1.7'

    const [AutoUpdateState, AutoUpdateStateF] = useState({
      isthereUpdate: false,
      link: "",
      currentVersion: projectVersion
    });

    useEffect(() => {
      getUpdateDetail();
    }, []);

    const getUpdateDetail = async () => {
      loaderF(true);
      const docRef = doc(db, "AutoUpdate", "uhTnMICHPaLJOx5TJSw1");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        AutoUpdateStateF({ ...snapshot.data() });
      }
      loaderF(false);
    };

    // console.log(AutoUpdateState);


    // List of GoalScorers and Assits 

      const [PlayerGoalAssistData, PlayerGoalAssistDataF] = useState([]);

      useEffect(() => {
        getPlayerGoalAssistData();
      }, []);

      const getPlayerGoalAssistData = async () => {
        loaderF(true);
        const docRef = doc(db, "Player Data", "WmVhSufxYzBSkL8HsqkF");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          PlayerGoalAssistDataF([ ...snapshot.data().playerDatas ]);
        }
        loaderF(false);
      };




  return (
    <AppContext.Provider
      value={{
        notification,
        notificationF,
        navigation,

        currentUser,
        currentUserF,
        currentAdmin, currentAdminF,
        storeTheme,
        currentTheme, currentThemeF,

        loader,
        loaderF,

        TeamsFromDB,

        competition,
        competitionF,

        handleDeleteTeam,
        

        MatchsFromDB,

        handleDeleteMatch,

        online,
        UsersToken,
        storeData,
        getData,
        TopPicksDB,
        competitionType,
        competitionTypeF,

        getMatchsFromDB,
        getTopPick,
        getTeamsFromDB,
        AutoUpdateState,
        projectVersion,

        PlayerGoalAssistData,
        getPlayerGoalAssistData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

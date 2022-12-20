import {
  ImageBackground,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../Function/Context'
import { styles } from '../Function/styles'
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/Firebase';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const UserSignInPage = () => {

    // Notifications
      const [expoPushToken, setExpoPushToken] = useState('');
  const [notificationn, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
    // Notifications


        
  const [UsersToken, UsersTokenF] = useState([]);

      useEffect(() => {
  getUserDetail();
  }, []);


  const getUserDetail = async () => {
    const docRef = doc(db, "Users",  'Vgp5x0EfVAXtx8JM7yGx');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersTokenF({ ...snapshot.data() });
    }
  };


 const handleSendUserTokentoDB = async () => {
if (expoPushToken !== '') {

        try {
         await updateDoc(doc(db, "Users", 'Vgp5x0EfVAXtx8JM7yGx'), {
          ...UsersToken,
      expoPushTokenFB: arrayUnion(expoPushToken),
        });  
        } catch (error) {
            console.log(error, 'line 219');
           
        }
}
};



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Engine Scores`  ,
      body: `Welcome to the League of Football`,
    //   data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
  handleSendUserTokentoDB()
}



async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token, 'token:line 217');
    handleSendUserTokentoDB()
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}




    const { currentUserF, storeData, getData, currentTheme } =
      useGlobalContext();

    useEffect(() => {
     getData()
    }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
       
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: "#edeff2",
            opacity: 1,
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 5,
              paddingTop: 120,
            }}
          >
            <View style={styles.homeHeader}>
              <View style={styles.headerTitleDiv}>
                <Text style={styles.headerTitle}>
                  Engine
                  <Text
                    style={[
                      styles.headerTitleScore,
                      {
                        color:
                          currentTheme === "Red"
                            ? "#CF0A0A"
                            : currentTheme === "Pink"
                            ? "#EA047E"
                            : currentTheme === "Purple"
                            ? "#EA047E"
                            : "#377D71",
                      },
                    ]}
                  >
                    Scores
                  </Text>
                </Text>
              </View>
            </View>

            <Image source={require("../../assets/balll.png")} />

            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <Text
                style={{
                  flexDirection: "row",
                  textAlign: "center",
                  paddingHorizontal: 10,
                  fontSize: 14,
                }}
              >
                Get every minute Engineering Live Score here. Gather fast info
                and go along with others.
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "flex-end", flex: 1 }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                backgroundColor:
                  currentTheme === "Red"
                    ? "#CF0A0A"
                    : currentTheme === "Pink"
                    ? "#EA047E"
                    : currentTheme === "Purple"
                    ? "#EA047E"
                    : "#377D71",
                flexDirection: "row",
                flex: 1,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 40,
              }}
              onPress={() => {
                schedulePushNotification();
                storeData("true");
                currentUserF("true");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,

                  textAlign: "center",
                }}
              >
                CLICK TO CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text
              style={{
         
                fontSize: 11,
              
                textAlign: "center",
              }}
            >
              By clicking continue you agree to the  
            </Text><Text>{' '}</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://docs.google.com/document/d/15EI55EwKMagzsrdlWCgOkvQHabm0S6YXoqwWvN_RmEU/edit?usp=sharing"
                );
              }}
            >
              <Text
                style={{
           
                  fontSize: 11,
                  color: currentTheme === "Red"
              ? "#CF0A0A"
              : currentTheme === "Pink"
              ? "#EA047E"
              : currentTheme === "Purple"
              ? "#EA047E"
              :  "#377D71",
                  textAlign: "center",
                }}
              >
                   terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
   
    </SafeAreaView>
  );
}

export default UserSignInPage

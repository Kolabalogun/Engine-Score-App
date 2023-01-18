import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "../../Function/Context";
import { auth } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";

const Login = ({ navigation }) => {
  const {
    notification,
    notificationF,
    loader,
    loaderF,
    setsubAdmins,
    currentAdminF,
  } = useGlobalContext();

  const [studentID, studentIDF] = useState("");

  let studentEmail = `${studentID}@gmail.com`;

  const [password, passwordF] = useState("");

  const handleSignIn = () => {
    if (studentID && password) {
      loaderF(true);
      signInWithEmailAndPassword(auth, studentEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          currentAdminF(user);
          navigation.navigate("AuthNavigations");
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          notificationF(errorMessage);
        });
      loaderF(false);
    } else {
      notificationF("All field must be filled");
    }

    if (
      studentID === "Enginescoresubadmin" ||
      studentID === "enginescoresubadmin"
    ) {
      setsubAdmins(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.logo}>
            <Text style={styles.logoTxt}>EngineScores</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.topSection}>
              <Text style={styles.topText}>Welcome! 👋</Text>
              <Text style={styles.capText}>
                Sign In your ID and Password to continue!
              </Text>
            </View>
            <View style={styles.Inputs}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  ID
                </Text>
                <TextInput
                  value={studentID}
                  name="name"
                  onChangeText={(e) => studentIDF(e)}
                  placeholder="Enter your studentID"
                  style={styles.Input}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={(e) => passwordF(e)}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  style={styles.Input}
                  name="password"
                />
              </View>
            </View>

            <Text style={{ color: "red", alignSelf: "center" }}>
              {notification}
            </Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
              <Text style={styles.btnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "aliceblue",
    padding: 20,
    flex: 1,
  },
  topSection: {
    paddingTop: 20,
    // flex: 1,
  },
  topText: {
    fontWeight: "700",
    fontSize: 25,

    color: "rgb(7, 1, 57)",
    marginTop: 20,
  },
  capText: {
    color: "rgb(100, 100, 100)",
    marginTop: 10,
  },

  Inputs: {
    marginTop: 20,
    // flex: 1,

    justifyContent: "center",
  },
  Input: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "rgb(20, 119, 251)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginVertical: 30,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoTxt: {
    color: "#020E79",
    fontSize: 17,
    fontWeight: "500",
    paddingHorizontal: 5,
  },
});

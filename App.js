
import { NavigationContainer } from "@react-navigation/native";



import { Platform, StatusBar, StyleSheet, Text} from "react-native";



import { AppProvider } from "./src/Function/Context";
import Navigations from "./src/Function/Navigation";




export default function App() {
 
// if (Text.defaultProps == null) Text.defaultProps = {};
// Text.defaultProps.allowFontScaling = false;


  return (
    <NavigationContainer style={styles.container}>
      <AppProvider>
      

        <Navigations />
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
      </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
});

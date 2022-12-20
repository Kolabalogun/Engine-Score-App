import {
  
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";
import SelectDropdown from "react-native-select-dropdown";
import Loader from "../Components/Others/Loader";
import Button from "../Components/Others/Button";
import Header from "../Components/Others/Header";

const ChangeTheme = ({ navigation }) => {
  const {  loader, storeTheme, currentThemeF } =
    useGlobalContext();


  const themeArray = ["Default", "Purple","Red", "Pink" ];

  const [selectedTheme, selectedThemeF]= useState('')

  function handleSubmit() {
    storeTheme(selectedTheme)
    currentThemeF(selectedTheme)
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
      
        functions={() => {
          navigation.toggleDrawer();
        }}
      />

      {loader ? (
        <Loader />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Select Themes
            </Text>

            <SelectDropdown
              data={themeArray}
              defaultButtonText={"Select Theme"}
              buttonStyle={styles.dropdownStyle}
              buttonTextStyle={styles.dropdownStyleTxt}
              onSelect={(selectedItem, index) => {
                selectedThemeF(selectedItem);
              }}
            />
          </View>

          <Button handleSubmit={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChangeTheme;


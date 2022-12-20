import { TouchableOpacity, Text } from "react-native";
import React from 'react'

import { styles } from "../../../Function/styles";
import { useGlobalContext } from "../../../Function/Context";



const Button = ({handleSubmit, color, txt}) => {
    const {currentTheme} = useGlobalContext()
  return (

      <TouchableOpacity style={[styles.btn, { backgroundColor:
          currentTheme === "Red"
            ? "#CF0A0A"
            : currentTheme === "Pink"
            ? "#EA047E"
            : currentTheme === "Purple"
            ? "#EA047E"
            : color ? color
           
            : "#377D71",}]} onPress={handleSubmit}>
            <Text style={styles.btnTxt}>{txt ? txt:'Save'}</Text>
          </TouchableOpacity>



  );
}

export default Button


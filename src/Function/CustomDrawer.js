import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useGlobalContext } from './Context'

const CustomDrawer = (props) => {
    const {currentTheme} = useGlobalContext()
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor:
          currentTheme === "Red"
            ? "#252525"
            : currentTheme === "Pink"
            ? "#496EEC"
            : currentTheme === "Purple"
            ? "rgb(85, 3, 85)"
            : "#252525",

        flex: 1,
      }}
    >
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer
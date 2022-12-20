import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import Credit from '../FrontEnd/Pages/Credit';
import ChangeTheme from '../FrontEnd/Pages/ChangeTheme';
import CustomDrawer from './CustomDrawer';
import { useGlobalContext } from './Context';




const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {

  const {currentTheme} = useGlobalContext()

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor:
          currentTheme === "Red"
            ? "#CF0A0A"
            : currentTheme === "Pink"
            ? "#EA047E"
            : currentTheme === "Purple"
            ? "#EA047E"
            : "#377D71",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
      }}
      initialRouteName="Go Home"
    >
      <Drawer.Screen name="Go Home" component={TabNavigations} />
      <Drawer.Screen name="Change Theme" component={ChangeTheme} />

      <Drawer.Screen name="Credits" component={Credit} />
    </Drawer.Navigator>
  );
}
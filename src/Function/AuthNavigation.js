import { StyleSheet, View } from "react-native";

import { useGlobalContext } from "./Context";


import AdminNavigation from "./AdminNavigation";

import Login from "../Backend/Authentication/Auth";

const AuthNavigations = ({navigation}) => {
  const { currentAdmin } = useGlobalContext();

  return <>{!currentAdmin ? <Login navigation={navigation}/> : <AdminNavigation />}</>;
};

export default AuthNavigations;

const styles = StyleSheet.create({});

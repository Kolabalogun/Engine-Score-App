import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },

  // Header
  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "500",
  },

  headerTitleScore: {
    fontWeight: "500",
  },
  // Header

  // Nav

  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Home

  dashboard: {
    marginBottom: 10,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  dashboardBox: {
    marginVertical: 10,

    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },

  competitionName: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  matchDay: {
    fontSize: 13,
    color: "#aaa",
  },

  scoreBoard: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamBoard: {
    fontSize: 18,
    fontWeight: "500",
    alignItems: "center",
  },

  score: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
  },

  teamTxt: {
    color: "white",
    paddingTop: 5,
  },

  scoreTxt: {
    color: "white",
    fontSize: 48,
  },

  eachMatch: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 3,

    alignItems: "center",

    borderColor: "rgba(209, 225, 240, 0.782)",
  },

  eachMatchTeam: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
  },

  eachMatchTime: {
    flex: 1,
    alignItems: "center",
  },

  eachMatchTeamTxt: {
    fontWeight: "500",
    flexWrap: "wrap",
    fontSize: 14,
  },

  eachMatchTeamTime: {
    color: "#377D71",
    fontWeight: "500",
  },

  eachMatchTeamDate: {
    color: "#aaa",
    fontWeight: "400",
  },

  eachMatchTeamTimeScore: {
    fontWeight: "500",
    fontSize: 20,
  },

  eachMatchTeamDateScore: {
    color: "#aaa",
    fontWeight: "400",
    fontSize: 20,
    paddingHorizontal: 8,
  },

  // Home

  //Group
  group: {
    padding: 0,
    marginBottom: 10,
  },

  groupName: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: "#aaa",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    color: "black",
    marginBottom: 10,
    marginTop: 5,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    color: "#aaa",
    paddingTop: 10,
    alignItems: "center",
  },
  topTable: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tableHead: {
    color: "black",
    fontWeight: "500",
    fontSize: 13,
    flex: 1,
  },
  tableHeadOne: {
    color: "black",
    fontWeight: "500",
    fontSize: 13,
    flex: 4,
  },
  //Group

  //GroupList

  //Performance

  performanceGroup: {
    display: "flex",
    flexDirection: "column",
    color: "#aaa",

    paddingBottom: 30,
  },

  eachPerformancePlayer: {
    flexDirection: "row",
    color: "white",
    alignItems: "center",
  },

  eachPerformanceScore: {
    fontWeight: "500",
  },

  //Performance

  //Match Result

  matchTopBar: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 230,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  resultdashboard: {
    marginHorizontal: 20,
    marginTop: -150,
  },

  resultTeamTxt: {
    color: "black",
    paddingTop: 5,
    fontWeight: "500",
  },

  navMenu: {
    marginVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  formationSection: {
    marginHorizontal: 20,
  },

  teams: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  team: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  manager: {
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },

  managerSplit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  lineups: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  resulteachMatchTeamTime: {
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },

  // eachMatchTeamDate: {
  //   color: "#aaa",
  //   fontWeight: "400",
  //   fontSize: 15,
  // },

  eachSummary: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  //Change Theme
  dropdownStyle: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 13,
    borderColor: "#aaa",
    backgroundColor: "white",
    height: 40,
  },
  dropdownStyleTxt: {
    fontSize: 14,
  },

  //Button

  btn: {
    paddingVertical: 12,
    backgroundColor: "#ff2782",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginVertical: 20,
    marginBottom: 50,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  // Credits
  body: {
    paddingHorizontal: 20,

    marginVertical: 30,
    flex: 1,
  },
  optionBtn: {
    padding: 10,
    marginVertical: 5,
    justifyContent: "space-between",

    // borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    fontSize: 17,
    fontWeight: "500",

    paddingHorizontal: 10,
  },

  noth: {
    alignItems: "center",
  },
  nothTxt: {
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 20,
  },

  // Match Info

  topSection: {
    paddingTop: 15,
  },
  topText: {
    fontWeight: "700",
    fontSize: 25,
    color: "rgb(7, 1, 57)",
  },
  capText: {
    color: "rgb(100, 100, 100)",
    marginTop: 10,
  },

  Inputs: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
  },

  InputTextArea: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",

    alignItems: "baseline",
    justifyContent: "flex-start",
  },
});

export { styles };

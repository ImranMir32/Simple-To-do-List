import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DataProvider from "../DataProvider";
import { useContext } from "react";
import Var from "./Var";

export default Confirm = ({ navigation, route }) => {
  const { deleteTask } = useContext(DataProvider);
  const { id } = route.params;
  return (
    <View style={styles.containers}>
      <Text style={styles.text}>Wants to delete your task?</Text>
      <View style={styles.text}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.text}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteTask(id);
            navigation.navigate("Todo-list");
          }}
        >
          <Text style={styles.text}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    marginTop: 100,
    width: 300,
    height: 300,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 40,
  },
  text: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 20,
  },
});

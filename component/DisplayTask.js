import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DataProvider from "../Data";
import { useContext } from "react";
import Var from "./Var";
import Confirm from "./Confirm";

export default DisplayTask = ({ navigation, route }) => {
  const { taskList, checkDescription, completeTask, stay } =
    useContext(DataProvider);
  const { id } = route.params;
  return (
    <View style={styles.containers}>
      {/* exit */}
      <Var navigation={navigation} />
      <View style={styles.show}>
        <View style={styles.need}>
          <Text style={styles.text}>Title:</Text>
          <Text style={styles.text_}>{taskList[id]?.title}</Text>
        </View>
        <View style={styles.need}>
          {checkDescription(id) ? (
            <View>
              <Text style={styles.text}>Description:</Text>
              <Text style={styles.text_}>{taskList[id]?.description}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Confirm", { id: id });
        }}
        style={styles.button}
      >
        <Text style={styles.text__}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  show: {
    margin: 50,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  button: {
    marginTop: 10,
    marginLeft: 125,
    width: 100,
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: "white",
  },
  text__: {
    paddingLeft: 7,
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  text_: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  need: {
    marginTop: 40,
  },
});

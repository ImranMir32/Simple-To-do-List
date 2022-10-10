import { StyleSheet, Text, View } from "react-native";
import DataProvider from "../Data";
import { useContext } from "react";
import Var from "./Var";

export default DisplayTask = ({ navigation, route }) => {
  const { taskList } = useContext(DataProvider);
  const { id } = route.params;
  return (
    <View style={styles.containers}>
      {/* exit */}
      <Var navigation={navigation} />
      <View style={styles.show}>
        <View style={styles.need}>
          <Text style={styles.text}>Title:</Text>
          <Text style={styles.text_}>{taskList[id].title}</Text>
        </View>
        <View style={styles.need}>
          <Text style={styles.text}>Description:</Text>
          <Text style={styles.text_}>{taskList[id].description}</Text>
        </View>
      </View>
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

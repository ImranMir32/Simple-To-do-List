import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DataProvider from "../DataProvider";
import { useContext } from "react";
import Var from "./Var";
import ViewList from "./ViewList";

export default Todo = ({ navigation }) => {
  const { clear } = useContext(DataProvider);
  return (
    <View style={styles.containers}>
      {/* exit */}
      <Var navigation={navigation} />

      <View style={styles.createNew}>
        <Text style={styles.todo}>My Todos:</Text>
        <View style={styles.bar}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Craete-List");
              clear();
            }}
            style={styles.button}
          >
            <Text style={styles.text}>Create New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ViewList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#AADEFF",
  },
  createNew: {
    flexDirection: "row",
    marginBottom: 15,
  },
  todo: {
    margin: 20,
    marginLeft: 30,
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 22,
  },
  bar: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
  },

  button: {
    height: 50,
    width: 100,
    marginTop: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    height: 55,
    paddingHorizontal: 5,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Var from "./Var";
import { useDispatch, useSelector } from "react-redux";

const checkDescription = (description) => {
  if (description === "") {
    return false;
  } else {
    return true;
  }
};

export default DisplayTask = ({ navigation, route }) => {
  const { taskList } = useSelector((state) => state.global);
  const dispatch = useDispatch();

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
          {checkDescription(taskList[id]?.description) ? (
            <View>
              <Text style={styles.text}>Description:</Text>
              <Text style={styles.text_}>{taskList[id]?.description}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Confirm", { id: taskList[id].id });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: { height: "100%", width: "100%", backgroundColor: "#AADEFF" },
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
    marginLeft: 125,
    width: 100,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
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

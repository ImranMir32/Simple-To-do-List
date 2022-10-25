import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../Redux/Slice/globalSlice";

export default Confirm = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { id } = route.params;
  return (
    <View style={styles.back}>
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
            onPress={async () => {
              const info = {
                id: id,
                ID: user.id,
              };
              await dispatch(deleteTask(info));
              navigation.navigate("Todo-list");
            }}
          >
            <Text style={styles.text}>Yes</Text>
          </TouchableOpacity>
        </View>
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
  back: {
    height: "100%",
    width: "100%",
    backgroundColor: "#AADEFF",
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

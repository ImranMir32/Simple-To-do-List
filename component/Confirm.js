import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DataProvider from "../DataProvider";
import { useContext } from "react";

export default Confirm = ({ navigation, route }) => {
  const { deleteTask, setIsLoading } = useContext(DataProvider);
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
              await deleteTask(id);
              setIsLoading(true);
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

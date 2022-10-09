import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import DataProvider from "../Data";
import { useContext } from "react";
import Var from "./Var";

const ViewList = ({ navigation }) => {
  const {
    userName,
    title,
    description,
    setTitle,
    setDescription,
    getTitle,
    getDescription,
    checkTitle,
    taskList,
    isChecked,
  } = useContext(DataProvider);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.items}>
          {/* loooop */}
          {taskList.map((task, index) => {
            return (
              <View style={styles.item} key={index}>
                <TouchableOpacity>
                  <View style={styles.itemLeft}>
                    <View style={styles.square}>
                      <Text style={styles.square}>{index + 1}.</Text>
                    </View>
                    <Text style={styles.itemText}>{task.title}</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.wrap}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("u touch edit");
                    }}
                  >
                    <Image
                      style={styles.tinyLogo}
                      source={require("../Icons/edit.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(index) => {
                      isChecked(index);
                    }}
                  >
                    <View
                      style={
                        taskList.status === "true"
                          ? [styles.iscircular]
                          : [styles.circular]
                      }
                    ></View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default ViewList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 0,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    // margin: 12,
    fontSize: 15,
    fontWeight: "bold",
  },
  itemText: {
    margin: 12,
    fontSize: 15,
    fontWeight: "bold",
  },
  wrap: {
    flexDirection: "row",
    marginRight: 10,
  },
  tinyLogo: {
    marginBottom: 5,
    width: 25,
    height: 25,
  },
  circular: {
    margin: 5,
    marginLeft: 15,
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  iscircular: {
    margin: 5,
    marginLeft: 15,
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "blue",
  },
});
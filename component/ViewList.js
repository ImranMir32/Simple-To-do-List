import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import DataProvider from "../DataProvider";
import { useContext } from "react";

const ViewList = ({ navigation }) => {
  const { taskList, isChecked } = useContext(DataProvider);
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DisplayTask", { id: index });
                  }}
                >
                  <View style={styles.itemLeft}>
                    <Text
                      style={
                        task?.status === "true"
                          ? [styles.isitem]
                          : [styles.item]
                      }
                    >
                      {task?.title}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.wrap}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("UpdateTask", { id: index });
                    }}
                  >
                    {task?.status === "false" ? (
                      <Image
                        style={styles.tinyLogo}
                        source={require("../Icons/edit.png")}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      isChecked(task?.id);
                    }}
                  >
                    <View
                      style={
                        task?.status === "true"
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
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // margin: 20,
  },
  isitem: {
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // margin: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
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
    backgroundColor: "black",
  },
});

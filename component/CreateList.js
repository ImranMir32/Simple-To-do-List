import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import DataProvider from "../Data";
import { useContext } from "react";
import Var from "./Var";

const CraeteList = ({ navigation }) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    checkTitle,
    handleAddTask,
  } = useContext(DataProvider);
  return (
    <View>
      <Var navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>Create new Todo</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.text_}>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Title Of ToDo max(20)"}
            value={title}
            onChangeText={(title) => setTitle(title)}
            maxLength={20}
          />
          <Text style={styles.text_}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Description Of ToDo"}
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
          <TouchableOpacity
            onPress={() => {
              if (checkTitle()) {
                handleAddTask(), navigation.goBack();
              }
            }}
            style={styles.button}
          >
            <Text style={styles.text}>Create</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
export default CraeteList;
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  button: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 15,
    lineHeight: 15,
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
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DataProvider from "../DataProvider";
import { useContext, useEffect } from "react";
import Var from "./Var";

export default UpdateTask = ({ navigation, route }) => {
  const {
    taskList,
    title,
    description,
    setTitle,
    setDescription,
    checkTitle,
    updateTheTask,
    shouldShowTitle,
    setShouldShowTitle,
  } = useContext(DataProvider);

  const { id } = route.params;
  useEffect(() => {
    setTitle(taskList[id].title);
    setDescription(taskList[id].description);
  }, []);
  return (
    <View style={styles.back}>
      {/* exit */}
      <Var navigation={navigation} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.text_}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(title) => setTitle(title)}
            maxLength={10}
          ></TextInput>
          {shouldShowTitle ? (
            <Text style={styles.req}>*title is required </Text>
          ) : null}
          <Text style={styles.text_}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(description) => setDescription(description)}
          ></TextInput>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={async () => {
            if (!checkTitle()) setShouldShowTitle(true);
            if (checkTitle()) {
              await updateTheTask(id, title, description);
              setIsLoading(true);
              navigation.goBack();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    height: "100%",
    width: "100%",
    backgroundColor: "#AADEFF",
  },
  container: {
    marginTop: 65,
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
  req: {
    color: "red",
  },
  button: {
    height: 50,
    width: 100,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 25,
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

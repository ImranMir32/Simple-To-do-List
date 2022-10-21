import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
//import DataProvider from "../DataProvider";
import { useContext } from "react";
import Var from "./Var";

const CraeteList = ({ navigation }) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    checkTitle,
    shouldShowTitle,
    setShouldShowTitle,
    uploadTask,
    setIsLoading,
  } = useContext(DataProvider);
  return (
    <View style={styles.back}>
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
            maxLength={10}
          />
          <View>
            {shouldShowTitle ? (
              <Text style={styles.req}>*title is required </Text>
            ) : null}
          </View>
          <Text style={styles.text_}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Description Of ToDo"}
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={async () => {
            if (!checkTitle()) setShouldShowTitle(true);
            if (checkTitle()) {
              setIsLoading(true);
              await uploadTask(title, description);
              navigation.goBack();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CraeteList;
const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    height: "100%",
    width: "100%",
    backgroundColor: "#AADEFF",
  },
  req: {
    color: "red",
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
    width: 100,
    height: 50,
    marginTop: 15,
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

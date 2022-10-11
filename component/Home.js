import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useContext } from "react";
import DataProvider from "../Data";
const Home = ({ navigation }) => {
  const {
    setUserName,
    checkUser,
    shouldShowUser,
    setShouldShowUser,
    userName,
  } = useContext(DataProvider);
  return (
    <View style={styles.container}>
      <Text style={styles.text_}>Enter a User-Name</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          placeholder={"Enter your userName max(5)"}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          maxLength={5}
        />
        <View>
          {shouldShowUser ? (
            <Text style={styles.req}>*username is required </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!checkUser()) setShouldShowUser(true);
            if (checkUser()) navigation.navigate("Todo-list");
          }}
          style={styles.button}
        >
          <Text style={styles.text}>LogIn</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#FEF0FB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  req: {
    color: "red",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 60,
    elevation: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
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

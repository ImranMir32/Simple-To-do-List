import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserName,
  logIn,
  setShouldShowUser,
} from "../Redux/Slice/globalSlice";

const checkUser = (userName) => {
  Keyboard.dismiss();
  if (userName === "") {
    return false;
  } else {
    return true;
  }
};

const Home = ({ navigation }) => {
  const { userName, shouldShowUser } = useSelector((state) => state.global);
  const dispatch = useDispatch();

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
          onChangeText={(userName) => dispatch(setUserName(userName))}
          maxLength={5}
        />
        <View>
          {shouldShowUser ? (
            <Text style={styles.req}>*username is required </Text>
          ) : null}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={async () => {
          if (!checkUser(userName)) {
            dispatch(setShouldShowUser(true));
          }
          if (checkUser(userName)) {
            await dispatch(logIn(userName));
            navigation.navigate("Todo-list");
          }
        }}
        style={styles.button}
      >
        <Text style={styles.text}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#83D2DF",
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
    height: 50,
    width: 100,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 25,
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

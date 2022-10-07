import { StyleSheet, Text, View } from "react-native";
import DataProvider from "../Data";
import { useContext } from "react";

export default Todo = () => {
  const { userName } = useContext(DataProvider);
  return (
    <View style={styles.container}>
      <Text>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 30,
  },
});

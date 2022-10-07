import { StyleSheet, Text, View } from "react-native";
import Home from "./component/Home";
import Todo from "./component/Todo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { Data } from "./Data";

export default function App() {
  return (
    <Data>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Todo-list"
            component={Todo}
            options={{ headerLeft: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Data>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 35,
//     paddingLeft: 30,
//   },
//   text: {
//     fontSize: 25,
//     fontWeight: "bold",
//   },
// });

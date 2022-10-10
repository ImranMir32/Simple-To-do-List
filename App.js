import { StyleSheet, Text, View } from "react-native";
import Home from "./component/Home";
import Todo from "./component/Todo";
import CraeteList from "./component/CreateList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { Data } from "./Data";
import DisplayTask from "./component/DisplayTask";
import UpdateTask from "./component/UpdateTask";

export default function App() {
  return (
    <Data>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Todo-list"
            component={Todo}
            // options={{ headerLeft: () => null }}
          />
          <Stack.Screen name="Craete-List" component={CraeteList} />
          <Stack.Screen name="DisplayTask" component={DisplayTask} />
          <Stack.Screen name="UpdateTask" component={UpdateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </Data>
  );
}

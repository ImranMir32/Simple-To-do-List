import Home from "./component/Home";
import Todo from "./component/Todo";
import CraeteList from "./component/CreateList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import DisplayTask from "./component/DisplayTask";
import UpdateTask from "./component/UpdateTask";
import Confirm from "./component/Confirm";
import store from "./Redux/Store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Todo-list"
            component={Todo}
            options={{
              headerLeft: () => null,
            }}
          />
          <Stack.Screen name="Craete-List" component={CraeteList} />
          <Stack.Screen name="DisplayTask" component={DisplayTask} />
          <Stack.Screen
            name="UpdateTask"
            component={UpdateTask}
            options={{
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Confirm"
            component={Confirm}
            options={{ headerLeft: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

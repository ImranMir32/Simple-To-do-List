import { Alert, Keyboard } from "react-native";
import { createContext, useState } from "react";
const DataProvider = createContext();

export function Data({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("false");

  const checkUser = () => {
    Keyboard.dismiss();
    if (userName === "") {
      Alert.alert("Invalid Token");
      return false;
    } else {
      return true;
    }
  };
  const checkTitle = () => {
    Keyboard.dismiss();
    if (title === "") {
      Alert.alert("Invalid Token");
      return false;
    } else {
      return true;
    }
  };
  // const getTitle = (id) => {
  //   return taskList[id].title;
  // };

  const clearData = () => {
    setUserName("");
    setTitle("");
    setDescription("");
    setTaskList([]);
  };

  const isChecked = (id) => {
    const newTasks = taskList.map((task) => {
      // Alert.alert("ok");
      if (task?.id === id) {
        // Alert.alert("get");
        task.status === "false"
          ? (task.status = "true")
          : (task.status = "false");
      }
      return task;
    });

    setTaskList(newTasks);
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([
      ...taskList,
      { title, description, status: "false", id: taskList.length },
    ]);
    setTitle("");
    setDescription("");
    setStatus();
    Alert.alert("added");
    return;
  };

  const updateTheTask = (id) => {
    Keyboard.dismiss();
    const newTasks = taskList.map((task) => {
      if (task?.id === id) {
        task.title = title;
        task.description = description;
      }
      return task;
    });

    setTaskList(newTasks);
    return true;
  };
  return (
    <DataProvider.Provider
      value={{
        userName,
        checkUser,
        checkTitle,
        setUserName,
        taskList,
        setTaskList,
        title,
        setTitle,
        description,
        setDescription,
        handleAddTask,
        isChecked,
        clearData,
        updateTheTask,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export default DataProvider;

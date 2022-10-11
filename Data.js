import { Alert, Keyboard } from "react-native";
import { createContext, useState } from "react";
const DataProvider = createContext();

export function Data({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("false");
  const [shouldShowUser, setShouldShowUser] = useState(false);
  const [shouldShowTitle, setShouldShowTitle] = useState(false);

  const checkUser = () => {
    Keyboard.dismiss();
    if (userName === "") {
      // Alert.alert("Invalid Token");
      return false;
    } else {
      return true;
    }
  };
  const checkTitle = () => {
    Keyboard.dismiss();
    if (title === "") {
      // Alert.alert("Invalid Token");
      return false;
    } else {
      return true;
    }
  };

  const checkDescription = (id) => {
    if (taskList[id]?.description === "") {
      return false;
    } else {
      return true;
    }
  };

  const clearData = () => {
    setUserName("");
    setTitle("");
    setDescription("");
    setTaskList([]);
    setShouldShowUser(false);
    setShouldShowTitle(false);
    // userName = "";
  };

  const isChecked = (id) => {
    const newTasks = taskList.map((task) => {
      if (task?.id === id) {
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
    setShouldShowTitle(false);
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
    setTitle("");
    setDescription("");
    setShouldShowTitle(false);
    return true;
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskList];
    itemsCopy.splice(index, 1);
    setTaskList(itemsCopy);
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
        shouldShowUser,
        setShouldShowUser,
        shouldShowTitle,
        setShouldShowTitle,
        checkDescription,
        completeTask,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export default DataProvider;

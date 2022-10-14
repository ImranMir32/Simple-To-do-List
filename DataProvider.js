import { Keyboard } from "react-native";
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
  const [ID, setID] = useState(0);

  const checkUser = () => {
    Keyboard.dismiss();
    if (userName === "") {
      return false;
    } else {
      return true;
    }
  };
  const checkTitle = () => {
    Keyboard.dismiss();
    if (title === "") {
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
    setTaskList([...taskList, { title, description, status: "false", id: ID }]);
    setTitle("");
    setDescription("");
    setStatus();
    setShouldShowTitle(false);
    setID(ID + 1);
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

  const deleteTask = (index) => {
    let itemsCopy = [...taskList];
    itemsCopy.splice(index, 1);
    setTaskList(itemsCopy);
  };

  const clear = () => {
    setTitle("");
    setDescription("");
    setShouldShowTitle(false);
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
        deleteTask,
        clear,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export default DataProvider;

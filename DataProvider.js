import { Keyboard } from "react-native";
import { createContext, useState } from "react";
import axios from "axios";
const DataProvider = createContext();
const BASE_URL = "https://django-rest-simpletodo.herokuapp.com/api";

export function Data({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("false");
  const [shouldShowUser, setShouldShowUser] = useState(false);
  const [shouldShowTitle, setShouldShowTitle] = useState(false);
  const [user, setUser] = useState({});

  const logIn = async () => {
    Keyboard.dismiss();
    try {
      const apiSubDirectory = "login";
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: "POST",
        url,
        data: {
          username: userName,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTodo = (task) => {
    return {
      title: task.title,
      description: task.description,
      status: task.is_completed,
      id: task.id,
      date: task.created_at.slice(0, 10),
    };
  };

  const uploadTask = async (title, description) => {
    Keyboard.dismiss();
    try {
      const apiSubDirectory = "tasks";
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: "POST",
        url,
        headers: {
          userid: user.id,
        },
        data: {
          title: title,
          description: description,
        },
      });

      console.log(response.data);

      setTaskList([...taskList, createTodo(response.data)]);
      setTitle("");
      setDescription("");
      setStatus();
      setShouldShowTitle(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllTodo = async () => {
    try {
      const apiSubDirectory = "tasks";
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Userid: user.id,
        },
      });

      const currentTaskList = response.data;
      console.log(response.data);

      setTaskList(
        currentTaskList.map((task) => {
          return createTodo(task);
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const isChecked = async (id, state) => {
    try {
      console.log(state);
      const apiSubDirectory = "tasks";
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: "PATCH",
        url,
        headers: {
          Userid: user.id,
        },
        data: {
          is_completed: !state,
        },
      });
      fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTheTask = async (id, title, description) => {
    try {
      Keyboard.dismiss();
      const apiSubDirectory = "tasks";
      const url = `${BASE_URL}/${apiSubDirectory}/${taskList[id].id}/`;
      await axios({
        method: "PATCH",
        url,
        headers: {
          Userid: user.id,
        },
        data: {
          title: title,
          description: description,
        },
      });
      setTitle("");
      setDescription("");
      setShouldShowTitle(false);
      fetchAllTodo();
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (index) => {
    try {
      Keyboard.dismiss();
      const apiSubDirectory = "tasks";
      const url = `${BASE_URL}/${apiSubDirectory}/${taskList[index].id}/`;
      await axios({
        method: "DELETE",
        url,
        headers: {
          Userid: user.id,
        },
      });

      fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
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
        // handleAddTask,
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
        logIn,
        uploadTask,
        fetchAllTodo,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export default DataProvider;

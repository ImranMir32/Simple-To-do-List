import { Alert, Keyboard } from "react-native";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://django-rest-simpletodo.herokuapp.com/api";

//login
export const logIn = createAsyncThunk("global/logIn", async (userName) => {
  Keyboard.dismiss();
  const apiSubDirectory = "login";
  const url = `${BASE_URL}/${apiSubDirectory}/`;
  const response = await axios({
    method: "POST",
    url,
    data: {
      username: userName,
    },
  });
  return response.data;
});

//create-Todo
const createTodo = (task) => {
  return {
    title: task.title,
    description: task.description,
    status: task.is_completed,
    id: task.id,
    date: task.created_at.slice(0, 10),
  };
};

//fetchAllTodo
export const fetchAllTodo = createAsyncThunk(
  "global/fetchAllTodo",
  async (id) => {
    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response = await axios({
      method: "GET",
      url,
      headers: {
        Userid: id,
      },
    });

    // Alert.alert("aikhan a");
    const currentTaskList = response.data;
    currentTaskList.map((task) => {
      return createTodo(task);
    });
    return currentTaskList;
  }
);

//uploadtask
export const uploadTask = createAsyncThunk("global/uploadTask", async (obj) => {
  Keyboard.dismiss();

  const apiSubDirectory = "tasks";
  const url = `${BASE_URL}/${apiSubDirectory}/`;
  const response = await axios({
    method: "POST",
    url,
    headers: {
      userid: obj.Id,
    },
    data: {
      title: obj.title,
      description: obj.description,
    },
  });

  return response.data;
});

//isChecked
export const isChecked = createAsyncThunk("global/isChecked", async (info) => {
  const apiSubDirectory = "tasks";
  const url = `${BASE_URL}/${apiSubDirectory}/${info.id}/`;
  const response = await axios({
    method: "PATCH",
    url,
    headers: {
      Userid: info.ID,
    },
    data: {
      is_completed: !info.status,
    },
  });

  return response.data;
});

//updateTheTask
export const updateTheTask = createAsyncThunk(
  "global/updateTheTask",
  async (info) => {
    Keyboard.dismiss();

    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/${info.id}/`;
    const response = await axios({
      method: "PATCH",
      url,
      headers: {
        Userid: info.ID,
      },
      data: {
        title: info.title,
        description: info.description,
      },
    });

    return response.data;
  }
);

//deleteTask
export const deleteTask = createAsyncThunk(
  "global/deleteTask",
  async (info) => {
    Keyboard.dismiss();
    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/${info.id}/`;
    await axios({
      method: "DELETE",
      url,
      headers: {
        Userid: info.ID,
      },
    });
    return info.id;
  }
);

//globalSlice
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userName: "",
    title: "",
    description: "",
    shouldShowUser: false,
    shouldShowTitle: false,
    taskList: [],
    user: {},
    isLoading: false,
  },

  //reducer
  reducers: {
    setUserName: (state, action) => {
      //state,
      state.userName = action.payload;
      //console.log(state.userName);
    },
    setShouldShowUser: (state, action) => {
      state.shouldShowUser = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setShouldShowTitle: (state, action) => {
      state.shouldShowTitle = action.payload;
    },

    clearData: (state) => {
      state.userName = "";
      state.title = "";
      state.description = "";
      state.shouldShowUser = false;
      state.shouldShowTitle = false;
      state.user = {};
    },
    clear: (state) => {
      state.title = "";
      state.description = "";
      state.shouldShowTitle = false;
    },
  },

  //API
  extraReducers: (builder) => {
    //login
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //upload
    builder.addCase(uploadTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadTask.fulfilled, (state, action) => {
      state.title = "";
      state.description = "";
      state.shouldShowTitle = false;
      state.isLoading = false;
      state.taskList.push(action.payload);
    });
    builder.addCase(uploadTask.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //fetchAllTodo
    builder.addCase(fetchAllTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTodo.fulfilled, (state, action) => {
      state.taskList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllTodo.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //isChecked
    builder.addCase(isChecked.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(isChecked.fulfilled, (state, action) => {
      const task = state.taskList.find((todo) => {
        if (todo.id === action.payload.id) return todo;
      });
      task.is_completed = action.payload.is_completed;
      state.isLoading = false;
    });
    builder.addCase(isChecked.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //updateTheTask
    builder.addCase(updateTheTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTheTask.fulfilled, (state, action) => {
      const task = state.taskList.find((todo) => {
        if (todo.id === action.payload.id) return todo;
      });
      task.title = action.payload.title;
      task.description = action.payload.description;

      state.title = "";
      state.description = "";
      state.shouldShowTitle = false;
      state.isLoading = false;
    });
    builder.addCase(updateTheTask.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //delete
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const {
  checkTitle,
  clearData,
  clear,
  checkDescription,
  setUserName,
  setShouldShowUser,
  setTitle,
  setDescription,
  setShouldShowTitle,
} = globalSlice.actions;

export default globalSlice.reducer;

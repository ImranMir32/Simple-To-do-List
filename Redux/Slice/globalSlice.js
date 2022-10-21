import { Keyboard } from "react-native";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://django-rest-simpletodo.herokuapp.com/api";

// const { createSlice } = require("@reduxjs/toolkit");

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

//uploadtask
export const uploadTask = createAsyncThunk("global/uploadTask", async () => {
  Keyboard.dismiss();

  const apiSubDirectory = "tasks";
  const url = `${BASE_URL}/${apiSubDirectory}/`;
  const response = await axios({
    method: "POST",
    url,
    headers: {
      userid: id,
    },
    data: {
      title: title,
      description: description,
    },
  });

  fetchAllTodo(id);
  return response;
  // (state.title=""),
  // (state.description=""),
  // (state.setShouldShowTitle=false),

  // return response;
});

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

    const currentTaskList = response.data;
    currentTaskList.map((task) => {
      return createTodo(task);
    });
    return currentTaskList;
  }
);

const createTodo = (task) => {
  return {
    title: task.title,
    description: task.description,
    status: task.is_completed,
    id: task.id,
    date: task.created_at.slice(0, 10),
  };
};

//isChecked
export const isChecked = createAsyncThunk(
  "global/isChecked",
  async (id, state) => {
    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
    await axios({
      method: "PATCH",
      url,
      headers: {
        Userid: id,
      },
      data: {
        is_completed: !state,
      },
    });
    return fetchAllTodo(id);
  }
);

//updateTheTask
export const updateTheTask = createAsyncThunk(
  "global/updateTheTask",
  async ({ id, title, description }) => {
    Keyboard.dismiss();
    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/${taskList[id].id}/`;
    await axios({
      method: "PATCH",
      url,
      headers: {
        Userid: id,
      },
      data: {
        title: title,
        description: description,
      },
    });
    return fetchAllTodo(id);
  }
);

//deleteTask
export const deleteTask = createAsyncThunk(
  "global/deleteTask",
  async (index, id) => {
    Keyboard.dismiss();
    const apiSubDirectory = "tasks";
    const url = `${BASE_URL}/${apiSubDirectory}/${taskList[index].id}/`;
    await axios({
      method: "DELETE",
      url,
      headers: {
        Userid: id,
      },
    });

    return fetchAllTodo(id);
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
      state.userName = action.payload;
      console.log(state.userName);
    },
    setShouldShowUser: (state, action) => {
      state.shouldShowUser = action.payload;
    },

    // checkTitle: (state) => {
    //   Keyboard.dismiss();
    //   if (state.title === "") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    clearData: (state) => {
      (state.userName = ""),
        (state.title = ""),
        (state.description = ""),
        (state.shouldShowUser = false),
        (state.shouldShowTitle = false);
    },
    clear: (state) => {
      (state.title = ""),
        (state.description = ""),
        (state.shouldShowTitle = false);
    },
    // checkDescription: (state, action) => {
    //   if (state.taskList[action.payload]?.state.description === "") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
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
      state.setShouldShowTitle = false;
      state.isLoading = false;
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
      state.taskList = action.payload;
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
      state.title = "";
      state.description = "";
      state.shouldShowTitle = false;
      state.taskList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateTheTask.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskList = action.payload;
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
} = globalSlice.actions;

export default globalSlice.reducer;

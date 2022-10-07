import { Alert, Keyboard } from "react-native";
import { createContext, useState } from "react";
const DataProvider = createContext();

export function Data({ children }) {
  const [userName, setUserName] = useState("");
  const handleLogIn = () => {
    Keyboard.dismiss();
    if (userName === "") {
      Alert.alert("Invalid Token");
      return false;
    } else {
      return true;
    }
  };
  return (
    <DataProvider.Provider value={{ userName, handleLogIn, setUserName }}>
      {children}
    </DataProvider.Provider>
  );
}

export default DataProvider;

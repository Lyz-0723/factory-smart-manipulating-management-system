import { useState, createContext } from "react";

import "./App.css";
import LogIn from "./components/Authentication/LogIn";

export const AppContext = createContext(null);

function App() {
  const [mode, setMode] = useState(0);
  const [logOutBtn, setLogOutBtn] = useState(
    window.localStorage.getItem("isLogIn") === "true" ? true : false
  );

  return (
    <AppContext.Provider
      className="App"
      value={{ mode, setMode, setLogOutBtn }}
    >
      <header className="App-header" />

      {/* Page mode rendering */}
      {mode == 0 && <LogIn />}
    </AppContext.Provider>
  );
}

export default App;

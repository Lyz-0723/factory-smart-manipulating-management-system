import { useState, createContext, useEffect } from "react";

import "./App.css";
import LogIn from "./components/Authentication/LogIn";
import Base from "./components/Base/Base";
import { validate } from "./requests/login";
import { get_self_detail } from "./requests/user";

export const AppContext = createContext(null);

function App() {
  const isLogIn = window.localStorage.getItem("isLogIn");
  const [mode, setMode] = useState(0);
  const [logOutBtn, setLogOutBtn] = useState(
    window.localStorage.getItem("isLogIn") === "true" ? true : false
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const check_login = async () => {
      if (isLogIn === "true" && (await validate())) {
        setMode(1);
        setUser(await get_self_detail());
        return;
      } else {
        setMode(0);
      }
    };
    if (mode === 0) check_login();
    // eslint-disable-next-line
  }, [mode]);

  return (
    <AppContext.Provider
      className="App"
      value={{ mode, setMode, setLogOutBtn, user, setUser }}
    >
      {/* <header className="App-header" /> */}

      {/* Page mode rendering */}
      {mode === 0 && <LogIn />}
      {mode === 1 && <Base />}
    </AppContext.Provider>
  );
}

export default App;

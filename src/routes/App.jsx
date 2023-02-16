import { HashRouter, Routes, Route } from "react-router-dom";
import LogIn from "../components/login/LogIn";
import Managers from "../pages/managers/Managers";
import Matrix from "../pages/matrix/Matrix";
import users from "../apis";
import { RequireAuth } from "../components/login/RequireAuth";
import { useState, useEffect } from "react";


function App() {
  //Login status
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") ? localStorage.getItem("isLogged") : false );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
  };
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", false)
    // BORRAR TOOODOOO EL LOCALSTORAGE
  };
  // Fetch data from backend
  const login = async (item) => {
    try {
      const {data, status}  = await users.post("/api/login", item);
      setToken(data.data)
      localStorage.setItem("token", data.data)
      console.log(token)
      //Check if the status is correct and the token seems valid
      return status ==200 && !!data.data
    }catch(_){
      return false
    }   
  };
 
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<LogIn loginFunction={login} onLogin={handleLogin} onLogout={handleLogout} />}
          />
          <Route
            path="matrix/"
            element={
              <RequireAuth isLogged={isLogged}  children= {<Matrix  onLogout={handleLogout} token={token} />}/>
            }
          />
          <Route
            path="managers/"
            element={
              <RequireAuth isLogged={isLogged} token={token} children= {<Managers onLogout={handleLogout} />}/>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

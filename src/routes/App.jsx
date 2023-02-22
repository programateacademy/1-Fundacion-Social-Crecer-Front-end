import { HashRouter, Routes, Route } from "react-router-dom";
import LogIn from "../components/login/LogIn";
import Managers from "../pages/managers/Managers";
import Matrix from "../pages/matrix/Matrix";
import users from "../apis/index";
import { RequireAuth } from "../components/login/RequireAuth";
import { useState, useEffect } from "react";


function App() {
  console.log(users)
  //Login status
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") ? localStorage.getItem("isLogged") : false );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [locked, setLocked] = useState(false)

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", false)
    // BORRAR TOOODOOO EL LOCALSTORAGE
  };


  const login = (item) => {
    return users.post("/api/login", item)
      .then((response) => {
        setToken(response.data.data);
        localStorage.setItem("token", response.data.data);
        console.log(token);
        console.log(response.data);
        
        //Check if the status is correct and the token seems valid
        // !! convert data.data into a boolean value 
        return response.status == 200 && !!response.data.data;
      })
      .catch((error) => {
         console.log(error.response.data)
        if(error.response.data.isLocked) {
          setLocked(true)
          console.log(error.response.data)
        }
        return false;
      });
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

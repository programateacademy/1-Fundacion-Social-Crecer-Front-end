import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import LogIn from "../components/login/LogIn";
import Managers from "../pages/managers/Managers";
import Matrix from "../pages/matrix/Matrix";
import admin from "../apis";
import { RequireAuth } from "../components/login/RequireAuth";
import { useState } from "react";


function App() {
  //Login status
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") ? localStorage.getItem("isLogged") : false );
  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", true)
  };
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", false)
    // BORRAR TOOODOOO EL LOCALSTORAGE

  };
  // Fetch data from backend
  const add = async (item) => {
    try {
      const {data, status}  = await admin.post("/api/user/login", item);
      //verifica si el status es correcto y el token parece valido
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
            element={<LogIn addFunction={add} onLogin={handleLogin} onLogout={handleLogout} />}
          />
          <Route
            path="matrix/"
            element={
              <RequireAuth isLogged={isLogged} children= {<Matrix  onLogout={handleLogout} />}/>
            }
          />
          <Route
            path="managers/"
            element={
              <RequireAuth isLogged={isLogged} children= {<Managers onLogout={handleLogout} />}/>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

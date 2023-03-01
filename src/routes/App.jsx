import { Routes, Route, BrowserRouter } from "react-router-dom";
import LogIn from "../components/login/LogIn";
import Managers from "../pages/managers/Managers";
import Matrix from "../pages/matrix/Matrix";
import RecoveryPassword from "../pages/recoverypassword/RecoveryPassword";
import users from "../apis/index";
import { RequireAuth } from "../components/login/RequireAuth";
import { useEffect, useState} from "react";
import { RequireAuthSuper } from "../components/login/RequireAuthSuper";
import { useArrayContext } from "../context/context";
import { useSetArrayContext } from "../context/context";

function App() {
  const array = useArrayContext();
  const setArray = useSetArrayContext(); 
  //Login status
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") ? localStorage.getItem("isLogged") : false
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  //Object with the user info
  const [userInfo, setUserInfo] = useState([]);

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", false);
  };

  async function fetchData() {
    if (!token) {
        onLogout();
    } else {
        const { data } = await users.get("/api/admin", {
            headers: {
                Authorization: token,
            },
        });
        console.log("Data" , data)
        setUserInfo(data.data.user);
        localStorage.setItem("userData", JSON.stringify(data.data.user));

    }
}
useEffect(() => {
  users.get ('/api/beneficiaries')
  .then((res) => {
    setArray(res.data);
  })
}, [])



  const login = (item) => {

    return users
      .post("/api/login", item)
      .then((response) => {
        setToken(response.data.data);
        localStorage.setItem("token", response.data.data);
        console.log(token);
        console.log(response.data);
        const validLogin = response.status == 200 && !!response.data.data;
        if (validLogin){
          fetchData()
        }
        
        //Check if the status is correct and the token seems valid
        // !! convert data.data into a boolean value 
        return validLogin;
      })
      .catch((error) => {
        //Update the userInfo state if is locked
        console.log(error.response.data);
        if (error.response.data.userData?.at(0)) {
          setUserInfo(error.response.data.userData);
        }
        return false;
      });
  };


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LogIn loginFunction={login} onLogin={handleLogin} userInfo={userInfo}/>}
          />
          <Route
            path="/matrix"
            element={
              <RequireAuth isLogged={isLogged}  children= {<Matrix  onLogout={handleLogout}  token={token} />}/>
            }
          />
          <Route
            path="/managers"
            element={
              <RequireAuthSuper isLogged={isLogged} children= {<Managers onLogout={handleLogout}  token={token} />}/>
            }
          />
          <Route path="/recover-password/" element={ 
              <RequireAuthSuper isLogged={isLogged} children= {<RecoveryPassword onLogout={handleLogout}  token={token} />}/>
            }
          />
        </Routes>
      </BrowserRouter>  
    </>
  );
}
export default App;
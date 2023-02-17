import { HashRouter, Routes, Route } from "react-router-dom";
import LogIn from "../components/login/LogIn";
import Managers from "../pages/managers/Managers";
import Matrix from "../pages/matrix/Matrix";
import admin from "../apis"

function App() {
  // Fetch data from backend
  const add = async (item) => {
    const { data } = await admin.post("/api/user/login", item);
    console.log(data);
  };
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LogIn addFunction={add} />} />
          <Route path="matrix/" element={<Matrix />} />
          <Route path="managers/" element={<Managers />} />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

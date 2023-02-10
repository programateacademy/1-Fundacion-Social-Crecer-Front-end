import { HashRouter, Routes, Route } from "react-router-dom";
import LogIn from "../components/login/LogIn";

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
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

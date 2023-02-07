import { HashRouter, Routes, Route } from "react-router-dom";
import LogIn from "../components/login/LogIn";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;

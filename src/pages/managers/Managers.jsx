import { useState, useEffect, useMemo } from "react";
import CardUser from "./CardUser.jsx";
import "./Managers.css";
import SearchManagers from "./SearchFilter/SearchManagers.jsx";
import AddButton from "./AddManagers/AddButton";
import Header from "../../components/header/Header.jsx";
import users from "../../apis/index";

function Managers({ onLogout, token }) {
  //State that will store the users collection in Mongo
  const [managers, setManagers] = useState(null);
   //State that say if the data is loading
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  // function that get the users data
  const getManagers = async () => {
    try {
      const response = await users.get("/api/superadmin/admin", {
        // Header to pass correctly the middleware
        headers: {
          Authorization: localStorage.getItem("token" || "recovery-token"),
        },
      });
      setManagers(response.data);
      setLoading(false);
      console.log('getmanagers work')
    } catch (error) {
      console.error(error.message);
    }
  };
// Get managers data on every component charge
  useEffect(() => {
getManagers()
  }, [CardUser]);

  let quitAccent = function (cadena) {
    const acentos = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
    };
    return cadena
      .split("")
      .map((letra) => acentos[letra] || letra)
      .join("")
      .toString();
  };
   
  // Hook useMemo to return the result managers in case of the filter is used
  const searchedManagers = useMemo(() => {
    if (!managers || !searchValue) {
      return managers;
    }
    // Filter system to search by name, email, id or unity

    const searchText = quitAccent(searchValue.toLowerCase());
    const searchResults = managers.filter((manager) => {
      const managerName = quitAccent(manager.name.toLowerCase());
      const managerEmail = quitAccent(manager.email.toLowerCase());
      const managerID = manager.docnum.toString();
      const managerUnity = quitAccent(manager.unity.toLowerCase());
      return (
        managerName.includes(searchText) ||
        managerEmail.includes(searchText) ||
        managerID.includes(searchText) ||
        managerUnity.includes(searchText)
      );
    });

    return searchResults;
  }, [managers, searchValue, setManagers]);
  return (
    <>
      <Header onLogout={onLogout} token={token} />
      <div className="filaUno">
        <SearchManagers
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <AddButton getManagers={getManagers} />
      </div>
      <CardUser
        managers={searchedManagers}
        getManagers={getManagers}
        setManagers={setManagers}
        loading={loading}
      />
    </>
  );
}

export default Managers;

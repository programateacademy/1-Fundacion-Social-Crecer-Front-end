import { useState, useEffect, useMemo } from "react";
import CardUser from "./CardUser.jsx";
import "./Managers.css";
import SearchManagers from "./SearchManagers.jsx";
import AddButton from "./AddButton.jsx";
import Header from "../../components/header/Header.jsx";
import users from "../../apis/index";

function Managers({ onLogout, token }) {
  const [managers, setManagers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const getManagers = async () => {
    try {
      const response = await users.get("/api/superadmin/admin", {
        headers: {
          Authorization: localStorage.getItem("token" || "recovery-token"),
        },
      });
      setManagers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

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
  const searchedManagers = useMemo(() => {
    if (!managers || !searchValue) {
      return managers;
    }

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

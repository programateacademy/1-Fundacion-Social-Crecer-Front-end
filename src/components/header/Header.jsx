import logo from "../../assets/img/logo.svg";
import { FaUserAlt } from "react-icons/fa";
import "./Header.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import users from "../../apis/index";
import { useEffect, useState } from "react";

function Header({ onLogout, token }) {
  const [userInfo, setUserInfo] = useState({});
  // useEffect hook with empty dependency array, which means it will only run once
  useEffect(() => {
    // Call the fetchData function on component mount
    fetchData();
  }, []);
  // async function that makes an API call to fetch user information
  async function fetchData() {
    // Check if there is a token available
    if (!token) {
      // If no token is available, call the onLogout function
      onLogout();
    } else {
      // If token is available, make an API call to fetch user information using the Axios library
      const { data } = await users.get("/api/admin", {
        headers: {
          Authorization: token,
        },
      });
      // Set the userInfo state object to the user data retrieved from the API call
      setUserInfo(data.data.user);
    }
  }
  return (
    <div className="header">
      <img className="elLogo" src={logo} alt="fundacionCrecer" />
      <div className="buttonsHeader">
        <button type="button" className="buttonHeader">
          <Link to="/matrix">Inicio</Link>
        </button>
        {userInfo && userInfo.role === "superAdmin" && (
          <button type="button" className="buttonHeader">
            <Link to="/managers">Funcionarios</Link>
          </button>
        )}
      </div>
      <div className="profile">
        <span className="iconuserInfo">
          <FaUserAlt />
        </span>
        {userInfo && (
          <div className="adminInfo">
            <p>{userInfo.name}</p>
            <p>{userInfo.role}</p>
            {/* <p>{userInfo.email}</p> */}
          </div>
        )}
        <button
          onClick={() => {
            onLogout();
          }}
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;

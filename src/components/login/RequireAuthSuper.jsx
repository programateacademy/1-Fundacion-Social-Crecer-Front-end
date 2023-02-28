import { Navigate } from "react-router-dom";

export const RequireAuthSuper = ({ userInfo, isLogged, children }) => {
  if (!isLogged || (userInfo && userInfo.role != "superAdmin")) {
    console.log("No logueado");
    return <Navigate to="/" />;
  }
  console.log("logueado");
  return children;
};

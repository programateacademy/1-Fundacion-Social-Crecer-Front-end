import { Navigate } from "react-router-dom"

export const RequireAuth = ({isLogged, children}) => {
  if(!isLogged){
    console.log("No logueado")
    return <Navigate to='/'/>
    
    }
    console.log("logueado")
  return (

    children
  )
}

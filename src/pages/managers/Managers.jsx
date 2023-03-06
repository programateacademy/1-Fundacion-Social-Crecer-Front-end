import { useState, useEffect, useMemo } from 'react';
import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import AddButton from './AddButton.jsx';
import Header from '../../components/header/Header.jsx';
import users from '../../apis/index'

//Wellcome to Managers, this is the root component for all these functions that allow us manage all Users
//of our web application
function Managers({onLogout, token}) {
  //'managers' Array of objects where we will upload the users list from mongodb database
  const [managers,setManagers ] = useState(null);
  //'loading' A boolean indicating whether the component is still loading data
  const [loading, setLoading] = useState(true);
  //'searchValue' a string representing the current search query entered by the user
  const [searchValue, setSearchValue] = useState('')

  //The getManagers function is defined to fetch the list of users from the backend API 
  //using the Axios library.
  const getManagers = async () => {
    try {
      const response = await users.get('/api/superadmin/admin', {headers: {
        Authorization: localStorage.getItem('token' || 'recovery-token')
      }});
      setManagers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  //The function getManagers is called inside an useEffect hook
  //to fetch the data when the component mounts.
  useEffect(() => {
    getManagers();
  }, []);

  //The quitAccent function is defined to remove accent marks from strings. 
  let quitAccent=function (cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }

  //searchedManagers variable uses the useMemo hook to filter 
  //the list of users based on the current search query.
  //The search is case-insensitive and ignores accent marks.
  //This searchs by name, email, unity and identification number
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
      return (managerName.includes(searchText) || managerEmail.includes(searchText) || managerID.includes(searchText)||managerUnity.includes(searchText));
    });
  
    return searchResults;
  }, [managers, searchValue, setManagers]);

  //The component returns a header component, a search bar component, and a button component.
  return( 
    <>
      <Header onLogout={onLogout} token={token}/>
      <div className='filaUno'>
        {/*This is the input for search users using search function described above*/}
        <SearchManagers searchValue={searchValue} setSearchValue={setSearchValue}/>
        {/*This is the button to add new to add new users*/}
        <AddButton getManagers={getManagers}/>
      </div> 
      {/*CardUser component displays the list of users, which is passed the searchedManagers, 
      getManagers, setManagers, and loading state variables as props. */}
      <CardUser 
        managers={searchedManagers} 
        getManagers={getManagers}
        loading={loading}/>
    </>
  );
}

export default Managers;

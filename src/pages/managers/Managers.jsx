import React from 'react';
import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import ModalContainerAddUser from './ModalContainerAddUser.jsx';
import UserList from "./UserList.jsx";
function Managers() {
  const [managers,setManagers ]=React.useState(UserList);
  const [searchValue, setSearchValue]=React.useState('');
  let quitAccent=function (cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }
  let searchedManagers=[];
  if (!searchValue.length>=1)
  {
    searchedManagers=managers;
  } 
  else{
    searchedManagers=managers.filter(manager=>{
      const managerName=quitAccent(manager.name.toLowerCase());
      const searchText=quitAccent(searchValue.toLowerCase());
      const managerEmail=quitAccent(manager.email.toLowerCase());
      const managerID=manager.id.toString();
      return (managerName.includes(searchText)||managerEmail.includes(searchText)||managerID.includes(searchText));
      
    });
  }

  return (
    <>
      <div className='filaUno'>
        <SearchManagers searchValue={searchValue} setSearchValue={setSearchValue}/>
        <ModalContainerAddUser/>
      </div>
      <CardUser managers={searchedManagers} setManagers={setManagers}
      />
    </>
  );
}

export default Managers;

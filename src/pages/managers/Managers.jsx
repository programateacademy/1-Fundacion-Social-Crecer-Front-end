import React from 'react';
import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import ModalContainerAddUser from './ModalContainerAddUser.jsx';
import UserList from "./UserList.jsx";
function Managers() {
  const localStorageManagers=localStorage.getItem('MANAGERS_V1');
  let parsedManagers;
  if (!localStorageManagers){
    localStorage.setItem('MANAGERS_V1',JSON.stringify([]));
  }
  else{
    parsedManagers=JSON.parse(localStorageManagers);
  }

  const [managers,setManagers ]=React.useState(UserList);
  const [searchValue, setSearchValue]=React.useState('');

  const saveManagers=(newManagers)=>{
    const stringifiedManagers=JSON.stringify(newManagers);
    localStorage.setItem('MANAGERS_V1',stringifiedManagers);
    setManagers(newManagers);
  };

  
  
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
  const addManagers = (item) => {
    setManagers([...managers, item])
    UserList.push(item);
  };

  return (
    <>
      <div className='filaUno'>
        <SearchManagers searchValue={searchValue} setSearchValue={setSearchValue}/>
        <ModalContainerAddUser add={addManagers}/>
      </div>
      <CardUser managers={searchedManagers} setManagers={setManagers}/>
    </>
  );
}

export default Managers;

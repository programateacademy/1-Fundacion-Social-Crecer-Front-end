import { useState, useEffect, useMemo } from 'react';
import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import AddButton from './AddButton.jsx';
import Header from '../../components/header/Header.jsx';
import users from '../../apis/index'

function Managers({onLogout, token}) {
  const [managers,setManagers ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('')

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

  useEffect(() => {
    getManagers();
  }, []);

  let quitAccent=function (cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }
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
 
/*   const addManagers = async(item) => {
     const json = await fetch ('/api/superadmin/admin', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(item),
    }).then(res => res.json())

    if (json.error) {
      alert(json.error)
    } else {
      const updatedManagers = [...managers, json];
      setManagers(updatedManagers);
    }
  }; */

  const editarUsuario = async (id, setUser, nuevoNombre, nuevoEmail, nuevaUnidad) => {
    try {
      const response = await fetch(`http://localhost:3001/api/manager/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nuevoNombre,
          email: nuevoEmail,
          unity: nuevaUnidad,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const usuariosActualizados = [...user];
        const usuarioIndex = usuariosActualizados.findIndex(
          (usuario) => usuario.docnum === id
        );
        usuariosActualizados[usuarioIndex].name = data.name;
        usuariosActualizados[usuarioIndex].email = data.email;
        usuariosActualizados[usuarioIndex].unity = data.unity;
        setUser(usuariosActualizados);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Header onLogout={onLogout} token={token}/>
      <div className='filaUno'>
        <SearchManagers searchValue={searchValue} setSearchValue={setSearchValue}/>
        <AddButton managers={managers}/>
      </div> 
      <CardUser 
        managers={searchedManagers} 
        setManagers={setManagers} 
        editManagers={editarUsuario} 
        /* eliminateManager={eliminateManager}  */
        loading={loading}/>
    </>
  );
}

export default Managers;

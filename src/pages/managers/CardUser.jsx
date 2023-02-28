export const numberF = Intl.NumberFormat("es-ES") 
import PasswordValidation from './PasswordValidation.jsx'
import modelUser from '../../assets/img/userImage.png';
import { useEffect } from 'react';
import { useState } from 'react';

export default function CardUser({managers, setManagers, editManagers, eliminateManager}) {
    const [dataBase, setDataBase] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        const json = await fetch('http://localhost:3001/api/manager')
          .then(res => res.json());
        setDataBase(json);
        setLoading(false);
      }
      fetchData();
    }, []);
  
    return (
      <div className="userCards">
        {loading ? (
          "Cargando ..."
        ) : (
          dataBase.map(values => {
            const { docnum, name, email, unity } = values;
            return (
              <div className="cardUser" key={docnum}>
                <div className="dataUser">
                  <div className="stringUser">
                    <div className="nameUser">{name}</div>
                    <div className="nameEmail">{email}</div>
                    <div className="idUser">{numberF.format(docnum)}</div>
                    <div className="nameEmail">{unity}</div>
                  </div>
                  <img className="imgUser" src={modelUser} alt="" />
                </div>
                <div className="profileUserButtons">
                  <button className="userButton">CAMBIAR CONTRASEÑA</button>
                  <PasswordValidation docnum={docnum} name={name} email={email} unity={unity} setManagers={setManagers} editManagers={editManagers} eliminateManager={eliminateManager}/>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  
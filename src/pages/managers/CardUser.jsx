export const numberF = Intl.NumberFormat("es-ES") 
import PasswordValidation from './PasswordValidation.jsx'
import modelUser from '../../assets/img/userImage.png';

export default function CardUser({managers, setManagers, editManagers, eliminateManager,loading}) {
    return (
      <div className="userCards">
        {loading ? (
          "Cargando ..."
        ) : (
          managers.map(values => {
            const { docnum, name, email, unity,_id} = values;
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
                  <PasswordValidation id={_id} docnum={docnum} name={name} email={email} unity={unity} setManagers={setManagers} editManagers={editManagers} eliminateManager={eliminateManager}/>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  
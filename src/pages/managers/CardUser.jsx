export const numberF = Intl.NumberFormat("es-ES") 
import PasswordValidation from './EditUser/EditUser'
import modelUser from '../../assets/img/userImage.png';
import ChangePassword from './ChangePassword/ChangePassword';
import EditUser from './EditUser/EditUser';

export default function CardUser({managers, setManagers,loading, getManagers}) {
    return (
      <div className="userCards">
        {loading ? (
          "Cargando ..."
        ) : (
          managers.map(values => {
            const { docnum, name, email, unity, _id} = values;
            return (
              <div className="cardUser">
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
                  <ChangePassword  email={email} setManagers={setManagers} getManagers={getManagers}/>
                  <EditUser id={_id} docnum={docnum} name={name} email={email} unity={unity} setManagers={setManagers} getManagers={getManagers}/>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  
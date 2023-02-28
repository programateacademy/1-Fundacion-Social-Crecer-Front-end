export const numberF = Intl.NumberFormat("es-ES") 
import PasswordValidation from './PasswordValidation.jsx'
import modelUser from '../../assets/img/userImage.png';

export default function CardUser({managers,setManagers, editManagers,eliminateManager}){
    return(
        <div className="userCards">
                {managers.map((values)=>{
                const {docnum,name,email,unity}=values;
                return(
                    <>
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
                                {/*<EditManagerContainerButton id={id} name={name} email={email} setManagers={setManagers} editManagers={editManagers} eliminateManager={eliminateManager}/>*/}
                                <PasswordValidation docnum={docnum} name={name} email={email} unity={unity} setManagers={setManagers} editManagers={editManagers} eliminateManager={eliminateManager}/>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

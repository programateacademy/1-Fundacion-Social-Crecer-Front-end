export const numberF = Intl.NumberFormat("es-ES") 
import EditManagerContainerButton from './EditManagerContainerButton.jsx'
export default function CardUser({managers,setManagers, editManagers}){
    return(
        <div className="userCards">
                {managers.map((values)=>{
                const {id,name,email,img}=values;
                return(
                    <>
                        <div className="cardUser" key={id}>
                            <div className="dataUser">
                                <div className="stringUser">
                                    <div className="nameUser">{name}</div>
                                    <div className="nameEmail">{email}</div>
                                    <div className="idUser">{numberF.format(id)}</div>
                                </div>
                                <img className="imgUser" src={img} alt="" />
                            </div>
                            <div className="profileUserButtons">
                                <button className="userButton">CAMBIAR CONTRASEÑA</button>
                                <EditManagerContainerButton id={id} name={name} email={email} setManagers={setManagers} editManagers={editManagers}/>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

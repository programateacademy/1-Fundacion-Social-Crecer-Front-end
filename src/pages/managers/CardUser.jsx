export const numberF = Intl.NumberFormat("es-ES") 

export default function CardUser({managers,setManagers}){
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
                                <button className="userButton">EDITAR PERFIL</button>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

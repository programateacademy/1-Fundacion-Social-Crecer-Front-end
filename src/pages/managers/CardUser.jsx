import React,{useState} from "react";
import UserList from "./UserList.jsx";

export default function CardUser(){
    const [data,setData]=useState(UserList);
    return(
        <div className="userCards">
                {data.map((values)=>{
                const {id,name,email,img}=values;
                return(
                    <>
                        <div className="cardUser" key={id}>
                            <div className="dataUser">
                                <div className="stringUser">
                                    <div className="nameUser">{name}</div>
                                    <div className="nameEmail">{email}</div>
                                    <div className="idUser">{id}</div>
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

import React, { useEffect, useState } from 'react'
import logo  from '../../assets/img/logo.svg';
import { FaUserAlt } from "react-icons/fa";
import './Header.css';
import { Link } from 'react-router-dom';
import users from "../../apis";
import { FiLogOut } from "react-icons/fi";

function Header({onLogout, token}) {
    const [user, setUser] = useState({})
    useEffect(() =>   {
        fetchData();
    },[])
    async function fetchData(){
        if (!token){
            onLogout()
        } else {
            const {data} = await users.get("/api/admin",
            {
                headers: {
                    'Authorization': token
                }
            })
        setUser(data.data.user)
        }
        console.log(data.data.user.name)
    }
    return (
        <div className='header'>
            <img className='elLogo' src={logo} alt='fundacionCrecer'/>
            <div className='buttonsHeader'>
                <button type="button" className="buttonHeader"><Link to='/matrix'>Inicio</Link></button>
                <button type="button" className="buttonHeader"><Link to='/managers'>Funcionarios</Link></button>
            </div>
            <div className='profile'>
                <span className='iconUser' ><FaUserAlt /></span>
                <div className='adminInfo'>
                    <h3>{user.name}</h3>
                    <h4>{user.role}</h4>
                </div> 
                <button onClick={()=>{onLogout()}}><FiLogOut/></button>
            </div>
        </div>
    )
}

export default Header
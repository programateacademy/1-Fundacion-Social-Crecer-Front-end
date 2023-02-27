import logo from '../../assets/img/logo.svg';
import { FaUserAlt } from "react-icons/fa";
import './Header.css';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import users from "../../apis/index";
import { useEffect, useState } from 'react';


function Header({ onLogout, token }) {
    const [userInfo, setUserInfo] = useState({})
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
            setUserInfo(data.data.user)
        }
    }
    return (
        <div className='header'>
            <img className='elLogo' src={logo} alt='fundacionCrecer' />
            <div className='buttonsHeader'>
                <button type="button" className="buttonHeader"><Link to='/matrix'>Inicio</Link></button>
                {userInfo && userInfo.role === 'superAdmin' && (
                    <button type="button" className="buttonHeader"><Link to='/managers'>Funcionarios</Link></button>
                )}
            </div>
            <div className='profile'>
                <span className='iconuserInfo' ><FaUserAlt /></span>
                {userInfo && (
                    <div className='adminInfo'>
                        <p>{userInfo.name}</p>
                        <p>{userInfo.role}</p>
                    </div>
                )}
                <button onClick={() => { onLogout() }}><FiLogOut /></button>
            </div>
        </div>
    )
}

export default Header
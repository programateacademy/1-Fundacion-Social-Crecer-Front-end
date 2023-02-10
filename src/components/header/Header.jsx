import React from 'react'
import logo  from '../../assets/img/logo.svg';
import { FaUserAlt } from "react-icons/fa";
import './Header.css';

function Header() {
    return (
        <div className='header'>
            <img className='elLogo' src={logo} alt='fundacionCrecer'/>
            <div className='buttonsHeader'>
                <button type="button" className="buttonHeader ">Inicio</button>
                <button type="button" className="buttonHeader">Funcionarios</button>
            </div>
            <div className='profile'>
                <span className='iconUser' ><FaUserAlt /></span>
                <div className='adminInfo'>
                    <span className='adminName'>Laura Montana</span>
                    <span className='adminProfile'>Administradora</span>
                </div> 
            </div>
        </div>
    )
}

export default Header
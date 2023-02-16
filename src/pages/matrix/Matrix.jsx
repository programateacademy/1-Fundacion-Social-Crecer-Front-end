import React, { useEffect, useState } from 'react'
import './Matrix.css'
import BeneficiariesTable from './table/BeneficiariesTable'
import AddBeneficiaries from './AddBeneficiaries'
import { BiSearch } from 'react-icons/bi';
import { FiLogOut } from "react-icons/fi";
import users from "../../apis";


function Matrix({onLogout, token}) {
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
    }
    
    return (
        <>
            <section className='top-table'>
                <h3>{user.name}</h3>
                <h3>{user.role}</h3>
                <AddBeneficiaries/>
                <div>
                  
                    <select name='select'>
                        <option hidden value='0'>Filtrar por:</option>
                        <option value='value2'>INACTIVO</option>
                    </select>
                    <input type="text" placeholder='Buscar'/>
                    <button><BiSearch/></button>
                    <button onClick={()=>{onLogout()}}><FiLogOut/></button>
                </div>
            </section>
            <BeneficiariesTable/>
        </>
    )
}

export default Matrix
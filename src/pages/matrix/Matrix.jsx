import React from 'react'
import './Matrix.css'
import BeneficiariesTable from './table/BeneficiariesTable'
import AddBeneficiaries from './AddBeneficiaries'
import { BiSearch } from 'react-icons/bi';
import Header from '../../components/header/Header'

function Matrix() {
    return (
        <>
            <Header/>
            <section className='top-table'>
                <AddBeneficiaries/>
                <div>
                    <select name='select'>
                        <option hidden value='0'>Filtrar por:</option>
                        <option value='value2'>INACTIVO</option>
                    </select>
                    <input type="text" placeholder='Buscar'/>
                    <button><BiSearch/></button>
                </div>
            </section>
            <BeneficiariesTable/>
        </>
    )
}

export default Matrix
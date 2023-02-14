import React from 'react'
import './Matrix.css'
import BeneficiariesTable from './table/BeneficiariesTable'
import AddBeneficiaries from './AddBeneficiaries'
import { BiSearch } from 'react-icons/bi';
import Header from '../../components/header/Header'
import Thead from './table/Thead';
import Tbody from './table/Tbody';


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
            <div className='table-head'>
            <table>
            <Thead />
            </table>
            </div>
            <BeneficiariesTable/>
        </>
    )
}

export default Matrix
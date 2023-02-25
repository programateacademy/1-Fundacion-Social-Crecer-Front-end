import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import Thead from './Thead'
import datas from '../../../apis/model'
import { useArrayContext } from '../../../context/context'


function BeneficiariesTable() {
  let data = useArrayContext();
    return (  
            
            <table className='prin-table'>
                <Thead trans= {true} />
                <tbody>
                {data.map( (item)  => 
                  <tr><Tbody data = {item}/></tr> )}
                </tbody>
            </table>

    )
}

export default BeneficiariesTable
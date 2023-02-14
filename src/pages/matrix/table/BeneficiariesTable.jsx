import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import Thead from './Thead'
import Test from './Test'
import data from '../../../apis/model'

function BeneficiariesTable() {

    return (  

            <table className='prin-table'>

                <Thead trans= {true} />
            {data.map( (item)  => 
              <tbody><Tbody data = {item}/></tbody> )}
            </table>

    )
}

export default BeneficiariesTable
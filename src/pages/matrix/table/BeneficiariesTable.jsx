import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import Thead from './Thead'
import Test from './Test'

function BeneficiariesTable() {

    return (  
        <section className='marix-table'>
            <table>
                <Thead />
                <tbody>
{/*                     <Test/> */}
                    <Tbody />
                </tbody>
            </table>
        </section>
    )
}

export default BeneficiariesTable
import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import Thead from './Thead'

function BeneficiariesTable() {

    return (  
        <section className='marix-table'>
            <table>
                <Thead />
                <tbody>
                    <Tbody />
                </tbody>
            </table>
        </section>
    )
}

export default BeneficiariesTable
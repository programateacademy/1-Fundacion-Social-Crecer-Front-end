import React from 'react'
import AddBeneficiaries from './AddBeneficiaries'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import Thead from './Thead'

function BeneficiariesTable() {

    return (  
        <section>
            <AddBeneficiaries />
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
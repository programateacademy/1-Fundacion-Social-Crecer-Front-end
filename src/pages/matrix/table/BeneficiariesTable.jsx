import React from 'react'
import './BeneficiariesTable.css'
import Thead from './Thead'
import Tbody from './Tbody'
import { useArrayContext } from '../../../context/context'


function BeneficiariesTable() {

  let data = useArrayContext();

  return (
    <>
    
      <Thead/>
      <Tbody/>
    </>
  )
}

export default BeneficiariesTable
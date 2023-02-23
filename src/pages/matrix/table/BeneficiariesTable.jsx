import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import { useArrayContext } from '../../../context/context'


function BeneficiariesTable() {
  //Esto no funciona de manera correcta
  // let data = useArrayContext();

  return (
      <Tbody/>
  )
}

export default BeneficiariesTable
import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import { useArrayContext } from '../../../context/context'


function BeneficiariesTable() {

  let data = useArrayContext();

  return (
      <Tbody/>
  )
}

export default BeneficiariesTable
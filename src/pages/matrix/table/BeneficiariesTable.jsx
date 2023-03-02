import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'
import { useArrayContext } from '../../../context/context'


function BeneficiariesTable({token}) {

  let data = useArrayContext();

  return (
    
      <Tbody token={token}/>
  )
}

export default BeneficiariesTable
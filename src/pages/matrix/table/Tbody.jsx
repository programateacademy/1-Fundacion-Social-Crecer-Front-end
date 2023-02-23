import React, { useState } from 'react'
import datas from '../../../apis/model'
import edit from '../../../assets/icons/edit.svg'

//Sacamos los nombres de las llaves de un beneficiario dummy, se convierte en array sacando las llaves con Object.keys
const beneficiariesNameValues = Object.keys(datas[2])
function Tbody() {
    const [beneficiaryData, setBeneficiaryData] = useState(datas)

    //  edit
    const onChangeInput = (e, numDoc) => {
        const { firstName, value } = e.target
        console.log('firstName', firstName)

        const editData = beneficiaryData.map((item) =>
            item.numDoc === numDoc && firstName ? { ...item, [firstName]: value } : item)
        console.log('editData', editData)
        setBeneficiaryData(editData)
    }
    return (
        <>
            <tbody>
                {beneficiaryData.map((beneficiary) => (
                    // numDoc identificador unico
                    // Key identificador de columnas
                    <tr key={beneficiary.numDoc}>
                        <td className='edit-button'>
                            <img src={edit} alt="" /> 
                        </td>
                        {/* Array de las propiedades de los beneficiarios */}
                        {beneficiariesNameValues.map((item) =>
                        // Key identificador de filas
                            <td key={item}>
                                <input
                                    name={item}
                                    // item es un string 
                                    // ej beneficiary.numDoc = beneficiary['numDoc']
                                    value={beneficiary[item]}
                                    type="text"
                                    placeholder={item}
                                    onChange={(e) => onChangeInput(e, beneficiary['numDoc'])}
                                />
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </>
    )
}

export default Tbody
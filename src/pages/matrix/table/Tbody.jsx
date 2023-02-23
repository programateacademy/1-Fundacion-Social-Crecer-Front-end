import React, { useState } from 'react'
import datas from '../../../apis/model'
import edit from '../../../assets/icons/edit.svg'
import './BeneficiariesTable.css'
import { useArrayContext, useSetArrayContext } from '../../../context/context';

//Sacamos los nombres de las llaves de un beneficiario dummy, se convierte en array sacando las llaves con Object.keys
const beneficiariesNameValues = Object.keys(datas[0])
function Tbody() {
    const array = useArrayContext();
    const setArray = useSetArrayContext();
    //  edit
    const onChangeInput = (e, numDoc) => {
        const { name, value } = e.target;
        // Verifica que el campo que se está actualizando existe en el objeto del beneficiario
        if (Object.keys(array[0]).includes(name)) {
            const editData = array.map((item) =>
             // Verifica si el numDoc de un beneficiario es igual al valor proporcionado en numDoc y si firstName es una cadena no vacía.
                item.numDoc === numDoc ? { ...item, [name]: value } : item
            );
            setArray(editData);
        }
    };
    return (
        <>
            <tbody>
                {array.map((beneficiary) => (
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
                                    onChange={(e) => onChangeInput(e, beneficiary.numDoc)}
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
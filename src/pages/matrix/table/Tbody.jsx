import React, { useState } from "react";
import datas from "../../../apis/model";
import edit from "../../../assets/icons/edit.svg";
import "./BeneficiariesTable.css";
import { useArrayContext, useSetArrayContext } from "../../../context/context";

//Sacamos los nombres de las llaves de un beneficiario dummy, se convierte en array sacando las llaves con Object.keys
const dummie = ()=> {
    delete datas[0].uuid
    return datas[0]
}
const beneficiariesNameValues = Object.keys(dummie());
function Tbody() {
    const array = useArrayContext();
    const setArray = useSetArrayContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    //  edit
    const onChangeInput = (e, uuid) => {
        const { name, value } = e.target;
        // Verifica que el campo que se está actualizando existe en el objeto del beneficiario
        if (Object.keys(array[0]).includes(name)) {
            const editData = array.map((item) =>
                // Verifica si el numDoc de un beneficiario es igual al valor proporcionado en numDoc y si firstName es una cadena no vacía.
                item.uuid === uuid ? { ...item, [name]: value } : item
            );
            setArray(editData);
        }
    };
    const handleEdit = (item) => {
        setIsEditing(true);
        setEditedItem(item);
    };

    const handleSave = (beneficiary) => {
        setIsEditing(false);
        setEditedItem(null);
        // SAve on db use uuid 
        localStorage.setItem("array", JSON.stringify(array));
    };
    return (
        <>
            <tbody>
                {array.map((beneficiary) => (
                    // numDoc identificador unico
                    // Key identificador de filas
                    <tr key={beneficiary.uuid}>
                        <td className="edit-button">
                            {!isEditing ? (
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(beneficiary)}
                                >
                                    <img src={edit} alt="" />
                                </button>
                            ) : (
                                <button onClick={() => handleSave(beneficiary)}>Guardar</button>
                            )}
                        </td>
                        {/* Array de las propiedades de los beneficiarios */}
                        {beneficiariesNameValues.map((item) => (
                            // Key identificador de columnas
                            <td key={item}>
                                {isEditing && editedItem.uuid === beneficiary.uuid ? (
                                    <input
                                        name={item}
                                        value={editedItem[item]}
                                        type="text"
                                        placeholder={item}
                                        onChange={(e) => {
                                            const newItem = editedItem;
                                            newItem[item] = e.target.value
                                            setEditedItem(  newItem);
                                            console.log(editedItem);
                                            onChangeInput(e,editedItem.uuid)
                                        }}

                                    
                                    />
                                ) : (
                                    beneficiary[item]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
}

export default Tbody;

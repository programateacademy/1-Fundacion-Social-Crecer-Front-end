import React, { useState } from "react";
import datas from "../../../apis/model";
import app from "../../../apis/index";
import edit from "../../../assets/icons/edit.svg";
import "./BeneficiariesTable.css";
import { useArrayContext, useSetArrayContext, useFilterContext } from "../../../context/context";


//Sacamos los nombres de las llaves de un beneficiario dummy, se convierte en array sacando las llaves con Object.keys

function Tbody({ token }) {
    const filter = useFilterContext();
    const array = filter[0] ? filter : useArrayContext();
    const setArray = useSetArrayContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    console.log(array)

    const dummy = () => {

        delete datas[0]._id
        return datas[0]
    }
    const beneficiariesNameValues = Object.keys(dummy());

    const dateKeys = ["joinDate", "exitDate", "birthDate", "guardianBirthdate", "fatherBirthdate", "motherBirthdate", "vaccinationVerificationDate", "vaccinationCardUpToDate",];
    const numberKeys = ["primaryPhone", "secundaryPhone", "householdStratum","gestationalAgeAtBirth", "weightAtBirth", "heightAtBirth", "exclusiveBreastfeedingDuration", "totalBreastfeedingDuration", "gestationWeeks", "ticketNumber"]
    const updateBeneficiary = async (id, beneficiary) => {
        const url = `/api/admin/beneficiary/${id}`;
        const config = {
            headers: {
                Authorization: token,
            },
        };
        try {
            const response = await app.put(url, beneficiary, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    //  edit
    const onChangeInput = (e, _id) => {
        const { name, value } = e.target;
        // Verifica que el campo que se está actualizando existe en el objeto del beneficiario
        if (Object.keys(array[0]).includes(name)) {
            const editData = array.map((item) =>
                // Verifica si el numDoc de un beneficiario es igual al valor proporcionado en numDoc y si firstName es una cadena no vacía.
                item._id === _id ? { ...item, [name]: value } : item
            );
            setArray(editData);
        }
    };
    const handleEdit = (item) => {
        setIsEditing(true);
        setEditedItem(item);
    };
    // Actualiza los datos en la base de datos y en el estado "array" cuando se hace clic en el botón "Guardar cambios"
    const handleSave = (beneficiary) => {
        setIsEditing(false);
        setEditedItem(null);
        // Actualiza los datos en la base de datos utilizando el método PUT
        updateBeneficiary(beneficiary._id, beneficiary)
            .then(() => {
                console.log("Beneficiaries updated successfully!");
            })
            .catch((error) => {
                console.log("Error updating beneficiaries:", error);
            });
    };

    console.log(datas[0])
    return (
        <>

            <tbody striped bordered hover>
                {array.map((beneficiary) => (
                    // numDoc identificador unico
                    // Key identificador de filas
                    <tr key={beneficiary._id}>
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
                                {isEditing && editedItem._id === beneficiary._id ? (
                                    <input
                                        name={item}
                                        value={editedItem[item]}
                                        type={dateKeys.includes(item) ? "date" : "text" && numberKeys.includes(item)? "number" : "text"}
                                        placeholder={item}
                                        onChange={(e) => {
                                            const newItem = editedItem;
                                            newItem[item] = e.target.value
                                            setEditedItem(newItem);
                                            console.log(editedItem);
                                            onChangeInput(e, editedItem._id)
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

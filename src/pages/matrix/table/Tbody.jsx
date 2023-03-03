import React, { useState } from "react";
import datas from "../../../apis/model";
import app from "../../../apis/index";
import edit from "../../../assets/icons/edit.svg";
import "./BeneficiariesTable.css";
import { useArrayContext, useSetArrayContext, useFilterContext } from "../../../context/context";



function Tbody({ token }) {
    //The useFilterContext() function is used to get the current filter for the context.
    const filter = useFilterContext();
    //Check if there is a filter. If so, the filter is used. If not, the current array context is used via the useArrayContext() function.
    const array = filter[0] ? filter : useArrayContext();
    //The useSetArrayContext() function is used to get the function that updates the state of the array in the context.
    const setArray = useSetArrayContext();
    //useState() is used to create a local "isEditing" state with an initial value of false.
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const dummy = () => {
        //Removes the _id property from the first element in the datas array.
        delete datas[0]._id
        return datas[0]
    }
    
    //initializes it with an array of the keys of the object returned by calling the dummy function
    const beneficiariesNameValues = Object.keys(dummy());
    //Array with the names of the input type date
    const dateKeys = ["joinDate", "exitDate", "birthDate", "guardianBirthdate", "fatherBirthdate", "motherBirthdate", "vaccinationVerificationDate", "vaccinationCardUpToDate",];
    //Array with the names of the input type number
    const numberKeys = ["primaryPhone", "secundaryPhone", "householdStratum", "gestationalAgeAtBirth", "weightAtBirth", "heightAtBirth", "exclusiveBreastfeedingDuration", "totalBreastfeedingDuration", "gestationWeeks", "ticketNumber"]
    //Selects from the table with their respective options
    const selectOptions = {
        curState: ['ACTIVO', 'INACTIVO'],
        otherExitReason:['MOTIVO 1','MOTIVO 2'],
        unityName:['EDUCANDO ANDO','SEMBRANDO ESPERANZA','ESPACIOS CREATIVOS','CRECER JUGANDO EN FAMILIA','CRECIENDO CON AMOR EN FAMILIA','MUNDO DE COLORES','LACITOS DE AMOR','MIS TERNURAS','CRECER Y CREAR 1','CRECER Y CREAR 2','EMPRENDEDORAS','MONACHOS','SEMILLITAS DE AMOR','SOÑADORAS','GUERRERAS CONSTRUYE','TRIUNFADORAS','GESTANDO FUTURO T3','GESTANDO FUTURO T2','GRAN BRITALIA T2','ABRAHAM LINCOLN T3','LOURDES','LA PEÑA','SANTA ROSA DE LIMA','CASA EGIPTO','SANTA BARBARA','FISCALIA','USME PUEBLO','SERRANIAS','VIRREY','SAN JUAN A','EL UVAL','TRIANGULO','LORENZO ALCANTUZ I SECTOR','M1 AMBA CHAKE','M2 GALAN','M3 EDUARDO SANTOS','M4 MUZUUN MUNDO MEJOR'],
        duoName:['HILANDO CAMINOS','TIHUAQUE','U1-VINCULOS DE AMOR','U1-VINCULOS DE AMOR VEREDAS','U2-MIS ANGELITOS','U3-SEMILLAS DE PAZ','U4-TEJIENDO SABERES','U5-GRANDES TALENTOS'],
        documentType:['RC','CC','TI','PEP','PASAPORTE','SIN DOCUMENTO','ANM','PPT'],
        gender:['FEMENINO','MASCULINO'],
        birthCountry:['COLOMBIA','VENEZUELA','ECUADOR','PERÚ','PANAMÁ','BRAZIL'],
        disability:['NO','SI'],
        certifiedDisability:['NO','SI'],
        disabilityCategory:['NINGUNA','FÍSICA','INTELECTUAL','PSICOSOCIAL','AUDITIVA','VISUAL','SORDO SEGUERA','MULTIPLE','SENSORIAL','SISTEMICA','VOZ Y HABLA','PIEL, PELO Y UÑAS'],
        disabilityRegistryEnrollment:['NO','SI'],
        requiresAssistance:['NO','SI'],
        requiresTechSupport:['NO','SI'],
        hasTechSupport:['NO','SI'],
        requiresTherapy:['NO','SI'],
        receivesTherapy:['NO','SI'],
        hasInterdictionProcess:['NO','SI'],
        countryOfResidence:['COLOMBIA'],
        residenceDepartment:['BOGOTÁ, D.C.'],
        locationZone:['CABECERA','RESTO'],
        headerType:['LOCALIDAD','COMUNA','NO APLICA'],
        householdStratum:['0','1','2','3'],
        groupEthnicity:['NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES','AFROCOLOMBIANO','INDÍGENA','RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA'],
        beneficiarySisbenized:['NO','SI'],
        sisbenScore:['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','B6','B7','C1','C2','C3','C4','C5','C6','C7'],
        belongsToFamiliesInAction:['NO','SI'],
        directlyAffectedByArmedConflict:['NO','SI'],
        focusingCriteria:['A','B','C','D','E','F','H','I','J','K','L','M','N','O'],
        justificationDocumentExists:['NO','SI'],
        guardianPersonType:['MADRE','PADRE','TÍO(A)','HERMANO(A)','ABUELO(A)','PADRASTRO','MADRASTRA','CONYUGUE','AMIGO(A)','OTRO'],
        guardianDocumentType:['CC','TI','PEP','PASAPORTE','SIN DOCUMENTO'],
        guardianBirthCountry:['COLOMBIA','VENEZUELA','ECUADOR','PERÚ','PANAMÁ','BRAZIL'],
        fatherDocumentType:['CC','TI','PEP','PASAPORTE','SIN DOCUMENTO'],
        fatherBirthCountry:['COLOMBIA','VENEZUELA','ECUADOR','PERÚ','PANAMÁ','BRAZIL'],
        motherDocumentType:['CC','TI','PEP','PASAPORTE','SIN DOCUMENTO'],
        motherBirthCountry:['COLOMBIA','VENEZUELA','ECUADOR','PERÚ','PANAMÁ','BRAZIL'],
        regime:['NO SE ENCUENTRA AFILIADO','SUBSIDIADO','CONTRIBUTIVO','ESPECIAL'],
        eps: ['NO SE ENCUENTRA AFILIADO','AIC-EPSI','ALIANSALUD EPS','AMBUQ EPS','ANAS WAYUU','ASMET SALUD EPS','CAJACOPI EPS','CAPITAL SALUD EPS','CAPRESOCA EPS','COMFACHOCÓ EPS','COMFACOR','COMFAGUAJIRA','COMFAMILIAR CARTAGENA','COMFAMILIAR EPS','COMFAMILIAR NARIÑO','COMPARTA EPS','COMPENSAR','CONFAORIENTE EPS','CONFASUCRE','CONVIDA EPS','COOSALUD','DUASAKAWI EPSI','ECOOPSOS','EMSSANAR EPS','EPS SANITAS','FAMISANAR EPS','MALLAMAS EPS INDÍGENA','MEDIMÁS EPS','MUTUAL SER','NUEVA EPS','PIJAOS SALUD','SALUD TOTAL EPS','SAVIA SALUD EPS','SURA EPS'],
        hasVaccinationCard:['NO','SI'],
        vaccinationCardUpToDate:['NO','SI'],
        hasGrowthAndDevelopmentCard:['NO','SI'],
        prematurenessBackground: ['NO','SI'],
        under40Weeks: ['NA','NO','SI'],
        exclusivelyBreastfeeding: ['NO','SI']
    }
    //Asynchronous function to fetch the beneficiary data and make the HTTP PUT request
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

    const onChangeInput = (e, _id) => {
        const { name, value } = e.target;
        //  Verify that the field being updated exists in the payee object
        if (Object.keys(array[0]).includes(name)) {
            const editData = array.map((item) =>
            //Checks if a beneficiary's _id is equal to the value provided in _id and if the name is a non-empty string.
                item._id === _id ? { ...item, [name]: value } : item
            );
            setArray(editData);
        }
    };
    const handleEdit = (item) => {
        setIsEditing(true);
        setEditedItem(item);
    };
   // Updates the data in the database and in the "array" state when the "Save Changes" button is clicked
    const handleSave = (beneficiary) => {
        setIsEditing(false);
        setEditedItem(null);
        updateBeneficiary(beneficiary._id, beneficiary)
            .then(() => {
                console.log("Beneficiaries updated successfully!");
            })
            .catch((error) => {
                console.log("Error updating beneficiaries:", error);
            });
    };

    return (
        <>

            <tbody className="prin-table">
            
                {array.map((beneficiary) => (
                   // Key row identifier
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
                     {/* Array of beneficiary properties */}
                        {beneficiariesNameValues.map((item) => (
                            <td key={item}>
                                {isEditing && editedItem._id === beneficiary._id ? (
                                    // Check if the current element is a select
                                    selectOptions[item] ? (
                                        <select
                                            name={item}
                                            value={editedItem[item]}
                                            onChange={(e) => {
                                                const newItem = editedItem;
                                                newItem[item] = e.target.value;
                                                setEditedItem(newItem);
                                                onChangeInput(e, editedItem._id);
                                            }}
                                        >
                                            {selectOptions[item].map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            name={item}
                                            value={editedItem[item]}
                                            type={dateKeys.includes(item) ? "date" : numberKeys.includes(item) ? "number" : "text"}
                                            placeholder={item}
                                            onChange={(e) => {
                                                const newItem = editedItem;
                                                newItem[item] = e.target.value;
                                                setEditedItem(newItem);
                                                onChangeInput(e, editedItem._id);
                                            }}
                                        />
                                    )
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

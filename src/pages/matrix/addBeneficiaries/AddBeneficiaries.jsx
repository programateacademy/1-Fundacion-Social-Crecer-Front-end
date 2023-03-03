import { useEffect, useState, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import 'react-tabs/style/react-tabs.css';
import './AddBeneficiaries.css';
import Modal from 'react-bootstrap/Modal';
// 
import app from '../../../apis/index'
// API 'Sector Catastral Bogotá D.C.'
import neighborhoods from '../../../apis/SECTOR.json';
// Add Beneficiaries Schema
import addBeneficiariesSchema from "./newBeneficiarySchema";


function AddBeneficiaries({token}) {
// ---------------------- Modal states
const [show, setShow] = useState(false);
const handleClose = _=> setShow(false);
const handleShow = _=> setShow(true);

// ---------------------- Apis states
const [departments, setDepartments] = useState([]);
const [localities, setLocalities] = useState([]);

// ---------------------- Contains the modifing fetch API
const [municipalities, setMunicipalities] = useState();
const [municipalitiesAttendant, setMunicipalitiesAttendant] = useState([]);
const [municipalitiesFather, setMunicipalitiesFather] = useState([]);
const [municipalitiesMother, setMunicipalitiesMother] = useState([]);

// ---------------------- Current State - has to have a default value for the relation between the department
const [curDepartment, setCurDepartment] = useState(''); 
const [curDepartmentAttendant, setCurDepartmentAttendant] = useState('');
const [curDepartmentFather, setCurDepartmentFather] = useState('');
const [curDepartmentMother, setCurDepartmentMother] = useState('');

// ---------------------- State that controls and stores form data (add Beneficiaries form)
const [form, setForm] = useState(addBeneficiariesSchema);

// ---------------------- Form tabs
const [tabIndex, setTabIndex] = useState(0);
const tabListRef = useRef(0);

// ---------------------- addBeneficiaries post function
const addBeneficiary = async (e) => {
    e.preventDefault();
    try {
        console.log(token)
        await app.post('/api/admin/beneficiary', form ,{
            headers: {
                Authorization: token
            }
            })
            .then(_=>{alert('Beneficiario añadido'); resetForm(); setShow(false); setTabIndex(0);})
            .catch((error)=>alert(JSON.stringify(error.response.data.message)))
    }catch (error){
        console.log(alert(error))
    }
} 

    // ---------------------- We request the APIs used for selects
    const fetchApis = async _=> {
        try {
            /* Departments */
            const resDepartments = await app.get('/api/formapi/departamento')
            setDepartments(resDepartments.data);
            // Municipalities - Depending on the department code, make the query to the municipality belonging to that department
            // Beneficiary
            const resMunicipalities = await app.get(`/api/formapi/municipio?codigo_departamento=${curDepartment}`);
            setMunicipalities(resMunicipalities.data);
            // Attendant
            const resMunicipalitiesAttendant = await app.get(`/api/formapi/municipio?codigo_departamento=${curDepartmentAttendant}`);
            setMunicipalitiesAttendant(resMunicipalitiesAttendant.data);
            // Father
            const resMunicipalitiesFather = await app.get(`/api/formapi/municipio?codigo_departamento=${curDepartmentFather}`);
            setMunicipalitiesFather(resMunicipalitiesFather.data);
            // Mother
            const resMunicipalitiesMother = await app.get(`/api/formapi/municipio?codigo_departamento=${curDepartmentMother}`);
            setMunicipalitiesMother(resMunicipalitiesMother.data);
            // Localities
            const resLocalities = await fetch('https://datosabiertos.bogota.gov.co/dataset/856cb657-8ca3-4ee8-857f-37211173b1f8/resource/497b8756-0927-4aee-8da9-ca4e32ca3a8a/download/loca.json');
            const resLocalitiesJSON = await resLocalities.json();
            setLocalities(resLocalitiesJSON);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(_=> {
        //Perform the first fetch of all APIs on page load
        fetchApis();
    }, []);
    useEffect(_=> {
        //Updates the info when the variables inside the array have been modified
        fetchApis();
    }, [curDepartment, curDepartmentAttendant, curDepartmentFather, curDepartmentMother]);


useEffect(_=> {
    //Perform the first fetch of all APIs on page load
    fetchApis();
}, []);
useEffect(_=> {
    //Updates the info when the variables inside the array have been modified
    fetchApis();
}, [curDepartment,curDepartmentAttendant,curDepartmentFather,curDepartmentMother]);

// ------------------------- Form tabs button navegation
const handleButtonClick = (index) => {
    setTabIndex(index);
    tabListRef.current.focus();
};

// ------------------------- Neighborhoods alphabetic organization
neighborhoods.features.sort((a, b) => {
    if (a.properties.SCANOMBRE < b.properties.SCANOMBRE) {
        return -1;
    }
    if (a.properties.SCANOMBRE > b.properties.SCANOMBRE) {
        return 1;
    }
        return 0;
});

// ------------------------- Add Beneficiaries functions
// Set form to default values
const resetForm = _=>{
    setForm(addBeneficiariesSchema);
}
// Save the data in the form as text
const handleInput = e=>{
    let {name, value} = e.target;
    let newForm = {...form, [name]: value.toUpperCase()};
    setForm(newForm);
};
// Save the data in the form as number
const handleInputNum = e=>{
    let {name, value} = e.target;
    let newForm = {...form, [name]: parseInt(value)};
    setForm(newForm);
};

// ------------------------- Protect page load when pressing submit button
const handleSubmit = e=>{
    e.preventDefault();
}

return (
<>
    <button
        className='addUser'
        variant='primary'
        onClick={handleShow}
    >
        <span className='iconAddUser'>
            <IoIosAddCircleOutline />
        </span>
        <span className='createUser'>Añadir Beneficiario</span>
    </button>
    {/* MODAL */}
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-xl modal-dialog-centered'
    >
        <Modal.Header closeButton onClick={_=>{resetForm();setTabIndex(0);}}>
            <Modal.Title id='example-custom-modal-styling-title'>
                <h3>AÑADIR BENEFICIARIO</h3>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-dialog-scrollable d-flex flex-wrap input-modal'>
        <form onSubmit={e=>handleSubmit(e)}>
            <Tabs
                selectedIndex={tabIndex}
                onSelect={index=>setTabIndex(index)}
            >
                <TabList>
                    <Tab>Beneficiario</Tab>
                    <Tab>Acudiente</Tab>
                    <Tab>Padre</Tab>
                    <Tab>Madre</Tab>
                    <Tab>Historia Medica</Tab>
                </TabList>
                    {/* Beneficirie Info*/}
                    <TabPanel className='d-flex flex-wrap flex-gap'>
                        <div>
                            <label>NÚMERO DE DOCUMENTO*</label>
                            <input onChange={handleInput} name='numDoc' type='text' value={form.numDoc} required/>
                        </div>
                        <div>
                            <label>¿ACTIVO O INACTIVO?*</label>
                            <select onChange={handleInput} name='curState'>
                                <option value={form.curState} hidden>{form.curState}</option>
                                <option value='ACTIVO'>ACTIVO</option>
                                <option value='INACTIVO'>INACTIVO</option>
                            </select>
                        </div>
                        <div>
                            <label>FECHA DE INGRESO*</label>
                            <input onChange={handleInput} name='joinDate' type='date' value={form.joinDate} required/>
                        </div>
                        <div>
                            <label>FECHA DE EGRESO</label>
                            <input onChange={handleInput} placeholder='DD-MM-AAAA' name='exitDate' type='date' value={form.exitDate}/>
                        </div>
                        <div>
                            <label>INGRESA POR</label>
                            <textarea onChange={handleInput} name='enterBy' id='' cols='30' rows='10'>{form.enterBy}</textarea>
                        </div>
                        <div>
                            <label>MOTIVO DE EGRESO</label>
                            <textarea onChange={handleInput} name='reasonForExit' id='' cols='30' rows='10'>{form.reasonForExit}</textarea>
                        </div>
                        <div>
                            <label>SI EL MOTIVO DE EGRESO ES 'OTRO', INDIQUE EL PORQUÉ</label>
                            <select onChange={handleInput} name='otherExitReason'>
                                <option value={form.otherExitReason} hidden>{form.otherExitReason}</option>
                                <option value='MOTIVO 1'>MOTIVO 1</option>
                                <option value='MOTIVO 2'>MOTIVO 2</option>
                            </select>
                        </div>
                        <div>
                            <label>UNIDAD*</label>
                            <select onChange={handleInput} name='unityName' required>
                                <option value={form.unityName} hidden>{form.unityName}</option>
                                <option value='EDUCANDO ANDO'>EDUCANDO ANDO</option>
                                <option value='SEMBRANDO ESPERANZA'>SEMBRANDO ESPERANZA</option>
                                <option value='ESPACIOS CREATIVOS'>ESPACIOS CREATIVOS</option>
                                <option value='CRECER JUGANDO EN FAMILIA'>CRECER JUGANDO EN FAMILIA</option>
                                <option value='CRECIENDO CON AMOR EN FAMILIA'>CRECIENDO CON AMOR EN FAMILIA</option>
                                <option value='MUNDO DE COLORES'>MUNDO DE COLORES</option>
                                <option value='LACITOS DE AMOR'>LACITOS DE AMOR</option>
                                <option value='MIS TERNURAS'>MIS TERNURAS</option>
                                <option value='CRECER Y CREAR 1'>CRECER Y CREAR 1</option>
                                <option value='CRECER Y CREAR 2'>CRECER Y CREAR 2</option>
                                <option value='EMPRENDEDORAS'>EMPRENDEDORAS</option>
                                <option value='MONACHOS'>MONACHOS</option>
                                <option value='SEMILLITAS DE AMOR'>SEMILLITAS DE AMOR</option>
                                <option value='SOÑADORAS'>SOÑADORAS</option>
                                <option value='GUERRERAS CONSTRUYE'>GUERRERAS CONSTRUYE</option>
                                <option value='TRIUNFADORAS'>TRIUNFADORAS</option>
                                <option value='GESTANDO FUTURO T3'>GESTANDO FUTURO T3</option>
                                <option value='GESTANDO FUTURO T2'>GESTANDO FUTURO T2</option>
                                <option value='GRAN BRITALIA T2'>GRAN BRITALIA T2</option>
                                <option value='ABRAHAM LINCOLN T3'>ABRAHAM LINCOLN T3</option>
                                <option value='LOURDES'>LOURDES</option>
                                <option value='LA PEÑA'>LA PEÑA</option>
                                <option value='SANTA ROSA DE LIMA'>SANTA ROSA DE LIMA</option>
                                <option value='CASA EGIPTO'>CASA EGIPTO</option>
                                <option value='SANTA BARBARA'>SANTA BARBARA</option>
                                <option value='FISCALIA'>FISCALIA</option>
                                <option value='USME PUEBLO'>USME PUEBLO</option>
                                <option value='SERRANIAS'>SERRANIAS</option>
                                <option value='VIRREY'>VIRREY</option>
                                <option value='SAN JUAN A'>SAN JUAN A</option>
                                <option value='EL UVAL'>EL UVAL</option>
                                <option value='TRIANGULO'>TRIANGULO</option>
                                <option value='LORENZO ALCANTUZ I SECTOR'>LORENZO ALCANTUZ I SECTOR</option>
                                <option value='M1 AMBA CHAKE'>M1 AMBA CHAKE</option>
                                <option value='M2 GALAN'>M2 GALAN</option>
                                <option value='M3 EDUARDO SANTOS'>M3 EDUARDO SANTOS</option>
                                <option value='M4 MUZUUN MUNDO MEJOR'>M4 MUZUUN MUNDO MEJOR</option>
                            </select>
                        </div>
                        <div>
                            <label>DUPLA*</label>
                            <select name='duoName' onChange={handleInput} required>
                                <option value={form.duoName} hidden>{form.duoName}</option>
                                <option value='HILANDO CAMINOS'>HILANDO CAMINOS</option>
                                <option value='TIHUAQUE'>TIHUAQUE</option>
                                <option value='U1-VINCULOS DE AMOR'>U1-VINCULOS DE AMOR</option>
                                <option value='U1-VINCULOS DE AMOR VEREDAS'>U1-VINCULOS DE AMOR VEREDAS</option>
                                <option value='U2-MIS ANGELITOS'>U2-MIS ANGELITOS</option>
                                <option value='U3-SEMILLAS DE PAZ'>U3-SEMILLAS DE PAZ</option>
                                <option value='U4-TEJIENDO SABERES'>U4-TEJIENDO SABERES</option>
                                <option value='U5-GRANDES TALENTOS'>U5-GRANDES TALENTOS</option>
                            </select>
                        </div>
                        <div>
                            <label>DOCENTE*</label>
                            <input type='text' name='teachers' onChange={handleInput} value={form.teachers}/>
                        </div>
                        <div>
                            <label>TIPO DE DOCUMENTO*</label>
                            <select name='documentType' onChange={handleInput}>
                                <option value={form.documentType} hidden>{form.documentType}</option>
                                <option value='RC'>RC</option>
                                <option value='CC'>CC</option>
                                <option value='TI'>TI</option>
                                <option value='PEP'>PEP</option>
                                <option value='PASAPORTE'>PASAPORTE</option>
                                <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                                <option value='ANM'>ANM</option>
                                <option value='PPT'>PPT</option>
                            </select>
                        </div>
                        <div>
                            <label>PRIMER NOMBRE*</label>
                            <input type='text' name='firstName' onChange={handleInput} value={form.firstName} required/>
                        </div>
                        <div>
                            <label>SEGUNDO NOMBRE</label>
                            <input type='text' name='secondName' onChange={handleInput} value={form.secondName}/>
                        </div>
                        <div>
                            <label>PRIMER APELLIDO*</label>
                            <input type='text' name='firstLastName' onChange={handleInput} value={form.firstLastName} required/>
                        </div>
                        <div>
                            <label>SEGUNDO APELLIDO</label>
                            <input type='text' name='secondLastName' onChange={handleInput} value={form.secondLastName}/>
                        </div>
                        <div>
                            <label>FECHA DE NACIMIENTO*</label>
                            <input type='date' name='birthDate' onChange={handleInput} value={form.birthDate} required/>
                        </div>
                        <div>
                            <label>GÉNERO*</label>
                            <select name='gender' onChange={handleInput}>
                                <option value={form.gender} hidden>{form.gender}</option>
                                <option value='FEMENINO'>FEMENINO</option>
                                <option value='MASCULINO'>MASCULINO</option>
                            </select>
                        </div>
                        <div>
                            <label>PAÍS DE NACIMIENTO*</label>
                            <select name='birthCountry' onChange={handleInput}>
                                <option value={form.birthCountry} hidden>{form.birthCountry}</option>
                                <option value='COLOMBIA'>COLOMBIA</option>
                                <option value='VENEZUELA'>VENEZUELA</option>
                                <option value='ECUADOR'>ECUADOR</option>
                                <option value='PERÚ'>PERÚ</option>
                                <option value='PANAMÁ'>PANAMÁ</option>
                                <option value='BRAZIL'>BRAZIL</option>
                            </select>
                        </div>
                        {/* DEPARTMENTS */}
                        <div>
                            <label>DEPARTAMENTO DE NACIMIENTO</label>
                            <select
                                name='birthDepartment'
                                onChange={(e) => {
                                    setCurDepartment(e.target.value);
                                    handleInput(e);
                                }}
                            >
                                <option value={form.birthDepartment} hidden>{form.birthDepartment}</option>
                                {!departments
                                    ? 'Cargando'
                                    : departments.map((department) => {
                                        return (
                                            <option
                                                key={department.NOMBRE_DEPARTAMENTO}
                                                value={department.CODIGO_DEPARTAMENTO}
                                                data-key={department.NOMBRE_DEPARTAMENTO}
                                            >
                                                {department.NOMBRE_DEPARTAMENTO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* MUNICIPALITIES */}
                        <div>
                            <label>MUNICIPIO DE NACIMIENTO</label>
                            <select name='birthMunicipality' onChange={handleInput}>
                                <option value={form.birthMunicipality} hidden>{form.birthMunicipality}</option>
                                {!municipalities
                                    ? 'Cargando'
                                    : municipalities.map((municipality) => {
                                        return (
                                            <option
                                                key={municipality.NOMBRE_MUNICIPIO}
                                                value={municipality.CODIGO_MUNICIPIO}
                                            >
                                                {municipality.NOMBRE_MUNICIPIO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div>
                            <label>DISCAPACIDAD*</label>
                            <select name='disability' onChange={handleInput}>
                                <option value={form.disability} hidden>{form.disability}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>DISCAPACIDAD CERTIFICADA</label>
                            <select name='certifiedDisability' onChange={handleInput}>
                                <option value={form.certifiedDisability} hidden>{form.certifiedDisability}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>ENTIDAD QUE CERTIFICA LA DISCAPACIDAD</label>
                            <input type='text' name='entityCertifiesDisability' onChange={handleInput} value={form.entityCertifiesDisability}/>
                        </div>
                        <div>
                            <label>CATEGORÍA DE LA DISCAPACIDAD</label>
                            <select name='disabilityCategory' onChange={handleInput}>
                                <option value={form.disabilityCategory} hidden>{form.disabilityCategory}</option>
                                <option value='NINGUNA'>NINGUNA</option>
                                <option value='FÍSICA'>FÍSICA</option>
                                <option value='INTELECTUAL'>INTELECTUAL</option>
                                <option value='PSICOSOCIAL'>PSICOSOCIAL</option>
                                <option value='AUDITIVA'>AUDITIVA</option>
                                <option value='VISUAL'>VISUAL</option>
                                <option value='SORDO SEGUERA'>SORDO SEGUERA</option>
                                <option value='MULTIPLE'>MULTIPLE</option>
                                <option value='SENSORIAL'>SENSORIAL</option>
                                <option value='SISTEMICA'>SISTEMICA</option>
                                <option value='VOZ Y HABLA'>VOZ Y HABLA</option>
                                <option value='PIEL, PELO Y UÑAS'>PIEL, PELO Y UÑAS</option>
                            </select>
                        </div>
                        <div>
                            <label>ESPECIFICAR LA DISCAPACIDAD</label>
                            <input type='text' name='specifiedDisability' onChange={handleInput} value={form.specifiedDisability}/>
                        </div>
                        <div>
                            <label>¿ESTÁ INSCRITO EN EL REGISTRO PARA LA LOCALIZACIÓN Y CARACTERIZACIÓN DE PERSONAS CON DISCAPACIDAD?</label>
                            <select name='disabilityRegistryEnrollment' onChange={handleInput}>
                                <option value={form.disabilityRegistryEnrollment} hidden>{form.disabilityRegistryEnrollment}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>¿REQUIERE LA AYUDA DE OTRA PERSONA?</label>
                            <select name='requiresAssistance' onChange={handleInput}>
                                <option value={form.requiresAssistance} hidden>{form.requiresAssistance}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>¿REQUIERE AYUDA TÉCNICA / PRODUCTO DE APOYO?</label>
                            <select name='requiresTechSupport' onChange={handleInput}>
                                <option value={form.requiresTechSupport} hidden>{form.requiresTechSupport}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                ¿CUENTA CON LA AYUDA TÉCNICA / PRODUCTO DE APOYO?
                            </label>
                            <select name='hasTechSupport' onChange={handleInput}>
                                <option value={form.hasTechSupport} hidden>{form.hasTechSupport}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>¿REQUIERE TERAPIA Y/O REHABILITACIÓN?</label>
                            <select name='requiresTherapy' onChange={handleInput}>
                                <option value={form.requiresTherapy} hidden>{form.requiresTherapy}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>RECIBE ATENCIÓN EN TERAPIA Y/O REHABILITACIÓN?</label>
                            <select name='receivesTherapy' onChange={handleInput}>
                                <option value={form.receivesTherapy} hidden>{form.receivesTherapy}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>TIENE PROCESO DE INTERDICCIÓN?</label>
                            <select name='hasInterdictionProcess' onChange={handleInput}>
                                <option value={form.hasInterdictionProcess} hidden>{form.hasInterdictionProcess}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>PAÍS DE RESIDENCIA</label>
                            <select name='countryOfResidence' onChange={handleInput}>
                                <option value={form.countryOfResidence} hidden>{form.countryOfResidence}</option>
                                <option value='COLOMBIA'>COLOMBIA</option>
                            </select>
                        </div>
                        <div>
                            <label>DEPARTAMENTO DE RESIDENCIA</label>
                            <select name='residenceDepartment' onChange={handleInput}>
                                    <option value={form.residenceDepartment} hidden>{form.residenceDepartment}</option>
                                <option value='BOGOTÁ, D.C.'>BOGOTÁ, D.C.</option>
                            </select>
                        </div>
                        <div>
                            <label>ZONA DE UBICACIÓN</label>
                            <select name='locationZone' onChange={handleInput}>
                                <option value={form.locationZone} hidden>{form.locationZone}</option>
                                <option value='CABECERA'>CABECERA</option>
                                <option value='RESTO'>RESTO</option>
                            </select>
                        </div>
                        <div>
                            <label>TIPO DE CABECERA</label>
                            <select name='headerType' onChange={handleInput}>
                                <option value={form.headerType} hidden>{form.headerType}</option>
                                <option value='LOCALIDAD'>LOCALIDAD</option>
                                <option value='COMUNA'>COMUNA</option>
                                <option value='NO APLICA'>NO APLICA</option>
                            </select>
                        </div>
                        {/* LOCATIONS BY CITY */}
                        <div>
                            <label>NOMBRE LOCALIDAD/COMUNAS/NOMBRE DE ZONA RESTO</label>
                            <select name='localityName' onChange={handleInput}>
                                {!localities.features
                                    ? 'Cargando'
                                    : localities.features.map((feature) => {
                                        return (
                                            <option
                                                key={feature.attributes.LocNombre}
                                                value={feature.attributes.LocNombre}
                                            >
                                                {feature.attributes.LocNombre}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* NEIGHBORHOODS SEARCH*/}
                        <div>
                            <label>BARRIO*</label>
                            <div>
                                <select name='neighborhood' onChange={handleInput}>
                                <option value={form.neighborhood} hidden>{form.neighborhood}</option>
                                    {!neighborhoods.features
                                        ? 'Cargando'
                                        : neighborhoods.features.map((neighborhood) => {
                                            return (
                                                <option
                                                    key={neighborhood.properties.SCACODIGO}
                                                    value={neighborhood.properties.SCANOMBRE}
                                                >
                                                    {neighborhood.properties.SCANOMBRE}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>NOMBRE DE LA ZONA RESTO</label>
                            <input type='text' name='foreignZoneName' onChange={handleInput} value={form.foreignZoneName}/>
                        </div>
                        <div>
                            <label>DIRECCIÓN</label>
                            <textarea name='address' onChange={handleInput} id=' ' cols='30 ' rows='10' value={form.address} required></textarea>
                        </div>
                        <div>
                            <label>TELEFONO PRINCIPAL*</label>
                            <input name='primaryPhone' onChange={handleInputNum} type='number' value={form.primaryPhone} required/>
                        </div>
                        <div>
                            <label>TELEFONO SECUNDARIO</label>
                            <input name='secundaryPhone' onChange={handleInputNum} value={form.secundaryPhone} type='number' />
                        </div>
                        <div>
                            <label>ESTRATO DE HOGAR*</label>
                            <select name='householdStratum' onChange={handleInputNum}>
                                <option value={form.householdStratum} hidden>{form.householdStratum}</option>
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                            </select>
                        </div>
                        <div>
                            <label>GRUPO ÉTNICO</label>
                            <select name='groupEthnicity' onChange={handleInput}>
                                <option value={form.groupEthnicity} hidden>{form.groupEthnicity}</option>
                                <option value='NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES'>NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES</option>
                                <option value='AFROCOLOMBIANO'>AFROCOLOMBIANO</option>
                                <option value='INDÍGENA'>INDÍGENA</option>
                                <option value='RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA'> RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA</option>
                            </select>
                        </div>
                        <div>
                            <label>BENEFICIARIO SISBENIZADO</label>
                            <select name='beneficiarySisbenized' onChange={handleInput}>
                                <option value={form.beneficiarySisbenized} hidden>{form.beneficiarySisbenized}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>PUNTAJE SISBEN</label>
                            <select name='sisbenScore' onChange={handleInput}>
                                <option value={form.sisbenScore} hidden>{form.sisbenScore}</option>
                                <option value='A1'>A1</option>
                                <option value='A2'>A2</option>
                                <option value='A3'>A3</option>
                                <option value='A4'>A4</option>
                                <option value='A5'>A5</option>
                                <option value='B1'>B1</option>
                                <option value='B2'>B2</option>
                                <option value='B3'>B3</option>
                                <option value='B4'>B4</option>
                                <option value='B5'>B5</option>
                                <option value='B6'>B6</option>
                                <option value='B7'>B7</option>
                                <option value='C1'>C1</option>
                                <option value='C2'>C2</option>
                                <option value='C3'>C3</option>
                                <option value='C4'>C4</option>
                                <option value='C5'>C5</option>
                                <option value='C6'>C6</option>
                                <option value='C7'>C7</option>
                            </select>
                        </div>
                        <div>
                            <label>PERTENECE A FAMILIAS EN ACCIÓN</label>
                            <select name='belongsToFamiliesInAction' onChange={handleInput}>
                                <option value={form.belongsToFamiliesInAction} hidden>{form.belongsToFamiliesInAction}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                EL BENEFICIARIO HA SIDO VICTIMA DIRECTA CONFLICTO ARMADO
                            </label>
                            <select name='directlyAffectedByArmedConflict' onChange={handleInput}>
                                <option value={form.directlyAffectedByArmedConflict} hidden>{form.directlyAffectedByArmedConflict}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div className='long-select'>
                            <label>CRITERIOS DE FOCALIZACIÓN</label>
                            <div>
                                <div className='d-flex flex-row justify-content-between m-0 letter-select'>
                                    <span flow='up'
                                    tooltip='Pertenecientes a hogares con puntaje SISBEN'>
                                        A
                                    </span>
                                    <span flow='up'
                                    tooltip='Pertenecientes a familias identificadas a través de la Estrategia para la Superación de la Pobreza Extrema – Red UNIDOS.'>
                                        B
                                    </span>
                                    <span flow='up'
                                    tooltip='Niñas, niños y mujeres gestantes pertenecientes al programa Familias en Acción de Prosperidad Social.'>
                                        C
                                    </span>
                                    <span flow='up'
                                    tooltip='Niñas y niños egresados de la estrategia de atención y prevención de la desnutrición aguda (Centros de Recuperación Nutricional -CRN- y 1000 días para cambiar el mundo y unidades de búsqueda activa).'>
                                        D
                                    </span>
                                    <span flow='up'
                                    tooltip='Remitidos por las entidades del Sistema Nacional de Bienestar Familiar -SNBF- que se encuentren en situación de vulnerabilidad, riesgo de vulneración de derechos o programas de protección del ICBF.'>
                                        E
                                    </span>
                                    <span flow='up'
                                    tooltip='Víctimas de hechos violentos asociados al conflicto armado, de acuerdo con las directrices establecidas en la Ley 1448 de 2011 y los Decretos ley 4633, 4634 y 4635 de 2011, así como la Sentencia T-025 de 2004 proferida por la Corte Constitucional y demás desarrollos jurisprudenciales en torno a la existencia de un estado de cosas inconstitucional; para lo cual se considerarán aquellos cuyo estado se encuentre incluido dentro del RUV.'>
                                        F
                                    </span>
                                    <span flow='up'
                                    tooltip='Pertenecientes a comunidades étnicas (indígenas, comunidades negras, afrocolombianas, Palenqueros, Raizales y Rrom), que demanden el servicio.'>
                                        G
                                    </span>
                                    <span flow='up'
                                    tooltip='Niños y niñas con discapacidad que requieren diversos tipos de apoyo para su participación efectiva y que demandan acompañamiento en las actividades de cuidado; así como los que sean remitidos por las entidades del SNBF con base en el registro para la localización y caracterización de personas con discapacidad del Ministerio de Salud y Protección Social, como de los comités territoriales y locales de discapacidad y las entidades territoriales en salud.'>
                                        H
                                    </span>
                                    <span flow='up'
                                    tooltip='Usuarios del subsidio en especie para población vulnerable, del que trata el artículo 12 de la Ley 1537 de 2012 (Vivienda de Interés Social y Vivienda de Interés Prioritario), y el Decreto 1921 de 2012 o el que reglamente la materia.'>
                                        I
                                    </span>
                                    <span flow='up'
                                    tooltip='Niñas y niños cuyos padres estén en establecimientos de reclusión.'>
                                        J
                                    </span>
                                    <span flow='up'
                                    tooltip='Población migrante, refugiada o apátrida que cumpla con alguna de las siguientes características: ausencia de vivienda o condiciones de hacinamiento, que no cuenten con acceso a servicios públicos domiciliarios o que no cuenten con ningún tipo de afiliación al Sistema General de Seguridad Social en Salud.'>
                                        K
                                    </span>
                                    <span flow='up'
                                    tooltip='Niñas y niños remitidos del servicio HCB FAMI y DIMF que al cumplir los dos (2) años deben transitar a otros servicios de educación inicial de atención permanente.'>
                                        L
                                    </span>
                                    <span flow='up'
                                    tooltip='Niñas y niños cuyos padres estén activos en la ruta de reincorporación e identificados en las bases de datos remitidas de forma oficial al ICBF por la Agencia para la Reincorporación y la Normalización – ARN.'>
                                        M
                                    </span>
                                    <span flow='up'
                                    tooltip='Para el servicio de Hogar Infantil se atenderá prioritariamente niños y niñas hijos de trabajadores que evidencien vinculación laboral y demás requisitos establecidos en la resolución 1740 de 2010.'>
                                        N
                                    </span>
                                    <span flow='up'
                                    tooltip='Ingresos iguales o inferiores a 1.5 Smlv'>
                                        O
                                    </span>
                                </div>
                                <select name='focusingCriteria' onChange={handleInput}>
                                    <option value={form.focusingCriteria} hidden>{form.focusingCriteria}</option>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='C'>E</option>
                                    <option value='F'>F</option>
                                    <option value='G'>G</option>
                                    <option value='H'>H</option>
                                    <option value='I'>I</option>
                                    <option value='J'>J</option>
                                    <option value='K'>K</option>
                                    <option value='L'>L</option>
                                    <option value='M'>M</option>
                                    <option value='N'>N</option>
                                    <option value='O'>O</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>SI NO CUMPLE CON NINGUN CRITERIO, CUENTA CON EL ACTA DONDE JUSTIFICA QUE EL BENEFICIARIO REQUIERE LA ATENCION</label>
                            <select name='justificationDocumentExists' onChange={handleInput}>
                                <option value={form.justificationDocumentExists} hidden>{form.justificationDocumentExists}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <section className='bottom-tab-button'>
                            <button type='submit' className='verifyInputs'>Verificar campos requeridos</button>
                            <button className='addUser' type='submit' onClick={_=>handleButtonClick(1)}>Siguiente</button>
                        </section>
                    </TabPanel>
                    {/* BENEFICIARIE ATTENDANT */}
                    <TabPanel className='d-flex flex-wrap flex-gap'>
                        <div>
                            <label>TIPO DE RESPONSABLE</label>
                            <select name='guardianPersonType' onChange={handleInput}>
                                <option value={form.guardianPersonType} hidden>{form.guardianPersonType}</option>
                                <option value='MADRE'>MADRE</option>
                                <option value='PADRE'>PADRE</option>
                                <option value='TÍO(A)'>TÍO(A)</option>
                                <option value='HERMANO(A)'>HERMANO(A)</option>
                                <option value='ABUELO(A)'>ABUELO(A)</option>
                                <option value='PADRASTRO'>PADRASTRO</option>
                                <option value='MADRASTRA'>MADRASTRA</option>
                                <option value='CONYUGUE'>CONYUGUE</option>
                                <option value='AMIGO(A)'>AMIGO(A)</option>
                                <option value='OTRO'>OTRO</option>
                            </select>
                        </div>
                        <div>
                            <label>TIPO DE DOCUMENTO ACUDIENTE*</label>
                            <select name='guardianDocumentType' onChange={handleInput}>
                                <option value={form.guardianDocumentType} hidden>{form.guardianDocumentType}</option>
                                <option value='CC'>CC</option>
                                <option value='TI'>TI</option>
                                <option value='PEP'>PEP</option>
                                <option value='PASAPORTE'>PASAPORTE</option>
                                <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                            </select>
                        </div>
                        <div>
                            <label>NÚMERO DE DOCUMENTO DEL ACUDIENTE</label>
                            <input name='guardianDocumentNumber' onChange={handleInput} type='text' value={form.guardianDocumentNumber} required/>
                        </div>
                        <div>
                            <label>PRIMER NOMBRE ACUDIENTE</label>
                            <input name='guardianFirstName' onChange={handleInput} type='text' value={form.guardianFirstName} required/>
                        </div>
                        <div>
                            <label>SEGUNDO NOMBRE ACUDIENTE</label>
                            <input name='guardianSecondName' onChange={handleInput} type='text' value={form.guardianSecondName} />
                        </div>
                        <div>
                            <label>PRIMER APELLIDO ACUDIENTE</label>
                            <input name='guardianFirstLastname' onChange={handleInput} type='text' value={form.guardianFirstLastname}  required/>
                        </div>
                        <div>
                            <label>SEGUNDO APELLIDO ACUDIENTE</label>
                            <input name='guardianSecondLastname' onChange={handleInput} type='text' value={form.guardianSecondLastname}/>
                        </div>
                        <div>
                            <label>FECHA DE NACIMIENTO ACUDIENTE</label>
                            <input name='guardianBirthdate' onChange={handleInput} type='date' value={form.guardianBirthdate} required/>
                        </div>
                        {/* COUNTRY */}
                        <div>
                            <label>PAÍS DE NACIMIENTO ACUDIENTE</label>
                            <select name='guardianBirthCountry' onChange={handleInput}>
                                <option value={form.guardianBirthCountry} hidden>{form.guardianBirthCountry}</option>
                                <option value='COLOMBIA'>COLOMBIA</option>
                                <option value='VENEZUELA'>VENEZUELA</option>
                                <option value='ECUADOR'>ECUADOR</option>
                                <option value='PERÚ'>PERÚ</option>
                                <option value='PANAMÁ'>PANAMÁ</option>
                                <option value='BRAZIL'>BRAZIL</option>
                            </select>
                        </div>
                        {/* DEPARTMENTS */}
                        <div>
                            <label>DEPARTAMENTO DE NACIMIENTO ACUDIENTE</label>
                            <select
                                name='guardianBirthDepartment'
                                onChange={(e) => {
                                    setCurDepartmentAttendant(e.target.value);
                                }}
                            >
                                {!departments.resultado
                                    ? 'Cargando'
                                    : departments.resultado.map((department) => {
                                        return (
                                            <option
                                                key={department.NOMBRE_DEPARTAMENTO}
                                                value={department.CODIGO_DEPARTAMENTO}
                                            >
                                                {department.NOMBRE_DEPARTAMENTO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* MUNICIPALITIES */}
                        <div>
                            <label>MUNICIPIO DE NACIMIENTO ACUDIENTE</label>
                            <select name='guardianBirthCity' onChange={handleInput}>
                                {!municipalitiesAttendant.resultado
                                    ? 'Cargando'
                                    : municipalitiesAttendant.resultado.map(
                                        (municipality) => {
                                            return (
                                                <option
                                                    key={municipality.NOMBRE_MUNICIPIO}
                                                    value={municipality.CODIGO_MUNICIPIO}
                                                >
                                                    {municipality.NOMBRE_MUNICIPIO}
                                                </option>
                                            );
                                        }
                                    )}
                            </select>
                        </div>
                        <section className='bottom-tab-button'>
                        <button type='submit' className='verifyInputs'>Verificar campos requeridos</button>
                            <button className='addUser' onClick={_=> handleButtonClick(0)}>Anterior</button>
                            <button className='addUser' onClick={_=> handleButtonClick(2)}>Siguiente</button>
                        </section>
                    </TabPanel>

                    {/* FATHER INFORMATION */}
                    <TabPanel className='d-flex flex-wrap flex-gap'>
                        <div>
                            <label>TIPO DE DOCUMENTO PADRE</label>
                            <select name='fatherDocumentType' onChange={handleInput}>
                                <option value={form.fatherDocumentType} hidden>{form.fatherDocumentType}</option>
                                <option value='CC'>CC</option>
                                <option value='TI'>TI</option>
                                <option value='PEP'>PEP</option>
                                <option value='PASAPORTE'>PASAPORTE</option>
                                <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                            </select>
                        </div>
                        <div>
                            <label>NÚMERO DE DOCUMENTO DEL PADRE</label>
                            <input name='fatherDocumentNumber' onChange={handleInput} type='text' value={form.fatherDocumentNumber}/>
                        </div>
                        <div>
                            <label>PRIMER NOMBRE PADRE</label>
                            <input name='fatherFirstName' onChange={handleInput} type='text' value={form.fatherFirstName}/>
                        </div>
                        <div>
                            <label>SEGUNDO NOMBRE PADRE</label>
                            <input name='fatherSecondName' onChange={handleInput} type='text' value={form.fatherSecondName}/>
                        </div>
                        <div>
                            <label>PRIMER APELLIDO PADRE</label>
                            <input name='fatherFirstLastname' onChange={handleInput} type='text' value={form.fatherFirstLastname}/>
                        </div>
                        <div>
                            <label>SEGUNDO APELLIDO PADRE</label>
                            <input name='fatherSecondLastname' onChange={handleInput} type='text' value={form.fatherSecondLastname}/>
                        </div>
                        <div>
                            <label>FECHA DE NACIMIENTO PADRE</label>
                            <input name='fatherBirthdate' onChange={handleInput} type='date' value={form.fatherBirthdate}/>
                        </div>
                        {/* COUNTRY */}
                        <div>
                            <label>PAÍS DE NACIMIENTO PADRE</label>
                            <select name='fatherBirthCountry' onChange={handleInput}>
                                <option value={form.fatherBirthCountry} hidden>{form.fatherBirthCountry}</option>
                                <option value='COLOMBIA'>COLOMBIA</option>
                                <option value='VENEZUELA'>VENEZUELA</option>
                                <option value='ECUADOR'>ECUADOR</option>
                                <option value='PERÚ'>PERÚ</option>
                                <option value='PANAMÁ'>PANAMÁ</option>
                                <option value='BRAZIL'>BRAZIL</option>
                            </select>
                        </div>
                        {/* DEPARTMENTS */}
                        <div>
                            <label>DEPARTAMENTO DE NACIMIENTO PADRE</label>
                            <select
                                name='fatherBirthDepartment'
                                onChange={(e) => {
                                    setCurDepartmentFather(e.target.value);
                                }}
                            >
                                {!departments.resultado
                                    ? 'Cargando'
                                    : departments.resultado.map((department) => {
                                        return (
                                            <option
                                                key={department.NOMBRE_DEPARTAMENTO}
                                                value={department.CODIGO_DEPARTAMENTO}
                                            >
                                                {department.NOMBRE_DEPARTAMENTO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* MUNICIPALITIES */}
                        <div>
                            <label>MUNICIPIO DE NACIMIENTO PADRE</label>
                            <select name='fatherBirthCity' onChange={handleInput}>
                                {!municipalitiesFather.resultado
                                    ? 'Cargando'
                                    : municipalitiesFather.resultado.map((municipality) => {
                                        return (
                                            <option
                                                key={municipality.NOMBRE_MUNICIPIO}
                                                value={municipality.CODIGO_MUNICIPIO}
                                            >
                                                {municipality.NOMBRE_MUNICIPIO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <section className='bottom-tab-button'>
                            <button className='addUser' onClick={_=> handleButtonClick(1)}>Anterior</button>
                            <button className='addUser' onClick={_=> handleButtonClick(3)}>Siguiente</button>
                        </section>
                    </TabPanel>

                    {/* MOTHER INFORMATION */}
                    <TabPanel className='d-flex flex-wrap flex-gap'>
                        <div>
                            <label>TIPO DE DOCUMENTO MADRE</label>
                            <select name='motherDocumentType' onChange={handleInput}>
                                <option value={form.motherDocumentType} hidden>{form.motherDocumentType}</option>
                                <option value='CC'>CC</option>
                                <option value='TI'>TI</option>
                                <option value='PEP'>PEP</option>
                                <option value='PASAPORTE'>PASAPORTE</option>
                                <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                            </select>
                        </div>
                        <div>
                            <label>NÚMERO DE DOCUMENTO DEL MADRE</label>
                            <input name='motherDocumentNumber' onChange={handleInput} type='text' value={form.motherDocumentNumber}/>
                        </div>
                        <div>
                            <label>PRIMER NOMBRE MADRE</label>
                            <input name='motherFirstName' onChange={handleInput} type='text' value={form.motherFirstName}/>
                        </div>
                        <div>
                            <label>SEGUNDO NOMBRE MADRE</label>
                            <input name='motherSecondName' onChange={handleInput} type='text' value={form.motherSecondName}/>
                        </div>
                        <div>
                            <label>PRIMER APELLIDO MADRE</label>
                            <input name='motherFirstLastname' onChange={handleInput} type='text' value={form.motherFirstLastname}/>
                        </div>
                        <div>
                            <label>SEGUNDO APELLIDO MADRE</label>
                            <input name='motherSecondLastname' onChange={handleInput} type='text' value={form.motherSecondLastname}/>
                        </div>
                        <div>
                            <label>FECHA DE NACIMIENTO MADRE</label>
                            <input name='motherBirthdate' onChange={handleInput} type='date' value={form.motherBirthdate}/>
                        </div>
                        {/* COUNTRY */}
                        <div>
                            <label>PAÍS DE NACIMIENTO MADRE</label>
                            <select name='motherBirthCountry' onChange={handleInput}>
                                <option value={form.motherBirthCountry} hidden>{form.motherBirthCountry}</option>
                                <option value='COLOMBIA'>COLOMBIA</option>
                                <option value='VENEZUELA'>VENEZUELA</option>
                                <option value='ECUADOR'>ECUADOR</option>
                                <option value='PERÚ'>PERÚ</option>
                                <option value='PANAMÁ'>PANAMÁ</option>
                                <option value='BRAZIL'>BRAZIL</option>
                            </select>
                        </div>
                        {/* DEPARTMENTS */}
                        <div>
                            <label>DEPARTAMENTO DE NACIMIENTO MADRE</label>
                            <select
                                name='motherBirthDepartment'
                                onChange={(e) => {
                                    setCurDepartmentMother(e.target.value);
                                }}
                            >
                                {!departments.resultado
                                    ? 'Cargando'
                                    : departments.resultado.map((department) => {
                                        return (
                                            <option
                                                key={department.NOMBRE_DEPARTAMENTO}
                                                value={department.CODIGO_DEPARTAMENTO}
                                            >
                                                {department.NOMBRE_DEPARTAMENTO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {/* MUNICIPALITIES */}
                        <div>
                            <label>MUNICIPIO DE NACIMIENTO MADRE</label>
                            <select name='motherBirthCity' onChange={handleInput}>
                                {!municipalitiesMother.resultado
                                    ? 'Cargando'
                                    : municipalitiesMother.resultado.map((municipality) => {
                                        return (
                                            <option
                                                key={municipality.NOMBRE_MUNICIPIO}
                                                value={municipality.CODIGO_MUNICIPIO}
                                            >
                                                {municipality.NOMBRE_MUNICIPIO}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <section className='bottom-tab-button'>
                            <button className='addUser' onClick={_=> handleButtonClick(2)}>Anterior</button>
                            <button className='addUser' onClick={_=> handleButtonClick(4)}>Siguiente</button>
                        </section>
                    </TabPanel>

                    {/* MEDICAL INFORMATION*/}
                    <TabPanel className='d-flex flex-wrap flex-gap'>
                        <div>
                            <label>RÉGIMEN</label>
                            <select name='regime' onChange={handleInput} required>
                                <option value={form.regime} hidden>{form.regime}</option>
                                <option value='NO SE ENCUENTRA AFILIADO'>NO SE ENCUENTRA AFILIADO</option>
                                <option value='SUBSIDIADO'>SUBSIDIADO</option>
                                <option value='CONTRIBUTIVO'>CONTRIBUTIVO</option>
                                <option value='ESPECIAL'>ESPECIAL</option>
                            </select>
                        </div>
                        <div>
                            <label>EPS</label>
                            <select name='eps' onChange={handleInput} required>
                                <option value={form.eps} hidden>{form.eps}</option>
                                <option value='NO SE ENCUENTRA AFILIADO'>NO SE ENCUENTRA AFILIADO</option>
                                <option value='AIC-EPSI'>AIC-EPSI</option>
                                <option value='ALIANSALUD EPS'>ALIANSALUD EPS</option>
                                <option value='AMBUQ EPS'>AMBUQ EPS</option>
                                <option value='ANAS WAYUU'>ANAS WAYUU</option>
                                <option value='ASMET SALUD EPS'>ASMET SALUD EPS</option>
                                <option value='CAJACOPI EPS'>CAJACOPI EPS</option>
                                <option value='CAPITAL SALUD EPS'>CAPITAL SALUD EPS</option>
                                <option value='CAPRESOCA EPS'>CAPRESOCA EPS</option>
                                <option value='COMFACHOCÓ EPS'>COMFACHOCÓ EPS</option>
                                <option value='COMFACOR'>COMFACOR</option>
                                <option value='COMFAGUAJIRA'>COMFAGUAJIRA</option>
                                <option value='COMFAMILIAR CARTAGENA'>COMFAMILIAR CARTAGENA</option>
                                <option value='COMFAMILIAR EPS'>COMFAMILIAR EPS</option>
                                <option value='COMFAMILIAR NARIÑO'>COMFAMILIAR NARIÑO</option>
                                <option value='COMPARTA EPS'>COMPARTA EPS</option>
                                <option value='COMPENSAR'>COMPENSAR</option>
                                <option value='CONFAORIENTE EPS'>CONFAORIENTE EPS</option>
                                <option value='CONFASUCRE'>CONFASUCRE</option>
                                <option value='CONVIDA EPS'>CONVIDA EPS</option>
                                <option value='COOSALUD'>COOSALUD</option>
                                <option value='DUASAKAWI EPSI'>DUASAKAWI EPSI</option>
                                <option value='ECOOPSOS'>ECOOPSOS</option>
                                <option value='EMSSANAR EPS'>EMSSANAR EPS</option>
                                <option value='EPS SANITAS'>EPS SANITAS</option>
                                <option value='FAMISANAR EPS'>FAMISANAR EPS</option>
                                <option value='MALLAMAS EPS INDÍGENA'>MALLAMAS EPS INDÍGENA</option>
                                <option value='MEDIMÁS EPS'>MEDIMÁS EPS</option>
                                <option value='MUTUAL SER'>MUTUAL SER</option>
                                <option value='NUEVA EPS'>NUEVA EPS</option>
                                <option value='PIJAOS SALUD'>PIJAOS SALUD</option>
                                <option value='SALUD TOTAL EPS'>SALUD TOTAL EPS</option>
                                <option value='SAVIA SALUD EPS'>SAVIA SALUD EPS</option>
                                <option value='SURA EPS'>SURA EPS</option>
                            </select>
                        </div>
                        <div>
                            <label>¿EL BENEFICIARIO CUENTA CON CARNET DE VACUNCIÓN?*</label>
                            <select name='hasVaccinationCard' onChange={handleInput}>
                                <option value={form.hasVaccinationCard} hidden>{form.hasVaccinationCard}</option>
                                <option value='SI'>SI</option>
                                <option value='NO'>NO</option>
                            </select>
                        </div>
                        <div>
                            <label>FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN</label>
                            <input name='vaccinationVerificationDate' onChange={handleInput} type='date' value={form.vaccinationVerificationDate}/>
                        </div>
                        <div>
                            <label>¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA?*</label>
                            <select name='vaccinationCardUpToDate' onChange={handleInput}>
                                <option value={form.vaccinationCardUpToDate} hidden>{form.vaccinationCardUpToDate}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO?*</label>
                            <select name='hasGrowthAndDevelopmentCard' onChange={handleInput}>
                                <option value={form.hasGrowthAndDevelopmentCard} hidden>{form.hasGrowthAndDevelopmentCard}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES?</label>
                            <input name='growthDevelopmentControlsReceived' onChange={handleInputNum} type='number' value={form.growthDevelopmentControlsReceived}/>
                        </div>
                        <div>
                            <label>ANTECEDENTE DE PREMATUREZ*</label>
                            <select name='prematurenessBackground' onChange={handleInput}>
                                <option value={form.prematurenessBackground} hidden>{form.prematurenessBackground}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS</label>
                            <select name='under40Weeks' onChange={handleInput}>
                                <option value={form.under40Weeks} hidden>{form.under40Weeks}</option>
                                <option value='NA'>NA</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>PERÍMETRO CEFÁLICO</label>
                            <input name='cefalicProfile' onChange={handleInputNum} type='number' value={form.cefalicProfile}/>
                        </div>
                        <div>
                            <label>EDAD GESTACIONAL AL NACER (SEMANAS)*</label>
                            <input name='gestationalAgeAtBirth' onChange={handleInputNum} type='number' step='any' value={form.gestationalAgeAtBirth}/>
                        </div>
                        <div>
                            <label>PESO AL NACER (EN GRAMOS)*</label>
                            <input name='weightAtBirth' onChange={handleInputNum} type='number' step='any' value={form.weightAtBirth}/>
                        </div>
                        <div>
                            <label>TALLA AL NACER (EN CENTÍMETROS)*</label>
                            <input name='heightAtBirth' onChange={handleInputNum} type='number' value={form.heightAtBirth}/>
                        </div>
                        <div>
                            <label>SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON LECHE MATERNA DE FORMA EXCLUSIVA?</label>
                            <select name='exclusivelyBreastfeeding' onChange={handleInput}>
                                <option value={form.exclusivelyBreastfeeding} hidden>{form.exclusivelyBreastfeeding}</option>
                                <option value='NO'>NO</option>
                                <option value='SI'>SI</option>
                            </select>
                        </div>
                        <div>
                            <label>DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)</label>
                            <input name='exclusiveBreastfeedingDuration' onChange={handleInputNum} type='number' value={form.exclusiveBreastfeedingDuration}/>
                        </div>
                        <div>
                            <label>DURACIÓN LACTANCIA MATERNA TOTAL (MESES)</label>
                            <input name='totalBreastfeedingDuration' onChange={handleInputNum} type='number' value={form.totalBreastfeedingDuration}/>
                        </div>
                        <div>
                            <label>SEMANAS DE GESTACIÓN</label>
                            <input name='gestationWeeks' onChange={handleInputNum} type='number' value={form.gestationWeeks}/>
                        </div>
                        <div>
                            <label>SI EL BENEFICIARIO TIENE TICKET, INDIQUE EL NÚMERO DE TICKET</label>
                            <input name='ticketNumber' onChange={handleInputNum} type='number' value={form.ticketNumber}/>
                        </div>
                        <section className='bottom-tab-button'>
                            <button className='verifyInputs'>Verificar campos requeridos</button>
                            <button className='addUser' onClick={_=> handleButtonClick(3)}>Anterior</button>
                            <button className='addUser' onClick={addBeneficiary} type="submit">Guardar beneficiario</button>
                        </section>
                    </TabPanel>
            </Tabs>
        </form>
        </Modal.Body>
    </Modal>
</>
);
}

export default AddBeneficiaries;

import { useEffect, useState, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './AddBeneficiaries.css';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
// API 'Sector Catastral Bogotá D.C.'
import neighborhoods from '../../../apis/SECTOR.json';

function AddBeneficiaries() {
    // Modal state
    const [show, setShow] = useState(false);
    // Apis state
    const [departments, setDepartments] = useState([]);
    const [localities, setLocalities] = useState([]);

    /* Contains the modifing fetch API */
    // Beneficiary
    const [municipalities, setMunicipalities] = useState([]);
    // Attendant
    const [municipalitiesAttendant, setMunicipalitiesAttendant] = useState([]);
    // Father
    const [municipalitiesFather, setMunicipalitiesFather] = useState([]);
    // Mother
    const [municipalitiesMother, setMunicipalitiesMother] = useState([]);

    // Current State - has to have a default value for the relation between the department
    const [curDepartment, setCurDepartment] = useState(11); //Bogotá D.C. by default '11'
    const [curDepartmentAttendant, setCurDepartmentAttendant] = useState(11);
    const [curDepartmentFather, setCurDepartmentFather] = useState(11);
    const [curDepartmentMother, setCurDepartmentMother] = useState(11);

    // Neighborhood
    const [searchText, setSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    // Form tabs
    const [tabIndex, setTabIndex] = useState(0);
    const tabListRef = useRef(0);

    // ---------------------- We request the APIs used for selects
    const fetchApis = async (_) => {
        try {
            /* Departments */
            const resDepartments = await fetch(
                'https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/departamentos.php'
            );
            const resDepartmentsJSON = await resDepartments.json();
            setDepartments(resDepartmentsJSON);
            /* Municipalities - Depending on the department code, make the query to the municipality belonging to that department */
            // Beneficiary
            const resMunicipalities = await fetch(
                `https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartment}`
            );
            const resMunicipalitiesJSON = await resMunicipalities.json();
            setMunicipalities(resMunicipalitiesJSON);
            // Attendant
            const resMunicipalitiesAttendant = await fetch(
                `https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentAttendant}`
            );
            const resMunicipalitiesAttendantJSON =
                await resMunicipalitiesAttendant.json();
            setMunicipalitiesAttendant(resMunicipalitiesAttendantJSON);
            // Father
            const resMunicipalitiesFather = await fetch(
                `https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentFather}`
            );
            const resMunicipalitiesFatherJSON = await resMunicipalitiesFather.json();
            setMunicipalitiesFather(resMunicipalitiesFatherJSON);
            // Mother
            const resMunicipalitiesMother = await fetch(
                `https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentMother}`
            );
            const resMunicipalitiesMotherJSON = await resMunicipalitiesMother.json();
            setMunicipalitiesMother(resMunicipalitiesMotherJSON);
            /* Localities */
            const resLocalities = await fetch(
                'https://datosabiertos.bogota.gov.co/dataset/856cb657-8ca3-4ee8-857f-37211173b1f8/resource/497b8756-0927-4aee-8da9-ca4e32ca3a8a/download/loca.json'
            );
            const resLocalitiesJSON = await resLocalities.json();
            setLocalities(resLocalitiesJSON);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        //Perform the first fetch of all APIs on page load
        fetchApis();
    }, []);
    useEffect(() => {
        //Updates the info when the variables inside the array have been modified
        fetchApis();
    }, [
        curDepartment,
        curDepartmentAttendant,
        curDepartmentFather,
        curDepartmentMother,
    ]);

    // ------------------------- Neighborhood match filter
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value.toUpperCase());
    };
    const handleSearchClick = () => {
        const selectElement = document.getElementById('mySelect');
        let foundOption = null;
        for (let i = 0; i < selectElement.options.length; i++) {
            const optionText = selectElement.options[i].text.toUpperCase();
            if (optionText === searchText) {
                foundOption = selectElement.options[i];
                break;
            }
        }
        if (foundOption !== null) {
            setSelectedValue(foundOption.value);
        } else {
            alert('No se encontró ninguna opción que coincida con la búsqueda.');
        }
    };
    // ------------------------- addBeneficiariesSchema
    const addBeneficiaries = {
        numDoc: null, 
        curState: 'ACTIVO', 
        joinDate: null, 
        exitDate: null, 
        enterBy: null, 
        reasonForExit: null, 
        otherExitReason: null,
        unityName: null,
        duoName: null,
        teachers: null, 
        documentType: 'RC',  
        firstName: null,
        secondName: null,
        firstLastName: null,
        secondLastName: null,
        birthDate: null,
        gender: 'FEMENINO',
        birthCountry: 'COLOMBIA',
        birthDepartment: 'BOGOTÁ, D.C.',
        birthMunicipality:'BOGOTÁ, D.C.',
        disability: 'NO',
        certifiedDisability: 'NO',    
        entityCertifiesDisability: null,
        disabilityCategory: 'NINGUNA', 
        specifiedDisability: null, 
        disabilityRegistryEnrollment: 'NO', 
        requiresAssistance: 'NO', 
        requiresTechSupport: 'NO',
        hasTechSupport: 'NO',
        requiresTherapy: 'NO', 
        receivesTherapy: 'NO',
        hasInterdictionProcess: 'NO',
        countryOfResidence: 'COLOMBIA',
        residenceDepartment: 'BOGOTÁ, D.C.',
        locationZone: 'CABECERA',
        headerType: 'LOCALIDAD',
        localityName: null,
        neighborhood: 'VILLA MAYOR ORIENTAL',
        foreignZoneName: null, 
        address: null,
        primaryPhone: null,
        secundaryPhone: null,
        householdStratum: 0,
        groupEthnicity: 'NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES',
        beneficiarySisbenized: 'NO',
        sisbenScore: null,
        belongsToFamiliesInAction: 'NO',
        directlyAffectedByArmedConflict: 'NO',
        focusingCriteria: null,
        justificationDocumentExists: 'NO', 
        guardianPersonType: 'MADRE',
        guardianDocumentType: 'CC',
        guardianDocumentNumber: null,
        guardianFirstName: null,
        guardianSecondName: null,
        guardianFirstLastname: null,
        guardianSecondLastname: null,
        guardianBirthdate: null,
        guardianBirthCountry: 'COLOMBIA',
        guardianBirthDepartment: 'BOGOTÁ, D.C.',
        guardianBirthCity: 'BOGOTÁ, D.C.',
        fatherDocumentType: null,
        fatherDocumentNumber: null,
        fatherFirstName: null,
        fatherSecondName: null,
        fatherFirstLastname: null,
        fatherSecondLastname: null,
        fatherBirthdate: null,
        fatherBirthCountry: null,
        fatherBirthDepartment: null,
        fatherBirthCity: null,
        motherDocumentType: null,
        motherDocumentNumber: null,
        motherFirstName: null,
        motherSecondName: null,
        motherFirstLastname: null,
        motherSecondLastname: null,
        motherBirthdate: null,
        motherBirthCountry: null,
        motherBirthDepartment: null,
        motherBirthCity: null,
        regime: 'SUBSIDIADO',
        eps: null,
        hasVaccinationCard: 'SI',
        vaccinationVerificationDate: null,
        vaccinationCardUpToDate: null,
        hasGrowthAndDevelopmentCard: null, 
        growthDevelopmentControlsReceived: null, 
        prematurenessBackground: null,
        under40Weeks: null,
        cefalicProfile: null, 
        gestationalAgeAtBirth: null, 
        weightAtBirth:  null,
        heightAtBirth: null,
        exclusivelyBreastfeeding: null,
        exclusiveBreastfeedingDuration: null, 
        totalBreastfeedingDuration: null,
        gestationWeeks: null,
        ticketNumber: null
    }
    const [form, setForm] = useState(addBeneficiaries);
    
    const resetForm = _=>{
        setForm(addBeneficiaries);
    }
    
    const handleInput = e=>{
        let {name, value} = e.target;
        let newForm = {...form, [name]: value};
        setForm(newForm);
    };
    const handleInputNum = e=>{
        let {name, value} = e.target;
        let newForm = {...form, [name]: parseInt(value)};
        setForm(newForm);
    };
    const handleInputDate = e=>{
        let {name, value} = e.target;
        let newForm = {...form, [name]: new Date(value)};
        setForm(newForm);
    };

    // ------------------------- Form tabs button
    const handleButtonClick = (index) => {
        setTabIndex(index);
        tabListRef.current.focus();
    };

    const handleSubmit = e=>{
        e.preventDefault();
        console.log(form)
        if (!handleInput || !handleInputNum || !handleInputDate) {
            alert("Por favor, completa todos los campos.");
            return;};
        
        }

    return (
        <>
            <button
                className='addUser'
                variant='primary'
                onClick={() => {
                    setShow(true);
                }}
            >
                <span className='iconAddUser'>
                    <IoIosAddCircleOutline />
                </span>
                <span className='createUser'>Añadir Beneficiario</span>
            </button>
            {/* MODAL */}
            <Modal
                show={show}
                onHide={() => setShow(false)}
                className='modal-xl modal-dialog-centered'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='example-custom-modal-styling-title'>
                        <h3>AÑADIR BENEFICIARIO</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-dialog-scrollable d-flex flex-wrap input-modal'>
                    <Tabs
                        selectedIndex={tabIndex}
                        onSelect={(index) => setTabIndex(index)}
                    >
                        <TabList>
                            <Tab>Beneficiario</Tab>
                            <Tab>Acudiente</Tab>
                            <Tab>Padre</Tab>
                            <Tab>Madre</Tab>
                            <Tab>Historia Medica</Tab>
                        </TabList>

                        <form onSubmit={handleSubmit}>
                            {/* Beneficirie Info*/}
                            <TabPanel className='d-flex flex-wrap flex-gap'>
                                <div>
                                    <label>NUMERO DE DOCUMENTO*</label>
                                    <input onChange={handleInputNum} name='numDoc' type='text' required/>
                                </div>
                                <div>
                                    <label>¿ACTIVO O INACTIVO?*</label>
                                    <select onChange={handleInput} name='curState'>
                                        <option value='ACTIVO'>ACTIVO</option>
                                        <option value='INACTIVO'>INACTIVO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>FECHA DE INGRESO*</label>
                                    <input onChange={handleInputDate} name='joinDate' type='date' required/>
                                </div>
                                <div>
                                    <label>FECHA DE EGRESO</label>
                                    <input onChange={handleInput} name='exitDate' type='date' />
                                </div>
                                <div>
                                    <label>INGRESA POR</label>
                                    <textarea onChange={handleInput} name='enterBy' id='' cols='30' rows='10'></textarea>
                                </div>
                                <div>
                                    <label>MOTIVO DE EGRESO</label>
                                    <textarea onChange={handleInput} name='reasonForExit' id='' cols='30' rows='10'></textarea>
                                </div>
                                <div>
                                    <label>SI EL MOTIVO DE EGRESO ES 'OTRO', INDIQUE EL PORQUÉ</label>
                                    <select onChange={handleInput} name='otherExitReason'>
                                        <option value='MOTIVO 1'>MOTIVO 1</option>
                                        <option value='MOTIVO 2'>MOTIVO 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label>UNIDAD*</label>
                                    <select onChange={handleInput} name='unityName'>
                                        <option value=''></option>
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
                                    <select name='duoName' onChange={handleInput}>
                                        <option value=''></option>
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
                                    <input type='text' name='teachers' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>TIPO DE DOCUMENTO*</label>
                                    <select name='documentType' onChange={handleInput}>
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
                                    <input type='text' name='firstName' onChange={handleInput} required/>
                                </div>
                                <div>
                                    <label>SEGUNDO NOMBRE</label>
                                    <input type='text' name='secondName' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>PRIMER APELLIDO*</label>
                                    <input type='text' name='firstLastName' onChange={handleInput} required/>
                                </div>
                                <div>
                                    <label>SEGUNDO APELLIDO</label>
                                    <input type='text' name='secondLastName' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>FECHA DE NACIMIENTO*</label>
                                    <input type='date' name='birthDate' onChange={handleInputDate} required/>
                                </div>
                                <div>
                                    <label>GÉNERO*</label>
                                    <select name='gender' onChange={handleInput}>
                                        <option value='FEMENINO'>FEMENINO</option>
                                        <option value='MASCULINO'>MASCULINO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>PAÍS DE NACIMIENTO*</label>
                                    <select name='birthCountry' onChange={handleInput}>
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
                                            /* handleInput() */
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
                                    <label>MUNICIPIO DE NACIMIENTO</label>
                                    <select name='select'>
                                        {!municipalities.resultado
                                            ? 'Cargando'
                                            : municipalities.resultado.map((municipality) => {
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
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>DISCAPACIDAD CERTIFICADA</label>
                                    <select name='certifiedDisability' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>ENTIDAD QUE CERTIFICA LA DISCAPACIDAD</label>
                                    <input type='text' name='entityCertifiesDisability' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>CATEGORÍA DE LA DISCAPACIDAD</label>
                                    <select name='disabilityCategory' onChange={handleInput}>
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
                                    <input type='text' name='specifiedDisability' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>¿ESTÁ INSCRITO EN EL REGISTRO PARA LA LOCALIZACIÓN Y CARACTERIZACIÓN DE PERSONAS CON DISCAPACIDAD?</label>
                                    <select name='disabilityRegistryEnrollment' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>¿REQUIERE LA AYUDA DE OTRA PERSONA?</label>
                                    <select name='requiresAssistance' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>¿REQUIERE AYUDA TÉCNICA / PRODUCTO DE APOYO?</label>
                                    <select name='requiresTechSupport' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        ¿CUENTA CON LA AYUDA TÉCNICA / PRODUCTO DE APOYO?
                                    </label>
                                    <select name='hasTechSupport' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>¿REQUIERE TERAPIA Y/O REHABILITACIÓN?</label>
                                    <select name='requiresTherapy' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>RECIBE ATENCIÓN EN TERAPIA Y/O REHABILITACIÓN?</label>
                                    <select name='receivesTherapy' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>TIENE PROCESO DE INTERDICCIÓN?</label>
                                    <select name='hasInterdictionProcess' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>PAÍS DE RESIDENCIA</label>
                                    <select name='countryOfResidence' onChange={handleInput}>
                                        <option value='COLOMBIA'>COLOMBIA</option>
                                    </select>
                                </div>
                                <div>
                                    <label>DEPARTAMENTO DE RESIDENCIA</label>
                                    <select name='residenceDepartment' onChange={handleInput}>
                                        <option value='BOGOTÁ, D.C.'>BOGOTÁ, D.C.</option>
                                    </select>
                                </div>
                                <div>
                                    <label>ZONA DE UBICACIÓN</label>
                                    <select name='locationZone' onChange={handleInput}>
                                        <option value='CABECERA'>CABECERA</option>
                                        <option value='RESTO'>RESTO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>TIPO DE CABECERA</label>
                                    <select name='headerType' onChange={handleInput}>
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
                                <div className='long-select'>
                                    <label>BARRIO*</label>
                                    <select
                                        id='mySelect'
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        name='neighborhood'
                                    >
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
                                    <input
                                        type='text'
                                        value={searchText}
                                        onChange={handleSearchInputChange}
                                        placeholder='Buscar barrio'
                                    />
                                    <button onClick={handleSearchClick}>Buscar</button>
                                </div>
                                <div>
                                    <label>NOMBRE DE LA ZONA RESTO</label>
                                    <input type='text' name='foreignZoneName' onChange={handleInput}/>
                                </div>
                                <div>
                                    <label>DIRECCIÓN</label>
                                    <textarea name='address' onChange={handleInput} id=' ' cols='30 ' rows='10' required></textarea>
                                </div>
                                <div>
                                    <label>TELEFONO PRINCIPAL*</label>
                                    <input name='primaryPhone' onChange={handleInputNum} type='number' required/>
                                </div>
                                <div>
                                    <label>TELEFONO SECUNDARIO</label>
                                    <input name='secundaryPhone' onChange={handleInputNum}  type='number' />
                                </div>
                                <div>
                                    <label>ESTRATO DE HOGAR*</label>
                                    <select name='householdStratum' onChange={handleInputNum} >
                                        <option value='0'>0</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                    </select>
                                </div>
                                <div>
                                    <label>GRUPO ÉTNICO</label>
                                    <select name='groupEthnicity' onChange={handleInput}>
                                        <option value='NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES'>NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES</option>
                                        <option value='AFROCOLOMBIANO'>AFROCOLOMBIANO</option>
                                        <option value='INDÍGENA'>INDÍGENA</option>
                                        <option value='RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA'> RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA</option>
                                    </select>
                                </div>
                                <div>
                                    <label>BENEFICIARIO SISBENIZADO</label>
                                    <select name='beneficiarySisbenized' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>PUNTAJE SISBEN</label>
                                    <select name='sisbenScore' onChange={handleInput}>
                                        <option value=''></option>
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
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        EL BENEFICIARIO HA SIDO VICTIMA DIRECTA CONFLICTO ARMADO
                                    </label>
                                    <select name='directlyAffectedByArmedConflict' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div className='long-select'>
                                    <label>CRITERIOS DE FOCALIZACIÓN</label>
                                    <br />
                                    <div>
                                        <select name='focusingCriteria' onChange={handleInput}>
                                            <option value=''></option>
                                            <option value='A'>A</option>
                                            <option value='B'>B</option>
                                            <option value='C'>C</option>
                                            <option value='D'>D</option>
                                            <option value='E'>E</option>
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
                                        <div className='d-flex flex-row justify-content-between m-0 letter-select'>
                                            <span flow='down'
                                            tooltip='Pertenecientes a hogares con puntaje SISBEN'>
                                                A
                                            </span>
                                            <span flow='down'
                                            tooltip='Pertenecientes a familias identificadas a través de la Estrategia para la Superación de la Pobreza Extrema – Red UNIDOS.'>
                                                B
                                            </span>
                                            <span flow='down'
                                            tooltip='Niñas, niños y mujeres gestantes pertenecientes al programa Familias en Acción de Prosperidad Social.'>
                                                C
                                            </span>
                                            <span flow='down'
                                            tooltip='Niñas y niños egresados de la estrategia de atención y prevención de la desnutrición aguda (Centros de Recuperación Nutricional -CRN- y 1000 días para cambiar el mundo y unidades de búsqueda activa).'>
                                                D
                                            </span>
                                            <span flow='down'
                                            tooltip='Remitidos por las entidades del Sistema Nacional de Bienestar Familiar -SNBF- que se encuentren en situación de vulnerabilidad, riesgo de vulneración de derechos o programas de protección del ICBF.'>
                                                E
                                            </span>
                                            <span flow='down'
                                            tooltip='Víctimas de hechos violentos asociados al conflicto armado, de acuerdo con las directrices establecidas en la Ley 1448 de 2011 y los Decretos ley 4633, 4634 y 4635 de 2011, así como la Sentencia T-025 de 2004 proferida por la Corte Constitucional y demás desarrollos jurisprudenciales en torno a la existencia de un estado de cosas inconstitucional; para lo cual se considerarán aquellos cuyo estado se encuentre incluido dentro del RUV.'>
                                                F
                                            </span>
                                            <span flow='down'
                                            tooltip='Pertenecientes a comunidades étnicas (indígenas, comunidades negras, afrocolombianas, Palenqueros, Raizales y Rrom), que demanden el servicio.'>
                                                G
                                            </span>
                                            <span flow='down'
                                            tooltip='Niños y niñas con discapacidad que requieren diversos tipos de apoyo para su participación efectiva y que demandan acompañamiento en las actividades de cuidado; así como los que sean remitidos por las entidades del SNBF con base en el registro para la localización y caracterización de personas con discapacidad del Ministerio de Salud y Protección Social, como de los comités territoriales y locales de discapacidad y las entidades territoriales en salud.'>
                                                H
                                            </span>
                                            <span flow='down'
                                            tooltip='Usuarios del subsidio en especie para población vulnerable, del que trata el artículo 12 de la Ley 1537 de 2012 (Vivienda de Interés Social y Vivienda de Interés Prioritario), y el Decreto 1921 de 2012 o el que reglamente la materia.'>
                                                I
                                            </span>
                                            <span flow='down'
                                            tooltip='Niñas y niños cuyos padres estén en establecimientos de reclusión.'>
                                                J
                                            </span>
                                            <span flow='down'
                                            tooltip='Población migrante, refugiada o apátrida que cumpla con alguna de las siguientes características: ausencia de vivienda o condiciones de hacinamiento, que no cuenten con acceso a servicios públicos domiciliarios o que no cuenten con ningún tipo de afiliación al Sistema General de Seguridad Social en Salud.'>
                                                K
                                            </span>
                                            <span flow='down'
                                            tooltip='Niñas y niños remitidos del servicio HCB FAMI y DIMF que al cumplir los dos (2) años deben transitar a otros servicios de educación inicial de atención permanente.'>
                                                L
                                            </span>
                                            <span flow='down'
                                            tooltip='Niñas y niños cuyos padres estén activos en la ruta de reincorporación e identificados en las bases de datos remitidas de forma oficial al ICBF por la Agencia para la Reincorporación y la Normalización – ARN.'>
                                                M
                                            </span>
                                            <span flow='down'
                                            tooltip='Para el servicio de Hogar Infantil se atenderá prioritariamente niños y niñas hijos de trabajadores que evidencien vinculación laboral y demás requisitos establecidos en la resolución 1740 de 2010.'>
                                                N
                                            </span>
                                            <span flow='down'
                                            tooltip='Ingresos iguales o inferiores a 1.5 Smlv'>
                                                O
                                            </span>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <div>
                                    <label>
                                        SI NO CUMPLE CON NINGUN CRITERIO, CUENTA CON EL ACTA DONDE
                                        JUSTIFICA QUE EL BENEFICIARIO REQUIERE LA ATENCION
                                    </label>
                                    <select name='justificationDocumentExists' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <section className='bottom-tab-button'>
                                    <button className='addUser' onClick={() => handleButtonClick(1)}>Siguiente</button>{' '}
                                </section>
                            </TabPanel>

                            {/* Beneficiarie Acudiente */}
                            <TabPanel className='d-flex flex-wrap flex-gap'>
                                <div>
                                    <label>TIPO DE RESPONSABLE</label>
                                    <select name='guardianPersonType' onChange={handleInput}>
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
                                        <option value='CC'>CC</option>
                                        <option value='TI'>TI</option>
                                        <option value='PEP'>PEP</option>
                                        <option value='PASAPORTE'>PASAPORTE</option>
                                        <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>NÚMERO DE DOCUMENTO DEL ACUDIENTE</label>
                                    <input name='guardianDocumentNumber' onChange={handleInput} type='text'/>
                                </div>
                                <div>
                                    <label>PRIMER NOMBRE ACUDIENTE</label>
                                    <input name='guardianFirstName' onChange={handleInput} type='text' required/>
                                </div>
                                <div>
                                    <label>SEGUNDO NOMBRE ACUDIENTE</label>
                                    <input name='guardianSecondName' onChange={handleInput} type='text'/>
                                </div>
                                <div>
                                    <label>PRIMER APELLIDO ACUDIENTE</label>
                                    <input name='guardianFirstLastname' onChange={handleInput} type='text' required/>
                                </div>
                                <div>
                                    <label>SEGUNDO APELLIDO ACUDIENTE</label>
                                    <input name='guardianSecondLastname' onChange={handleInput} type='text'/>
                                </div>
                                <div>
                                    <label>FECHA DE NACIMIENTO ACUDIENTE</label>
                                    <input name='guardianBirthdate' onChange={handleInput} type='text' required/>
                                </div>
                                {/* COUNTRY */}
                                <div>
                                    <label>PAÍS DE NACIMIENTO ACUDIENTE</label>
                                    <select name='guardianBirthCountry' onChange={handleInput}>
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
                                    <button className='addUser' onClick={() => handleButtonClick(0)}>Anterior</button>{' '}
                                    <button className='addUser' onClick={() => handleButtonClick(2)}>Siguiente</button>{' '}
                                </section>
                            </TabPanel>

                            {/* FATHER INFORMATION */}
                            <TabPanel className='d-flex flex-wrap flex-gap'>
                                <div>
                                    <label>TIPO DE DOCUMENTO PADRE*</label>
                                    <select name='fatherDocumentType' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='CC'>CC</option>
                                        <option value='TI'>TI</option>
                                        <option value='PEP'>PEP</option>
                                        <option value='PASAPORTE'>PASAPORTE</option>
                                        <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>NÚMERO DE DOCUMENTO DEL PADRE</label>
                                    <input name='fatherDocumentNumber' onChange={handleInputNum} type='number'/>
                                </div>
                                <div>
                                    <label>PRIMER NOMBRE PADRE</label>
                                    <input name='fatherFirstName' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>SEGUNDO NOMBRE PADRE</label>
                                    <input name='fatherSecondName' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>PRIMER APELLIDO PADRE</label>
                                    <input name='fatherFirstLastname' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>SEGUNDO APELLIDO PADRE</label>
                                    <input name='fatherSecondLastname' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>FECHA DE NACIMIENTO PADRE</label>
                                    <input name='fatherBirthdate' onChange={handleInputDate} type='date' />
                                </div>
                                {/* COUNTRY */}
                                <div>
                                    <label>PAÍS DE NACIMIENTO PADRE</label>
                                    <select name='fatherBirthCountry' onChange={handleInput}>
                                        <option value=''></option>
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
                                    <button className='addUser' onClick={() => handleButtonClick(1)}>Anterior</button>{' '}
                                    <button className='addUser' onClick={() => handleButtonClick(3)}>Siguiente</button>{' '}
                                </section>
                            </TabPanel>

                            {/* MOTHER INFORMATION */}
                            <TabPanel className='d-flex flex-wrap flex-gap'>
                                <div>
                                    <label>TIPO DE DOCUMENTO MADRE*</label>
                                    <select name='motherDocumentType' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='CC'>CC</option>
                                        <option value='TI'>TI</option>
                                        <option value='PEP'>PEP</option>
                                        <option value='PASAPORTE'>PASAPORTE</option>
                                        <option value='SIN DOCUMENTO'>SIN DOCUMENTO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>NÚMERO DE DOCUMENTO DEL MADRE</label>
                                    <input name='motherDocumentNumber' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>PRIMER NOMBRE MADRE</label>
                                    <input name='motherFirstName' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>SEGUNDO NOMBRE MADRE</label>
                                    <input name='motherSecondName' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>PRIMER APELLIDO MADRE</label>
                                    <input name='motherFirstLastname' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>SEGUNDO APELLIDO MADRE</label>
                                    <input name='motherSecondLastname' onChange={handleInput} type='text' />
                                </div>
                                <div>
                                    <label>FECHA DE NACIMIENTO MADRE</label>
                                    <input name='motherBirthdate' onChange={handleInputDate} type='date' />
                                </div>
                                {/* COUNTRY */}
                                <div>
                                    <label>PAÍS DE NACIMIENTO MADRE</label>
                                    <select name='motherBirthCountry' onChange={handleInput}>
                                        <option value=''></option>
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
                                    <button className='addUser' onClick={() => handleButtonClick(2)}>Anterior</button>{' '}
                                    <button className='addUser' onClick={() => handleButtonClick(4)}>Siguiente</button>{' '}
                                </section>
                            </TabPanel>

                            {/* MEDICAL INFORMATION*/}
                            <TabPanel className='d-flex flex-wrap flex-gap'>
                                <div>
                                    <label>RÉGIMEN</label>
                                    <select name='regime' onChange={handleInput}>
                                        <option value='SUBSIDIADO'>SUBSIDIADO</option>
                                        <option value='CONTRIBUTIVO'>CONTRIBUTIVO</option>
                                        <option value='ESPECIAL'>ESPECIAL</option>
                                        <option value='NO SE ENCUENTRA AFILIADO'>NO SE ENCUENTRA AFILIADO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>EPS</label>
                                    <select name='eps' onChange={handleInput}>
                                        <option value=''></option>
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
                                        <option value='SI'>SI</option>
                                        <option value='NO'>NO</option>
                                    </select>
                                </div>
                                <div>
                                    <label>FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN</label>
                                    <input name='vaccinationVerificationDate' onChange={handleInputDate} type='date' />
                                </div>
                                <div>
                                    <label>¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA?*</label>
                                    <select name='vaccinationCardUpToDate' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO?*</label>
                                    <select name='hasGrowthAndDevelopmentCard' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES?</label>
                                    <input name='growthDevelopmentControlsReceived' onChange={handleInputNum} type='text' />
                                </div>
                                <div>
                                    <label>ANTECEDENTE DE PREMATUREZ*</label>
                                    <select name='prematurenessBackground' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS</label>
                                    <select name='under40Weeks' onChange={handleInput}>
                                        <option value=''></option>
                                        <option value='NA'>NA</option>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>PERÍMETRO CEFÁLICO</label>
                                    <input name='cefalicProfile' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>EDAD GESTACIONAL AL NACER (SEMANAS)*</label>
                                    <input name='gestationalAgeAtBirth' onChange={handleInputNum} type='number' step='any' />
                                </div>
                                <div>
                                    <label>PESO AL NACER (EN GRAMOS)*</label>
                                    <input name='weightAtBirth' onChange={handleInputNum} type='number' step='any' />
                                </div>
                                <div>
                                    <label>TALLA AL NACER (EN CENTÍMETROS)*</label>
                                    <input name='heightAtBirth' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON LECHE MATERNA DE FORMA EXCLUSIVA?</label>
                                    <select name='exclusivelyBreastfeeding' onChange={handleInput}>
                                        <option value='NO'>NO</option>
                                        <option value='SI'>SI</option>
                                    </select>
                                </div>
                                <div>
                                    <label>DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)</label>
                                    <input name='exclusiveBreastfeedingDuration' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>DURACIÓN LACTANCIA MATERNA TOTAL (MESES)</label>
                                    <input name='totalBreastfeedingDuration' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>SEMANAS DE GESTACIÓN</label>
                                    <input name='gestationWeeks' onChange={handleInputNum} type='number' />
                                </div>
                                <div>
                                    <label>SI EL BENEFICIARIO TIENE TICKET, INDIQUE EL NÚMERO DE TICKET</label>
                                    <input name='ticketNumber' onChange={handleInputNum} type='number' />
                                </div>
                                <section className='bottom-tab-button'>
                                    <button className='addUser' onClick={() => handleButtonClick(3)}>Anterior</button>{' '}
                                    <button className='addUser' type="submit">Guardar beneficiario</button>
                                </section>
                            </TabPanel>
                        </form>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddBeneficiaries;

import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './AddBeneficiaries.css'
// API 'Sector Catastral. Bogotá D.C'
import neighborhoods from '../../../apis/SECTOR.json'

function AddBeneficiaries() {
    // Modal state
    const [show, setShow] = useState(false);
    // Apis state
    const [departments, setDepartments] = useState([])
    const [localities, setLocalities] = useState([])

    /* Contains the modifing fetch API */
    // Beneficiary
    const [municipalities, setMunicipalities] = useState([])
    // Attendant
    const [municipalitiesAttendant, setMunicipalitiesAttendant] = useState([])
    // Father
    const [municipalitiesFather, setMunicipalitiesFather] = useState([])
    // Mother
    const [municipalitiesMother, setMunicipalitiesMother] = useState([])

    // Current State - has to have a default value for the relation between the department
    const [curDepartment, setCurDepartment] = useState(11) //Bogotá D.C. by default '11'
    const [curDepartmentAttendant, setCurDepartmentAttendant] = useState(11)
    const [curDepartmentFather, setCurDepartmentFather] = useState(11)
    const [curDepartmentMother, setCurDepartmentMother] = useState(11)

    // Neighborhood
    const [searchText, setSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');


// ---------------------- We request the APIs used for selects
    const fetchApis = async _=>{
        try {
            /* Departments */
            const resDepartments = await fetch('https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/departamentos.php')
            const resDepartmentsJSON = await resDepartments.json();
            setDepartments(resDepartmentsJSON)
            /* Municipalities - Depending on the department code, make the query to the municipality belonging to that department */
            // Beneficiary
            const resMunicipalities = await fetch(`https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartment}`)
            const resMunicipalitiesJSON = await resMunicipalities.json();
            setMunicipalities(resMunicipalitiesJSON)
            // Attendant
            const resMunicipalitiesAttendant = await fetch(`https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentAttendant}`)
            const resMunicipalitiesAttendantJSON = await resMunicipalitiesAttendant.json();
            setMunicipalitiesAttendant(resMunicipalitiesAttendantJSON)
            // Father
            const resMunicipalitiesFather = await fetch(`https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentFather}`)
            const resMunicipalitiesFatherJSON = await resMunicipalitiesFather.json();
            setMunicipalitiesFather(resMunicipalitiesFatherJSON)
            // Mother
            const resMunicipalitiesMother = await fetch(`https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/municipios.php?codigo_departamento=${curDepartmentMother}`)
            const resMunicipalitiesMotherJSON = await resMunicipalitiesMother.json();
            setMunicipalitiesMother(resMunicipalitiesMotherJSON)
            /* Localities */
            const resLocalities = await fetch('https://datosabiertos.bogota.gov.co/dataset/856cb657-8ca3-4ee8-857f-37211173b1f8/resource/497b8756-0927-4aee-8da9-ca4e32ca3a8a/download/loca.json')
            const resLocalitiesJSON = await resLocalities.json();
            setLocalities(resLocalitiesJSON)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{ //Perform the first fetch of all APIs on page load
        fetchApis()
    }, [])
    useEffect(()=>{ //Updates the info when the variables inside the array have been modified
        fetchApis()
    }, [curDepartment, curDepartmentAttendant, curDepartmentFather, curDepartmentMother])

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

    return (
        <>
            <button className='addUser' variant='primary' onClick={() => {setShow(true)}}>
                <span className='iconAddUser'><IoIosAddCircleOutline /></span>
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
                <Modal.Body className='modal-dialog-scrollable d-flex flex-wrap input-modal flex-gap'>
                    <div>
                        <label>NUMERO DE DOCUMENTO*</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>¿ACTIVO O INACTIVO?*</label>
                        <select name='select'>
                            <option value='value1'>ACTIVO</option>
                            <option value='value2'>INACTIVO</option>
                        </select>
                    </div>
                    <div>
                        <label>FECHA DE INGRESO*</label>
                        <input type='date' />
                    </div>
                    <div>
                        <label>FECHA DE EGRESO</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>INGRESA POR*</label>
                        <textarea name='' id='' cols='30' rows='10'></textarea>
                    </div>
                    <div>
                        <label>MOTIVO DE EGRESO</label>
                        <textarea name='' id='' cols='30' rows='10'></textarea>
                    </div>
                    <div>
                        <label>SI EL MOTIVO DE EGRESO ES 'OTRO', INDIQUE EL PORQUÉ</label>
                        <textarea name='' id='' cols='30' rows='10'></textarea>
                    </div>
                    <div>
                        <label>UNIDAD*</label>
                        <select name='select'>
                            <option value='DEFAULT'></option>
                            <option value='value1'>EDUCANDO ANDO</option>
                            <option value='value2'>SEMBRANDO ESPERANZA</option>
                            <option value='value3'>ESPACIOS CREATIVOS</option>
                            <option value='value4'>CRECER JUGANDO EN FAMILIA</option>
                            <option value='value5'>CRECIENDO CON AMOR EN FAMILIA</option>
                            <option value='value6'>MUNDO DE COLORES</option>
                            <option value='value7'>LACITOS DE AMOR</option>
                            <option value='value8'>MIS TERNURAS</option>
                            <option value='value9'>CRECER Y CREAR 1</option>
                            <option value='value10'>CRECER Y CREAR 2</option>
                            <option value='value11'>EMPRENDEDORAS</option>
                            <option value='value12'>MONACHOS</option>
                            <option value='value13'>SEMILLITAS DE AMOR</option>
                            <option value='value14'>SOÑADORAS</option>
                            <option value='value15'>GUERRERAS CONSTRUYE</option>
                            <option value='value16'>TRIUNFADORAS</option>
                            <option value='value17'>GESTANDO FUTURO T3</option>
                            <option value='value18'>GESTANDO FUTURO T2</option>
                            <option value='value19'>GRAN BRITALIA T2</option>
                            <option value='value20'>ABRAHAM LINCOLN T3</option>
                            <option value='value21'>LOURDES</option>
                            <option value='value22'>LA PEÑA</option>
                            <option value='value23'>SANTA ROSA DE LIMA</option>
                            <option value='value24'>CASA EGIPTO</option>
                            <option value='value25'>SANTA BARBARA</option>
                            <option value='value26'>FISCALIA</option>
                            <option value='value27'>USME PUEBLO</option>
                            <option value='value28'>SERRANIAS</option>
                            <option value='value29'>VIRREY</option>
                            <option value='value30'>SAN JUAN A</option>
                            <option value='value31'>EL UVAL</option>
                            <option value='value32'>TRIANGULO</option>
                            <option value='value33'>LORENZO ALCANTUZ I SECTOR</option>
                            <option value='value34'>M1 AMBA CHAKE</option>
                            <option value='value35'>M2 GALAN</option>
                            <option value='value36'>M3 EDUARDO SANTOS</option>
                            <option value='value37'>M4 MUZUUN MUNDO MEJOR</option>
                        </select>
                    </div>
                    <div>
                        <label>DUPLA*</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>DOCENTE*</label>
                        <select name='select'>
                            <option disabled hidden></option>
                        </select>
                    </div>
                    <h4>BENEFICIARIO</h4>
                    {/* BENEFICIARY */}
                    <div>
                        <label>TIPO DE DOCUMENTO *</label>
                        <select name='select'>
                            <option value='value1'>RC</option>
                            <option value='value2'>CC</option>
                            <option value='value3'>TI</option>
                            <option value='value4'>PEP</option>
                            <option value='value5'>PASAPORTE</option>
                            <option value='value6'>SIN DOCUMENTO</option>
                            <option value='value7'>ANM</option>
                            <option value='value8'>PPT</option>
                        </select>
                    </div>
                    <div>
                        <label>PRIMER NOMBRE*</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO NOMBRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>PRIMER APELLIDO*</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO APELLIDO*</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>FECHA DE NACIMIENTO*</label>
                        <input type='date' />
                    </div>
                    <div>
                        <label>GÉNERO*</label>
                        <select name='select'>
                            <option disabled hidden></option>
                            <option value='value1'>FEMENINO</option>
                            <option value='value2'>MASCULINO</option>
                            <option value='value3'>NO BINARIO</option>
                            <option value='value4'>OTRO</option>
                        </select>
                    </div>
                    <div>
                        <label>PAÍS DE NACIMIENTO*</label>
                        <select name='select'>
                            <option value='value1'>COLOMBIA</option>
                            <option value='value2'>VENEZUELA</option>
                            <option value='value3'>ECUADOR</option>
                            <option value='value4'>PERÚ</option>
                            <option value='value5'>PANAMÁ</option>
                            <option value='value6'>BRAZIL</option>
                        </select>
                    </div>
                    {/* DEPARTMENTS */}
                    <div>
                        <label>DEPARTAMENTO DE NACIMIENTO 🗃️🗃️🗃️🗃️</label>
                        <select name='select' onChange={(e)=>{setCurDepartment(e.target.value)}}>
                            {!departments.resultado ? 'Cargando' : departments.resultado.map(department=>{
                                return <option key={department.NOMBRE_DEPARTAMENTO} value={department.CODIGO_DEPARTAMENTO}>{department.NOMBRE_DEPARTAMENTO}</option>
                            })}
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO</label>
                        <select name='select'>
                            {!municipalities.resultado ? 'Cargando' : municipalities.resultado.map(municipality=>{
                                return <option key={municipality.NOMBRE_MUNICIPIO} value={municipality.CODIGO_MUNICIPIO}>{municipality.NOMBRE_MUNICIPIO}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>DISCAPACIDAD*</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>DISCAPACIDAD CERTIFICADA</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>ENTIDAD QUE CERTIFICA LA DISCAPACIDAD</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>CATEGORÍA DE LA DISCAPACIDAD</label>
                        <select name='select'>
                            <option value='1'>NINGUNA</option>
                            <option value='2'>FÍSICA</option>
                            <option value='3'>INTELECTUAL</option>
                            <option value='4'>PSICOSOCIAL</option>
                            <option value='5'>AUDITIVA</option>
                            <option value='6'>VISUAL</option>
                            <option value='7'>SORDO SEGUERA</option>
                            <option value='8'>MULTIPLE</option>
                            <option value='9'>SENSORIAL</option>
                            <option value='10'>SISTEMICA</option>
                            <option value='11'>VOZ Y HABLA</option>
                            <option value='12'>PIEL, PELO Y UÑAS</option>
                        </select>
                    </div>
                    <div>
                        <label>ESPECIFICAR LA DISCAPACIDAD</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>¿ESTÁ INSCRITO EN EL REGISTRO PARA LA LOCALIZACIÓN Y CARACTERIZACIÓN DE PERSONAS CON DISCAPACIDAD?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>¿REQUIERE LA AYUDA DE OTRA PERSONA?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>¿REQUIERE AYUDA TÉCNICA / PRODUCTO DE APOYO?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>¿CUENTA CON LA AYUDA TÉCNICA / PRODUCTO DE APOYO?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>¿REQUIERE TERAPIA Y/O REHABILITACIÓN?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>RECIBE ATENCIÓN EN TERAPIA Y/O REHABILITACIÓN?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>TIENE PROCESO DE INTERDICCIÓN?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>PAÍS DE RESIDENCIA</label>
                        <select name='select'>
                            <option value='1'>COLOMBIA</option>
                        </select>
                    </div>
                    <div>
                        <label>DEPARTAMENTO DE RESIDENCIA</label>
                        <select name='select'>
                            <option value='1'>BOGOTÁ, D.C.</option>
                        </select>
                    </div>
                    <div>
                        <label>ZONA DE UBICACIÓN</label>
                        <select name='select'>
                            <option value='1'>CABECERA</option>
                            <option value='2'>RESTO</option>
                        </select>
                    </div>
                    <div>
                        <label>TIPO DE CABECERA</label>
                        <select name='select'>
                            <option value='1'>LOCALIDAD</option>
                            <option value='2'>COMUNA</option>
                            <option value='3'>NO APLICA</option>
                        </select>
                    </div>
                    {/* LOCATIONS BY CITY */}
                    <div>
                        <label>NOMBRE LOCALIDAD/COMUNAS/NOMBRE DE ZONA RESTO</label>
                        <select name='select'>
                            {!localities.features ? 'Cargando' : localities.features.map(feature=>{
                                return <option key={feature.attributes.LocNombre} value={feature.attributes.LocNombre}>{feature.attributes.LocNombre}</option>
                            })}
                        </select>
                    </div>
                    {/* NEIGHBORHOODS SEARCH*/}
                    <div className='long-select'>
                        <label>BARRIO*</label>
                        <select id='mySelect' value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                        {!neighborhoods.features ? 'Cargando' : neighborhoods.features.map(neighborhood=>{
                            return <option key={neighborhood.properties.SCACODIGO} value={neighborhood.properties.SCANOMBRE}>{neighborhood.properties.SCANOMBRE}</option>
                        })}
                        </select>
                        <input type='text' value={searchText} onChange={handleSearchInputChange} placeholder='Buscar barrio' />
                        <button onClick={handleSearchClick}>Buscar</button>
                    </div>
                    <div>
                        <label>NOMBRE DE LA ZONA RESTO</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>DIRECCIÓN</label>
                        <textarea name= ' ' id= ' ' cols= '30 ' rows='10'></textarea>
                    </div>
                    <div>
                        <label>TELEFONO PRINCIPAL*</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>TELEFONO SECUNDARIO</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>ESTRATO DE HOGAR*</label>
                        <select name='select'>
                            <option value='1'>0</option>
                            <option value='2'>1</option>
                            <option value='3'>2</option>
                        </select>
                    </div>
                    <div>
                        <label>GRUPO ÉTNICO</label>
                        <select name='select'>
                            <option value='1'>AFROCOLOMBIANO</option>
                            <option value='2'>INDÍGENA</option>
                            <option value='3'>RAIZAL DEL ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA</option>
                            <option value='4'>NO SE AUTORECONOCE EN  NINGUNO DE LOS ANTERIORES</option>
                        </select>
                    </div>
                    <div>
                        <label>BENEFICIARIO SISBENIZADO</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>PUNTAJE SISBEN</label>
                        <select name='select'>
                            <option value='1'>A1</option>
                            <option value='2'>A2</option>
                            <option value='3'>A3</option>
                            <option value='4'>A4</option>
                            <option value='5'>A5</option>
                            <option value='6'>B1</option>
                            <option value='7'>B2</option>
                            <option value='8'>B3</option>
                            <option value='9'>B4</option>
                            <option value='10'>B5</option>
                            <option value='11'>B6</option>
                            <option value='12'>B7</option>
                            <option value='13'>C1</option>
                            <option value='14'>C2</option>
                            <option value='15'>C3</option>
                            <option value='16'>C4</option>
                            <option value='17'>C5</option>
                            <option value='18'>C6</option>
                            <option value='19'>C7</option>
                        </select>
                    </div>
                    <div>
                        <label>PERTENECE A FAMILIAS EN ACCIÓN</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>EL BENEFICIARIO HA SIDO VICTIMA DIRECTA CONFLICTO ARMADO</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div className=' long-select'>
                        <label >CRITERIOS DE FOCALIZACIÓN</label>
                        <br/>
                        <div>
                            <select name='select'>
                                <option value='1'>A</option>
                                <option value='2'>B</option>
                                <option value='1'>C</option>
                                <option value='2'>D</option>
                                <option value='1'>E</option>
                                <option value='2'>F</option>
                                <option value='1'>G</option>
                                <option value='2'>H</option>
                                <option value='1'>I</option>
                                <option value='2'>J</option>
                                <option value='1'>K</option>
                                <option value='2'>L</option>
                                <option value='1'>M</option>
                                <option value='2'>N</option>
                                <option value='2'>O</option>
                            </select>
                            <div className='d-flex flex-row justify-content-between m-0 letter-select'>
                                <span flow='down' tooltip='Pertenecientes a hogares con puntaje SISBEN' >A</span>
                                <span flow='down' tooltip='Pertenecientes a familias identificadas a través de la Estrategia para la Superación de la Pobreza Extrema – Red UNIDOS.' >B</span>
                                <span flow='down' tooltip='Niñas, niños y mujeres gestantes pertenecientes al programa Familias en Acción de Prosperidad Social.' >C</span>
                                <span flow='down' tooltip='Niñas y niños egresados de la estrategia de atención y prevención de la desnutrición aguda (Centros de Recuperación Nutricional -CRN- y 1000 días para cambiar el mundo y unidades de búsqueda activa).' >D</span>
                                <span flow='down' tooltip='Remitidos por las entidades del Sistema Nacional de Bienestar Familiar -SNBF- que se encuentren en situación de vulnerabilidad, riesgo de vulneración de derechos o programas de protección del ICBF.' >E</span>
                                <span flow='down' tooltip='Víctimas de hechos violentos asociados al conflicto armado, de acuerdo con las directrices establecidas en la Ley 1448 de 2011 y los Decretos ley 4633, 4634 y 4635 de 2011, así como la Sentencia T-025 de 2004 proferida por la Corte Constitucional y demás desarrollos jurisprudenciales en torno a la existencia de un estado de cosas inconstitucional; para lo cual se considerarán aquellos cuyo estado se encuentre incluido dentro del RUV.' >F</span>
                                <span flow='down' tooltip='Pertenecientes a comunidades étnicas (indígenas, comunidades negras, afrocolombianas, Palenqueros, Raizales y Rrom), que demanden el servicio.' >G</span>
                                <span flow='down' tooltip='Niños y niñas con discapacidad que requieren diversos tipos de apoyo para su participación efectiva y que demandan acompañamiento en las actividades de cuidado; así como los que sean remitidos por las entidades del SNBF con base en el registro para la localización y caracterización de personas con discapacidad del Ministerio de Salud y Protección Social, como de los comités territoriales y locales de discapacidad y las entidades territoriales en salud.' >H</span>
                                <span flow='down' tooltip='Usuarios del subsidio en especie para población vulnerable, del que trata el artículo 12 de la Ley 1537 de 2012 (Vivienda de Interés Social y Vivienda de Interés Prioritario), y el Decreto 1921 de 2012 o el que reglamente la materia.' >I</span>
                                <span flow='down' tooltip='Niñas y niños cuyos padres estén en establecimientos de reclusión.' >J</span>
                                <span flow='down' tooltip='Población migrante, refugiada o apátrida que cumpla con alguna de las siguientes características: ausencia de vivienda o condiciones de hacinamiento, que no cuenten con acceso a servicios públicos domiciliarios o que no cuenten con ningún tipo de afiliación al Sistema General de Seguridad Social en Salud.' >K</span>
                                <span flow='down' tooltip='Niñas y niños remitidos del servicio HCB FAMI y DIMF que al cumplir los dos (2) años deben transitar a otros servicios de educación inicial de atención permanente.' >L</span>
                                <span flow='down' tooltip='Niñas y niños cuyos padres estén activos en la ruta de reincorporación e identificados en las bases de datos remitidas de forma oficial al ICBF por la Agencia para la Reincorporación y la Normalización – ARN.' >M</span>
                                <span flow='down' tooltip='Para el servicio de Hogar Infantil se atenderá prioritariamente niños y niñas hijos de trabajadores que evidencien vinculación laboral y demás requisitos establecidos en la resolución 1740 de 2010.' >N</span>
                                <span flow='down' tooltip='Ingresos iguales o inferiores a 1.5 Smlv' >O</span>
                            </div><br/>
                        </div>
                    </div>
                    <div>
                        <label>SI NO CUMPLE CON NINGUN CRITERIO, CUENTA CON EL ACTA DONDE JUSTIFICA QUE EL BENEFICIARIO REQUIERE LA ATENCION</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <h4>ACUDIENTE</h4>
                    {/* ATTENDANT */}
                    <div>
                        <label>TIPO DE RESPONSABLE</label>
                        <select name='select'>
                            <option value='1'>PADRE</option>
                            <option value='2'>MADRE</option>
                            <option value='3'>TÍO(A)</option>
                            <option value='4'>HERMANO(A)</option>
                            <option value='5'>ABUELO(A)</option>
                            <option value='6'>PADRASTRO</option>
                            <option value='7'>MADRASTRA</option>
                            <option value='8'>CONYUGUE</option>
                            <option value='9'>AMIGO(A)</option>
                            <option value='10'>OTRO</option>
                        </select>
                    </div>
                    <div>
                        <label>TIPO DE DOCUMENTO ACUDIENTE*</label>
                        <select name='select'>
                            <option value='value1'>CC</option>
                            <option value='value2'>TI</option>
                            <option value='value3'>PEP</option>
                            <option value='value4'>PASAPORTE</option>
                            <option value='value3'>SIN DOCUMENTO</option>
                        </select>
                    </div>
                    <div>
                        <label>NÚMERO DE DOCUMENTO DEL ACUDIENTE</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>PRIMER NOMBRE ACUDIENTE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO NOMBRE ACUDIENTE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>PRIMER APELLIDO ACUDIENTE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO APELLIDO ACUDIENTE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>FECHA DE NACIMIENTO ACUDIENTE</label>
                        <input type='date' />
                    </div>
                    {/* COUNTRY */}
                    <div>
                        <label>PAÍS DE NACIMIENTO ACUDIENTE</label>
                        <select name='select'>
                            <option value='value1'>COLOMBIA</option>
                            <option value='value2'>VENEZUELA</option>
                            <option value='value3'>ECUADOR</option>
                            <option value='value4'>PERÚ</option>
                            <option value='value5'>PANAMÁ</option>
                            <option value='value6'>BRAZIL</option>
                        </select>
                    </div>
                    {/* DEPARTMENTS */}
                    <div>
                        <label>DEPARTAMENTO DE NACIMIENTO ACUDIENTE</label>
                        <select name='select' onChange={(e)=>{setCurDepartmentAttendant(e.target.value)}}>
                            {!departments.resultado ? 'Cargando' : departments.resultado.map(department=>{
                                return <option key={department.NOMBRE_DEPARTAMENTO} value={department.CODIGO_DEPARTAMENTO}>{department.NOMBRE_DEPARTAMENTO}</option>
                            })}
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO ACUDIENTE</label>
                        <select name='select'>
                            {!municipalitiesAttendant.resultado ? 'Cargando' : municipalitiesAttendant.resultado.map(municipality=>{
                                return <option key={municipality.NOMBRE_MUNICIPIO} value={municipality.CODIGO_MUNICIPIO}>{municipality.NOMBRE_MUNICIPIO}</option>
                            })}
                        </select>
                    </div>
                    {/* PADRE */}
                    <h4>PADRE</h4>
                    <div>
                        <label>TIPO DE DOCUMENTO PADRE*</label>
                        <select name='select'>
                            <option value='value1'>CC</option>
                            <option value='value2'>TI</option>
                            <option value='value3'>PEP</option>
                            <option value='value4'>PASAPORTE</option>
                            <option value='value3'>SIN DOCUMENTO</option>
                        </select>
                    </div>
                    <div>
                        <label>NÚMERO DE DOCUMENTO DEL PADRE</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>PRIMER NOMBRE PADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO NOMBRE PADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>PRIMER APELLIDO PADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO APELLIDO PADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>FECHA DE NACIMIENTO PADRE</label>
                        <input type='date' />
                    </div>
                    {/* COUNTRY */}
                    <div>
                        <label>PAÍS DE NACIMIENTO PADRE</label>
                        <select name='select'>
                            <option value='value1'>COLOMBIA</option>
                            <option value='value2'>VENEZUELA</option>
                            <option value='value3'>ECUADOR</option>
                            <option value='value4'>PERÚ</option>
                            <option value='value5'>PANAMÁ</option>
                            <option value='value6'>BRAZIL</option>
                        </select>
                    </div>
                    {/* DEPARTMENTS */}
                    <div>
                        <label>DEPARTAMENTO DE NACIMIENTO PADRE</label>
                        <select name='select' onChange={(e)=>{setCurDepartmentFather(e.target.value)}}>
                            {!departments.resultado ? 'Cargando' : departments.resultado.map(department=>{
                                return <option key={department.NOMBRE_DEPARTAMENTO} value={department.CODIGO_DEPARTAMENTO}>{department.NOMBRE_DEPARTAMENTO}</option>
                            })}
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO PADRE</label>
                        <select name='select'>
                            {!municipalitiesFather.resultado ? 'Cargando' : municipalitiesFather.resultado.map(municipality=>{
                                return <option key={municipality.NOMBRE_MUNICIPIO} value={municipality.CODIGO_MUNICIPIO}>{municipality.NOMBRE_MUNICIPIO}</option>
                            })}
                        </select>
                    </div>
                    <h4>MADRE</h4>
                    <div>
                        <label>TIPO DE DOCUMENTO MADRE*</label>
                        <select name='select'>
                            <option value='value1'>CC</option>
                            <option value='value2'>TI</option>
                            <option value='value3'>PEP</option>
                            <option value='value4'>PASAPORTE</option>
                            <option value='value3'>SIN DOCUMENTO</option>
                        </select>
                    </div>
                    <div>
                        <label>NÚMERO DE DOCUMENTO DEL MADRE</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>PRIMER NOMBRE MADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO NOMBRE MADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>PRIMER APELLIDO MADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>SEGUNDO APELLIDO MADRE</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>FECHA DE NACIMIENTO MADRE</label>
                        <input type='date' />
                    </div>
                    {/* COUNTRY */}
                    <div>
                        <label>PAÍS DE NACIMIENTO MADRE</label>
                        <select name='select'>
                            <option value='value1'>COLOMBIA</option>
                            <option value='value2'>VENEZUELA</option>
                            <option value='value3'>ECUADOR</option>
                            <option value='value4'>PERÚ</option>
                            <option value='value5'>PANAMÁ</option>
                            <option value='value6'>BRAZIL</option>
                        </select>
                    </div>
                    {/* DEPARTMENTS */}
                    <div>
                        <label>DEPARTAMENTO DE NACIMIENTO MADRE</label>
                        <select name='select' onChange={(e)=>{setCurDepartmentMother(e.target.value)}}>
                            {!departments.resultado ? 'Cargando' : departments.resultado.map(department=>{
                                return <option key={department.NOMBRE_DEPARTAMENTO} value={department.CODIGO_DEPARTAMENTO}>{department.NOMBRE_DEPARTAMENTO}</option>
                            })}
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO MADRE</label>
                        <select name='select'>
                            {!municipalitiesMother.resultado ? 'Cargando' : municipalitiesMother.resultado.map(municipality=>{
                                return <option key={municipality.NOMBRE_MUNICIPIO} value={municipality.CODIGO_MUNICIPIO}>{municipality.NOMBRE_MUNICIPIO}</option>
                            })}
                        </select>
                    </div>
                    <h4>HISTORIAL MÉDICO</h4>
                    <div>
                        <label>RÉGIMEN</label>
                        <select name='select'>
                            <option value='1'>SUBSIDIADO</option>
                            <option value='2'>CONTRIBUTIVO</option>
                            <option value='3'>ESPECIAL</option>
                            <option value='4'>NO SE ENCUENTRA AFILIADO</option>
                        </select>
                    </div>
                    <div>
                        <label>EPS</label>
                        <select name='select'>
                            <option value='1'>AIC-EPSI</option>
                            <option value='2'>ALIANSALUD EPS</option>
                            <option value='3'>AMBUQ EPS</option>
                            <option value='4'>ANAS WAYUU</option>
                            <option value='5'>ASMET SALUD EPS</option>
                            <option value='6'>CAJACOPI EPS</option>
                            <option value='7'>CAPITAL SALUD EPS</option>
                            <option value='8'>CAPRESOCA EPS</option>
                            <option value='9'>COMFACHOCÓ EPS</option>
                            <option value='10'>COMFACOR</option>
                            <option value='11'>COMFAGUAJIRA</option>
                            <option value='12'>COMFAMILIAR CARTAGENA</option>
                            <option value='13'>COMFAMILIAR EPS</option>
                            <option value='14'>COMFAMILIAR NARIÑO</option>
                            <option value='15'>COMPARTA EPS</option>
                            <option value='16'>COMPENSAR</option>
                            <option value='17'>CONFAORIENTE EPS</option>
                            <option value='18'>CONFASUCRE</option>
                            <option value='19'>CONVIDA EPS</option>
                            <option value='20'>COOSALUD</option>
                            <option value='21'>DUASAKAWI EPSI</option>
                            <option value='22'>ECOOPSOS</option>
                            <option value='23'>EMSSANAR EPS</option>
                            <option value='24'>EPS SANITAS</option>
                            <option value='25'>FAMISANAR EPS</option>
                            <option value='26'>MALLAMAS EPS INDÍGENA</option>
                            <option value='27'>MEDIMÁS EPS</option>
                            <option value='28'>MUTUAL SER</option>
                            <option value='29'>NUEVA EPS</option>
                            <option value='30'>PIJAOS SALUD</option>
                            <option value='31'>SALUD TOTAL EPS</option>
                            <option value='32'>SAVIA SALUD EPS</option>
                            <option value='33'>SURA EPS</option>
                        </select>
                    </div>
                    <div>
                        <label>¿EL BENEFICIARIO CUENTA CON CARNET DE VACUNCIÓN?*</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label> FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN</label>
                        <input type='date' />
                    </div>
                    <div>
                        <label>¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA?*</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO?*</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES?</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>ANTECEDENTE DE PREMATUREZ*</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS</label>
                        <select name='select'>
                            <option value='1'>NA</option>
                            <option value='2'>NO</option>
                            <option value='3'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>PERÍMETRO CEFÁLICO</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>EDAD GESTACIONAL AL NACER (SEMANAS)*</label>
                        <input type='number' step='any'/>
                    </div>
                    <div>
                        <label>PESO AL NACER (EN GRAMOS)*</label>
                        <input type='number' step='any'/>
                    </div>
                    <div>
                        <label>TALLA AL NACER (EN CENTÍMETROS)*</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON LECHE MATERNA DE FORMA EXCLUSIVA?</label>
                        <select name='select'>
                            <option value='1'>NO</option>
                            <option value='2'>SI</option>
                        </select>
                    </div>
                    <div>
                        <label>DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>DURACIÓN LACTANCIA MATERNA TOTAL (MESES)</label>
                        <input type='number' />
                    </div>
                    <div>
                        <label>SEMANAS DE GESTACIÓN</label>
                        <input type='number' />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddBeneficiaries
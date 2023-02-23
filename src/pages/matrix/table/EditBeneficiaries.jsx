import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import './BeneficiariesTable.css'
import edit from '../../../assets/icons/edit.svg'

function EditBeneficiaries() {
    const [show, setShow] = useState(false);

    const [departments, setDepartments] = useState([])
    const fetchApiDepartments = async _=>{
        try {
            const res = await fetch('https://geoportal.dane.gov.co/laboratorio/serviciosjson/gdivipola/servicios/departamentos.php')
            const resJSON = await res.json();
            setDepartments(resJSON)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchApiDepartments()
    }, [])
    return (
        !departments.resultado ? 'Cargando' :(
        <>
            <button className='edit-button' variant='primary' onClick={() => setShow(true)}>
                <img src={edit} alt="" /> 
            </button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                className='modal-xl modal-dialog-centered'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='example-custom-modal-styling-title'>
                        <h3>EDITAR BENEFICIARIO</h3>
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
                            <option value="DEFAULT"></option>
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
                        <label>DEPARTAMENTO DE NACIMIENTO</label>
                        <select name='select'>
                            {departments.resultado.map(index=>{
                                return <option key={index.CODIGO_DEPARTAMENTO} value={index.CODIGO_DEPARTAMENTO}>{index.NOMBRE_DEPARTAMENTO}</option>
                            })}
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO</label>
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
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
                            <option value='1'>BOGOTÁ</option>
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
                            <option value='1'>EJEMPLO</option>
                            <option value='2'>EJEMPLO</option>
                            <option value='3'>EJEMPLO</option>
                        </select>
                    </div>
                    {/* NEIGHBORHOODS BY LOCATION */}
                    <div>
                        <label>BARRIO</label>
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
                            <option value='2'>EJEMPLO</option>
                            <option value='3'>EJEMPLO</option>
                        </select>
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
{/*                             <option value='2' selected>1</option> */}
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
                    <div>
                        <label>CRITERIOS DE FOCALIZACIÓN</label>
                        <select name='select'>
                            <option value='1'>a. Pertenecientes a hogares con puntaje SISBEN</option>
                            <option value='2'>b. Pertenecientes a familias identificadas a través de la Estrategia para la Superación de la Pobreza Extrema – Red UNIDOS.</option>
                            <option value='3'>c. Niñas, niños y mujeres gestantes pertenecientes al programa Familias en Acción de Prosperidad Social.</option>
                            <option value='4'>d. Niñas y niños egresados de la estrategia de atención y prevención de la desnutrición aguda (Centros de Recuperación Nutricional -CRN- y 1000 días para cambiar el mundo y unidades de búsqueda activa).</option>
                            <option value='5'>e. Remitidos por las entidades del Sistema Nacional de Bienestar Familiar -SNBF- que se encuentren en situación de vulnerabilidad, riesgo de vulneración de derechos o programas de protección del ICBF.</option>
                            <option value='6'>f. Víctimas de hechos violentos asociados al conflicto armado, de acuerdo con las directrices establecidas en la Ley 1448 de 2011 y los Decretos ley 4633, 4634 y 4635 de 2011, así como la Sentencia T-025 de 2004 proferida por la Corte Constitucional y demás desarrollos jurisprudenciales en torno a la existencia de un estado de cosas inconstitucional; para lo cual se considerarán aquellos cuyo estado se encuentre incluido dentro del RUV.</option>
                            <option value='7'>g. Pertenecientes a comunidades étnicas (indígenas, comunidades negras, afrocolombianas, Palenqueros, Raizales y Rrom), que demanden el servicio.</option>
                            <option value='8'>h. Niños y niñas con discapacidad que requieren diversos tipos de apoyo para su participación efectiva y que demandan acompañamiento en las actividades de cuidado; así como los que sean remitidos por las entidades del SNBF con base en el registro para la localización y caracterización de personas con discapacidad del Ministerio de Salud y Protección Social, como de los comités territoriales y locales de discapacidad y las entidades territoriales en salud.</option>
                            <option value='9'>i. Usuarios del subsidio en especie para población vulnerable, del que trata el artículo 12 de la Ley 1537 de 2012 (Vivienda de Interés Social y Vivienda de Interés Prioritario), y el Decreto 1921 de 2012 o el que reglamente la materia.</option>
                            <option value='10'>j. Niñas y niños cuyos padres estén en establecimientos de reclusión.</option>
                            <option value='11'>k. Población migrante, refugiada o apátrida que cumpla con alguna de las siguientes características: ausencia de vivienda o condiciones de hacinamiento, que no cuenten con acceso a servicios públicos domiciliarios o que no cuenten con ningún tipo de afiliación al Sistema General de Seguridad Social en Salud.</option>
                            <option value='12'>l. Niñas y niños remitidos del servicio HCB FAMI y DIMF que al cumplir los dos (2) años deben transitar a otros servicios de educación inicial de atención permanente.</option>
                            <option value='13'>m. Niñas y niños cuyos padres estén activos en la ruta de reincorporación e identificados en las bases de datos remitidas de forma oficial al ICBF por la Agencia para la Reincorporación y la Normalización – ARN.</option>
                            <option value='14'>n. Para el servicio de Hogar Infantil se atenderá prioritariamente niños y niñas hijos de trabajadores que evidencien vinculación laboral y demás requisitos establecidos en la resolución 1740 de 2010.</option>
                            <option value='15'>o. Ingresos iguales o inferiores a 1.5 Smlv</option>
                        </select>
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
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO ACUDIENTE</label>
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
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
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO PADRE</label>
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
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
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
                        </select>
                    </div>
                    {/* MUNICIPALITIES */}
                    <div>
                        <label>MUNICIPIO DE NACIMIENTO MADRE</label>
                        <select name='select'>
                            <option value='1'>EJEMPLO</option>
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
                        <label>PESO AL NACER (EN KILOGRAMOS)*</label>
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
                        <label>X</label>
                        <input type='text' />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    ))
}

export default EditBeneficiaries
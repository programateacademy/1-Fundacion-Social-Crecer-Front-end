import React from 'react'
import './BeneficiariesTable.css'

function Thead({trans=false}) {
    return (
        <thead className={trans? 'transp':''}>
            <tr>
                <td>EDITAR</td>
                <td>NUMERO DE DOCUMENTO</td>
                <td>¿ACTIVO O INACTIVO?</td>
                <td>FECHA DE INGRESO</td>
                <td>FECHA DE EGRESO</td>
                <td>INGRESA POR:</td>
                <td>MOTIVO DE EGRESO</td>
                <td>SI EL MOTIVO DE EGRESO ES "OTRO", INDIQUE EL POR QUÉ</td>
                <td className='tb-unidad'>UNIDAD</td>
                <td className='tb-dupla'>DUPLA</td>
                <td className='tb-unidad'>DOCENTE</td>
                <td className='tb-beneficiario'>TIPO DE DOCUMENTO</td>
                <td className='tb-beneficiario'>PRIMER NOMBRE</td>
                <td className='tb-beneficiario'>SEGUNDO NOMBRE</td>
                <td className='tb-beneficiario'>PRIMER APELLIDO</td>
                <td className='tb-beneficiario'>SEGUNDIO NOMBRE</td>
                <td className='tb-beneficiario'>NOMBRE COMPLETO</td>
                <td className='tb-beneficiario'>FECHA DE NACIMIENTO</td>
                <td className='tb-beneficiario'>AÑOS</td>
                <td className='tb-beneficiario'>MESES</td>
                <td className='tb-beneficiario'>DÍAS</td>
                <td className='tb-beneficiario'>EDAD</td>
                <td className='tb-beneficiario'>TIPO DE BENEFICIARIO</td>
                <td className='tb-beneficiario'>GÉNERO</td>
                <td className='tb-beneficiario'>PAÍS DE NACIMIENTO</td>
                <td className='tb-beneficiario'>DEPARTAMENTO DE NACIMIENTO</td>
                <td className='tb-beneficiario'>MUNICIPIO DE NACIMIENTO</td>
                <td className='tb-beneficiario'>DISCAPACIDAD</td>
                <td className='tb-beneficiario'>DISCAPACIDAD CERTIFICADA</td>
                <td className='tb-beneficiario'>ENTIDAD QUE CERTIFICA LA DISCAPACIDAD</td>
                <td className='tb-beneficiario'>CATEGORIA DE LA DISCAPACIDAD</td>
                <td className='tb-beneficiario'>ESPECIFICAR LA DISCAPACIDAD</td>
                <td className='tb-beneficiario'>¿ESTÁ INSCRITO EN EL REGISTRO PARA LA LOCALIZACIÓN Y CARACTERIZACIÓN DE PERSONAS CON DISCAPACIDAD?</td>
                <td className='tb-beneficiario'>¿REQUIERE LA AYUDA DE OTRA PERSONA?</td>
                <td className='tb-beneficiario'>¿REQUIERE AYUDA TÉCNICA / PRODUCTO DE APOYO?</td>
                <td className='tb-beneficiario'>¿CUENTA CON LA AYUDA TÉCNICA / PRODUCTO DE APOYO?</td>
                <td className='tb-beneficiario'>¿REQUIERE TERAPIA Y/O REHABILITACIÓN?</td>
                <td className='tb-beneficiario'>¿RECIBE ATENCIÓN EN TERAPIA Y/O REHABILITACIÓN?</td>
                <td className='tb-beneficiario'>¿TIENE PROCESO DE INTERDICCIÓN?</td>
                <td className='tb-beneficiario'>PAIS DE RESIDENCIA</td>
                <td className='tb-beneficiario'>DEPARTAMENTO DE RESIDENCIA</td>
                <td className='tb-beneficiario'>ZONA DE UBICACIÓN</td>
                <td className='tb-beneficiario'>TIPO DE CABECERA</td>
                <td className='tb-beneficiario'>NOMBRE LOCALIDAD / COMUNAS / NOMBRE DE ZONA RESTO</td>
                <td className='tb-beneficiario'>BARRIO</td>
                <td className='tb-beneficiario'>NOMBRE DE LA ZONA RESTO</td>
                <td className='tb-beneficiario'>DIRECCIÓN</td>
                <td className='tb-beneficiario'>TELEFONO PRINCIPAL</td>
                <td className='tb-beneficiario'>TELEFONO SECUNDARIO</td>
                <td className='tb-beneficiario'>ESTRATO DEL HOGAR</td>
                <td className='tb-beneficiario'>GRUPO ÉTNICO</td>
                <td className='tb-beneficiario'>BENEFICIARIO SISBENIZADO</td>
                <td className='tb-beneficiario'>PUNTAJE SISBEN</td>
                <td className='tb-beneficiario'>PERTENECE A FAMILIAS EN ACCIÓN</td>
                <td className='tb-beneficiario'>EL BENEFICIARIO HA SIDO VICTIMA DIRECTA CONFLICTO ARMADO</td>
                <td className='tb-beneficiario'>CRITERIOS DE FOCALIZACION</td>
                <td className='tb-beneficiario td-smaller-txt'>SI NO CUMPLE CON NINGÚN CRITERIO, CUENTA CON EL ACTA DONDE JUSTIFICA QUE EL BENEFICIARIO REQUIERE LA ATENCIÓN</td>
                <td className='tb-acudiente'>TIPO DE RESPONSABLE</td>
                <td className='tb-acudiente'>TIPO DE DOCUMENTO ACUDIENTE</td>
                <td className='tb-acudiente'>NUMERO DE DOCUMENTO DEL ACUDIENTE</td>
                <td className='tb-acudiente'>PRIMER NOMBRE ACUDIENTE</td>
                <td className='tb-acudiente'>SEGUNDO NOMBRE ACUDIENTE</td>
                <td className='tb-acudiente'>PRIMER APELLIDO ACUDIENTE</td>
                <td className='tb-acudiente'>SEGUNDO APELLIDO ACUDIENTE</td>
                <td className='tb-acudiente'>FECHA DE NACIMIENTO ACUDIENTE</td>
                <td className='tb-acudiente'>PAIS DE NACIMIENTO ACUDIENTE</td>
                <td className='tb-acudiente'>DEPARTAMENTO DE NACIMIENTO ACUDIENTE</td>
                <td className='tb-acudiente'>MUNICIPIO DE NACIMIENTO ACUDIENTE</td>
                <td className='tb-padre'>TIPO DE DOCUMENTO PAPÁ</td>
                <td className='tb-padre'>NUMERO DE DOCUMENTO DEL PAPÁ</td>
                <td className='tb-padre'>PRIMER NOMBRE PAPÁ</td>
                <td className='tb-padre'>SEGUNDO NOMBRE PAPÁ</td>
                <td className='tb-padre'>PRIMER APELLIDO PAPÁ</td>
                <td className='tb-padre'>SEGUNDO APELLIDO PAPÁ</td>
                <td className='tb-padre'>FECHA DE NACIMIENTO PAPÁ</td>
                <td className='tb-padre'>EDAD PAPÁ (AÑOS)</td>
                <td className='tb-padre'>PAIS DE NACIMIENTO PAPÁ</td>
                <td className='tb-padre'>DEPARTAMENTO DE NACIMIENTO PAPÁ</td>
                <td className='tb-padre'>MUNICIPIO DE NACIMIENTO PAPÁ</td>
                <td className='tb-madre'>TIPO DE DOCUMENTO MAMÁ</td>
                <td className='tb-madre'>NUMERO DE DOCUMENTO DE LA MAMÁ</td>
                <td className='tb-madre'>PRIMER NOMBRE MAMÁ</td>
                <td className='tb-madre'>SEGUNDO NOMBRE MAMÁ</td>
                <td className='tb-madre'>PRIMER APELLIDO MAMÁ</td>
                <td className='tb-madre'>SEGUNDO APELLIDO MAMÁ</td>
                <td className='tb-madre'>FECHA DE NACIMIENTO MAMÁ</td>
                <td className='tb-madre'>EDAD MAMÁ</td>
                <td className='tb-madre'>PAIS DE NACIMIENTO MAMÁ</td>
                <td className='tb-madre'>DEPARTAMENTO DE NACIMIENTO MAMÁ</td>
                <td className='tb-madre'>MUNICIPIO DE NACIMIENTO MAMÁ</td>
                <td className='tb-historial-medico'>REGIMEN</td>
                <td className='tb-historial-medico'>EPS</td>
                <td className='tb-historial-medico'>¿EL BENEFICIARIO CUENTA CON EL CARNET DE VACUNACIÓN? *</td>
                <td className='tb-historial-medico'> FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN</td>
                <td className='tb-historial-medico td-smaller-txt'>¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA? *</td>
                <td className='tb-historial-medico'>¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO? * </td>
                <td className='tb-historial-medico td-smaller-txt'>SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES? </td>
                <td className='tb-historial-medico'>ANTECEDENTE DE PREMATUREZ *</td>
                <td className='tb-historial-medico'>A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS</td>
                <td className='tb-historial-medico'>PERIMETRO CEFÁLICO</td>
                <td className='tb-historial-medico'>EDAD GESTACIONAL AL NACER * </td>
                <td className='tb-historial-medico'>PESO AL NACER (EN KILOGRAMOS) *</td>
                <td className='tb-historial-medico'>TALLA AL NACER (EN CENTÍMETROS) *</td>
                <td className='tb-historial-medico td-smaller-txt'>SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON LECHE MATERNA DE FORMA EXCLUSIVA?</td>
                <td className='tb-historial-medico'>DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)</td>
                <td className='tb-historial-medico'>DURACIÓN LACTANCIA MATERNA TOTAL (MESES)</td>
                <td className='tb-historial-medico'>X</td>
                <td className='tb-unidad'>TIPO COMPLEMENTO</td>
                <td className='tb-unidad'>SI EL BENEFICIARIO TIENE TICKET, INDIQUE EL NÚMERO DE TICKET</td>
            </tr>
        </thead>
    )
}

export default Thead
import React from 'react'
import './BeneficiariesTable.css'
import Tbody from './Tbody'

function BeneficiariesTable() {
    return (
        <section>
            <div>
                <table>
                    <thead>
                        <tr>
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
                            <td>CRITERIOS DE FOCALIZACION</td>
                            <td>SI NO CUMPLE CON NINGUN CRITERIO, CUENTA CON EL ACTA DONDE JUSTIFICA QUE EL BENEFICIARIO REQUIERE LA ATENCION</td>
                            <td>TIPO DE RESPONSABLE</td>
                            <td>TIPO DE DOCUMENTO ACUDIENTE</td>
                            <td>NUMERO DE DOCUMENTO DEL ACUDIENTE</td>
                            <td>PRIMER NOMBRE ACUDIENTE</td>
                            <td>SEGUNDO NOMBRE ACUDIENTE</td>
                            <td>PRIMER APELLIDO ACUDIENTE</td>
                            <td>SEGUNDO APELLIDO ACUDIENTE</td>
                            <td>FECHA DE NACIMIENTO ACUDIENTE</td>
                            <td>PAIS DE NACIMIENTO ACUDIENTE</td>
                            <td>DEPARTAMENTO DE NACIMIENTO ACUDIENTE</td>
                            <td>MUNICIPIO DE NACIMIENTO ACUDIENTE</td>
                            <td>TIPO DE DOCUMENTO PAPÁ</td>
                            <td>NUMERO DE DOCUMENTO DEL PAPÁ</td>
                            <td>PRIMER NOMBRE PAPÁ</td>
                            <td>SEGUNDO NOMBRE PAPÁ</td>
                            <td>PRIMER APELLIDO PAPÁ</td>
                            <td>SEGUNDO APELLIDO PAPÁ</td>
                            <td>FECHA DE NACIMIENTO PAPÁ</td>
                            <td>EDAD PAPÁ (AÑOS)</td>
                            <td>PAIS DE NACIMIENTO PAPÁ</td>
                            <td>DEPARTAMENTO DE NACIMIENTO PAPÁ</td>
                            <td>MUNICIPIO DE NACIMIENTO PAPÁ</td>
                            <td>TIPO DE DOCUMENTO MAMÁ</td>
                            <td>NUMERO DE DOCUMENTO DE LA MAMÁ</td>
                            <td>PRIMER NOMBRE MAMÁ</td>
                            <td>SEGUNDO NOMBRE MAMÁ</td>
                            <td>PRIMER APELLIDO MAMÁ</td>
                            <td>SEGUNDO APELLIDO MAMÁ</td>
                            <td>FECHA DE NACIMIENTO MAMÁ</td>
                            <td>EDAD MAMÁ</td>
                            <td>PAIS DE NACIMIENTO MAMÁ</td>
                            <td>DEPARTAMENTO DE NACIMIENTO MAMÁ</td>
                            <td>MUNICIPIO DE NACIMIENTO MAMÁ</td>
                            <td>REGIMEN</td>
                            <td>EPS</td>
                            <td>¿EL BENEFICIARIO CUENTA CON EL CARNET DE VACUNACIÓN? *</td>
                            <td> FECHA DE VERIFICACIÓN DEL ESQUEMA DE VACUNACIÓN</td>
                            <td>¿EL CARNET DE VACUNACIÓN SE ENCUENTRA AL DÍA EN LAS VACUNAS Y DOSIS QUE CORRESPONDEN A LA EDAD DEL NIÑO O NIÑA? *</td>
                            <td>¿EL BENEFICIARIO PRESENTA CARNET DE CRECIMIENTO Y DESARROLLO? * </td>
                            <td>SI EL NIÑO CUENTA CON EL CARNET, VERIFIQUE ¿CUÁNTOS CONTROLES DE CRECIMIENTO Y DESARROLLO HA RECIBIDO EL NIÑO, EN LOS ÚLTIMOS 6 MESES? </td>
                            <td>ANTECEDENTE DE PREMATUREZ *</td>
                            <td>A LA FECHA DE VALORACIÓN EL BENEFICIARIO TIENE MENOS DE 40 SEMANAS</td>
                            <td>PERIMETRO CEFÁLICO</td>
                            <td>EDAD GESTACIONAL AL NACER * </td>
                            <td>PESO AL NACER (EN KILOGRAMOS) *</td>
                            <td>TALLA AL NACER (EN CENTÍMETROS) *</td>
                            <td>SI EL NIÑO O NIÑA ES MENOR DE 6 MESES, ¿ESTÁ SIENDO ALIMENTADO CON LECHE MATERNA DE FORMA EXCLUSIVA?</td>
                            <td>DURACIÓN LACTANCIA MATERNA EXCLUSIVA (MESES)</td>
                            <td>DURACIÓN LACTANCIA MATERNA TOTAL (MESES)</td>
                            <td>X</td>
                            <td>TIPO COMPLEMENTO</td>
                            <td>SI EL BENEFICIARIO TIENE TICKET, INDIQUE EL NÚMERO DE TICKET</td>
                        </tr>
                    </thead>
                    <tbody>
                        <Tbody/>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default BeneficiariesTable
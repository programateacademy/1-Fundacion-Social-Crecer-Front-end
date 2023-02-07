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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
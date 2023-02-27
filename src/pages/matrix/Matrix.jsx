import React, { useEffect, useState } from "react";
import "./Matrix.css";
import BeneficiariesTable from "./table/BeneficiariesTable";
import AddBeneficiaries from "./addBeneficiaries/AddBeneficiaries";
import { BiSearch } from "react-icons/bi";
import Header from "../../components/header/Header";
import Thead from "./table/Thead";
import { Filter } from "./Filter";


function Matrix({ onLogout, token }) {
    return (
        <>
            <div> <Header onLogout={onLogout} token={token}/>
                <section className="top-table">
                    <AddBeneficiaries />	INACTIVO	2000-02-29		DIEGo RODRIGUEZ			EL UVAL	OTRO	JOSEFA MARTINEZHERNAN HERNANDEZ	CC	JUAN	DAVID	RODRIGUEZ	AMAYA	JOSE DAVID RODRIGUEZ SALAZAR	2000-03-22	22	8	30	22 AÑOS 8 MESES 30 DIAS	NIÑO O NIÑA ENTRE 6 MESES Y 5 AÑOS Y 11 MESES	FEMENINO	COLOMBIA	BOGOTÁ	BOGOTÁ	NO_	NO_		NINGUNA		NO_	NO_	NO	NO	NO_	NO_	NO_	COLOMBIA	BOGOTÁ	CABECERA	LOCALIDAD	USME	PUERTA AL LLANO	PUERTA AL LLANO	CARRERA 7C ESTE 107 SUR 39	3203187736		1	NO SE AUTORECONOCE EN NINGUNO DE LOS ANTERIORES	SI_	C6	NO_	NO_	F. VÍCTIMAS DE HECHOS VIOLENTOS ASOCIADOS AL CONFLICTO ARMADO, DE ACUERDO CON LAS DIRECTRICES ESTABLECIDAS EN LA LEY 1448 DE 2011 Y LOS DECRETOS LEY 4633, 4634 Y 4635 DE 2011, ASÍ COMO LA SENTENCIA T-025 DE 2004 PROFERIDA POR LA CORTE CONSTITUCIONAL Y DEMÁS DESARROLLOS JURISPRUDENCIALES EN TORNO A LA EXISTENCIA DE UN ESTADO DE COSAS INCONSTITUCIONAL; PARA LO CUAL SE CONSIDERARÁN AQUELLOS CUYO ESTADO SE ENCUENTRE INCLUIDO DENTRO DEL RUV.		MADRE	CC	1014027273	CLAUDIA	PATRICIA	MONSALVE	LEON	1989-08-30	COLOMBIA	BOGOTÁ	BOGOTÁ	CC	1023034116	ANDRES	FELIPE	MEDINA	PORRAS	1949-01-20	80	COLOMBIA	BOGOTÁ	BOGOTÁ	CC	1023004072	CLAUDIA	PATRICIA	MONSALVE	LEON	1989-08-30	33	COLOMBIA	BOGOTÁ	BOGOTÁ	SUBSIDIADO	NUEVA EPS	NO_	2022-02-28	NO_	NO_		SI_	NO_		40	2240	60	NO_	5	6	SEM 23	NIÑOS Y NIÑAS DE 6 MESES A 11 MESES 29 DIAS	
	1222112121	INACTI
                    <section className="filter-space">
                        <Filter />
                    </section>
                    <div>
                        <select name="select">
                            <option hidden value="0">
                                Filtrar por:
                            </option>
                            <option value="value2">INACTIVO</option>
                        </select>
                        <input type="text" placeholder="Buscar" />
                        <button>
                            <BiSearch />
                        </button>
                    </div>
                </section>
                <div className="table-head">
                    <table>
                        <Thead />
                        <BeneficiariesTable />
                    </table>
                </div> </div>

        </>
    );
}

export default Matrix;

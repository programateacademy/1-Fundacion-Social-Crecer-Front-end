import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
// Styles
import "./Matrix.css";
// Components
import BeneficiariesTable from "./table/BeneficiariesTable";
import AddBeneficiaries from "./addBeneficiaries/AddBeneficiaries";
import Header from "../../components/header/Header";
import Thead from "./table/Thead";
import { Filter } from "./Filter";
import { useSetArrayContext } from "../../context/context";
import app from '../../apis/index'


function Matrix({ onLogout, token }) {

    const setArray = useSetArrayContext();
    useEffect(() => {
        async function fetchData(){
        const { data } = await app.get ('/api/admin/beneficiary',{
            headers: {
            Authorization: token,
        },
        }) 
        setArray(data);
        }
        fetchData();
    }, [])

    return (
        <>
            <div> <Header onLogout={onLogout} token={token}/>
                <section className="top-table">
                    <AddBeneficiaries token={token}/>
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
                    
                        <div className="table-head-f">
                        <Thead />             
                        </div>
                    <table>
                        <BeneficiariesTable token={token} />
                    </table>
                </div> </div>

        </>
    );
}

export default Matrix;

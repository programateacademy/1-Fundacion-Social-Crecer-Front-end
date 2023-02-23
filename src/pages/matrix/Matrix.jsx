import React, { useEffect, useState } from "react";
import "./Matrix.css";
import BeneficiariesTable from "./table/BeneficiariesTable";
import AddBeneficiaries from "./AddBeneficiaries";
import { BiSearch } from "react-icons/bi";
import users from "../../apis";
import Header from "../../components/header/Header";
import Thead from "./table/Thead";
import { Filter } from "./Filter";

function Matrix({ onLogout, token }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        if (!token) {
            onLogout();
        } else {
            const { data } = await users.get("/api/admin", {
                headers: {
                    Authorization: token,
                },
            });
            setUser(data.data.user);
        }
    }

    return (
        <>
            <Header onLogout={onLogout} token={token} />
            <section className="top-table">
                <AddBeneficiaries />
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
                </table>
            </div>
            <BeneficiariesTable />
        </>
    );
}

export default Matrix;

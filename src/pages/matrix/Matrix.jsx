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
import {
  useArrayContext,
  useSetArrayContext,
  useSetFilterContext,
  useFilterContext,
} from "../../context/context";
import app from "../../apis/index";

function Matrix({ onLogout, token }) {
  const array = useArrayContext();
  const setArray = useSetArrayContext();
  const filter = useFilterContext();
  const setFilter = useSetFilterContext();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { data } = await app.get("/api/admin/beneficiary", {
        headers: {
          Authorization: token,
        },
      });
      setArray(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  let quitAccent = (string) => {
    const acentos = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
    };
    return string
      .split("")
      .map((letra) => acentos[letra] || letra)
      .join("")
      .toString();
  };

  let search = [];

  search = (filter[0] ? filter : array).filter((ben) => {
    const benName = quitAccent(ben.firstName.toUpperCase());
    const benNum = ben.numDoc.toString();
    const searchText = quitAccent(searchValue.toUpperCase());
    return benName.includes(searchText) || benNum.includes(searchText);
  });

  return (
    <>
      <div>
        <Header onLogout={onLogout} token={token} />
        <section className="top-table">
          <AddBeneficiaries token={token} />
          <section className="filter-space">
            <Filter />
          </section>
          <div>
            <input
              value={searchValue}
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Buscar"
            />
            <button
              onClick={() => {
                setFilter(search);
              }}
            >
              <BiSearch />
            </button>
          </div>
        </section>
        {loading ? (
          "Cargando ..."
        ) : (
          <div className="table-head">
            <div className="table-head-f">
              <table>
                <Thead />
              </table>
            </div>
            <table>
              <BeneficiariesTable token={token} />
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Matrix;

/* let quitAccent=(string)=>{
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return string.split('').map( letra => acentos[letra] || letra).join('').toString(); 
    }
let search = []
if (!search.length>=1)
{ search = array} 

    else{
        
        search=array.filter(ben=>{
            const benName=quitAccent(ben.firstName.toLowerCase());
            const benNum=ben.numDoc.toString();
            const searchText=quitAccent(searchValue.toLowerCase());
            return (benName.includes(searchText) || benNum.includes(searchText) );
    });
    }  

    useEffect(() =>   {
        setSearchValue('')
    },[array])
 */

/*  <input  value = {searchValue} type="text" onChange={(e)=>{setSearchValue(e.target.value)}} placeholder='Buscar'/> */

/*    <button onClick={()=>{setArray(search)}}> */

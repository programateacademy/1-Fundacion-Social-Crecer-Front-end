import React from "react";
import "./BeneficiariesTable.css";
import Thead from "./Thead";
import Tbody from "./Tbody";
import { useArrayContext } from "../../../context/context";

function BeneficiariesTable({ token }) {
  let data = useArrayContext();

  return (
    <>
      <Thead trans={true} />
      <Tbody token={token} />
    </>
  );
}

export default BeneficiariesTable;

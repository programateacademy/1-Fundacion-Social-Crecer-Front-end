import React, { useState, useContext } from "react";

const ArrayContext = React.createContext();
const SetArrayContext = React.createContext();
const FilterContext = React.createContext();
const SetFilterContext = React.createContext();

export const useArrayContext = () => {
    return useContext(ArrayContext);
};

export const useSetArrayContext = () => {
    return useContext(SetArrayContext);
};
export const useFilterContext = () => {
    return useContext(FilterContext);
};
export const useSetFilterContext = () => {
    return useContext(SetFilterContext);
};

export const GeneralProvider = (props) => {
    const [array, setArray] = useState([]);
    const [filter, setFilter] = useState([]);

    const updateArray = (newArray) => {
        setArray(newArray);
    };

    return (
        <ArrayContext.Provider value={array}>
            <SetArrayContext.Provider value={updateArray}>
                <FilterContext.Provider value={filter}>
                    <SetFilterContext.Provider value={setFilter}>
                        {props.children}
                    </SetFilterContext.Provider>
                </FilterContext.Provider>
            </SetArrayContext.Provider>
        </ArrayContext.Provider>
    );
};

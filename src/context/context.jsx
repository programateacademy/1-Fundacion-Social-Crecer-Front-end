import React, {useState, useContext} from "react" 

const ArrayContext = React.createContext(); 
const SetArrayContext = React.createContext();


export const useArrayContext =()=>{  
    return useContext(ArrayContext)
}
export const useSetArrayContext =()=>{  
    return useContext(SetArrayContext)
}


export const GeneralProvider= (props) =>{

    const [array, setArray] = useState([])

return(
<ArrayContext.Provider value = {array}>
    < SetArrayContext.Provider value = {setArray}>
    {props.children}
    </ SetArrayContext.Provider>
</ArrayContext.Provider>
);
}

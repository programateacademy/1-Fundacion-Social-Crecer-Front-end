import React from 'react';
 function SearchManagers({searchValue, setSearchValue}) {


    const onSearchManagersChange=(event)=>{
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return (
        <>
        <div className="searchManagers">
            <input 
                onChange={onSearchManagersChange}
                value={searchValue}
                placeholder="Buscar Usuario"
            />
            {/* <button className="searchButton">Buscar</button> */}
        </div>
        </>
        
    );
}

export default SearchManagers
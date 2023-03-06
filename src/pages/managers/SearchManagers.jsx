function SearchManagers({searchValue, setSearchValue}) {

    //This function logs the value of the input field to the console and updates 
    //the searchValue state by calling the setSearchValue function.
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
        </div>
        </>
        
    );
}

export default SearchManagers
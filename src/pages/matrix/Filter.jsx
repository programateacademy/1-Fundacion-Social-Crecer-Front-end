import './Matrix.css'

export function Filter() {
    return (
        <>
            <div className='filter'>
                <p>Eliminar Filtros</p>
                <div className='button-filter' onClick={()=>{location. reload()}}>x</div>
            </div>
        </>
    )
}
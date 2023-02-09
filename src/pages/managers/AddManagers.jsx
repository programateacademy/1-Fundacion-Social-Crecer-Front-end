import { IoIosAddCircleOutline } from 'react-icons/io';
function AddManagers() {
    return (
        <button className='addUser'>
            <span className='iconAddUser'><IoIosAddCircleOutline /></span>
            <span className='createUser'>Crear funcionario</span>
        </button>
    )
}
export default AddManagers
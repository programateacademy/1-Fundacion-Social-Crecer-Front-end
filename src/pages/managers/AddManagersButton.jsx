import { IoIosAddCircleOutline } from 'react-icons/io';
function AddManagersButton() {
    return (
        <button className='addUser'>
            <span className='iconAddUser'><IoIosAddCircleOutline /></span>
            <span className='createUser'>Crear funcionario</span>
        </button>
    )
}
export default AddManagersButton
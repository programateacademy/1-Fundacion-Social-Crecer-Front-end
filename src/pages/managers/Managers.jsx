import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import ModalContainerAddUser from './ModalContainerAddUser.jsx';
function Managers() {
  return (
    <>
      <div className='filaUno'>
        <SearchManagers/>
        <ModalContainerAddUser/>
      </div>
      <CardUser/>
    </>
  );
}

export default Managers;

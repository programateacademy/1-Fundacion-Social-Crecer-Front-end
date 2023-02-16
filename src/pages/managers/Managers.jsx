import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import ModalContainerAddUser from './ModalContainerAddUser.jsx';
import Header from '../../components/header/Header.jsx';
function Managers() {
  return (
    <>
      <Header/>
      <div className='filaUno'>
        <SearchManagers/>
        <ModalContainerAddUser/>
      </div>
      <CardUser/>
    </>
  );
}

export default Managers;

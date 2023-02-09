import React from 'react';
import Header from'./components/header/Header.jsx';
import CardUser from './pages/managers/CardUser.jsx';
import './pages/managers/Managers.css';
import AddManagersButton from './pages/managers/AddManagersButton.jsx';
import SearchManagers from './pages/managers/SearchManagers.jsx';
function App() {
  return (
    <>
      <Header />
      <div className='filaUno'>
      <SearchManagers/>
      <AddManagersButton/>
      </div>
      <CardUser/>
    </>
  );
}

export default App;

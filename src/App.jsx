import React from 'react';
import Header from'./components/header/Header.jsx';
import CardUser from './pages/managers/CardUser.jsx';
import './pages/managers/Managers.css';
import AddManagers from './pages/managers/AddManagers.jsx';
import SearchManagers from './pages/managers/SearchManagers.jsx';
function App() {
  return (
    <>
      <Header />
      <div className='filaUno'>
      <SearchManagers/>
      <AddManagers/>
      </div>
      <CardUser/>
    </>
  );
}

export default App;

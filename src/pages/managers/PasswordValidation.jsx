import { useState } from "react";
import PasswordValidationModal from "./PasswordConfirm";
import EditManagerContainerButton from "./EditModal.jsx";

function PasswordValidation({ id,docnum, name, email,unity, setManagers,getManagers }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirmPassword = () => {
    // Lógica para confirmar la contraseña
    setIsEditing(true);
    setShowPasswordModal(false);
  };

  const handleEditClick = () => {
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };
  const handleEditClose = () => {
    setIsEditing(false);
  }; 

  return (
    <>
      <PasswordValidationModal
        show={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handleConfirmPassword}
      />
      <div>
        {isEditing ? (
          <EditManagerContainerButton 
          id={id}
          docnum={docnum} 
          name={name} 
          email={email} 
          unity={unity}
          setManagers={setManagers} 
          getManagers={getManagers}
          setShow={() => setShowPasswordModal(true)} onClose={handleEditClose} setIsEditing={setIsEditing}/>
        ) : null}
        <div>
          <button className='userButton' onClick={handleEditClick}>EDITAR PERFIL</button>
        </div>
      </div>
    </>
  );
}

export default PasswordValidation;

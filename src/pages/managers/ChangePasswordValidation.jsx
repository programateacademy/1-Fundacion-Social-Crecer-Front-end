import { useState } from "react";
import PasswordValidationModal from "./PasswordConfirm";
import EditModal from "./EditModal.jsx";

function PasswordValidation({  email,getManagers }) {
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
          <EditModal 
          email={email} 
          getManagers={getManagers}
          setShow={() => setShowPasswordModal(true)} onClose={handleEditClose} setIsEditing={setIsEditing}/>
        ) : null}
        <div>
          <button className='userButton' onClick={handleEditClick}>CAMBIAR CONTRASEÑA</button>
        </div>
      </div>
    </>
  );
}

export default PasswordValidation;

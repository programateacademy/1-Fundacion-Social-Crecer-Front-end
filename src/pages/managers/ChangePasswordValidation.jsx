import { useState } from "react";
import PasswordValidationModal from "./PasswordConfirm";
import EditManagerContainerButton from "./EditModal.jsx";

function PasswordValidation({  email, setManagers,getManagers }) {
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
          email={email} 
          setManagers={setManagers} 
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

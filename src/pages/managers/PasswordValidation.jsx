import { useState } from "react";
import PasswordValidationModal from "./PasswordValidationModal";
import EditManagerContainerButton from "./EditManagerContainerButton.jsx";

function PasswordValidation({ docnum, name, email,unity, setManagers, editManagers, eliminateManager }) {
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
          docnum={docnum} 
          name={name} 
          email={email} 
          unity={unity}
          setManagers={setManagers} 
          editManagers={editManagers} 
          eliminateManager={eliminateManager} 
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

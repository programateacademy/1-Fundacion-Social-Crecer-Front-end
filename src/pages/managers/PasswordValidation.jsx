import { useState } from "react";
import PasswordValidationModal from "./PasswordValidationModal";

const PasswordValidation = () => {
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

  return (
    
    <>
    
      <PasswordValidationModal
        show={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handleConfirmPassword}
      />
      <div>
        {isEditing ? (
          <input type="text" placeholder="Ingrese un nuevo valor" />
        ) : (
          <div>
            <span>Valor actual</span>
            <button className='userButton' onClick={handleEditClick}>EDITAR PERFIL</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PasswordValidation;

import { useState } from "react";
import PasswordConfirm from "../PasswordConfirm";
import ChangePasswordModal from "./ChangePasswordModal";

function ChangePassword({  email, setManagers,getManagers }) {
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
      <PasswordConfirm
        show={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handleConfirmPassword}
      />
      <div>
        {isEditing ? (
          <ChangePasswordModal 
          email={email} 
          setManagers={setManagers} 
          getManagers={getManagers}
          setShow={() => setShowPasswordModal(true)} onClose={handleEditClose} setIsEditing={setIsEditing}
          />
        ) : null}
        <div>
          <button className='userButton' onClick={handleEditClick}>CAMBIAR CONTRASEÑA</button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;

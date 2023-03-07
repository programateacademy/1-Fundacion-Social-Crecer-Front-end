import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePasswordModal({
  id,
  docnum,
  name,
  email,
  unity,
  setManagers,
  getManagers,
  onClose,
  setIsEditing,
}) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(true);

  // Show modal function
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header
          closeButton
          onClick={() => {
            onClose();
          }}
        >
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePasswordForm
            email1={email}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;

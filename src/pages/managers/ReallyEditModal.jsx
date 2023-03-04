import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReallyEdit from "./ReallyEdit";

function ReallyEditModal({
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
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReallyEdit
            id={id}
            docnum1={docnum}
            name1={name}
            email1={email}
            unity1={unity}
            setShow={setShow}
            setManagers={setManagers}
            getManagers={getManagers}
            onClose={onClose}
            setIsEditing={setIsEditing}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReallyEditModal;

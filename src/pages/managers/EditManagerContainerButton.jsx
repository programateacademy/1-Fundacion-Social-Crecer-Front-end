import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditManagersModal from "./EditManagersModal";
import { IoIosAddCircleOutline } from "react-icons/io";


function EditManager({ docnum,name,email, setManagers, editManagers,eliminateManager,onClose, setIsEditing }) {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(true);
  
    // Show modal function
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
return(
    <div>
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton onClick={()=>{onClose()}}>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditManagersModal 
          docnum1={docnum} 
          name1={name} 
          email1={email} 
          setShow={setShow} 
          setManagers={setManagers} 
          editManagers={editManagers} 
          eliminateManager={eliminateManager} 
          onClose={onClose} 
          setIsEditing={setIsEditing}
        />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  </div>
);
}

export default EditManager;
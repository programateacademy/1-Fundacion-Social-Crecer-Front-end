import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditManagersModal from "./EditManagersModal";
import { IoIosAddCircleOutline } from "react-icons/io";


function EditManager({id,name,email}) {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    // Show modal function
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
return(
    <div>
    {values.map((v, idx) => (
      <button key={idx} className="userButton" onClick={() => handleShow(v)}>
        {typeof v === "string" && `below ${v.split("-")[0]}`}
        <span className='createUserButton'>EDITAR PERFIL</span>
        </button>
    ))}
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditManagersModal id1={id} name1={name} email1={email} setShow={setShow}/>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  </div>
);
}

export default EditManager
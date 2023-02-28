import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditManagersModal from "./EditManagersModal";
import { IoIosAddCircleOutline } from "react-icons/io";


function YouShure({ docnum1, setManagers, eliminateManager,onClose }) {
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
        <Modal.Title>¿Seguro que deseas eliminar este usuario?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Si elimina el usuario no podrá volver a recuperarlo. 
        Tendría que crear uno nuevamente.  
      </Modal.Body>
      <Modal.Footer>
      <div className="btnsUser">
        <button className="btnCreateUser" onClick={() => setShow(false)}>
          NO
        </button>
        <button className="btnEliminateUser" onClick={()=>{
                        eliminateManager(docnum1, setManagers);
                        setShow(false);}
        }>
          SÍ
        </button>
      </div>
      </Modal.Footer>
    </Modal>
  </div>
);
}

export default YouShure;
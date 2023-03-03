import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddManagersModal from "./AddFunction";
import { IoIosAddCircleOutline } from "react-icons/io";


//  Modal component
function AddButton({getManagers}) {
  //  State assignment
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // Show modal function
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div>
      {values.map((v, idx) => (
        <button key={idx} className="addUser" onClick={() => handleShow(v)}>
          <span className="iconAddUser"><IoIosAddCircleOutline /></span>
          {typeof v === "string" && `below ${v.split("-")[0]}`}
          <span className='createUser'>Crear funcionario</span>
          </button>
      ))}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddManagersModal setShow={setShow} getManagers={getManagers}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddButton;

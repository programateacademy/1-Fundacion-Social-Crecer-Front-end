import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddManagersModal from "./AddManagersModal";
import { IoIosAddCircleOutline } from "react-icons/io";

//  Modal component
function AddButton({ getManagers }) {
  //  State assignment
  const values = [false];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // Show modal function
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div>
        <button className="addUser" onClick={() => handleShow(true)}>
          <span className="iconAddUser">
            <IoIosAddCircleOutline />
          </span>
          <span className="createUser">Crear funcionario</span>
        </button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddManagersModal setShow={setShow} getManagers={getManagers} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddButton;

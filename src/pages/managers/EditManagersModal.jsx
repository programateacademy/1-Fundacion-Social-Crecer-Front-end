import { useState } from "react";
import Form from "react-bootstrap/Form";

const EditManagersModal = ({ id1, name1, email1, setShow, editManagers, setManagers, eliminateManager,onClose,setIsEditing }) => {

  const [id, setId] = useState(id1);
  const [newName, setNewName] = useState(name1);
  const [newEmail, setNewEmail] = useState(email1);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEditClick = () => {
    if (!validateEmail(newEmail)) {
      setEmailError("Por favor, ingrese un correo electrónico válido");
    } else {
      setEmailError("");
      editManagers(id1, setManagers, newName, newEmail);
      setIsEditing(false);
      setShow(false);
    }
  };  
  
  const handleClose = () => {
    if (!emailError) {
      setShow(false);
      onClose();
    }
  };
  
  return (
    <div id="Form">
      <Form>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder={id1}
            onChange={(e) => { setId(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder={name1}
            onChange={(e) => { setNewName(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="email"
            placeholder={email1}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </Form.Group>
      </Form>
      <div className="btnsUser">
        <button
          className="btnCreateUser"
          onClick={handleEditClick}
        >
          Editar
        </button>
        <button
          className="btnEliminateUser"
          onClick={() => {
            eliminateManager(id1, setManagers);
            setShow(false);
            onClose();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );}
export default EditManagersModal;

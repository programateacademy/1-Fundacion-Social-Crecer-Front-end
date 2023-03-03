import app from '../../apis/index'
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const PasswordValidationModal = ({ show, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleVerifyPassword = async () => {
    try{
      const response = await app.post('/api/superadmin/verify-password', {email: "noborrar@gmail.com", password}, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      if (response.status === 200) { // Cambiar "1234" por la contraseña que se desea validar hacer petición post desde
        //este frontend, mirar el login de cami
        onConfirm();
      }
    }catch(error){
      setErrorMessage(error.response.data.error)
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Validar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={errorMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button className="btnCreateUser" onClick={handleVerifyPassword}>
          Confirmar
        </button>
        <button className="btnCancelUser" onClick={onClose}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordValidationModal;
